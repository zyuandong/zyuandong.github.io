---
title: AngularJS 实现即时搜索 
category: Technology
tag: [AngularJS, JavaScript]
---

## 二、基础知识储备

### 1. 框架搭建

项目的后台服务框架使用 Node.js 和 Express 搭建, 首先需要安装 Express ， `sudo npm install -g express` ，以及 express 的命令行工具 `sudo npm install -g express-generator`

接着创建项目框架 - `express -e louSearch`

`npm start` 为项目服务的启动命令

### 2. 使用 Angular.js

通过 bower 来安装 Angular.js ，首先安装 bower - `sudo npm install -g bower`

在 `/louSearch/public` 目录下执行命令 - `bower install angularjs`，安装 Angular.js

在 `/louSearch/views/index.ejs` 文件中引入 Angular.js

```
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <!-- 引入Angular.js -->
    <script src="/bower_components/angular/angular.min.js"></script>
  </head>
  <body>
  <!-- coding ... -->
  </body>
</html>
```

#### 2.1. 指令

先介绍 Angular.js 最常见的几个指令：

- `ng-app`: 初始化一个 Angular.js 应用，可以自定义属性值；
- `ng-model`: 把元素值绑定到应用程序；
- `ng-bind`: 把应用数据绑定到 HTML 视图

修改 `/louSearch/views/index.ejs` 文件：

```
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <script src="/bower_components/angular/angular.min.js"></script>
  </head>
  <body>
    <div ng-app>
        <div>姓名：<input type="text" ng-model="name"></div>
        <div ng-bind="name"></div>
    </div>
  </body>
</html>
```

代码很简单的一个例子，启动服务，浏览器访问 `localhost:3000` 后，在输入框中随意输入一些字符，会在输入框下方同时出现相同的字符。

试想一下，如果使用 jquery 来实现这一效果，代码量一定不小，还会有许多的 DOM 操作，相比较后就会发现 Angular.js 的强大带来了代码量的减少，优秀的体验效果等好处。

#### 2.2. 控制器

之前的代码简单实现了 Angular.js 的数据绑定，一个应用往往还有复杂的逻辑处理等等，这里接着介绍 Angular.js 的控制器：

`ng-controller`: 定义了应用程序的控制器，可自定义属性值

修改 `/louSearch/views/index.ejs` 文件：

```
{% raw %}
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <script src="/bower_components/angular/angular.min.js"></script>
  </head>
  <body>
    <div ng-app="app" ng-controller="ctrl" ng-init="item=['hello shiyanlou', 'bye-bye']">
        <button ng-click="toggle()">switch</button>
        <div ng-show="show">{{ item[0] }}</div>
        <div ng-hide="show">{{ item[1] }}</div>
    </div>
    
    <script>
        // 创建模型
        var app = angular.module('app', []);
        // 创建控制器
        app.controller('ctrl', function($scope) {
            $scope.toggle = function() {
                $scope.show = !$scope.show;
            }
        })
    </script>
  </body>
</html>
{% endraw %}
```

代码的效果就是每次点击 'switch' 按钮，就会交替显示 'hello shiyanlou' 和 'bye-bye' 两句话。

简单介绍一下原理：这次修改的代码新加入指令：

- `ng-controller`: 定义应用程序的控制器；
- `ng-init`: 初始化应用程序数据；
- `ng-click`: 定义元素被点击的行为；
- `ng-show`: 控制元素显示(true)、隐藏(false)；
- `ng-hide`: 控制元素显示(false)、隐藏(true);

#### ** 注意：**

- 需要创建模型时才给 `ng-app` 指令设置具体值；
- 代码中的 `$scope` 可以看做表达式执行的上下文环境，在视图和控制器之间建立了一个通道，这样就保持了数据更新的同步；

代码为按钮绑定了一个 `toggle()` 方法，每次点击按钮就会执行一次 `toggle()` 方法，并将 `$scope.show` 的值取反。这样在配合 `ng-show`、`ng-hide` 指令就可以达到预料的效果。

#### 2.3. 过滤器

修改 `/louSearch/views/index.ejs` 文件：

```html
{% raw %}
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <script src="/bower_components/angular/angular.min.js"></script>
  </head>
  <body>
    <div ng-app ng-init="people=[
    {'name':'ming','age':12},
    {'name':'jack','age':22},
    {'name':'tony','age':21}]">
        <input type="text" ng-model="rule">
        <!-- 遍历数据集合，并通过过滤器筛选 -->
        <div ng-repeat="x in people | filter:rule ">
            {{ x.name + '-' + x.age }}
        </div>
    </div>
  </body>
</html>
{% endraw %}
```

这里没有创建控制器，通过指令 `ng-repeat` 和过滤器，实现了在输入框中输入字符，下方只会对应显示含有此字符的数据的效果。

指令 `ng-repeat` 为数据集合定义了一个模板，遍历集合中的每个数据，并通过此模板显示出来。

在遍历数据集合时，用上了过滤器：`|` 符号作为管道，`filter` 设置过滤规则，`rule` 为输入框中绑定的数据值。这样就能通过输入框中的字符过滤出数据集合中的结果。

## 三、 实现过程

### 1. 基础效果实现

之前铺垫了很多的基础知识，这都是实现最后效果必要的元素。给最后一次修改的程序添加控制器：

