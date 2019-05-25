import React from 'react';
import EmojiComponent from "./emoji/EmojiComponent";
import PreviewComponent from "./preview/PreviewComponent";


export default class ButtonComponent extends React.PureComponent {

  render() {
    const {previewShow,togglePreviewShow,toggleEmojiShow}=this.props
    return (
      <div className={"vctrl"}>
        <EmojiComponent toggleEmojiShow={toggleEmojiShow}/>
        <PreviewComponent previewShow={previewShow} togglePreviewShow={togglePreviewShow}/>
      </div>

    );
  }
}
