import React from 'react';

export default class PreviewComponentShow extends React.PureComponent {

  render() {
    const {previewShow,previewContent}=this.props
    return (
      previewShow
        ? <div className="vinput vpreview">
          <div dangerouslySetInnerHTML={{__html:`<div>${previewContent}</div>`}} />
          </div>
      :   null

    );
  }
}
