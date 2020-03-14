import React from 'react'
import TextField from '../TextField';


class NickNameComponent extends React.PureComponent{

  render(){
    const { width,nickName,requireName,langHead,nameOnChange,nameErr,nameErrMsg,nameVerify} = this.props;
    return(
      <div className={"vinputs-ident"}>
        <TextField
          className={"w-100"}
          label={langHead["nick"]+(requireName?langHead["require"]:"")}
          value={nickName}
          onChange={nameOnChange}
          materialUI={width!=='xs'}
          validateFn={nameVerify}
          error={nameErr}
          errorMsg={nameErrMsg}
        />
      </div>
    )
  }
}
export default NickNameComponent
