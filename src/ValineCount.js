import React from 'react'
import ValineContext from './ValineContext'
import ValineGetCount from "./ValineGetCount";



export default class ValineCount extends React.Component{


  render(){
    return (
      <ValineContext.Consumer>
        {contextProps=>{
          const {fetchCount,updateCountHash}=contextProps
          const {style,url,count}=this.props
          return (
            <ValineGetCount style={style}
                            fetchCount={fetchCount}
                            updateCountHash={updateCountHash}
                            url={url}
                            count={count}
            />
          )
        }
        }
      </ValineContext.Consumer>
    )

  }
}