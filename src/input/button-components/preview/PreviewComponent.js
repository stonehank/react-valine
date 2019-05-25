import React from 'react';

export default class PreviewComponent extends React.PureComponent {

  render() {
    const {previewShow, togglePreviewShow}=this.props
    return (
      <span className="vpreview-btn" title="预览" onClick={togglePreviewShow}>
        {
          previewShow ? "已开启预览" : "开启预览"
        }
      </span>
    );
  }
}
