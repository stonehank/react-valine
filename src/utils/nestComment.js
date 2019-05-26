// import deepClone from './deepClone'

function dfsClone(list,item){
  let res=[],hasInserted=false
  let {rootId,rid}=item
  for(let i=0;i<list.length;i++){
    if(!hasInserted && list[i].rootId===rootId){
      let obj=Object.assign({},list[i])
      if(list[i].id===rid){
        obj.child=list[i].child.slice()
        obj.child.push(item)
        hasInserted=true
      }else{
        let [child,state]=dfsClone(obj.child,item)
        obj.child=child
        hasInserted=hasInserted||state
      }
      res[i]=obj
    }else{
      res[i]=list[i]
    }
  }
  if(!hasInserted)return [list,false]
  // if(!hasInserted)res.push(item)
  return [res,true]
}

function createNestComments(){
  // let map=new Map()
  return function(list,arr){
    let res=list.slice()
    // DFS遍历arr
    for(let item of arr){
      res=dfsClone(res,item)[0]
    }
    return res


    // for(let i=0;i<list.length;i++){
    //   let item=list[i]
    //   if(map.has(item.id)){
    //     res[i]=map.get(item.id)
    //     continue
    //   }
    //   // let cloneItem=deepClone(item)
    //   let cloneItem=item
    //   map.set(item.id,cloneItem)
    //   res[i]=cloneItem
    // }
    // for(let obj of arr){
    //   let id=obj.id
    //   let rid=obj.rid
    //   let parent=map.get(rid)
    //   // let cloneObj=deepClone(obj)
    //   let cloneObj=obj
    //   parent.child.push(cloneObj)
    //   map.set(id,cloneObj)
    // }
    // return res
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
  return Object.assign({id,createdAt,child:[]},curAttrs)
}



let mergeNestComment=createNestComments()

export {mergeNestComment,convert2SimplyList,simplyObj}