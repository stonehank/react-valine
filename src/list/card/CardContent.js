import React from 'react'


export default class CardContent extends React.PureComponent{

  render(){
    const {commentContent}=this.props
    return (
      <div className={"vcontent"}>
        <div dangerouslySetInnerHTML={{__html:commentContent}} />
      </div>
    )
  }
}