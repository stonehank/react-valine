import {escape} from './escape'
import emojiData from '../assets/emoji'

export function replaceAt(content,pid="_"){
  let m=content.match(/^@([^\s\t\n\r]+)\s/)
  if(!m)return content
  let escapeName=escape(m[1])
  return content.replace(/^(@[^\s\t\n\r]+)\s/,`<a class="at" href="#${pid}">@${escapeName}</a>&nbsp;`)
}

export function replaceExistEmoji(value,selectionStart,str=''){
  let startPos=selectionStart
  let newStr=str + value.replace(/:(.+?):/g, (placeholder, key) => {
    if(emojiData[key]){
      startPos-=key.length
      startPos+=1
    }
    return emojiData[key] || placeholder
  })
  return [newStr,startPos]
}

// 尽可能匹配更多的表情
// 例如 :catt:cat:  结果为:catt🐱

export function replaceExistEmoji2(value,selectionStart,str=''){
  let startPos=selectionStart
  let text='',newStr=str,open=false
  for(let i=0;i<value.length;i++){
    newStr+=value[i]
    if(value[i]===":" && open){
        if(emojiData[text]){
          startPos-=text.length
          startPos+=1
          newStr=newStr.substring(0,newStr.length-text.length-2)
          newStr+=emojiData[text]
          open=false
        }
        text=''
    }else if(value[i]===":" && !open){
      open=true
      text=''
    }else{
      if(open)text+=value[i]
    }
  }
  return [newStr,startPos]
}