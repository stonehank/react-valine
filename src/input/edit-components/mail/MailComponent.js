import React from 'react'


export default class MailComponent extends React.PureComponent{

  render(){
    const { email,requireEmail,emailOnChange} = this.props;
    return <input type="text" name="email" className="vinput" placeholder={"邮箱"+(requireEmail?"(必填)":"")} value={email} onChange={emailOnChange} />
  }
}