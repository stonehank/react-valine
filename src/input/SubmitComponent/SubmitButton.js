import React from 'react'
import Button from '@material-ui/core/Button';
import Loading from "../../utils/Loading";
import CircularProgress from '@material-ui/core/CircularProgress';

export default class SubmitButton extends React.PureComponent{

  render(){
    const { submitBtnDisable,handleOnSubmit,langCtrl,submitLoading} = this.props;
    return (
      <Button size={"small"} title={"Ctrl+Enter"}
              className={"vsubmit-ident success-btn"}
              onClick={handleOnSubmit}
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
    )
  }
}
