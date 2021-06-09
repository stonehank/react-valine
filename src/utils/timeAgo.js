export default function timeAgo(oldDate,langTxt){
  if(typeof oldDate!=='object'){
    oldDate=new Date(oldDate)
  }
  let oldTime=oldDate.getTime()
  try {
    let curTime = new Date().getTime(),
      diffValue = curTime - oldTime;
    let days = Math.floor(diffValue / (24 * 3600 * 1000));
    if (days === 0) {
      //计算相差小时数
      let leave1 = diffValue % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      let hours = Math.floor(leave1 / (3600 * 1000));
      if (hours === 0) {
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000));
        if (minutes === 0) {
          //计算相差秒数
          let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
          let seconds = Math.round(leave3 / 1000);
          return seconds + ` ${langTxt["seconds"]}`;
        }
        return minutes + ` ${langTxt["minutes"]}`;
      }
      return hours + ` ${langTxt["hours"]}`;
    }
    if (days < 0) return langTxt["now"];
    else if (days < 30) return days + ` ${langTxt["days"]}`;
    else if (days < 365) return Math.floor(days / 30) + ` ${langTxt["months"]}`
    else return dateFormat(oldDate);
  } catch (error) {
    console.error("Something wrong with time ago function.",error)
  }
}

function dateFormat (date){
  function padWithZeros(vNumber, width){
    let numAsString = vNumber.toString();
    while (numAsString.length < width) {
      numAsString = '0' + numAsString;
    }
    return numAsString;
  }
  let vDay = padWithZeros(date.getDate(), 2);
  let vMonth = padWithZeros(date.getMonth() + 1, 2);
  let vYear = padWithZeros(date.getFullYear(), 2);
  return `${vYear}-${vMonth}-${vDay}`;
}
