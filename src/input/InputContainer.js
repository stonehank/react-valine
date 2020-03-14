import React from 'react';
import emojiData from '../assets/emoji.json'
import EditAreaComponent from "./edit-components/EditAreaComponent";
import ControlContainer from "./control-container/ControlContainer";
import TextAreaComponent from "./edit-components/TextAreaComponent";
import {
  calcValueAndPos,
  getEmojiPrefix,
  resolveTAB,
  replaceExistEmoji,
  getCaretCoordinates,
  getWordList,
  linkVerify, emailVerify, getFromCache
} from "../utils";
import EmojiPreviewComponent from "./EmojiPreviewComponent";
import SubmitComponent from "./SubmitComponent";

const avatarsList=["mp","identicon", "monsterid",  "retro", "robohash", "wavatar","blank",]


export default class InputContainer extends React.Component {
  constructor(props){
    super(props)
    this.state={
      nickName:'',
      email:'',
      link:'',
      commentContent:'',
      protocol:'https',
      emojiList:[],
      emojiPrefix:'',
      emojiChooseId:0,
      emojiListPos:[0,0],
      avatarSrc:`${props.GRAVATAR_URL}/?d=${avatarsList[Math.floor(Math.random()*avatarsList.length)]}&size=50`,
      resetTextarea:false,
      nameErr:null,
      nameErrMsg:null,
      emailErr:null,
      emailErrMsg:null,
      linkErr:null,
      linkErrMsg:null,
      commentErr:null,
      commentErrMsg:null,
    }
    this.emailOnChange=this.emailOnChange.bind(this)
    this.chooseEmoji=this.chooseEmoji.bind(this)
    this.insertEmoji=this.insertEmoji.bind(this)
    this.linkOnChange=this.linkOnChange.bind(this)
    this.nameOnChange=this.nameOnChange.bind(this)
    this.avatarOnChange=this.avatarOnChange.bind(this)
    this.toggleProtocol=this.toggleProtocol.bind(this)
    this.handleOnSubmit=this.handleOnSubmit.bind(this)
    this.contentOnKeyDown=this.contentOnKeyDown.bind(this)
    this.commentVerify=this.commentVerify.bind(this)
    this.linkVerify=this.linkVerify.bind(this)
    this.nameVerify=this.nameVerify.bind(this)
    this.mailVerify=this.mailVerify.bind(this)
    this.commentContentOnChange=this.commentContentOnChange.bind(this)
    this.turnOffEmojiPreviewList=this.turnOffEmojiPreviewList.bind(this)

    this.textAreaRef=React.createRef()
  }

  toggleProtocol(){
    this.setState(prevState=>({
      protocol:prevState.protocol==="https" ? "http" : "https"
    }))
  }

  chooseEmoji(emoji,prefix,ev){
    let ele=this.textAreaRef.current
    // 此处prefix前面还有`:`，因此需要+1
    let [newV,scrollTop,startPos]=calcValueAndPos(ele,emoji,prefix.length+1)
    this.setState({
      commentContent:newV,
      emojiList:[],
      emojiChooseId:0
    },()=>{
      ele.focus()
      ele.selectionStart = startPos + emoji.length;
      ele.selectionEnd = startPos + emoji.length;
      ele.scrollTop = scrollTop;
    })
  }

  insertEmoji(emoji){
    let ele=this.textAreaRef.current
    let [newV,scrollTop,startPos]=calcValueAndPos(ele,emoji)
    this.setState({
      commentContent:newV
    },()=>{
      ele.selectionStart = startPos + emoji.length;
      ele.selectionEnd = startPos + emoji.length;
      ele.scrollTop = scrollTop;
      ele.focus();
    })
  }

  // 修改上下选择表情 38 40
  // 修改TAB 9
  // 修改Enter 13
  // 修改ESC 27
  contentOnKeyDown(event){
    if(!event)return
    const {emojiList,emojiChooseId,emojiPrefix}=this.state
    let keyCode=event.keyCode,listLen=emojiList.length
    if(keyCode===27){
      if(listLen>0){
        event.preventDefault()
        this.setState({
          emojiList:[],
          emojiChooseId:0
        })
      }
    }else if(keyCode===13){
      if(event.ctrlKey){
        return this.handleOnSubmit()
      }
      if(listLen>0){
        event.preventDefault()
        let chooseEmoji=emojiList[emojiChooseId]
        this.chooseEmoji(emojiData[chooseEmoji],emojiPrefix)
      }
    }else if(keyCode===40 || keyCode===38){
      if(listLen>0){
        event.preventDefault()
        let newChooseId=0
        if(keyCode===40)newChooseId=(emojiChooseId+1) % listLen
        else newChooseId=(emojiChooseId+listLen-1) % listLen
        this.setState({
          emojiChooseId:newChooseId
        })
      }
    }else if(keyCode===9){
      if(event.shiftKey){
        return
      }
      event.preventDefault()
      let ele=event ? event.target : this.textAreaRef.current
      let insertStr='  '
      let [newStr,scrollTop,startPos,endPos]=resolveTAB(ele,insertStr)
      if(newStr.length>1000)newStr=newStr.slice(0,1000)
      this.setState({
        commentContent:newStr
      },()=>{
        ele.focus();
        ele.selectionStart = startPos
        ele.selectionEnd = endPos
        ele.scrollTop = scrollTop;
      })
    }
  }


