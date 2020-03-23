import React from 'react';
import {Valine,ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

import test_uniq_str from './nock/nock-UNIQUESTR'

import './nock/nock-initial'
import './nock/nock-comment-nest-more'
import './nock/nock-count-25'
import './nock/nock-pageview-9999'





global.scrollTo=()=>{}

describe('Test Multiple Comments', ()=> {
  let app
  beforeAll((done) => {
    app = Enzyme.mount(
      <Valine appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
              appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
              requireEmail={true}
              nest={true}
              pageSize={1}
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

  it('Comment List should has 1 child',()=>{
    expect(app.find('.vcard').length).toBe(1)
    expect(app.find('.showchild-button-on').length).toBe(1)
    expect(app.find('.vquote').length).toBe(0)
    app.find('.showchild-button-on').simulate('click')
    expect(app.find('.vquote').length).toBe(1)
    expect(app.find('.vquote .v-content-body').text().trim()).toBe('@45 nest')
    // console.log(app.find('.vquote .v-content-body').html())
    expect(app.find('.vquote .v-content-body').html().includes('class="at"')).toBe(true)
    app.find('.vquote .v-action-reply').simulate('click')
    expect(app.find('.v-editor-main textarea').prop('value')).toBe('@xxxx ')
    app.find('.showchild-button-off').simulate('click')
    expect(app.find('.vcard').length).toBe(1)
    expect(app.find('.showchild-button-on').length).toBe(1)
    expect(app.find('.vquote').length).toBe(0)
  })

  it('Comment List has more comment',()=>{
    expect(app.find('.v-content-footer').text().trim()).toBe('参与讨论加载更多评论')
    app.find('.vmore').simulate('click')
    expect(app.find('.vloading').length).toBe(1)
    setTimeout(()=>{
      app.update()
      expect(app.find('.vloading').length).toBe(0)
      expect(app.find('.v-content-footer').text().trim()).toBe('参与讨论已经到最后啦')
      done()
    },2000)
  })



})




