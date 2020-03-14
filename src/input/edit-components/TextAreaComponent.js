import React from 'react';
import TextField from './TextField';

const TextAreaComponent=React.forwardRef((props, ref) => {
  const {
    curLang,
    commentContent,
    placeholder,
    contentOnChange,
    contentOnKeyDown,
    submitBtnDisable,
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
        rules={[
          (v)=>v.trim()!=='' || curLang.verify['empty_content'],
          (v)=>v.length<=2000 || curLang.verify['exceed_content'],
        ]}
      />
    </div>
  )
})


TextAreaComponent.displayName="TextAreaComponent"

export default TextAreaComponent
