import React from 'react'

export default class ValineGetCount extends React.Component{

  constructor(props){
    super(props)
    const {fetchTxt,count,uniqStr}=props
    this.state={
      count:count==null ? fetchTxt : count,
      uniqStr,
    }
    this._isMounted=false
  }

  componentDidMount(){
    this._isMounted=true
    this.props.fetchCount(this.state.uniqStr,this.props.title)
      .then(count=>{
        if(this._isMounted){
          this.setState({
            count
          })
        }
      })
  }

  componentDidUpdate(){
    if(!this.props.fetchOnUpdate)return
    this.props.fetchCount(this.state.uniqStr,this.props.title)
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
    const {themeMode,className}=this.props
    return <span className={`theme-${themeMode} ${className} vcounter`} style={this.props.style}>{this.state.count}</span>
  }
}

ValineGetCount.defaultProps={
  uniqStr:decodeURI(window.location.origin+window.location.pathname),
  fetchOnUpdate:true
}
