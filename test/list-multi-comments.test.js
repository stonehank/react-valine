import React from 'react';
import {Valine,ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'
import ReactDOM from 'react-dom';
import TestUtil from 'react-dom/test-utils';

const test_uniq_str="test-multi-list-comments"



const nock = require('nock')

nock('https://app-router.leancloud.cn')
  .persist()
  .get('/2/route?appId=I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz')
  .reply(200, {"ttl":3600,"stats_server":"i5daxohp.stats.lncld.net","rtm_router_server":"i5daxohp.rtm.lncld.net","push_server":"i5daxohp.push.lncld.net","play_server":"i5daxohp.play.lncld.net","engine_server":"i5daxohp.engine.lncld.net","api_server":"i5daxohp.api.lncld.net"})



/* fetch init start */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  // .log(console.log)
  .get("/1.1/classes/Comment?where=%7B%22uniqStr%22%3A%22test-multi-list-comments%22%7D&keys=nick%2Ccomment%2Clink%2Cpid%2CavatarSrc%2Crid&limit=10&order=-createdAt")
  .reply(200, {"results":[{"nick":"abac","updatedAt":"2019-05-31T06:50:31.910Z","objectId":"5cf0ceb7c8959c00691262e6","createdAt":"2019-05-31T06:50:31.910Z","pid":"5ceffaa2a673f5006844d224","link":"","comment":"<p><a class=\"at\" href=\"#5ceffaa2a673f5006844d224\">@abac<\/a>&nbsp;fffffff<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffaa2a673f5006844d224"},{"nick":"abac","updatedAt":"2019-05-31T06:50:14.750Z","objectId":"5cf0cea6ba39c80068b3fd20","createdAt":"2019-05-31T06:50:14.750Z","pid":"5ceffaba30863b00686fa429","link":"","comment":"<p><a class=\"at\" href=\"#5ceffaba30863b00686fa429\">@abac<\/a>&nbsp;dfasdf<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffaba30863b00686fa429"},{"nick":"abac","updatedAt":"2019-05-31T03:58:23.186Z","objectId":"5cf0a65ea673f5006848fe53","createdAt":"2019-05-31T03:58:22.395Z","pid":"","link":"","comment":"<p>1<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5cf0a65ea673f5006848fe53"},{"nick":"abac","updatedAt":"2019-05-30T16:02:11.933Z","objectId":"5ceffe83d5de2b0070a8ec0b","createdAt":"2019-05-30T16:02:11.933Z","pid":"5ceffab27b968a007694c684","link":"","comment":"<p><a class=\"at\" href=\"#5ceffab27b968a007694c684\">@abac<\/a>&nbsp;fsfasdf<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffab27b968a007694c684"},{"nick":"abac","updatedAt":"2019-05-30T15:46:55.615Z","objectId":"5ceffaefc8959c00690c77a2","createdAt":"2019-05-30T15:46:55.615Z","pid":"5ceffad97b968a007694c820","link":"","comment":"<p><a class=\"at\" href=\"#5ceffad97b968a007694c820\">@abac<\/a>&nbsp;8uk7y678<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffab7a673f5006844d2a0"},{"nick":"abac","updatedAt":"2019-05-30T15:46:33.215Z","objectId":"5ceffad97b968a007694c820","createdAt":"2019-05-30T15:46:33.215Z","pid":"5ceffad243e78c006743df46","link":"","comment":"<p><a class=\"at\" href=\"#5ceffad243e78c006743df46\">@abac<\/a>&nbsp;gfgdhfghfghfgh<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffab7a673f5006844d2a0"},{"nick":"abac","updatedAt":"2019-05-30T15:46:26.793Z","objectId":"5ceffad243e78c006743df46","createdAt":"2019-05-30T15:46:26.793Z","pid":"5ceffab7a673f5006844d2a0","link":"","comment":"<p><a class=\"at\" href=\"#5ceffab7a673f5006844d2a0\">@abac<\/a>&nbsp;asdfasdfsf<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffab7a673f5006844d2a0"},{"nick":"abac","updatedAt":"2019-05-30T15:46:19.968Z","objectId":"5ceffacbc8959c00690c76a8","createdAt":"2019-05-30T15:46:19.968Z","pid":"5ceffabfa673f5006844d2f4","link":"","comment":"<p><a class=\"at\" href=\"#5ceffabfa673f5006844d2f4\">@abac<\/a>&nbsp;hhhhhhh<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffaa030863b00686fa39b"},{"nick":"abac","updatedAt":"2019-05-30T15:46:12.607Z","objectId":"5ceffac4c8959c00690c764c","createdAt":"2019-05-30T15:46:12.607Z","pid":"5ceffaa030863b00686fa39b","link":"","comment":"<p><a class=\"at\" href=\"#5ceffaa030863b00686fa39b\">@abac<\/a>&nbsp;sdfasdf<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffaa030863b00686fa39b"},{"nick":"abac","updatedAt":"2019-05-30T15:46:07.038Z","objectId":"5ceffabfa673f5006844d2f4","createdAt":"2019-05-30T15:46:07.038Z","pid":"5ceffaa030863b00686fa39b","link":"","comment":"<p><a class=\"at\" href=\"#5ceffaa030863b00686fa39b\">@abac<\/a>&nbsp;wew<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffaa030863b00686fa39b"}]})

/* fetch init end */




/* fetch more start*/

nock('https://i5daxohp.api.lncld.net:443')
  .persist()
  // .log(console.log)
  .get("/1.1/classes/Comment?where=%7B%22uniqStr%22%3A%22test-multi-list-comments%22%7D&keys=nick%2Ccomment%2Clink%2Cpid%2CavatarSrc%2Crid&limit=10&skip=10&order=-createdAt")
  .reply(200, {"results":[{"nick":"abac","updatedAt":"2019-05-30T15:46:02.871Z","objectId":"5ceffaba30863b00686fa429","createdAt":"2019-05-30T15:46:02.153Z","pid":"","link":"","comment":"<p>345<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffaba30863b00686fa429"},{"nick":"abac","updatedAt":"2019-05-30T15:46:00.611Z","objectId":"5ceffab7a673f5006844d2a0","createdAt":"2019-05-30T15:45:59.883Z","pid":"","link":"","comment":"<p>10<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffab7a673f5006844d2a0"},{"nick":"abac","updatedAt":"2019-05-30T15:45:57.393Z","objectId":"5ceffab443e78c006743dde3","createdAt":"2019-05-30T15:45:56.680Z","pid":"","link":"","comment":"<p>9<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffab443e78c006743dde3"},{"nick":"abac","updatedAt":"2019-05-30T15:45:53.321Z","objectId":"5ceffab0d5de2b0070a8c784","createdAt":"2019-05-30T15:45:52.600Z","pid":"","link":"","comment":"<p>7<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffab0d5de2b0070a8c784"},{"nick":"abac","updatedAt":"2019-05-30T15:45:51.030Z","objectId":"5ceffaaec8959c00690c7561","createdAt":"2019-05-30T15:45:50.304Z","pid":"","link":"","comment":"<p>6<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffaaec8959c00690c7561"},{"nick":"abac","updatedAt":"2019-05-30T15:45:48.611Z","objectId":"5ceffaabc8959c00690c754f","createdAt":"2019-05-30T15:45:47.902Z","pid":"","link":"","comment":"<p>5<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffaabc8959c00690c754f"},{"nick":"abac","updatedAt":"2019-05-30T15:45:46.321Z","objectId":"5ceffaa9ba39c80068ae13cf","createdAt":"2019-05-30T15:45:45.115Z","pid":"","link":"","comment":"<p>4<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffaa9ba39c80068ae13cf"},{"nick":"abac","updatedAt":"2019-05-30T15:45:42.920Z","objectId":"5ceffaa6a673f5006844d237","createdAt":"2019-05-30T15:45:42.161Z","pid":"","link":"","comment":"<p>3<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffaa6a673f5006844d237"},{"nick":"abac","updatedAt":"2019-05-30T15:45:39.501Z","objectId":"5ceffaa2a673f5006844d224","createdAt":"2019-05-30T15:45:38.791Z","pid":"","link":"","comment":"<p>2<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffaa2a673f5006844d224"},{"nick":"abac","updatedAt":"2019-05-30T15:45:36.799Z","objectId":"5ceffaa030863b00686fa39b","createdAt":"2019-05-30T15:45:36.091Z","pid":"","link":"","comment":"<p>1<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5ceffaa030863b00686fa39b"}]})

/* fetch more end*/




/* fetch last start*/
nock('https://i5daxohp.api.lncld.net')
  .persist()
  // .log(console.log)
  .get("/1.1/classes/Comment?where=%7B%22uniqStr%22%3A%22test-multi-list-comments%22%7D&keys=nick%2Ccomment%2Clink%2Cpid%2CavatarSrc%2Crid&limit=10&skip=20&order=-createdAt")
  .reply(200, {"results":[{"nick":"abac","updatedAt":"2019-05-30T14:53:57.863Z","objectId":"5cefee85ba39c80068ad7da9","createdAt":"2019-05-30T14:53:57.008Z","pid":"","link":"","comment":"<p>axx<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/913f3090981bd3f98736c89bd07258fb\/?size=50","rid":"5cefee85ba39c80068ad7da9"},{"nick":"fsf","updatedAt":"2019-05-29T13:33:34.148Z","objectId":"5cee8a2e7b968a0076860644","createdAt":"2019-05-29T13:33:34.148Z","pid":"5cee8a2bd5de2b007099e2f1","link":"","comment":"<p><a class=\"at\" href=\"#5cee8a2bd5de2b007099e2f1\">@fsf<\/a>&nbsp;vvvvvvvvvvvvv<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=robohash&size=50","rid":"5cee8a1d43e78c006734fc8e"},{"nick":"fsf","updatedAt":"2019-05-29T13:33:31.043Z","objectId":"5cee8a2bd5de2b007099e2f1","createdAt":"2019-05-29T13:33:31.043Z","pid":"5cee8a22ba39c800689f3c5e","link":"","comment":"<p><a class=\"at\" href=\"#5cee8a22ba39c800689f3c5e\">@fsf<\/a>&nbsp;sdfasfff<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=robohash&size=50","rid":"5cee8a1d43e78c006734fc8e"},{"nick":"fsf","updatedAt":"2019-05-29T13:33:22.262Z","objectId":"5cee8a22ba39c800689f3c5e","createdAt":"2019-05-29T13:33:22.262Z","pid":"5cee8a1d43e78c006734fc8e","link":"","comment":"<p><a class=\"at\" href=\"#5cee8a1d43e78c006734fc8e\">@fsf<\/a>&nbsp;asdfasfsadf<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=robohash&size=50","rid":"5cee8a1d43e78c006734fc8e"},{"nick":"fsf","updatedAt":"2019-05-29T13:33:18.710Z","objectId":"5cee8a1d43e78c006734fc8e","createdAt":"2019-05-29T13:33:17.983Z","pid":"","link":"","comment":"<p>sdfsadf<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=robohash&size=50","rid":"5cee8a1d43e78c006734fc8e"}]})

/* fetch last end*/



/* fetch count */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22%3A%22test-multi-list-comments%22%7D&limit=0&count=1')
  .reply(200, {"results":[],"count":25})


/* fetch pageview */
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get("/1.1/classes/Counter?where=%7B%22uniqStr%22%3A%22test-multi-list-comments%22%7D")
  .reply(200, {"results":[{"uniqStr":"test-multi-list-comments","title":"\u6d4b\u8bd5\u9875\u9762localhost","time":9999,"createdAt":"2019-05-29T14:53:57.872Z","updatedAt":"2019-05-30T08:08:47.209Z","objectId":"5cee9d0530863b006861c98c"}]})


describe('test list with multi comments', ()=>{
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
      expect(page.length).toBe(1)
      expect(vinputs.childNodes.length).toBe(3)
      expect(textAreaEle).not.toBe(null)
      expect(vemojiBtn).not.toBe(null)
      expect(vpreviewBtn).not.toBe(null)
      expect(submitBtn).not.toBe(null)
      expect(avatarBtn).not.toBe(null)
      done()
    },2000)
  });
  it('comment Counts has 25',()=>{
    expect(container.querySelector("#commentCounts").innerHTML).toBe("评论数：<span>25</span>")
  })
  it('pageview Counts has 9999',()=>{
    expect(container.querySelector("#pageviewCounts").innerHTML).toBe("浏览量：<span>9999</span>")
  })
  it('list has 10 child',()=>{
    expect(list[0].childNodes.length).toBe(10)
    let vcard=list[0].childNodes[0]
    expect(vcard.className).toBe('vcard')
    expect(vcard.id).toBe('5cf0ceb7c8959c00691262e6')
  })
  it('show last',()=>{
    expect(page[0].innerHTML).toBe(`<button class="vdiscuss vbtn">参与讨论</button><button class="vmore vbtn">加载更多评论</button>`)
  })

  it('fetch more',(done)=>{
    let fetchMoreBtn=page[0].getElementsByClassName("vmore vbtn")[0]
    TestUtil.Simulate.click(fetchMoreBtn)
    setTimeout(()=>{
      expect(list[0].childNodes.length).toBe(20)
      expect(page[0].childNodes[1].innerHTML).toBe(`加载更多评论`)
      TestUtil.Simulate.click(fetchMoreBtn)
      setTimeout(()=>{
        expect(page[0].childNodes[1].innerHTML).toBe(`已经到最后啦`)
        expect(errlog.length).toBe(0)
        done()
      },1000)
    },1000)
  })


  it("there is no reply button",()=>{
    let checkReplyBtn=container.getElementsByClassName("showchild-button-on"),
      offReplyBtn=container.getElementsByClassName("showchild-button-off"),
      replyChild=container.getElementsByClassName("vquote")
    expect(checkReplyBtn.length).toBe(0)
    expect(replyChild.length).toBe(0)
    expect(offReplyBtn.length).toBe(0)
  })
})




