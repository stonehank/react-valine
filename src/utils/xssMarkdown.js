import xssFilter from './xssFilter'
const  hljs =require('highlight.js/lib/highlight');

const javascript = require('highlight.js/lib/languages/javascript');
const java = require('highlight.js/lib/languages/java');

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('java', java);


// 转换 markdown 为 html
function createMarked(hljs){
  const md = require('markdown-it')({
    html:true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>';
        } catch (__) {
        }
      }

      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  });
  return (mdStr)=>{
    return md.render(mdStr)
  }
}
let marked=createMarked(hljs)



function modify_hljs(createHljs){
  createHljs=createHljs.bind(null,hljs)
  let _hljs=createHljs()
  if(!_hljs){
    _hljs=hljs
    console.warn("Forgot to return hljs ? If not, something might be wrong.")
  }
  marked=createMarked(_hljs)
}

function xssMarkdown(content){
  return xssFilter(marked(content))
}


export {modify_hljs,xssMarkdown}









