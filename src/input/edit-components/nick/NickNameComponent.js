import React from 'react'
import TextField from '@material-ui/core/TextField';
// import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

const StyledTextField = withStyles({
  root: {
    // alignItems:'flex-end',
    // height: 90
},
})(TextField);


class NickNameComponent extends React.PureComponent{

  render(){
    const { width,nickName,requireName,langHead,nameErr,nameErrMsg,nameVerify,nameOnChange} = this.props;
    return(
      <StyledTextField
        classes={{root:"root"}}
        margin={width==='xs' ? 'dense' : 'normal'}
        // variant={(width==='xs' || width==='sm') ? 'standard' : 'outlined'}
        id="author"
        name="author"
        label={langHead["nick"]+(requireName?langHead["require"]:"")}
        value={nickName}
        error={nameErr}
        helperText={nameErrMsg}
        onBlur={nameVerify}
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
