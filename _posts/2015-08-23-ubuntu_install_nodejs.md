---
title: Node.js 安装及版本控制
category: 技术
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

```
$ sudo npm install -g n
```

安装完成之后，直接输入n后输出当前已经安装的node版本以及正在使用的版本（前面有一个o），你可以通过移动上下方向键来选择要使用的版本，最后按回车生效。

#### 使用 

常用指令：

```
n latest //安装最新的版本

n stable //安装稳定版本

n rm [version] //删除某个版本

n use [version] [xxx.js] //以指定的版本来执行脚本
```

### nvm

nvm 全称 Node Version Manager，它与n的实现方式不同，其是通过shell脚本实现的。

Linux 系统下安装方式有两种：

```
$ curl https://raw.github.com/creationix/nvm/v0.4.0/install.sh | sh

或者

$ wget -qO- https://raw.github.com/creationix/nvm/v0.4.0/install.sh | sh
```

以上脚本会把nvm库clone到~/.nvm，然后会在~/.bash_profile, ~/.zshrc或`~/.profile末尾添加source。

Windows 系统下安装方式：

下载 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) 安装。

安装完成之后，在 cmd 中输入 nvm 既会有想关操作提示。

#### 使用

常用指令：

```
nvm install [version] //安裝指定版本的 Node

nvm ls / nvm list //列出已安裝清单

nvm use [version] //切换使用的 Node 版本

nvm uninstall [version] //卸载指定版本的 Node
```