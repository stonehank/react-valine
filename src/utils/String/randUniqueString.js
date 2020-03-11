export default function randUniqueString(bit=32){
  let str='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let res=''
  for(let i=0;i<bit;i++){
    res+=str[Math.floor(Math.random()*str.length)]
  }
  return res
}
