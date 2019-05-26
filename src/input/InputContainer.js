import React from 'react';
import emojiData from '../assets/emoji.json'
import EditAreaComponent from "./edit-components/EditAreaComponent";
import ButtonContainer from "./button-components/ButtonContainer";
import TextAreaComponent from "./edit-components/TextAreaComponent";
import {insertAtCaret} from "../utils";
const avatarsList=["mp","identicon", "monsterid",  "retro", "robohash", "wavatar","blank",]

export default class InputContainer extends React.PureComponent {
  constructor(props){
    super(props)
    this.state={
      nickName:'',
      email:'',
      link:'',
      commentContent:'',
      avatarSrc:`${props.GRAVATAR_URL}/?d=${avatarsList[Math.floor(Math.random()*avatarsList.length)]}&size=50`,
    }
    this.emailOnChange=this.emailOnChange.bind(this)
    this.insertEmoji=this.insertEmoji.bind(this)
    this.linkOnChange=this.linkOnChange.bind(this)
    this.nameOnChange=this.nameOnChange.bind(this)
    this.avatarOnChange=this.avatarOnChange.bind(this)
    this.handleOnSubmit=this.handleOnSubmit.bind(this)
    this.contentOnKeyDown=this.contentOnKeyDown.bind(this)
    this.commentContentOnChange=this.commentContentOnChange.bind(this)

    this.textAreaRef=React.createRef()
  }

  insertEmoji(emoji){
    let ele=this.textAreaRef.current
    insertAtCaret(ele,emoji)
    this.setState({
      commentContent:ele.value
    })
  }

  contentOnKeyDown(event){
    if(event && event.keyCode===9){
      event.preventDefault()
      let ele=this.textAreaRef.current
      insertAtCaret(ele,'  ')
      this.setState({
        commentContent:ele.value
      })
    }
  }

  commentContentOnChange(event,str=''){
    let newStr=event ? event.target.value : (str + this.state.commentContent)
    newStr=newStr.replace(/:(.+?):/g, (placeholder, key) => emojiData[key] || placeholder)
    this.setState({
      commentContent:newStr
    })
  }
  avatarOnChange(event){
    event.stopPropagation()
    let ele=event.target,parent=event.currentTarget
    return new Promise((resolve,reject)=>{
      if(parent.className==="vavatars-select-list" && ele.nodeName==="IMG"){
        let src=''
        if(ele.getAttribute)src=ele.getAttribute("src")
        else src=ele.src
        this.setState({
          avatarSrc:src
        })
          resolve()
      }else{
        reject()
      }
    })
  }

  nameOnChange(event){
    event.stopPropagation()
    let newStr=event.target.value
    this.setState({
      nickName:newStr
    })
  }

  emailOnChange(event){
    event.stopPropagation()
    let newStr=event.target.value
    this.setState({
      email:newStr
    })
  }

  linkOnChange(event){
    let newStr=event.target.value
    this.setState({
      link:newStr
    })
  }
  handleOnSubmit(){
    const {nickName,email,link,avatarSrc,commentContent}=this.state
    const {submitComment}=this.props
    submitComment({mail:email,link,nick:nickName,avatarSrc,comment:commentContent})
      .then(()=>{
        this.setState({
          commentContent:''
        })
      })
      .catch(()=>{})
  }

  componentDidUpdate(prevProps){
    if(this.props.toggleTextAreaFocus!==prevProps.toggleTextAreaFocus){
      this.textAreaRef.current.focus()
    }
  }

  componentDidMount(){
    if(localStorage){
      let item=localStorage.getItem("ValineCache")
      if(!item)return
      let obj=JSON.parse(item)
      this.setState({
        link:obj.link,
        nickName:obj.nick,
        email:obj.mail,
        avatarSrc:obj.avatarSrc || this.state.avatarSrc
      })
    }
  }

  render() {
    const { link,email,nickName,avatarSrc,commentContent } = this.state;
    const {
      placeholder,
      requireName,
      requireEmail,
      GRAVATAR_URL,
      submitBtnDisable,
      toggleTextAreaFocus,
      previewShow,
      togglePreviewShow
    }=this.props
    return (
      <React.Fragment>
        <EditAreaComponent link={link}
                           email={email}
                           nickName={nickName}
                           avatarSrc={avatarSrc}
                           requireName={requireName}
                           requireEmail={requireEmail}
                           GRAVATAR_URL={GRAVATAR_URL}
                           emailOnChange={this.emailOnChange}
                           linkOnChange={this.linkOnChange}
                           nameOnChange={this.nameOnChange}
                           avatarOnChange={this.avatarOnChange}
        />
        <div className="vedit">
          <TextAreaComponent ref={this.textAreaRef}
                             toggleTextAreaFocus={toggleTextAreaFocus}
                             commentContent={commentContent}
                             placeholder={placeholder}
                             contentOnKeyDown={this.contentOnKeyDown}
                             contentOnChange={this.commentContentOnChange}
          />
          <ButtonContainer previewShow={previewShow}
                           insertEmoji={this.insertEmoji}
                           commentContent={commentContent}
                           togglePreviewShow={togglePreviewShow}
                           submitBtnDisable={submitBtnDisable}
                           handleOnSubmit={this.handleOnSubmit}
          />
        </div>
      </React.Fragment>
    );
  }
}
