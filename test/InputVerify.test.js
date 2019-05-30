import React from 'react';
// import App from '../src/App';
// import renderer from 'react-test-renderer';
import {Valine,ValineCount,ValinePageview,ValinePanel} from '../src/react-valine'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

const test_uniq_str="test-1-reply"



const nock = require('nock')

nock('https://app-router.leancloud.cn')
  .persist()
  .get('/2/route?appId=I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz')
  .reply(200, {"ttl":3600,"stats_server":"i5daxohp.stats.lncld.net","rtm_router_server":"i5daxohp.rtm.lncld.net","push_server":"i5daxohp.push.lncld.net","play_server":"i5daxohp.play.lncld.net","engine_server":"i5daxohp.engine.lncld.net","api_server":"i5daxohp.api.lncld.net"})

/* fetch list--start */
nock('https://i5daxohp.api.lncld.net:443')
  .persist()
  // .log(console.log)
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22%3A%22test-1-reply%22%2C%22pid%22%3A%22%22%7D&keys=nick%2Ccomment%2Clink%2Cpid%2CavatarSrc%2Crid&limit=10&order=-createdAt')
  .reply(200, {"results":[{"nick":"fsf","updatedAt":"2019-05-29T13:33:18.710Z","objectId":"5cee8a1d43e78c006734fc8e","createdAt":"2019-05-29T13:33:17.983Z","pid":"","link":"","comment":"<p>sdfsadf<\/p>\n","avatarSrc":"https:\/\/gravatar.loli.net\/avatar\/?d=robohash&size=50","rid":"5cee8a1d43e78c006734fc8e"}]})

nock('https://i5daxohp.api.lncld.net:443')
  .persist()
  // .log(console.log)
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22%3A%22test-1-reply%22%2C%22pid%22%3A%7B%22%24ne%22%3A%22%22%7D%2C%22rid%22%3A%7B%22%24in%22%3A%5B%225cee8a1d43e78c006734fc8e%22%5D%7D%7D&keys=nick%2Ccomment%2Clink%2Cpid%2CavatarSrc%2Crid&order=createdAt')
  .reply(200, {"results":[]})
/* fetch list--end */
nock('https://i5daxohp.api.lncld.net')
  .persist()
  .get('/1.1/classes/Comment?where=%7B%22uniqStr%22%3A%22test-1-reply%22%7D&limit=0&count=1')
  .reply(200, {"results":[],"count":99})

nock("https://i5daxohp.api.lncld.net")
  .persist()
  .get("/1.1/classes/Counter?where=%7B%22uniqStr%22%3A%22test-1-reply%22%7D")
  .reply(200, {"results":[{"uniqStr":"test-1-reply","title":"\u6d4b\u8bd5\u9875\u9762localhost","time":9999,"createdAt":"2019-05-29T14:53:57.872Z","updatedAt":"2019-05-30T08:08:47.209Z","objectId":"5cee9d0530863b006861c98c"}]})

let container=document.createElement("div")
it('can render and update a counter', (done) => {
  act(() => {
    ReactDOM.render(<Valine  appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
                             appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
    >
      <div className="App">
        <header className="App-header">
          <span id="commentCounts">
            评论数：<ValineCount uniqStr={test_uniq_str}/>
          </span>
          <br/>
          <span id="pageviewCounts">
             浏览量：<ValinePageview uniqStr={test_uniq_str}/>
          </span>
        </header>
        <div>
          <ValinePanel uniqStr={test_uniq_str} />
        </div>
      </div>
    </Valine>, container);
  });
  const app = container.getElementsByClassName('v'),
    wrap = container.getElementsByClassName('vwrap'),
    list=container.getElementsByClassName("vlist"),
    page=container.getElementsByClassName("vpage")
  // console.log(container.querySelector("#commentCounts"),container.querySelector("#commentCounts").innerHTML)
  setTimeout(()=>{
    expect(app.length).toBe(1)
    expect(wrap.length).toBe(1)
    expect(list.length).toBe(1)
    expect(page.length).toBe(1)
    expect(container.querySelector("#commentCounts").innerHTML).toBe("评论数：<span>99</span>")
    expect(container.querySelector("#pageviewCounts").innerHTML).toBe("浏览量：<span>9999</span>")
    done()
  },2000)

  // expect(container.querySelector("#commentCounts").innerText).toBe("评论数：20")



});
