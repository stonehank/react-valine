import React from 'react'

export default class CardAction extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const {
      curId,
      rid,
      langCtrl,
      owner,
      nickName,
      editMode,
      handleReply,
      canBeModify,
      showEditMode,
    }=this.props
    return (
      <div className={"v-content-action"}>
        {
          owner && canBeModify
            ? editMode
              ? null
              : <span className={"v-action-edit"} onClick={showEditMode.bind(this,curId)}>{langCtrl['edit']}</span>
            : null
        }
        <span className={"v-action-reply"} onClick={handleReply.bind(this,curId,nickName,rid)}>{langCtrl['reply']}</span>
      </div>
    )
  }
}
