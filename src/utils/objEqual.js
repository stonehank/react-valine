/**
 * 深比较
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
export function deepEqual(obj1, obj2){
  if(obj1===obj2)return true
  if(!obj1 || !obj2)return false
  let os=Object.prototype.toString,result=true;
  for(let key in obj1){
    if(obj1.hasOwnProperty(key)){
      if(os.call(obj1[key])==='[object Array]' && os.call(obj2[key])==='[object Array]'){
        if(obj1[key].length!==obj2[key].length){ return false}
        result=deepEqual(obj1[key],obj2[key])
      }else if(os.call(obj1[key])==='[object Object]' && os.call(obj2[key])==='[object Object]'){
        if(Object.keys(obj1[key]).length!==Object.keys(obj2[key]).length){ return false}
        result=deepEqual(obj1[key],obj2[key])
      }else if(typeof obj1[key]==='function' && typeof obj2[key]==='function'){
        if(obj1[key].toString()!==obj2[key].toString()){
          return false
        }
      }else if(Number.isNaN(obj1[key]) && Number.isNaN(obj2[key])){
        result=true;
      }else if(obj1[key]!==obj2[key]){
        return false;
      }
      if(!result){
        return false;
      }
    }
  }
  return true
}

export function shallowEqual(obj1,obj2){
  for(let key in obj1){
    if(obj1.hasOwnProperty(key)){
      if(obj1[key]!==obj2[key]){
        return false;
      }
    }
  }
  return true;
}