import React from 'react'


export default class LinkComponent extends React.PureComponent{

  render(){
    const { link,langHead,linkOnChange} = this.props;
    return <input type="text" name="website" className="vinput" placeholder={langHead["link"]} value={link} onChange={linkOnChange} />
  }
}
