import React from 'react'
import ValineContext from './ValineContext'
import ValineContainer from "./ValineContainer";


export default class ValinePanel extends React.Component{

  constructor(props){
    super(props)
    this.state={
      AV:window.AV,
      path:props.path
    }
  }


  render(){
    return (
      <ValineContext.Consumer>
        {contextProps=>{
          const {path,AV}=this.state
          const {fetchCount,updateCount,...otherPorps}=contextProps
          return <ValineContainer path={path} fetchCount={fetchCount} updateCount={updateCount} av={AV} {...otherPorps}/>
        }}
      </ValineContext.Consumer>
    )

  }
}

ValinePanel.defaultProps={
  path:decodeURI(window.location.origin+window.location.pathname)
}