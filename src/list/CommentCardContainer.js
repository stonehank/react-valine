import React from 'react'
import {deepEqual, xssMarkdown} from "../utils";
import CardAvatar from "./card/CardAvatar";
import CardHead from "./card/CardHead";
import CardMeta from "./card/CardMeta";
import CardContent from "./card/CardContent";
import CardAction from "./card/CardAction";
import CardContentEdit from "./card/CardContentEdit";


export default class CommentCardContainer extends React.Component{
  constructor(props){
    super(props)
    this.state={
      showChild:props.initShowChild,
      needExpand:false,
      editMode:false
    }
    this.expandContent=this.expandContent.bind(this)
    this.toggleShowChild=this.toggleShowChild.bind(this)
    this.showEditMode=this.showEditMode.bind(this)
    this.hideEditMode=this.hideEditMode.bind(this)
    this.bindATagSmoothScroll=this.bindATagSmoothScroll.bind(this)
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
      editMode:false
    })
  }
  showEditMode(){
    this.setState({
      editMode:true
    })
  }
  bindATagSmoothScroll(ev){
    ev.preventDefault();
    let target=ev.target
    let ele=document.getElementById(target.getAttribute('href').slice(1))
    console.log(ele)
    ele.scrollIntoView({
      behavior: 'smooth'
    });
    this.props.highLightEle(ele)
  }

  shouldComponentUpdate(nextProps,nextState){
    console.log('cardContainer',!deepEqual(this.props,nextProps) || !deepEqual(this.state,nextState))
    return !deepEqual(this.props,nextProps) || !deepEqual(this.state,nextState)
  }
  componentDidUpdate(prevProps,prevState){
    const {child:prevChild}=prevProps
    const {child:curChild,nest,initShowChild}=this.props
    if(nest && curChild.length!==prevChild.length && prevState.showChild!==initShowChild){
      this.toggleShowChild()
    }
  }

  componentDidMount(){
    const {curId}=this.props
    let atTagList=document.getElementById(curId).getElementsByClassName('at')
    // console.log(atTagList,document.getElementById(curId))
    if(atTagList.length>0){
      atTagList[0].addEventListener('click', this.bindATagSmoothScroll)
    }

    let cardEle=this.cardRef.current
    if(cardEle.offsetHeight>220){
      this.setState({
        needExpand:true
      })
    }
  }

  componentWillUnmount(){
    const {curId}=this.props
    let atTagList=document.getElementById(curId).getElementsByClassName('at')
    // console.log(atTagList,document.getElementById(curId))
    if(atTagList.length>0){
      atTagList[0].removeEventListener('click', this.bindATagSmoothScroll)
    }

  }

  render(){
    const {showChild,needExpand,editMode}=this.state
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
      togglePreviewShow,
      highLightEle,
    }=this.props

    return (
      <div  id={curId} className={'vcard'} ref={this.cardRef}>
        <CardAvatar avatarSrc={avatarSrc} GRAVATAR_URL={GRAVATAR_URL}/>
        <div className={'vh'}>
          <CardHead link={link} nickName={nickName} />
          <CardMeta langTime={langTime}
                    createdAt={createdAt}
          />
        </div>
        <div className={'v-content'}>
          {
            editMode ?
              <CardContentEdit commentRawContent={commentRawContent}
                               curLang={curLang}
                               previewShow={previewShow}
                               togglePreviewShow={togglePreviewShow}
                               hideEditMode={this.hideEditMode}
                               applyEdit={applyEdit}
                               curId={curId}
                               pid={pid}
                               rid={rid}
              /> :
              <CardContent commentContent={commentContent}
                           needExpand={needExpand}
                           expandContent={this.expandContent}
              />
          }
          <CardAction langCtrl={langCtrl}
                      curId={curId}
                      rid={rid}
                      owner={owner}
                      nickName={nickName}
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
                                                   link={link}
                                                   handleReply={handleReply }
                                                   applyEdit={applyEdit }
                                                   nickName={nickName}
                                                   commentContent={commentContent}
                                                   commentRawContent={commentRawContent}
                                                   createdAt={createdAt}
                                                   previewShow={previewShow}
                                                   togglePreviewShow={togglePreviewShow}
                                                   highLightEle={highLightEle}
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
