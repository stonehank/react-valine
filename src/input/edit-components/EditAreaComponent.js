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
      curLang,
    } = this.props;
    const {width}=this.state
    const langHead=curLang['head']
    return (
      <div className="vheader">
          <div style={{display:'flex',flexFlow:'row',alignItems:'flex-start',width:'100%',position:'relative'}}>
            <AvatarContainer langHead={langHead} avatarSrc={avatarSrc} email={email} GRAVATAR_URL={GRAVATAR_URL} avatarOnChange={avatarOnChange}/>
            <NickNameComponent nickName={nickName}
                               langHead={langHead}
                               curLang={curLang}
                               requireName={requireName}
                               nameOnChange={nameOnChange}
                               width={width}
            />
          </div>
          <MailComponent email={email}
                         langHead={langHead}
                         curLang={curLang}
                         requireEmail={requireEmail}
                         emailOnChange={emailOnChange}
                         width={width}
          />
          <LinkComponent link={link}
                         langHead={langHead}
                         curLang={curLang}
                         protocol={protocol}
                         toggleProtocol={toggleProtocol}
                         linkOnChange={linkOnChange}
                         width={width}
          />
      </div>
    )
  }
}

export default EditAreaComponent
