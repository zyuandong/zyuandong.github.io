---
title: meteor+angular.js搭建简易论坛02
category: angular.js
tags: [meteor, angular.js]
---

## 添加路由控制

添加用户模块之前，先添加路由控制。我们使用Angular的`ui-router`模块，添加路由功能。

首先添加`ui-router`模块到项目：

```
$ meteor add angularui:angular-ui-router
```

在`client`文件夹下新建`lib`文件夹，然后把`app.js`文件移动到lib文件夹下面，然后把`ui-router`添加到Angular模块依赖中，修改`app.js`代码，如下所示：

```
angular.module('louForum', ['angular-meteor', 'ui.router']);
```

在client文件夹下创建`routes.js`文件，通过`angular-ui-router`定义注册和登录的路由，代码如下：

```
angular.module('louForum').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $stateProvider
            // 首页
            .state('home', {
                // 定义URL
                url: '/',
                // 指定模板（文件必须以“.ng.html”后缀结尾）
                templateUrl: 'client/home/views/home.ng.html',
                // 指定控制器
                controller: 'HomeCtrl'
            })
            // 注册页面
            .state('register', {
                url: '/register',
                templateUrl: 'client/user/views/register.ng.html',
                controller: 'RegisterCtrl',
                // 设置当前控制器中 $scope 的一个引用为 rc
                controllerAs: 'rc'
            })
            // 登录页面
            .state('login', {
                url: '/login',
                templateUrl: 'client/user/views/login.ng.html',
                controller: 'LoginCtrl',
                controllerAs: 'lc'
            })
            // 退出登录
            .state('logout', {
                url: '/logout',
                resolve: ['$meteor', '$state', function($meteor, $state) {
                    return $meteor.logout().then(function() {
                        $state.go('home');
                    }, function(err) {
                        console.error('Logout error : ', err);
                    });
                }]
            });
            
        // 浏览器没有匹配到以上URL时，转到此URL
        $urlRouterProvider.otherwise('/');
    }
]);
```

`ui-router`通过嵌套的`states`和`views`来控制路由，在HTML文件中，要引用一个链接，直接添加对应的state即可，比如链接登录页面：

```
<body>
    <div ui-view></div>
    <a ui-sref="login">login</a>
</body>
```

`ui-sref`是ui-router的一个指令，用于给HTML模板渲染ui-router定义的链接。而指令`ui-view`用于渲染HTML页面模板。

Angular通过`config()`方法调用`ui-router`的`$stateProvider`方法根据`state`来配置URL。

`$locationProvider.html5Mode(true);`用于启用html5 mode，`$location`有两个控制URL格式的模式： Hashbang mode 和 html5 mode。默认使用 Hashbang mode，html5 mode 的URL格式对搜索引擎更友好，两种模式的对比如下图所示：

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid45labid1358timestamp1441869719970.png/wm)

我们使用bootstrap构建前端页面，添加bootstrap到Meteor：

```
$ meteor add twbs:bootstrap
```

删除`index.ng.html`文件，打开`index.html`，修改代码如下：

```
<head>
    <base href="/">
</head>

<body ng-app="louForum">
    <div id="header">
        <div class="container">
            <div class="pull-left" id="main-nav">
                <a ui-sref="home">首页</a>
            </div>
            <div class="pull-right" ng-if="$root.currentUser">
                <span>Hi, {{ currentUser.username }}</span>
                <a ui-sref="logout">退出</a>
            </div>
            <div class="pull-right" ng-if="!$root.currentUser">
                <a ui-sref="login">登录</a>
                <a ui-sref="register">注册</a>
            </div>
        </div>
    </div>
    <div class="container" id="main-content">
        <div ui-view></div>
    </div>
</body>
```

`ui-sref`是`angular-ui-router`的指令，用于指定路由控制函数中定义的state，以对应其中的URL。`ng-if`是一个判断表达式结果为true或者false的Angular指令，为true则渲染此HTML元素，为false则不渲染。在head标签中，我们添加了base标签，这是html5 mode 所必须的，指定了URL的根目录。我们还添加了一个带有`ui-view`属性的div元素，根据不同的URL，对应的Angular模板的内容会加载到这个div中，所以点击切换URL时，页面其实是没有刷新的，而只是更改了`ui-view`中的内容。

## 注册

Meteor默认加载了很多包，其中`insecure`包使得服务端默认会把所有的数据发送给所有的客户端，而且所有客户端都可以修改数据，比如没有登录也可以发帖。为了安全，添加用户之前，我们需要移除`insecure`包：

```
$ meteor remove insecure
```

然后添加Meteor用户管理包`accounts-password`：

```
$ meteor add accounts-password
```

这个包有登录、注册、修改密码、邮箱验证等功能，非常实用。

