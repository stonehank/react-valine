import React from 'react';
import InputContainer from "../src/input/InputContainer";
import enzyme,{mount} from 'enzyme'
const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });


describe('Test InputContainer List', ()=>{
  const wrapper=mount(<InputContainer submitBtnDisable={false}
                                      curLang={{tips:{},head:{},ctrl:{}}}
  />)

  it('choose by click', () => {
    expect(wrapper.find(".vemoji-preview-list").length).toBe(0)
    wrapper.setState({
      emojiList:["100", "+1", "-1", "heavy_check_mark", "grin"],
      emojiListPos:[5,10,15],
      emojiChooseId:0,
      emojiPrefix:''
    });
    expect(wrapper.find(".vemoji-preview-list").length).toBe(1)
    wrapper.find('.vemoji-preview-list li').at(0).simulate('click');
    expect(wrapper.find(".vemoji-preview-list").length).toBe(0)
    expect(wrapper.find('.veditor').at(0).text()).toBe("💯 ")
  });

  it('choose by keyboard', () => {
    expect(wrapper.find(".vemoji-preview-list").length).toBe(0)
    wrapper.setState({
      commentContent:"",
      emojiList:["100", "+1", "-1", "heavy_check_mark", "grin"],
      emojiListPos:[5,10,15],
      emojiChooseId:4,
      emojiPrefix:''
    });
    wrapper.find('.veditor').at(0).simulate('focus')
    wrapper.find('.veditor').at(0).simulate('keydown',{keyCode:38,preventDefault:()=>{}})
    expect(wrapper.find(".vemoji-preview-list").length).toBe(1)
    wrapper.find('.veditor').at(0).simulate('keydown',{keyCode:13,preventDefault:()=>{}})
    expect(wrapper.find(".vemoji-preview-list").length).toBe(0)
    expect(wrapper.find('.veditor').at(0).text()).toBe("✔️ ")
  });

  // it("cancel by click",()=>{
  //   expect(wrapper.find(".vemoji-preview-list").length).toBe(0)
  //   wrapper.setState({
  //     commentContent:"",
  //     emojiList:["100", "+1", "-1", "heavy_check_mark", "grin"],
  //     emojiListPos:[5,10,15],
  //     emojiChooseId:4,
  //     emojiPrefix:''
  //   })
  //   wrapper.find('.veditor').at(0).simulate('click')
  //   expect(wrapper.find(".vemoji-preview-list").length).toBe(1)
  //   wrapper.find('body').at(0).simulate('click')
  //   expect(wrapper.find(".vemoji-preview-list").length).toBe(0)
  //   expect(wrapper.find('.veditor').at(0).text()).toBe("")
  // })

  it("cancel by keyboard",()=>{
    expect(wrapper.find(".vemoji-preview-list").length).toBe(0)
    wrapper.setState({
      commentContent:"",
      emojiList:["100", "+1", "-1", "heavy_check_mark", "grin"],
      emojiListPos:[5,10,15],
      emojiChooseId:4,
      emojiPrefix:''
    });
    wrapper.find('.veditor').at(0).simulate('focus')
    wrapper.find('.veditor').at(0).simulate('keydown',{keyCode:27,preventDefault:()=>{}})
    expect(wrapper.find(".vemoji-preview-list").length).toBe(0)
    expect(wrapper.find('.veditor').at(0).text()).toBe("")
  })
})
