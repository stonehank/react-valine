import React from 'react';

export default React.forwardRef((props, ref) => {
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
