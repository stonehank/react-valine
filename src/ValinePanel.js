import React from 'react'
import ValineContext from './ValineContext'
import ValineContainer from "./ValineContainer";


export default class ValinePanel extends React.Component{

  constructor(props){
    super(props)
    this.state={
      AV:window.AV,
      uniqStr:props.uniqStr
    }
  }


  render(){
    return (
      <ValineContext.Consumer>
        {contextProps=>{
          const {uniqStr,AV}=this.state
          const {fetchCount,updateCount,...otherPorps}=contextProps
          return <ValineContainer uniqStr={uniqStr} fetchCount={fetchCount} updateCount={updateCount} av={AV} {...otherPorps}/>
        }}
      </ValineContext.Consumer>
    )

  }
}

ValinePanel.defaultProps={
  uniqStr:decodeURI(window.location.origin+window.location.pathname)
}