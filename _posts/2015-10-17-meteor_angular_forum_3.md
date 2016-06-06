---
title: meteor+angular.js简易论坛（三）
category: angular.js
tags: [meteor, angular.js]
---

## 节点添加功能

我们如果使用其他的web框架，就需要实现一系列的REST服务通过客户端去连接服务端，并且需要创建数据库以及连接数据库的函数等。但是，使用Meteor就不需要这么麻烦。Meteor使得编写分布式客户端代码就像和本地数据库交互一样简单。每一个Meteor客户端都有一个保存在内存中的数据库缓存，服务端会把数据库中的数据推送到客户端数据库的缓存中，当客户端数据库缓存发生变化时，服务端会自动修改数据库中的内容。Meteor是通过`Mongo.Collection` Class来处理MongoDB数据的。

首先创建节点的数据模型，在`model`文件夹下新建`node.js`，输入如下代码：

```
// 定义 MongoDB collection 
Nodes = new Mongo.Collection('nodes');

// 创建 collection 帮助函数
// 以便获取与节点相关的其他信息
// 需要添加“dburles:collection-helpers”包到 meteor
// -> $ meteor add dburles:collection-helpers
Nodes.helpers({
    postsObj: function() {
        return Posts.find({ node: this.url });
    },
    postsCount: function() {
        return Posts.find({ node: this.url }).length();
    }
});

// 添加 collection 权限
Nodes.allow({
    // 登录后才能添加新节点
    insert: function(userId) {
        return userId;
    }
});
```

添加`dburles:collection-helpers`包：

```
$ meteor add dburles:collection-helpers
```

然后添加路由，在`client`文件夹下的`routes.js`文件中，添加路由state：

```
// ...
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
})
// 新添加的代码
// 添加论坛节点
.state('node', {
    url: '/new/node',
    templateUrl: 'client/node/views/node.ng.html',
    controller: 'NodeCtrl'
});
```

在`client`文件夹下新建`node`文件夹，在`node`文件夹下新建`controllers`文件夹和`views`文件夹，在`controllers`下新建`node.js`文件，输入如下代码：

```
// 节点添加功能的控制器
angular.module('louForum').controller('NodeCtrl', ['$meteor', '$state', '$scope',
    function($meteor, $state, $scope) {
        // 绑定 collection 到 Angular
        $scope.nodes = $meteor.collection(Nodes);

        $scope.save = function(newNode) {
            // 新节点 push 到 nodes 集合即可
            // Meteor 会自动同步客户端数据到 MongoDB
            // 所以只要在客户端修改$meteor.collection()的内容
            // 数据库中的数据就会被修改
            $scope.nodes.push(newNode);
            
            // 跳转到节点列表页
            $state.go('nodesList');
        };
    }
]);
```

在`views`文件夹中新建`node.ng.html`文件，输入如下代码：

```
<div class="new-post">
    <!-- 表单提交时，保存新节点 -->
    <form ng-submit="save(node); node='';">
        <div class="form-group">
            <label>Node Name</label>
            <input ng-model="node.name" class="form-control">
        </div>
        <div class="form-group">
            <label>Node Url</label>
            <input ng-model="node.url" class="form-control">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea ng-model="node.description" class="form-control" rows="6"></textarea>
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
    </form>
</div>
```

在模板中，通过`ng-submit`给表单提交时绑定了Angular控制器中定义的方法，`ng-model`用于绑定表单数据，直接写`ng-model="node.name"`，Angular会自动把`node`设置为一个对象。在Angular中，通过`node.name`可以获取到绑定此属性的`input`的值。所以，提交表单时，把`node`对象传给`save()`方法即可创建当前输入的节点。

运行项目：

```
$ meteor
```

浏览器访问`http://localhost:3000/new/node`，添加新的节点，并提交表单。

然后在虚拟机中新打开一个shell终端，进入louForum目录，进入Meteor的MongoDB命令行环境，查看collection，可以看到，多了一个名为`nodes`的collection，输入如下命令，查看`nodes`中的数据：

```
> db.nodes.find();
```

我们可以看到打印出了刚刚添加的节点数据，说明我们的节点添加成功了。

