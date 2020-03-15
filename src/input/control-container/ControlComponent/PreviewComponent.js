import React from 'react';


export default class PreviewComponent extends React.PureComponent {

  render() {
    const {previewShow,langCtrl,togglePreviewShow}=this.props
    return (
      <span className={"vbtn text-btn vpreview-btn"} onClick={togglePreviewShow} style={{color:previewShow ? 'var(--theme-primary)' : 'var(--text-secondary)'}}>
        <span style={{paddingLeft:8}}>{langCtrl['preview']}：</span>
         <b style={{minWidth:28,textTransform:'capitalize'}}>{ previewShow ? langCtrl['preview_on'] : langCtrl['preview_off'] }</b>
      </span>
    );
  }
}
