import React from 'react'

export default class InfoComponent extends React.PureComponent{

  render(){
    const {commentCounts}=this.props
    return (
        <div className="vinfo">
          <div className="vcount col">总共 <span className="vnum">{commentCounts}</span> 条评论</div>
        </div>
    )
  }
}