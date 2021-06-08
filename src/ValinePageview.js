import React from 'react'
import ValineContext from './ValineContext'
import ValineGetCount from "./ValineGetCount";
import PropTypes from "prop-types";




export default class ValinePageview extends React.Component{


  render(){
    return (
      <ValineContext.Consumer>
        {
          contextProps=>{
            let {getPageview,initialLoading,curLang,themeMode}=contextProps
            const {style,uniqStr,count,title,className}=this.props
            if(this.props.themeMode){
              themeMode=this.props.themeMode
            }
            return initialLoading
                ? 'Loading'
                : <ValineGetCount style={style}
                              fetchCount={getPageview}
                              title={title}
                              uniqStr={uniqStr}
                              count={count}
                              className={className}
                              themeMode={themeMode}
                              fetchTxt={curLang['tips']['pageview']}
              />
          }
        }
      </ValineContext.Consumer>
    )
  }
}
ValinePageview.defaultProps={
  title:document.title,
  className:'',
}

ValinePageview.propTypes = {
  count:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  style:PropTypes.object,
  title:PropTypes.string,
  themeMode:PropTypes.string,
  className:PropTypes.string,
}
