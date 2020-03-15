import React from 'react'
import TextField from '../../../CustomComponent/TextField';
export default class LinkComponent extends React.PureComponent{

  render(){
    const {width,link,langHead,protocol,linkOnChange,toggleProtocol,linkVerify,linkErr,linkErrMsg} = this.props;
    return (
      <div className={"vinputs-ident"}>
        <span className={"v-link-toggle"} style={{textTransform:'none'}}  onClick={toggleProtocol}>{protocol}://</span>
        <TextField
          className={"w-100"}
          label={langHead['website']}
          placeholder={langHead["link"]}
          value={link}
          onChange={linkOnChange}
          validateFn={linkVerify}
          error={linkErr}
          errorMsg={linkErrMsg}
          materialUI={width!=='xs'}
        />
      </div>

    )
  }
}


