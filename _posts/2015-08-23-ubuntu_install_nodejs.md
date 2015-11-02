---
title: 安装最新版本的Node.js
category: 杂物间
tag: Node.js
---

下列方法无需从头编译安装：

~~~
sudo apt-get update
sudo apt-get install -y python-software-properties software-properties-common
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
~~~

一旦 Node.js 的新版本发布了，就可以直接从包管理升级，无需从头再次编译安装。

~~~
sudo npm install -g n
// 稳定
sudo n stable

// 最新
sudo n latest

// 指定升级版本
sudo n v0.12.7
~~~

使用源码安装（ps:不建议此方法）

[Node.js安装教程和NPM包管理器使用详解](http://www.jb51.net/article/53813.htm)

[Linux（Ubuntu）下安装NodeJs](https://cnodejs.org/topic/53a92af6c3ee0b58203258fe)