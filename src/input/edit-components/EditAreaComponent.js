import React from 'react';
import NickNameComponent from "./nick/NickNameComponent";
import MailComponent from "./mail/MailComponent";
import LinkComponent from "./link/LinkComponent";
import AvatarContainer from "./avatar/AvatarContainer";


export default class EditAreaComponent extends React.PureComponent {

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
      curLang
    } = this.props;
    // console.log(11)
    const langHead=curLang['head']
    return (
      <div className={"vheader item3"} >
        <AvatarContainer langHead={langHead} avatarSrc={avatarSrc} email={email} GRAVATAR_URL={GRAVATAR_URL} avatarOnChange={avatarOnChange}/>
        <div className={"vinputs"}>
          <NickNameComponent nickName={nickName} langHead={langHead} requireName={requireName} nameOnChange={nameOnChange}/>
          <MailComponent email={email} langHead={langHead} requireEmail={requireEmail} emailOnChange={emailOnChange} />
          <LinkComponent link={link} langHead={langHead} protocol={protocol} toggleProtocol={toggleProtocol} linkOnChange={linkOnChange} />
        </div>
      </div>
    )
  }
}
