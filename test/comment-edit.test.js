import React from 'react';
import {Valine,ValinePanel} from '../src/react-valine'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

const test_uniq_str="test-edit-comment"

const test_ownercode='test-ownercode'



const nock = require('nock')

nock('https://app-router.leancloud.cn')
  .persist()
  .get(`/2/route?appId=I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz`)
  .reply(200, {"ttl":3600,"stats_server":"i5daxohp.stats.lncld.net","rtm_router_server":"i5daxohp.rtm.lncld.net","push_server":"i5daxohp.push.lncld.net","play_server":"i5daxohp.play.lncld.net","engine_server":"i5daxohp.engine.lncld.net","api_server":"i5daxohp.api.lncld.net"})


/* fetch nestInit start */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get(`/1.1/classes/Comment?where=%7B%22uniqStr%22:%22${test_uniq_str}%22%7D&keys=nick,comment,link,pid,avatarSrc,rid,commentRaw,at&order=-createdAt&limit=10`)
  .reply(200, {"results":[{"nick":"45","updatedAt":"2020-03-17T15:01:11.377Z","ownerCode":test_ownercode,"objectId":"5e70e6342a6bfd007592b4c7","mail":"","ua":"Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/80.0.3987.132 Safari\/537.36","createdAt":"2020-03-17T15:01:08.444Z","uniqStr":"http:\/\/localhost:8080\/","commentRaw":"dsfdsf","pid":"","link":"","at":"","comment":"<p>dsfdsf<\/p>\n","url":"\/","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50","rid":"5e70e6342a6bfd007592b4c7"}]})

nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get(`/1.1/classes/Comment?where=%7B%22uniqStr%22:%22${test_uniq_str}%22%7D&count=1&limit=0`)
  .reply(200, {"results":[],"count":1})


/* fetch cur ownerCode comment */
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get(`/1.1/classes/Comment?where=%7B%22uniqStr%22:%22${test_uniq_str}%22,%22ownerCode%22:%22${test_ownercode}%22%7D`)
  .reply(200, {"results":[{"nick":"45","updatedAt":"2020-03-17T15:01:11.377Z","ownerCode":test_ownercode,"objectId":"5e70e6342a6bfd007592b4c7","mail":"","ua":"Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/80.0.3987.132 Safari\/537.36","createdAt":"2020-03-17T15:01:08.444Z","uniqStr":"http:\/\/localhost:8080\/","commentRaw":"dsfdsf","pid":"","link":"","at":"","comment":"<p>dsfdsf<\/p>\n","url":"\/","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50","rid":"5e70e6342a6bfd007592b4c7"}]})

// fetch User
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get(`/1.1/classes/_User?where=%7B%22username%22:%22${test_ownercode}%22%7D`)
  .reply(200, {"results":[{"updatedAt":"2020-03-17T15:01:10.301Z","createdAt":"2020-03-17T15:01:10.301Z","objectId":"5e70e6362a6bfd007592b4fa"}]})

// Login Success
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .post("/1.1/login")
  .reply(200, {"sessionToken":"gxa4l62r5q5257pblu7oybu1v","updatedAt":"2020-03-17T15:01:10.301Z","createdAt":"2020-03-17T15:01:10.301Z","objectId":"5e70e6362a6bfd007592b4fa"})

// fetch specific owner Comment
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get(`/1.1/classes/Comment?where=%7B%22objectId%22:%225e70e6342a6bfd007592b4c7%22,%22ownerCode%22:%22${test_ownercode}%22%7D`)
  .reply(200, {"results":[{"nick":"45","updatedAt":"2020-03-17T15:01:11.377Z","ownerCode":test_ownercode,"objectId":"5e70e6342a6bfd007592b4c7","mail":"","ua":"Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/80.0.3987.132 Safari\/537.36","createdAt":"2020-03-17T15:01:08.444Z","uniqStr":"http:\/\/localhost:8080\/","commentRaw":"dsfdsf","pid":"","link":"","at":"","comment":"<p>dsfdsf<\/p>\n","url":"\/","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50","rid":"5e70e6342a6bfd007592b4c7"}]})

// check update comment
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get(`/1.1/classes/Comment/5e70e6342a6bfd007592b4c7?fetchWhenSave=true`)
  .reply(200, {"nick":"45","updatedAt":"2020-03-18T08:27:27.434Z","ownerCode":test_ownercode,"objectId":"5e70e6342a6bfd007592b4c7","mail":"","ua":"Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/80.0.3987.132 Safari\/537.36","createdAt":"2020-03-17T15:01:08.444Z","uniqStr":"http:\/\/localhost:8080\/","commentRaw":"dsf","pid":"","link":"","at":"","comment":"<p>dsf<\/p>\n","url":"\/","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=identicon&size=50","rid":"5e70e6342a6bfd007592b4c7"})

// upload update comment
nock("https://i5daxohp.api.lncld.net")
  .persist()
  .put(`/1.1/classes/Comment/5e70e6342a6bfd007592b4c7?fetchWhenSave=true`)
  .reply(200, {"updatedAt":"2020-03-18T09:37:59.174Z","commentRaw":"aaaa","comment":"<p>aaaa<\/p>\n","ownerCode":test_ownercode,"objectId":"5e70e6342a6bfd007592b4c7"})

global.scrollTo=()=>{}

describe('Edit Comment', ()=> {
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
              editMode={true}
      >
        <div className="App">
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

  it('Show one List have edit tag',()=>{
    expect(app.find('.vloading-btn').length).toBe(0)
    expect(app.find('.vempty').length).toBe(0)
    expect(app.find('.vinfo').length).toBe(1)
    expect(app.find('.v-action-edit').length).toBe(1)
  })

  it('Click the edit tag, will show edit area',(done)=>{
    expect(app.find('.v-content-wrapper .v-edit-area textarea').length).toBe(0)
    app.find('.v-action-edit').simulate('click')
    expect(app.find('.v-content-wrapper .v-edit-area textarea').length).toBe(1)
    expect(app.find('.v-content-wrapper .v-edit-save').length).toBe(1)
    expect(app.find('.v-content-wrapper .v-edit-cancel').length).toBe(1)
    expect(app.find('.v-content-wrapper .v-edit-area textarea').prop('value')).toBe('dsfdsf')
    app.find('.v-content-wrapper .v-edit-area').simulate('change',{target:{value:'aaaaa'}})
    // click cancel
    app.find('.v-content-wrapper .v-edit-cancel').simulate('click')
    expect(app.find('.v-content-wrapper .v-edit-area textarea').length).toBe(0)
    expect(app.find('.v-content-wrapper .v-content-body').text().trim()).toBe('dsfdsf')
    // click edit
    app.find('.v-action-edit').simulate('click')
    app.find('.v-content-wrapper .v-edit-area textarea').simulate('change', {target: { value: 'aaaaa' } })
    app.find('.v-content-wrapper .v-edit-save').simulate('click')
    // console.log(app.find('.v-content-wrapper').html())
    expect(app.find('.vloading-btn').length).toBe(1)
    setTimeout(()=>{
      // after edit
      app.update()
      expect(app.find('.v-content-wrapper .v-edit-area textarea').length).toBe(0)
      expect(app.find('.v-content-wrapper .v-content-body').text().trim()).toBe('aaaa')
      done()
    },3000)
  })

})



