import globalState from './globalState'
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
      res[i]=obj
    }else{
      res[i]=list[i]
    }
  }
  if(!hasInserted)return [list,false]
  return [res,true]
}

function createNestComments(){
  return function(list,arr,nestLayer=Infinity,initShowChild=false){
    let res=list.slice()
    // DFS遍历arr
    for(let item of arr){
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
  let id=obj.id,curAttrs=obj.attributes,createdAt=obj.get('createdAt')
  let simObj={id,createdAt,child:[],initShowChild:false,owner:false}
  let ownerHash=globalState.ownerHash
  if(ownerHash && ownerHash[id]!=null){
    simObj.owner=true
  }
  return Object.assign(simObj,curAttrs)
}

function searchExist(list,key,val){
  for(let i=0;i<list.length;i++){
    if(list[i][key]===val){
      return true
    }
    let nxt=deepSearch(list[i].child,key,val)
    if(nxt)return true
  }
  return false
}

function deepSearch(list,key,val){
  let result=[]
  for(let i=0;i<list.length;i++){
    if(list[i][key]===val){
      result.push(list[i])
    }
    result=result.concat(deepSearch(list[i].child,key,val))
  }
  return result
}

function updateFromList(list,targetId,modifyObj){
  let result=[]
  let cloneList=[]
  let found=searchExist(list,'id',targetId)
  if(found){
    cloneList=deepClone(list)
    result=deepSearch(cloneList,'id',targetId)
  }else{
    console.log('--------2',result)``
    return list
  }
  if(result.length>1){
    console.error('ID is duplicate ('+targetId+')')
    return list
  }
  result=result[0]
  for(let k in modifyObj){
    // console.log(k,result[k],modifyObj[k])
    result[k]=modifyObj[k]
  }
  console.log('--------3',result,cloneList)
  return cloneList
}



let mergeNestComment=createNestComments()

export {mergeNestComment,convert2SimplyList,simplyObj,updateFromList}
