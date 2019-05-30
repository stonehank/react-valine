import React from 'react';
import ReactDOM from 'react-dom';
import {Valine,modify_hljs,ValineCount,ValinePanel,ValinePageview} from './index'

modify_hljs(function(hljs){
  const python = require('highlight.js/lib/languages/python');
  hljs.registerLanguage('python', python);
  return hljs
})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        评论数：<ValineCount />
        <br/>
        浏览量：<ValinePageview title={"测试页面localhost"} count={"统计中"}/>
      </header>
      <div>
        <ValinePanel />
      </div>
    </div>
  );
}



ReactDOM.render(
  <Valine  appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
           appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
           placeholder={"尝试使用“:”开启表情输入，欢迎拍砖(⭐️ )~"}
           nest={false}
  >
    <App />
  </Valine>, document.getElementById('root'));
