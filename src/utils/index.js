import timeAgo from './timeAgo'
import {contentAtVerify,linkVerify,emailVerify} from './verify'
import {replaceAt,replaceExistEmoji2,removeReply,restoreReply} from './replace'
import {xssMarkdown,modify_hljs} from './xssMarkdown'
import {getEmojiPrefix,calcValueAndPos,resolveTAB} from './insertAtCaret'
import {mergeNestComment,convert2SimplyList,simplyObj,updateFromList} from './nestComment'
import {escape} from './escape'
import getWordList from './emojiTire'
import getCaretCoordinates from './textarea-creat'
import convertList2Hash from './convertList2Hash'
import globalState from './globalState'
import randUniqueString from './randUniqueString'
import {getLinkWithoutProtocol} from './getLinkWithoutProtocol'
import {getFromCache,setCache} from './cacheControl'


export function deepClone(item) {
  return JSON.parse(JSON.stringify(item))
}
/**
 * 深比较
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
export function deepEqual(obj1,obj2){
  if(obj1===obj2)return true
  if(!obj1 || !obj2)return false
  let os=Object.prototype.toString,result=true;
  for(let key in obj1){
    if(obj1.hasOwnProperty(key)){
      if(os.call(obj1[key])==='[object Array]' && os.call(obj2[key])==='[object Array]'){
        if(obj1[key].length!==obj2[key].length){ return false}
        result=deepEqual(obj1[key],obj2[key])
      }else if(os.call(obj1[key])==='[object Object]' && os.call(obj2[key])==='[object Object]'){
        if(Object.keys(obj1[key]).length!==Object.keys(obj2[key]).length){ return false}
        result=deepEqual(obj1[key],obj2[key])
      }else if(typeof obj1[key]==='function' && typeof obj2[key]==='function'){
        if(obj1[key].toString()!==obj2[key].toString()){
          return false
        }
      }else if(Number.isNaN(obj1[key]) && Number.isNaN(obj2[key])){
        result=true;
      }else if(obj1[key]!==obj2[key]){
        return false;
      }
      if(!result){
        return false;
      }
    }
  }
  return true
}



export {
  globalState,
  timeAgo,
  randUniqueString,
  contentAtVerify,
  calcValueAndPos,
  linkVerify,
  emailVerify,
  replaceAt,
  removeReply,
  restoreReply,
  xssMarkdown,
  getEmojiPrefix,
  modify_hljs,
  mergeNestComment,
  convertList2Hash,
  getFromCache,
  setCache,
  escape,
  // replaceExistEmoji,
  replaceExistEmoji2,
  convert2SimplyList,
  simplyObj,
  updateFromList,
  getWordList,
  resolveTAB,
  getCaretCoordinates,
  getLinkWithoutProtocol
}
