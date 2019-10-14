import React from 'react'
import InfoComponent from "../info/InfoComponent";
import CommentListComponent from "../list/CommentListComponent";
import InputContainer from "../input/InputContainer";
import {
  xssMarkdown,
  replaceAt,
  contentAtVerify,
  mergeNestComment,
  convert2SimplyList,
  simplyObj, getLinkWithoutProtocol
} from '../utils'
import ErrorLog from "../info/ErrorLog";
const GRAVATAR_URL='https://gravatar.loli.net/avatar'

function scrollTo(eles,vals){
  for(let i=0;i<eles.length;i++){
    eles[i].scrollTo({
      top:vals[i],
      behavior: 'smooth'
    })
  }
}


export default class ValineContainer extends React.Component{

  constructor(props){
    super(props)
    this.state={
      previewShow:props.previewShow,
      commentCounts:0,
      currentCounts:0,
      commentList:[],
      toggleTextAreaFocus:false,
      submitBtnDisable:false,
      submitLoading:false,
      fetchInitLoading:false,
      fetchMoreLoading:false,
      errorLog:null
    }
    this.hasMounted=false
    this.fillNxtCommentList=this.fillNxtCommentList.bind(this)
    this.setCommentList=this.setCommentList.bind(this)
    this.handleReply=this.handleReply.bind(this)
    this.submitVerify=this.submitVerify.bind(this)
    this.createNewObj=this.createNewObj.bind(this)
    this.submitComment=this.submitComment.bind(this)
    this.togglePreviewShow=this.togglePreviewShow.bind(this)
    this.resetDefaultComment=this.resetDefaultComment.bind(this)
    this.getScrollTop=this.getScrollTop.bind(this)
    this.getParentElement=this.getParentElement.bind(this)
    this.calculateTopPosition=this.calculateTopPosition.bind(this)


    this.resetDefaultComment()
    this.wrapRef=React.createRef()
    this.inputContainerRef=React.createRef()
    this.outerScrTop=null
    this.panelParentEle=null
    this.rScrollID=null
  }

  resetDefaultComment(){
    this.defaultComment={
      rid:'',
      pid:'',
      mail:'',
      avatarSrc:'',
      link:'',
      comment:'',
      at:'',
      nick:'',
      uniqStr:this.props.uniqStr,
      ua:navigator.userAgent,
    }
  }

  createNewObj(){
    const {nest,updateCount,uniqStr,curLang,nestLayers,uploadComment}=this.props
    return uploadComment(this.defaultComment).then((commentItem) => {
      if(!this.hasMounted)return
      let simplyItem=simplyObj(commentItem)
      localStorage && localStorage.setItem('ValineCache', JSON.stringify({
        nick: this.defaultComment['nick'],
        link: getLinkWithoutProtocol(this.defaultComment['link']),
        mail: this.defaultComment['mail'],
        avatarSrc:this.defaultComment['avatarSrc']
      }));

      this.setState((prevState,)=>{
        let newCommentList=[]
        if(nest && this.defaultComment.pid!==''){
          newCommentList=mergeNestComment(prevState.commentList,[simplyItem],nestLayers,true)
        }else{
          newCommentList=[simplyItem].concat(prevState.commentList)
        }
        // 在初始获取的时候进行添加，有可能会重复，当检测到id相同，删除开头(避免重复)
        if(newCommentList.length>1 && newCommentList[0].id===newCommentList[1].id){
          newCommentList.shift()
        }

        return {
          commentList:newCommentList,
          commentCounts:prevState.commentCounts+1,
          currentCounts:prevState.currentCounts+1,
          submitBtnDisable:false,
          submitLoading:false
        }
      },()=>{
        updateCount(uniqStr,this.state.commentCounts)
      })
      if(this.rScrollID!=null){
        let ele=document.getElementById(this.rScrollID),
          eleH=ele.offsetHeight
        let childEles=ele.getElementsByClassName("vquote")[0].childNodes,
          lastChildH=childEles[childEles.length-1].offsetHeight
        let [innerScrTop,outerScrTop]=this.getScrollTop(ele,this.panelParentEle)
        if(this.props.useWindow){
          scrollTo([window],[eleH+outerScrTop-lastChildH])
        }else{
          scrollTo([window,this.panelParentEle],[this.outerScrTop,eleH+innerScrTop-lastChildH])
        }
      }
      this.resetDefaultComment()
    }).catch(ex => {
      console.error("Something wrong with submit!",curLang.error[ex.code],ex)
      this.setState({
        submitBtnDisable:false,
        submitLoading:false,
        errorLog:"Something wrong with submit!"
      },()=>{
        setTimeout(()=>{
          this.setState({
            errorLog:null
          })
        },2000)
      })
    })
  }

