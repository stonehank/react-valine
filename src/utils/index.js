import timeAgo from './timeAgo'
import {contentAtVerify,linkVerify,emailVerify} from './verify'
import {replaceAt,replaceExistEmoji,replaceExistEmoji2} from './replace'
import {xssMarkdown,modify_hljs} from './xssMarkdown'
import {getEmojiPrefix,calcValueAndPos,resolveTAB} from './insertAtCaret'
import {mergeNestComment,convert2SimplyList,simplyObj} from './nestComment'
import getWordList from './emojiTire'
import getCaretCoordinates from './textarea-creat'

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
  replaceExistEmoji,
  replaceExistEmoji2,
  convert2SimplyList,
  simplyObj,
  getWordList,
  resolveTAB,
  getCaretCoordinates
}