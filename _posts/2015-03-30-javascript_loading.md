---
title: 资源加载顺序小结
category: 前端技术
tag: JavaScript
---

## 常用加载js方法及区别

- `<body onload="functionName()">...</body>`
- `$(document).ready(function(){...}); `
- `$(function(){...}); `
- `$(window).load(function(){...}); `
- `window.load = function(){...} `
- `document.body.load = function(){...} `

1. window.onload 页面全部加载完成，甚至包括图片

- window.onload = function() {};
- window.onload = funName;

2. body.onload 等 document 加载完成再加载相应的脚本

`<body onload='init()'></body>`

3. document.onreadystatechang 当页面加载状态改变的时候执行这个方法

```
document.onreadystatechange = function() {
    if(document.readyState == 'complete') {
        // 具体执行的代码部分
    }
}
```

在chrome浏览器中，Jquery中的$(document).ready(function(){});事件将会在浏览器加载完文本后立即执行，此时，图片尚未加载。因此，在此事件中将无法获正确获取图片的高度和宽度值。但是在ie，firefox流览器中，在些事件中可以获取图片的高度和宽度值 。

为了兼容这两种浏览器，可以使用$(window).load(function(evt){});事件来代替。这样将可正确获得图片的宽度和高度值。

## 浏览器之间的区别

## 参考资料

[链接一](http://www.cnblogs.com/itprogrammer/archive/2010/10/22/1858131.html)

[链接二](http://www.poluoluo.com/jzxy/201405/275920.html)

[链接三](http://zhangzhaoaaa.iteye.com/blog/2124690)