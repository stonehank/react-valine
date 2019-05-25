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
      requireEmail,
      requireName,
      avatarSrc,
      GRAVATAR_URL,
      emailOnChange,
      linkOnChange,
      nameOnChange,
      avatarOnChange
    } = this.props;
    // console.log(11)
    return (
      <div className={"vheader item3"} >
        <AvatarContainer avatarSrc={avatarSrc} email={email} GRAVATAR_URL={GRAVATAR_URL} avatarOnChange={avatarOnChange}/>
        <div className={"vinputs"}>
          <NickNameComponent nickName={nickName} requireName={requireName} nameOnChange={nameOnChange}/>
          <MailComponent email={email} requireEmail={requireEmail} emailOnChange={emailOnChange} />
          <LinkComponent link={link} linkOnChange={linkOnChange} />
        </div>
      </div>
    )
  }
}
