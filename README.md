> 轻量级评论插件[Valine](https://github.com/xCss/Valine)的`React`版本。

[![Build Status](https://travis-ci.org/stonehank/react-valine.svg?branch=master)](https://travis-ci.org/stonehank/react-valine)
[![npm](https://img.shields.io/npm/v/react-valine.svg)](https://www.npmjs.com/package/react-valine)
[![codecov](https://codecov.io/gh/stonehank/react-valine/branch/master/graph/badge.svg)](https://codecov.io/gh/stonehank/react-valine)


### 新增特性

1. 增加评论数和阅读量统计组件，可以在任意位置调用。

2. 优化表情输入，通过输入`:`开启表情选择框

2. 开发者可以定义嵌套和非嵌套的回复列表模式。

3. 头像自定义，用户可以选择头像(一共`8`种)，如果你填写的邮箱在[gravatar](http://gravatar.com)注册，那么将会获取你的头像加入到选项中。

4. 优化实时预览。

### 效果查看

[点击查看](https://stonehank.github.io/react-valine/)


### 待添加特性

- [x] 阅读量统计
- [x] 优化表情输入
- [x] 邮件回复
- [x] 多语言支持
- [ ] 垃圾评论处理
- [x] 增加测试
- [ ] 支持自定义主题
- [ ] 支持编辑，删除(发出的`10`分钟内)

### 使用说明

* 安装

`npm install react-valine`


### 组件说明：

####  Valine

创建`React.createContext`，并且传递`自定义参数`和储存当前`count`的组件(避免重复请求)。

参数：

|参数|是否必须|作用|默认值|
|:---:|:---:|:---:|:---:|
|appId|是|leancloud上的appId|/|
|appKey|是|leancloud上的appKey|/|
|requireName|否|是否必须填写昵称|true|
|requireEmail|否|是否必须填写邮箱|false|
|placeholder|否|评论框占位提示符|说点什么吧|
|nest|否|回复样式是否为嵌套模式|true|
|nestLayers|否|开启嵌套模式后有效，配置嵌套的层数|Infinity|
|pageSize|否|评论列表分页，每页条数|10|
|emojiListSize|否|输入`:`显示`emoji`的条数|5|
|sofaEmpty|否|无评论时显示|快来做第一个评论的人吧~|
|previewShow|否|是否默认开启实时预览|true|
|lang|否|支持中文(zh-cn)和英文(en)|zh-cn|
|customTxt|否|自定义内部文字|参考assets/locales.json|


案例参考：

index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import {Valine} from "react-valine";
const appId='xxxxxxx-xxxx'
const appKey='xxxxxxxxx'

// 此处为全局导入，在App内部任意位置都可以使用<ValineCount />和<ValinePanel />
ReactDOM.render(
  <Valine  appId={appId}
           appKey={appKey}
           pagesize={12} 
           customTxt={
             {
               tips:{sofa:"抢个沙发吧~"},
               ctrl:{more:"再给我来一打"}
             }
           }>
    <App />
  </Valine>
  , document.getElementById('root'));
```

#### ValineCount

获取当前`uniqStr`的评论数。

参数：

|参数|是否必须|作用|默认值|
|:---:|:---:|:---:|:---:|
|uniqStr|否|一个独立值，用于获取当前页面评论|window.location.origin+window.location.pathname|
|style|否|组件的样式|''|
|count|否|未获取时的初始值|获取中|

> 注意：uniqStr必须是一个独立值，强烈建议自己填写一个独立值，而不是用默认值，因为如果使用默认值，当需要获取评论数时，并不一定在当前评论页的`uniqStr`上，就会获取错误或者失败。

案例参考：

articleMeta.js
```js
import React from 'react';
import {ValineCount} from "react-valine";

class ArticleMeta extends React.Component{
  render(){
    const {createdAt,author,a_unique_string}=this.props
    return (
      <div>
        <span>创建日期：{createdAt}</span>
        <span>作者：{author}</span>
        <span>评论数：<ValineCount uniqStr={a_unique_string}/></span>
      </div>
    )
  }
}
```

#### ValinePageview

阅读量统计组件。

参数：

|参数|是否必须|作用|默认值|
|:---:|:---:|:---:|:---:|
|uniqStr|否|一个独立值，用于获取当前页面评论|window.location.origin+window.location.pathname|
|style|否|组件的样式|''|
|count|否|未获取时的初始值|获取中|
|title|否|当前组件对应的文章标题，用于方便后台查看|document.title|

> 注意：uniqStr必须是一个独立值，强烈建议自己填写一个独立值，而不是用默认值，因为如果使用默认值，当需要获取评论数时，并不一定在当前评论页的`uniqStr`上，就会获取错误或者失败。

articleMeta.js
```js
import React from 'react';
import {ValineCount} from "react-valine";

class ArticleMeta extends React.Component{
  render(){
    const {createdAt,author,a_unique_string}=this.props
    return (
      <div>
        <span>创建日期：{createdAt}</span>
        <span>作者：{author}</span>
        <span>评论数：<ValineCount uniqStr={a_unique_string}/></span>
        <span>阅读量：<ValinePageview uniqStr={a_unique_string} title={"JS基础教程"} /></span>
      </div>
    )
  }
}
```

#### ValinePanel

评论面板，一般放在文章页最尾端。

参数：

|参数|是否必须|作用|默认值|
|:---:|:---:|:---:|:---:|
|uniqStr|否|一个独立值，用于获取当前页面评论|window.location.origin+window.location.pathname|
|useWindow|否|配置执行滚动时所依赖的父元素|true|
|getPanelParent|否|`useWindow`为`false`时，可以自定义滚动父组件，默认滚动父组件为`panel.parentNode`|null|

> 注意：uniqStr必须是一个独立值，强烈建议自己填写一个独立值，而不是用默认值，因为如果使用默认值，当需要获取评论数时，并不一定在当前评论页的`uniqStr`上，就会获取错误或者失败。

#### modify_hljs

一个自定义`highlight`的方法。

由于直接引入`highlight`文件体积过大，因此使用按需加载。

默认提供`js`和`java`的代码高亮显示。

案例参考：

增加`python`代码高亮。
```js
import {modify_hljs} from "react-valine";

modify_hljs((hljs)=>{
  const python = require('highlight.js/lib/languages/python');
  hljs.registerLanguage('python', python);
  return hljs
})

```

更多关于[异步加载highlight](https://highlightjs.org/usage/)的介绍。


### 邮件回复

参考[Valine-Admin](https://github.com/zhaojun1998/Valine-Admin)

### Changelog

##### 0.4.1

* 修复用表情框连续输入，光标断层的bug

##### 0.4.0

* 修复`ValineContainer`内部`unmounted`后还存在`setState`的警告
* 添加修复测试
* 恢复默认leancloud服务器
* 调整UI，完善对移动端适配

##### 0.3.9

* 修复部分xss漏洞
* 临时修复leanCloud[无法访问问题](https://blog.avoscloud.com/6805/)


##### 0.3.8

* 增加网址输入中切换协议按钮
* 增加底部的评论按钮
* 增加测试

##### 0.3.7

* 回复后自动展开
* 精确滚动位置(点击回复和提交后的滚动)
* 添加参数`useWindow`和`getPanelParent`，配置执行滚动时所依赖的父元素，默认为`true`
* `Valine`新增参数`emojiListSize`，控制`emoji`列表的最大显示数，默认为`5`
* 过长的内容展示`Click on expand`
* 分离服务端获取数据模块`FetchResourceContainer`和更新数据模块`ValineContainer`
* 修复获取更多时按钮不消失的bug
* 修复初始获取数据时进行提交出现重复评论的bug
* 修复无评论时出现"已经到最后"的bug
* 增加测试

##### 0.3.6

* 添加基础组件测试
* 添加部分utils方法测试
* 添加参数`nestLayers`，用于配置嵌套层数
* 优化组件逻辑结构
* 修复表情选择框弹出位置不对的bug
* 修复表情选择框鼠标点击无法取消的bug

##### 0.3.5

* 增加访问次数统计
* 增强编辑框的TAB键(多行Tab)

##### 0.3.4

* 修复文字错误
* 原`url`字段用于邮件获取地址，新增`uniqStr`字段，用于获取页面评论

##### 0.3.3

* 多语言支持
* 提供文字修改参数`customTxt`，可完全自定义文字

##### 0.3.2

* 统一与`Valine`的接口
* 可以开启邮件回复，具体参考[Valine-Admin](https://github.com/zhaojun1998/Valine-Admin)

##### 0.3.1

* 修复头像css错位问题

##### 0.3.0

* 修复增加回复后，`ValineCount`不变化
* 更新React依赖为16.8.6
* 优化表情输入

    * 优选150+常用表情
    * 通过输入`:`开启表情选择框，可以使用`Enter`，`Esc`，`↑`，`↓`键位进行操作
* 修复可能出现的回复`a`标签错误渲染

##### 0.2.1

* 修复leancloud多次init

