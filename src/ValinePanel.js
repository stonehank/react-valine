import React from 'react'
import ValineContext from './ValineContext'
import PropTypes from "prop-types";
import FetchResourceContainer from "./core/FetchResourceContainer";


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
    const {className,style}=this.props
    return (
      <ValineContext.Consumer>
        {contextProps=>{
          let {fetchCount,updateCount,themeMode,...otherProps}=contextProps
          if(this.props.themeMode){
            themeMode=this.props.themeMode
          }
          return <FetchResourceContainer  fetchCount={fetchCount}
                                          updateCount={updateCount}
                                          themeMode={themeMode}
                                          className={className}
                                          style={style}
                                          {...this.state}
                                          {...otherProps} />
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

