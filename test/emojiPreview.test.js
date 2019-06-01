import EmojiPreviewComponent from '../src/input/EmojiPreviewComponent'
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtil from 'react-dom/test-utils';


describe('Test EmojiPreview List', ()=>{
  let container=document.createElement("div"),list

  beforeAll(()=>{
    TestUtil.act(() => {
      ReactDOM.render(<EmojiPreviewComponent emojiList={["100", "+1", "-1", "heavy_check_mark", "grin"]}
                                             chooseEmoji={()=>{}}
                                             emojiChooseId={0}
                                             emojiPrefix={''}
                                             emojiListPos={[5,10,15]}
      />, container);
    })
    list=container.getElementsByClassName("vemoji-preview-list")
  })

  it('can render list', () => {
    expect(list.length).toBe(1)
  });

})
