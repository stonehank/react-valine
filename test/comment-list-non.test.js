import React from 'react';
import {Valine,ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
const {serverURLs}=require('./config')
Enzyme.configure({ adapter: new Adapter() });

import test_uniq_str from './nock/nock-UNIQUESTR'

import './nock/nock-initial'
import './nock/nock-comment-none'
import './nock/nock-count-0'
import './nock/nock-pageview-9999'

global.scrollTo=()=>{}

describe('Test No Comment', ()=> {
  let app
  beforeAll((done) => {
    app = Enzyme.mount(
      <Valine appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
              appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
              requireEmail={true}
              nest={false}
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
  it('Show Count and Pageview',()=>{
    expect(app.find("#commentCounts").text()).toBe("评论数：0")
    expect(app.find("#pageviewCounts").text()).toBe("浏览量：9999")
  })

  it("Get leancloud",()=>{
    expect(window.AV).not.toBe(null)
    let Ct=AV.Object.extend('Counter')
    let newCounter=new Ct()
    expect(Ct).not.toBe(null)
    expect(newCounter).not.toBe(null)
    expect(new AV.ACL().setPublicReadAccess).toBeInstanceOf(Function)
    expect(new AV.ACL().setPublicWriteAccess).toBeInstanceOf(Function)
    expect(newCounter.setACL).toBeInstanceOf(Function)
    expect(newCounter.set).toBeInstanceOf(Function)
    expect(newCounter.save).toBeInstanceOf(Function)
  })

  it('List has no child',()=>{
    expect(app.find('.vempty').length).toBe(1)
    expect(app.find('.vempty').text()).toBe('快来做第一个评论的人吧~')
  })
})



