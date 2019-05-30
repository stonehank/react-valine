import React from 'react'

export default class ErrorLog extends React.PureComponent{

  // constructor(props){
  //   super(props)
  //   this.state={
  //     remain:props.remain,
  //     show:false,
  //     errorLog:null
  //   }
  // }
  // static getDerivedStateFromProps(props,state){
  //   if(props.errorLog!==state.errorLog){
  //     return {
  //       errorLog:props.errorLog,
  //       show:true
  //     }
  //   }else{
  //     setTimeout(()=>({
  //         errorLog:null,
  //         show:false
  //       }),state.remain)
  //   }
  // }
  // componentDidMount(){
  //   const {remain}=this.state
  //   console.log(this.props.errorLog)
  //   if(this.props.errorLog==null)return
  //   this.setState({
  //     show:true,
  //     errorLog:this.props.errorLog
  //   },()=>{
  //     setTimeout(()=>{
  //       this.setState({
  //         show:false,
  //         errorLog:null
  //       })
  //     },remain)
  //   })
  // }

  // componentDidUpdate(){
    // setTimeout(()=>{
    //   this.setState({
    //     errorLog:null,
    //     show:false
    //   })
    // },this.state.remain)
  // }

  render(){
    const {errorLog,show}=this.props
    const scrollTop=document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop
    return (
      // show
      // ?
        <div className={"vscreen-errorlog"} style={{ transform: `translateY(${scrollTop}px)`}}>{errorLog}</div>
      // : null
    )
  }
}

ErrorLog.defaultProps={
  remain:2000
}