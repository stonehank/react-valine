function emailVerify(email){
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}
function linkVerify(link){
  return /^(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/.test(link)
}


function contentAtVerify(content,at){
  let m=content.match(/^@([^\s\t\n\r]+)\s/)
  if(!m)return false
  return at===m[1]
}

export {contentAtVerify,linkVerify,emailVerify}
