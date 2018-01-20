## 微信小程序 ---- 赶集工作通
基于微信开发者工具开发

### 文件目录
* 启动日志文件----------------logs    
* 欢迎页面--------------------index
* 登录页面--------------------login
* 注册页面--------------------register
* 职位列表页------------------postlist
* 职位详情--------------------postDetail
* 编辑求职意向----------------jobIntension
* 个人中心--------------------personcenter
* 编辑个人资料----------------myresume
* 简历列表--------------------resumeList
* 简历详情--------------------resumeInfor
* 消息列表--------------------information
* 面试消息列表----------------interviewInfor
* 投递反馈列表----------------deliverBack

### 公共组件
#### css
* 全局样式---------------------common/css/reset.wxss
* 底部tab----------------------common/css/footer.wxss
* 空白页-----------------------common/css/nodata.wxss

```
引入方式
@import "../../common/css/reset.wxss";
```

#### 模板
* 底部tab----------------------common/temolate/footer.wxml
* 空白页-----------------------common/temolate/nodata.wxml


```
引入方式
<import src="../../common/template/footer.wxml"/>
<template is="footer"/>
```

[点击进入微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html?t=1477656496953)
