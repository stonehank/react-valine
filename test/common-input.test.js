import React from 'react';
import {Valine,ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'
import ReactDOM from 'react-dom';
import TestUtil from 'react-dom/test-utils';

const test_uniq_str="test-common-usage"


global.scrollTo=()=>{}



describe('test common usage', ()=>{
  let container=document.createElement("div"),
    app,
    wrap,
    list,
    page,
    errlog,
    textAreaEle,
    vinputs,
    vemojiBtn,
    vpreviewBtn,
    submitBtn,
    avatarBtn

  beforeAll(()=>{
    TestUtil.act(() => {
      ReactDOM.render(<Valine  appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
                               appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
                               requireEmail={true}
                               nest={false}
                               serverURLs={{
                                 api: "https://i5daxohp.api.lncld.net",
                                 engine: "https://i5daxohp.engine.lncld.net",
                                 push: "https://i5daxohp.push.lncld.net",
                                 stats: "https://i5daxohp.stats.lncld.net"
                               }}
      >
        <div className="App">
          <header className="App-header">
          <span id="commentCounts">
            评论数：<ValineCount uniqStr={test_uniq_str}/>
          </span>
            <br/>
            <span id="pageviewCounts">
             浏览量：<ValinePageview uniqStr={test_uniq_str}/>
          </span>
          </header>
          <div>
            <ValinePanel uniqStr={test_uniq_str} />
          </div>
        </div>
      </Valine>, container);
    })
    app = container.getElementsByClassName('v')
    wrap = container.getElementsByClassName('vwrap')
    list=container.getElementsByClassName("vlist")
    page=container.getElementsByClassName("vpage")
    errlog=container.getElementsByClassName("vscreen-errorlog")
    vinputs=container.getElementsByClassName("vinputs")[0]
    textAreaEle=container.getElementsByClassName("veditor vinput ")[0]
    vemojiBtn=container.getElementsByClassName("vemoji-btn")[0]
    vpreviewBtn=container.getElementsByClassName("vpreview-btn")[0]
    submitBtn=container.getElementsByClassName("vsubmit ")[0]
    avatarBtn=container.getElementsByClassName("vavatars-select-button")[0]
  })

  it('can render elements', () => {
    expect(app.length).toBe(1)
    expect(wrap.length).toBe(1)
    expect(list.length).toBe(0)
    expect(page.length).toBe(0)
    expect(vinputs.childNodes.length).toBe(3)
    expect(textAreaEle).not.toBe(null)
    expect(vemojiBtn).not.toBe(null)
    expect(vpreviewBtn).not.toBe(null)
    expect(submitBtn).not.toBe(null)
    expect(avatarBtn).not.toBe(null)
  });

  it("toggle protocol",()=>{
    let protoBtn=vinputs.childNodes[2].childNodes[0]
    expect(protoBtn.innerHTML).toBe("https://")
    TestUtil.Simulate.click(protoBtn)
    expect(protoBtn.innerHTML).toBe("http://")
  })

  it('verify inputs',()=>{
    let nickEle=vinputs.childNodes[0].childNodes[0],
      emailEle=vinputs.childNodes[1].childNodes[0],
      linkEle=vinputs.childNodes[2].childNodes[1]
    TestUtil.Simulate.click(submitBtn)
    expect(errlog[0].innerHTML).toBe("内容不能为空！")
    textAreaEle.value='  \r\t\n   '
    TestUtil.Simulate.change(textAreaEle)
    TestUtil.Simulate.click(submitBtn)
    expect(errlog[0].innerHTML).toBe("内容不能为空！")
    textAreaEle.value='something...'
    TestUtil.Simulate.change(
      textAreaEle
    )
    TestUtil.Simulate.click(submitBtn)

    expect(errlog[0].innerHTML).toBe("昵称为必填项！")
    nickEle.value="my-nick-name"
    TestUtil.Simulate.change(
      nickEle
    )
    TestUtil.Simulate.click(submitBtn)
    expect(errlog[0].innerHTML).toBe("email为必填项！")
    emailEle.value="invalid email format"
    TestUtil.Simulate.change(
      emailEle
    )
    TestUtil.Simulate.click(submitBtn)
    expect(errlog[0].innerHTML).toBe("email格式错误！")

    emailEle.value="valid@valid.com"
    linkEle.value="invalid link format"
    TestUtil.Simulate.change(
      emailEle
    )
    TestUtil.Simulate.change(
      linkEle
    )
    TestUtil.Simulate.click(submitBtn)
    expect(errlog[0].innerHTML).toBe("网址格式错误！")

    linkEle.value="http://www.abc.com"
    TestUtil.Simulate.change(
      linkEle
    )
    TestUtil.Simulate.click(submitBtn)
    expect(errlog[0].innerHTML).toBe("网址格式错误！")
  })
  it("toggle emoji panel",()=>{
    TestUtil.Simulate.click(vemojiBtn)
    let emojiPanelEles=container.getElementsByClassName("vemojis")
    expect(emojiPanelEles.length).toBe(1)
    TestUtil.Simulate.click(vemojiBtn)
    expect(emojiPanelEles.length).toBe(0)
  })
  it("toggle preview panel",()=>{
    TestUtil.Simulate.click(vpreviewBtn)
    let previewPanelEles=container.getElementsByClassName("vinput vpreview")
    expect(previewPanelEles.length).toBe(0)
    TestUtil.Simulate.click(vpreviewBtn)
    expect(previewPanelEles.length).toBe(1)
  })

  it('change avatar',()=>{
    let avatarList=container.getElementsByClassName("vavatars-select-list")
    expect(avatarList.length).toBe(0)
    TestUtil.Simulate.click(avatarBtn)
    expect(avatarList.length).toBe(1)
  })

  it("textarea input TAB",()=>{
    textAreaEle.value=''
    TestUtil.Simulate.change(textAreaEle)
    textAreaEle.focus()
    TestUtil.Simulate.keyDown(textAreaEle,{keyCode:9,preventDefault:()=>{}})
    expect(textAreaEle.value).toBe("  ")
  })

})