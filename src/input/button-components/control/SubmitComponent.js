import React from 'react'
import Button from '@material-ui/core/Button';

export default class SubmitComponent extends React.PureComponent{

  render(){
    const { submitBtnDisable,handleOnSubmit,langCtrl} = this.props;
    return (
      <div className="col col-80 text-right">
        <Button size={"small"} title={"Ctrl+Enter"} className={"vsubmit-ident"} onClick={handleOnSubmit} disabled={submitBtnDisable}  variant="contained" color="default">{langCtrl["submit"]}</Button>
        {/*<button type="button" title={"Ctrl+Enter"} className="vsubmit vbtn" onClick={handleOnSubmit} disabled={submitBtnDisable}>{langCtrl["submit"]}</button>*/}
      </div>
    )
  }
}
