---
title: 使用node.js开发博客系统系列<2>
category: node.js
tags: [node.js, Express, mongoDB]
---

# 实现博客前后端数据传递

## 一、课程介绍

这节课程主要为两个部分，一是讲解 ejs 模板引擎的；二是修改上一节简单设计的每个路由规则的回调函数，并通过模拟数据跑通前后端，实现其逻辑功能。

## 二、前端模板引擎

### 2.1 什么事模板引擎

模板引擎是一个将页面模板和数据数据结合起来生成 HTML 页面的工具。通过模板引擎，我们可以在 HTML 文件中直接使用后台传递过来的数据，而不必再使用通过解析 json 数据，在拼接成字符串的形式渲染数据，大大提高了开发效率。

### 2.2 什么是ejs

大家是否还记得上一节，我们使用 Express 生产项目框架的命令，

`express -e LouBlog`

看过 Express API 的同学可能比较清楚，这里的 -e 正是指定 ejs 作为我们的模板引擎，而默认的模板引擎是 jade 。

那为何要选择 ejs ，不选 jade？很大的一个原因是因为 ejs 的语法更符合前端开发者的习惯，项目的目的是为了能让大家学会这一套开发流程，而不仅仅是一个模板引擎；反观 jade ，很多初学者都很难马上适应这中语法，更符合后台开发者的习惯，特别是对缩进的严格要求，使得大家感觉与 Python 很像。

但这并不是说 jade 比 ejs 有多差，相反，有人做过测试，jade 的性能反而好过 ejs。这里只是为了大家快速上手开发，所以选择了ejs。大家有时间也可以尝试使用 jade 开发本课程，亲身体验一下二者的差别吧。

### 2.3 使用ejs

在 Express 自动生成项目框架时，有这么两行代码

~~~
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
~~~

这里设置了模板文件的存储位置和使用的模板引擎。

在 routers/index.js 中通过  `res.render()` 渲染模板。它接收两个参数，第一个是模板名称，即 views 目录下的模板文件名；第二个参数是传递给模板的数据对象。

举个例子：当代码为 `res.render('index', {title: 'Express'});` 时，模板引擎会把 `<%= title %>`  替换为 Express ，然后把替换后的页面展示给用户。

相对于 jade 来说，ejs 非常简单，只有三种标签：

+ `<% code %>`: javascript代码，这代表我们能使用 `if-else` 之类的逻辑判断语句
+ `<%= code %>`: 显示替换过HTML特殊字符的内容
+ `<%- code %>`: 显示原始HTML内容

### 2.4 页面布局

使用模板的一个原因，除了能方便处理数据，还有一点就是模板可以重用，我们可以将共用的部分分离为一个文件，并通过 include 引入。

#### 2.4.1 分离共用模块

ejs 模板引擎的 include 语法简单粗暴，它不像许多模板能够引入成对的标签，而是硬生生将正常的 HTML 页面截断，直接将成对的标签分在了不同的文件当中。

我们先来搭建一个首页 index.ejs，课程**最终**完成的样式如下：

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid9061labid1361timestamp1441935469652.png/wm)

~~~
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title><%= title %></title>
		<link rel="stylesheet" href="/stylesheets/style.css">
		<body>
		<nav>
			<ul>
				<li><a href="#">register</a></li>
				<li><a href="#">login</a></li>
				<li><a href="#">post</a></li>
				<li><a href="#">logout</a></li>
			</ul>
		</nav>
		<div id="container">
		    <%= title %>
		</div>
	</body>
</html>
~~~

从这个页面的构造，以及我们之前的功能设计可以看出，`<nav>` 部分的导航条是共用部分，也就是在其页面都有出现，这就可以用到 `include` 将其提取为一个文件。

使用 `include` 后的文件及内容：

`views/header.ejs` 文件：

~~~
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title><%= title %></title>
		<link rel="stylesheet" href="/stylesheets/style.css">
		<body>
		<nav>
			<ul>
				<li><a href="#">register</a></li>
				<li><a href="#">login</a></li>
				<li><a href="#">post</a></li>
				<li><a href="#">logout</a></li>
			</ul>
		</nav>
		<div id="container">
~~~

`views/footer.ejs` 文件：

~~~
        </div>
    </body>
</html>
~~~

修改过后的 `views/index.ejs` 文件为：

~~~
<%- include header %>
<%= title %>
<%- include footer %>
~~~

以上便是 `include` 的简单使用方法，ejs 模板引擎的基本功能也梳理完毕，在接下来的学习中，进一步体会 ejs 的魅力吧。

## 三、设计页面

接下来，我们主要完成前端的展示部分，使用 bootstrap 前端框架快速搭建样式优(bu)美(chou)的响应式页面。

### 3.1 使用 bootstrap 前端框架

在此也就不用太多的篇幅讲解 bootstrap，主要是给出几个示例，讲解在 Express 框架中 bootstrap 的使用方法。

### 3.1.1 引入 bootstrap

#### 注意：bootstrap 所有的 JavaScript 插件都依赖 jquery， 并且通过查看 bootstrap 的官方文档就可以知道，bootstrap 所依赖的 jquery 版本最低为 v1.9.1，因此，还需要大家自己尝试引入 jquery 文件。

再补充一下 bootstrap 的几种安装方式：

