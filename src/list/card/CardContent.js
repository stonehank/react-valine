import React from 'react'


export default class CardContent extends React.PureComponent{

  render(){
    const {commentContent,needExpand,expandContent}=this.props
    return (
      <div className={`vcontent${needExpand ? ' expand' : ''}`} onClick={expandContent}>
        <div dangerouslySetInnerHTML={{__html:commentContent}} />
      </div>
    )
  }
}