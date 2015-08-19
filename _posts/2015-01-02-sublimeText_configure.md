---
layout: default
title: 将Sublime Text打造为适合自己的开发工具
monthLSAT: true
---

# 将Sublime Text打造为适合自己的开发工具

## 选择Sublime Text

Sublime Text

notepadd++

eclipse

myeclipse

Vim

Emacs

## 破解Sublime Text

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

###

###

## Sublime Text快捷键

Ctrl + Shift + p 调用控制命令面板

Ctrl + ~ 调出控制台