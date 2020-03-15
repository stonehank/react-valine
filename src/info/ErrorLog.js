import React from 'react'

export default class ErrorLog extends React.PureComponent{


  render(){
    const {errorLog}=this.props
    // console.log('render error')
    return (
      <div className={"vscreen-errorlog"}>
        <h6>Error</h6>
        <p>{errorLog}</p>
      </div>
    )
  }
}
