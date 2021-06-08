import React from 'react';
import {Valine,ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
const {serverURLs}=require('./config')
Enzyme.configure({ adapter: new Adapter() });

import test_uniq_str from './nock/nock-UNIQUESTR'

import './nock/nock-initial'
import './nock/nock-comment-some1'
import './nock/nock-comment-some2'
import './nock/nock-comment-some3'
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

  it('Comment List should has 10 child',()=>{
    expect(app.find('.vcard').length).toBe(10)
    expect(app.find('.vcard').at(0).prop('id')).toBe('5cf0ceb7c8959c00691262e6')
  })

  it('Last line text should be fetch more',()=>{
    expect(app.find('.v-content-footer').text().trim()).toBe('参与讨论加载更多评论')
  })

  it('Fetch more list',(done)=>{
    app.find('.vmore').simulate('click')
    expect(app.find('.vloading').length).toBe(1)
    setTimeout(()=>{
      app.update()
      expect(app.find('.vloading').length).toBe(0)
      expect(app.find('.vcard').length).toBe(20)
      expect(app.find('.v-content-footer').text().trim()).toBe('参与讨论加载更多评论')
      app.find('.vmore').simulate('click')
      expect(app.find('.vloading').length).toBe(1)
      setTimeout(()=>{
        app.update()
        expect(app.find('.vloading').length).toBe(0)
        expect(app.find('.v-content-footer').text().trim()).toBe('参与讨论已经到最后啦')
        done()
      },2000)
    },2000)
  })
})




