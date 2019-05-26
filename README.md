> 轻量级评论插件[Valine](https://github.com/xCss/Valine)的`React`版本。

#### 新增特性

1. 增加外部计数器。

2. 开发者可以定义嵌套和非嵌套的回复列表模式。

3. 头像自定义，用户可以选择头像(一共`8`种)，如果你填写的邮箱在[gravatar](http://gravatar.com)注册，那么将会获取你的头像加入到选项中。

4. 优化实时预览。

#### 使用说明

* 安装

`npm install react-valine`


组件说明：

###  VaLine

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
|pageSize|否|评论列表分页，每页条数|10|
|sofaEmpty|否|无评论时显示|快来做第一个评论的人吧~|
|previewShow|否|是否默认开启实时预览|true|


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
  <Valine  appId={appId} appKey={appKey}>
    <App />
  </Valine>
  , document.getElementById('root'));
```

### ValineCount

获取当前`path`的评论数。

参数：

|参数|是否必须|作用|默认值|
|:---:|:---:|:---:|:---:|
|path|否|一个独立值，用于获取当前页面评论|window.location.origin+window.location.pathname|
|style|否|组件的样式|''|
|count|否|未获取时的初始值|获取中|

> 注意：path必须是一个独立值，强烈建议自己填写一个独立值，而不是用默认值，因为如果使用默认值，当需要获取评论数时，并不一定在当前评论页的`url`上，就会获取错误或者失败。

案例参考：

articleMeta.js
```js
import React from 'react';
import {ValineCount} from "react-valine";

class ArticleMeta extends React.Component{
  render(){
    const {createdAt,author,a_unique_path}=this.props
    return (
      <div>
        <span>创建日期：{createdAt}</span>
        <span>作者：{author}</span>
        <span>评论数：<ValineCount path={a_unique_path}/></span>
      </div>
    )
  }
}
```

### ValinePanel

评论面板，一般放在文章页最尾端。

参数：

|参数|是否必须|作用|默认值|
|:---:|:---:|:---:|:---:|
|path|否|一个独立值，用于获取当前页面评论|window.location.origin+window.location.pathname|

> 注意：path必须是一个独立值，强烈建议自己填写一个独立值，而不是用默认值，因为如果使用默认值，当需要获取评论数时，并不一定在当前评论页的`url`上，就会获取错误或者失败。

### modify_hljs

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