修改 `/louSearch/views/index.ejs` 文件：

```html
{% raw %}
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <script src="/bower_components/angular/angular.min.js"></script>
  </head>
  <body>
    <div ng-app="app" controller="ctrl">
        <input type="text" ng-model="rule" ng-change="switch()">
        <div ng-show="show">
            <!-- 遍历数据集合，并通过过滤器筛选 -->
            <div ng-repeat="x in people | filter:rule ">
                {{ x.name + '-' + x.age }}
            </div>
        </div>
    </div>
    <script>
        var app = angular.module('app', []);
        app.controller('ctrl', function($scope) {
            $scope.show = false;
            $scope.rule = '';
            $scope.switch = function() {
                if($scope.rule.length > 0) {
                    $scope.people = [
                        {'name':'ming','age':12},
                        {'name':'jack','age':22},
                        {'name':'tony','age':21}];
                    $scope.show = true;
                } else {
                    $scope.people = [];
                    $scope.show = false;
                }
            }
        })
    </script>
  </body>
</html>
{% endraw %}
```

运行程序，我们可以发现当我们输入 `people` 数据集合中含有的字符时，输入框下发会对应显示这一数据，这样，我们就初步实现了即时搜索提示的粗糙效果。

### 2. http 服务

以上代码中我们定义了一些数据用于模拟这一效果，实际的业务场景中肯定不适用，接着我们来修改代码，使用 Angular.js 自带的 http 服务，获取数据，模拟实际业务场景。

创建 `/louSearch/public/data/data.json` 文件用于保存业务数据：

```
{
    "people": [
        {
            "name":"ming","age":12
        },
        {
            "name":"jack","age":22
        },
        {
            "name":"tony","age":21
        },
        {
           "name":"zake","age":21
        }
    ]
}
```

修改 `/louSearch/views/index.ejs` 文件：

```html
{% raw %}
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <script src="/bower_components/angular/angular.min.js"></script>
  </head>
  <body>
    <div ng-app="app" ng-controller="ctrl">
        <input type="text" ng-model="rule" ng-change="switch()">
        <div ng-show="show">
            <!-- 遍历数据集合，并通过过滤器筛选 -->
            <div ng-repeat="x in people | filter:rule ">
                {{ x.name + '-' + x.age }}
            </div>
        </div>
    </div>
    <script>
        var app = angular.module('app', []);
        var peopleArr = [];
        // 在控制器中引入 http 服务
        app.controller('ctrl',['$scope', '$http', function($scope, $http) {
            $scope.show = false;
            $scope.rule = '';
            $scope.people = [];
            $scope.switch = function() {
               if($scope.rule.length > 0) {
                    $scope.show = true;
                    $scope.people = peopleArr;
               } else {
                    $scope.show = false;
                    $scope.people = [];
               }
            }
            
            // 使用 http 服务获取数据
            $http({
                method: 'GET',
                url: '/data/data.json'
            }).then(function successCallback(res) {
                res.data.people.forEach(function(i) {
                    peopleArr.push(i);
                })
            },function error(res) {
                console.log(res);
            })
        }])
    </script>
  </body>
</html>
{% endraw %}
```

至此，项目的效果已经大部分完成，虽然还是使用的模拟数据，但与后台数据关联的接口也已经明确，我们可以继续编写后台服务程序来提供真实数据。

接下来编写 css 来优化项目展示。

## 四、优化及扩展

修改 `/louSearch/public/stylesheets/style.css` 文件：

```
.container {
    margin: 50px 0;
    text-align: center;
}
.container input {
    width: 200px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 5px 10px;
}
.list {
    width: 220px;
    text-align: left;
    border: 1px solid #ccc;
    margin: 0 auto;
}
.list .list-item {
    border-bottom: 1px solid #eee;
    padding: 5px 10px;
}
.list .list-item:hover {
    background-color: #eee;
}
```

修改 `/louSearch/views/index.ejs` 文件：

```html
{% raw %}
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel="stylesheet" href="/stylesheets/style.css">
    <script src="/bower_components/angular/angular.min.js"></script>
  </head>
  <body>
    <div ng-app="app" ng-controller="ctrl" class="container">
        <input type="text" ng-model="rule" ng-change="switch()">
        <div ng-show="show" class="list">
            <!-- 遍历数据集合，并通过过滤器筛选 -->
            <div ng-repeat="x in people | filter:rule" class="list-item">
                {{ x.name + '-' + x.age }}
            </div>
        </div>
    </div>
    <script>
        var app = angular.module('app', []);
        var peopleArr = [];
        // 在控制器中引入 http 服务
        app.controller('ctrl',['$scope', '$http', function($scope, $http) {
            $scope.show = false;
            $scope.rule = '';
            $scope.people = [];
            $scope.switch = function() {
               if($scope.rule.length > 0) {
                    $scope.show = true;
                    $scope.people = peopleArr;
               } else {
                    $scope.show = false;
                    $scope.people = [];
               }
            }
            
            // 使用 http 服务获取数据
            $http({
                method: 'GET',
                url: '/data/data.json'
            }).then(function successCallback(res) {
                res.data.people.forEach(function(i) {
                    peopleArr.push(i);
                })
            },function error(res) {
                console.log(res);
            })
        }])
    </script>
  </body>
</html>
{% endraw %}
```
