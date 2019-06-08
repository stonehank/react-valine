import React from 'react';

const TextAreaComponent=React.forwardRef((props, ref) => {
  const {
    commentContent,
    placeholder,
    contentOnChange,
    contentOnKeyDown
  } = props;
  return (
    <textarea ref={ref}
              id="veditor"
              className={"veditor vinput"}
              placeholder={placeholder}
              onChange={contentOnChange}
              onKeyDown={contentOnKeyDown}
              value={commentContent}
    />
  )
})


TextAreaComponent.displayName=TextAreaComponent

export default TextAreaComponent