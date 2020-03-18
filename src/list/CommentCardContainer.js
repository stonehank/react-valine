import React from 'react'
import {deepEqual, xssMarkdown} from "../utils";
import {bindATagSmoothScroll} from "../utils/DOM";
import CardAvatar from "./card/CardAvatar";
import CardHeadInfo from "./card/CardHeadInfo";
import CardContent from "./card/CardContent";
import CardAction from "./card/CardAction";
import CardContentEdit from "./card/CardContentEdit";
import ErrorBoundary from "../info/ErrorBoundary";


export default class CommentCardContainer extends React.Component{
  constructor(props){
    super(props)
    this.state={
      showChild:props.initShowChild,
      needExpand:false,
      canBeEdit:false
    }
    this.expandContent=this.expandContent.bind(this)
    this.toggleShowChild=this.toggleShowChild.bind(this)
    this.showEditMode=this.showEditMode.bind(this)
    this.hideEditMode=this.hideEditMode.bind(this)
    this.cardRef=React.createRef()
  }

  toggleShowChild(){
    this.setState((prevState)=>({
      showChild:!prevState.showChild
    }))
  }

  expandContent(){
    this.setState({
      needExpand:false
    })
  }
  hideEditMode(){
    this.setState({
      canBeEdit:false
    })
  }
  showEditMode(){
    if(this.props.editMode){
      this.setState({
        canBeEdit:true
      })
    }
  }

  shouldComponentUpdate(nextProps,nextState){
    return !deepEqual(this.props,nextProps) || !deepEqual(this.state,nextState)
  }

  componentDidUpdate(prevProps,prevState){
    const {child:prevChild}=prevProps
    const {child:curChild,nest,initShowChild}=this.props
    let cardEle=this.cardRef.current
    let atTagList=cardEle.getElementsByClassName('at')
    if(atTagList.length>0){
      atTagList[0].removeEventListener('click', bindATagSmoothScroll)
      atTagList[0].addEventListener('click', bindATagSmoothScroll)
    }

    if(nest && curChild.length!==prevChild.length && prevState.showChild!==initShowChild){
      this.toggleShowChild()
    }
  }

  componentDidMount(){
    const {curId}=this.props
    // console.log(curId,this.props)
    let cardEle=this.cardRef.current
    // let curIdEle=document.getElementById(curId)
    let atTagList=cardEle ? cardEle.getElementsByClassName('at') : []
    // console.log(cardEle)
    if(atTagList.length>0){
      atTagList[0].addEventListener('click', bindATagSmoothScroll)
    }
    if(cardEle.offsetHeight>220){
      this.setState({
        needExpand:true
      })
    }
  }

  componentWillUnmount(){
    // const {curId}=this.props
    let cardEle=this.cardRef.current
    let atTagList=cardEle.getElementsByClassName('at')
    if(atTagList.length>0){
      atTagList[0].removeEventListener('click', bindATagSmoothScroll)
    }
  }

  render(){
    const {showChild,needExpand,canBeEdit}=this.state
    const {
      GRAVATAR_URL,
      curId,
      nest,
      child,
      avatarSrc,
      langTime,
      langCtrl,
      curLang,
      rid,
      pid,
      owner,
      at,
      replyLen,
      link,
      handleReply,
      applyEdit,
      nickName,
      commentContent,
      commentRawContent,
      createdAt,
      previewShow,
      editMode,
      togglePreviewShow,
      showError,
    }=this.props

    return (
      <div  id={curId} className={'vcard'} ref={this.cardRef}>
        <div className={'v-head-wrapper'}>
          <CardAvatar avatarSrc={avatarSrc} GRAVATAR_URL={GRAVATAR_URL}/>
          <CardHeadInfo link={link} nickName={nickName} langTime={langTime} createdAt={createdAt} />
        </div>
        <div className={'v-content-wrapper'}>
          {
            canBeEdit
              ? <ErrorBoundary>
                  <CardContentEdit commentRawContent={commentRawContent}
                                   curLang={curLang}
                                   previewShow={previewShow}
                                   togglePreviewShow={togglePreviewShow}
                                   hideEditMode={this.hideEditMode}
                                   applyEdit={applyEdit}
                                   showError={showError}
                                   curId={curId}
                                   pid={pid}
                                   rid={rid}
                                   at={at}
                  />
                </ErrorBoundary>
              : <CardContent commentContent={commentContent}
                             needExpand={needExpand}
                             expandContent={this.expandContent}
                />
          }
          <CardAction langCtrl={langCtrl}
                      curId={curId}
                      rid={rid}
                      owner={owner}
                      nickName={nickName}
                      canBeEdit={canBeEdit}
                      editMode={editMode}
                      handleReply={handleReply}
                      showEditMode={this.showEditMode}
          />
          {
            nest && child.length>0
            ? showChild
              ? <React.Fragment>
                  <div className={"vquote"}>
                    {
                      child.map(commentObj=>{
                      let avatarSrc = commentObj['avatarSrc'],
                        nickName=commentObj["nick"],
                        link=commentObj["link"],
                        createdAt=commentObj['createdAt'],
                        commentContent=xssMarkdown(commentObj['comment']),
                        commentRawContent=commentObj['commentRaw'],
                        curId=commentObj['id'],
                        pid=commentObj['pid'],
                        owner=commentObj['owner'],
                        at=commentObj['at'],
                        replyLen=commentObj['replyLen'],
                        child=nest ? commentObj['child'] : null,
                        initShowChild=commentObj['initShowChild']

                      return <CommentCardContainer curId={curId}
                                                   key={curId}
                                                   rid={rid}
                                                   pid={pid}
                                                   langTime={langTime}
                                                   langCtrl={langCtrl}
                                                   curLang={curLang}
                                                   nest={nest}
                                                   child={child}
                                                   owner={owner}
                                                   at={at}
                                                   replyLen={replyLen}
                                                   initShowChild={initShowChild}
                                                   GRAVATAR_URL={GRAVATAR_URL}
                                                   avatarSrc={avatarSrc}
                                                   editMode={editMode}
                                                   link={link}
                                                   handleReply={handleReply }
                                                   applyEdit={applyEdit }
                                                   nickName={nickName}
                                                   commentContent={commentContent}
                                                   commentRawContent={commentRawContent}
                                                   createdAt={createdAt}
                                                   previewShow={previewShow}
                                                   showError={showError}
                                                   togglePreviewShow={togglePreviewShow}
                      />
                      })
                    }
                    </div>
                  <span className={"showchild-button-off"} onClick={this.toggleShowChild}>{langCtrl["collapse_comment"]}</span>
                </React.Fragment>
              : <span className={"showchild-button-on"} onClick={this.toggleShowChild}><b>{replyLen}</b>{langCtrl["comment_list"]}</span>
            : null
          }
        </div>
      </div>
    )
  }
}
