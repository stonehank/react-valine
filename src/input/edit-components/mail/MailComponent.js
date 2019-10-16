import React from 'react'
import TextField from '@material-ui/core/TextField';

export default class MailComponent extends React.PureComponent{


  render(){
    const {width,emailErr,emailErrMsg,mailVerify, email,requireEmail,langHead,emailOnChange} = this.props;
    return(
      <TextField
        className={"vinputs-ident"}
        margin={width==='xs' ? 'dense' : 'normal'}
        variant={width==='xs' ? 'outlined' : 'standard'}
        id="email"
        name="email"
        error={emailErr}
        helperText={emailErrMsg}
        onBlur={mailVerify}
        onFocus={()=>mailVerify(true)}
        label={langHead["mail"]+(requireEmail?langHead["require"]:"")}
        value={email}
        onChange={emailOnChange}
        fullWidth={true}
      />
    )
  }
}
