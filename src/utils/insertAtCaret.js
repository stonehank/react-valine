
export function calcValueAndPos(ele,insertStr,deletePrefixLen=0){
  let _startPos = ele.selectionStart;
  let endPos = ele.selectionEnd;
  let startPos=_startPos-deletePrefixLen
  let value=ele.value
  let scrollTop=ele.scrollTop
  let newValue=value.substring(0,startPos)+insertStr+value.substring(_startPos,endPos)+value.substring(endPos)
  return [newValue,scrollTop,startPos,endPos]
}

export function resolveTAB(ele,insertStr='  '){
  let ids=[],
    newValue=ele.value,
    selectVal=ele.value.substring(ele.selectionStart,ele.selectionEnd),
    initS=ele.selectionStart,
    initE=ele.selectionEnd,
    insertLen=insertStr.length,
    startPos,
    endPos,
    scrollTop=ele.scrollTop
  let id=selectVal.indexOf("\n")
  while(id!==-1){
    ids.push(id)
    id=selectVal.indexOf("\n",id+1)
  }
  let s=initS
  for(let i=0;i<=ids.length;i++){
    let _s=s,_e=null
    if(i===ids.length)_e=initE+i*insertLen
    else _e=initS+ids[i]+i*insertLen
    s=_e+1+insertLen
    newValue=newValue.substring(0,_s)+insertStr+newValue.substring(_s,_e)+newValue.substring(_e)
  }
  startPos=initS+insertLen
  endPos=initE+insertLen*(ids.length+1)
  return [newValue,scrollTop,startPos,endPos]
}

export function getEmojiPrefix(value,startPos,head=':'){
  let beforeCaret=value.substring(0, startPos)
  let lastIdx=beforeCaret.lastIndexOf(head)
  if(lastIdx===-1)return null
  if(lastIdx===0 || beforeCaret[lastIdx-1]===' ' || beforeCaret[lastIdx-1]==="\n"){
    return beforeCaret.substring(lastIdx+head.length)
  }
  return null
}