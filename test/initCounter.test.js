import React from 'react';
import {Valine,ValinePageview} from '../src/react-valine'
import ReactDOM from 'react-dom';
import TestUtil from 'react-dom/test-utils';

const test_uniq_str="test-no-Counter"
const test_uniq_str2="test-Counter-no-size"


const nock = require('nock')

nock('https://app-router.leancloud.cn')
  .persist()
  .get('/2/route?appId=I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz')
  .reply(200, {"ttl":3600,"stats_server":"i5daxohp.stats.lncld.net","rtm_router_server":"i5daxohp.rtm.lncld.net","push_server":"i5daxohp.push.lncld.net","play_server":"i5daxohp.play.lncld.net","engine_server":"i5daxohp.engine.lncld.net","api_server":"i5daxohp.api.lncld.net"})


nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get("/1.1/classes/Counter?where=%7B%22uniqStr%22%3A%22test-no-Counter%22%7D")
  .replyWithError({
    code:101,
    message:'can not find Counter'
  })

nock("https://i5daxohp.api.lncld.net")
  .persist()
  .post("/1.1/classes/Counter",{"ACL":{"*":{"read":true,"write":true}},"uniqStr":"test-no-Counter","title":"","time":1})
  .reply(200)


nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get("/1.1/classes/Counter?where=%7B%22uniqStr%22%3A%22test-Counter-no-size%22%7D")
  .reply(200, {"results":[]})

nock("https://i5daxohp.api.lncld.net")
  .persist()
  .post("/1.1/classes/Counter",{"ACL":{"*":{"read":true,"write":true}},"uniqStr":"test-Counter-no-size","title":"","time":1})
  .reply(200)



describe('init Counter with not found', ()=>{
  let container=document.createElement("div")

  beforeAll(()=>{
    TestUtil.act(() => {
      ReactDOM.render(<Valine  appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
                               appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
                               requireEmail={true}
                               serverURLs={{
                                 api: "https://i5daxohp.api.lncld.net",
                                 engine: "https://i5daxohp.engine.lncld.net",
                                 push: "https://i5daxohp.push.lncld.net",
                                 stats: "https://i5daxohp.stats.lncld.net"
                               }}
      >
        <div className="App">
          <header className="App-header">
            <span id="pageviewCounts">
             浏览量：<ValinePageview uniqStr={test_uniq_str}/>
            </span>
          </header>
        </div>
      </Valine>, container);
    })
  })

  it("get leancloud",()=>{
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


  it('pageview Counts fetching',()=>{
    expect(container.querySelector("#pageviewCounts").innerHTML).toBe("浏览量：<span>获取中</span>")
  })

  it('pageview Counts inited',(done)=>{
    setTimeout(function(){
      expect(container.querySelector("#pageviewCounts").innerHTML).toBe("浏览量：<span>1</span>")
      done()
    },2000)
  })

})


describe('init Counter with length 0', ()=>{
  let container=document.createElement("div")

  beforeAll(()=>{
    TestUtil.act(() => {
      ReactDOM.render(<Valine  appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
                               appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
                               requireEmail={true}
      >
        <div className="App">
          <header className="App-header">
            <span id="pageviewCounts">
             浏览量：<ValinePageview uniqStr={test_uniq_str2}/>
            </span>
          </header>
        </div>
      </Valine>, container);
    })
  })

  it("get leancloud",()=>{
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


  it('pageview Counts fetching',()=>{
    expect(container.querySelector("#pageviewCounts").innerHTML).toBe("浏览量：<span>获取中</span>")
  })

  it('pageview Counts inited',(done)=>{
    setTimeout(function(){
      expect(container.querySelector("#pageviewCounts").innerHTML).toBe("浏览量：<span>1</span>")
      done()
    },2000)
  })
})