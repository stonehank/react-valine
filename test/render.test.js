import React from 'react';
import {Valine,ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const test_uniq_str="test-common-usage"


const nock = require('nock')

nock('https://app-router.leancloud.cn')
  .persist()
  .get('/2/route?appId=I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz')
  .reply(200, {"ttl":3600,"stats_server":"i5daxohp.stats.lncld.net","rtm_router_server":"i5daxohp.rtm.lncld.net","push_server":"i5daxohp.push.lncld.net","play_server":"i5daxohp.play.lncld.net","engine_server":"i5daxohp.engine.lncld.net","api_server":"i5daxohp.api.lncld.net"})


/* fetch nestInit start */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-common-usage%22%7D&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at&order=-createdAt&limit=10')
  .reply(200, {"results":[]})

nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-common-usage%22%7D&count=1&limit=0')
  .reply(200, {"results":[],"count":0})


/* fetch pageview */
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get("/1.1/classes/Counter?where=%7B%22uniqStr%22:%22test-common-usage%22%7D")
  .reply(200, {"results":[{"uniqStr":"test-common-usage","title":"\u6d4b\u8bd5\u9875\u9762localhost","time":9999,"createdAt":"2019-05-29T14:53:57.872Z","updatedAt":"2019-05-30T08:08:47.209Z","objectId":"5cee9d0530863b006861c98c"}]})


describe('Common Render', ()=> {
  let app
  beforeEach(()=>{
    app = Enzyme.mount(
      <Valine appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
              appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
              requireEmail={true}
              nest={false}
              CommentClass={"Comment"}
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
    expect(app.find('.react-valine').length).toBe(1);
    expect(app.find('.v-main-wrapper').length).toBe(1);
    expect(app.find('.vinputs-ident input').length).toBe(3)
    expect(app.find('.v-link-toggle').length).toBe(1)
    expect(app.find('.v-editor-main textarea').length).toBe(1)
    expect(app.find('.vemoji-btn').length).toBe(1)
    expect(app.find('.vpreview-btn').length).toBe(1)
    expect(app.find('.vavatars-select-button').length).toBe(1)
    expect(app.find('.vsubmit-ident').length).toBe(1)
    expect(app.find('.v-content-footer').length).toBe(0);
    expect(app.find('.vscreen-errorlog').length).toBe(0);
    expect(app.find('.vlist').length).toBe(0)
    expect(app.find('.error-msg').length).toBe(0)
  });

  it("Toggle protocol",()=>{
    expect(app.find('.v-link-toggle').text()).toBe("https://")
    app.find('.v-link-toggle').simulate('click')
    expect(app.find('.v-link-toggle').text()).toBe("http://")
  })

  it('Validate inputs',()=>{
    app.find('.vsubmit-ident').simulate('click')
    expect(app.find('.error-msg').length).toBe(3)
    expect(app.find('.error-msg').at(0).text()).toBe('昵称为必填项！');
    expect(app.find('.error-msg').at(1).text()).toBe('email为必填项！');
    expect(app.find('.error-msg').at(2).text()).toBe('内容不能为空！');
    app.find('.vinputs-ident input').at(0).simulate('change', {name:'username', target: { value: 'username-test' } })
    app.find('.vinputs-ident input').at(1).simulate('change',{name:'email', target: { value: 'invalid@email' } })
    app.find('.v-editor-main textarea').simulate('change',{name:'comment', target: { value: '  \n\t\n    ' } })
    app.find('.vsubmit-ident').simulate('click')
    expect(app.find('.error-msg').length).toBe(2)
    expect(app.find('.error-msg').at(0).text()).toBe('email格式错误！');
    expect(app.find('.error-msg').at(1).text()).toBe('内容不能为空！');
    app.find('.vinputs-ident input').at(1).simulate('change',{name:'email', target: { value: 'valid@email.com' } })
    app.find('.v-editor-main textarea').simulate('change',{name:'comment', target: { value: 'some comment' } })
    app.find('.vinputs-ident input').at(2).simulate('change',{name:'link', target: { value: 'invalidlink' } })
    app.find('.vsubmit-ident').simulate('click')
    expect(app.find('.error-msg').length).toBe(1)
    expect(app.find('.error-msg').at(0).text()).toBe('网址格式错误！');
    app.find('.vinputs-ident input').at(2).simulate('change',{name:'link', target: { value: 'www.valid.com' } })
    app.find('.vsubmit-ident').simulate('click')
    expect(app.find('.error-msg').length).toBe(0)
  })

  it("Toggle Emoji Panel",()=>{
    app.find('.vemoji-btn').simulate('click')
    expect(app.find('.emoji-panel-box').length).toBe(1)
    expect(app.find('.drawer-panel-mask').length).toBe(1)
    // Choose emoji will not close drawer
    app.find('.emoji-panel-item').at(0).simulate('click')
    expect(app.find('.emoji-panel-box').length).toBe(1)
    expect(app.find('.drawer-panel-mask').length).toBe(1)
    // Choose emoji will show in textarea also in preview panel
    expect(app.find('.v-content-preview').length).toBe(1)
    expect(app.find('.v-editor-main textarea').prop('value')).toBe('💯 ')
    expect(app.find('.v-content-preview').text().trim()).toBe('💯')
    // Click mask will close drawer
    app.find('.drawer-panel-mask').simulate('click')
    expect(app.find('.emoji-panel-box').length).toBe(0)
    expect(app.find('.drawer-panel-mask').length).toBe(0)

  })

  it("Toggle Preview Panel",()=>{
    // Default text
    expect(app.find('.vpreview-btn').text()).toBe('预览：On')
    // No content, no show preview panel
    expect(app.find('.v-content-preview').length).toBe(0)
    app.find('.v-editor-main textarea').simulate('change',{name:'comment', target: { value: 'some comment' } })
    expect(app.find('.v-content-preview').length).toBe(1)
    // Close preview panel
    app.find('.vpreview-btn').simulate('click')
    expect(app.find('.vpreview-btn').text()).toBe('预览：Off')
    expect(app.find('.v-content-preview').length).toBe(0)
  })

  it('Choose Avatar',()=>{
    // Default not show
    expect(app.find('.avatar-panel-box').length).toBe(0)
    app.find('.vavatars-select-button').simulate('click')
    // Show After click
    expect(app.find('.avatar-panel-box').length).toBe(1)
  })

  it('Show Fetching List',()=>{
    expect(app.find("#commentCounts").text()).toBe("评论数：获取中")
    expect(app.find("#pageviewCounts").text()).toBe("浏览量：获取中")
  })

  it("Textarea input TAB",()=>{
    app.find('.v-editor-main textarea').simulate('focus')
    app.find('.v-editor-main textarea').simulate('keydown',{keyCode:9,preventDefault:()=>{}})
    expect(app.find('.v-editor-main textarea').prop('value')).toBe("  ")
  })
})
