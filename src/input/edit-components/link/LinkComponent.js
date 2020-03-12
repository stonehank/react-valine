import React from 'react'
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
export default class LinkComponent extends React.PureComponent{

  render(){
    const {width,linkErr,linkErrMsg, link,langHead,protocol,linkOnChange,toggleProtocol,linkVerify} = this.props;
    return (
        <TextField
          className={"vinputs-ident"}
          margin={width==='xs' ? 'dense' : 'normal'}
          variant={width==='xs' ? 'outlined' : 'standard'}
          id="website"
          name="website"
          label={langHead['website']}
          placeholder={langHead["link"]}
          value={link}
          error={linkErr}
          helperText={linkErrMsg}
          onBlur={linkVerify}
          onFocus={()=>linkVerify(true)}
          onChange={linkOnChange}
          fullWidth={true}
          InputProps={{
            startAdornment:<span className={"v-link-toggle"} style={{textTransform:'none'}}  onClick={toggleProtocol}>{protocol}://</span>
          }}
        />
    )
  }
}


