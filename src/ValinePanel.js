import React from 'react'
import ValineContext from './ValineContext'
import PropTypes from "prop-types";
import ValineContainer from "./core/ValineContainer";


export default class ValinePanel extends React.Component{

  render(){
    return (
      <ValineContext.Consumer>
        {contextProps=>{
          let {themeMode,...otherProps}=contextProps
          if(this.props.themeMode){
            themeMode=this.props.themeMode
          }

          return <ValineContainer themeMode={themeMode}
                                  {...this.props}
                                  {...otherProps}

          />
        }}
      </ValineContext.Consumer>
    )
  }
}

ValinePanel.defaultProps={
  uniqStr:decodeURI(window.location.origin+window.location.pathname),
  useWindow:true,
  getPanelParent:null,
  themeMode:'',
  className:'',
  style:null
}

ValinePanel.propTypes = {
  useWindow:PropTypes.bool,
  getPanelParent:PropTypes.func,
  themeMode:PropTypes.string,
  className:PropTypes.string,
  style:PropTypes.object,
}

