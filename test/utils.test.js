import {resolveTAB,replaceExistEmoji2,getEmojiPrefix,mergeNestComment,simplyObj} from '../src/utils'




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
  expect(simplyObj(complicateObj)).toEqual({a:1,b:2,c:3,child:[],id:"001",createdAt:"2019-06-01"})
})

it("获取数据合并",()=>{
  let list=[
    {id:'001',rid:'001',pid:'',child:[]},
    {id:'002',rid:'002',pid:'',child:[]},
    {id:'007',rid:'007',pid:'',child:[]},
    {id:'008',rid:'008',pid:'',child:[]},
    ],
    arr=[
      {id:'003',rid:'001',pid:'001',child:[]},
      {id:'004',rid:'002',pid:'002',child:[]},
      {id:'005',rid:'001',pid:'003',child:[]},
      {id:'006',rid:'002',pid:'004',child:[]},

      ]
  expect(mergeNestComment(list,arr)).toEqual([
      {
        child: [{
          child: [{
            child: [],
            id: "005",
            pid: "003",
            rid: "001"}],
          id: "003",
          pid: "001",
          rid: "001"}],
        id: "001",
        pid: "",
        rid: "001"},
      {
        child: [{
          child: [{
            child: [],
            id: "006",
            pid: "004",
            rid: "002",},],
          id: "004",
          pid: "002",
          rid: "002",},],
        id: "002",
        pid: "",
        rid: "002",},
      {id:'007',rid:'007',pid:'',child:[]},
      {id:'008',rid:'008',pid:'',child:[]},
  ])
})