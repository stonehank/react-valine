import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextAreaComponent=React.forwardRef((props, ref) => {
  const {
    commentContent,
    placeholder,
    contentOnChange,
    contentOnKeyDown,
    submitBtnDisable,
    commentErr,
    commentErrMsg,
    commentVerify
  } = props;
  return (
    <TextField
      inputRef={ref}
      className={"vtextarea-ident"}
      variant="outlined"
      id="veditor"
      name="veditor"
      disabled={submitBtnDisable}
      error={commentErr}
      helperText={commentErrMsg}
      onBlur={commentVerify}
      onFocus={()=>commentVerify(true)}
      label={placeholder}
      value={commentContent}
      onChange={contentOnChange}
      onKeyDown={contentOnKeyDown}
      multiline={true}
      fullWidth={true}
      rowsMax={Infinity}
      rows={5}
    />
  )
})


TextAreaComponent.displayName="TextAreaComponent"

export default TextAreaComponent
