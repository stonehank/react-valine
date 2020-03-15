import React from 'react';
import InputContainer from "../src/input/InputContainer";
import enzyme,{mount} from 'enzyme'
const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });

const map = {};
global.window.addEventListener = jest.fn((event, cb) => {
  if(map[event]==null)map[event]=[cb]
  else map[event].push(cb)
});

describe('Test InputContainer List', ()=>{
  const app=mount(<InputContainer submitBtnDisable={false}
                                      curLang={{tips:{},head:{},ctrl:{},verify:{}}}
  />)

  it('Mouseenter avatarBtn should toggle mark',()=>{
    expect(app.find('.vavatars-select-mark').length).toBe(0)
    app.find('.vavatars-select-button').at(0).simulate('mouseenter')
    expect(app.find('.vavatars-select-mark').length).toBe(1)
    app.find('.vavatars-select-button').at(0).simulate('mouseleave')
    expect(app.find('.vavatars-select-mark').length).toBe(0)
  })

  it('Choose by click', () => {
    expect(app.find(".vemoji-preview-list").length).toBe(0)
    app.setState({
      commentContent:'',
      emojiList:["100", "+1", "-1", "heavy_check_mark", "grin"],
      emojiListPos:[5,10,15],
      emojiChooseId:0,
      emojiPrefix:''
    });
    expect(app.find(".vemoji-preview-list").length).toBe(1)
    app.find('.vemoji-preview-list li').at(0).simulate('click',{stopPropagation:()=>{}});
    expect(app.find(".vemoji-preview-list").length).toBe(0)
    expect(app.find('textarea').at(0).text()).toBe("💯 ")
  });

  it('choose by keyboard', () => {
    expect(app.find(".vemoji-preview-list").length).toBe(0)
    app.setState({
      commentContent:"",
      emojiList:["100", "+1", "-1", "heavy_check_mark", "grin"],
      emojiListPos:[5,10,15],
      emojiChooseId:4,
      emojiPrefix:''
    });
    app.find('textarea').at(0).simulate('focus')
    app.find('textarea').at(0).simulate('keydown',{keyCode:38,preventDefault:()=>{}})
    expect(app.find(".vemoji-preview-list").length).toBe(1)
    app.find('textarea').at(0).simulate('keydown',{keyCode:13,preventDefault:()=>{}})
    expect(app.find(".vemoji-preview-list").length).toBe(0)
    expect(app.find('textarea').at(0).text()).toBe("✔️ ")
  });

  it("click on some element can not cancel emojiPreview",()=>{
    expect(app.find(".vemoji-preview-list").length).toBe(0)
    app.setState({
      commentContent:":",
      emojiList:["100", "+1", "-1", "heavy_check_mark", "grin"],
      emojiListPos:[5,10,15],
      emojiChooseId:4,
      emojiPrefix:''
    })
    expect(app.state('emojiList')).toEqual(["100", "+1", "-1", "heavy_check_mark", "grin"])
    app.find('textarea').simulate('click')
    expect(app.state('emojiList')).toEqual(["100", "+1", "-1", "heavy_check_mark", "grin"])
    expect(app.find(".vemoji-preview-list").length).toBe(1)

  })

  it("emojiPreview cancel by click",()=>{
    expect(app.state('emojiList')).toEqual(["100", "+1", "-1", "heavy_check_mark", "grin"])
    expect(app.find(".vemoji-preview-list").length).toBe(1)
    map.click.forEach(fn=>fn({target:{parentNode:{className:"vinputs"}},stopPropagation:()=>{}}))
    expect(app.state('emojiList')).toEqual([])
    expect(app.render().find(".vemoji-preview-list").length).toBe(0)
    expect(app.find('.v-editor-main textarea').at(0).text()).toBe(":")

  })

  it("emojiPreview cancel by keyboard",()=>{
    expect(app.state('emojiList')).toEqual([])
    expect(app.render().find(".vemoji-preview-list").length).toBe(0)
    app.setState({
      commentContent:":",
      emojiList:["100", "+1", "-1", "heavy_check_mark", "grin"],
      emojiListPos:[5,10,15],
      emojiChooseId:4,
      emojiPrefix:''
    });
    expect(app.state('emojiList')).toEqual(["100", "+1", "-1", "heavy_check_mark", "grin"])
    expect(app.find(".vemoji-preview-list").length).toBe(1)
    app.find('textarea').at(0).simulate('focus')
    app.find('textarea').at(0).simulate('keydown',{keyCode:27,preventDefault:()=>{}})
    expect(app.find(".vemoji-preview-list").length).toBe(0)
    expect(app.find('textarea').at(0).text()).toBe(":")
  })


})
