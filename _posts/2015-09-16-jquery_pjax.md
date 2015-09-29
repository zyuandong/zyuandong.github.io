---
layout: default
title: jquery-pajx 实现无刷新改变文档内容
category: 工具
tags: [jquery, pajx]
---

## 语法

// 全局定义：
`$(document).pjax('a', [container], options);`

示例：

`$(document).pjax('a', '#container');`


// 选择定义：
`$(document).pjax([selector], [container], options);`

当网站中存在外链或非同域链接，就不能将所有都绑定 pajx ，需要选择给同域下的链接加上选择器

如当前环境是在 a 站内，并存在跳转 b 站的链接 `<a href="http://b.com/xxx"></a>` ，同时 a 站内一定有很多指向本站内的链接 `<a href="http://a.com/xxx"></a>`，我们就需要给这类链接加上标记，class 或 id 等。

官网示例：

~~~
// 加上 data-pjax 属性
<a href="http://a.com/xxx" data-pajx></a>

$(document).pjax('[data-pjax] a, a[data-pjax]', '#container');
~~~

## 依赖

依赖 jQuery 1.8.x or higher

还需要浏览器支持 HTML5 pushState

## 注意事项

+ 如果浏览器不支持pushState接口函数，那就只能退化为ajax或者使用hash bang了~
+ 本地环境下使用的话，浏览器会报错：`Uncaught SecurityError: A history state object with URL file:///E:/baidu_app/demo/PJAX/pic-2’ cannot be created in a document with origin ‘null’.` ，所以如果你要测试的话，请把代码丢到服务器上！
+ 为了得到更好的体验，PJAX经常配合localStorage来使用，把请求到的内容缓存到本地，再一次请求的时候先从本地查看。如果你的内容是动态变化的，缓存的时候加一个缓存时间，方便更新缓存。
+ 还有一个容易忽略的东西是统计，使用PJAX只会局部刷新页面，如果忽略了对统计函数的更新，那就会让你失去很多数据。

window.location.hash 通过判断 url # 锚后记录的地址来决定需要加载的内容

## 参考资料

[小胡子哥](http://barretlee.com/blog/2013/12/06/cb-history-api-in-html5/)

[welefen](http://www.welefen.com/pjax-for-ajax-and-pushstate.html)

[php整合pjax（pushstate+ajax）实现无刷新页面](http://my.oschina.net/ekc/blog/81263)