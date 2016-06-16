---
title: Node.js 安装及版本控制
category: 后端技术
tag: Node.js
---

安装方式有以下几种：

## apt-get 

```
$ sudo apt-get update
$ sudo apt-get install -y python-software-properties software-properties-common
$ sudo add-apt-repository ppa:chris-lea/node.js
$ sudo apt-get update
$ sudo apt-get install nodejs
```

此方式不一定能安装到最新的稳定版本。

## 通过编译好的文件安装

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

## 通过编译源码安装

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


## 通过版本管理工具安装


### n

[Node.js安装教程和NPM包管理器使用详解](http://www.jb51.net/article/53813.htm)

n是Node的一个模块，作者是TJ Holowaychuk（鼎鼎大名的Express框架作者），就像它的名字一样，它的理念就是简单：

"no subshells, no profile setup, no convoluted api, just simple"
安装很简单：

$ sudo npm install -g n

安装完成之后，直接输入n后输出当前已经安装的node版本以及正在使用的版本（前面有一个o），你可以通过移动上下方向键来选择要使用的版本，最后按回车生效。

$ n
    0.10.1 
    0.10.15 
o   0.10.21 
    0.11.8

如果你要安装其他的版本（比如0.11.12），那么如下：

$ n 0.11.12
install : 0.11.12
   mkdir : /usr/local/n/versions/0.11.12
   fetch : http://nodejs.org/dist/v0.11.12/node-v0.11.12-darwin-x64.tar.gz
####                                                     5.9%

安装最新的版本

$ n latest
安装稳定版本

$ n stable
删除某个版本

$ n rm 0.10.1 
以指定的版本来执行脚本

$ n use 0.10.21 some.js

### nvm

nvm 全称 Node Version Manager，它与n的实现方式不同，其是通过shell脚本实现的。

安装方式有两种：

$ curl https://raw.github.com/creationix/nvm/v0.4.0/install.sh | sh
或者

$ wget -qO- https://raw.github.com/creationix/nvm/v0.4.0/install.sh | sh
以上脚本会把nvm库clone到~/.nvm，然后会在~/.bash_profile, ~/.zshrc或`~/.profile末尾添加source，安装完成之后，你可以用以下命令来安装node

$ nvm install 0.10
使用指定的版本

$ nvm use 0.10
查看当前已经安装的版本

$ nvm ls
.nvm
->  v0.10.24
查看正在使用的版本

$ nvm current
v0.10.24
以指定版本执行脚本

$ nvm run 0.10.24 myApp.js
卸载nvm

$ rm -rf ~/.nvm