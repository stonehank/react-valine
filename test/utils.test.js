import {
  resolveTAB,
  replaceExistEmoji2,
  getEmojiPrefix,
  mergeNestComment,
  simplyObj,
  getLinkWithoutProtocol,
  contentAtVerify
} from '../src/utils'
import timeAgo from "../src/utils/timeAgo";




describe("TAB返回正确的移位",()=>{
  let mockEle={
    selectionStart:1,
    selectionEnd:1,
    value:'',
    scrollTop:0,
  }
  let insertStr='  '
  it("对无选中使用TAB",()=>{
    mockEle.value="abcdefg"
    mockEle.selectionStart=1
    mockEle.selectionEnd=1
    let [newValue,scrollTop,startPos,endPos]=resolveTAB(mockEle,insertStr)
    expect(newValue).toBe("a  bcdefg")
    expect(scrollTop).toBe(mockEle.scrollTop)
    expect(startPos).toBe(mockEle.selectionStart+insertStr.length)
    expect(endPos).toBe(mockEle.selectionEnd+insertStr.length)
  })

  it("对单行选中多个使用TAB",()=>{
    mockEle.value="abcdefg"
    mockEle.selectionStart=2
    mockEle.selectionEnd=5
    let [newValue,scrollTop,startPos,endPos]=resolveTAB(mockEle,insertStr)
    expect(newValue).toBe("ab  cdefg")
    expect(scrollTop).toBe(mockEle.scrollTop)
    expect(startPos).toBe(mockEle.selectionStart+insertStr.length)
    expect(endPos).toBe(mockEle.selectionEnd+insertStr.length)
  })

  it("对多行选中使用TAB",()=>{
    mockEle.value=
`abcde
fgh
mnopqr
vwbcdefgfashcvbyi
gh
ijkwer
lmnopsdf
qr
stuvxsf
vwxy
z
wetrbvnx
sfasfsfsfhhgf`
    mockEle.selectionStart=2
    mockEle.selectionEnd=74
    let [newValue,scrollTop,startPos,endPos]=resolveTAB(mockEle,insertStr)
    expect(newValue).toBe(
`ab  cde
  fgh
  mnopqr
  vwbcdefgfashcvbyi
  gh
  ijkwer
  lmnopsdf
  qr
  stuvxsf
  vwxy
  z
  wetrbvnx
sfasfsfsfhhgf`)
    expect(scrollTop).toBe(mockEle.scrollTop)
    expect(startPos).toBe(mockEle.selectionStart+insertStr.length)
    expect(endPos).toBe(mockEle.selectionEnd+22+insertStr.length)
  })
})


describe("检测已经存在的表情输入",()=>{
  it("单个表情输入",()=>{
    let content=":dog:"
    let [newStr,startPos]=replaceExistEmoji2(content,5)
    expect(newStr).toBe("🐶 ")
    expect(startPos).toBe(3)
  })
  it("多个表情输入",()=>{
    let content=":dog::cat::cow:"
    let [newStr,startPos]=replaceExistEmoji2(content,15)
    expect(newStr).toBe("🐶 🐱 🐮 ")
    expect(startPos).toBe(9)
  })
  it("多个复杂表情输入1",()=>{
    let content="fasdf=-.:cow:/;':dog:afwegh=-.:cow:/;'faslj=-.:cat:/;'fj:coffee:oweoa=-./;'wf:dog:hoawfhw=-./;'[:joy:]"
    let [newStr,startPos]=replaceExistEmoji2(content,102)
    expect(newStr).toBe("fasdf=-.🐮 /;'🐶 afwegh=-.🐮 /;'faslj=-.🐱 /;'fj☕️ oweoa=-./;'wf🐶 hoawfhw=-./;'[😂 ]")
    expect(startPos).toBe(85)
  })

  it("多个复杂表情输入2",()=>{
    let content=":cow::dogg::dog:: dog:::airplane :100: : :: : :::cat:"
    let [newStr,startPos]=replaceExistEmoji2(content,53)
    expect(newStr).toBe("🐮 :dogg:🐶 : dog:::airplane 💯  : :: : ::🐱 ")
    expect(startPos).toBe(45)
  })
})


describe("获取表情前缀",()=>{
  it("首行前缀",()=>{
    let content=":dog"
    expect(getEmojiPrefix(content,3)).toBe("do")
    expect(getEmojiPrefix(content,2)).toBe("d")
  })
  it("中间无空格前缀",()=>{
    let content="abc:dog"
    expect(getEmojiPrefix(content,6)).toBe(null)
    expect(getEmojiPrefix(content,5)).toBe(null)
  })
  it("中间有空格前缀1",()=>{
    let content="abc :dog"
    expect(getEmojiPrefix(content,6)).toBe('d')
    expect(getEmojiPrefix(content,5)).toBe('')
  })
  it("中间有空格前缀2",()=>{
    let content="::::::::::::::::s:s: s: :confou:::::::::"
    expect(getEmojiPrefix(content,29)).toBe('conf')
    for(let i=2;i<=content.length;i++){
      if(i<=24 || i>=32){
        expect(getEmojiPrefix(content,i)).toBe(null)
      }
    }
  })
  it("换行前缀",()=>{
    let content="abc\n:dog"
    expect(getEmojiPrefix(content,7)).toBe("do")
    expect(getEmojiPrefix(content,8)).toBe("dog")
  })
})


it("复杂对象简单化(针对Leancloud对象)",()=>{
  let complicateObj=Object.prototype
  complicateObj.attributes={a:1,b:2,c:3}
  complicateObj.get=(str)=>"2019-06-01"
  complicateObj.id='001'
  expect(simplyObj(complicateObj)).toEqual({a:1,b:2,c:3,child:[],id:"001",createdAt:"2019-06-01",initShowChild: false})
})

