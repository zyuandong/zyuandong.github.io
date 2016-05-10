---
title: 小白搭建 Linux 开发环境
category: 杂物间
tag: Linux
monthLast: true
---

## 使用 Xshell 连接

某宝的云服务器

输入名称（PS:自定义）
输入公网IP
输入密码

确定 -> 连接

选择 root 方式，勾选记住密码

进入环境，默认为 root，先添加用户（PS: 假设用户名为 xxx）

`adduser xxx`

提示输入密码（PS:自定义）

切换到用户 xxx

`su - xxx`

切换回 root 

`su`

在 xxx 用户下使用 root 命令，提示如下错误：

`xxx is not in the sudoers file. this incident will be reported`

问题的原因是，执行 sudo 命令的用户不在 sudoers 文件的列表中。可以通过编辑 sudoers 文件，来解决这个问题。

[参考一](http://www.tuicool.com/articles/ueERva)

[参考二](http://www.cnblogs.com/zox2011/archive/2013/05/28/3103824.html)

[参考三](http://zhidao.baidu.com/link?url=jw9jw0Rnh3IaSbu4S8n-cNL4tK1CZJYpHyuGrPIhV3irQ3TdAe4pkfcVNilUpVlnZeMgC-EFZsWsxo0niJmZ3_)

安装 zsh 

安装 Tmux

安装 zsh 和 Tmux 前，可能还会遇到需要 curl 等工具，为了方便记忆与查阅，我都全部归纳到一起。

- curl

简单介绍一下，curl 是一个利用 URL 语法在命令行下工作的文件传输工具。

Linux 下通用安装配置 curl 工具

--获得安装包，从网上直接下载或者其他途径，这里直接wget
`$ wget http://curl.haxx.se/download/curl-7.20.0.tar.gz`

--解压到当前目录（或者 http://www.linuxidc.com/Linux/2014-08/106022.htm）
`$ tar -zxf curl-7.20.0.tar.gz`

--进入解压后的目录内
`$ cd curl-7.17.1`

--配置，指定安装的目录，这里是“/usr/local/curl”
`$ ./configure --prefix=/usr/local/curl`

--
# make
--安装
# make install
--安装完毕

使用：
将curl命令加入环境变量，
命令行里执行（仅对本会话起作用，或者在.bash_profile、.bashrc文件里配置环境变量）：
# export PATH=$PATH:/usr/local/curl/bin

设置环境变量 
#vi /etc/profile 添加以下内容： export PATH=$PATH:/usr/local/curl/bin

Ubuntu 用户安装下载器 cURL 7.36.0  http://www.linuxidc.com/Linux/2014-05/102269.htm

Linux curl使用简单介绍 http://www.linuxidc.com/Linux/2008-01/10891.htm

Unix下Curl的使用方法及常用功能记录分享 http://www.linuxidc.com/Linux/2012-08/69154.htm

curl命令使用 http://www.linuxidc.com/Linux/2014-09/107018.htm