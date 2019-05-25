import React from 'react';
import SubmitComponent from "./control/SubmitComponent";
import MarkDownSupportInfo from "./control/MarkDownSupportInfo";



export default class ControlButton extends React.PureComponent {

  render() {
    const {submitBtnDisable,handleOnSubmit}=this.props
    return (
      <div className="vcontrol">
        <MarkDownSupportInfo />
        <SubmitComponent submitBtnDisable={submitBtnDisable} handleOnSubmit={handleOnSubmit}/>
      </div>
    );
  }
}
