---
title: meteor+AngularJS 简易论坛（一）
category: Technology
tags: [meteor, AngularJS]
---

## Angular基础

AngularJS是一个MV* JavaScript框架，由Google维护。Angular使用声明式编程来构建用户界面，指令式编程来实现业务逻辑，达到了客户端和服务端解耦的目标。下面我们先来看看Angular的基础知识。

## Angular表达式

Angular通过`表达式`把数据绑定到HTML模板，表达式写在双大括号内，如：`{{ expression }}`，HTML中出现Angular表达式的地方，就会显示对应表达式的数据。来个示例看看：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Angular Demo</title>
</head>
<body>
    <div ng-app="demo" ng-init="str='hello angular'">
        <p>{{ str }}</p>
        <p>{{ 5 + 5 }}</p>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.min.js"></script>
    <script>
	    var app = angular.module('demo', []);
	</script>
</body>
</html>
```

保存以上代码为HTML文件，在浏览器中打开，可以看到浏览器中显示了`hellow angular`字符串以及数字10。Angular表达式可以做简单的运算，但是不支持条件判断、循环和异常。我们还可以看到`div`中出现了`ng-app`和`ng-init`这两个奇怪的东西，这就是Angular的指令了。

## Angular指令

Angular指令是HTML带有`ng-`前缀的扩展属性，每个指令都有不同的功能，也可以自己编写自定义指令：

+ ng-app：初始化一个Angular应用程序
+ ng-init：初始化当前作用域的属性
+ ng-model：绑定表单元素的值到当前作用域的属性
+ ng-repeat：循环HTML元素
+ ng-controller：定义应用程序的控制器
+ ...

## Angular控制器

Angular控制器用于控制和处理应用程序的数据。举个栗子：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Angular Demo</title>
</head>
<body>
    <div ng-app="testApp" ng-controller="hello">
		<input ng-model="username">
        <p>Hello, {{ username }}</p>
    </div>

<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.min.js"></script>
<script>
    // 创建Angular模块
    // 第一个参数是模块的名称
    // 第二个参数是一个数组，定义此模块需要依赖的模块（无依赖模块则传空数组）
    var app = angular.module('testApp', []);
    app.controller('hello', function($scope) {
        $scope.username = 'shiyanlou';
    });
</script>
</body>
</html>
```

`angular.module`用于创建Angular模块，通常Angular应用程序由模块定义，Angular控制器需要挂载到模块才会运行。

用浏览器打开这个页面，改变输入框的值，输入框下面的显示也会跟着改变，这个就是Angular的数据双向绑定机制。我们看到，控制器中传入了`$scope`这个变量，`$scope`相当于是这个控制器的作用域，是对当前这个控制器的数据模型（model）的引用（类似于普通JavaScript对象中的this关键字的作用）。

## Meteor基础

Meteor是一个基于Node.js的Web开发框架，主要用来开发实时的应用程序。Meteor能够实时的同步数据库和客户端之间的数据。

## Meteor环境搭建

### 安装Meteor

```
$ curl https://install.meteor.com/ | sh
```

安装完成后可以输入如下命令，查看当前安装的Meteor的版本号，以确认安装成功了：

```
$ meteor --version
```

### 创建示例项目

```
$ meteor create LouForum
```

这里，我们创建了一个Meteor的示例项目，进入到项目目录启动项目：

```
$ cd LouForum
$ meteor
```

启动项目的命令是在项目根目录下运行`meteor`，停止项目直接输入`Ctrl+c`即可。

启动项目中，Meteor启动了mongoDB，这是因为Meteor默认的数据库就是mongoDB。启动成功后，打开浏览器，输入`http://localhost:3000`即可访问此项目，这是一个Meteor的默认初始页面，可以显示鼠标点击按钮的次数。查看LouForum文件夹，我们会看到里面只有三个文件，分别是HTML文件、CSS文件和JavaScript文件。Meteor中的JavaScript代码可以同时在服务端和客户端运行，所以这里只有一个JavaScript文件。

打开`LouForum.js`文件，我们看到，里面有两个判断：

