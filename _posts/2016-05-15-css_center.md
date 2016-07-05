---
title: CSS 实现垂直居中
category: 前端技术
tag: CSS
monthLast: true
---

## 1. 单元表格

HTML:

```
<body>
    <div class="box">
        <div class="demo">
            <img src="http://i1.piimg.com/503500/97e61bc409806ae1.jpg">
            <!--我是一行居中的文字-->
        </div>
    </div>
</body>
```

CSS:

```
.box {
    width: 300px;
    height: 300px;
    display: table;
    background: #ccc;
}

// .demo 部分是关键代码
.demo {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}

.demo img {
    width: 100px;
}
```

优点：
1. 兼容 IE8+，及大多浏览器
2. 代码简单
3. 图片、文字均适用

缺点：
父辈元素要出现 `display: table;` 属性。

## 2. 绝对居中

HTML: 

```
<body>
    <div class="box">
        <div class="demo">
            <img src="http://i1.piimg.com/503500/97e61bc409806ae1.jpg">
        </div>
    </div>
</body>
```

CSS:

```
.box {
    width: 300px;
    height: 300px;
    background: #ccc;
    position: relative;
}

// .demo 部分是关键代码
.demo {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100px;
    height: 100px;
}

.demo img {
    width: 100px;
}
```

优点：
1. 兼容 IE8+
2. 代码简单

缺点：
居中元素需要设置 `height`，这样意味着如果居中元素中有文字，文字将会从顶部排列，并不是完全垂直居中。


[资料一](http://blog.csdn.net/freshlover/article/details/11579669)

[资料二](http://blog.163.com/hongshaoguoguo@126/blog/static/1804698120135156225265/)