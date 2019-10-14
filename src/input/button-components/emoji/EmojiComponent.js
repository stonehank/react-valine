import React from 'react';
import EmojiComponentShow from "./EmojiComponentShow";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
export default class EmojiComponent extends React.PureComponent {
  render() {
    const {txt,toggleEmojiShow,show,openEmojiDrawer,closeEmojiDrawer,insertEmoji}=this.props
    // console.log(show)
    return (
      <React.Fragment>
        <Button size={"small"} onClick={openEmojiDrawer}  variant="contained" color="default">{txt}</Button>
        <Drawer
          anchor={"bottom"}
          open={show}
          onClose={closeEmojiDrawer}
        >
          <EmojiComponentShow insertEmoji={insertEmoji} />
        </Drawer>
        {/*<span className="vemoji-btn" title={txt} onClick={toggleEmojiShow}>{txt}</span>*/}
      </React.Fragment>
    );
  }
}
