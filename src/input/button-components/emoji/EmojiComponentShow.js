import React from 'react';
const emojiData=require('../../../assets/emoji.json');

export default class EmojiComponentShow extends React.PureComponent {

  render() {
    const {show,insertEmoji}=this.props
    return (
      show
        ? <div className="vemojis">
          {
            Object.keys(emojiData).map(name=>
              <span title={name} key={name} className={"vemoji"} onClick={insertEmoji.bind(null,emojiData[name])}>{emojiData[name]}</span>
            )
          }
        </div>
        : null
    );
  }
}
