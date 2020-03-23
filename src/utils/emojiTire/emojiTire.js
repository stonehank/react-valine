import emojiData from '../../assets/emoji'

let emojiWords=[]
for(let k in emojiData){
  if(Object.prototype.hasOwnProperty.call(emojiData,k)){
    emojiWords.push(k)
  }
}

export function emojiSearch(input,len){
  let res=[]
  for(let word of emojiWords){
    if(word.includes(input)){
      res.push(word)
      if(res.length===len)return res
    }
  }
  return res
}

// let emojiTire=emojiTree(emojiWords)



// export default emojiTire

// function emojiTree(emojiWords){
//   function Tire(val){
//     this.child=Array(26).fill(null)
//     this.val=val
//     this.isWord=false
//   }
//   function createTire(words){
//     let tireTree=new Tire()
//     for(let word of words){
//       let tire=tireTree
//       for(let j=0;j<word.length;j++){
//         let code=word.charCodeAt(j)-97
//         if(!tire.child[code]){
//           tire.child[code]=new Tire(word[j])
//         }
//         let subT=tire.child[code]
//         if(j===word.length-1)subT.isWord=word
//         tire=subT
//       }
//     }
//     return tireTree
//   }
//   let tire=createTire(emojiWords)
//
//   return (input,len)=>{
//     let res=[]
//     let t=tire
//     for(let i=0;i<input.length;i++){
//       let code=input.charCodeAt(i)-97
//       t=t.child[code]
//       if(!t)return []
//     }
//     dfs(t,len)
//     return res
//
//     function dfs(t,len){
//       if(res.length>=len)return
//       if(!t)return
//       if(t.isWord!==false){
//         res.push(t.isWord)
//         if(res.length>=len)return
//       }
//       for(let i=0;i<t.child.length;i++){
//         if(!t.child[i])continue
//         dfs(t.child[i],len)
//       }
//     }
//   }
// }

