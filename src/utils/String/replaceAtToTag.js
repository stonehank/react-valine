import {escape} from "./escape";

export default function replaceAtToTag(content,pid="_"){
  let m=content.match(/^@([^\s\t\n\r]+)\s/)
  if(!m)return content
  let escapeName=escape(m[1])
  return content.replace(/^(@[^\s\t\n\r]+)\s/,`<a class="at" href="#${pid}">@${escapeName}</a>&nbsp;`)
  // return content.replace(/^(@[^\s\t\n\r]+)\s/,`[@${escapeName}](#${pid})`)
}
