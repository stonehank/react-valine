import React from 'react'

export default class PageComponent extends React.PureComponent{

  render(){
    const {currentCounts,langCtrl,commentCounts,handleReply,fillNxtCommentList}=this.props
    return (
      <div className="v-content-footer txt-center">
        <button className={"vdiscuss vbtn"} onClick={handleReply}>{langCtrl["discuss"]}</button>
        {
          currentCounts < commentCounts
            ? <button className={"vmore vbtn"} onClick={fillNxtCommentList}>{langCtrl["more"]}</button>
            : <span style={{margin:"0 1rem"}}>{langCtrl["no_more"]}</span>
        }
      </div>
    )
  }
}
