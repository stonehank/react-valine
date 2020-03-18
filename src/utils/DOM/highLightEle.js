export default function highLightEle(ele){
  if(!ele)return
  let contentEle=ele.getElementsByClassName('v-content-body')[0]
  if(!contentEle)contentEle=ele
  contentEle.classList.add('highlight-ele')
  setTimeout(()=>{
    contentEle.classList.remove('highlight-ele')
  },500)
}
