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
      canBeEdit,
      handleReply,
      editMode,
      showEditMode,
    }=this.props
    return (
      <div className={"v-content-action"}>
        {
          owner && editMode
            ? canBeEdit
              ? null
              : <div className={"v-action-edit"} onClick={showEditMode.bind(this,curId)}>{langCtrl['edit']}</div>
            : null
        }
        <div className={"v-action-reply"} onClick={handleReply.bind(this,curId,nickName,rid)}>{langCtrl['reply']}</div>
      </div>
    )
  }
}
