import React from 'react'
export default class SubmitButton extends React.PureComponent{

  render(){
    const { submitBtnDisable,handleOnSubmit,langCtrl,submitLoading} = this.props;
    return (
      <div className={"vsubmit-ident"} onClick={handleOnSubmit}>
        <button title={"Ctrl+Enter"}
                className={`vbtn success-btn${submitBtnDisable ? ' disabled-btn' : ''}`} disabled={submitBtnDisable}
                style={{minWidth:64}}
        >
           {
             submitLoading
               ? <span className={"vloading-btn"} />
               : langCtrl["submit"]
           }
        </button>
      </div>

    )
  }
}
