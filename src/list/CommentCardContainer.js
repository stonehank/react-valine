import React from 'react'
import {xssMarkdown} from "../utils";
import CardAvatar from "./card/CardAvatar";
import CardHead from "./card/CardHead";
import CardMeta from "./card/CardMeta";
import CardContent from "./card/CardContent";


export default class CommentCardContainer extends React.PureComponent{
  constructor(props){
    super(props)
    this.state={
      showChild:props.initShowChild,
      needExpand:false
    }
    this.expandContent=this.expandContent.bind(this)
    this.toggleShowChild=this.toggleShowChild.bind(this)
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
  componentDidUpdate(prevProps,prevState){
    const {child:prevChild}=prevProps
    const {child:curChild,nest,initShowChild}=this.props
    if(nest && curChild.length!==prevChild.length && prevState.showChild!==initShowChild){
      this.toggleShowChild()
    }
  }

  componentDidMount(){
    let cardEle=this.cardRef.current
    if(cardEle.offsetHeight>220){
      this.setState({
        needExpand:true
      })
    }
  }

  render(){
    const {showChild,needExpand}=this.state
    const {
      GRAVATAR_URL,
      curId,
      nest,
      child,
      avatarSrc,
      langTime,
      langCtrl,
      rid,
      link,
      handleReply,
      nickName,
      commentContent,
      createdAt
    }=this.props

    return (
      <div  id={curId} className={'vcard'} ref={this.cardRef}>
        <CardAvatar avatarSrc={avatarSrc} GRAVATAR_URL={GRAVATAR_URL}/>
        <div className={'vh'}>
          <CardHead link={link} nickName={nickName}/>
          <CardMeta langTime={langTime}
                    txt_reply={langCtrl["reply"]}
                    curId={curId}
                    rid={rid}
                    nickName={nickName}
                    createdAt={createdAt}
                    handleReply={handleReply}
          />
          <CardContent commentContent={commentContent}
                       needExpand={needExpand}
                       expandContent={this.expandContent}
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
                        curId=commentObj['id'],
                        child=nest ? commentObj['child'] : null,
                        initShowChild=commentObj['initShowChild']

                      return <CommentCardContainer curId={curId}
                                                   key={curId}
                                                   rid={rid}
                                                   langTime={langTime}
                                                   langCtrl={langCtrl}
                                                   nest={nest}
                                                   child={child}
                                                   initShowChild={initShowChild}
                                                   GRAVATAR_URL={GRAVATAR_URL}
                                                   avatarSrc={avatarSrc}
                                                   link={link}
                                                   handleReply={handleReply }
                                                   nickName={nickName}
                                                   commentContent={commentContent}
                                                   createdAt={createdAt}
                      />
                      })
                    }
                    </div>
                  <span className={"showchild-button-off"} onClick={this.toggleShowChild}>{langCtrl["collapse_reply"]}</span>
                </React.Fragment>
              : <span className={"showchild-button-on"} onClick={this.toggleShowChild}>{langCtrl["expand_reply"]}({child.length}条)</span>
            : null
          }
        </div>
      </div>
    )
  }
}