---
layout: default
title: 使用 nodeJS 开发博客系统系列<4>
tags: nodeJS Express mongoDB
monthLast: true
---

# 功能模块整理

## 一、实验说明

下述介绍为实验楼默认环境，如果您使用的是定制环境，请修改成您自己的环境介绍。

### 1. 环境登录

无需密码自动登录，系统用户名shiyanlou，密码shiyanlou

### 2. 环境介绍

本实验环境采用带桌面的Ubuntu Linux环境，实验中会用到桌面上的程序：

1. LX终端（LXTerminal）: Linux命令行终端，打开后会进入Bash环境，可以使用Linux命令
2. Firefox：浏览器，可以用在需要前端界面的课程里，只需要打开环境里写的HTML/JS页面即可
3. GVim：非常好用的编辑器，最简单的用法可以参考课程[Vim编辑器](http://www.shiyanlou.com/courses/2)

### 3. 环境使用

使用GVim编辑器输入实验所需的代码及文件，使用LX终端（LXTerminal）运行所需命令进行操作。

完成实验后可以点击桌面上方的“实验截图”保存并分享实验结果到微博，向好友展示自己的学习进度。实验楼提供后台系统截图，可以真实有效证明您已经完成了实验。

实验记录页面可以在“我的主页”中查看，其中含有每次实验的截图及笔记，以及每次实验的有效学习时间（指的是在实验桌面内操作的时间，如果没有操作，系统会记录为发呆时间）。这些都是您学习的真实性证明。

## 二、课程介绍

本节课程作为整个系列教材的最后一节，主要是为我们的 LouBlog 博客系统扩展一些功能。

## 三、扩展功能

### 3.1 添加 flash 信息提示

上一节我们完成了博客系统的基本功能，但是有心的同学会发现，示例代码里很多的 `console.log()` 信息提示，这是打印一些返回信息以帮助我们调试代码，但不知有多少同学这样思考过 -- 每次刷新调试，都要看服务程序的信息提示好不方便，要是刷新就能在页面显示这些提示可好，此外，用户登录，发表文章，成功还好，要是哪出错了却没有任何提示多不方便。

恭喜你已经能够主动思考、学习，接着往下你应该就会自己查询解决办法了吧。

只要走到这一步，相信大家就知道 flash 模块能很好地帮助我们实现这一功能：

flash 存储于 session 中，但与之前我们存入的用户登录信息不同，flash 信息将会在下一次刷新后被清楚。

首先还是安装模块，并引入：

~~~
cnpm install connect-flash --save

// app.js 中
var flash = require('connect-flash');
app.use(flash());
~~~

这样，我们便成功引入了 flash 模块，接下来就可以将所有的 `console.log()` 使用 `req.flash('type', content)` 替换，其中参数一是一个字符串，代表了信息的类型，我们常用的就是 'success' 和 'error' 两种，参数二就是信息的具体内容。

这只是将信息保存到了 session 中，想要在页面中展示，我们就必须要从 session 中获取并传递给 ejs 模板，方法如下：

~~~
// code ...
    res.render('xxx', {
        // ...
        success: req.flash('success').toString();
        error: req.flash('error').toString();s
        // ...
    });
// code ...
~~~

模板获得信息后就可以通过简单的判断语句展示这一内容：

~~~
<% if(success) { %>
    <%= success %>
<% } %>

// error 同上，样式可以通过 bootstrap 调整。问题：这样许多页面都需要信息提示，我们应该在何处做以上调整？
~~~

这就是我们添加 flsh 信息提示的大致过程。

### 3.2 添加分页功能

分页功能是很常见的一个功能，当展示的信息条目很多时能分批次显示，减小了浏览器压力，避免渲染速度过慢。

要实现分页的功能，主要需要考虑这几个元素：“当前页码”，“每页展示个数”，“条目总数”；此外分页主要有两种展示形式：“只有上/下一页”，“展示多个页码”。我们就尝试实现简单的 “只有上/下一页”。

修改 `views/index.ejs`：

~~~
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
~~~

将所有数据传递给模板后，剩余的事就简单了许多。其中的 `skip()` 和 `limit()` 是实现分页的关键部分，也有很多人说当数据量少的时候，`skip()` 的效率还可以，但当数据量很大的时候，效率就会很差。大家有兴趣可以查阅资料，尝试发现效率更高的方法。

## 四、本节总结

作为系列实验的最后一节，主要是完成的一些功能的扩展，使我们的 LouBlog 博客系统更充实，之后就是针对重要知识点又做了一点简单的总结。

再总结一下整个系列的实验，很多都是简单讲了一下课程的只是点，示例代码并不多，这可能会给很多同学带来学习的障碍，但这并不是放弃继续的理由。讲的很清楚固然能帮你快速完成代码编写，但也只是完成了代码而已，希望大家能尝试在这种点到即止的方式中去查找解决办法。

实验楼的问答等等很多地方都是你寻求解答的地方，遇到问题，先思考，再解决，最后再寻求帮助，当这一套流程完毕后，相信你会有惊喜的发现。

## 五、实验报告

请按照本节实验的步骤创建并提交 LouBlog v0.4 版本。在实验报告中详细描述你的操作过程。完成后点击公开实验报告，将会收到教师的点评指导。
