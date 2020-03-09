import React from 'react';
import EmojiComponent from "./EmojiComponent";
import PreviewComponent from "./PreviewComponent";


export default class ControlComponent extends React.PureComponent {

  render() {
    const {previewShow,togglePreviewShow,toggleEmojiShow,openEmojiDrawer,closeEmojiDrawer,langCtrl, show,insertEmoji}=this.props
    return (
      <div className={"vctrl"}>
        <EmojiComponent txt={langCtrl["emoji"]} closeEmojiDrawer={closeEmojiDrawer} openEmojiDrawer={openEmojiDrawer} toggleEmojiShow={toggleEmojiShow}  show={show} insertEmoji={insertEmoji} />
        <PreviewComponent txt={langCtrl["preview"]} txt_on={langCtrl["preview_on"]} previewShow={previewShow} togglePreviewShow={togglePreviewShow}/>
      </div>

    );
  }
}
