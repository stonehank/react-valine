import React from 'react';
import {Valine,ValinePanel} from '../src/react-valine'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
const {serverURLs}=require('./config')
Enzyme.configure({ adapter: new Adapter() });

import test_uniq_str from './nock/nock-UNIQUESTR'

import './nock/nock-initial'
import './nock/nock-comment-nest-1'
import './nock/nock-count-1'
import './nock/nock-comment-owner-2-nest'
import './nock/nock-user-get'
import './nock/nock-login-success'
import './nock/nock-comments-owner-validate-before-update'
import './nock/nock-comment-validate-before-update'
import './nock/nock-update-comment-nest'

global.scrollTo=()=>{}

describe('Edit Comment', ()=> {
  let app
  beforeAll((done) => {
    app = Enzyme.mount(
      <Valine appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
              appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
              requireEmail={true}
              nest={true}
              serverURLs={serverURLs}
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


  it('Click the nest edit tag, will show edit area',(done)=>{
    app.find('.showchild-button-on').simulate('click')
    expect(app.find('.vquote').length).toBe(1)
    expect(app.find('.vquote .v-content-body').text().trim()).toBe('@45 nest')
    // app.find('.v-content-body .at').simulate('click')
    expect(app.find('.vquote.v-edit-area textarea').length).toBe(0)
    app.find('.vquote .v-action-edit').simulate('click')
    expect(app.find('.vquote .v-edit-area textarea').length).toBe(1)
    expect(app.find('.vquote .v-edit-save').length).toBe(1)
    expect(app.find('.vquote .v-edit-cancel').length).toBe(1)
    expect(app.find('.vquote .v-edit-area textarea').prop('value')).toBe('nest')
    app.find('.vquote .v-edit-area').simulate('change',{target:{value:'aaaa'}})
    // click cancel
    app.find('.vquote .v-edit-cancel').simulate('click')
    expect(app.find('.vquote .v-edit-area textarea').length).toBe(0)
    expect(app.find('.vquote .v-content-body').text().trim()).toBe('@45 nest')
    // click edit
    app.find('.vquote .v-action-edit').simulate('click')
    app.find('.vquote .v-edit-area textarea').simulate('change', {target: { value: 'aaaa' } })
    app.find('.vquote .v-edit-save').simulate('click')
    expect(app.find('.vloading-btn').length).toBe(1)
    setTimeout(()=>{
      // after edit
      app.update()
      expect(app.find('.vquote .v-edit-area textarea').length).toBe(0)
      expect(app.find('.vquote .v-content-body').text().trim()).toBe('@45 aaaa')
      done()
    },3000)
  })

})



