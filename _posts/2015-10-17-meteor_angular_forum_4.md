---
title: meteor+AngularJS 简易论坛（四）
category: 技术
tags: [meteor, AngularJS]
---

## 显示节点下的帖子列表

这个和首页类似，只不过对帖子进行了节点筛选。

在`client/routes.js`中添加路由：

```
.state('nodeDetails', {
    url: '/node/:node',
    templateUrl: 'client/node/views/node-details.ng.html',
    controller: 'NodeDetailsCtrl'
})
```

在`client/node/controllers`文件夹新建`nodeDetails.js`文件，输入如下内容：

```
angular.module('louForum').controller('NodeDetailsCtrl', ['$meteor', '$scope', '$stateParams',
    function($meteor, $scope, $stateParams) {
        $scope.node = $meteor.object(Nodes, { url: $stateParams.node }, false);
        $scope.posts = $meteor.collection(function() {
            return Posts.find({ node: $stateParams.node }, { sort: { createAt: -1 } });
        });
    }
]);
```

然后在`client/node/views`文件夹新建`node-details.ng.html`，输入如下代码：

{% raw %}

```html
<div class="current-node">
    <ol class="breadcrumb">
        <li><a ui-sref="nodesList">节点</a></li>
        <li class="active">{{ node.name }}</li>
    </ol>
    <div class="current-node-body">
        {{ node.description }}
    </div>
    <a class="btn btn-primary" ui-sref="post({ node: node.url })">发帖</a>
</div>

<div class="row">
    <div class="post-item" ng-repeat="post in posts">
        <div class="col-md-12">
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

{% endraw %}

添加一个页面是不是已经很熟练了。

## 回复帖子

首先创建数据模型，在`model`文件夹中新建`reply.js`文件，输入如下代码：

```javascript
Replies = new Mongo.Collection('replies');

Replies.helpers({
    authorObj: function() {
        return Meteor.users.findOne(this.author);
    },
    createAtFormat: function() {
        return moment(this.createAt).fromNow();
    }
});

Replies.allow({
    // 登录后才能回复帖子
    insert: function(userId) {
        return userId;
    }
});
```

在`client/post/controllers/postDetails.js`中添加代码：

```javascript
angular.module('louForum').controller('PostDetailsCtrl', ['$meteor', '$state', '$scope', '$stateParams',
    function($meteor, $state, $scope, $stateParams) {
        $scope.post = $meteor.object(Posts, $stateParams.postId, false);
        $scope.node = $meteor.object(Nodes, { url: $scope.post.node }, false);
        
        // 获取当前帖子的回复
        $scope.currentReplies = $meteor.collection(function() {
            return Replies.find({ post: $stateParams.postId }, { sort: { createAt: 1 } });
        });

        // 回复帖子
        $scope.replies = $meteor.collection(Replies);
        $scope.addReply = function(reply) {
            reply.post = $scope.post._id;
            reply.author = Meteor.user()._id;
            reply.createAt = Date.now();

            $scope.replies.push(reply);
        };
    }
]);
```

然后在`client/post/views/post-details.ng.html`中添加回复帖子的表单，修改后的代码如下所示：

{% raw %}

```html
<div class="current-node" ng-if="node">
    <ol class="breadcrumb">
        <li><a ui-sref="nodesList">节点</a></li>
        <li class="active"><a ui-sref="nodeDetails({ node: node.url })">{{ node.name }}</a></li>
    </ol>
</div>

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
        <div class="post-details-replies">
            <div>{{ currentReplies.length }} 回复</div>
            <div class="post-reply-item" ng-repeat="reply in currentReplies">
                <div class="post-reply-meta">
                    <span class="post-reply-author">{{ reply.authorObj().username }}</span>
                    <span class="post-reply-date">{{ reply.createAtFormat() }}</span>
                </div>
                <div class="post-reply-content">
                    {{ reply.content }}
                </div>
            </div>
        </div>
    </div>
    <div class="post-details-footer">
        <form ng-submit="addReply(reply); reply='';">
            <div class="form-group">
                <textarea class="form-control" row="5" ng-model="reply.content"></textarea>
            </div>
            <button type="submit" class="btn btn-default">发表</button>
        </form>
    </div>
</div>
```

{% endraw %}

到这里，整个项目基本上就完成了。具备用户注册登录，论坛节点添加，发帖和回帖等功能。

## 添加样式

但是页面是不是也太难看了点，那么下面我们来稍微美化一下吧，这里我们使用LESS来编写样式，首先添加LESS包：

```
$ meteor add less
```

然后在client文件夹下新建`index.less`文件，添加主页模板样式：

```
body {
    background: #efefef;
}

textarea {
    resize: vertical;
}

a {
    color: #333;

    &:hover,
    &:focus {
        color: #c9483c;
        text-decoration: none;
    }
}


#header {
    padding: 10px;
    background: #fff;
    border-bottom: solid 1px rgba(0,0,0,0.3);
    font-size: 16px;

    .container {
        overflow: hidden;
    }
}

#main-nav {
    a {
        display: inline-block;
        margin-right: 10px;
        font-size: 16px;
        color: #999;

        &.active,
        &:focus,
        &:hover {
            color: #c9483c;
        }
    }
}

#main-content {
    margin-top: 30px; 
    padding: 30px;
    background: #fff;
    box-shadow: 0 0 1px 0 #999;
    border-radius: 2px;
}
```

在`client/node/views`文件夹下新建`styles`文件夹，然后在这个文件夹中新建`nodes-list.less`，添加节点列表页的样式：

```
.nodes-list {
    padding: 10px 0;

    a {
        display: inline-block;
        margin: 0 4px 4px 0;
        padding: 2px 8px;
        color: #333;
        background: #eee;
        font-size: 14px;
    }
}
```

在`client/post/views`文件夹下新建`styles`文件夹，然后在这个文件夹中新建`post-item.less`，添加帖子列表的样式：

```
.current-node {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: solid 1px #eee;

    .breadcrumb {
        padding: 0;
        background: transparent;
    }
}
.current-node-body {
    margin: 10px 0;
}

.post-item {
    padding: 10px 0;
    border-bottom: solid 1px #ddd;
    overflow: hidden;
}
.post-item-title {
    font-size: 18px;
    font-weight: 700;
}
.post-item-meta,
.post-details-meta {
    > span {
        display: inline-block;
        margin-right: 12px;
        padding: 2px 8px;
        background: #eee;
        font-size: 12px; 
        border-radius: 2px;

        a {
            color: #333;
        }
    }
}
```

在`client/post/views`文件夹下新建`styles`文件夹，然后在这个文件夹中新建`post-details.less`，添加帖子详情页的样式：

```

.post-details-header {
    h4 {
        font-size: 24px;
        font-weight: 700;
    }
}

.post-details-content {
    margin: 30px 0;
    font-size: 16px;
}

.post-details-replies {
    margin: 10px 0;
}

.post-reply-item {
    padding: 10px 0;
    border-top: solid 1px #eee;

    &:last-child {
        border-bottom: solid 1px #eee;
    }
}
.post-reply-date {
    color: #ccc;
}
.post-reply-content {
    margin: 10px 0;
    font-size: 16px;
```