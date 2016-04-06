---
title: node.js开发博客系统（三）
category: node.js
tags: [node.js, Express, mongoDB]
---

#  使用 mongoDB 数据库

## 一、课程介绍

这一节，我们将学习在 Express 框架如何操作 mongoDB 中的数据，以及如何配合 session 完成一些基本的逻辑状态判断，完成本节，我们的 LouBlog 博客系统也将初具模型。

## 二、使用 mongoDB 数据库

mongoDB 是一个基于分布式文件存储的非关系型数据库（NoSQL）的一种。它支持的数据结构非常松散，类似 json 的 bjson 格式。

mongoDB 没有关系型数据库中行和表的概念，但有类似文档 （document）和集合（collection）的概念。文档是 mongoDB 最基本的单位，集合是许多文档的总和，一个数据库可以有多个集合，一个集合可以有多个文档。

我们跳过安装这一步，但先要通过以下指令开启 mongoDB 服务;

开启服务：

`sudo service mongodb start`

在根目录下创建数据库存储目录，并启动服务：

`sudo mkdir /data/db`

`mongod`

最后输入 `mongo` 即可访问数据库。

### 2.1 连接 mongoDB

mongoDB 的服务启动后，开始编写程序建立连接，这里我们使用 mongoDB 的模型工具 -- mongoose，可以方便我们减化代码，并且这还是为 nodeJS 设计的。 
#### 2.1.1 使用 mongoose 连接 mongoDB

运行以下命令安装 mongoose 包：

`cnpm install mongoose --save`

接下需要修改 `app.js`，添加下面的代码：

```
//先引入 mongoose 模块
var mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost:27017/datas');
mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'));
```

刷新页面时，若没有报出 “连接数据库失败” 则成功连接数据库。接下来，我们便要建立数据库模型，向数据库中存储数据。

### 2.2 设置 schema

schema 是 mongoose 中的模型对象，就类似关系型数据库中的表结构，为 key/value 的键值对形式。

我们的博客系统中主要存储用户和文章两类数据，也就是需要建立两个模型对象，暂且叫做 `userSchema`、`articleSchema`。

在根目录下新建一个文件夹 `models`，再新建一个文件 `model.js`。

#### 2.2.1 设置 userSchema 

在 `models/model.js` 中引入 mongoose 模块，并定义 schema 模型对象：

```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
```

根据上一节实验中，我们统一定义的用户属性有 “用户名”、“密码”和“邮箱”，可以确定模型中的属性：`username`、`password`、`email`，此外考虑到以后操作数据的方便，在添加一个属性`createTime`。

就可以创建具体的模型对象：

```
var userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createTime: {
        type: Date,
        default: Date.now
    }
});
```

最后通过 mongoose 的 `model()` 方法，将 schema 发布为 model，model 具有抽象属性和行为的数据库操作对，这就使模型对象具有了数据库的 CRUD 操作方法。

```
exports.User = mongoose.model('User', userSchema);
```

#### 2.2.2 设置 articleSchema

同样是在 `models/model.js` 下，我们创建文章模型对象 -- articleSchema：

```
var articleSchema = new Schema({
    title: String,
    author: String,
    tag: String,
    content: String,
    createTime: {
        type: Date,
        default: Date.now
    }
})

//发布为 model 
exports.Article = mongoose.model('Article', articleSchema);	
```

#### 注意：此处创建好的 model 对应数据库中的集合，可以通过 `show colections` 查看数据库中的所有集合。

创建好模型，就可以操作数据了。

### 2.3 操作数据

#### 2.3.1 注册用户、发表文章

首先我们学习添加数据的操作 -- 注册用户和发表文章，在 `routes/index.js` 中，我们添加以下代码：

```
var mongoose = require('mongoose');
//引入加密模块
var crypto = require('crypto');

//引入模型对象
var model = require('../models/model');
var User = model.User;

router.post('/reg', function(req, res, next) {
    //req.body 处理 post 请求
    var username = req.body.username,
    password = req.body.password,
    passwordRepeat = req.body.passwordRepeat;
    
    //检查两次输入的密码是否一致
    if(password != passwordRepeat) {
        console.log('两次输入的密码不一致！');
        return res.redirect('/reg');
    }
    
    //检查用户名是否已经存在
    //mongoose findOne() 方法
    User.findOne({username:username}, function(err, user) {
        if(err) {
            console.log(err);
            return res.redirect('/reg');
        }
    
        if(user) {
            console.log('用户名已经存在');
            return res.redirect('/reg');
        }
    
        //对密码进行md5加密
        var md5 = crypto.createHash('md5'),
        md5password = md5.update(password).digest('hex');
        
        var newUser = new User({
            username: username,
            password: md5password,
            email: req.body.email
        });
    
        //mongoose save()方法
        newUser.save(function(err, doc) {
            if(err) {
                console.log(err);
                return res.redirect('/reg');
            }
            console.log('注册成功！');
            newUser.password = null;
            delete newUser.password;
            req.session.user = newUser;
            return res.redirect('/');
        });
    });
});
```
这样便实现了注册功能，需要注意 `req.body` 处理 post 请求的参数，建立 User 模型对象实体操作数据库，其实有 JavaScript 基础的同学应该很熟悉这样的写法。

再来是文章发表功能，这时就要用到 articleSchema 模型对象：

```
var Article = model.Article;

router.post('/post', function(req, res, next) {
    var data = new Article({
        title: req.body.title,
        //这里的 author 元素通过 session 获得，后面会详细讲解
        author: req.session.user.username,
        tag: req.body.tag,
        content: req.body.content
    });
    
    data.save(function(err, doc) {
        if(err) {
            req.flash('error', err);
            return res.redirect('/post');
        }
        console.log('文章发表成功！');
        return res.redirect('/');
    });
});
```

