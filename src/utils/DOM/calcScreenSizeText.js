export default function calcScreenSizeText(){
  let w=window.innerWidth
  if(w<600) {
    return 'xs'
  }else if(w<768){
    return 'sm'
  }else if(w<1024){
    return 'md'
  }else if(w<1280){
    return 'lg'
  }else{
    return 'xl'
  }
}
