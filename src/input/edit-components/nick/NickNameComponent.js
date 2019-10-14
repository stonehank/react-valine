import React from 'react'
import TextField from '@material-ui/core/TextField';





class NickNameComponent extends React.PureComponent{

  render(){
    const { width,nickName,requireName,langHead,nameErr,nameErrMsg,nameVerify,nameOnChange} = this.props;
    return(
      <TextField
        className={"vinputs-ident"}
        margin={width==='xs' ? 'dense' : 'normal'}
        // variant={(width==='xs' || width==='sm') ? 'standard' : 'outlined'}
        id="author"
        name="author"
        label={langHead["nick"]+(requireName?langHead["require"]:"")}
        value={nickName}
        error={nameErr}
        helperText={nameErrMsg}
        onBlur={nameVerify}
        onFocus={()=>nameVerify(true)}
        onChange={nameOnChange}
        fullWidth={true}
        // InputProps={
        // {startAdornment:inputProps}
      // }
      />
    )
  }
}
export default NickNameComponent
