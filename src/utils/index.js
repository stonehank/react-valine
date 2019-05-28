import timeAgo from './timeAgo'
import {contentAtVerify,linkVerify,emailVerify} from './verify'
import replaceAt from './replaceAt'
import {xssMarkdown,modify_hljs} from './xssMarkdown'
import {getEmojiPrefix,calcValueAndPos} from './insertAtCaret'
import {mergeNestComment,convert2SimplyList,simplyObj} from './nestComment'
import getWordList from './emojiTire'


export {
  timeAgo,
  contentAtVerify,
  calcValueAndPos,
  linkVerify,
  emailVerify,
  replaceAt,
  xssMarkdown,
  getEmojiPrefix,
  modify_hljs,
  mergeNestComment,
  convert2SimplyList,
  simplyObj,
  getWordList
}