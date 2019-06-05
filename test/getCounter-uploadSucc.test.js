import React from 'react';
import {Valine,ValinePageview} from '../src/react-valine'
import ReactDOM from 'react-dom';
import TestUtil from 'react-dom/test-utils';

const test_uniq_str="test-no-reply"


const nock = require('nock')

nock('https://app-router.leancloud.cn')
  .persist()
  .get('/2/route?appId=I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz')
  .reply(200, {"ttl":3600,"stats_server":"i5daxohp.stats.lncld.net","rtm_router_server":"i5daxohp.rtm.lncld.net","push_server":"i5daxohp.push.lncld.net","play_server":"i5daxohp.play.lncld.net","engine_server":"i5daxohp.engine.lncld.net","api_server":"i5daxohp.api.lncld.net"})


nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get("/1.1/classes/Counter?where=%7B%22uniqStr%22%3A%22test-no-reply%22%7D")
  .reply(200, {"results":[{"uniqStr":"test-no-reply","title":"\u6d4b\u8bd5\u9875\u9762localhost","time":9999,"createdAt":"2019-05-29T14:53:57.872Z","updatedAt":"2019-05-30T08:08:47.209Z","objectId":"5cee9d0530863b006861c98c"}]})

nock("https://i5daxohp.api.lncld.net:443")
  .log(console.log)
  .persist()
  .put("/1.1/classes/Counter/5cee9d0530863b006861c98c",{"time":{"__op":"Increment","amount":1},"title":""})
  .reply(200,{"updatedAt":"2019-06-05T06:03:34.901Z","objectId":"5cee9d0530863b006861c98c"})



describe('get counter', ()=>{
  let container=document.createElement("div")
  beforeAll(()=>{
    TestUtil.act(() => {
      ReactDOM.render(<Valine  appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
                               appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
                               requireEmail={true}
      >
        <div className="App">
            <span id="pageviewCounts">
             浏览量：<ValinePageview uniqStr={test_uniq_str}/>
          </span>
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


  it('pageview Counts fetch',()=>{
    expect(container.querySelector("#pageviewCounts").innerHTML).toBe("浏览量：<span>获取中</span>")
  })

  it('pageview Counts fetched',(done)=>{
    setTimeout(function(){
      expect(container.querySelector("#pageviewCounts").innerHTML).toBe("浏览量：<span>10000</span>")
      done()
    },2000)
  })

})
