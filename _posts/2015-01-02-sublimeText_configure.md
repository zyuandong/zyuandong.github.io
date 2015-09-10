---
layout: default
title: 将Sublime Text打造为适合自己的开发工具
---

## 选择Sublime Text

Sublime Text

notepadd++

eclipse

myeclipse

Vim

Emacs

## 破解Sublime Text

...

## 必备Package Control（扩展包管理器）

### 一、控制台命令安装

Sublime Text 3

~~~
import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())
~~~

Sublime Text 2

~~~
import urllib2,os; pf='Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler( ))); open( os.path.join( ipp, pf), 'wb' ).write( urllib2.urlopen( 'http://sublime.wbond.net/' +pf.replace( ' ','%20' )).read()); print( 'Please restart Sublime Text to finish installation')
~~~

重启Sublime Text

### 二、手动安装

可能由于各种原因，无法使用代码安装，那可以通过以下步骤手动安装Package Control：

1. 点击Preferences > Browse Packages菜单

2. 进入打开的目录的上层目录，然后再进入Installed Packages/目录

3. 下载Package Control.sublime-package并复制到Installed Packages/目录

4. 重启Sublime Text


## 常用插件介绍

http://www.th7.cn/web/js/201411/68112.shtml

- Emmet

简单命令快速编写页面代码

- Color Highlighter

背景显示16进制颜色

- BracketHighlighter

代码匹配，可以匹配括号，引号等符号内的范围

[可自己修改配色方案](http://www.dbpoo.com/sublime-text3-brackethighlighter/)

- DocBlockr 

生成注释模板

- Tag

HTML/XML标签缩进、补全、排版和校验工具

Ctrl + Alt + f 自动排版

- Less

Less语法高亮

- SideBarEnhancements

SideBarEnhancements是一款很实用的右键菜单增强插件在安装该插件前，在Sublime Text左侧FOLDERS栏中点击右键只有寥寥几个简单的功能

通过Package Control安装SideBarEnhancements插件后

- Markdown Preview

支持Markdown语法，直接生成HTML进行预览等功能

[Sublime Text Package](https://packagecontrol.io/)

###

## Sublime Text快捷键

Ctrl + Shift + p 调用控制命令面板

Ctrl + ~ 调出控制台