  togglePreviewShow(){
    this.setState((prevState)=>({
      previewShow:!prevState.previewShow
    }))
  }

  submitComment(defaultComment){
    for(let k in defaultComment){
      if(defaultComment.hasOwnProperty(k)){
        this.defaultComment[k]=defaultComment[k]
      }
    }
    let checkR=this.submitVerify()
    return new Promise((resolve,reject)=>{
      if(!checkR.state){
        if(checkR.errorStr!=null && this.state.errorLog!==checkR.errorStr){
          this.setState({
            errorLog:checkR.errorStr
          },()=>{
            this.errorTimer=setTimeout(()=>{
              this.setState({
                errorLog:null
              })
            },2000)
          })
        }
        reject()
      }else{
        this.defaultComment.comment=xssMarkdown(this.defaultComment.comment)
        this.setState({
          submitBtnDisable:true,
          submitLoading:true
        },()=>{
          this.createNewObj().then(()=>{
            resolve()
          })
        })
      }
    })

  }




  submitVerify(){
    const {comment,at,pid}=this.defaultComment
    if(at!=='' && pid!==''){
      if(!contentAtVerify(comment,at)){
        this.defaultComment.pid=''
        this.defaultComment.at=''
      }else{
        this.defaultComment.comment=replaceAt(comment,pid)
      }
    }
    return {state:true,errorStr:null}
  }

  getParentElement(el) {
    const scrollParent = this.props.getPanelParent && this.props.getPanelParent();
    if (scrollParent != null) {
      return scrollParent;
    }
    return el && el.parentNode;
  }

  calculateTopPosition(el) {
    if(!el)return 0
    return el.offsetTop + this.calculateTopPosition(el.offsetParent);
  }

  getScrollTop(ele,parentEle){
    let innerScrollTop=0,outerScrollTop=0
    if(this.props.useWindow){
      let doc=document.documentElement || document.body.parentNode || document.body
      let scrollTop=window.pageYOffset!=null ? window.pageYOffset : doc.scrollTop
      let screenTop=ele.getBoundingClientRect().top
      outerScrollTop=scrollTop+screenTop
    }else{
      if(ele.offsetParent===parentEle){
        innerScrollTop=ele.offsetTop
      }else{
        innerScrollTop=ele.offsetTop-parentEle.offsetTop
      }
      outerScrollTop=this.calculateTopPosition(parentEle)
    }
    return [innerScrollTop,outerScrollTop]
  }

  handleReply(replyId,replyName,rid){
    this.defaultComment.pid=replyId
    this.defaultComment.at=replyName
    this.defaultComment.rid=rid
    let ele=this.wrapRef.current
    this.panelParentEle=this.getParentElement(ele)
    let [innerScrTop,outerScrTop]=this.getScrollTop(ele,this.panelParentEle)

    let isReply=replyId && replyName && rid
    if(isReply && this.props.nest){
      this.outerScrTop=outerScrTop
      this.rScrollID=replyId
    }
    if(isReply){
      let inputContainer= this.inputContainerRef.current
      if(!inputContainer){
        setTimeout(()=>{
          inputContainer.commentContentOnChange(null,`@${replyName} `)
        },0)
      }else{
        inputContainer.commentContentOnChange(null,`@${replyName} `)
      }
    }
    this.setState((prevState)=>({
      toggleTextAreaFocus:!prevState.toggleTextAreaFocus
    }),()=>{
      if(this.props.useWindow){
        scrollTo([window],[outerScrTop])
      }else{
        scrollTo([this.panelParentEle,window],[innerScrTop,outerScrTop])
      }
      location.hash="reply"
    })
  }

