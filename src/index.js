import ReactDOM from "react-dom";
import React from 'react'
import {Valine,modify_hljs} from './react-valine'
import App from './App'

modify_hljs(function(hljs){
  const python = require('highlight.js/lib/languages/python');
  hljs.registerLanguage('python', python);
  return hljs
})
modify_hljs(function(hljs){
  const xml = require('highlight.js/lib/languages/xml');
  hljs.registerLanguage('xml', xml);
  return hljs
})
modify_hljs(function(hljs){
  const css = require('highlight.js/lib/languages/css');
  hljs.registerLanguage('css', css);
  return hljs
})

ReactDOM.render(
  <Valine  appId={"s8REl9WtWtOw7omr7frVIpMP-MdYXbMMI"}
           appKey={"amadgvU7WzMYQ9eqMatTHLWM"}
           editMode={true}
           placeholder={"Try“:” to input emoji"}
           nest={true}
           serverURLs={"s8rel9wt.api.lncldglobal.com"}
           CommentClass={"Comment_demo"}
           UserClass={"User_demo"}
  >
    <App />
  </Valine>, document.getElementById('root'));