在client文件夹中新建user文件夹，在user文件夹中新建controllers文件夹和views文件夹。controllers文件夹用于存放控制器，views文件夹用于存放模板。每一个由Angular控制的页面，都需要控制器和模板。

创建注册控制器，在controllers文件夹中新建`register.js`，输入如下代码（通过IDE写代码可以输入中文的哦~）：

```
// 定义注册控制器 RegisterCtrl
// 并传入 $meteor 和 $state
angular.module('louForum').controller('RegisterCtrl', ['$meteor', '$state',
    function($meteor, $state) {
        var vm = this;
        
        // 定义 user model
        // 注册成功后数据将自动保存到mongoDB
        vm.credentials = {
            username: '',
            email: '',
            password: ''
        };
        // 保存错误信息
        vm.error = '';

        // 用户注册方法
        vm.register = function() {
            // 通过$meteor.createUser方法创建新用户
            // 用户信息会保存到数据库
            $meteor.createUser(vm.credentials)
            .then(function() {
                // 注册成功后跳转到首页
                $state.go('home');
            }, function(err) {
                vm.error = 'Register error : ' + err;
                console.error(vm.error);
            });
        };
    }
]);
```

然后再创建注册的模板，在views文件夹中新建`register.ng.html`，输入如下代码：

```
<form class="form-horizontal">
    <div class="form-group">
        <label class="col-md-2 control-label">昵称</label>
        <div class="col-md-10">
            <input type="text" class="form-control" ng-model="rc.credentials.username"><br>
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-2 control-label">邮箱</label>
        <div class="col-md-10">
            <input type="email" class="form-control" ng-model="rc.credentials.email"><br>
        </div>
    </div>
    <div class="form-group">
        <label for="inputPassword3" class="col-md-2 control-label">密码</label>
        <div class="col-md-10">
            <input type="password" class="form-control" ng-model="rc.credentials.password"><br>
        </div>
    </div>
    <div class="form-group">
        <div class="col-md-offset-2 col-md-10">
            <button type="button" class="btn btn-primary" ng-click="rc.register()">注册</button>
        </div>
    </div>
</form>
```

关于注册的控制器和模板就完成了。

## 登录

同样的，创建登录控制器，在controllers文件夹中新建`login.js`，输入如下代码：

```
angular.module('louForum').controller('LoginCtrl', ['$meteor', '$state',
    function($meteor, $state) {
        var vm = this;

        vm.credentials = {
            username: '',
            email: '',
            password: ''
        };
        vm.error = '';

        vm.login = function() {
            // 通过验证邮箱和密码是否匹配来判断登录
            $meteor.loginWithPassword(vm.credentials.email, vm.credentials.password)
            .then(function() {
                $state.go('home');
            }, function(err) {
                vm.error = 'Login error : ' + err;
                console.error(vm.error);
            });
        };
    }
]);
```

然后创建登录的模板，在views文件夹中新建`login.ng.html`，输入如下代码：

```
<form class="form-horizontal">
    <div class="form-group">
        <label class="col-md-2 control-label">邮箱</label>
        <div class="col-md-10">
            <input type="email" class="form-control" ng-model="lc.credentials.email"><br>
        </div>
    </div>
    <div class="form-group">
        <label for="inputPassword3" class="col-md-2 control-label">密码</label>
        <div class="col-md-10">
            <input type="password" class="form-control" ng-model="lc.credentials.password"><br>
        </div>
    </div>
    <div class="form-group">
        <div class="col-md-offset-2 col-md-10">
            <button type="button" class="btn btn-primary" ng-click="lc.login()">登录</button>
        </div>
    </div>
</form>
```

由于登录成功后，会自动跳转到首页，这里我们就先添加一个空白主页，在client文件夹下新建`home`文件夹，在`home`文件夹下创建`controllers`文件夹和`views`文件夹。

在这个`controllers`文件夹中新建`home.js`文件，输入如下代码：

```
angular.module('louForum').controller('HomeCtrl', ['$meteor', '$state', '$scope',
    function($meteor, $state, $scope) {
    }
]);
```

在`views`文件夹下新建`home.ng.html`文件夹，输入如下代码：

```
<p>home page</p>
```

运行项目：

```
$ meteor
```

访问`http:localhost:3000/register`即可注册新用户，访问`http:localhost:3000/login`登录。

在虚拟机中新打开一个shell终端，进入louForum目录，输入如下命令，进入Meteor的MongoDB命令行环境：

```
$ meteor mongo
```

然后输入如下命令，进入名为`meteor`（Meteor的默认数据库）的数据库：

```
> use meteor;
```

输入如下命令，查看该数据库中的Collection：

```
> show collections;
```

可以看到，有一个名为`users`的collection，输入如下命令，查看`users`中的数据：

```
> db.users.find();
```

可以看到打印出了刚刚注册的用户的数据。到此，注册和登录用户就完成了。