  fillNxtCommentList(){
    const {fetchMoreNest,fetchMoreList}=this.props
    let {currentCounts,commentCounts,commentList}=this.state
    if(currentCounts===commentCounts)return
    if(!this.hasMounted)return
    this.setState({
      fetchMoreLoading:true
    })
    if(this.props.nest){
      fetchMoreNest(commentList.length).then(list=>{
        this.setCommentList(list,true)
      })
    }else{
      fetchMoreList(commentList.length).then(list=>{
        this.setCommentList(list,false)
      })
    }
  }

  setCommentList([items,simplyList,counts,commentCounts,errorLog],nest){
    if(!this.hasMounted)return
    if(commentCounts===0 || errorLog!=null){
      this.setState({
        fetchInitLoading:false,
        fetchMoreLoading:false
      })
      if(errorLog!==this.state.errorLog){
        this.setState({
          errorLog,
          currentCounts:this.state.commentCounts
        },()=>{
          this.errorTimer=setTimeout(()=>{
            this.setState({
              errorLog:null
            })
          },2000)
        })
      }
      return
    }
    let addCounts=counts+items.length
    let commentList=[]
    if(nest){
      let simplyItems=[]
      for(let obj of items)simplyItems.push(simplyObj(obj))
      commentList=mergeNestComment(simplyList,simplyItems,this.props.nestLayers,false)
    }else{
      commentList=convert2SimplyList(items)
    }
    this.setState(prevState=>{
      let newCommentList=prevState.commentList.concat(commentList)

      // 在初始获取的时候进行添加，有可能会重复，当检测到id相同，删除开头(避免重复)
      if(newCommentList.length>1 && newCommentList[0].id===newCommentList[1].id){
        newCommentList.shift()
      }
      return {
        commentList:newCommentList,
        currentCounts:prevState.currentCounts+addCounts,
        commentCounts:commentCounts==null ? prevState.commentCounts : commentCounts,
        fetchInitLoading:false,
        fetchMoreLoading:false
      }
    })
  }

  componentDidMount(){
    this.hasMounted=true
    const {fetchNest,fetchList}=this.props
    this.setState({
      fetchInitLoading:true
    })
    if(this.props.nest){
      fetchNest()
        .then(list=>{
          this.setCommentList(list,true)
        })
    }else{
      fetchList()
        .then(list=>{
          this.setCommentList(list,false)
        })
    }
  }
  componentWillUnmount(){
    clearTimeout(this.errorTimer)
    this.errorTimer=null
    this.hasMounted=false
  }


  render(){

    const {
      requireName,
      requireEmail,
      curLang,
      nest,
      emojiListSize
    }=this.props

    const {
      commentCounts,
      currentCounts,
      commentList,
      fetchInitLoading,
      fetchMoreLoading,
      errorLog,
      toggleTextAreaFocus,
      previewShow,
      submitLoading,
      submitBtnDisable,
    }=this.state
    return (
      <div ref={this.wrapRef} className="v">
        {
          errorLog!=null
            ? <ErrorLog errorLog={errorLog}/>
            : null
        }
        <div className="vwrap">
          <InputContainer submitBtnDisable={submitBtnDisable}
                          ref={this.inputContainerRef}
                          requireName={requireName}
                          requireEmail={requireEmail}
                          curLang={curLang}
                          GRAVATAR_URL={GRAVATAR_URL}
                          emojiListSize={emojiListSize}
                          toggleTextAreaFocus={toggleTextAreaFocus}
                          previewShow={previewShow}
                          submitComment={this.submitComment}
                          togglePreviewShow={this.togglePreviewShow}
          />
        </div>
        <InfoComponent  lang_comments={curLang["tips"]["comments"]} commentCounts={commentCounts}/>
        <CommentListComponent GRAVATAR_URL={GRAVATAR_URL}
                              commentCounts={commentCounts}
                              currentCounts={currentCounts}
                              commentList={commentList}
                              curLang={curLang}
                              nest={nest}
                              submitLoading={submitLoading}
                              fetchMoreLoading={fetchMoreLoading}
                              fetchInitLoading={fetchInitLoading}
                              handleReply={this.handleReply}
                              fillNxtCommentList={this.fillNxtCommentList}
        />
      </div>
    )
  }
}
