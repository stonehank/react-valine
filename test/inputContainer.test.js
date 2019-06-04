import React from 'react';
import InputContainer from "../src/input/InputContainer";
import enzyme,{mount} from 'enzyme'
const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });

const map = {};
global.document.addEventListener = jest.fn((event, cb) => {
  if(map[event]==null)map[event]=[cb]
  else map[event].push(cb)
});

describe('Test InputContainer List', ()=>{
  const wrapper=mount(<InputContainer submitBtnDisable={false}
                                      curLang={{tips:{},head:{},ctrl:{}}}
  />)

  it("cancel emoji panel by click",()=>{
    expect(wrapper.find(".vemojis").length).toBe(0)
    wrapper.find('.vemoji-btn').at(0).simulate('click')
    expect(wrapper.find(".vemojis").length).toBe(1)
    map.click.forEach(fn=>fn({target:{className:"veditors"},stopPropagation:()=>{}}))
    // turnoff by click
    expect(wrapper.render().find(".vemojis").length).toBe(0)
  })

  it('cancel avatar by click',()=>{
    expect(wrapper.find(".vavatars-select-list").length).toBe(0)
    wrapper.find('.vavatars-select-button').at(0).simulate('click')
    expect(wrapper.find(".vavatars-select-list").length).toBe(1)
    wrapper.find('.vavatars-select-button').at(0).simulate('click')
    expect(wrapper.find(".vavatars-select-list").length).toBe(0)
    wrapper.find('.vavatars-select-button').at(0).simulate('click')
    map.click.forEach(fn=>fn({target:{className:"veditors"},stopPropagation:()=>{}}))
    // turnoff by click
    expect(wrapper.render().find(".vemojis").length).toBe(0)
  })

  it('mouseenter avatarBtn should toggle mark',()=>{
    expect(wrapper.find('.vavatars-select-mark').length).toBe(0)
    wrapper.find('.vavatars-select-button').at(0).simulate('mouseenter')
    expect(wrapper.find('.vavatars-select-mark').length).toBe(1)
    wrapper.find('.vavatars-select-button').at(0).simulate('mouseleave')
    expect(wrapper.find('.vavatars-select-mark').length).toBe(0)
  })

  it('choose by click', () => {
    expect(wrapper.find(".vemoji-preview-list").length).toBe(0)
    wrapper.setState({
      emojiList:["100", "+1", "-1", "heavy_check_mark", "grin"],
      emojiListPos:[5,10,15],
      emojiChooseId:0,
      emojiPrefix:''
    });
    expect(wrapper.find(".vemoji-preview-list").length).toBe(1)
    wrapper.find('.vemoji-preview-list li').at(0).simulate('click',{stopPropagation:()=>{}});
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

  it("click on some element can not cancel",()=>{
    expect(wrapper.find(".vemoji-preview-list").length).toBe(0)
    wrapper.setState({
      commentContent:":",
      emojiList:["100", "+1", "-1", "heavy_check_mark", "grin"],
      emojiListPos:[5,10,15],
      emojiChooseId:4,
      emojiPrefix:''
    })
    expect(wrapper.state('emojiList')).toEqual(["100", "+1", "-1", "heavy_check_mark", "grin"])
    map.click.forEach(fn=>fn({target:{id:"veditor"},stopPropagation:()=>{}}))
    expect(wrapper.state('emojiList')).toEqual(["100", "+1", "-1", "heavy_check_mark", "grin"])
    expect(wrapper.find(".vemoji-preview-list").length).toBe(1)

  })

  it("cancel by click",()=>{
    expect(wrapper.state('emojiList')).toEqual(["100", "+1", "-1", "heavy_check_mark", "grin"])
    expect(wrapper.find(".vemoji-preview-list").length).toBe(1)
    map.click.forEach(fn=>fn({target:{parentNode:{className:"vinputs"}},stopPropagation:()=>{}}))
    expect(wrapper.state('emojiList')).toEqual([])
    expect(wrapper.render().find(".vemoji-preview-list").length).toBe(0)
    expect(wrapper.find('.veditor').at(0).text()).toBe(":")

  })

  it("cancel by keyboard",()=>{
    expect(wrapper.state('emojiList')).toEqual([])
    expect(wrapper.render().find(".vemoji-preview-list").length).toBe(0)
    wrapper.setState({
      commentContent:":",
      emojiList:["100", "+1", "-1", "heavy_check_mark", "grin"],
      emojiListPos:[5,10,15],
      emojiChooseId:4,
      emojiPrefix:''
    });
    expect(wrapper.state('emojiList')).toEqual(["100", "+1", "-1", "heavy_check_mark", "grin"])
    expect(wrapper.find(".vemoji-preview-list").length).toBe(1)
    wrapper.find('.veditor').at(0).simulate('focus')
    wrapper.find('.veditor').at(0).simulate('keydown',{keyCode:27,preventDefault:()=>{}})
    expect(wrapper.find(".vemoji-preview-list").length).toBe(0)
    expect(wrapper.find('.veditor').at(0).text()).toBe(":")
  })
})
