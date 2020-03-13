import React from 'react';
import {Valine,ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const test_uniq_str="test-common-usage"
describe('Common Render', ()=> {
  let app
  beforeEach(()=>{
    app = Enzyme.mount(
      <Valine appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
              appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
              requireEmail={true}
              nest={false}
      >
        <div className="App">
          <header className="App-header">
            <span id="commentCounts">评论数：<ValineCount uniqStr={test_uniq_str}/></span>
            <span id="pageviewCounts">浏览量：<ValinePageview uniqStr={test_uniq_str}/></span>
          </header>
          <div><ValinePanel uniqStr={test_uniq_str}/></div>
        </div>
      </Valine>
    );
  })
  it('First load render', () => {

    // console.log(app.text())
    expect(app.find('.react-valine').length).toEqual(1);
    expect(app.find('.v-main-wrapper').length).toEqual(1);
    expect(app.find('.vinputs-ident input').length).toEqual(3)
    expect(app.find('.v-link-toggle').length).toEqual(1)
    expect(app.find('.v-editor-main textarea').length).toEqual(1)
    expect(app.find('.vemoji-btn').length).toEqual(1)
    expect(app.find('.vpreview-btn').length).toEqual(1)
    expect(app.find('.vavatars-select-button').length).toEqual(1)
    expect(app.find('.vsubmit-ident').length).toEqual(1)
    expect(app.find('.v-content-footer').length).toEqual(0);
    expect(app.find('.vscreen-errorlog').length).toEqual(0);
    expect(app.find('.vlist').length).toEqual(0)
  });

  it("Toggle protocol",()=>{
    expect(app.find('.v-link-toggle').text()).toBe("https://")
    app.find('.v-link-toggle').simulate('click')
    expect(app.find('.v-link-toggle').text()).toBe("http://")
  })

  it('Validate inputs',()=>{
    app.find('.vsubmit-ident').simulate('click')
    expect(app.text().includes('昵称为必填项！')).toBe(true);
    expect(app.text().includes('email为必填项')).toBe(true);
    expect(app.text().includes('内容不能为空')).toBe(true);
    app.find('.vinputs-ident').value='  \r\t\n    '
    app.find('.v-editor-main textarea').value='  \r\t\n    '
    app.find('.v-editor-main textarea').value='  \r\t\n    '
    app.find('.v-editor-main textarea').simulate('change')
    app.find('.vsubmit-ident').simulate('click')
    // textAreaEle.value='  \r\t\n   '
    // TestUtil.Simulate.change(textAreaEle)
    // TestUtil.Simulate.click(submitBtn)
    // expect(errlog[0].innerHTML).toBe("内容不能为空！")
    // textAreaEle.value='something...'
    // TestUtil.Simulate.change(
    //   textAreaEle
    // )
    // TestUtil.Simulate.click(submitBtn)
    //
    // expect(errlog[0].innerHTML).toBe("昵称为必填项！")
    // nickEle.value="my-nick-name"
    // TestUtil.Simulate.change(
    //   nickEle
    // )
    // TestUtil.Simulate.click(submitBtn)
    // expect(errlog[0].innerHTML).toBe("email为必填项！")
    // emailEle.value="invalid email format"
    // TestUtil.Simulate.change(
    //   emailEle
    // )
    // TestUtil.Simulate.click(submitBtn)
    // expect(errlog[0].innerHTML).toBe("email格式错误！")
    //
    // emailEle.value="valid@valid.com"
    // linkEle.value="invalid link format"
    // TestUtil.Simulate.change(
    //   emailEle
    // )
    // TestUtil.Simulate.change(
    //   linkEle
    // )
    // TestUtil.Simulate.click(submitBtn)
    // expect(errlog[0].innerHTML).toBe("网址格式错误！")
    //
    // linkEle.value="http://www.abc.com"
    // TestUtil.Simulate.change(
    //   linkEle
    // )
    // TestUtil.Simulate.click(submitBtn)
    // expect(errlog[0].innerHTML).toBe("网址格式错误！")
  })
  // it("toggle emoji panel",()=>{
  //   TestUtil.Simulate.click(vemojiBtn)
  //   let emojiPanelEles=container.getElementsByClassName("vemojis")
  //   expect(emojiPanelEles.length).toBe(1)
  //   TestUtil.Simulate.click(vemojiBtn)
  //   expect(emojiPanelEles.length).toBe(0)
  // })
  // it("toggle preview panel",()=>{
  //   TestUtil.Simulate.click(vpreviewBtn)
  //   let previewPanelEles=container.getElementsByClassName("vinput vpreview")
  //   expect(previewPanelEles.length).toBe(0)
  //   TestUtil.Simulate.click(vpreviewBtn)
  //   expect(previewPanelEles.length).toBe(1)
  // })

  // it('change avatar',()=>{
  //   let avatarList=container.getElementsByClassName("vavatars-select-list")
  //   expect(avatarList.length).toBe(0)
  //   TestUtil.Simulate.click(avatarBtn)
  //   expect(avatarList.length).toBe(1)
  // })
})
