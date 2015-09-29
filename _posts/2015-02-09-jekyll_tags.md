---
layout: default
title: jekyll标签归档
category: 百宝箱
tags: [jekyll, liquid]
monthLast: true
---

[用jekyll和jQuery实现异步加载文章列表](http://yanping.me/cn/blog/2012/10/10/asynchronous-loading-post-list-with-jekyll-and-jQuery/)

[用js在jekyll博客中实现标签云和标签页](http://yanping.me/cn/blog/2013/02/13/generate-tags-with-js-in-jekyll-blog/)

[如何使用Jekyll的Category和Tag](http://www.kthinker.com/post/jekyll-category-and-tag/)

[用jekyll生成json](http://yanping.me/cn/blog/2012/04/19/jekyll-with-json/)

[用jekyll生成包含json变量的js脚本](http://yanping.me/cn/blog/2012/04/20/jekyll-with-js-and-json/)


tags 或者 tag 区别

+ 生成 post.json 的 `{{ post.tags }}` 能够识别 tags 和 tag；
+ 但获取文章 tag 的 `{{ page.tags }}` 只能够识别 tags，同理 `{{ page.tag }}` 只能识别 `tag`，但通过 for-in 遍历依然能够获取信息。

因此我还是统一定为 tags。