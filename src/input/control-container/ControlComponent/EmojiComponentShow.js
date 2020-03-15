import React from 'react';
const emojiData=require('../../../assets/emoji.json');





 class EmojiComponentShow extends React.PureComponent {

  render() {
    const {insertEmoji }=this.props
    return (
        <div className={'emoji-panel-box'}>
          {
            Object.keys(emojiData).map(name=>
              <span title={name} key={name} className={'emoji-panel-item'} onClick={insertEmoji.bind(null,emojiData[name])}>{emojiData[name]}</span>
            )
          }
        </div>

    );
  }
}

export default EmojiComponentShow
