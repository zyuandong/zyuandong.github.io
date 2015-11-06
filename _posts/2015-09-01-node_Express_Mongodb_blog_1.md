---
title: 使用node.js开发博客系统系列01
category: node.js
tags: [node.js, Express, mongoDB]
---

# 搭建开发环境

## 一、课程介绍

1. 博客平台功能模块分析与设计
2. 搭建开发环境
3. 基于 nodeJS 和 Express 框架搭建路由模块

## 二、功能模块分析与设计

将开发一个简单的多人博客系统，默认称之为`LouBlog`，当然你也可以为其任意命名。

博客的功能比较简单，总结 LouBlog 的基本功能如下：

1. 用户管理：具备注册和登录的功能。
2. 文章管理：具备添加、删除、编辑以及查询的功能。
3. 附加功能：附加功能作为整个项目的完善部分。

下面将对这些功能模块进行一一分析。

### 3.1 用户管理

用户创建账号，通过此账号可登录 LouBlog 。

#### 3.1.1 添加用户

输入用户基本信息以创建新用户

### 3.2 文章管理

已登录的用户，可以添加、删除、编辑以及查询文章。

#### 3.2.1 添加文章

输入文章的基本信息，编写文章内容，即可发表。

#### 3.2.2 删除文章

只有文章的归属用户拥有删除权限，删除后，其他用户也就无法浏览这篇文章

#### 3.2.3 编辑文章

只有文章的归属用户拥有编辑权限。

#### 3.2.4 查询文章

输入查询关键字即可查询，支持模糊查询。

## 四、搭建开发环境

LouBlog 使用 nodeJS 搭建后台，使用最受欢迎的 web 框架 Express 快速搭建。

nodeJS 是基于 Chrome JavaScript 运行时建立的平台，用于方便地搭建响应速度快、易于扩展的网络应用。nodeJS 使用事件驱动，非阻塞 I/O 模型而得以轻量和高效。

Express 是一个基于 nodeJS 平台的极简、灵活的 web 应用开发框架，这好比如是 Flask 和 Python 的搭配一样。Express 拥有丰富的 HTTP 快捷方法和任意排列组合的 Connect 中间件，方便快速、简单地创建健壮、友好的 API

### 4.1 安装node.js

`node -v` 查看 nodejs 版本

#### 4.1.1 升级系统中的node.js

升级需要用到包管理工具 npm ，但由于网络原因，默认的 npm 下载源比较慢，可以考虑修改 npm 的下载源，这里我们使用taobao 的下载源

修改 npm 默认下载源，全局安装，命令之前加上 sudo

`sudo npm install -g cnpm --registry=https://registry.npm.taobao.org`

#### 注意：若执行了此条命令，那之后的npm都改为cnpm，所有的安装才会通过修改后的下载源进行下载安装。这一条希望大家牢记

升级所需的模块 n，虽然这个模块的名字很短，但它是专门用来管理nodeJS版本的。首先我们需要安装 n 模块：

`sudo cnpm install -g n`

接下来就可以通过这个模块升级nodeJS版本

`sudo n stable`

也可以指定nodeJS版本升级

`sudo n v0.12.7`

成功的话，`node -v` 后将看到 v0.12.7

### 4.2 使用Express生成项目框架

#### 4.2.1 安装 Express

在 Express v3.x 之前，还内置许多中间件，但在 v4.x 后，除了 static 都被分离为单独的模块，这也是许多初学者，面对的最大的问题，因为现在许多网上的文章还停留在 v3.x。

详情可以访问 [Express中文网](http://www.expressjs.com.cn/)。

先通过 npm 全局安装 Express：

`sudo cnpm install -g express`

v4.x 后还需要安装Express命令行工具：

`sudo cnpm install -g express-generator`

这样，才可以使用 express 命令，这也是 Express 升级为 v4.x 后出现的一个本不该是问题的问题。

#### 4.2.2 使用 Express

在安装好 Express 开发框架及其命令行工具后，就可以快速生成我们需要的项目框架了。执行下面这条命令：

`express -e LouBlog`

成功后便会生成所需的框架。

文件结构如下

```
|-- LouBlog
	|-- public
		|-- javascripts
		|-- images
		`-- stylesheets
			`-- style.css
	|-- routes
		|-- index.js
		`-- users.js
	|-- views
		|-- index.ejs
		`-- error.ejs
	|-- bin
		`-- www
	|-- app.js
	`-- package.json
```

简单了解一下 Express 都为我们准备好了什么：

+ LouBlog: 自然就是我们项目名，如果没有此文件夹，在创建项目框架时加上名称，就像刚刚执行完的那条命令，Express 就会自动帮我们创建此文件夹；若你在已是项目名的文件夹中生成框架，此项可省去。

+ public: 是我们项目的静态资源，存放 imgs、js、css 等文件；

+ routes: 可以说是整个项目的控制部分，存放路由文件；

+ views: 存放项目的视图文件；

+ bin: 存放可执行文件；

+ app.js: 项目的启动文件；

+ package.json:  文件中有项目的基本信息，包括项目名、版本号、开放权限、启动命令等；以及项目的模块依赖信息，当运行 `npm install` 时, npm 就会此文件，并根据 dependencies 对象中的属性安装模块。

简单了解了 Express 为我们生成的框架，有没有感受得到 Express 的强大呢，帮我做好了很多建站的基本工作，大大提高了效率。

#### 注意：希望大家能多多学习生成的文件内容，尤其是 app.js 、routes/index.js 、bin/www 这几个文件，结合 Express 官网学习；主动学习很重要、官方文档很重要、实践很重要。

接下来我们做一点点修改，方便我们启动项目服务，进入项目根目录，并安装项目的依赖模块：

`cd LouBlog`

`cnpm install`

修改 app.js 文件，
在文件最后的 `module.exports = app;` 之前添加一行代码 `app.listen(3000);`

最后一部执行启动命令：

`node app.js`

启动项目，通过浏览器访问 `localhost:3000`，即可看到结果

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid9061labid1356timestamp1441699640190.png/wm)

