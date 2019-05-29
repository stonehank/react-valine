import React from 'react';
import EmojiComponent from "./emoji/EmojiComponent";
import PreviewComponent from "./preview/PreviewComponent";


export default class ButtonComponent extends React.PureComponent {

  render() {
    const {previewShow,togglePreviewShow,toggleEmojiShow,langCtrl}=this.props
    return (
      <div className={"vctrl"}>
        <EmojiComponent txt={langCtrl["emoji"]} toggleEmojiShow={toggleEmojiShow}/>
        <PreviewComponent txt={langCtrl["preview"]} txt_on={langCtrl["preview_on"]} previewShow={previewShow} togglePreviewShow={togglePreviewShow}/>
      </div>

    );
  }
}
