import React from 'react'
import TextAreaComponent from '../../input/edit-components/TextAreaComponent';
import InputContainer from "../../input/InputContainer";
import EmojiPreviewComponent from "../../input/EmojiPreviewComponent";
import ControlContainer from "../../input/control-container/ControlContainer";
import {removeReplyAt,restoreReplyAt} from "../../utils";
import CircularProgress from '@material-ui/core/CircularProgress';

export default class CardContentEdit extends InputContainer{
  constructor(props){
    super(props)
    this.state.commentContent=removeReplyAt(props.commentRawContent,true)
    this.state.replyLoading=false
    this.saveEdit=this.saveEdit.bind(this)
  }

  saveEdit(){
    const {curId,applyEdit,pid,at,hideEditMode,commentRawContent}=this.props
    const {commentContent}=this.state
    let oldCommentRaw=removeReplyAt(commentRawContent,false)
    if(commentContent===oldCommentRaw){
      return hideEditMode()
    }
    if(!this.commentVerify()){
      return
    }
    let comment=restoreReplyAt(commentContent)
    this.setState({
      replyLoading:true
    })
    applyEdit({id:curId,pid,comment,at}).then(()=>{
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
      replyLoading,
    } = this.state;
    const {
      curLang,
      previewShow,
      togglePreviewShow,
      curId,
      hideEditMode,
    }=this.props

    return (
      <>
        <div className="v-edit-area">
          <TextAreaComponent ref={this.textAreaRef}
                             // commentErr={commentErr}
                             // commentErrMsg={commentErrMsg}
                             curLang={curLang}
                             commentContent={commentContent}
                             replyLoading={replyLoading}
                             placeholder={curLang["ctrl"].edit}
                             contentOnKeyDown={this.contentOnKeyDown}
                             contentOnChange={this.commentContentOnChange}
                             // commentVerify={this.commentVerify}
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
        <span className={"v-edit-save"} onClick={this.saveEdit.bind(this,curId)}>
          { replyLoading
            ? <CircularProgress size={14} />
            : curLang['ctrl']['save']}
          </span>
        <span className={"v-edit-cancel"} onClick={hideEditMode}>{curLang['ctrl']['cancel']}</span>
      </>


    )
  }
}
