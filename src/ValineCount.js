import React from 'react'
import ValineContext from './ValineContext'
import ValineGetCount from "./ValineGetCount";
import PropTypes from "prop-types";



export default class ValineCount extends React.Component{

  render(){
    return (
      <ValineContext.Consumer>
        {contextProps=>{
          const {fetchCount,updateCountHash,curLang}=contextProps
          const {style,uniqStr,count}=this.props
          return (
            <ValineGetCount style={style}
                            fetchCount={fetchCount}
                            updateCountHash={updateCountHash}
                            uniqStr={uniqStr}
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

ValineCount.propTypes = {
  count:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  style:PropTypes.object,
  uniqStr:PropTypes.any
}