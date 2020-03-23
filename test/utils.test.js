import {
  resolveTAB,
  replaceExistEmoji,
  getEmojiPrefix,
  mergeNestComment,
  simplyObj,
  getLinkWithoutProtocol,
  contentAtVerify,
  getCaretCoordinates,
  deepEqual,
  randUniqueString,
} from '../src/utils'
import timeAgo from "../src/utils/timeAgo";
import {escape} from "../src/utils/String/escape";
import getWordList from "../src/utils/emojiTire";
import xssFilter from "../src/utils/String/xssFilter";



describe("Test deepEqual",function () {
  let obj1={
    createdTime: "6/7/2018",
    label:["getDerivedStateFromProps", "props", "state", "myFetch", "list", "return", "null"],
    sha: "5773c257a100e1f2106db59fb0bc4ad273375da0",
    summary: {x:1,y:2,z:[5,67,7,2,{a:823974,b:function(x){return x+5},c:[1299,324,65,false,true,{lastArr:[]}]}]},
    timeArr: [2018, 5, 7, 0, 0, 0, 0],
    title: ()=>"title",
    nan:NaN,
  }
  let obj2={
    createdTime: "6/7/2018",
    label:["getDerivedStateFromProps", "props", "state", "myFetch", "list", "return", "null"],
    sha: "5773c257a100e1f2106db59fb0bc4ad273375da0",
    summary: {x:1,y:2,z:[5,67,7,2,{a:823974,b:function(x){return x+5},c:[1299,324,65,false,true,{lastArr:[]}]}]},
    timeArr: [2018, 5, 7, 0, 0, 0, 0],
    title: ()=>"title",
    nan:NaN,
  }
  // b:function...x+6
  let obj3={
    createdTime: "6/7/2018",
    label:["getDerivedStateFromProps", "props", "state", "myFetch", "list", "return", "null"],
    sha: "5773c257a100e1f2106db59fb0bc4ad273375da0",
    summary: {x:1,y:2,z:[5,67,7,2,{a:823974,b:function(x){return x+6},c:[1299,324,65,false,true,{lastArr:[]}]}]},
    timeArr: [2018, 5, 7, 0, 0, 0, 0],
    title: ()=>"title"
  }
  expect(obj1===obj2).toBe(false)
  expect(deepEqual(obj1,obj2)).toBe(true)
  expect(deepEqual(obj1,obj3)).toBe(false)
  expect(deepEqual(obj2,obj3)).toBe(false)
})

describe('随机独立字符串两两不等',()=>{
  let hash={}
  for(let i=0;i<10000;i++){
    let str=randUniqueString()
    expect(hash[str]).toBe(undefined)
    hash[str]=true
  }
})

describe("TAB返回正确的移位", () => {
  let mockEle = {
    selectionStart: 1,
    selectionEnd: 1,
    value: '',
    scrollTop: 0,
  }
  let insertStr = '  '
  it("对无选中使用TAB", () => {
    mockEle.value = "abcdefg"
    mockEle.selectionStart = 1
    mockEle.selectionEnd = 1
    let [newValue, scrollTop, startPos, endPos] = resolveTAB(mockEle, insertStr)
    expect(newValue).toBe("a  bcdefg")
    expect(scrollTop).toBe(mockEle.scrollTop)
    expect(startPos).toBe(mockEle.selectionStart + insertStr.length)
    expect(endPos).toBe(mockEle.selectionEnd + insertStr.length)
  })

  it("对单行选中多个使用TAB", () => {
    mockEle.value = "abcdefg"
    mockEle.selectionStart = 2
    mockEle.selectionEnd = 5
    let [newValue, scrollTop, startPos, endPos] = resolveTAB(mockEle, insertStr)
    expect(newValue).toBe("ab  cdefg")
    expect(scrollTop).toBe(mockEle.scrollTop)
    expect(startPos).toBe(mockEle.selectionStart + insertStr.length)
    expect(endPos).toBe(mockEle.selectionEnd + insertStr.length)
  })

  it("对多行选中使用TAB", () => {
    mockEle.value =
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
    mockEle.selectionStart = 2
    mockEle.selectionEnd = 74
    let [newValue, scrollTop, startPos, endPos] = resolveTAB(mockEle, insertStr)
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
    expect(startPos).toBe(mockEle.selectionStart + insertStr.length)
    expect(endPos).toBe(mockEle.selectionEnd + 22 + insertStr.length)
  })
})


