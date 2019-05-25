import React from 'react'
import ValineContext from './ValineContext'
import ValineGetCount from "./ValineGetCount";



export default class ValineCount extends React.Component{


  render(){
    return (
      <ValineContext.Consumer>
        {contextProps=>{
            const {fetchCount}=contextProps
            const {style,uniqStr,count}=this.props
            return (
              <ValineGetCount style={style}
                              fetchCount={fetchCount}
                              uniqStr={uniqStr}
                              count={count}
              />
            )
          }
        }
      </ValineContext.Consumer>
    )

  }
}