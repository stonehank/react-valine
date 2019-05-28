
export function calcValueAndPos(ele,insertStr,deletePrefixLen=0){
  let _startPos = ele.selectionStart;
  let endPos = ele.selectionEnd;
  let startPos=_startPos-deletePrefixLen
  let value=ele.value
  let scrollTop=ele.scrollTop
  let newValue=value.substring(0,startPos)+insertStr+value.substring(endPos)
  return [newValue,startPos,scrollTop]
}

export function getEmojiPrefix(ele,head=':'){
  let startPos = ele.selectionStart
  let beforeCaret=ele.value.substring(0, startPos)
  let lastIdx=beforeCaret.lastIndexOf(head)
  if(lastIdx===-1)return null
  if(lastIdx===0 || beforeCaret[lastIdx-1]===' ' || beforeCaret[lastIdx-1]==="\n"){
    return beforeCaret.substring(lastIdx+head.length)
  }
  return null
}