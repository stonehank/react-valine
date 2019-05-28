import React from 'react'

export default class ValineGetCount extends React.Component{

  constructor(props){
    super(props)
    this.state={
      count:props.count,
      path:props.path
    }
    this._isMounted=false
  }

  componentDidMount(){
    this._isMounted=true
    this.props.fetchCount(this.state.path)
      .then(count=>{
        if(this._isMounted){
          this.setState({
            count
          })
        }
      })
  }
  componentDidUpdate(){
    this.props.fetchCount(this.state.path)
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
  path:decodeURI(window.location.origin+window.location.pathname),
  count:'获取中'
}