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
  it('comment Counts fetching text',()=>{
    expect(container.querySelector("#commentCounts").innerHTML).toBe("评论数：<span>正在获取评论数</span>")
  })
  it('pageview Counts fetching text',()=>{
    expect(container.querySelector("#pageviewCounts").innerHTML).toBe("浏览量：<span>正在获取浏览量</span>")
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
  it('list has no child',()=>{
    expect(list[0].childNodes.length).toBe(1)
    let sofaDiv=list[0].childNodes[0]
    expect(sofaDiv.innerHTML).toBe("沙发！沙发！沙发！")
  })

  it('require email text',()=>{
    let nickEle=vinputs.childNodes[0],mailEle=vinputs.childNodes[1]
    expect(nickEle.getAttribute('placeholder')).toBe("你的大名(别漏哦)")
    expect(mailEle.getAttribute('placeholder')).toBe("邮箱(别漏哦)")
    textAreaEle.value='something...'
    TestUtil.Simulate.change(textAreaEle)
    nickEle.value="my-nick-name"
    TestUtil.Simulate.change(nickEle)
    TestUtil.Simulate.click(submitBtn)
    expect(errlog[0].innerHTML).toBe("email别漏！")

  })

  it("preview button text",()=>{
    expect(vpreviewBtn.innerHTML).toBe("预览ing...")
  })




})

