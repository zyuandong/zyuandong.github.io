---
title: Jekyll 系列（一）：如何搭建本地环境
category: 随笔
tags: [Jekyll]
---

> Jekyll 是一个简单的博客形态的静态站点生产机器。它有一个模版目录，其中包含原始文本格式的文档，通过一个转换器（如 Markdown）和我们的 Liquid 渲染器转化成一个完整的可发布的静态网站，你可以发布在任何你喜爱的服务器上。Jekyll 也可以运行在 GitHub Page 上，也就是说，你可以使用 GitHub 的服务来搭建你的项目页面、博客或者网站，而且是完全免费的。
> ------ [Jekyll 中文网](http://jekyllcn.com/)

相信很多人使用 Jekyll，都是为了在 GitHub Page 上部署一个属于自己的博客站点，其过程不算太难，网上很容易就能找到大量的教程。

如果初衷只是想拥有一个主题好看、能够发布文章的站点，那参照一些教程配置主题，提交到 GitHub 即可。

但如果是想自己去实现一个特殊样式风格的站点，

如何通过 Github + Jekyll 的方式，部署一个属于自己的博客，过程不算很复杂，将本地符合 Jekyll 目录结构要求的内容，提交到 GitHub 后，若

## 1. 安装 Ruby Installer

下载 [Ruby Installer](http://rubyinstaller.org/downloads/)，版本选择推荐版本，安装的时候记得勾选添加环境变量。

### 1.1. RubyGems

> RubyGems 简称 gems，是 Ruby 的一个包管理器，提供了分发 Ruby 程序和库的标准格式 "gem" ，旨在方便地管理 gem 安装的工具，以及用于分发 gem 的服务器

一个软件包叫做一个 gem，它包含了一个打包的 Ruby Application 或者一个 library。

安装 `Ruby Installer` 之后，就可以使用 gem 相关指令集。

### 1.2. RubyGems 常用指令

```shell
# 更新 gem
gem update --system

# 安装 gem 包
gem install <gem package name>

# 查看源
gem sources list
gem sources -l

# 删除源
gem sources -r <源地址>
gem sources --remove <源地址>

# 添加源
gem sources -a <源地址>
gem sources --add <源地址>
```

### 1.3. 替换 gem 为国内源

1）查看当前 gem 源

`gem sources list` or `gem sources -l`

默认官方源地址：`https://rubygems.org/`

2）删除当前 gem 源

`gem sources --remove https://rubygems.org/`

3）添加国内源

`gem sources -a xxx` or `gem sources --add xxx`

~~淘宝源：`gem sources --add https://ruby.taobao.org/`~~
（淘宝源已失效）

Ruby China：`gem sources --add https://gems.ruby-china.com/`

## 2. 通过 gem 安装 jekyll

`gem install jekyll`

最后一步，cmd 打开命令提示符，cd 到项目目录下（有\_config.yml 文件的目录），输入

`jekyll serve`

启动服务后，访问 localhost:4000/项目名称/，即可访问

## 3. markdown 解析器

- kramdown

[Github-Page 推荐的解析器](https://help.github.com/articles/migrating-your-pages-site-from-maruku/)

修改配置文件为

```yaml
markdown: kramdown
kramdown:
  input: GFM
```

代码块语法可使用 `替换`

- redcarpet

执行命令 - `gem install redcarpet`

修改配置文件为

```yaml
markdown: redcarpet
```

## 4. categories / tags 设计

[jekyll-archives](https://jekyll.github.io/jekyll-archives/)

category 或 tag 中带有空格、/ 等特殊符号

## 5. 分页功能

[jekyll-paginate](https://github.com/jekyll/jekyll-paginate/)

```ruby
# Gemfile
# source
source "https://gems.ruby-china.com/"

group :jekyll_plugins do
  gem "jekyll-archives"
  gem "jekyll-paginate"
end
```

## 6. 参考

- [Jekyll](https://jekyllrb.com/)

- [Jekyll 中文网](http://jekyllcn.com/)

[Windows 上安装 Jekyll](http://blog.csdn.net/kong5090041/article/details/38408211)

[Github+Jekyll 搭建个人网站详细教程](https://www.jianshu.com/p/9f71e260925d)