有了用户注册的基础，发表文章就简单许多了，但现在还没讲到 session 的运用，author 元素的值可以暂时通过 post 表单获得，稍后讲到 session 时，我们再改为上面的写法即可。

#### 2.3.2 删除文章

接下来是文章的删除操作，依然是 `routes/index.js`，修改我们第一节实验写好的路由规则 `/remove/:_id`：

```
//mongoose 的 remove() 方法，通过传递检索参数，直接删除检索结果
router.get('/remove/:_id', function(req, res, next) {

    //req.params 处理 /:xxx 形式的 get 或 post 请求，获取请求参数
    Article.remove({_id: req.params._id}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('文章删除成功！');
        }
        return res.redirect('back');
    })
});
```

#### 2.3.3 编辑文章

编辑文章，不仅需要获取文章信息，初始化表单内容，同时还需要有和发表文章一样的功能：

```
router.get('/edit/:_id', function(req, res, next) {
    Article.findOne({_id: req.params._id}, function(err, art) {
        if(err) {
            console.log(err);
            return res.redirect('back');
        }
        res.render('edit', {
            title: '编辑',
            // code ....
            art: art
        });
    });
});

router.post('/edit/:_id', function(req, res, next) {
    //mongoose 的 update() 方法用过检索参数并返回修改结果
    Article.update({_id: req.params._id},{
        title: req.body.title,
        tag: req.body.tag,
        content: req.body.content,
        createTime: Date.now()
    }, function(err, art) {
        if(err) {
            console.log(err);
            return res.redirect('back');
        }
        console.log('文章编辑成功！');
        return res.redirect('/u/' + req.session.user.username);
    });
});
```

#### 2.3.4 查询文章

这里我们可以通过正则表达式，实现模糊查询，因为 Express 路由规则支持正则匹配查询。

```
router.get('/search', function(req, res, next) {
    //req.query 获取 get 请求的参数，并构造为正则对象
    var query = req.query.title,
    title = new RegExp(query, 'i');
    Article
    .find({title: title})
    .sort('-createTime')
    .exec(function(err, arts) {
        if(err) {
            console.loh(err);
            return res.redirect('/');
        }
        res.render('search', { 
            title: '查询结果',
            arts: arts
        });
    });
});
```

完成以上四步，我们的博客系统就具有了基本的功能，但是还有几个小问题：

+ session 保存登录状态；
+ 控制访问权限；

解决这两个问题，就需要靠接下来我们将要学习的 session 。

## 三、创建 session

session 是一种持久网络协议，在客户端与服务器之间起到交换数据包的作用。用户登录后的基本信息都会保存其中，Express 也提供了会话中间件，同时我们还可以将会话信息存储到数据库中，便于维护。为此，我们需要引入两个中间件 express-session 和 connect-mongo，安装方式如下：

### 3.1 引入中间件，创建 session

```
cnpm install express-session --save
cnpm install connect-mongo --save
```

接着我们要在 `app.js` 中添加以下代码：

```
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//这里设置 session 参数，并确保以下代码在 `app.use('/', routes)` 前引入
app.use(session({
    key: 'session',
    secret: 'keboard cat',
    cookie: {maxAge: 1000 * 60 * 60 * 24},//1day
    store: new MongoStore({
        db: 'datas',
        mongooseConnection: mongoose.connection
    }),
    resave: false,
    saveUninitialized: true
}));
```

完成对 `app.js` 的以上修改之后，我们便能通过 `req.session` 获取当前用户的会话对象，获取用户的相关信息。

### 3.2 使用 session

举两个例子：

之前提到过的发表文章，其中的 author 属性需要通过获取 session 中保存的用户信息，此处我们就可以修改发表文章的方法以实现我们的需求：

```
router.post('/post', function(req, res, next) {
	var data = new Article({
        title: req.body.title,
        //这里的 author 元素通过 session 获得
        author: req.session.user.username,
        tag: req.body.tag,
        content: req.body.content
    });

    data.save(function(err, doc) {
        if(err) {
            console.log(err);
            return res.redirect('/post');
        }
        console.log('文章发表成功！');
        return res.redirect('/');
    });
});
```

session 另一个很大的作用就是判断用户登录状态并控制页面的元素显示：

我们就修改上一节给出的导航条代码，修改如下：

```
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">实验楼</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <% if(user) { %>
            <ul class="nav navbar-nav navbar-left">
                <li><a href="/post">发表</a></li>
            </ul>
            <% } %>
            <ul class="nav navbar-nav navbar-right">
                <% if(user) { %>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <%= user.username %>
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="/u/<%= user.username %>">账户信息</a></li>
                        <li><a href="/logout">退出登录</a></li>
                    </ul>
                </li>
                <% } else { %>
                <ul class="nav navbar-nav">
                    <li><a href="/login">登录</a></li>
                    <li><a href="/reg">注册</a></li>
                </ul>
                <% } %>
            </ul>
            <form class="navbar-form navbar-right" role="search" action='/search' method="get">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search" name="title">
                </div>
                <button type="submit" class="btn btn-default">搜索</button>
            </form>
        </div>
    </div>
</nav>
```

代码中我们可以看到有许多判断，其中的参数 user 便是通过 session 获取的用户信息，为此，我们还需要在 `res.render()` 中传递 session：

```
res.render('index', { 
    title: '主页',
    user: req.session.user
    // code ....
});
```