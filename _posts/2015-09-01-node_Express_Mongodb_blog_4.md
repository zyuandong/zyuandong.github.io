---
title: 使用node.js开发博客系统系列04
category: node.js
tags: [node.js, Express, mongoDB]
---

# 功能模块整理

## 一、课程介绍

本节课程作为整个系列教材的最后一节，主要是为我们的 LouBlog 博客系统扩展一些功能。

## 二、扩展功能

### 2.1 添加 flash 信息提示

上一节我们完成了博客系统的基本功能，但是有心的同学会发现，示例代码里很多的 `console.log()` 信息提示，这是打印一些返回信息以帮助我们调试代码，但不知有多少同学这样思考过 -- 每次刷新调试，都要看服务程序的信息提示好不方便，要是刷新就能在页面显示这些提示可好，此外，用户登录，发表文章，成功还好，要是哪出错了却没有任何提示多不方便。

恭喜你已经能够主动思考、学习，接着往下你应该就会自己查询解决办法了吧。

只要走到这一步，相信大家就知道 flash 模块能很好地帮助我们实现这一功能：

flash 存储于 session 中，但与之前我们存入的用户登录信息不同，flash 信息将会在下一次刷新后被清楚。

首先还是安装模块，并引入：

```
cnpm install connect-flash --save

// app.js 中
var flash = require('connect-flash');
app.use(flash());
```

这样，我们便成功引入了 flash 模块，接下来就可以将所有的 `console.log()` 使用 `req.flash('type', content)` 替换，其中参数一是一个字符串，代表了信息的类型，我们常用的就是 'success' 和 'error' 两种，参数二就是信息的具体内容。

这只是将信息保存到了 session 中，想要在页面中展示，我们就必须要从 session 中获取并传递给 ejs 模板，方法如下：

```
// code ...
    res.render('xxx', {
        // ...
        success: req.flash('success').toString();
        error: req.flash('error').toString();s
        // ...
    });
// code ...
```

模板获得信息后就可以通过简单的判断语句展示这一内容：

```
<% if(success) { %>
    <%= success %>
<% } %>
```

// error 同上，样式可以通过 bootstrap 调整。

这就是我们添加 flsh 信息提示的大致过程。

### 2.2 添加分页功能

分页功能是很常见的一个功能，当展示的信息条目很多时能分批次显示，减小了浏览器压力，避免渲染速度过慢。

要实现分页的功能，主要需要考虑这几个元素：“当前页码”，“每页展示个数”，“条目总数”；此外分页主要有两种展示形式：“只有上/下一页”，“展示多个页码”。我们就尝试实现简单的 “只有上/下一页”。

修改 `views/index.ejs`：

```
var page = 1;
var pageSize = 5;
router.get('/', function(req, res, next) {
	page = req.query.page ? parseInt(req.query.page) : 1;
	Article
	.count(function(err, total) {
		Article
		.find()
		//skip 跳过指定的页数
		.skip((page - 1) * pageSize)
		//限制读取 pageSize 条数据
		.limit(pageSize)
		//以 createTime 倒序排序
		.sort('-createTime')
		//执行回调方法
		.exec(function(err, arts) {
			if(err) {
				req.flash('error',err);
				return res.redirect('/');
			}
			res.render('index', { 
				title: '主页',
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString(),
				total: total,
				page: page,
				pageSize: pageSize,
				isFirstPage: (page - 1) == 0,
				isLastPage: ((page - 1) * pageSize + arts.length) == total,
				arts: arts
			});
		});
	});
});
```

将所有数据传递给模板后，剩余的事就简单了许多。其中的 `skip()` 和 `limit()` 是实现分页的关键部分，也有很多人说当数据量少的时候，`skip()` 的效率还可以，但当数据量很大的时候，效率就会很差。大家有兴趣可以查阅资料，尝试发现效率更高的方法。

