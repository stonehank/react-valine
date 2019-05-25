import React from 'react';

export default class EmojiComponent extends React.PureComponent {

  render() {
    const {toggleEmojiShow}=this.props
    return (
      <React.Fragment>
        <span className="vemoji-btn" title="表情" onClick={toggleEmojiShow}>表情</span>
      </React.Fragment>
    );
  }
}
