import {emojiSearch} from "./emojiTire";



export default function getWordList(prefix,len=5){
  if(prefix==null)return []
  return emojiSearch(prefix,len)
  // return emojiTire(prefix,len)
}


