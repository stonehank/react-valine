import {contentAtVerify} from "../Verify";
import replaceAtToTag from "./replaceAtToTag";

/**
 * {comment, at, pid}
 * @param commentObj
 * @returns {*}
 */
export default function parseToValidCommentAt(commentObj) {
  let {comment, at, pid}=commentObj
  if (at !== '' && pid !== '') {
    if (!contentAtVerify(comment, at)) {
      return {comment,pid:'',at:''}
    } else {
      return {comment:replaceAtToTag(comment, pid),pid,at}
    }
  }
  return commentObj
}
