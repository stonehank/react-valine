import ReactDOM from "react-dom";
import React from 'react'
import {Valine,modify_hljs} from './react-valine'
import App from './App'


modify_hljs(function(hljs){
  const python = require('highlight.js/lib/languages/python');
  hljs.registerLanguage('python', python);
  return hljs
})

ReactDOM.render(
  <Valine  appId={"I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz"}
           appKey={"lGPcHd7GL9nYKqBbNEkgXKjX"}
           placeholder={"尝试使用“:”开启表情输入(例如 :joy )，欢迎拍砖(⭐️ )~"}
           // nest={false}
  >
    <App />
  </Valine>, document.getElementById('root'));