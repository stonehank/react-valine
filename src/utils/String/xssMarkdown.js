import XssFilter from './xssFilter'
import {escape} from './escape'

const marked = require('marked');

const  hljs =require('highlight.js/lib/highlight');
const javascript = require('highlight.js/lib/languages/javascript');
const java = require('highlight.js/lib/languages/java');

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('java', java);


function createMarked(hljs){
  marked.setOptions({
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>';
        } catch (__) {
          // do nothing
        }
      }
      return '<pre class="hljs"><code>' + escape(str) + '</code></pre>';
    }
  });
  return (mdStr)=>{
    return marked(mdStr)
  }
}
let markdown=createMarked(hljs)



function modify_hljs(createHljs){
  createHljs=createHljs.bind(null,hljs)
  let _hljs=createHljs()
  if(!_hljs){
    _hljs=hljs
    console.warn("Forgot to return hljs ? If not, something might be wrong.")
  }
  markdown=createMarked(_hljs)
}

function xssMarkdown(content){
  return XssFilter(markdown(content))
}


export {modify_hljs,xssMarkdown}









