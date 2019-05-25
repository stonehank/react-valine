import React from 'react'


export default class LinkComponent extends React.PureComponent{

  render(){
    const { link,linkOnChange} = this.props;
    return <input type="text" name="website" className="vinput" placeholder="网站" value={link} onChange={linkOnChange} />
  }
}
