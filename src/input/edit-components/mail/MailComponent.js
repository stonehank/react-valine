import React from 'react'
import TextField from '../../../CustomComponent/TextField';

export default class MailComponent extends React.PureComponent{


  render(){
    const {width,email,requireEmail,langHead,emailOnChange,emailErr,emailErrMsg,mailVerify} = this.props;
    return(
      <div className={"vinputs-ident"}>
        <TextField
          className={"w-100"}
          label={langHead["mail"]+(requireEmail?langHead["require"]:"")}
          value={email}
          onChange={emailOnChange}
          materialUI={width!=='xs'}
          validateFn={mailVerify}
          error={emailErr}
          errorMsg={emailErrMsg}
        />
      </div>
    )
  }
}
