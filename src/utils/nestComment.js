import {globalState} from './globalState'
import {deepClone} from "./index";

function dfsClone(list,item,nestLayer,initShowChild){
  let res=[],hasInserted=false
  let {rid,pid}=item
  for(let i=0;i<list.length;i++){
    if(!hasInserted && list[i].rid===rid){
      let obj=Object.assign({},list[i])
      if(nestLayer<=0 || list[i].id===pid){
        if(initShowChild)obj.initShowChild=true
        obj.child=list[i].child.slice()
        obj.child.push(item)
        hasInserted=true
      }else {
        let [child,state]=dfsClone(obj.child,item,nestLayer-1,initShowChild)
        obj.child=child
        hasInserted=hasInserted||state
      }
      obj.replyLen++
      res[i]=obj
    }else{
      res[i]=list[i]
    }
  }
  if(!hasInserted)return [list,false]
  return [res,true]
}

function createNestComments(){
  return function(parentList,nestList,nestLayer=Infinity,initShowChild=false){
    let res=parentList.slice()
    // DFS遍历arr
    for(let item of nestList){
      res=dfsClone(res,item,nestLayer-1,initShowChild)[0]
    }
    return res
  }
}

 function convert2SimplyList(arr){
  let res=[]
  for(let obj of arr){
    res.push(simplyObj(obj))
  }
  return res
}

function simplyObj(obj){
  let id=obj.id,curAttrs=obj.attributes,createdAt=obj.createdAt || obj.updatedAt
  let simObj={id,createdAt,child:[],initShowChild:false,owner:false,replyLen:0}
  let ownerHash=globalState.ownerHash
  if(ownerHash && ownerHash[id]!=null){
    simObj.owner=true
  }
  return Object.assign(simObj,curAttrs)
}



function deepReplace(list,key,val,replaceItem){
  for(let i=0;i<list.length;i++){
    if(list[i][key]===val){
      // Note the child
      replaceItem.child=list[i].child
      list[i]=Object.assign(list[i],replaceItem)
      return true
    }
    let res=deepReplace(list[i].child,key,val,replaceItem)
    if(res)return true
  }
  return false
}

function updateFromList(list,targetId,simplyItem){
  let cloneList=deepClone(list)
  let res=deepReplace(cloneList,'id',targetId,simplyItem)
  if(!res){
    console.warn('There is no such id: '+targetId)
    return list
  }
  return cloneList
}



let mergeNestComment=createNestComments()

export {mergeNestComment,convert2SimplyList,simplyObj,updateFromList}
