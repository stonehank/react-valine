import React from 'react';
import {Valine,ValinePageview} from '../src/react-valine'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

import test_uniq_str from './nock/nock-UNIQUESTR'

import './nock/nock-initial'
import './nock/nock-comment-none'
import './nock/nock-count-0'
import './nock/nock-pageview-none'
import './nock/nock-pageview-create'

describe('Common Render', ()=> {
  let app
  beforeAll(()=>{
    app = Enzyme.mount(
      <Valine appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
              appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
              requireEmail={true}
              nest={false}
              CommentClass={"Comment"}
      >
        <div className="App">
          <header className="App-header">
            <span id="pageviewCounts">浏览量：<ValinePageview uniqStr={test_uniq_str}/></span>
          </header>
        </div>
      </Valine>
    );
  })

  it('Show Fetching List',()=>{
    expect(app.find("#pageviewCounts").text()).toBe("浏览量：获取中")
  })

  it('Wait for render',(done)=>{
    setTimeout(()=>{
      app.update()
      done()
    },4000)
  })

  it('Create Counter',()=>{
    console.log(app.html())
    expect(app.find("#pageviewCounts").text()).toBe("浏览量：1")
  })

})
