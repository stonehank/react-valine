import React from 'react'
import './css/index.scss'
import './css/github.min.scss'
import InfoComponent from "./info/InfoComponent";
import CommentListComponent from "./list/CommentListComponent";
import InputContainer from "./input/InputContainer";
import {
  xssMarkdown,
  replaceAt,
  contentAtVerify,
  linkVerify,
  emailVerify,
  mergeNestComment,
  convert2SimplyList,
  simplyObj
} from './utils'
import ErrorLog from "./info/ErrorLog";
const GRAVATAR_URL='https://gravatar.loli.net/avatar'


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

    this.fetchNest=this.fetchNest.bind(this)
    this.initQuery=this.initQuery.bind(this)
    this.handleReply=this.handleReply.bind(this)
    this.submitVerify=this.submitVerify.bind(this)
    this.createNewObj=this.createNewObj.bind(this)
    this.fetchMoreNest=this.fetchMoreNest.bind(this)
    this.submitComment=this.submitComment.bind(this)
    this.togglePreviewShow=this.togglePreviewShow.bind(this)
    this.setCommentList=this.setCommentList.bind(this)
    this.fillNxtCommentList=this.fillNxtCommentList.bind(this)
    this.resetDefaultComment=this.resetDefaultComment.bind(this)
    this.fetchNxtCommentList=this.fetchNxtCommentList.bind(this)


    this.resetDefaultComment()
    this.wrapRef=React.createRef()
    this.inputContainerRef=React.createRef()
    this.rScrollTop=null
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
    const {AV,nest,updateCount,uniqStr,curLang,nestLayers}=this.props
    // const {commentList}=this.state
    let Ct = AV.Object.extend('Comment');
    let comment = new Ct();

    for (let k in this.defaultComment) {
      if (this.defaultComment.hasOwnProperty(k)) {
        if (k === 'at')continue;
        let val = this.defaultComment[k];
        comment.set(k,val);
      }
    }
    comment.set('pid',this.defaultComment.pid)
    comment.set('url',location.pathname)
    return new Promise((resolve)=>{
      if(this.defaultComment.pid===''){
        comment.save().then(item=>{
          comment.set('rid',item.id)
          resolve()
        })
      }else{
        resolve()
      }
    }).then(()=>{
      let acl = new AV.ACL();
      acl.setPublicReadAccess(true);
      acl.setPublicWriteAccess(false);
      comment.setACL(acl);
      comment.save().then((commentItem) => {
        let simplyItem=simplyObj(commentItem)
        localStorage && localStorage.setItem('ValineCache', JSON.stringify({
          nick: this.defaultComment['nick'],
          link: this.defaultComment['link'],
          mail: this.defaultComment['mail'],
          avatarSrc:this.defaultComment['avatarSrc']
        }));

        this.setState((prevState,)=>{
          let newCommentList=[]
          if(nest && this.defaultComment.pid!==''){
            newCommentList=mergeNestComment(prevState.commentList,[simplyItem],nestLayers)
          }else{
            newCommentList=[simplyItem].concat(prevState.commentList)
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
        if(this.rScrollTop!=null){
          // document.documentElement.scrollTo(0,this.rScrollTop)
          window.scrollTo({
            top: this.rScrollTop,
            behavior: 'smooth'
          })
        }
        this.resetDefaultComment()
      }).catch(ex => {
        console.error("Something wrong with submit!",curLang.error[ex.code])
        this.setState({
          submitBtnDisable:false,
          submitLoading:false
        })
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
    // this.defaultComment.comment=this.state.commentContent
    let checkR=this.submitVerify()
    return new Promise((resolve,reject)=>{
      if(!checkR.state){
        if(this.state.errorLog!==checkR.errorStr){
          this.setState({
            errorLog:checkR.errorStr
          },()=>{
            setTimeout(()=>{
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
    const {requireName,requireEmail,curLang}=this.props
    const {nick,mail,comment,link,at,pid}=this.defaultComment
    let errorStr='',state=false,errObj=curLang.verify
    if(comment==='')errorStr=errObj['empty_content']
    else if(requireName && nick.trim()==='')errorStr=errObj['require_nick']
    else if(requireEmail && mail.trim()==='')errorStr=errObj['require_mail']
    else if(mail.trim()!=='' && !emailVerify(mail))errorStr=errObj['email_format_failed']
    else if(link.trim()!=='' && !linkVerify(link))errorStr=errObj['link_format_failed']
    else if(at!=='' && pid!==''){
      if(!contentAtVerify(comment,at)){
        this.defaultComment.pid=''
        this.defaultComment.at=''
      }else{
        this.defaultComment.comment=replaceAt(comment,pid)
      }
      state=true
    } else state=true
    return {state,errorStr}
  }


  handleReply(replyId,replyName,rid){
    this.defaultComment.pid=replyId
    this.defaultComment.at=replyName
    this.defaultComment.rid=rid
    let ele=this.wrapRef.current
    let scrTop=window.pageYOffset || document.documentElement.scrollTop
    let boundTop=ele.getBoundingClientRect().top
    let reachCeilTop=ele.offsetTop || scrTop+boundTop
    if(this.props.nest){
      this.rScrollTop=scrTop
    }
    let inputContainer= this.inputContainerRef.current
    if(!inputContainer){
      setTimeout(()=>{
        inputContainer.commentContentOnChange(null,`@${replyName} `)
      },0)
    }else{
      inputContainer.commentContentOnChange(null,`@${replyName} `)
    }

    this.setState((prevState)=>({
      toggleTextAreaFocus:!prevState.toggleTextAreaFocus
    }),()=>{
      window.scrollTo({
        top: reachCeilTop,
        behavior: 'smooth'
      })
    })
  }

  fetchNxtCommentList(){
    const {AV,pageSize,uniqStr}=this.props
    const {currentCounts,commentCounts}=this.state
    return new AV.Query('Comment')
      .equalTo("uniqStr",uniqStr)
      .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid'])
      .skip(currentCounts)
      .limit(pageSize)
      .addDescending('createdAt')
      .find()
      .then(items=>{
        if(items.length===0){
          return [null,null,null,null,"回复参数出现错误！无法获取剩下的回复"]
        }else{
          return [items,null,0,commentCounts]
        }
      })
  }
  initQuery(){
    const {AV,pageSize,uniqStr,fetchCount}=this.props
    let commentCounts=0
    return fetchCount(uniqStr).then(counts=>{
      commentCounts=counts
      if(commentCounts===0){
        return [null,null,null,0]
      }
      return new AV.Query('Comment')
        .equalTo('uniqStr',uniqStr)
        .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid'])
        .addDescending('createdAt')
        .limit(pageSize)
        .find()
        .then(items=>{
          return [items,null,0,commentCounts]
        })
    })
  }
  fillNxtCommentList(){
    let {currentCounts,commentCounts}=this.state
    if(currentCounts===commentCounts)return
    this.setState({
      fetchMoreLoading:true
    })
    if(this.props.nest){
      this.fetchMoreNest().then(list=>{
        this.setCommentList(list,true)
      })
    }else{
      this.fetchNxtCommentList().then(list=>{
        this.setCommentList(list,false)
      })
    }
  }

  fetchMoreNest(){
    let contains=[],simplyList=[]
    const {AV,uniqStr,pageSize}=this.props
    let {commentList}=this.state
    let addCounts=0
    return  new AV.Query('Comment')
      .equalTo('uniqStr',uniqStr)
      .equalTo('pid','')
      .addDescending('createdAt')
      .skip(commentList.length)
      .limit(pageSize)
      .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid'])
      .find()
      .then(items=>{
        if(items.length===0){
          return [null,null,null,null,"被 @ 的回复消失了，嵌套模式无法查看！"]
        }
        addCounts+=items.length
        for(let obj of items){
          simplyList.push(simplyObj(obj))
          contains.push(obj.get('rid'))
        }
        return new AV.Query('Comment')
          .equalTo('uniqStr',uniqStr)
          .notEqualTo('pid','')
          .containedIn('rid',contains)
          .addAscending('createdAt')
          .find()
          .then(items=>[items,simplyList,addCounts,null,null])
      })
  }

  fetchNest(){
    let contains=[],simplyList=[]
    const {AV,pageSize,fetchCount,uniqStr}=this.props
    let addCounts=0
    let commentCounts=0
    return fetchCount(uniqStr).then(counts=> {
      commentCounts = counts
      if (commentCounts === 0) {
        return [null,null,null,0]
      }
      let query1 =new AV.Query('Comment'), query2=new AV.Query('Comment')
      return query1.equalTo('uniqStr',uniqStr)
        .equalTo('pid','')
        .limit(pageSize)
        .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid'])
        .addDescending('createdAt')
        .find()
        .then(items=>{
          addCounts+=items.length
          for(let obj of items){
            simplyList.push(simplyObj(obj))
            contains.push(obj.get('rid'))
          }
          return query2.equalTo('uniqStr',uniqStr)
            .notEqualTo('pid','')
            .containedIn('rid',contains)
            .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid'])
            .addAscending('createdAt')
            .find()
            .then(items=>[items,simplyList,addCounts,commentCounts])
        })
    })
  }

  setCommentList([items,simplyList,counts,commentCounts,errorLog],nest){
    if(commentCounts===0 || errorLog!=null){
      this.setState({
        fetchInitLoading:false,
        fetchMoreLoading:false
      })
      if(errorLog!==this.state.errorLog){
        this.setState({
          errorLog
        },()=>{
          setTimeout(()=>{
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
      commentList=mergeNestComment(simplyList,simplyItems,this.props.nestLayers)
    }else{
      commentList=convert2SimplyList(items)
    }
    this.setState(prevState=>({
      commentList:prevState.commentList.concat(commentList),
      currentCounts:prevState.currentCounts+addCounts,
      commentCounts:commentCounts==null ? prevState.commentCounts : commentCounts,
      fetchInitLoading:false,
      fetchMoreLoading:false
    }))
  }

  componentDidMount(){
    this.setState({
      fetchInitLoading:true
    })
    if(this.props.nest){
      this.fetchNest()
        .then(list=>{
          this.setCommentList(list,true)
        })
    }else{
      this.initQuery()
        .then(list=>{
          this.setCommentList(list,false)
        })
    }
  }
  render(){

    const {
      requireName,
      requireEmail,
      curLang,
      nest,
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
      submitBtnDisable
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