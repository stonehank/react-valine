import React from 'react';
import {Valine,ValinePanel} from '../src/react-valine'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import test_uniq_str from './nock/nock-UNIQUESTR'

import './nock/nock-initial'
import './nock/nock-comment-one'
import './nock/nock-count-1'
import './nock/nock-comment-owner-1'
import './nock/nock-user-get'
import './nock/nock-login-success'
import './nock/nock-comments-owner-validate-before-update'
import './nock/nock-comment-validate-before-update'
import './nock/nock-comment-update'

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
    expect(app.find('.v-content-wrapper .v-edit-area textarea').prop('value')).toBe('sdfsadf')
    app.find('.v-content-wrapper .v-edit-area').simulate('change',{target:{value:'aaaaa'}})
    // click cancel
    app.find('.v-content-wrapper .v-edit-cancel').simulate('click')
    expect(app.find('.v-content-wrapper .v-edit-area textarea').length).toBe(0)
    expect(app.find('.v-content-wrapper .v-content-body').text().trim()).toBe('sdfsadf')
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



