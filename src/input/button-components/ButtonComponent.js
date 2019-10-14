import React from 'react';
import EmojiComponent from "./emoji/EmojiComponent";
import PreviewComponent from "./preview/PreviewComponent";


export default class ButtonComponent extends React.PureComponent {

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
