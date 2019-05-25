import React from 'react'


export default class SubmitComponent extends React.PureComponent{

  render(){
    const { submitBtnDisable,handleOnSubmit} = this.props;
    return (
      <div className="col col-80 text-right">
        <button type="button" className="vsubmit vbtn" onClick={handleOnSubmit} disabled={submitBtnDisable}>提交</button>
      </div>
    )
  }
}