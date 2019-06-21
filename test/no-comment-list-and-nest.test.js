import React from 'react';
import {Valine,ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'
import ReactDOM from 'react-dom';
import TestUtil from 'react-dom/test-utils';

const test_uniq_str="test-no-reply"



const nock = require('nock')

nock('https://app-router.leancloud.cn')
  .persist()
  .get('/2/route?appId=I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz')
  .reply(200, {"ttl":3600,"stats_server":"i5daxohp.stats.lncld.net","rtm_router_server":"i5daxohp.rtm.lncld.net","push_server":"i5daxohp.push.lncld.net","play_server":"i5daxohp.play.lncld.net","engine_server":"i5daxohp.engine.lncld.net","api_server":"i5daxohp.api.lncld.net"})

/* fetch list--start */
nock('https://i5daxohp.api.lncld.net:443')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22%3A%22test-no-reply%22%2C%22pid%22%3A%22%22%7D&keys=nick%2Ccomment%2Clink%2Cpid%2CavatarSrc%2Crid&limit=10&order=-createdAt')
  .reply(200, {"results":[]})

/* fetch list--end */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22%3A%22test-no-reply%22%7D&limit=0&count=1')
  .reply(200, {"results":[],"count":0})

nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get("/1.1/classes/Counter?where=%7B%22uniqStr%22%3A%22test-no-reply%22%7D")
  .reply(200, {"results":[{"uniqStr":"test-no-reply","title":"\u6d4b\u8bd5\u9875\u9762localhost","time":9999,"createdAt":"2019-05-29T14:53:57.872Z","updatedAt":"2019-05-30T08:08:47.209Z","objectId":"5cee9d0530863b006861c98c"}]})



describe('test nest with no comments', ()=>{
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

  it('can render elements', (done) => {
    setTimeout(()=>{
      expect(app.length).toBe(1)
      expect(wrap.length).toBe(1)
      expect(list.length).toBe(1)
      expect(page.length).toBe(0)
      expect(vinputs.childNodes.length).toBe(3)
      expect(textAreaEle).not.toBe(null)
      expect(vemojiBtn).not.toBe(null)
      expect(vpreviewBtn).not.toBe(null)
      expect(submitBtn).not.toBe(null)
      expect(avatarBtn).not.toBe(null)
      done()
    },2000)
  });

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

  it('comment Counts has 0',()=>{
    expect(container.querySelector("#commentCounts").innerHTML).toBe("评论数：<span>0</span>")
  })
  it('pageview Counts has 9999',()=>{
    expect(container.querySelector("#pageviewCounts").innerHTML).toBe("浏览量：<span>9999</span>")
  })
  it('list has no child',()=>{
    expect(list[0].childNodes.length).toBe(1)
    let sofaDiv=list[0].childNodes[0]
    expect(sofaDiv.innerHTML).toBe("快来做第一个评论的人吧~")
  })

})



describe('test list with no comments', ()=>{
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

  it('can render elements', (done) => {
    setTimeout(()=>{
      expect(app.length).toBe(1)
      expect(wrap.length).toBe(1)
      expect(list.length).toBe(1)
      expect(page.length).toBe(0)
      expect(vinputs.childNodes.length).toBe(3)
      expect(textAreaEle).not.toBe(null)
      expect(vemojiBtn).not.toBe(null)
      expect(vpreviewBtn).not.toBe(null)
      expect(submitBtn).not.toBe(null)
      expect(avatarBtn).not.toBe(null)
      done()
    },2000)
  });
  it('comment Counts has 0',()=>{
    expect(container.querySelector("#commentCounts").innerHTML).toBe("评论数：<span>0</span>")
  })
  it('pageview Counts has 9999',()=>{
    expect(container.querySelector("#pageviewCounts").innerHTML).toBe("浏览量：<span>9999</span>")
  })
  it('list has no child',()=>{
    expect(list[0].childNodes.length).toBe(1)
    let sofaDiv=list[0].childNodes[0]
    expect(sofaDiv.innerHTML).toBe("快来做第一个评论的人吧~")
  })

})