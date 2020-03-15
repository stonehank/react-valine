import React from 'react';
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import EmojiPreviewComponent from "../src/input/EmojiPreviewComponent";
Enzyme.configure({ adapter: new Adapter() });


describe('Test Emoji Preview List', ()=> {
  let app
  beforeAll((done) => {
    app = Enzyme.mount(
      <EmojiPreviewComponent emojiList={["100", "+1", "-1", "heavy_check_mark", "grin"]}
                             chooseEmoji={()=>{}}
                             emojiChooseId={0}
                             emojiPrefix={''}
                             emojiListPos={[5,10,15]}
      />);
    setTimeout(() => {
      // fetch done
      app.update()
      done()
    }, 4000)
  })

  it('Can render list', () => {
    expect(app.find('.vemoji-preview-list').length).toBe(1)
  });

  it("Length is 5",()=>{
    expect(app.find('.vemoji-preview-list').children().length).toBe(5)
  })

})