it("获取去除协议部分的url",()=>{
  let link1="https://www.abc.com",
    link2="http://www.abc.com",
    link3="http://"

  expect(getLinkWithoutProtocol(link1)).toBe("www.abc.com")
  expect(getLinkWithoutProtocol(link2)).toBe("www.abc.com")
  expect(getLinkWithoutProtocol(link3)).toBe("")
})


describe("获取数据合并",()=>{
  let list=[
      {id:'001',rid:'001',pid:'',child:[],initShowChild:false},
      {id:'002',rid:'002',pid:'',child:[],initShowChild:false},
      {id:'007',rid:'007',pid:'',child:[],initShowChild:false},
      {id:'008',rid:'008',pid:'',child:[],initShowChild:false},
    ],
    arr=[
      {id:'003',rid:'001',pid:'001',child:[],initShowChild:false},
      {id:'004',rid:'002',pid:'002',child:[],initShowChild:false},
      {id:'005',rid:'001',pid:'003',child:[],initShowChild:false},
      {id:'006',rid:'002',pid:'004',child:[],initShowChild:false},

    ]

  it("默认合并",()=> {
    expect(mergeNestComment(list, arr)).toEqual([
      {
        child: [{
          child: [{
            child: [],
            id: "005",
            pid: "003",
            rid: "001",
            initShowChild: false
          }],
          id: "003",
          pid: "001",
          rid: "001",
          initShowChild: false
        }],
        id: "001",
        pid: "",
        rid: "001",
        initShowChild: false
      },
      {
        child: [{
          child: [{
            child: [],
            id: "006",
            pid: "004",
            rid: "002",
            initShowChild: false
          },],
          id: "004",
          pid: "002",
          rid: "002",
          initShowChild: false
        },],
        id: "002",
        pid: "",
        rid: "002",
        initShowChild: false
      },
      {id: '007', rid: '007', pid: '', child: [], initShowChild: false},
      {id: '008', rid: '008', pid: '', child: [], initShowChild: false},
    ])
  })

  it("只嵌套1层",()=> {
    expect(mergeNestComment(list, arr, 1)).toEqual([
      {
        child: [
          {
            child: [],
            id: "003",
            pid: "001",
            rid: "001",
            initShowChild: false
          },
          {
            child: [],
            id: "005",
            pid: "003",
            rid: "001",
            initShowChild: false
          }
        ],
        id: "001",
        pid: "",
        rid: "001",
        initShowChild: false
      },
      {
        child: [
          {
            child: [],
            id: "004",
            pid: "002",
            rid: "002",
            initShowChild: false
          },
          {
            child: [],
            id: "006",
            pid: "004",
            rid: "002",
            initShowChild: false
          }
        ],
        id: "002",
        pid: "",
        rid: "002",
        initShowChild: false
      },
      {id: '007', rid: '007', pid: '', child: [], initShowChild: false},
      {id: '008', rid: '008', pid: '', child: [], initShowChild: false},
    ])
  })

  it("无限层嵌套，默认展示回复",()=>{
    expect(mergeNestComment(list,arr,Infinity,true)).toEqual([
      {
        child: [{
          child: [{
            child: [],
            id: "005",
            pid: "003",
            rid: "001",
            initShowChild:false}],
          id: "003",
          pid: "001",
          rid: "001",
          initShowChild:true}],
        id: "001",
        pid: "",
        rid: "001",
        initShowChild:true},
      {
        child: [{
          child: [{
            child: [],
            id: "006",
            pid: "004",
            rid: "002",
            initShowChild:false},],
          id: "004",
          pid: "002",
          rid: "002",
          initShowChild:true},],
        id: "002",
        pid: "",
        rid: "002",
        initShowChild:true},
      {id:'007',rid:'007',pid:'',child:[],initShowChild:false},
      {id:'008',rid:'008',pid:'',child:[],initShowChild:false},
    ])
  })
})


it("检测at的ID是否对应",()=>{
  expect(contentAtVerify('@nick ','nick')).toBe(true)
  expect(contentAtVerify('@nick','nick')).toBe(false)
  expect(contentAtVerify('@ ',' ')).toBe(false)
  expect(contentAtVerify('@nack ','nick')).toBe(false)
  expect(contentAtVerify('@nick \nsadfsf \n','nick')).toBe(true)
  expect(contentAtVerify('@nick\n sfasf \n','nick')).toBe(true)
  expect(contentAtVerify('@nick\t sfasf \n','nick')).toBe(true)
  expect(contentAtVerify('@nick\r sfasf \n','nick')).toBe(true)
})

it("检测时间",()=>{
  let lang={
    "seconds": "秒前",
    "minutes": "分钟前",
    "hours": "小时前",
    "days": "天前",
    "months":"个月前",
    "now": "刚刚"
  }
  expect(timeAgo( {getTime:()=>new Date().getTime()+1},lang)).toBe('刚刚')
  expect(timeAgo( {getTime:()=>new Date().getTime()-5000},lang)).toBe('5 秒前')
  expect(timeAgo( {getTime:()=>new Date().getTime()-3600*24*1000},lang)).toBe('1 天前')
  expect(timeAgo( {getTime:()=>new Date().getTime()-3600*24*1000*30},lang)).toBe('1 个月前')
  expect(timeAgo( {getTime:()=>new Date().getTime()-3600*24*1000*30*11},lang)).toBe('11 个月前')
  expect(timeAgo( {getTime:()=>new Date().getTime()-3600*24*1000*30*12},lang)).toBe('12 个月前')
  expect(timeAgo( new Date('2001-1-1'),lang)).toBe('2001-01-01')
})