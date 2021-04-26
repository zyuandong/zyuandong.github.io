---
title: 搭建Jekyll本地环境
category: 杂物间
tag: jekyll
---

## 安装 [Ruby Installer](http://rubyinstaller.org/downloads/)

下载最新版 `Ruby Installer`, 我的安装 `Ruby 2.2.2 (x64)`,安装的时候记得勾选添加环境变量。我的安装位置c:\Ruby22-x64

## RubyGems

> RubyGems 是 Ruby 的一个包管理器，提供了分发 Ruby 程序和库的标准格式 "gem" ，旨在方便地管理 gem 安装的工具，以及用于分发 gem 的服务器

安装 `Ruby Installer` 之后，就可以使用 gem 相关指令集。

### gem 常用指令

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

### 替换 gem 为国内源

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

## 通过 gem 安装 jekyll

`gem install jekyll`

最后一步，cmd打开命令提示符，cd到项目目录下（有_config.yml文件的目录），输入

`jekyll serve`

启动服务后，访问localhost:4000/项目名称/，即可访问

## markdown 解析器

- kramdown

[Github-Page 推荐的解析器](https://help.github.com/articles/migrating-your-pages-site-from-maruku/)

修改配置文件为

```yaml
markdown: kramdown
kramdown: 
  input: GFM
```

代码块语法可使用 ``` 替换 ```

- redcarpet

执行命令 - `gem install redcarpet`

修改配置文件为

```yaml
markdown: redcarpet
```

## 参考资料

[Windows 上安装 Jekyll](http://blog.csdn.net/kong5090041/article/details/38408211)

[Github+Jekyll 搭建个人网站详细教程](https://www.jianshu.com/p/9f71e260925d)