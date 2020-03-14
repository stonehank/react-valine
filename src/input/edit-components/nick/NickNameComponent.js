import React from 'react'
import TextField from '../TextField';





class NickNameComponent extends React.PureComponent{

  render(){
    const { width,nickName,requireName,langHead,curLang,nameOnChange} = this.props;
    return(
      <div className={"vinputs-ident"}>
        <TextField
          className={"w-100"}
          label={langHead["nick"]+(requireName?langHead["require"]:"")}
          value={nickName}
          onChange={nameOnChange}
          rules={[
            (v)=>!!v || curLang.verify['require_nick']
          ]}
          materialUI={width!=='xs'}
        />
      </div>
    )
  }
}
export default NickNameComponent
