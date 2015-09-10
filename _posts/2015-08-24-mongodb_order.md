---
layout: default
title: mongoDB基本命令运用
monthLast: true
tags: [mongoDB, mongoose]
---

win下启动mongoDB服务

mongod -dbpath d:\myservicer\data

cd到mongoDB安装位置的bin目录下，

[mongoDB](http://www.360doc.com/content/10/0618/22/10626_33885376.shtml)

[mongoDB教程](http://www.yiibai.com/mongodb/)

[mongodb概念--文档、集合、数据库、shell](http://blog.csdn.net/mcpang/article/details/7714744)

show dbs (查看数据库)

use dbname（切换数据库）

show collections（查看集合）

db.COLLECTION_NAME.drop()（删除集合）

db.COLLECTION_NAME.remove({}) （从集合中删除文档）