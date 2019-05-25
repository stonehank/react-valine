import React from 'react'
import ValineContext from './ValineContext'
const AV=require('leancloud-storage')

window.AV=AV


export default class Valine extends React.Component{

  constructor(props){
    super(props)
    this.state={
      AV:window.AV,
      requireName:props.requireName,
      requireEmail:props.requireEmail,
      placeholder:props.placeholder,
      nest:props.nest,
      pageSize:props.pageSize,
      emptyTxt:props.emptyTxt,
      previewShow:props.previewShow,
    }
    this.countMap=new Map()
    this.fetchCount=this.fetchCount.bind(this)
    this.updateCounts=this.updateCounts.bind(this)
  }

  fetchCount(uniqStr){
    return new Promise(resolve=>{
      if(this.countMap.has(uniqStr)){
        resolve(this.countMap.get(uniqStr))
      }else{
        let AV=window.AV
        if(!AV)return
        new AV.Query('Comment')
          .equalTo('uniqStr',uniqStr)
          .count()
          .then((counts)=>{
            this.countMap.set(uniqStr,counts)
            resolve(counts)
          })
      }
    })
  }

  updateCounts(uniqStr,count){
    this.countMap.set(uniqStr,count)
  }

  componentDidMount(){
    const {appId,appKey}=this.props
    // const {AV}=this.state
    // if(!AV){
    //   import('leancloud-storage').then(module=>{
    //     window.AV=module.default
    window.AV.init({appId,appKey})
    // this.setState({
    //   AV:window.AV
    // })
    // })
    // }
  }

  render(){
    const {appId,appKey}=this.props
    return (
      <ValineContext.Provider value={{appId,appKey,fetchCount:this.fetchCount,updateCount:this.updateCounts,...this.state}}>
        {this.props.children}
      </ValineContext.Provider>
    )

  }
}

Valine.defaultProps={
  requireName:true,
  requireEmail:false,
  placeholder:"说点什么吧",
  nest:true,
  pageSize:10,
  emptyTxt:'快来做第一个评论的人吧~',
  previewShow:true,
}