### 4.3 熟悉Express框架

#### 4.3.1 工作原理

接下来学习 Express 框架中非常重要的路由控制。

routers/index.js 中有以下代码：

```
router.get('/', functoin(req, res) {
    res.render('index', { title: 'Express' });
});
```

代码意思是当访问主页时，调用 ejs 模板（这里提到的 ejs 模板将会在下一节中详细讲解）来渲染 views/index.ejs 模板文件。
其中 get 指 http 的 get 请求方式，Express 封装了许多 http 请求方式，我们主要使用 `get()` 和 `post()` 两种;

+ 参数一：`'/'` 则代表了其路由规则，这里指向项目根目录，同时路由规则还支持正则表达式，这给我们设计路由带来很多的方便;
+ 参数二：为处理请求的回调函数，函数中又有两个参数 req 和 res，代表请求信息和响应信息。

路径请求及对应的获取路径有以下几种形式：

+ `req.query`: 处理get请求，获取get请求参数。
+ `req.body`: 处理post请求，获取post请求体。
+ `req.params`: 处理/:XXX形式的get或post请求，获取请求参数
+ `req.param()`: 处理get和post请求，但查找优先级由高到低为`req.params`  -> `req.body` -> `req.query`。

`res.render()` 则将所有数据以 json 格式传递给模板引擎。

#### 4.3.2 路由规则实践

现在我们直接访问 `localhost:3000/login` 会显示：

![未创建路由规则](https://dn-anything-about-doc.qbox.me/document-uid9061labid1356timestamp1441703944897.png/wm)

这是因为我们还没有建立 /login 这一路由规则

在 routers/index.js 文件中添加代码

```
router.get('/login', function(req, res, next) {
	res.render('login', {title: 'login'});
});
```

`Ctrl + c` 停止服务，`node app.js` 再次启动服务，访问 `localhost:3000/login` 后显示：

![未创建对应的视图模板文件](https://dn-anything-about-doc.qbox.me/document-uid9061labid1356timestamp1441703871058.png/wm)

出现这个错误是因为 view 中并没用 login 对应的文件，添加 login.ejs 文件，文件中写入 `<%= title %>`，直接刷新浏览器，这时便可以看到正确的显示：

![正确显示](https://dn-anything-about-doc.qbox.me/document-uid9061labid1356timestamp1441704219657.png/wm)

还记得之前简单讲解过 Express 生成的模板框架吗，routes 中存放路由文件，views 中存放视图文件，这就相当于 MVC 模式中的 C 和 V，而 index.ejs 文件中的 `<%= title %>` 是 ejs 模板引擎的语句，意思是将后台传递来的 title 数据在页面中显示出来。

现在你应该大致了解了 Express 的路由工作原理，但在刚在的操作中，我们发现每次修改后台代码时，想要浏览修改结果，就需要先重启服务。这无疑增加了开发的负担。

使用 supervisor 模块可以很好的解决这个问题，每当我们保存文件后，此模块便会自动重启服务，提高了开发效率。

首先要安装此模块：

`sudo cnpm install -g supervisor`

配置启动命令：

`supervisor app.js`

之后，我们的项目启动命名便从 `node app.js` 更改为 `supervisor app.js`

这样我们的开发环境已经初步配置完成，接下来我们根据 Express 的路由控制原则来设计我们的博客项目

## 五、搭建路由模块

依据我们博客指定好的功能，我们初步设计以下几个路由规则：

```
/login
/logout
/reg
/post
/search
/edit/:_id
/remove/:_id
```

以上几个路由规则分别对应“登录”、“退出登录”、“注册”、“发表文章”、“查询”、“编辑”、“删除”功能。

#### 注意：这里的路由规则设计省去了 http 的请求方式和回调函数 等逻辑部分，原因是希望同学们能通过之前的学习，自己理解并编写（Express 生成的模板中已经给出了很好的示范）；此外，在接下来的开发中， 还要依据每个功能模块来进行相应的修改，现在只需要能成功实现你设计的路由功能就好。

再分别建立好对应的视图文件：

```
views/login.ejs
views/register.ejs
views/index.ejs
views/post.ejs
views/search.ejs
views/edit.ejs
```

“删除”功能只是在请求完成后返回一个状态信息，因此不必要创建视图文件。