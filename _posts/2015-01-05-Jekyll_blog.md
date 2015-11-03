---
title: 搭建Jekyll本地环境
category: 杂物间
tag: jekyll
monthLast: true
---

1. 安装[RubyInstaller](http://rubyinstaller.org/downloads/)

下载最新版RubyInstaller,我的安装 `Ruby 2.2.2 (x64)`,安装的时候记得勾选添加环境变量。我的安装位置c:\Ruby22-x64

（这其中已经包含了RubyGems）

可以从命令提示符更新RubyGems

gem update --system

2. 安装[DevKit](http://rubyinstaller.org/downloads/)

在RubyInstaller同一页面中往下拉，选择自己Ruby版本对应的DevKit,下载,运行选择解压位置，我的解压位置c:\DevKit，然后执行：

cd c:\devkit
ruby dk.rb init
ruby dk.rb install

[安装DevKit](http://www.th7.cn/Program/Ruby/201409/280459.shtml)


3. 通过gem安装jekyll

gem install jekyll 

由于didi~的GFW，可能出现许多问题，但是伟大的国人们总是能通过自己的知识、汗水找到解决的办法。taobao有个[仓库镜像](http://ruby.taobao.org/)，可以绕过“天朝”的网络管理制度，还能提高应用程序的下载速度，大赞。

配置下载源的过程如下：


//*查看源*

`gem sources list` 

`gem sources --remove https://rubygems.org/`

gem sources -a https://ruby.taobao.org/

ok，更换源配置搞定

最后一步，cmd打开命令提示符，cd到项目目录下（有_config.yml文件的目录），输入

jekyll --server

启动服务后，访问localhost:4000/项目名称/，即可访问

## markdown 解析器

- kramdown

[Github-Page 推荐的解析器](https://help.github.com/articles/migrating-your-pages-site-from-maruku/)

修改配置文件为

```
markdown: kramdown
kramdown: 
  input: GFM
```

代码块语法可使用 ``` 替换 ```

- redcarpet

执行命令 - `gem install redcarpet`

修改配置文件为

```
markdown: redcarpet
```

[报错参见](http://blog.csdn.net/kong5090041/article/details/38408211)