import React from 'react'
// import SystemInfo from ".././card/SystemInfo";



export default class CardHead extends React.PureComponent{

  render(){
    const {
      link,
      nickName,
    }=this.props
    return (
      <div className={"vhead"}>
                          <span className={"vnick"}>
                            {link
                              ? <a  href={ link } target="_blank" rel="noopener noreferrer nofollow" > {nickName}</a>
                              : <span>{nickName}</span>
                            }
                          </span>
        {/*<SystemInfo />*/}
      </div>
    )
  }
}