import React from 'react'
import ValineContext from './ValineContext'
import locales from './assets/locales'
import PropTypes from 'prop-types';


const AV=require('leancloud-storage')

window.AV=AV

export default class Valine extends React.Component{

  constructor(props){
    super(props)
    this.state={
      AV:window.AV,
      requireName:props.requireName,
      requireEmail:props.requireEmail,
      nest:props.nest,
      pageSize:props.pageSize,
      previewShow:props.previewShow,
      updateCountHash:0,
      lang:props.lang,
      nestLayers:props.nestLayers,
      showEmojiNum:props.showEmojiNum,
      // useWindow:props.useWindow,
      // getPanelParent:props.getPanelParent
    }
    if(props.customTxt!=null){
      let customTxt=props.customTxt
      if(Object.prototype.toString.call(customTxt)!=="[object Object]"){
        throw new Error("customTxt must be a object!")
      }
      for(let k in customTxt){
        if(customTxt.hasOwnProperty(k)){
          if(locales[props.lang][k]){
            locales[props.lang][k]=Object.assign({},locales[props.lang][k],customTxt[k])
          }
        }
      }
    }
    if(props.placeholder!=null)locales[props.lang].tips.placeholder=props.placeholder
    if(props.sofaEmpty!=null)locales[props.lang].tips.sofa=props.sofaEmpty

    this.countMap=new Map()
    this.pageviewMap=new Map()
    this.fetchCount=this.fetchCount.bind(this)
    this.updateCounts=this.updateCounts.bind(this)
    this.getPageview=this.getPageview.bind(this)
    this.createCounter=this.createCounter.bind(this)
    if(!window.AV){
      throw new Error("leancloud 导入失败，请刷新重试！")
    }
    window.AV.init({
      appId:props.appId,
      appKey:props.appKey
    })
  }

  fetchCount(uniqStr){
    return new Promise(resolve=>{
      if(this.countMap.has(uniqStr)){
        resolve(this.countMap.get(uniqStr))
      }else{
        let AV=window.AV
        let query= new AV.Query('Comment')
        query.equalTo('uniqStr',uniqStr)
          .count()
          .then((counts)=>{
            this.countMap.set(uniqStr,counts)
            resolve(counts)
          })
        query=null
      }
    })
  }

  updateCounts(uniqStr,count){
    this.countMap.set(uniqStr,count)
    this.setState({
      updateCountHash:Math.floor(Math.random()*(1e9+7))
    })
  }

  getPageview(uniqStr,title){
    return new Promise(resolve=>{
      if(this.pageviewMap.has(uniqStr)){
        resolve(this.pageviewMap.get(uniqStr))
      }else{
        let AV=window.AV
        let query= new AV.Query('Counter')
        query.equalTo('uniqStr',uniqStr)
          .find()
          .then(items=>{
            if(items.length===0){
              this.createCounter(uniqStr,title)
                .then(()=>resolve(1))
            }else{
              if(items.length>1)console.warn("Warning!The uniqStr is not unique!")
              let item=items[0]
              let updateTime=item.get("time")+1
              item.increment("time")
              item.set('title',title)
              item.save().then(()=>{
                this.pageviewMap.set(uniqStr,updateTime)
                resolve(updateTime)
              }).catch(ex=>{
                resolve(updateTime-1)
              })
            }
          }).catch(ex=>{
            if(ex.code===101){
              this.createCounter(uniqStr,title)
                .then(()=>resolve(1))
            }else{
              console.error(locales[this.props.lang]["error"][ex.code],ex)
            }
        })
        query=null
      }
    })
  }

  createCounter(uniqStr,title=''){
    let AV=window.AV
    let Ct = AV.Object.extend('Counter');
    let newCounter = new Ct();
    let acl = new AV.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true);
    newCounter.setACL(acl);
    newCounter.set('uniqStr', uniqStr)
    newCounter.set('title', title)
    newCounter.set('time', 1)
    return newCounter.save().then(() => {
      this.pageviewMap.set(uniqStr,1)
    }).catch(ex => {
      console.error(locales[this.props.lang]["error"][ex.code],ex)
    });
  }


  render(){
    const {lang,...otherState}=this.state
    let curLang=locales[lang]
    return (
      <ValineContext.Provider value={{curLang,getPageview:this.getPageview, fetchCount:this.fetchCount,updateCount:this.updateCounts,...otherState}}>
        {this.props.children}
      </ValineContext.Provider>
    )

  }
}

Valine.defaultProps={
  requireName:true,
  requireEmail:false,
  nest:true,
  pageSize:10,
  previewShow:true,
  lang:'zh-cn',
  nestLayers:Infinity,
  showEmojiNum:5
}

Valine.propTypes = {
  appId: PropTypes.string.isRequired,
  appKey: PropTypes.string.isRequired,
  requireName:PropTypes.bool,
  requireEmail:PropTypes.bool,
  nest:PropTypes.bool,
  // useWindow:PropTypes.bool,
  pageSize:PropTypes.number,
  previewShow:PropTypes.bool,
  lang:PropTypes.oneOf(['zh-cn','en']),
  placeholder:PropTypes.string,
  sofaEmpty:PropTypes.string,
  customTxt:PropTypes.object,
  nestLayers:PropTypes.number,
  showEmojiNum:PropTypes.number,
  // getPanelParent:PropTypes.func
}