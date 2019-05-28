import React from 'react'
import ValineContext from './ValineContext'
import ValineGetCount from "./ValineGetCount";



export default class ValineCount extends React.Component{


  render(){
    return (
      <ValineContext.Consumer>
        {contextProps=>{
          const {fetchCount,updateCountHash}=contextProps
          const {style,path,count}=this.props
          return (
            <ValineGetCount style={style}
                            fetchCount={fetchCount}
                            updateCountHash={updateCountHash}
                            path={path}
                            count={count}
            />
          )
        }
        }
      </ValineContext.Consumer>
    )

  }
}