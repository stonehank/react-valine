import React from 'react';


export default class PreviewComponent extends React.PureComponent {

  render() {
    const {previewShow,txt,togglePreviewShow}=this.props
    return (
      <span className={"vbtn text-btn"} onClick={togglePreviewShow} style={{color:previewShow ? 'var(--theme-primary)' : 'var(--text-secondary)'}}>
        <span style={{paddingLeft:8}}>{txt}： </span>
         <b style={{minWidth:28,textTransform:'capitalize'}}>{ previewShow ? 'On' : 'Off' }</b>
      </span>
    );
  }
}
