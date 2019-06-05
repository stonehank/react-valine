import React from 'react'


export default class LinkComponent extends React.PureComponent{

  render(){
    const { link,langHead,protocol,linkOnChange,toggleProtocol} = this.props;
    return (
      <span className="vinput-cell">
        <span className={"vinput-label"} onClick={toggleProtocol}>{protocol}://</span>
        <input type="text" name="website" className="vinput" placeholder={langHead["link"]} value={link} onChange={linkOnChange} />
      </span>
    )
  }
}


