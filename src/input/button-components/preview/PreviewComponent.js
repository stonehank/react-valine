import React from 'react';

export default class PreviewComponent extends React.PureComponent {

  render() {
    const {previewShow,txt,txt_on,togglePreviewShow}=this.props
    return (
      <span className="vpreview-btn" title={txt} onClick={togglePreviewShow}>
        {
          previewShow ? txt_on : txt
        }
      </span>
    );
  }
}
