
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
  return Object.assign({id,createdAt,child:[],initShowChild:false},curAttrs)
}

let mergeNestComment=createNestComments()

export {mergeNestComment,convert2SimplyList,simplyObj}