import React from 'react'
import ValineContext from './ValineContext'
import ValineGetCount from "./ValineGetCount";
import PropTypes from "prop-types";



export default class ValineCount extends React.Component{

  render(){
    return (
      <ValineContext.Consumer>
        {contextProps=>{
          let {initialLoading,fetchCount,updateCountHash,curLang,themeMode}=contextProps
          const {style,uniqStr,count,className}=this.props
          if(this.props.themeMode){
            themeMode=this.props.themeMode
          }
          return (
              initialLoading
                  ? 'Loading...'
                  :<ValineGetCount
                      style={style}
                      fetchCount={fetchCount}
                      fetchOnUpdate={true}
                      updateCountHash={updateCountHash}
                      uniqStr={uniqStr}
                      className={className}
                      themeMode={themeMode}
                      count={count}
                      fetchTxt={curLang['tips']['count']}
            />
          )
        }
        }
      </ValineContext.Consumer>
    )
  }
}
ValineCount.defaultProps={
  className:''
}
ValineCount.propTypes = {
  count:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  style:PropTypes.object,
  uniqStr:PropTypes.any,
  themeMode:PropTypes.string,
  className:PropTypes.string,
}
