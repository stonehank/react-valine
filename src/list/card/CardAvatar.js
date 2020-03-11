import React from 'react'

export default class CardAvatar extends React.PureComponent{

  render(){
    const {
      GRAVATAR_URL,
      avatarSrc,
    }=this.props
    return (
      <img className={"v-avatar"} alt={"avatar"} src={avatarSrc || `${GRAVATAR_URL}/?d=mp&size=50`}/>
    )
  }
}
