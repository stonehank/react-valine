import React from 'react'
import {ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'

export default class ValineLink extends React.Component{
  constructor(props){
    super(props)
    this.state={
      show:false
    }
    this.toggleShow=this.toggleShow.bind(this)
  }
  toggleShow(){
    this.setState(pS=>({
      show:!pS.show
    }))
  }
  render(){
    const {show}=this.state
    const {uniqStr}=this.props
    return (
      <div className="App">
        <button className={"toggle-show"} onClick={this.toggleShow}>toggle</button>
        {
          show
        ? <header className="App-header">
            <span id="commentCounts">
              评论数：<ValineCount uniqStr={uniqStr}/>
            </span>
                <br/>
                <span id="pageviewCounts">
               浏览量：<ValinePageview uniqStr={uniqStr}/>
            </span>
          </header>
        : <div className={"App-body"}>
            <ValinePanel uniqStr={uniqStr} />
          </div>
        }

      </div>
    )
  }
}