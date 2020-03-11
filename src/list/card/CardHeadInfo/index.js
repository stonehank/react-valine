import React from 'react'
import CardMeta from "./CardMeta";
// import SystemInfo from "./SystemInfo";



export default class CardHeadInfo extends React.PureComponent{

  render(){
    const {
      link,
      nickName,
      langTime,
      createdAt
    }=this.props
    return (
      <div className={'v-head-info'}>
        <span className={"vnick"}>
          { link
            ? <a href={ link } target="_blank" rel="noopener noreferrer nofollow" > {nickName}</a>
            : <span>{nickName}</span>
          }
          </span>
        <CardMeta langTime={langTime} createdAt={createdAt}/>
      </div>

    )
  }
}