+ 手动下载并导入项目：从官网下载所需的 bootstrap 开发包，选择“用于生产环境的 bootstrap”，需要的文件为 `fonts/*`、`js/bootstrap.min.js`、`css/bootstrap.min.css`；

+ 通过 npm 安装：执行 `cnpm install bootstrap --save`。此时 bootstrap 就相当于一个模块，通过 `require('bootstrap')` 导入后使用；

+ 通过 bower 安装：执行 `bower install bootstrap`。bower 是客户端技术的软件包管理器，方便管理客户端依赖关系，在安装 bootstrap 之前应该先执行 `cnpm install bower --save` 安装 bower；

+ 使用CDN加速服务：bootstrap 中文网提供了免费的 CDN 加速服务，复制以下代码，即可使用：

~~~
<link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">

<script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>

<script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
~~~

建议你使用 bower 安装 bootstrap，在 public/ 下执行 `bower install bootstrap jquery` ，便可以通过路径引入相关文件

### 3.1.2 使用 bootstrap

在 `viwes/header.ejs` 中添加上面的代码，并将 `<nav>` 部分替换为 bootstrap 的导航条组件：

~~~
<nav class="navbar navbar-inverse navbar-fixed-top">
	<div class="container-fluid">
		<div class="navbar-header">
		    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
		        <span class="sr-only">Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		    </button>
		    <a class="navbar-brand" href="/">LouBlog</a>
		</div>

		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav navbar-left">
				<li><a href="/post">post</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
							username
						<span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
						<li><a href="#">about</a></li>
						<li><a href="/logout">logout</a></li>
					</ul>
				</li>
				<ul class="nav navbar-nav">
					<li><a href="/login">login</a></li>
					<li><a href="/reg">register</a></li>
				</ul>
			</ul>
			<form class="navbar-form navbar-right" role="search" action='/search' method="get">
				<div class="form-group">
					<input type="text" class="form-control" placeholder="Search" name="title">
				</div>
				<button type="submit" class="btn btn-default">search</button>
			</form>
		</div>
	</div>
</nav>
~~~

这段代码中就是使用 bootstrap 的一个简单例子，也只用到了导航条组件，除此之外，我们开发博客系统还可能用到表单样式，栅格系统等，同学们可选择合适的组件，当然也可以使用其他前端框架，比如 AmazeUI 等，开发自己的博客系统。

另外需要提出的一点是，在上面的导航条中，同时出现了“登录”和“用户信息”等逻辑上不该同时出现的按钮。这就需要通过 session 机制来判断用户的登录状态，并返回应该显示在页面中的按钮选项。这将在下一节，添加 mongoDB 后做详细的讲解。

### 3.2 自己搭建页面样式

这一步主要是使用 bootstrap 框架，搭建每一个功能模块的页面样式，自己可以更具自己的喜好，自由发挥，在此列出每一个页面必要的元素，以方便后期讲解的统一。

`views/login.ejs`（登录页面）：

构建一个 form 表单，需填写的内容包括 “用户名” 和 “密码”。

`views/register.ejs`（注册页面）：

一个 form 表单，需填写的内容包括 “用户名”、“密码”、“确认密码”和“邮箱”。

`views/index.ejs`（主页）：

主页展示文章信息，有 “标题”、“作者”、“创建日期”、“标签”和“文章内容”。

`views/post.ejs`（发表页面）：

form 表单，需要填写的内容包括 “标题”，“标签”和“文章内容”，至于 “作者”和“创建时间” 将通过其他方式记录。

`views/search.ejs`（查询结果页面）：

展示内容和主页一致。

`views/edit.ejs`（编辑页面）：

form 表单，和发表页面一致，需要自动填写原有的数据，方便编辑。

### 3.3 模拟数据

接下来，我们通过修改 `routes/index.js` 向模板传递模拟数据，方便我们理解数据传递过程、编写首页样式。

跳转首页的路由规则为：

~~~
router.get('/', function(req, res, next) {
	res.render('index', {title: '主页'});
});
~~~

上一节提到，`res.render()` 会将数据传递给模板，其中参数一便是对应的模板，这里便是 `index.ejs`，而数据便是 `{...}` 这一对象。所以，我们编写的模拟数据，就写在这个对象里，以 json 格式为标准。

~~~
router.get('/', function(req, res, next) {
	res.render('index', {
	    title: '主页',
	    arts: [{
	        title: 'nodeJS入门',
	        tags: 'nodeJS',
	        author: '...',
	        createTime: '',
	        content: '...'
	    },{
	        title: 'nodeJS入门',
	        tags: 'nodeJS',
	        author: '...',
	        createTime: '',
	        content: '...'
	    },{
	        title: 'nodeJS入门',
	        tags: 'nodeJS',
	        author: '...',
	        createTime: '',
	        content: '...'
	    }]
    });
});
~~~

这里简单添加了三条数据，模板 `views/index.ejs` 中添加：

~~~
<% arts.forEach(function(art) { %>
	<%= art.title %>
	<%= art.tags %>
	<%= art.author %>
	<%= art.createTime %>
	<%= art.content %>
<% }) %>
~~~

这样，模板便成功的从后台得到了数据，并展示到页面中。页面样式很粗糙，这需要同学们自己完成。