import React from 'react';
import SubmitComponent from "./control/SubmitComponent";
import MarkDownSupportInfo from "./control/MarkDownSupportInfo";



export default class ControlButton extends React.PureComponent {

  render() {
    const {submitBtnDisable,handleOnSubmit,langCtrl}=this.props
    return (
      <div className="vcontrol">
        <MarkDownSupportInfo />
        <SubmitComponent langCtrl={langCtrl} submitBtnDisable={submitBtnDisable} handleOnSubmit={handleOnSubmit}/>
      </div>
    );
  }
}
