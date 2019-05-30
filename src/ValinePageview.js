import React from 'react'
import ValineContext from './ValineContext'
import ValineGetCount from "./ValineGetCount";
import PropTypes from "prop-types";




export default class ValinePageview extends React.Component{


  render(){
    return (
      <ValineContext.Consumer>
        {contextProps=>{
          const {getPageview,curLang}=contextProps
          const {style,uniqStr,count,title}=this.props
          return (
            <ValineGetCount style={style}
                            fetchCount={getPageview}
                            title={title}
                            uniqStr={uniqStr}
                            count={count}
                            fetchTxt={curLang['tips']['pageview']}
            />
          )
        }
        }
      </ValineContext.Consumer>
    )
  }
}
ValinePageview.defaultProps={
  title:document.title
}

ValinePageview.propTypes = {
  count:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  style:PropTypes.object,
  title:PropTypes.string
}