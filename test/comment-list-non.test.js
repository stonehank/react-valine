import React from 'react';
import {Valine,ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

const test_uniq_str="test-non-reply"


const nock = require('nock')

nock('https://app-router.leancloud.cn')
  .persist()
  .get('/2/route?appId=I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz')
  .reply(200, {"ttl":3600,"stats_server":"i5daxohp.stats.lncld.net","rtm_router_server":"i5daxohp.rtm.lncld.net","push_server":"i5daxohp.push.lncld.net","play_server":"i5daxohp.play.lncld.net","engine_server":"i5daxohp.engine.lncld.net","api_server":"i5daxohp.api.lncld.net"})


/* fetch nestInit start */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-non-reply%22%7D&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at&order=-createdAt&limit=10')
  .reply(200, {"results":[]})

nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-non-reply%22%7D&count=1&limit=0')
  .reply(200, {"results":[],"count":0})


/* fetch pageview */
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get("/1.1/classes/Counter?where=%7B%22uniqStr%22:%22test-non-reply%22%7D")
  .reply(200, {"results":[{"uniqStr":"test-non-reply","title":"\u6d4b\u8bd5\u9875\u9762localhost","time":9999,"createdAt":"2019-05-29T14:53:57.872Z","updatedAt":"2019-05-30T08:08:47.209Z","objectId":"5cee9d0530863b006861c98c"}]})

global.scrollTo=()=>{}

describe('Test No Comment', ()=> {
  let app
  beforeAll((done) => {
    app = Enzyme.mount(
      <Valine appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
              appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
              requireEmail={true}
              nest={false}
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
    setTimeout(() => {
      // fetch done
      app.update()
      done()
    }, 4000)
  })
  it('Show Count and Pageview',()=>{
    expect(app.find("#commentCounts").text()).toBe("评论数：0")
    expect(app.find("#pageviewCounts").text()).toBe("浏览量：9999")
  })

  it("Get leancloud",()=>{
    expect(window.AV).not.toBe(null)
    let Ct=AV.Object.extend('Counter')
    let newCounter=new Ct()
    expect(Ct).not.toBe(null)
    expect(newCounter).not.toBe(null)
    expect(new AV.ACL().setPublicReadAccess).toBeInstanceOf(Function)
    expect(new AV.ACL().setPublicWriteAccess).toBeInstanceOf(Function)
    expect(newCounter.setACL).toBeInstanceOf(Function)
    expect(newCounter.set).toBeInstanceOf(Function)
    expect(newCounter.save).toBeInstanceOf(Function)
  })

  it('List has no child',()=>{
    expect(app.find('.vempty').length).toBe(1)
    expect(app.find('.vempty').text()).toBe('快来做第一个评论的人吧~')
  })
})



