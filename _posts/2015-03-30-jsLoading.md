---
layout: default
title: 资源加载顺序小结
tags: JavaScript
monthLast: true
---

# 资源加载顺序小结

## 常用加载js方法及区别

- `<body onload="functionName()">...</body>`
- `$(document).ready(function(){...}); `
- `$(function(){...}); `
- `$(window).load(function(){...}); `
- `window.load = function(){...} `
- `document.body.load = function(){...} `

在chrome浏览器中，Jquery中的$(document).ready(function(){});事件将会在浏览器加载完文本后立即执行，此时，图片尚未加载。因此，在此事件中将无法获正确获取图片的高度和宽度值。但是在ie，firefox流览器中，在些事件中可以获取图片的高度和宽度值 。

为了兼容这两种浏览器，可以使用$(window).load(function(evt){});事件来代替。这样将可正确获得图片的宽度和高度值。

## 浏览器之间的区别

## 相关链接

[链接一](http://www.cnblogs.com/itprogrammer/archive/2010/10/22/1858131.html)

[链接二](http://www.poluoluo.com/jzxy/201405/275920.html)

[链接三](http://zhangzhaoaaa.iteye.com/blog/2124690)

## 待总结。。。。