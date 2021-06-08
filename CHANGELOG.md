##### 0.5.7

* 修复接收到`code:101`(当前请求对象不存在)时发生的逻辑崩溃，第一次发布评论时，自动创建`Comment`表
* 更新`README`, 添加客户端配置步骤
* **serverURLs**会尝试根据`appId`自动获取
* 修复多次点击造成多次请求问题

##### 0.5.5 (2020-3-23)
* 修复`at`某个人标签`class`被删除bug
* 更新package

##### 0.5.4 (2020-3-22)

* 分离数据获取模块
* 修复`xssFilter`过滤代码块的`class`，导致无高亮的bug
* 优化`webpack dev`显示

##### 0.5.3 (2020-3-21)

* 修复部分bug
* 增加测试，覆盖度超过90%

##### 0.5.3 (2020-3-16)

* 增加主题(黑暗/明亮)模式
* 修复提交后，`textarea`不能恢复高度的bug
* 修改自定义`leancloud`上储存**评论**的Class默认名称为`"Comment"`(兼容之前版本和邮件回复功能)
* 增加自定义`leancloud`上储存**页面阅读量**的Class名称，默认为`"Counter"`

##### 0.5.1 (2020-3-15)

* `API`请求替换`leancloud-sdk`，显著减少包大小(parsed size from `479.2kb` to `331.92kb`)
* 自定义组件UI替换`material-ui`，显著减少包大小(parsed size from `331.92kb` to `216.48kb`)
* 增加自定义`leancloud`上Class名称，默认为`"Comment_demo"`

##### 0.5.0 (2020-3-13)

* 增加可编辑模式，基于`cookie`的token检测
* 当添加，回复，修改评论后，对目标评论增加一个显眼的闪烁效果
* 修复滚动精确度
* 调整部分UI，包括字体颜色，背景等

##### 0.4.1

* 修复用表情框连续输入，光标断层的bug

##### 0.4.0

* 修复`ValineContainer`内部`unmounted`后还存在`setState`的警告
* 添加修复测试
* 恢复默认leancloud服务器
* 调整UI，完善对移动端适配

##### 0.3.9

* 修复部分xss漏洞
* 临时修复leanCloud[无法访问问题](https://leancloudblog.com/domain-incident/)


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

