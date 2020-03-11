
let escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#x60;'
};


let reUnescapedHtml = /[&<>"'`]/g
let reHasUnescapedHtml = RegExp(reUnescapedHtml.source)


function escape(s) {
  return (s && reHasUnescapedHtml.test(s)) ?
    s.replace(reUnescapedHtml, (chr) => escapeMap[chr]) :
    s
}


export  {
  escape
}