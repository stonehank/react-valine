import React from 'react'
import ValineContext from './ValineContext'
import ValineContainer from "./ValineContainer";
import PropTypes from "prop-types";


export default class ValinePanel extends React.Component{

  constructor(props){
    super(props)
    this.state={
      uniqStr:props.uniqStr,
      useWindow:props.useWindow,
      getPanelParent:props.getPanelParent
    }
  }


  render(){
    return (
      <ValineContext.Consumer>
        {contextProps=>{
          // const {uniqStr,AV}=
          const {fetchCount,updateCount,...otherProps}=contextProps
          return <ValineContainer  fetchCount={fetchCount} updateCount={updateCount}  {...this.state} {...otherProps}/>
        }}
      </ValineContext.Consumer>
    )

  }
}

ValinePanel.defaultProps={
  uniqStr:decodeURI(window.location.origin+window.location.pathname),
  useWindow:true,
  getPanelParent:null
}

ValinePanel.propTypes = {
  useWindow:PropTypes.bool,
  getPanelParent:PropTypes.func
}

