import React from 'react'

export default class CardAvatar extends React.PureComponent{

  render(){
    const {
      GRAVATAR_URL,
      avatarSrc,
    }=this.props
    return (
      <img className={"vimg"} alt={"avatar"} src={avatarSrc || `${GRAVATAR_URL}/?d=mp&size=50`}/>
    )
  }
}