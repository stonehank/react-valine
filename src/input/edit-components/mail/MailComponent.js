import React from 'react'


export default class MailComponent extends React.PureComponent{

  render(){
    const { email,requireEmail,langHead,emailOnChange} = this.props;
    return <input type="text" name="email" className="vinput" placeholder={langHead["mail"]+(requireEmail?langHead["require"]:"")} value={email} onChange={emailOnChange} />
  }
}