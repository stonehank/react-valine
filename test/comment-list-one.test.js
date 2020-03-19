import React from 'react';
import {Valine,ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import test_uniq_str from './nock/nock-UNIQUESTR'

import './nock/nock-initial'
import './nock/nock-comment-one'
import './nock/nock-count-1'
import './nock/nock-pageview-9999'



global.scrollTo=()=>{}

describe('Test One Comment', ()=>{
  let app
  beforeAll((done)=>{
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
    setTimeout(()=>{
      // fetch done
      app.update()
      done()
    },4000)
  })

  it('Comment info',()=>{
    expect(app.find(".vnick").text()).toBe("fsf")
    expect(app.find(".vtime").text()).not.toBe('')
    expect(app.find(".v-content-body").text().trim()).toBe("sdfsadf")
  })

  it('Comment Counts has 1',()=>{
    expect(app.find("#commentCounts").text()).toBe("评论数：1")
  })

  it('Pageview Counts has 9999',()=>{
    expect(app.find("#pageviewCounts").text()).toBe("浏览量：9999")
  })

  it('Comment list has 1 child',()=>{
    expect(app.find('.vinfo').length).toBe(1)
    expect(app.find('.vcount').text()).toBe('总共1条评论')
    expect(app.find(".vcard").length).toBe(1)
    expect(app.find('.vcard').prop('id')).toBe('5cee8a1d43e78c006734fc8e')
  })

  it('Show last line',()=>{
    expect(app.find('.v-content-footer').text().includes('已经到最后啦')).toBe(true)
  })

  it('Click Reply',()=>{
    app.find('.v-action-reply').simulate('click')
    expect(app.find('.v-editor-main textarea').prop('value')).toBe("@fsf ")
    expect(app.find('.v-content-preview').text().trim()).toBe(`@fsf`)
  })

  it('Click discuss',()=>{
    app.find('.vdiscuss').simulate('click')
    expect(document.activeElement).toBe(app.find('.v-editor-main textarea').getDOMNode())
  })
})