+ `Meteor.isClient`下面的代码在客户端运行
+ `Meteor.isServer`下面的代码在服务端运行

Meteor创建简单的app直接在项目根目录下创建js文件、HTML文件和CSS文件即可。运行项目的时候，所有的CSS文件，都会自动引入到HTML文件，而所有的HTML文件，都会拼成一个HTML文件。下面，我们去掉官方默认的模板，添加Angular进来。

## 添加Angular到Meteor项目

首先，我们删掉初始化项目时，自动生成的三个文件：

```
$ rm LouForum.html LouForum.html LouForum.html
```

然后创建一个`index.html`文件：

```
$ touch index.html
```

在`index.html`中输入如下代码：

```
<body>
    <p>shiyanlou</p>
</body>
```

我们只写了`body`这个标签，而没有`html`和`head`标签，这是因为Meteor会扫描所有的HTML文件，然后把这些HTML文件中`head`标签内的内容合并，`body`中的内容合并，然后组成一个新的文件，再自动创建`html`标签、`head`标签和`body`标签，以及其他必须的代码。

运行项目：

```
$ meteor
```

启动成功后，打开浏览器访问`http://localhost:3000`，会看到页面上显示`shiyanlou`字样。

添加Angular包（在项目根目录下执行）：

```
$ meteor add angular
```

添加Angular成功后，下次运行项目，前端页面会自动引用Angular，无需再手动引用。

新建一个文件：

```
$ touch index.ng.html
```

这里，我们使用了`.ng.html`后缀名，这样，Meteor官方默认的模板系统（Blaze）就不会编译这个类型的HTML文件，Angular就可以使用这样的HTML文件了。

在`index.ng.html`文件中输入如下代码：

```
<p>shiyanlou</p>
```

然后修改`index.html`文件的代码：

```
<body>
    <div ng-include="'index.ng.html'"></div>
</body>
```

我们可以看到这里使用了Angular的一个指令，`ng-include`用于引入外部HTML文件，注意这里的双引号里面还有单引号。然后在创建一个`app.js`文件，并输入如下代码：

```
if (Meteor.isClient) {
    // 创建 Angular module
    // 并添加 angular-meteor 包依赖
    angular.module('louForum', ['angular-meteor']);
}
```

添加`ng-app`到`index.html`：

```
<body ng-app="louForum">
    <div ng-include="index.ng.html"></div>
</body>
```

运行项目查看效果：

```
$ meteor
```

运行成功后，我们可以看到，浏览器显示的和刚刚一样，说明Angular创建的模块运行成功了。

## 项目结构组织

虽然，HTML、css和JavaScript文件直接放在项目根目录也可以运行，但是，文件多了之后就会很混乱。所以，文件组织是很有必要的。而且，特定的文件夹在Meteor项目中有特殊的含义：

+ server：此文件夹下的代码只会在服务器端运行
+ client：此文件夹下的代码只会在客户端运行
+ public：这个文件夹下面的所有文件都可以直接公开访问

这里还有一些其他的规则：

+ 子文件夹里面的文件比父文件夹里面的文件先加载
+ 同一个文件夹内，文件是按字母顺序加载的
+ 特别的，lib文件夹里的文件比其他文件夹里的文件都要先加载
+ 最后，`main.*`这样的文件总是最后加载

我们先创建三个文件夹，即client、server和model。client中放只需要客户端运行的代码，server放只需要服务端运行的代码，model放定义数据库collection的代码，客户端和服务端都需要运行。

然后把`index.html`、`index.ng.html`和`app.js`文件移动到client文件夹下面，并修改`app.js`代码为：

```
// 创建 Angular module
// 并添加 angular-meteor 包依赖
angular.module('louForum', ['angular-meteor']);
```

因为client文件夹下面的代码只会在客户端运行，所以不需要`Meteor.isClient`判断了。

`index.html`文件中`ng-include`引入的文件路径必须完整，修改`index.html`代码如下所示：

```
<body>
    <div ng-include="'client/index.ng.html'"></div>
</body>
```

运行项目：

```
$ meteor
```

可以看到，效果和前面一样。