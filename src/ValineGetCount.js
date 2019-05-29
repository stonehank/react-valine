import React from 'react'

export default class ValineGetCount extends React.Component{

  constructor(props){
    super(props)
    const {fetchTxt,count,url}=props
    this.state={
      count:count==null ? fetchTxt : count,
      url,
    }
    this._isMounted=false
  }

  componentDidMount(){
    this._isMounted=true
    this.props.fetchCount(this.state.url)
      .then(count=>{
        if(this._isMounted){
          this.setState({
            count
          })
        }
      })
  }
  componentDidUpdate(){
    this.props.fetchCount(this.state.url)
      .then(count=>{
        if(count===this.state.count)return
        if(this._isMounted){
          this.setState({
            count
          })
        }
      })
  }

  componentWillUnmount(){
    this._isMounted=false
  }

  render(){
    return <span style={this.props.style}>{this.state.count}</span>
  }
}

ValineGetCount.defaultProps={
  url:decodeURI(window.location.origin+window.location.pathname),
}