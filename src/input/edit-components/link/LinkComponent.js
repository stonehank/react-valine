import React from 'react'
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
export default class LinkComponent extends React.PureComponent{

  render(){
    const {width,linkErr,linkErrMsg, link,langHead,protocol,linkOnChange,toggleProtocol,linkVerify} = this.props;
    return (
        <TextField
          margin={width==='xs' ? 'dense' : 'normal'}
          // variant={width==='xs' ? 'standard' : 'outlined'}
          id="website"
          name="website"
          label={langHead['website']}
          placeholder={langHead["link"]}
          value={link}
          error={linkErr}
          helperText={linkErrMsg}
          onBlur={linkVerify}
          onChange={linkOnChange}
          fullWidth={true}
          InputProps={{
            startAdornment:<span style={{textTransform:'none'}}  onClick={toggleProtocol}>{protocol}://</span>
          }}
        />
    )
  }
}


