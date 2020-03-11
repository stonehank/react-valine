import React from 'react'
import {timeAgo} from "../../../utils";



export default class CardMeta extends React.PureComponent{

  render(){
    const {
      langTime,
      createdAt
    }=this.props
    return (
      <div className={"vmeta"}>
        <span className="vtime">{timeAgo(createdAt,langTime)}</span>
      </div>
    )
  }
}
