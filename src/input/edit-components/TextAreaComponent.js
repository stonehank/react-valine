import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextAreaComponent=React.forwardRef((props, ref) => {
  const {
    commentContent,
    placeholder,
    contentOnChange,
    contentOnKeyDown,
    commentErr,
    commentErrMsg,
    commentVerify
  } = props;
  return (
    <TextField
      inputRef={ref}
      // margin="dense"
      variant="outlined"
      id="veditor"
      name="veditor"
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
    // <textarea ref={ref}
    //           id="veditor"
    //           className={"veditor vinput"}
    //           placeholder={placeholder}
    //           onChange={contentOnChange}
    //           onKeyDown={contentOnKeyDown}
    //           value={commentContent}
    // />
  )
})


TextAreaComponent.displayName="TextAreaComponent"

export default TextAreaComponent
