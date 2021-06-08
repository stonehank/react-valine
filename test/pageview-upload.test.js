import React from 'react';
import {Valine,ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
const {serverURLs}=require('./config')
import test_uniq_str from './nock/nock-UNIQUESTR'

import './nock/nock-initial'
import './nock/nock-pageview-9999'
import './nock/nock-update-pageview'




describe('Pageview upload', ()=> {
  let app
  beforeAll(() => {
    app = Enzyme.mount(
      <Valine appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
              appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
              requireEmail={true}
              nest={false}
              serverURLs={serverURLs}
              CommentClass={"Comment"}
      >
        <div className="App">
            <span id="pageviewCounts">
             浏览量：<ValinePageview uniqStr={test_uniq_str}/>
          </span>
        </div>
      </Valine>
    );
  })

  it('Pageview Counts fetch',()=>{
    expect(app.find("#pageviewCounts").text()).toBe("浏览量：获取中")
  })

  it('Wait Render',(done)=>{
    setTimeout(() => {
      // fetch done
      done()
    }, 2000)
  })

  it('Pageview Counts should be 9999+1',()=>{
    expect(app.find("#pageviewCounts").text()).toBe("浏览量：10000")
  })
})
