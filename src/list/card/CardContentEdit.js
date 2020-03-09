import React from 'react'
import TextAreaComponent from '../../input/edit-components/TextAreaComponent';
import InputContainer from "../../input/InputContainer";
import EmojiPreviewComponent from "../../input/EmojiPreviewComponent";
import ControlContainer from "../../input/control-container/ControlContainer";
import {removeReply,restoreReply} from "../../utils";

export default class CardContentEdit extends InputContainer{
  constructor(props){
    super(props)
    this.state.commentContent=removeReply(props.commentRawContent)
    this.saveEdit=this.saveEdit.bind(this)
  }

  saveEdit(){
    const {curId,handleEdit,pid,hideEditMode}=this.props
    const {commentContent}=this.state
    let comment=restoreReply(commentContent)
    console.log(comment)
    handleEdit({id:curId,pid,comment}).then(()=>{
      hideEditMode()
    })
  }

  render(){
    const {
      commentContent,
      emojiList,
      emojiChooseId,
      emojiPrefix,
      emojiListPos,
      commentErr,
      commentErrMsg,
    } = this.state;
    const {
      curLang,
      previewShow,
      togglePreviewShow,
      curId,
      hideEditMode,
      updateCommentList,
    }=this.props

    return (
      <>
        <div className="vedit">
          <TextAreaComponent ref={this.textAreaRef}
                             commentErr={commentErr}
                             commentErrMsg={commentErrMsg}
                             commentContent={commentContent}
                             contentOnKeyDown={this.contentOnKeyDown}
                             contentOnChange={this.commentContentOnChange}
                             commentVerify={this.commentVerify}
          />
          <EmojiPreviewComponent emojiList={emojiList}
                                 emojiListPos={emojiListPos}
                                 emojiPrefix={emojiPrefix}
                                 emojiChooseId={emojiChooseId}
                                 chooseEmoji={this.chooseEmoji}
          />
          <ControlContainer previewShow={previewShow}
                            langCtrl={curLang["ctrl"]}
                            insertEmoji={this.insertEmoji}
                            commentContent={commentContent}
                            togglePreviewShow={togglePreviewShow}
          />
        </div>
        <span className={"v-edit"} onClick={this.saveEdit.bind(this,curId)}>{curLang['ctrl']['save']}</span>
        <span className={"v-edit"} onClick={hideEditMode}>{curLang['ctrl']['cancel']}</span>
      </>


    )
  }
}
