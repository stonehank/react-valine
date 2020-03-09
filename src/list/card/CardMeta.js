import React from 'react'
import CreatedTimeComponent from ".././CreatedTimeComponent";



export default class CardMeta extends React.PureComponent{

  render(){
    const {
      // curId,
      // rid,
      // handleReply,
      langTime,
      // txt_reply,
      // nickName,
      createdAt
    }=this.props
    return (
      <div className={"vmeta"}>
        <CreatedTimeComponent langTime={langTime} createdAt={createdAt} />
        {/*<span className={"vat"} onClick={handleReply.bind(this,curId,nickName,rid)}>{txt_reply}</span>*/}
      </div>
    )
  }
}
