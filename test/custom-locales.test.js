import React from 'react';
import {Valine,ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

const test_uniq_str="test-1-reply"


const nock = require('nock')

nock('https://app-router.leancloud.cn')
  .persist()
  .get('/2/route?appId=I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz')
  .reply(200, {"ttl":3600,"stats_server":"i5daxohp.stats.lncld.net","rtm_router_server":"i5daxohp.rtm.lncld.net","push_server":"i5daxohp.push.lncld.net","play_server":"i5daxohp.play.lncld.net","engine_server":"i5daxohp.engine.lncld.net","api_server":"i5daxohp.api.lncld.net"})


nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-1-reply%22%7D&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at&order=-createdAt&limit=10')
  .reply(200, {"results":[]})

nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-1-reply%22%7D&count=1&limit=0')
  .reply(200, {"results":[],"count":0})


nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get("/1.1/classes/Counter?where=%7B%22uniqStr%22:%22test-1-reply%22%7D")
  .reply(200, {"results":[{"uniqStr":"test-1-reply","title":"\u6d4b\u8bd5\u9875\u9762localhost","time":9999,"createdAt":"2019-05-29T14:53:57.872Z","updatedAt":"2019-05-30T08:08:47.209Z","objectId":"5cee9d0530863b006861c98c"}]})

global.scrollTo=()=>{}

describe('Custom Localse Test', ()=> {
  let app
  beforeAll(() => {
    app = Enzyme.mount(
      <Valine appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
              appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
              requireEmail={true}
              nest={false}
              customTxt={{
                "head": {
                  "nick": "你的大名",
                  "require":"(别漏哦)",
                },
                "tips": {
                  "count":"正在获取评论数",
                  "pageview":"正在获取浏览量",
                  "sofa": "沙发！沙发！沙发！"
                },
                "ctrl": {
                  "preview_on":"预览ing...",
                },
                "verify":{
                  "require_mail":"email别漏！",
                }
              }}
              serverURLs={{
                api: "https://i5daxohp.api.lncld.net",
                engine: "https://i5daxohp.engine.lncld.net",
                push: "https://i5daxohp.push.lncld.net",
                stats: "https://i5daxohp.stats.lncld.net"
              }}
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
  it('Custom Comment Counts fetching text',()=>{
    expect(app.find("#commentCounts").text()).toBe("评论数：正在获取评论数")
  })
  it('Custom Pageview Counts fetching text',()=>{
    expect(app.find("#pageviewCounts").text()).toBe("浏览量：正在获取浏览量")
  })
  it('Wait Render',(done)=>{
    setTimeout(()=>{
      app.update()
      done()
    },4000)
  })
  it('Custom List Child Text',()=>{
    expect(app.find('.vempty').text()).toBe("沙发！沙发！沙发！")
  })
  it('Custom preview button text',()=>{
    expect(app.find('.vpreview-btn').text()).toBe("预览：预览ing...")
  })
  it('Custom email verify text',()=>{
    app.find('.vsubmit-ident').simulate('click')
    expect(app.find('.error-msg').at(1).text()).toBe('email别漏！');
  })
})


