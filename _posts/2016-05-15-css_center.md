---
title: CSS 实现垂直居中
category: 前端技术
tag: CSS
monthLast: true
---

## 1. 单元表格

```
div {
    height: 300px;
    display: table-cell;
    vertical-align: middle;
}
```

兼容 IE8+，及大多浏览器，作为一个合法的单元格，其父辈元素要有 `display: table;` 出现

## 2. 绝对居中

```
div {
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: **px;
    height: **px;
}
```
没想到 `margin: auto;` 也能实现垂直居中，这方法简单，无需其他标记，超实用。兼容 IE8+，

## 3. 利用IE layout

```
div1 {
    height: 300px;
    position: relative;
}
div1 div2{
    position: absolute;
    top: 50%;
    left: 0;
}
div1 div2 div3{
    position: relative;
    top: -50%;
    left: 0;
}
```

IE5、6、7 有效，IE8+ 和其他浏览器无效

结合以上两点可接近完美效果。

[资料一](http://blog.csdn.net/freshlover/article/details/11579669)

[资料二](http://blog.163.com/hongshaoguoguo@126/blog/static/1804698120135156225265/)