describe("检测已经存在的表情输入", () => {
  it("单个表情输入", () => {
    let content = ":dog:"
    let [newStr, startPos] = replaceExistEmoji(content, 5)
    expect(newStr).toBe("🐶 ")
    expect(startPos).toBe(3)
  })
  it("多个表情输入", () => {
    let content = ":dog::cat::cow:"
    let [newStr, startPos] = replaceExistEmoji(content, 15)
    expect(newStr).toBe("🐶 🐱 🐮 ")
    expect(startPos).toBe(9)
  })
  it("多个复杂表情输入1", () => {
    let content = "fasdf=-.:cow:/;':dog:afwegh=-.:cow:/;'faslj=-.:cat:/;'fj:coffee:oweoa=-./;'wf:dog:hoawfhw=-./;'[:joy:]"
    let [newStr, startPos] = replaceExistEmoji(content, 102)
    expect(newStr).toBe("fasdf=-.🐮 /;'🐶 afwegh=-.🐮 /;'faslj=-.🐱 /;'fj☕️ oweoa=-./;'wf🐶 hoawfhw=-./;'[😂 ]")
    expect(startPos).toBe(85)
  })

  it("多个复杂表情输入2", () => {
    let content = ":cow::dogg::dog:: dog:::airplane :100: : :: : :::cat:"
    let [newStr, startPos] = replaceExistEmoji(content, 53)
    expect(newStr).toBe("🐮 :dogg:🐶 : dog:::airplane 💯  : :: : ::🐱 ")
    expect(startPos).toBe(45)
  })
})


describe("获取表情前缀", () => {
  it("首行前缀", () => {
    let content = ":dog"
    expect(getEmojiPrefix(content, 3)).toBe("do")
    expect(getEmojiPrefix(content, 2)).toBe("d")
  })
  it("中间无空格前缀", () => {
    let content = "abc:dog"
    expect(getEmojiPrefix(content, 6)).toBe(null)
    expect(getEmojiPrefix(content, 5)).toBe(null)
  })
  it("中间有空格前缀1", () => {
    let content = "abc :dog"
    expect(getEmojiPrefix(content, 6)).toBe('d')
    expect(getEmojiPrefix(content, 5)).toBe('')
  })
  it("中间有空格前缀2", () => {
    let content = "::::::::::::::::s:s: s: :confou:::::::::"
    expect(getEmojiPrefix(content, 29)).toBe('conf')
    for (let i = 2; i <= content.length; i++) {
      if (i <= 24 || i >= 32) {
        expect(getEmojiPrefix(content, i)).toBe(null)
      }
    }
  })
  it("换行前缀", () => {
    let content = "abc\n:dog"
    expect(getEmojiPrefix(content, 7)).toBe("do")
    expect(getEmojiPrefix(content, 8)).toBe("dog")
  })
})


it("复杂对象简单化(针对Leancloud对象)", () => {
  let complicateObj = Object.prototype
  complicateObj.attributes = {a: 1, b: 2, c: 3, createdAt: '2019-06-01'}
  complicateObj.id = '001'
  expect(simplyObj(complicateObj)).toEqual({
    a: 1,
    b: 2,
    c: 3,
    child: [],
    id: "001",
    createdAt: "2019-06-01",
    initShowChild: false,
    owner: false,
    replyLen: 0
  })
})