  commentContentOnChange(event,str=''){
    const {emojiList,emojiListPos,emojiChooseId}=this.state
    let newEmojiList=[],newEmojiListPos=emojiListPos
    let ele=event?event.target:this.textAreaRef.current,
      selectionStart=ele.selectionStart,
      value=ele.value
    // 获取表情prefix列表
    let prefix=getEmojiPrefix(value,selectionStart)
    if(str==='')newEmojiList=getWordList(prefix,this.props.emojiListSize)

    // 当开始出现表情列表时，获取top,left
    if(emojiList.length===0 && newEmojiList.length>0){
      let {top,left}=getCaretCoordinates(ele,selectionStart)
      newEmojiListPos=[top,left]
    }
    // 替换已经存在的表情符号
    let result=replaceExistEmoji(value,selectionStart,str),
      newStr=result[0]
    selectionStart=result[1]
    selectionStart+=str.length
    this.setState({
      commentContent:newStr,
      emojiPrefix:prefix,
      emojiList:newEmojiList,
      emojiChooseId: emojiList.length===0 ? 0 : emojiChooseId,
      emojiListPos:newEmojiListPos,
      resetTextarea:false
    },()=>{
      ele.selectionStart=selectionStart
      ele.selectionEnd=selectionStart
    })
  }

