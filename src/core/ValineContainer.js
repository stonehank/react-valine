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
  updateFromList,
  simplyObj,
  getLinkWithoutProtocol,
  convertList2Hash,
  escape,
  globalState
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
    this.handleEdit=this.handleEdit.bind(this)
    this.checkCanEdit=this.checkCanEdit.bind(this)
    this.submitVerify=this.submitVerify.bind(this)
    this.createNewObj=this.createNewObj.bind(this)
    this.submitComment=this.submitComment.bind(this)
    this.togglePreviewShow=this.togglePreviewShow.bind(this)
    this.resetDefaultComment=this.resetDefaultComment.bind(this)
    this.getScrollTop=this.getScrollTop.bind(this)
    this.getParentElement=this.getParentElement.bind(this)
    this.calculateTopPosition=this.calculateTopPosition.bind(this)
    this.updateUserInfo=this.updateUserInfo.bind(this)
    this.addCommentToList=this.addCommentToList.bind(this)
    this.updateCommentFromList=this.updateCommentFromList.bind(this)

    this.resetDefaultComment()
    this.wrapRef=React.createRef()
    this.inputContainerRef=React.createRef()
    this.outerScrTop=null
    this.panelParentEle=null
    this.rScrollID=null
  }

  resetDefaultComment(){
    this.rScrollID=null
    this.defaultComment={
      rid:'',
      pid:'',
      mail:'',
      avatarSrc:'',
      link:'',
      comment:'',
      commentRaw:'',
      at:'',
      nick:'',
      uniqStr:this.props.uniqStr,
      ua:navigator.userAgent,
    }
  }
  updateUserInfo(){
    localStorage && localStorage.setItem('ValineCache', JSON.stringify({
      nick: this.defaultComment['nick'],
      link: getLinkWithoutProtocol(this.defaultComment['link']),
      mail: this.defaultComment['mail'],
      avatarSrc:this.defaultComment['avatarSrc']
    }));
  }

  addCommentToList(simplyItem){
    const {nest,updateCount,uniqStr,nestLayers}=this.props
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
  }

  updateCommentFromList(id,modifyObj){
    this.setState((prevState,)=>{
      let newList=updateFromList(prevState.commentList,id,modifyObj)
      return {
        commentList:newList,
        submitLoading:false
      }
    })
  }

  createNewObj(){
    const {curLang,uploadComment}=this.props
    return uploadComment(this.defaultComment).then((commentItem) => {
      if(!this.hasMounted)return
      if(globalState.ownerHash==null){
        globalState.ownerHash={}
      }
      globalState.ownerHash[commentItem.getObjectId()]=true
      let simplyItem=simplyObj(commentItem)
      this.updateUserInfo()

      this.addCommentToList(simplyItem)
      // console.log(this.rScrollID)
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
        this.rScrollID=null
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
  checkCanEdit(cid){
    const {checkIsOwner}=this.props
    return checkIsOwner(cid)
  }

  handleEdit({comment,id}){
    // console.log('handleEdit',comment)
    let checkR=this.submitVerify()
    return this.checkCanEdit(id).then((isOwner)=>{
      // console.log(isOwner)
      if(!isOwner){
        console.error('Is Not owner')
        return Promise.reject()
      }
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
          let newComment=xssMarkdown(comment)
          this.setState({
            submitLoading:true
          },()=>{
            return this.props.updateComment({id,comment:newComment,commentRaw:comment})
              .then((data)=>{
                if(Object.prototype.toString.call(data)==="[object Error]"){
                  throw new Error(data)
                }
                this.updateCommentFromList(id,{comment:newComment,commentRaw:comment})
                resolve()
              }).catch(()=>{
                this.setState({
                  submitLoading:false
                })
                throw new Error('Can not Save')
              })
          })
        }
      })
    })
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


  setCommentList([items,parentItems,counts,commentCounts,errorLog],nest){
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
      let nestList=convert2SimplyList(items)
      let parentList=convert2SimplyList(parentItems)
      commentList=mergeNestComment(parentList,nestList,this.props.nestLayers,false)
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
    const {fetchNest,fetchList,fetchOwnerTask}=this.props
    this.setState({
      fetchInitLoading:true
    })
    let fetchArr=[]
    fetchArr.push(fetchOwnerTask())
    if(this.props.nest){
      fetchArr.push(fetchNest())
    }else{
      fetchArr.push(fetchList())
  }
    Promise.all(fetchArr).then(([ownerList,commentList])=>{
      console.log(ownerList)
      globalState.ownerHash=convertList2Hash(convert2SimplyList(ownerList),'id')
      this.setCommentList(commentList,this.props.nest)
    })
  }


  componentWillUnmount(){
    clearTimeout(this.errorTimer)
    globalState.ownerHash=null
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
                          // toggleTextAreaFocus={toggleTextAreaFocus}
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
                              handleEdit={this.handleEdit}
                              fillNxtCommentList={this.fillNxtCommentList}
                              // for edit
                              previewShow={previewShow}
                              togglePreviewShow={this.togglePreviewShow}
        />
      </div>
    )
  }
}
