---
title: Sublime Text 配置及常用插件
category: 工具
tags: [编辑器, Sublime Text]
---

## 1. 扩展包管理器 Package Control

Package Control 是一个方便 Sublime Text 管理插件的插件，通过简单的步骤就可以安装各种功能强大的插件，为编辑带来更高的效率，下面提供两种安装 Package Control 的方法。

### 1.1. 控制台命令安装

以为 Sublime Text 3 更新了 Python 的函数，API 不同了，所以 3 与 2 的安装命令也有所不同。

从菜单 `View` > `Show Control` 或者 `Ctrl + ~` ，调出控制台，将以下 Python 代码粘贴进去，并回车执行，既可安装完成。

Sublime Text 3:

```
import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())
```

Sublime Text 2:

```
import urllib2,os; pf='Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler( ))); open( os.path.join( ipp, pf), 'wb' ).write( urllib2.urlopen( 'http://sublime.wbond.net/' +pf.replace( ' ','%20' )).read()); print( 'Please restart Sublime Text to finish installation')
```

最后重启 Sublime Text

### 1.2. 手动安装

可能由于各种原因，无法使用代码安装，那可以通过以下步骤手动安装 Package Control:

1. 点击 `Preferences` > `Browse Packages` 菜单

2. 进入打开的目录的上层目录，然后再进入 `Installed Packages/` 目录

3. 下载 Package Control.sublime-package 并复制到 `Installed Packages/` 目录

4. 重启 Sublime Text

按下组合件 `Ctrl + Shift + p` 即可调出命令面板，也就意味着 Package Control 安装成功了。

## 2. 常用插件介绍

大多数的插件都可以通过网站 [Package Control](https://packagecontrol.io/) 查看具体信息。

下面介绍我自己常用的几个插件及其用法。

### 2.1. Emmet

简单命令快速编写页面代码

详情参照 [语法表](http://docs.emmet.io/cheat-sheet/)

### 2.2. Color Highlighter

背景显示 16 进制颜色

### 2.3. BracketHighlighter

代码匹配，可以匹配括号，引号等符号内的范围

[可自己修改配色方案](http://www.dbpoo.com/sublime-text3-brackethighlighter/)

### 2.4. DocBlockr

生成注释模板

### 2.5. Less

Less 语法高亮

### 2.6. SideBarEnhancements

SideBarEnhancements 是一款很实用的右键菜单增强插件在安装该插件前，在 Sublime Text 左侧 FOLDERS 栏中点击右键只有寥寥几个简单的功能

通过 Package Control 安装 SideBarEnhancements 插件后

### 2.7. Markdown Preview

支持 Markdown 语法，直接生成 HTML 进行预览等功能

## 3. 常用快捷键

| 作用 | 快捷键 |
| :--- | :--- |
| 调出控制命令面板 | `Ctrl + Shift + p` |
| 调出控制台 | `Ctrl + ~` |

## 4. 显示空格或制表符

Preference -> Setting-User 添加 `"draw_white_space": "all",`

## 5. 制表符以 4 个空格替换 tab

Preference -> Setting-User 添加

```
"tab_size": 4,
"translate_tabs_to_spaces": true,
```
