import React from 'react';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
const StyleSwitch = withStyles({
  root:{
    padding:'10px 6px'
  },
  switchBase: {
    color: "var(--border-color)",
    '&$checked': {
      color: "var(--theme-primary)",
    },
    '&$checked + $track': {
      backgroundColor: "var(--theme-secondary)",
    },
  },
  checked: {},
  track: {},
})(Switch);

export default class PreviewComponent extends React.PureComponent {

  render() {
    const {previewShow,txt,togglePreviewShow}=this.props
    return (
      <span className={"vpreview-btn"}>
        <Button size={"small"} variant="text" color="default" onClick={togglePreviewShow}>
          <span style={{paddingLeft:8}}>{txt}： </span>
          <StyleSwitch
            size={'small'}
            checked={previewShow}
          />
          <span style={{minWidth:28,textTransform:'capitalize'}}>{ previewShow ? 'On' : 'Off' }</span>
        </Button>
      </span>
    );
  }
}
