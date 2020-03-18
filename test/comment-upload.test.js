import React from 'react';
import {Valine,ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

const test_uniq_str="test-upload-comment"


const nock = require('nock')

nock('https://app-router.leancloud.cn')
  .persist()
  .get('/2/route?appId=I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz')
  .reply(200, {"ttl":3600,"stats_server":"i5daxohp.stats.lncld.net","rtm_router_server":"i5daxohp.rtm.lncld.net","push_server":"i5daxohp.push.lncld.net","play_server":"i5daxohp.play.lncld.net","engine_server":"i5daxohp.engine.lncld.net","api_server":"i5daxohp.api.lncld.net"})


/* fetch nestInit start */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-upload-comment%22%7D&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at&order=-createdAt&limit=10')
  .reply(200, {"results":[]})

nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22:%22test-upload-comment%22%7D&count=1&limit=0')
  .reply(200, {"results":[],"count":0})


/* fetch pageview */
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get("/1.1/classes/Counter?where=%7B%22uniqStr%22:%22test-upload-comment%22%7D")
  .reply(200, {"results":[{"uniqStr":"test-upload-comment","title":"\u6d4b\u8bd5\u9875\u9762localhost","time":9999,"createdAt":"2019-05-29T14:53:57.872Z","updatedAt":"2019-05-30T08:08:47.209Z","objectId":"5cee9d0530863b006861c98c"}]})

// create comment
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .post("/1.1/classes/Comment?fetchWhenSave=true")
  .reply(200, {"nick":"45","updatedAt":"2020-03-17T15:01:08.444Z","objectId":"5e70e6342a6bfd007592b4c7","mail":"","ua":"Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/80.0.3987.132 Safari\/537.36","createdAt":"2020-03-17T15:01:08.444Z","uniqStr":"http:\/\/localhost:8080\/","commentRaw":"dsfdsf","pid":"","link":"","at":"","comment":"<p>dsfdsf<\/p>\n","url":"\/","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50","rid":""})

// create user
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .post("/1.1/classes/_User?fetchWhenSave=true")
  .reply(200, {"sessionToken":"","updatedAt":"2020-03-17T15:01:10.301Z","objectId":"5e70e6362a6bfd007592b4fa","username":"","createdAt":"2020-03-17T15:01:10.301Z","emailVerified":false,"mobilePhoneVerified":false})

// save ACL
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .put("/1.1/classes/Comment/5e70e6342a6bfd007592b4c7?fetchWhenSave=true")
  .reply(200, {"nick":"45","updatedAt":"2020-03-17T15:01:11.377Z","ownerCode":"6QVymNkyFiKcZ0srIwIES4QedH6R0rzm","_r":["*"],"objectId":"5e70e6342a6bfd007592b4c7","mail":"","ua":"Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/80.0.3987.132 Safari\/537.36","uniqStr":"http:\/\/localhost:8080\/","commentRaw":"dsfdsf","pid":"","_w":["5e70e6362a6bfd007592b4fa"],"link":"","at":"","comment":"<p>dsfdsf<\/p>\n","url":"\/","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50","rid":"5e70e6342a6bfd007592b4c7"})

global.scrollTo=()=>{}

describe('Upload Comment', ()=> {
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

  it('List has no child',()=>{
    expect(app.find('.vempty').length).toBe(1)
    expect(app.find('.vempty').text()).toBe('快来做第一个评论的人吧~')
  })

  it('Upload a comment',(done)=>{
    expect(app.find('.vloading-btn').length).toBe(0)
    expect(app.find('.vinputs-ident input').length).toBe(3)
    app.find('.vinputs-ident input').at(0).simulate('change', {name:'username', target: { value: 'name' } })
    app.find('.vinputs-ident input').at(1).simulate('change',{name:'email', target: { value: 'email@test.com' } })
    app.find('.v-editor-main textarea').simulate('change',{name:'comment', target: { value: 'comment' } })
    app.find('.vsubmit-ident').simulate('click')
    expect(app.find('.vloading-btn').length).toBe(1)
    setTimeout(()=>{
      app.update()
      expect(app.find('.vloading-btn').length).toBe(0)
      expect(app.find('.vempty').length).toBe(0)
      expect(app.find('.vinfo').length).toBe(1)
      expect(app.find('.vcount').text()).toBe('总共1条评论')
      expect(app.find(".vcard").length).toBe(1)
      expect(app.find('.vcard').prop('id')).toBe('5e70e6342a6bfd007592b4c7')
      done()
    },3000)
  })
})



