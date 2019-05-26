import React from 'react'
import './index.scss'
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
      rootId:'',
      rid:'',
      mail:'',
      avatarSrc:'',
      link:'',
      comment:'',
      at:'',
      nick:'',
      path:this.props.path,
      ua:navigator.userAgent,
    }
  }

  createNewObj(){
    const {AV,nest,updateCount,path}=this.props
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
    comment.set('pid',this.defaultComment.rid)
    return new Promise((resolve)=>{
      if(this.defaultComment.rid===''){
        comment.save().then(item=>{
          comment.set('rootId',item.id)
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
          if(nest && this.defaultComment.rid!==''){
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
            updateCount(path,this.state.commentCounts)
          })
          if(this.rScrollTop!=null)document.documentElement.scrollTo(0,this.rScrollTop)
          this.resetDefaultComment()
        }).catch(ex => {
          console.error("Something wrong with submit!",ex)
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
    const {requireName,requireEmail}=this.props
    const {nick,mail,comment,link,at,rid}=this.defaultComment
    let errorStr='',state=false
    if(comment==='')errorStr='内容不能为空！'
    else if(requireName && nick.trim()==='')errorStr='昵称为必填项！'
    else if(requireEmail && mail.trim()==='')errorStr='email为必填项！'
    else if(mail.trim()!=='' && !emailVerify(mail))errorStr='email格式错误！'
    else if(link.trim()!=='' && !linkVerify(link))errorStr='网址格式错误！请以http/https开头'
    else if(at!=='' && rid!==''){
      if(!contentAtVerify(comment,at)){
        this.defaultComment.rid=''
        this.defaultComment.at=''
      }else{
        this.defaultComment.comment=replaceAt(comment,rid)
      }
      state=true
    } else state=true
    return {state,errorStr}
  }

  // commentContentOnChange(event,str=''){
  //   let newStr=(event ? event.target.value : this.state.commentContent) +str
  //   newStr=newStr.replace(/:(.+?):/g, (placeholder, key) => emojiData[key] || placeholder)
  //   this.setState({
  //     commentContent:newStr
  //   })
  // }

  handleReply(replyId,replyName,rootId){
    this.defaultComment.rid=replyId
    this.defaultComment.at=replyName
    this.defaultComment.rootId=rootId
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
      // commentContent:`@${replyName} `+prevState.commentContent,
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
      .select(['nick', 'comment', 'link', 'rid', 'avatarSrc','rootId'])
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
    const {AV,path,pageSize}=this.props
    let {currentCounts,commentList,commentCounts}=this.state
    let newCurrentCounts=0
    if(currentCounts===commentCounts)return
    this.setState({
      fetchMoreLoading:true
    })
    let query1= new AV.Query('Comment'),query2= new AV.Query('Comment')
    query1.equalTo('path',path)
      .equalTo('rid','')
      .addDescending('createdAt')
      .skip(commentList.length)
      .limit(pageSize)
      .select(['nick', 'comment', 'link', 'rid', 'avatarSrc','rootId'])
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
          contains.push(obj.get('rootId'))
        }
        query2.equalTo('path',path)
          .notEqualTo('rid','')
          .containedIn('rootId',contains)
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
    const {AV,pageSize,fetchCount,path}=this.props
    let currentCounts=0
    let commentCounts=0
    this.setState({
      fetchInitLoading:true
    })
    return fetchCount(path).then(counts=> {
      commentCounts = counts
      if (commentCounts === 0) {
        this.setState({
          fetchInitLoading: false
        })
        return
      }
      let query1 =new AV.Query('Comment'), query2=new AV.Query('Comment')
      query1.equalTo('path',path)
        .equalTo('rid','')
        .limit(pageSize)
        .select(['nick', 'comment', 'link', 'rid', 'avatarSrc','rootId'])
        .addDescending('createdAt')
        .find()
        .then(items=>{
          currentCounts+=items.length
          for(let obj of items){
            simplyList.push(simplyObj(obj))
            contains.push(obj.get('rootId'))
          }
          query2.equalTo('path',path)
            .notEqualTo('rid','')
            .containedIn('rootId',contains)
            .select(['nick', 'comment', 'link', 'rid', 'avatarSrc','rootId'])
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
    const {AV,pageSize,path,fetchCount}=this.props
    let commentCounts=0
    this.setState({
      fetchInitLoading:true
    })
    return fetchCount(path).then(counts=>{
      commentCounts=counts
      if(commentCounts===0){
        this.setState({
          fetchInitLoading:false
        })
        return
      }
      let query =new AV.Query('Comment')
      query.matches('path',path)
        .select(['nick', 'comment', 'link', 'rid', 'avatarSrc','rootId'])
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
    const {AV,nest,appId,appKey}=this.props
    if(!AV)return
    try{
      AV.init({
        appId,
        appKey
      })
    }catch(err){
      // do nothing
    }
    if(nest){
      this.fetchNest()
    }else{
      this.initQuery()
    }

  }


  render(){
    const {requireName,requireEmail,placeholder,nest,sofaEmpty}=this.props
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
                          placeholder={placeholder}
                          requireName={requireName}
                          requireEmail={requireEmail}
                          GRAVATAR_URL={GRAVATAR_URL}
                          toggleTextAreaFocus={toggleTextAreaFocus}
                          previewShow={previewShow}
                          submitComment={this.submitComment}
                          togglePreviewShow={this.togglePreviewShow}
          />
        </div>
        <InfoComponent commentCounts={commentCounts}/>
        <CommentListComponent GRAVATAR_URL={GRAVATAR_URL}
                              commentCounts={commentCounts}
                              currentCounts={currentCounts}
                              commentList={commentList}
                              sofaEmpty={sofaEmpty}
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