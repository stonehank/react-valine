import React from 'react'
import {timeAgo} from '../utils/index'


export default class CreatedTimeComponent extends React.PureComponent{

  render(){
    return (
      <span className="vtime">{timeAgo(this.props.createdAt)}</span>
    )
  }
}

