import React from 'react';

export default class EmojiComponent extends React.PureComponent {

  render() {
    const {txt,toggleEmojiShow}=this.props
    return (
      <React.Fragment>
        <span className="vemoji-btn" title={txt} onClick={toggleEmojiShow}>{txt}</span>
      </React.Fragment>
    );
  }
}