  avatarOnChange(event){
    event.stopPropagation()
    let ele=event.target
    return new Promise((resolve,reject)=>{
      if(ele.nodeName==="IMG"){
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
  commentVerify(){
    const {commentContent}=this.state
    const {curLang}=this.props
    let errObj=curLang.verify
    if(commentContent.trim()===''){
      this.setState({
        commentErr:true,
        commentErrMsg:errObj['empty_content']
      })
      return false
    }
    if(commentContent.length>2000){
      this.setState({
        commentErr:true,
        commentErrMsg:errObj['exceed_content']
      })
      return false
    }
    this.setState({
      commentErr:false,
      commentErrMsg:null
    })
    return true
  }
  linkVerify(){
    const {link}=this.state
    const {curLang}=this.props
    let errObj=curLang.verify
    if(link.trim()===''){
      this.setState({
        linkErr:null,
        linkErrMsg:null
      })
      return true
    }
    if(!linkVerify(link)){
      this.setState({
        linkErr:true,
        linkErrMsg:errObj['link_format_failed']
      })
      return false
    }
    this.setState({
      linkErr:false,
      linkErrMsg:null
    })
    return true
  }

  nameVerify(){
    const {nickName}=this.state
    const {requireName,curLang}=this.props
    let errObj=curLang.verify
    if(nickName.trim()===''){
      if(requireName){
        this.setState({
          nameErr:true,
          nameErrMsg:errObj['require_nick']
        })
        return false
      }else{
        this.setState({
          nameErr:null,
          nameErrMsg:null
        })
        return true
      }
    }
    this.setState({
      nameErr:false,
      nameErrMsg:null
    })
    return true
  }

  mailVerify(){
    const {email}=this.state
    const {requireEmail,curLang}=this.props
    let errObj=curLang.verify
    if(email.trim()===''){
      if(requireEmail){
        this.setState({
          emailErr:true,
          emailErrMsg:errObj['require_mail']
        })
        return false
      }
      this.setState({
        emailErr:null,
        emailErrMsg:null
      })
      return true
    }
    if(!emailVerify(email)){
      this.setState({
        emailErr:true,
        emailErrMsg:errObj['email_format_failed']
      })
      return false
    }
    this.setState({
      emailErr:false,
      emailErrMsg:null
    })
    return true
  }

  submitVerify(){
    let nameV=this.nameVerify()
    let mailV=this.mailVerify()
    let linkV=this.linkVerify()
    let commentV=this.commentVerify()

    if(!nameV || !mailV || !linkV || !commentV){
      return false
    }
    return true
  }

  linkOnChange(event){
    let newStr=event.target.value
    this.setState({
      link:newStr
    })
  }

  handleOnSubmit(){
    const {nickName,email,link,protocol,avatarSrc,commentContent}=this.state
    const {applySubmit}=this.props
    if(!this.submitVerify())return
    applySubmit({
      mail:email,
      link:link==="" ? link : protocol+"://" + link,
      nick:nickName,
      avatarSrc,
      comment:commentContent,
      commentRaw:commentContent
    })
      .then(()=>{
        this.setState({
          commentContent:'',
          commentErr:null,
          resetTextarea:true
        })
      }).catch(()=>{})
  }

  turnOffEmojiPreviewList(){
    this.setState({
      emojiList:[],
      emojiChooseId:0
    })
  }

  componentDidUpdate(prevProps){
    if(this.props.toggleTextAreaFocus!==prevProps.toggleTextAreaFocus){
      this.textAreaRef.current.focus()
    }
  }
  componentDidMount(){
    window.addEventListener("click",this.turnOffEmojiPreviewList)
    let storage=getFromCache('ValineCache')
    if(storage) {
      this.setState({
        link: storage.link,
        nickName: storage.nick,
        email: storage.mail,
        avatarSrc: storage.avatarSrc || this.state.avatarSrc
      },()=>{
        if(storage.link)this.linkVerify()
        if(storage.nick)this.nameVerify()
        if(storage.mail)this.mailVerify()
      })
    }
  }
  componentWillUnmount(){
    window.removeEventListener("click",this.turnOffEmojiPreviewList)
  }

  render() {
    const {
      link,
      email,
      nickName,
      avatarSrc,
      commentContent,
      protocol,
      emojiList,
      emojiChooseId,
      emojiPrefix,
      emojiListPos,
      resetTextarea,
      nameErr,
      nameErrMsg,
      emailErr,
      emailErrMsg,
      linkErr,
      linkErrMsg,
      commentErr,
      commentErrMsg,
    } = this.state;

    const {
      requireName,
      requireEmail,
      curLang,
      GRAVATAR_URL,
      submitBtnDisable,
      previewShow,
      submitLoading,
      togglePreviewShow,
    }=this.props

    return (
      <section id={"v-main-wrapper"} className={"v-main-wrapper"}>
        <EditAreaComponent link={link}
                           email={email}
                           nickName={nickName}
                           avatarSrc={avatarSrc}
                           protocol={protocol}
                           curLang={curLang}
                           requireName={requireName}
                           requireEmail={requireEmail}
                           GRAVATAR_URL={GRAVATAR_URL}
                           nameErr={nameErr}
                           nameErrMsg={nameErrMsg}
                           emailErr={emailErr}
                           emailErrMsg={emailErrMsg}
                           linkErr={linkErr}
                           linkErrMsg={linkErrMsg}
                           nameVerify={this.nameVerify}
                           mailVerify={this.mailVerify}
                           linkVerify={this.linkVerify}
                           emailOnChange={this.emailOnChange}
                           linkOnChange={this.linkOnChange}
                           nameOnChange={this.nameOnChange}
                           avatarOnChange={this.avatarOnChange}
                           toggleProtocol={this.toggleProtocol}
        />
        <div className="v-edit-area">
          <TextAreaComponent ref={this.textAreaRef}
                             curLang={curLang}
                             reset={resetTextarea}
                             commentErr={commentErr}
                             commentErrMsg={commentErrMsg}
                             commentContent={commentContent}
                             submitBtnDisable={submitBtnDisable}
                             placeholder={curLang["tips"]["placeholder"]}
                             contentOnKeyDown={this.contentOnKeyDown}
                             contentOnChange={this.commentContentOnChange}
                             commentVerify={this.commentVerify}
          />
          <EmojiPreviewComponent emojiList={emojiList}
                                 emojiListPos={emojiListPos}
                                 emojiPrefix={emojiPrefix}
                                 emojiChooseId={emojiChooseId}
                                 chooseEmoji={this.chooseEmoji}
          />
          <ControlContainer previewShow={previewShow}
                           langCtrl={curLang["ctrl"]}
                           insertEmoji={this.insertEmoji}
                           commentContent={commentContent}
                           togglePreviewShow={togglePreviewShow}
          />
          <SubmitComponent langCtrl={curLang["ctrl"]}
                           submitLoading={submitLoading}
                           submitBtnDisable={submitBtnDisable}
                           handleOnSubmit={this.handleOnSubmit}/>
        </div>
      </section>
    );
  }
}