## 显示节点列表

在`client`文件夹下的`routes.js`中添加路由state：

```
.state('nodesList', {
    url: '/nodes',
    templateUrl: 'client/node/views/nodes-list.ng.html',
    controller: 'NodesListCtrl'
})
```

在`node`文件夹下的`controllers`文件夹中添加节点列表控制器，新建`nodesList.js`文件，输入如下代码：

```
angular.module('louForum').controller('NodesListCtrl', ['$meteor', '$state', '$scope',
    function($meteor, $state, $scope) {
        // 获取所有的节点
        // 第二个参数表示是否自动同步客户端数据变动到服务端
        // 默认为true
        // 此处这个控制器只作查询，所以传入false
        $scope.nodes = $meteor.collection(Nodes, false);
    }
]);
```

然后添加模板，在`node`文件夹下的`views`文件夹中新建`nodes-list.ng.html`，输入如下代码：

```
<div class="nodes-list">
    <!-- nodeDetails 是节点详情页，后面再添加这个页面 -->
    <a ng-repeat="node in nodes" ui-sref="nodeDetails({ node: node.url })">{{ node.name }}</a>
</div>
```

在主菜单上添加节点列表链接，在client文件夹下的`index.html`中添加代码：

```
<!-- ... -->
<div class="pull-left" id="main-nav">
    <a ui-sref="home" ui-sref-active="active">首页</a>
    <!-- 新添加的代码 -->
    <a ui-sref="nodesList" ui-sref-active="active">节点</a>
</div>
<!-- ... -->
<div class="pull-right" ng-if="$root.currentUser">
    <span>Hi, {{ currentUser.username }}</span>
    <a ui-sref="logout">退出</a>
    <!-- 新添加的代码 -->
    <a ui-sref="node" ui-sref-active="active">添加节点</a>
</div>
<!-- ... -->
```

`ui-sref-active="active"`用于判断当前页面是否为此链接的`ui-sref`指向的页面，如果是，则给当前页面添加一个class：`class="active"`，这样可以很方便的高亮当前显示的页面的导航。

然后运行项目：

```
$ meteor
```

现在可以访问节点列表了：`http://localhost:3000/nodes`。

## 发帖功能

发帖和添加节点类似，在`model`文件夹中新建`post.js`文件，输入如下代码：

```
Posts = new Mongo.Collection('posts');

Posts.helpers({
    nodeObj: function() {
        return Nodes.findOne({ url: this.node });
    },
    authorObj: function() {
        return Meteor.users.findOne(this.author);
    },
    createAtFormat: function() {
        // 格式化帖子的发布时间
        // 使用了 momentjs
        // 添加方法
        // -> $ meteor add mrt:moment
        // -> $ meteor add rzymek:moment-locale-zh-cn
        // 第二个包是moment的本地化包，用于显示中文的时间
        return moment(this.createAt).fromNow();
    }
});

Posts.allow({
    // 登录后才能发帖
    insert: function(userId) {
        return userId;
    }
});
```

然后添加发帖的路由，在client文件夹下的`routes.js`文件中，添加如下代码：

```
.state('post', {
    url: '/new/post/:node',
    templateUrl: 'client/post/views/post.ng.html',
    controller: 'PostCtrl'
})
```

然后在`client`文件夹下新建`post`文件夹，在`post`文件夹中新建`controllers`和`views`文件夹。

创建发帖的控制器，在`controllers`文件夹中新建`post.js`，输入如下代码：

```
angular.module('louForum').controller('PostCtrl', ['$meteor', '$state', '$scope', '$stateParams',
    function($meteor, $state, $scope, $stateParams) {
        $scope.posts = $meteor.collection(Posts);

        $scope.save = function(newPost) {
            newPost.node = $stateParams.node;
            newPost.author = Meteor.user()._id;
            newPost.createAt = Date.now();

            $scope.posts.push(newPost);

            // 跳转到节点页
            $state.go('nodeDetails', { node: newPost.node });
        };
    }
]);
```

添加发帖模板，在`views`文件夹中新建`post.ng.html`文件，输入如下代码：

