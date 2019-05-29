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
      sofaEmpty:props.sofaEmpty,
      previewShow:props.previewShow,
      updateCountHash:0
    }
    this.countMap=new Map()
    this.fetchCount=this.fetchCount.bind(this)
    this.updateCounts=this.updateCounts.bind(this)

    window.AV.init({
      appId:props.appId,
      appKey:props.appKey
    })
  }

  fetchCount(url){
    return new Promise(resolve=>{
      if(this.countMap.has(url)){
        resolve(this.countMap.get(url))
      }else{
        let AV=window.AV
        if(!AV){
          throw new Error("请检查依赖包是否存在`leancloud-storage`")
        }
        new AV.Query('Comment')
          .equalTo('url',url)
          .count()
          .then((counts)=>{
            this.countMap.set(url,counts)
            resolve(counts)
          })
      }
    })
  }

  updateCounts(url,count){
    this.countMap.set(url,count)
    this.setState({
      updateCountHash:Math.floor(Math.random()*(1e9+7))
    })
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
  sofaEmpty:'快来做第一个评论的人吧~',
  previewShow:true,
}