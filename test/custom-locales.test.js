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

describe('Custom Localse Test', ()=> {
  let app
  beforeAll(() => {
    app = Enzyme.mount(
      <Valine appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
              appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
              requireEmail={true}
              nest={false}
              customTxt={{
                "head": {
                  "nick": "你的大名",
                  "require":"(别漏哦)",
                },
                "tips": {
                  "count":"正在获取评论数",
                  "pageview":"正在获取浏览量",
                  "sofa": "沙发！沙发！沙发！"
                },
                "ctrl": {
                  "preview_on":"预览ing...",
                },
                "verify":{
                  "require_mail":"email别漏！",
                }
              }}
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
  })

  it('Custom Comment Counts fetching text',()=>{
    expect(app.find("#commentCounts").text()).toBe("评论数：正在获取评论数")
  })
  it('Custom Pageview Counts fetching text',()=>{
    expect(app.find("#pageviewCounts").text()).toBe("浏览量：正在获取浏览量")
  })
  it('Wait Render',(done)=>{
    setTimeout(()=>{
      app.update()
      done()
    },4000)
  })
  it('Custom List Child Text',()=>{
    expect(app.find('.vempty').text()).toBe("沙发！沙发！沙发！")
  })
  it('Custom preview button text',()=>{
    expect(app.find('.vpreview-btn').text()).toBe("预览：预览ing...")
  })
  it('Custom email verify text',()=>{
    app.find('.vsubmit-ident').simulate('click')
    expect(app.find('.error-msg').at(1).text()).toBe('email别漏！');
  })
})


