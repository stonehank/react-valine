/**
 * XSS filter
 * @param {String} content Html String
 */
let xssFilter = (content) => {
  let node=document.createElement('div')
  node.insertAdjacentHTML('afterbegin',content)
  let subNodes=node.querySelectorAll('*')

  let rejectNodes = ['INPUT', 'STYLE', 'SCRIPT', 'IFRAME', 'FRAME', 'AUDIO', 'VIDEO', 'EMBED', 'META', 'TITLE', 'LINK'];
  let __replaceVal = (node, curAttr) => {
    let val = attr(node, curAttr);
    if(val)attr(node, curAttr, val.replace(/(javascript|eval)/ig, ''));
  }
  // console.log(subNodes)
  subNodes.forEach(n=>{
    if (n.nodeType !== 1) return;
    if (rejectNodes.includes(n.nodeName)) {
      if (n.nodeName === 'INPUT' && attr(n, 'type') === 'checkbox'){
        attr(n, 'disabled', 'disabled');
      }else{
        n.parentNode.removeChild(n)
      }
    }
    if (n.nodeName === 'A'){
      __replaceVal(n, 'href')
    }
    clearAttr(n)
  })
  let res=node.innerHTML
  node=null
  return res
}
function attr(ele,name,value){
  if(ele.getAttribute==null){
    return
  }
  if(value!==undefined){
    if(value===null)ele.removeAttribute(name)
    else{
      ele.setAttribute(name,value)
    }
  }else{
    if(Object.prototype.toString.call(name)==="[object Object]"){
      for(let k in name){
        ele.setAttribute(k,name[k])
      }
    }else{
      return ele.getAttribute(name)
    }
  }
}

function clearAttr(el) {
  let attrs = el.attributes
  let ignoreAttrs = ['align', 'alt','checked', 'disabled', 'href', 'id', 'target', 'title', 'type', 'src', 'class', 'style']
  for(let attr of attrs){
    let name = attr.name
    switch (attr.name.toLowerCase()) {
      case 'style':
        let style = attr.value
        style.split(';').forEach((idx, item) => {
          if (item.includes('color')) {
            attr(el, 'style', item);
            return false
          } else{
            el.removeAttribute('style')
          }
        })
        break;
      case 'class':
        if (el.nodeName === 'CODE') return false
        // let clazz = attr.value
        // if (clazz.indexOf('at') > -1) {
        //   utils.attr(el, 'class', 'at');
        //   return false
        // }
        break;
      default:
        break;

    }
    if (!ignoreAttrs.includes(name)) el.removeAttribute(name)

  }
  return el
}

export default xssFilter