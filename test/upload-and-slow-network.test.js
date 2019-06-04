import React from 'react';
import {Valine,ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'
import ReactDOM from 'react-dom';
import TestUtil from 'react-dom/test-utils';

const test_uniq_str="test-1-reply"


global.AV=require("leancloud-storage")

const nock = require('nock')

nock('https://app-router.leancloud.cn')
  .persist()
  .get('/2/route?appId=I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz')
  .delay(800)
  .reply(200, {"ttl":3600,"stats_server":"i5daxohp.stats.lncld.net","rtm_router_server":"i5daxohp.rtm.lncld.net","push_server":"i5daxohp.push.lncld.net","play_server":"i5daxohp.play.lncld.net","engine_server":"i5daxohp.engine.lncld.net","api_server":"i5daxohp.api.lncld.net"})

/* fetch list--start */
nock('https://i5daxohp.api.lncld.net:443')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22%3A%22test-1-reply%22%2C%22pid%22%3A%22%22%7D&keys=nick%2Ccomment%2Clink%2Cpid%2CavatarSrc%2Crid&limit=10&order=-createdAt')
  .delay(800)
  .reply(200, {"results":[{"nick":"fsf","updatedAt":"2019-05-29T13:33:18.710Z","objectId":"5cee8a1d43e78c006734fc8e","createdAt":"2019-05-29T13:33:17.983Z","pid":"","link":"","comment":"<p>sdfsadf<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=robohash&size=50","rid":"5cee8a1d43e78c006734fc8e"}]})

nock('https://i5daxohp.api.lncld.net:443')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22%3A%22test-1-reply%22%2C%22pid%22%3A%7B%22%24ne%22%3A%22%22%7D%2C%22rid%22%3A%7B%22%24in%22%3A%5B%225cee8a1d43e78c006734fc8e%22%5D%7D%7D&keys=nick%2Ccomment%2Clink%2Cpid%2CavatarSrc%2Crid&order=createdAt')
  .delay(800)
  .reply(200, {"results":[]})
/* fetch list--end */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22%3A%22test-1-reply%22%7D&limit=0&count=1')
  .delay(800)
  .reply(200, {"results":[],"count":1})

nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get("/1.1/classes/Counter?where=%7B%22uniqStr%22%3A%22test-1-reply%22%7D")
  .delay(800)
  .reply(200, {"results":[{"uniqStr":"test-1-reply","title":"\u6d4b\u8bd5\u9875\u9762localhost","time":9999,"createdAt":"2019-05-29T14:53:57.872Z","updatedAt":"2019-05-30T08:08:47.209Z","objectId":"5cee9d0530863b006861c98c"}]})

// 处理提交评论1-1
nock("https://i5daxohp.api.lncld.net")
  // .log(console.log)
  .persist()
  .post("/1.1/classes/Comment", {"rid":"","pid":"","mail":"","avatarSrc":"https://gravatar.loli.net/avatar/?d=mp&size=50","link":"","comment":"<p>something...</p>\n","nick":"my-nick-name","uniqStr":"test-1-reply","ua":"Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0","url":"/"})
  .delay(800)
  .reply(200, {"objectId":"5cf63560d5de2b0070e51466","createdAt":"2019-06-04T09:09:52.806Z"})

// 处理提交评论1-2
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .put("/1.1/classes/Comment/5cf63560d5de2b0070e51466", {"rid":"5cf63560d5de2b0070e51466","ACL":{"*":{"read":true}}})
  .delay(800)
  .reply(200, {"updatedAt":"2019-06-04T10:42:41.358Z","objectId":"5cf64b207b968a0076d21d8b"})

// 处理提交长评论2-1
nock("https://i5daxohp.api.lncld.net")
  // .log(console.log)
  .persist()
  .post("/1.1/classes/Comment", {"rid":"","pid":"","mail":"","avatarSrc":"https://gravatar.loli.net/avatar/?d=mp&size=50","link":"","comment":"<p>This is some long text...\nThis is some long text...\nThis is some long text...\nThis is some long text...\nThis is some long text...\nThis is some long text...</p>\n","nick":"my-nick-name","uniqStr":"test-1-reply","ua":"Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0","url":"/"})
  .delay(800)
  .reply(200, {"objectId":"5cf63560d5de2b0070e51467","createdAt":"2019-06-04T09:09:52.806Z"})

// 处理提交长评论2-2
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .put("/1.1/classes/Comment/5cf63560d5de2b0070e51467", {"rid":"5cf63560d5de2b0070e51467","ACL":{"*":{"read":true}}})
  .delay(800)
  .reply(200, {"updatedAt":"2019-06-04T10:42:41.358Z","objectId":"5cf64b207b968a0076d21d8c"})


describe('test App with slow-network', ()=>{
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
    avatarBtn,
    vloading

  beforeAll(()=>{
    TestUtil.act(() => {
      ReactDOM.render(<Valine  appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
                               appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
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
    vloading=container.getElementsByClassName("vloading")
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
  it('评论数显示正在获取',()=>{
    expect(container.querySelector("#commentCounts").innerHTML).toBe("评论数：<span>获取中</span>")
  })
  it('浏览量显示正在获取',()=>{
    expect(container.querySelector("#pageviewCounts").innerHTML).toBe("浏览量：<span>获取中</span>")
  })

  it('慢网速状态显示loading',()=>{
    expect(vloading.length).toBe(1)
  })

  it('间隔一段时间后，读取资源成功',(done)=>{
    setTimeout(()=>{
      expect(container.querySelector("#commentCounts").innerHTML).toBe("评论数：<span>1</span>")
      expect(container.querySelector("#pageviewCounts").innerHTML).toBe("浏览量：<span>9999</span>")
      expect(vloading.length).toBe(0)
      expect(list.length).toBe(1)
      let listChild=list[0].childNodes
      expect(listChild.length).toBe(1)
      let contentNodes=list[0].getElementsByClassName("vcontent")
      expect(contentNodes[0].innerHTML).toBe("<div><p>sdfsadf</p>\n</div>")
      done()
    },3000)
  })


  it('测试提交按钮的disabled，头像切换和点击提交',(done)=>{
    let nickEle=vinputs.childNodes[0],
      avatarList=container.getElementsByClassName("vavatars-select-list")
    textAreaEle.value='something...'
    nickEle.value="my-nick-name"
    TestUtil.Simulate.change(textAreaEle)
    TestUtil.Simulate.change(nickEle)
    expect(avatarList.length).toBe(0)
    TestUtil.Simulate.click(avatarBtn)
    expect(avatarList.length).toBe(1)
    let img=document.createElement("img")
    img.src="https://gravatar.loli.net/avatar/?d=mp&size=50"
    avatarList[0].childNodes[1].appendChild(img)
    TestUtil.Simulate.click(avatarList[0].childNodes[1].childNodes[0])
    setTimeout(()=>{
      expect(list.length).toBe(1)
      expect(avatarList.length).toBe(0)
      TestUtil.Simulate.click(submitBtn)
      expect(submitBtn.getAttribute("disabled")).not.toBe(null)
      expect(vloading.length).toBe(1)
      setTimeout(()=>{
        expect(container.querySelector("#commentCounts").innerHTML).toBe("评论数：<span>2</span>")
        expect(container.querySelector("#pageviewCounts").innerHTML).toBe("浏览量：<span>9999</span>")
        expect(submitBtn.getAttribute("disabled")).toBe(null)
        expect(list.length).toBe(1)
        let listChild=list[0].childNodes
        expect(listChild.length).toBe(2)
        let contentNodes=list[0].getElementsByClassName("vcontent")
        expect(contentNodes[0].innerHTML).toBe("<div><p>something...</p>\n</div>")
        expect(contentNodes[1].innerHTML).toBe("<div><p>sdfsadf</p>\n</div>")
        done()
      },3000)
    },100)
  })

  it('评论过长会折叠',(done)=>{
    let nickEle=vinputs.childNodes[0]
    textAreaEle.value='This is some long text...\nThis is some long text...\nThis is some long text...\nThis is some long text...\nThis is some long text...\nThis is some long text...'
    nickEle.value="my-nick-name"
    TestUtil.Simulate.change(textAreaEle)
    TestUtil.Simulate.change(nickEle)
    expect(list.length).toBe(1)
    TestUtil.Simulate.click(submitBtn)
    expect(submitBtn.getAttribute("disabled")).not.toBe(null)
    expect(vloading.length).toBe(1)
    setTimeout(()=>{
      expect(vloading.length).toBe(0)
      expect(container.querySelector("#commentCounts").innerHTML).toBe("评论数：<span>3</span>")
      expect(container.querySelector("#pageviewCounts").innerHTML).toBe("浏览量：<span>9999</span>")
      expect(submitBtn.getAttribute("disabled")).toBe(null)
      // expect(list.length).toBe(1)
      let listChild=list[0].childNodes
      expect(listChild.length).toBe(3)
      let contentNodes=list[0].getElementsByClassName("vcontent")
      expect(contentNodes[0].innerHTML).toBe("<div><p>This is some long text...\n" +
        "This is some long text...\n" +
        "This is some long text...\n" +
        "This is some long text...\n" +
        "This is some long text...\n" +
        "This is some long text...</p>\n" +
        "</div>")
      expect(contentNodes[1].innerHTML).toBe("<div><p>something...</p>\n</div>")
      expect(contentNodes[2].innerHTML).toBe("<div><p>sdfsadf</p>\n</div>")
      expect(contentNodes[2].innerHTML).toBe("<div><p>sdfsadf</p>\n</div>")
      // expect(container.getElementsByClassName("vcontent expand").length).toBe(1)
      done()
    },3000)
  })
})


