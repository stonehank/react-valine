import React from 'react'


export default class NickNameComponent extends React.PureComponent{

  render(){
    const { nickName,requireName,nameOnChange} = this.props;
    return <input type="text" name="author" className="vinput" placeholder={"昵称"+(requireName?"(必填)":"")}  onChange={nameOnChange} value={nickName}/>
   }
}
