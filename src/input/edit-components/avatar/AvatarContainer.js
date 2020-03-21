import React from 'react'
import AvatarComponent from "./AvatarComponent";
import crypto from "blueimp-md5"

export default class AvatarContainer extends React.PureComponent{

  constructor(props){
    super(props)
    this.state={
      showList:false,
      showMark:false,
      emailHash:''
    }
    this.turnOnMark=this.turnOnMark.bind(this)
    this.turnOffMark=this.turnOffMark.bind(this)
    this.toggleShowList=this.toggleShowList.bind(this)
    this.checkIfClose=this.checkIfClose.bind(this)
    this.handleAvatarOnChange=this.handleAvatarOnChange.bind(this)
  }

  turnOnMark(){
    this.setState({
      showMark:true
    })
  }
  turnOffMark(){
    this.setState({
      showMark:false
    })
  }


  toggleShowList(ev){
    ev.stopPropagation()
    const {email}=this.props
    const prevShowList=this.state.showList
    if(!prevShowList){
      this.setState({
        emailHash:crypto(email.toLowerCase().trim()),
        showList:!prevShowList
      })
    }else{
      this.setState({
        showList:!prevShowList
      })
    }
  }

  handleAvatarOnChange(event){
    const {avatarOnChange}=this.props
    avatarOnChange(event)
      .then(()=>{
      this.setState({
        showList:false
      })
    }).catch(()=>{

      })
  }
  checkIfClose(){
    this.setState({
      showList:false
    })
  }


  componentDidMount(){
    window.addEventListener('click',this.checkIfClose)
  }
  componentWillUnmount(){
    window.removeEventListener('click',this.checkIfClose)
  }


  render(){
    const {showList,emailHash,showMark}=this.state
    const {avatarSrc,GRAVATAR_URL,langHead}=this.props
    return <AvatarComponent showList={showList}
                            emailHash={emailHash}
                            showMark={showMark}
                            langHead={langHead}
                            GRAVATAR_URL={GRAVATAR_URL}
                            avatarSrc={avatarSrc}
                            turnOffMark={this.turnOffMark}
                            turnOnMark={this.turnOnMark}
                            avatarOnChange={this.handleAvatarOnChange}
                            toggleShowList={this.toggleShowList}
    />
  }
}
