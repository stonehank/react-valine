import React from 'react';

export default class PreviewComponentShow extends React.PureComponent {

  render() {
    const {previewShow,previewContent}=this.props
    return (
      previewShow && previewContent!==''
        ? <div className="v-content-preview">
            <div dangerouslySetInnerHTML={{__html:previewContent}} />
          </div>
      :   null

    );
  }
}
