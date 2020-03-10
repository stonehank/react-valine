let globalState={
}

function list2Hash(list,attr,hash={}){
  if(hash==null)hash={}
  for(let i=0;i<list.length;i++){
    if(typeof list[i]!=='object')throw new Error('List item must be Object')
    hash[list[i][attr]]=true
  }
  return hash
}

export {globalState,list2Hash}
