import React from 'react'
import {timeAgo} from '../utils/index'


export default class CreatedTimeComponent extends React.PureComponent{

  render(){
    const {langTime,createdAt}=this.props
    return (
      <span className="vtime">{timeAgo(createdAt,langTime)}</span>
    )
  }
}

