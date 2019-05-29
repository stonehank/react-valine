import React from 'react'

export default class PageComponent extends React.PureComponent{

  render(){
    const {currentCounts,langCtrl,commentCounts,fillNxtCommentList}=this.props
    return (
      <div className="vpage txt-center">
        {
          currentCounts < commentCounts
            // ? <button onClick={fillNxtCommentList}>{"加载更多评论"+(nestShow ? "" : `(剩余${commentCounts - currentCounts}条)`)}</button>
            // ? <button onClick={fillNxtCommentList}>加载更多评论(剩余{commentCounts - currentCounts}条)</button>
            ? <button onClick={fillNxtCommentList}>{langCtrl["more"]}</button>
            : <span>{langCtrl["no_more"]}</span>
        }
      </div>
    )
  }
}