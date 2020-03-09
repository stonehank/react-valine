import React from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
const StyleSwitch = withStyles({
  root:{
    padding:16
  },
  switchBase: {
    color: "skyblue",
    '&$checked': {
      color: "blue",
    },
    '&$checked + $track': {
      backgroundColor: "skyblue",
    },
  },
  checked: {},
  track: {},
})(Switch);

export default class PreviewComponent extends React.PureComponent {

  render() {
    const {previewShow,txt,togglePreviewShow}=this.props
    return (
      <React.Fragment>
        <span style={{paddingLeft:8}}>{txt}： </span>
        <span>Off</span>
        <StyleSwitch
          checked={previewShow}
          onChange={togglePreviewShow}
        />
        <span>On</span>
      </React.Fragment>

      // <span className="vpreview-btn" title={txt} onClick={togglePreviewShow}>
      //   {
      //     previewShow ? txt_on : txt
      //   }
      // </span>
    );
  }
}
