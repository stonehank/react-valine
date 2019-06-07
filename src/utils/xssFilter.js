/**
 * XSS filter
 * @param {String} content Html String
 */
let xssFilter = (content) => {
  let node=document.createElement('div')
  node.insertAdjacentHTML('afterbegin',content)
  let subNodes=node.querySelectorAll('*')

  let rejectNodes = ['INPUT', 'STYLE', 'SCRIPT', 'IFRAME', 'FRAME', 'AUDIO', 'VIDEO', 'EMBED', 'META', 'TITLE', 'LINK','FORM','TEMPLATE'];
  let __replaceVal = (node, curAttr) => {
    let val = attribute(node, curAttr);
    if(val)attribute(node, curAttr, val.replace(/(javascript|eval)/ig, ''));
  }
  subNodes.forEach((n,i)=>{
    if (typeof n.nodeType=== "number" && n.nodeType !== 1) return;
    let nodeName=n.nodeName
    if(typeof nodeName !=="string"){
      let match=Object.prototype.toString.call(n).match(/^\[object HTML(.*)Element]$/)
      if(!match)return
      nodeName=match[1].toUpperCase()
    }
    if (rejectNodes.includes(nodeName)) {
      if (nodeName === 'INPUT' && attribute(n, 'type') === 'checkbox'){
        attribute(n, {'disabled':'disabled'});
      }else{
        let parentNode=n.parentNode
        if(parentNode.getAttribute('name')==="parentNode"){
          parentNode=n.parentElement
        }
        if(typeof parentNode.removeChild!=="function"){
          if(parentNode.nodeName==="FORM")return
        }
        parentNode.removeChild(n)
        return
      }
    }
    if (nodeName === 'A'){
      __replaceVal(n, 'href')
    }
    if(nodeName=== 'IMG'){
      __replaceVal(n, 'src')
    }
    clearAttr(n)
  })
  let res=node.innerHTML
  node=null
  return res
}
function attribute(ele,name,value){
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
  let removeAttrs=[]
  for(let attr of attrs){
    let name = attr.name
    switch (attr.name.toLowerCase()) {
      case 'style':
        let style = attr.value
        style.split(';').forEach((item) => {
          if (item.includes('color')) {
            attribute(el, 'style', item);
            return false
          } else{
            removeAttrs.push('style')
          }
        })
        break;
      case 'class':
        if (el.nodeName === 'CODE') return false
        break;
      default:
        break;
    }
    if (!ignoreAttrs.includes(name)) {
      removeAttrs.push(name)
      // el.removeAttribute(name)
    }
  }
  for(let name of removeAttrs){
    el.removeAttribute(name)
  }
  return el
}

export default xssFilter