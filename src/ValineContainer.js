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
      submitErrorLog:null
    }

    this.fetchNest=this.fetchNest.bind(this)
    this.initQuery=this.initQuery.bind(this)
    this.handleReply=this.handleReply.bind(this)
    this.submitVerify=this.submitVerify.bind(this)
    this.createNewObj=this.createNewObj.bind(this)
    this.fetchMoreNest=this.fetchMoreNest.bind(this)
    this.submitComment=this.submitComment.bind(this)
    this.togglePreviewShow=this.togglePreviewShow.bind(this)
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
    const {AV,nest,updateCount,uniqStr,curLang}=this.props
    const {commentList}=this.state
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
        let newCommentList=[]
        if(nest && this.defaultComment.pid!==''){
          newCommentList=mergeNestComment(commentList,[simplyItem])
        }else{
          newCommentList=[simplyItem].concat(commentList)
        }
        localStorage && localStorage.setItem('ValineCache', JSON.stringify({
          nick: this.defaultComment['nick'],
          link: this.defaultComment['link'],
          mail: this.defaultComment['mail'],
          avatarSrc:this.defaultComment['avatarSrc']
        }));

        this.setState((prevState,)=>({
          commentList:newCommentList,
          commentCounts:prevState.commentCounts+1,
          currentCounts:prevState.currentCounts+1,
          submitBtnDisable:false,
          // commentContent:'',
          submitLoading:false
        }),()=>{
          updateCount(uniqStr,this.state.commentCounts)
        })
        if(this.rScrollTop!=null)document.documentElement.scrollTo(0,this.rScrollTop)
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
        this.setState({
          submitErrorLog:checkR.errorStr
        },()=>{
          setTimeout(()=>{
            this.setState({
              submitErrorLog:null
            })
          },2000)
        })
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
    if(comment==='')errorStr=errObj['empty_comment']
    else if(requireName && nick.trim()==='')errorStr=errObj['if_require_nick']
    else if(requireEmail && mail.trim()==='')errorStr=errObj['if_require_mail']
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
    // console.log(replyId,replyName,rid)
    this.defaultComment.pid=replyId
    this.defaultComment.at=replyName
    this.defaultComment.rid=rid
    let ele=this.wrapRef.current
    let scrTop=document.documentElement.scrollTop
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
      document.documentElement.scrollTo(0,reachCeilTop)
    })
  }

  fillNxtCommentList(){
    if(this.props.nest){
      this.fetchMoreNest()
    }else{
      this.fetchNxtCommentList()
    }
  }

  fetchNxtCommentList(){
    const {AV,pageSize}=this.props
    const {currentCounts,commentCounts}=this.state
    let query=new AV.Query('Comment')
    if(currentCounts===commentCounts)return
    this.setState({
      fetchMoreLoading:true
    })
    return query
      .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid'])
      .skip(currentCounts)
      .limit(pageSize)
      .addDescending('createdAt')
      .find()
      .then(commentArr=>{
        if(commentArr.length===0){
          this.setState({
            fetchMoreLoading:false
          })
        }else{
          let insertList=convert2SimplyList(commentArr)
          this.setState((prevState)=>({
            commentList:prevState.commentList.concat(insertList),
            currentCounts:prevState.currentCounts+commentArr.length,
            fetchMoreLoading:false
          }))
        }
        query=null
      })
  }

  fetchMoreNest(){
    let contains=[],simplyList=[]
    const {AV,uniqStr,pageSize}=this.props
    let {currentCounts,commentList,commentCounts}=this.state
    let newCurrentCounts=0
    if(currentCounts===commentCounts)return
    this.setState({
      fetchMoreLoading:true
    })
    let query1= new AV.Query('Comment'),query2= new AV.Query('Comment')
    query1.equalTo('uniqStr',uniqStr)
      .equalTo('pid','')
      .addDescending('createdAt')
      .skip(commentList.length)
      .limit(pageSize)
      .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid'])
      .find()
      .then(items=>{
        if(items.length===0){
          this.setState({
            fetchMoreLoading:false
          })
          return
        }
        newCurrentCounts+=items.length
        for(let obj of items){
          simplyList.push(simplyObj(obj))
          contains.push(obj.get('rid'))
        }
        query2.equalTo('uniqStr',uniqStr)
          .notEqualTo('pid','')
          .containedIn('rid',contains)
          .addAscending('createdAt')
          .find()
          .then(items=>{
            newCurrentCounts+=items.length
            let simplyItems=[]
            for(let obj of items)simplyItems.push(simplyObj(obj))
            let newCommentList=mergeNestComment(simplyList,simplyItems)
            this.setState({
              commentList:commentList.concat(newCommentList),
              currentCounts:currentCounts+newCurrentCounts,
              fetchInitLoading:false,
              fetchMoreLoading:false
            })
            query1=null
            query2=null
          })
      })
  }

  fetchNest(){
    let contains=[],simplyList=[],commentList=[]
    const {AV,pageSize,fetchCount,uniqStr}=this.props
    let currentCounts=0
    let commentCounts=0
    this.setState({
      fetchInitLoading:true
    })
    return fetchCount(uniqStr).then(counts=> {
      commentCounts = counts
      if (commentCounts === 0) {
        this.setState({
          fetchInitLoading: false
        })
        return
      }
      let query1 =new AV.Query('Comment'), query2=new AV.Query('Comment')
      query1.equalTo('uniqStr',uniqStr)
        .equalTo('pid','')
        .limit(pageSize)
        .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid'])
        .addDescending('createdAt')
        .find()
        .then(items=>{
          currentCounts+=items.length
          for(let obj of items){
            simplyList.push(simplyObj(obj))
            contains.push(obj.get('rid'))
          }
          query2.equalTo('uniqStr',uniqStr)
            .notEqualTo('pid','')
            .containedIn('rid',contains)
            .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid'])
            .addAscending('createdAt')
            .find()
            .then(items=>{
              currentCounts+=items.length
              let simplyItems=[]
              for(let obj of items)simplyItems.push(simplyObj(obj))
              commentList=mergeNestComment(simplyList,simplyItems)
              this.setState({
                commentList,
                commentCounts,
                currentCounts,
                fetchInitLoading:false,
                fetchMoreLoading:false
              })
              query1=null
              query2=null
            })
        })
    })
  }


  initQuery(){
    const {AV,pageSize,uniqStr,fetchCount}=this.props
    let commentCounts=0
    this.setState({
      fetchInitLoading:true
    })
    return fetchCount(uniqStr).then(counts=>{
      commentCounts=counts
      if(commentCounts===0){
        this.setState({
          fetchInitLoading:false
        })
        return
      }
      let query =new AV.Query('Comment')
      query.matches('uniqStr',uniqStr)
        .select(['nick', 'comment', 'link', 'pid', 'avatarSrc','rid'])
        .addDescending('createdAt')
        .limit(pageSize)
        .find()
        .then(commentArr=>{
          let commentList=convert2SimplyList(commentArr)
          this.setState({
            query,
            commentList,
            commentCounts,
            currentCounts:pageSize,
            fetchInitLoading:false,
            fetchMoreLoading:false
          })
          query=null
        })
    })
  }


  componentDidMount(){
    const {AV,nest}=this.props
    if(!AV)return
    if(nest){
      this.fetchNest()
    }else{
      this.initQuery()
    }

  }


  render(){
    const {
      requireName,
      requireEmail,
      // placeholder,
      curLang,
      nest,
      // sofaEmpty
    }=this.props
    const {
      commentCounts,
      currentCounts,
      commentList,
      fetchInitLoading,
      fetchMoreLoading,
      submitErrorLog,
      toggleTextAreaFocus,
      previewShow,
      submitLoading,
      submitBtnDisable
    }=this.state
    return (
      <div ref={this.wrapRef} className="v">
        <div className="vwrap">
          {
            submitErrorLog!=null
              ? <div className={"verrorlog"}>{submitErrorLog}</div>
              : null
          }
          <InputContainer submitBtnDisable={submitBtnDisable}
                          ref={this.inputContainerRef}
                          // placeholder={placeholder}
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
                              // sofaEmpty={sofaEmpty}
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