it("获取去除协议部分的url", () => {
  let link1 = "https://www.abc.com",
    link2 = "http://www.abc.com",
    link3 = "http://"

  expect(getLinkWithoutProtocol(link1)).toBe("www.abc.com")
  expect(getLinkWithoutProtocol(link2)).toBe("www.abc.com")
  expect(getLinkWithoutProtocol(link3)).toBe("")
})


describe("获取数据合并", () => {
  let list = [
      {id: '001', rid: '001', pid: '', child: [], initShowChild: false, replyLen: 0},
      {id: '002', rid: '002', pid: '', child: [], initShowChild: false, replyLen: 0},
      {id: '007', rid: '007', pid: '', child: [], initShowChild: false, replyLen: 0},
      {id: '008', rid: '008', pid: '', child: [], initShowChild: false, replyLen: 0},
    ],
    arr = [
      {id: '003', rid: '001', pid: '001', child: [], initShowChild: false, replyLen: 0},
      {id: '004', rid: '002', pid: '002', child: [], initShowChild: false, replyLen: 0},
      {id: '005', rid: '001', pid: '003', child: [], initShowChild: false, replyLen: 0},
      {id: '006', rid: '002', pid: '004', child: [], initShowChild: false, replyLen: 0},

    ]

  it("默认合并", () => {
    expect(mergeNestComment(list, arr)).toEqual([{
      "child": [{
        "child": [{
          "child": [],
          "id": "005",
          "initShowChild": false,
          "pid": "003",
          "replyLen": 0,
          "rid": "001"
        }], "id": "003", "initShowChild": false, "pid": "001", "replyLen": 1, "rid": "001"
      }], "id": "001", "initShowChild": false, "pid": "", "replyLen": 2, "rid": "001"
    }, {
      "child": [{
        "child": [{
          "child": [],
          "id": "006",
          "initShowChild": false,
          "pid": "004",
          "replyLen": 0,
          "rid": "002"
        }], "id": "004", "initShowChild": false, "pid": "002", "replyLen": 1, "rid": "002"
      }], "id": "002", "initShowChild": false, "pid": "", "replyLen": 2, "rid": "002"
    }, {"child": [], "id": "007", "initShowChild": false, "pid": "", "replyLen": 0, "rid": "007"}, {
      "child": [],
      "id": "008",
      "initShowChild": false,
      "pid": "",
      "replyLen": 0,
      "rid": "008"
    }])
  })

  it("只嵌套1层", () => {
    expect(mergeNestComment(list, arr, 1)).toEqual([{
      "child": [{
        "child": [],
        "id": "003",
        "initShowChild": false,
        "pid": "001",
        "replyLen": 0,
        "rid": "001"
      }, {"child": [], "id": "005", "initShowChild": false, "pid": "003", "replyLen": 0, "rid": "001"}],
      "id": "001",
      "initShowChild": false,
      "pid": "",
      "replyLen": 2,
      "rid": "001"
    }, {
      "child": [{
        "child": [],
        "id": "004",
        "initShowChild": false,
        "pid": "002",
        "replyLen": 0,
        "rid": "002"
      }, {"child": [], "id": "006", "initShowChild": false, "pid": "004", "replyLen": 0, "rid": "002"}],
      "id": "002",
      "initShowChild": false,
      "pid": "",
      "replyLen": 2,
      "rid": "002"
    }, {"child": [], "id": "007", "initShowChild": false, "pid": "", "replyLen": 0, "rid": "007"}, {
      "child": [],
      "id": "008",
      "initShowChild": false,
      "pid": "",
      "replyLen": 0,
      "rid": "008"
    }])
  })

  it("无限层嵌套，默认展示回复", () => {
    expect(mergeNestComment(list, arr, Infinity, true)).toEqual([{
      "child": [{
        "child": [{
          "child": [],
          "id": "005",
          "initShowChild": false,
          "pid": "003",
          "replyLen": 0,
          "rid": "001"
        }], "id": "003", "initShowChild": true, "pid": "001", "replyLen": 1, "rid": "001"
      }], "id": "001", "initShowChild": true, "pid": "", "replyLen": 2, "rid": "001"
    }, {
      "child": [{
        "child": [{
          "child": [],
          "id": "006",
          "initShowChild": false,
          "pid": "004",
          "replyLen": 0,
          "rid": "002"
        }], "id": "004", "initShowChild": true, "pid": "002", "replyLen": 1, "rid": "002"
      }], "id": "002", "initShowChild": true, "pid": "", "replyLen": 2, "rid": "002"
    }, {"child": [], "id": "007", "initShowChild": false, "pid": "", "replyLen": 0, "rid": "007"}, {
      "child": [],
      "id": "008",
      "initShowChild": false,
      "pid": "",
      "replyLen": 0,
      "rid": "008"
    }])
  })
})


