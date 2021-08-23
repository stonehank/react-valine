import React from 'react'
import ValineContext from './ValineContext'
import locales from './assets/locales.json'
import PropTypes from 'prop-types'
import FetchResourceContainer from './core/FetchResourceContainer'

export default class Valine extends FetchResourceContainer{

  constructor(props){
    super(props)
    this.state={
      initialLoading:true,
      CommentClass:props.CommentClass,
      CounterClass:props.CounterClass,
      UserClass:'_User',
      requireName:props.requireName,
      requireEmail:props.requireEmail,
      nest:props.nest,
      nestLayers:props.nestLayers,
      pageSize:props.pageSize,
      previewShow:props.previewShow,
      lang:props.lang,
      themeMode:props.themeMode,
      emojiListSize:props.emojiListSize,
      editMode:props.editMode
    }
    if(props.customTxt!=null){
      let customTxt=props.customTxt
      if(Object.prototype.toString.call(customTxt)!=="[object Object]"){
        throw new Error("customTxt must be a object!")
      }
      for(let k in customTxt){
        if(Object.prototype.hasOwnProperty.call(customTxt,k)){
          if(locales[props.lang][k]){
            locales[props.lang][k]=Object.assign({},locales[props.lang][k],customTxt[k])
          }
        }
      }
    }
    if(props.placeholder!=null)locales[props.lang].tips.placeholder=props.placeholder
    if(props.sofaEmpty!=null)locales[props.lang].tips.sofa=props.sofaEmpty

  }

  componentDidUpdate(){
    if(this.props.themeMode !== this.state.themeMode){
      this.setState({
        themeMode:this.props.themeMode
      })
    }
  }

  componentDidMount(){
    this.initAVObject().then(()=>{
      this.setState({
        initialLoading:false
      })
    })
  }

  render(){
    // eslint-disable-next-line
    const {CommentClass,CounterClass,UserClass,pageSize,lang,...otherState}=this.state
    let curLang=locales[lang]
    return (
        <ValineContext.Provider value={
          {
            curLang,
            fetchNest:this.fetchNest,
            fetchMoreNest:this.fetchMoreNest,
            fetchList:this.fetchList,
            fetchMoreList:this.fetchMoreList,
            fetchOwnerTask:this.fetchOwnerTask,
            uploadComment:this.uploadComment,
            updateComment:this.updateComment,
            checkCanEdit:this.checkCanEdit,
            fetchCount:this.fetchCount,
            updateCounts:this.updateCounts,
            getPageview:this.getPageview,
            createCounter:this.createCounter,
            getUser:this.getUser,
            initialLoading:this.state.initialLoading,
            ...otherState
          }
        }
        >
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
  emojiListSize:5,
  editMode:false,
  CommentClass:'Comment',
  CounterClass:'Counter',
  themeMode:'light'
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
  customTxt:PropTypes.object,
  nestLayers:PropTypes.number,
  emojiListSize:PropTypes.number,
  editMode:PropTypes.bool,
  CommentClass:PropTypes.string,
  CounterClass:PropTypes.string,
  themeMode:PropTypes.string
}
