export default function scrollElementsTo(eles,vals,idx=0){
  if(idx>=eles.length)return Promise.resolve()
  let ele=eles[idx]
  let val=vals[idx]
  return new Promise((res)=>{
    try{
      ele.scrollTo({
        top: val,
        behavior: 'smooth'
      })
      setTimeout(()=>{
        res()
      },500)
    }catch(_){
      ele.scrollTop=val
      res()
    }
  }).then(()=>{
    return scrollElementsTo(eles,vals,idx+1)
  })
}