it("检测at的ID是否对应", () => {
  expect(contentAtVerify('@nick ', 'nick')).toBe(true)
  expect(contentAtVerify('@nick', 'nick')).toBe(false)
  expect(contentAtVerify('@ ', ' ')).toBe(false)
  expect(contentAtVerify('@nack ', 'nick')).toBe(false)
  expect(contentAtVerify('@nick \nsadfsf \n', 'nick')).toBe(true)
  expect(contentAtVerify('@nick\n sfasf \n', 'nick')).toBe(true)
  expect(contentAtVerify('@nick\t sfasf \n', 'nick')).toBe(true)
  expect(contentAtVerify('@nick\r sfasf \n', 'nick')).toBe(true)
})

it("检测时间", () => {
  let lang = {
    "seconds": "秒前",
    "minutes": "分钟前",
    "hours": "小时前",
    "days": "天前",
    "months": "个月前",
    "now": "刚刚"
  }
  expect(timeAgo({getTime: () => new Date().getTime() + 5000}, lang)).toBe('刚刚')
  expect(timeAgo({getTime: () => new Date().getTime() - 5000}, lang)).toBe('5 秒前')
  expect(timeAgo({getTime: () => new Date().getTime() - 1000 * 90}, lang)).toBe('1 分钟前')
  expect(timeAgo({getTime: () => new Date().getTime() - 1000 * 3800}, lang)).toBe('1 小时前')
  expect(timeAgo({getTime: () => new Date().getTime() - 3600 * 24 * 1000}, lang)).toBe('1 天前')
  expect(timeAgo({getTime: () => new Date().getTime() - 3600 * 24 * 1000 * 30}, lang)).toBe('1 个月前')
  expect(timeAgo({getTime: () => new Date().getTime() - 3600 * 24 * 1000 * 30 * 11}, lang)).toBe('11 个月前')
  expect(timeAgo({getTime: () => new Date().getTime() - 3600 * 24 * 1000 * 30 * 12}, lang)).toBe('12 个月前')
  expect(timeAgo(new Date('2001-1-1'), lang)).toBe('2001-01-01')
})


it("搜索emojiList", () => {
  expect(getWordList(null, 5)).toEqual([])
  expect(getWordList('c', 5)).toEqual(["heavy_check_mark", "1st_place_medal", "innocent", "stuck_out_tongue_winking_eye", "confused"])
  expect(getWordList('cof', 5)).toEqual(["coffee"])
  expect(getWordList('', 5)).toEqual(["100", "+1", "-1", "heavy_check_mark", "grin"])
  expect(getWordList('c', 10)).toEqual(["heavy_check_mark", "1st_place_medal", "innocent", "stuck_out_tongue_winking_eye", "confused", "confounded", "tired_face", "neutral_face", "dizzy_face", "scream"])
  expect(getWordList('+', 5)).toEqual(["+1"])
  expect(getWordList('1', 5)).toEqual(["100", "+1", "-1", "1st_place_medal"])

})
it("escape", () => {
  expect(escape("peter")).toBe("peter")
  expect(escape("jane&peter")).toBe("jane&amp;peter")
  expect(escape("<tag />")).toBe("&lt;tag /&gt;")
  expect(escape("peter say:'Hello'")).toBe("peter say:&#39;Hello&#39;")
  expect(escape("peter say:`Hello`")).toBe("peter say:&#x60;Hello&#x60;")
  expect(escape(`peter say:"Hello"`)).toBe("peter say:&quot;Hello&quot;")
})


