---
title: Jekyll 系列（二）：初识模板语言 Liquid
category: 随笔
tags: [Jekyll, Liquid]
---

## 展示原始内容标签 raw

因为当前博客是基于 Liquid 模板语言解析的，因此当示例代码中包含 Liquid 语言时将会被自动解析，这显然不在我们的预期之内。

此时，`raw` 标签便能解决这个问题，`raw` 标签的作用是禁止处理其所包围的代码，能将其包含的原始内容直接输出。

注：**但经过实际验证 raw 标签不能嵌套，否则会报出语法错误**

用法，其他标签用法一样：

使用 {% raw %}`{% %}`{% endraw %} 包裹 `raw` 为开始标签；使用 {% raw %}`{% %}`{% endraw %} 包裹 `endraw` 为结束标签。

## 注释标签 comment

尽管 Liquid 是模板语言，但也不缺注释功能，{% raw %}`{% comment %}...{% endcomment %}`{% endraw %} 便是其特有的注释标签。

其用法如下：

{% raw %}

```liquid
{% comment %}
// ...
{% endcomment %}
```

{% endraw %}

## 参考资料

- [Liquid docs](https://shopify.github.io/liquid/)

- [Liquid 中文网](https://liquid.bootcss.com/)

- [liquid 用法笔记](http://blog.csdn.net/dont27/article/details/38097581)

- [JavaScript Liquid 模板引擎 Tinyliquid](http://www.oschina.net/p/tinyliquid)

- [liquid-syntax](http://pexcn.me/blog/2014/09/29/liquid-syntax.html)
