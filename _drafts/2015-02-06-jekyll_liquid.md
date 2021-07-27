---
title: Jekyll 系列（二）：初识模板语言 Liquid
category: 随笔
tags: [Jekyll, Liquid]
---

Liquid 是一门开源的模板语言，何为模板语言呢？

我的理解是：

在 HTML 的基础之上，通过一些逻辑语法、变量等控制页面上动态变化的部分，最终生成符合预期的静态文件。

举个例子：

模板语言就像一台甜品加工机器，每个模板语言写好的文件就像一个模子，数据就是制作甜品的原材料；注入不同的 “原材料”，再加上特定的 “模子”，最终就能得到一个特定样式、内容不同的 “甜品” 啦。🎂

Jekyll 默认使用 Liquid 模板语言，支持所有标准的 Liquid 标签和过滤器。Jekyll 甚至增加了几个过滤器和标签，方便使用。

Liquid 代码分为三类：Object、Tags、Filters

## Object

Object 就是在文档需要展示内容的位置，用双花括号 {% raw %}`{{ }}`{% endraw %} 包裹对象或变量名。

数据：

```json
{
  "post": {
    "title": "Liquid is template language"
  }
}
```

输入：{% raw %}`{{ post.title }}`{% endraw %}

输出：`Liquid is template language`

## Tags

Tags 主要用于模板的逻辑控制，包括循环、判断等，由单括号加百分号标识：{% raw %}`{% %}`{% endraw %}

### 注释

### 判断控制

### 循环

### 原始内容

### 变量

## Filters

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

## 参考

- [Liquid docs](https://shopify.github.io/liquid/)

- [Liquid 中文网](https://liquid.bootcss.com/)

- ...

{% comment %}

- [liquid 用法笔记](http://blog.csdn.net/dont27/article/details/38097581)

- [JavaScript Liquid 模板引擎 Tinyliquid](http://www.oschina.net/p/tinyliquid)

{% endcomment %}
