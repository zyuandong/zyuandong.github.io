---
title: Linux下安装Node.js
category: node.js
tag: node.js
---

安装方式有以下几种：

1. apt-get 

~~~
$ sudo apt-get update
$ sudo apt-get install -y python-software-properties software-properties-common
$ sudo add-apt-repository ppa:chris-lea/node.js
$ sudo apt-get update
$ sudo apt-get install nodejs
~~~

此方式不一定能安装到最新的稳定版本。

2. 通过编译好的文件安装

下载编译好的文件

```
$ cd node-v5.9.0/bin

$ ls

$ ./node -v
```

设置全局

```
$ ln -s /home/user/node-v5.9.0/bin/node /usr/local/bin/node
$ ln -s /home/user/node-v5.9.0/bin/npm /usr/local/bin/npm
```

`/home/user/` 是我的文件路径，需要根据自己的实际情况修改

3. 通过编译源码安装

下载安装包

```
$ wget http://nodejs.org/dist/v5.9.0/node-v5.9.0.tar.gz
```

解压并安装

```
$ tar xvf node-v5.9.0.tar.gz
$ cd node-v5.9.0
$ ./configure
$ make
$ make install
$ cp /usr/local/bin/node /usr/sbin/
```


4. 通过版本管理工具安装

nvm (Node Version Manager) 


[Node.js安装教程和NPM包管理器使用详解](http://www.jb51.net/article/53813.htm)

[Linux（Ubuntu）下安装NodeJs](https://cnodejs.org/topic/53a92af6c3ee0b58203258fe)