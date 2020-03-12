import React from 'react';
import NickNameComponent from "./nick/NickNameComponent";
import MailComponent from "./mail/MailComponent";
import LinkComponent from "./link/LinkComponent";
import AvatarContainer from "./avatar/AvatarContainer";
import calcScreenSizeText from "../../utils/DOM/calcScreenSizeText";


class EditAreaComponent extends React.PureComponent {

  constructor(props){
    super(props)
    this.state={
      width:''
    }
    this.handleResize=this.handleResize.bind(this)
  }

  handleResize(){
    let sizeTxt=calcScreenSizeText()
    this.setState({
      width:sizeTxt
    })
  }
  componentDidMount(){
    this.handleResize()
    window.addEventListener('resize',this.handleResize)
  }

  componentWillUnmount(){
    window.addEventListener('resize',this.handleResize)
  }

  render() {
    const {
      link,
      email,
      nickName,
      protocol,
      requireEmail,
      requireName,
      avatarSrc,
      GRAVATAR_URL,
      emailOnChange,
      linkOnChange,
      nameOnChange,
      avatarOnChange,
      toggleProtocol,
      nameErr,
      nameErrMsg,
      emailErr,
      emailErrMsg,
      linkErr,
      linkErrMsg,
      curLang,
      nameVerify,
      linkVerify,
      mailVerify,
    } = this.props;
    const {width}=this.state
    const langHead=curLang['head']
    return (
      <div className="vheader">
          <div style={{display:'flex',flexFlow:'row',alignItems:'flex-start',width:'100%',position:'relative'}}>
            <AvatarContainer langHead={langHead} avatarSrc={avatarSrc} email={email} GRAVATAR_URL={GRAVATAR_URL} avatarOnChange={avatarOnChange}/>
            <NickNameComponent nickName={nickName}
                               langHead={langHead}
                               nameErr={nameErr}
                               nameErrMsg={nameErrMsg}
                               requireName={requireName}
                               nameOnChange={nameOnChange}
                               nameVerify={nameVerify}
                               width={width}
            />
          </div>
          <MailComponent email={email}
                         langHead={langHead}
                         emailErr={emailErr}
                         emailErrMsg={emailErrMsg}
                         requireEmail={requireEmail}
                         emailOnChange={emailOnChange}
                         mailVerify={mailVerify}
                         width={width}
          />
          <LinkComponent link={link}
                         langHead={langHead}
                         protocol={protocol}
                         linkErr={linkErr}
                         linkErrMsg={linkErrMsg}
                         toggleProtocol={toggleProtocol}
                         linkOnChange={linkOnChange}
                         linkVerify={linkVerify}
                         width={width}
          />
        {/*</div>*/}
      </div>
    )
  }
}

export default EditAreaComponent
