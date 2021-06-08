import React from 'react';
import {Valine,ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
const {serverURLs}=require('./config')
Enzyme.configure({ adapter: new Adapter() });

import test_uniq_str from './nock/nock-UNIQUESTR'

import './nock/nock-initial'
import './nock/nock-comment-nest-more'
import './nock/nock-count-25'
import './nock/nock-pageview-9999'
import './nock/nock-comment-nest-create'





global.scrollTo=()=>{}

describe('Test Reply Nest Comment', ()=> {
  let app
  beforeAll((done) => {
    app = Enzyme.mount(
      <Valine appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
              appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
              requireEmail={true}
              nest={true}
              pageSize={1}
              serverURLs={serverURLs}
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


  it('Reply a nest',(done)=>{
    app.find('.showchild-button-on').simulate('click')
    expect(app.find('.vquote .v-action-reply').length).toBe(1)
    app.find('.vquote .v-action-reply').simulate('click')
    expect(app.find('.v-editor-main textarea').prop('value')).toBe('@xxxx ')
    app.find('.v-editor-main textarea').simulate('change',{name:'comment', target: { value: '@xxxx some reply nest' } })
    app.find('.vinputs-ident input').at(0).simulate('change', {name:'username', target: { value: 'username-test' } })
    app.find('.vinputs-ident input').at(1).simulate('change',{name:'email', target: { value: 'valid@email.com' } })
    app.find('.vsubmit-ident').simulate('click')
    expect(app.find('.error-msg').length).toBe(0)
    setTimeout(()=>{
      app.update()
      expect(app.find('.vquote').length).toBe(2)
      expect(app.find('.vquote .v-content-body').length).toBe(2)
      expect(app.find('.vquote .v-content-body').at(1).text().trim()).toBe('@xxxx some reply nest')
      done()
    },3000)
  })

})




