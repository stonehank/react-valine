import React from 'react'
import TextField from '../TextField';
import {emailVerify} from "../../../utils/Verify";

export default class MailComponent extends React.PureComponent{


  render(){
    const {width,curLang,email,requireEmail,langHead,emailOnChange} = this.props;
    return(
      <div className={"vinputs-ident"}>
        <TextField
          className={"w-100"}
          label={langHead["mail"]+(requireEmail?langHead["require"]:"")}
          value={email}
          onChange={emailOnChange}
          rules={[
            requireEmail ? (v)=>!!v || curLang.verify['require_mail'] : (v)=>!!v || null,
            (v)=>emailVerify(v) || curLang.verify['email_format_failed']
          ]}
          materialUI={width!=='xs'}
        />
      </div>
    )
  }
}
