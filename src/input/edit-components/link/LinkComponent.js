import React from 'react'
import TextField from '../TextField';
import {linkVerify} from "../../../utils/Verify";
export default class LinkComponent extends React.PureComponent{

  render(){
    const {width, curLang,link,langHead,protocol,linkOnChange,toggleProtocol} = this.props;
    return (
      <div className={"vinputs-ident"}>
        <span className={"v-link-toggle"} style={{textTransform:'none'}}  onClick={toggleProtocol}>{protocol}://</span>
        <TextField
          className={"w-100"}
          label={langHead['website']}
          placeholder={langHead["link"]}
          value={link}
          onChange={linkOnChange}
          rules={[
            (v)=>!!v || null,
            (v)=>linkVerify(v) || curLang.verify['link_format_failed']
          ]}
          materialUI={width!=='xs'}
        />
      </div>
    )
  }
}


