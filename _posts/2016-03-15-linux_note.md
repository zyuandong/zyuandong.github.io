---
title: 小白上手 Linux
category: 杂物间
tag: Linux
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