```
<div class="new-post">
    <form ng-submit="save(post); post='';">
        <div class="form-group">
            <label>Title</label>
            <textarea ng-model="post.title" class="form-control" rows="3"></textarea>
        </div>
        <div class="form-group">
            <label>Content</label>
            <textarea ng-model="post.content" class="form-control" rows="6"></textarea>
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
    </form>
</div>
```

这样，发帖功能就实现了，到这里你应该发现了，每个功能的代码组织是一样的，model中添加数据模型，`routes.js`中添加路由控制，然后创建控制器和模板就可以了。这样编写新功能就很简单了。

## 帖子详情页

和前面的模块一样，在client文件夹中的`routes.js`文件中添加如下代码：

```
.state('postDetails', {
    url: '/post/:postId',
    templateUrl: 'client/post/views/post-details.ng.html',
    controller: 'PostDetailsCtrl'
})
```

然后在`client/post/controllers`文件夹中新建`postDetails.js`文件，并输入如下代码：

```
angular.module('louForum').controller('PostDetailsCtrl', ['$meteor', '$state', '$scope', '$stateParams',
    function($meteor, $state, $scope, $stateParams) {
        $scope.post = $meteor.object(Posts, $stateParams.postId, false);
        $scope.node = $meteor.object(Nodes, { url: $scope.post.node }, false);
    }
]);
```

这里查询数据，用的是`$meteor.object()`，而前面用的是`$meteor.collection()`。这里介绍一下两个方法：

*$meteor.collection()：*

| 参数 | 类型 | 是否必须 | 默认值 |
|------|------|----------|--------|
| collection | meteor Collection Object / Reactive Function | 是 | |
| autoClientSave | Boolean | 否 | True |
| updateCollection | Meteor Collection Object | 否 | |

*$meteor.object()：*

| 参数 | 类型 | 是否必须 | 默认值 |
|------|------|----------|--------|
| collection | meteor Collection Object | 是 | |
| selector | Mongo Selector, Object ID, String | 是 | |
| autoClientSave | Boolean | 否 | True |

在`client/post/views`文件夹中新建`post-details.ng.html`文件，并输入下代码：

```
<div class="post-details">
    <div class="post-details-header">
        <h4>{{ post.title }}</h4>
        <div class="post-details-meta">
            <span>{{ post.authorObj().username }}</span>
            <span><a ui-sref="nodeDetails({ node: post.node })">{{ post.nodeObj().name }}</a></span>
            <span>{{ post.createAtFormat() }}</span>
        </div>
    </div>
    <div class="post-details-body">
        <div class="post-details-content">{{ post.content }}</div>
    </div>
    <div class="post-details-footer">
    </div>
</div>
```

论坛节点的添加和发帖功能就实现了。

## 首页显示帖子列表

修改首页的控制器，代码如下所示：

```
angular.module('louForum').controller('HomeCtrl', ['$meteor', '$scope',
    function($meteor, $scope) {
        // 这里传入$meteor.collection的是一个函数
        // 前面说过，$meteor.collection接收的第一个参数
        // 可以是Meteor Collection对象
        // 或者是一个函数
        $scope.posts = $meteor.collection(function() {
            return Posts.find({}, { sort: { createAt: -1 } });
        });
    }
]);
```

修改首页的模板，代码如下所示：

```
<div class="row">
    <div class="post-item" ng-repeat="post in posts">
        <div class="col-md-10">
            <h4 class="post-item-title">
                <a ui-sref="postDetails({ postId: post._id })">{{ post.title }}</a>
            </h4>
            <div class="post-item-meta">
                <span>{{ post.authorObj().username }}</span>
                <span><a ui-sref="nodeDetails({ node: post.node })">{{ post.nodeObj().name }}</a></span>
                <span>{{ post.createAtFormat() }}</span>
            </div>
        </div>
    </div>
</div>
```

模板中`post.authorObj()`访问的就是在model中定义的post collection的帮助函数返回的对象。

运行项目：

```
$ meteor
```

打开浏览器，访问`http://localhost:3000/new/post/nodename`，nodename替换为你新添加的节点URL名称，然后发表一个帖子，在访问首页，可以看到刚刚发表的帖子。