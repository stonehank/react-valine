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


/* fetch pageview */
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get("/1.1/classes/Counter?where=%7B%22uniqStr%22:%22test-1-reply%22%7D")
  .reply(200, {"results":[{"uniqStr":"test-1-reply","title":"\u6d4b\u8bd5\u9875\u9762localhost","time":9999,"createdAt":"2019-05-29T14:53:57.872Z","updatedAt":"2019-05-30T08:08:47.209Z","objectId":"5cee9d0530863b006861c98c"}]})

nock("https://i5daxohp.api.lncld.net:443")
  .persist()
  .put("/1.1/classes/Counter/5cee9d0530863b006861c98c?fetchWhenSave=true",{"time":{"__op":"Increment","amount":1},"title":""})
  .reply(200,{"updatedAt":"2019-06-05T06:03:34.901Z","objectId":"5cee9d0530863b006861c98c"})



describe('Pageview upload', ()=> {
  let app
  beforeAll(() => {
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
            <span id="pageviewCounts">
             浏览量：<ValinePageview uniqStr={test_uniq_str}/>
          </span>
        </div>
      </Valine>
    );
  })

  it('Pageview Counts fetch',()=>{
    expect(app.find("#pageviewCounts").text()).toBe("浏览量：获取中")
  })

  it('Wait Render',(done)=>{
    setTimeout(() => {
      // fetch done
      done()
    }, 2000)
  })

  it('Pageview Counts should be 9999+1',()=>{
    expect(app.find("#pageviewCounts").text()).toBe("浏览量：10000")
  })
})
