import React from 'react'

export default class InfoComponent extends React.PureComponent{

  render(){
    const {commentCounts,lang_comments}=this.props
    return (
        <div className="vinfo">
          <div className="vcount col">{lang_comments[0]}<span className="vnum">{commentCounts}</span> {lang_comments[1]}</div>
        </div>
    )
  }
}