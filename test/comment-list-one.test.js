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


/* fetch nestInit start */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-1-reply%22%7D&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at&order=-createdAt&limit=10')
  .reply(200, {"results":[{"nick":"fsf","updatedAt":"2019-05-29T13:33:18.710Z","objectId":"5cee8a1d43e78c006734fc8e","createdAt":"2019-05-29T13:33:17.983Z","pid":"","link":"","comment":"<p>sdfsadf<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=robohash&size=50","rid":"5cee8a1d43e78c006734fc8e"}]})

nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-1-reply%22%7D&count=1&limit=0')
  .reply(200, {"results":[],"count":1})


/* fetch pageview */
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get("/1.1/classes/Counter?where=%7B%22uniqStr%22:%22test-1-reply%22%7D")
  .reply(200, {"results":[{"uniqStr":"test-1-reply","title":"\u6d4b\u8bd5\u9875\u9762localhost","time":9999,"createdAt":"2019-05-29T14:53:57.872Z","updatedAt":"2019-05-30T08:08:47.209Z","objectId":"5cee9d0530863b006861c98c"}]})

global.scrollTo=()=>{}

describe('Test One Comment', ()=>{
  let app
  beforeAll((done)=>{
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
    setTimeout(()=>{
      // fetch done
      app.update()
      done()
    },4000)
  })

  it('Comment info',()=>{
    expect(app.find(".vnick").text()).toBe("fsf")
    expect(app.find(".vtime").text()).not.toBe('')
    expect(app.find(".v-content-body").text().trim()).toBe("sdfsadf")
  })

  it('Comment Counts has 1',()=>{
    expect(app.find("#commentCounts").text()).toBe("评论数：1")
  })

  it('Pageview Counts has 9999',()=>{
    expect(app.find("#pageviewCounts").text()).toBe("浏览量：9999")
  })

  it('Comment list has 1 child',()=>{
    console.log(app.find(".vcard").length)
    console.log(app.html().includes('vcard'))
    expect(app.find('.vinfo').length).toBe(1)
    expect(app.find('.vcount').text()).toBe('总共1条评论')
    expect(app.find(".vcard").length).toBe(1)
    expect(app.find('.vcard').prop('id')).toBe('5cee8a1d43e78c006734fc8e')
  })

  it('Show last line',()=>{
    expect(app.find('.v-content-footer').text().includes('已经到最后啦')).toBe(true)
  })

  it('Click Reply',()=>{
    app.find('.v-action-reply').simulate('click')
    expect(app.find('.v-editor-main textarea').prop('value')).toBe("@fsf ")
    expect(app.find('.v-content-preview').text().trim()).toBe(`@fsf`)
  })

  it('Click discuss',()=>{
    app.find('.vdiscuss').simulate('click')
    expect(document.activeElement).toBe(app.find('.v-editor-main textarea').getDOMNode())
  })
})
