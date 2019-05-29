import React from 'react'
import ValineContext from './ValineContext'
import local from './assets/local'
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
      // placeholder:props.placeholder==null ? local[props.lang].tips.placeholder : local[props.lang].tips.placeholder=props.placeholder,
      nest:props.nest,
      pageSize:props.pageSize,
      // sofaEmpty:props.sofaEmpty==null ? local[props.lang].tips.sofa : local[props.lang].tips.sofa=props.sofaEmpty,
      previewShow:props.previewShow,
      updateCountHash:0,
      lang:props.lang,
    }
    if(props.customTxt!=null){
      let customTxt=props.customTxt
      if(Object.prototype.toString.call(customTxt)!=="[object Object]"){
        throw new Error("customTxt must be a object!")
      }
      for(let k in customTxt){
        if(customTxt.hasOwnProperty(k)){
          if(local[props.lang][k]){
            local[props.lang][k]=Object.assign({},local[props.lang][k],customTxt[k])
          }
        }
      }
    }
    if(props.placeholder!=null)local[props.lang].tips.placeholder=props.placeholder
    if(props.sofaEmpty!=null)local[props.lang].tips.sofa=props.sofaEmpty

    this.countMap=new Map()
    this.fetchCount=this.fetchCount.bind(this)
    this.updateCounts=this.updateCounts.bind(this)

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
    this.setState({
      updateCountHash:Math.floor(Math.random()*(1e9+7))
    })
  }

  render(){
    const {lang,...otherState}=this.state
    let curLang=local[lang]
    // let lang_txt={
    //   head_nick:curLang['head']['nick'],
    //   head_mail:curLang['head']['mail'],
    //   head_link:curLang['head']['link'],
    //   head_require:curLang["head"]["require"],
    //   head_change_avatar:curLang["head"]["change_avatar"],
    //   tips_count:curLang["tips"]["count"],
    //   tips_placeholder:curLang["tips"]["placeholder"],
    //   tips_sofa:curLang["tips"]["sofa"],
    //   tips_busy:curLang["tips"]["busy"],
    //   ctrl_reply:curLang["ctrl"]["reply"],
    //   ctrl_preview:curLang["ctrl"]["preview"],
    //   ctrl_preview_on:curLang["ctrl"]["preview_on"],
    //   ctrl_emoji:curLang["ctrl"]["emoji"],
    //   error_99:curLang["error"]["99"],
    //   error_100:curLang["error"]["100"],
    //   error_401:curLang["error"]["401"],
    //   error_403:curLang["error"]["403"],
    //   timeago_seconds:curLang["timeago"]["seconds"],
    //   timeago_minutes:curLang["timeago"]["minutes"],
    //   timeago_hours:curLang["timeago"]["hours"],
    //   timeago_days:curLang["timeago"]["days"],
    //   timeago_now:curLang["timeago"]["now"],
    //   verify_empty_content:curLang["verify"]["empty_content"],
    //   verify_require_nick:curLang["verify"]["require_nick"],
    //   verify_require_mail:curLang["verify"]["require_mail"],
    //   verify_email_format_failed:curLang["verify"]["email_format_failed"],
    //   verify_link_format_failed:curLang["verify"]["link_format_failed"],
    // }
    return (
      <ValineContext.Provider value={{curLang,fetchCount:this.fetchCount,updateCount:this.updateCounts,...otherState}}>
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
  lang:'zh-cn'
}

Valine.propTypes = {
  appId: PropTypes.string.isRequired,
  appKey: PropTypes.string.isRequired,
  requireName:PropTypes.bool,
  requireEmail:PropTypes.bool,
  nest:PropTypes.bool,
  pageSize:PropTypes.number,
  previewShow:PropTypes.bool,
  lang:PropTypes.oneOf(['zh-cn','en']),
  placeholder:PropTypes.string,
  sofaEmpty:PropTypes.string,
  customTxt:PropTypes.object
}