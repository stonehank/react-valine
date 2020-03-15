import React from 'react';
import TextField from '../../CustomComponent/TextField';

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
    reset,
    replyLoading,
  } = props;
  return (
    <div className={"v-editor-main"}>
      <TextField
        inputRef={ref}
        reset={reset}
        showSuccess={false}
        style={{marginTop:4}}
        className={"w-100"}
        label={placeholder}
        disabled={submitBtnDisable || replyLoading}
        value={commentContent}
        onClick={ev=>ev.stopPropagation()}
        onKeyDown={contentOnKeyDown}
        onChange={contentOnChange}
        materialUI={false}
        autoHeight={true}
        rows={5}
        error={commentErr}
        errorMsg={commentErrMsg}
        validateFn={commentVerify}
      />
    </div>
  )
})


TextAreaComponent.displayName="TextAreaComponent"

export default TextAreaComponent
