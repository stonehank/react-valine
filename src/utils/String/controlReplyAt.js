let removedSave=null

export function restoreReplyAt(content){
  if(removedSave==null)return content
  if(!content.startsWith('\n')){
    // markdown格式，添加一个空行
    content='\n'+content
  }
  let newContent=removedSave+content
  removedSave=null
  return newContent
}
export function removeReplyAt(content,save=false){
  let m=content.match(/^@([^\s\t\n\r]+)\s/)
  if(!m)return content
  if(save)removedSave=m[0]
  content=content.replace(/^(@[^\s\t\n\r]+)\s/,'')
  // 消除第一个空行，之所以存在这个空行，是为了md 的格式问题
  if(content.startsWith('\n')){
    content=content.replace(/^\n/,'')
  }
  return content
}
