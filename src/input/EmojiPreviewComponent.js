import React from 'react';
import emojiData from '../assets/emoji'


export default class EmojiPreviewComponent extends React.PureComponent {

  render() {
    const {emojiList,emojiPrefix,emojiListPos,emojiChooseId,chooseEmoji}=this.props
    const [top,left]=emojiListPos
    return (
      emojiList.length===0
      ? null
      : <ul className={"vemoji-preview-list"} onClick={ev=>ev.stopPropagation()} style={{top:top,left}}>
          {
            emojiList.map((word,i)=>(
              <li key={word}
                  style={emojiChooseId===i ? {background:"#3e46fc",color:"#fff"} : null}
                  onClick={chooseEmoji.bind(null,emojiData[word],emojiPrefix)}>
                {emojiData[word]+' '+word}
              </li>
            ))
          }
        </ul>
    )
  }
}
