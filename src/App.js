import React from 'react';
import ReactDOM from 'react-dom';
import {Valine,modify_hljs,ValineCount,ValinePanel} from './index'

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
      </header>
      <div>
        <ValinePanel />
      </div>
    </div>
  );
}



ReactDOM.render(
  <Valine  appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"} appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"} >
    <App />
  </Valine>, document.getElementById('root'));
