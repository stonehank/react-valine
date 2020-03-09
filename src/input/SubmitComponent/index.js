import React from 'react';
import SubmitButton from "./SubmitButton";
import MarkDownSupportInfo from "./MarkDownSupportInfo";



export default class SubmitComponent extends React.PureComponent {

  render() {
    const {submitBtnDisable,handleOnSubmit,langCtrl}=this.props
    return (
      <div className="vcontrol">
        <MarkDownSupportInfo />
        <SubmitButton langCtrl={langCtrl} submitBtnDisable={submitBtnDisable} handleOnSubmit={handleOnSubmit}/>
      </div>
    );
  }
}
