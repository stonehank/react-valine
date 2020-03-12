import React from 'react'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class SubmitButton extends React.PureComponent{

  render(){
    const { submitBtnDisable,handleOnSubmit,langCtrl,submitLoading} = this.props;
    return (
      <div className={"vsubmit-ident"} onClick={handleOnSubmit}>
        <Button size={"small"} title={"Ctrl+Enter"}
                className={"success-btn"}
                disabled={submitBtnDisable}
                variant="contained"
                color="default"
        >
          {
            submitLoading
              ? <CircularProgress size={24} />
              : langCtrl["submit"]
          }
        </Button>
      </div>

    )
  }
}
