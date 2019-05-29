import React from 'react'
import ValineContext from './ValineContext'
import ValineContainer from "./ValineContainer";


export default class ValinePanel extends React.Component{

  constructor(props){
    super(props)
    this.state={
      AV:window.AV,
      url:props.url
    }
  }


  render(){
    return (
      <ValineContext.Consumer>
        {contextProps=>{
          const {url,AV}=this.state
          const {fetchCount,updateCount,...otherPorps}=contextProps
          return <ValineContainer url={url} fetchCount={fetchCount} updateCount={updateCount} av={AV} {...otherPorps}/>
        }}
      </ValineContext.Consumer>
    )

  }
}

ValinePanel.defaultProps={
  url:decodeURI(window.location.origin+window.location.pathname)
}