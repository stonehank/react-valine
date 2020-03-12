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
    commentVerify,
    replyLoading,
  } = props;
  return (
    <div className={"v-editor-main"}>
      <TextField
        inputRef={ref}
        variant="outlined"
        disabled={submitBtnDisable || replyLoading}
        error={commentErr}
        helperText={commentErrMsg}
        onClick={ev=>ev.stopPropagation()}
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
    </div>
  )
})


TextAreaComponent.displayName="TextAreaComponent"

export default TextAreaComponent
