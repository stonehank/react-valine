import React from 'react';
import {Valine,ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });


import test_uniq_str from './nock/nock-UNIQUESTR'

import './nock/nock-initial'
import './nock/nock-comment-none'
import './nock/nock-comment-owner-0'
import './nock/nock-count-0'
import './nock/nock-pageview-9999'
import './nock/nock-create-comment'
import './nock/nock-user-create'
import './nock/nock-save-comment-acl'


global.scrollTo=()=>{}

describe('Upload Comment', ()=> {
  let app
  beforeAll((done) => {
    app = Enzyme.mount(
      <Valine appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
              appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
              requireEmail={true}
              nest={false}
              editMode={true}
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
      expect(app.find('.vcard').prop('id')).toBe('5cee8a1d43e78c006734fc8e')
      done()
    },3000)
  })
})