it("getCaretCoordinates", () => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetTop: {
      get: function () {
        return 50
      }
    },
    offsetLeft: {
      get: function () {
        return 30
      }
    },
  });
  let input = document.createElement("textarea")
  input.style.lineHeight = 20 + "px"
  input.value = "12345\n\n67890"
  input.selectionStart = 8
  expect(getCaretCoordinates(input, input.selectionStart)).toEqual({top: 51, left: 31, height: 20})
})

describe("test xssfilter", () => {
  it("not allow form", () => {
    expect(xssFilter(`<div onclick=alert(0)><form onsubmit=alert(1)><input onfocus=alert(2) name=parentNode>123</form></div>

<form onsubmit=alert(1)><input onfocus=alert(2) name=nodeName>123</form>

<form onsubmit=alert(1)><input onfocus=alert(2) name=nodeType>123</form>

<form onsubmit=alert(1)><input onfocus=alert(2) name=children>123</form>

<form onsubmit=alert(1)><input onfocus=alert(2) name=attributes>123</form>

<form onsubmit=alert(1)><input onfocus=alert(2) name=removeChild>123</form>

<form onsubmit=alert(1)><input onfocus=alert(2) name=removeAttributeNode>123</form>

<form onsubmit=alert(1)><input onfocus=alert(2) name=setAttribute>123</form>`).trim()).toBe("<div></div>")
  })

  it("not allow 'javascript'", () => {
    expect(xssFilter(`<a href="javascript:alert(1)">c</a><img src="javascript:alert(1)" />
`).trim()).toBe(`<a href=":alert(1)">c</a><img src=":alert(1)">`)
  })

  it("multiply event will remove", () => {
    expect(xssFilter(`<button remove=me onmousedown="javascript:alert(1);" onclick="javascript:alert(1)" >@giutro`)).toBe(`<button>@giutro</button>`)
  })

  it('template not allow', () => {
    expect(xssFilter(`<body><template><s><template><s><img src=x onerror=alert(1)>@shafigullin</s></template></s></template>`)).toBe("")
  })

  it('set checkbox', () => {
    expect(xssFilter(`<input type="checkbox" />`).includes(`disabled="disabled"`)).toBe(true)
  })
  it('remove style,but not color', () => {
    expect(xssFilter(`<div style="width:100px;background-color:red;color:blue;" ></div>`)).toBe('<div style="color:blue"></div>')
  })

  it('can not have class', () => {
    expect(xssFilter(`<div class="hljs-attr" ></div>`)).toBe('<div></div>')
  })

  it('Classname start with hljs and language with pre, code element can keep class', () => {
    expect(xssFilter(`<code class="some-class" style="width:100px;background:red;color:blue;" ></code>`)).toBe('<code style="color:blue"></code>')
    expect(xssFilter(`<pre class="hljs"><code><span class="hljs-keyword">var</span> a=<span class="hljs-number">5</span></code></pre>`)).toBe('<pre class="hljs"><code><span class="hljs-keyword">var</span> a=<span class="hljs-number">5</span></code></pre>')
    expect(xssFilter(`<pre><code class="language-js"><pre class="hljs"><code><span class="hljs-keyword">var</span> a=<span class="hljs-number">5</span></code></pre></code></pre>`)).toBe(`<pre><code class="language-js"><pre class="hljs"><code><span class="hljs-keyword">var</span> a=<span class="hljs-number">5</span></code></pre></code></pre>`)
  })
  it('If class name is at, should not be remove', () => {
    expect(xssFilter(`<a class="at" href="#someone">@someone</a>`)).toBe('<a class="at" href="#someone">@someone</a>')
  })
})
