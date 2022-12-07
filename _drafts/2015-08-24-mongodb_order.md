---
title: mongoDB基本命令运用
category: 技术
tag: mongoDB
monthLast: true
---

win 下启动 mongoDB 服务

mongod -dbpath d:\myservicer\data

cd 到 mongoDB 安装位置的 bin 目录下，

[mongoDB](http://www.360doc.com/content/10/0618/22/10626_33885376.shtml)

[mongoDB 教程](http://www.yiibai.com/mongodb/)

[mongodb 概念--文档、集合、数据库、shell](http://blog.csdn.net/mcpang/article/details/7714744)

show dbs (查看数据库)

use dbname（切换数据库）

show collections（查看集合）

db.COLLECTION_NAME.drop()（删除集合）

db.COLLECTION_NAME.remove({}) （从集合中删除文档）
