import {highLightEle} from "./index";

export default function bindATagSmoothScroll(ev){
  ev.preventDefault();
  let target=ev.target
  let ele=document.getElementById(target.getAttribute('href').slice(1))
  // todo Compatible?
  ele.scrollIntoView({
    behavior: 'smooth'
  });
  highLightEle(ele)
}
