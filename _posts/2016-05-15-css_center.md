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
4. 内容溢出会将父元素撑开

缺点：
1. 辈元素要出现 `display: table;` 属性
2. 需要大量的额外标记

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

## 3. 可视窗口的垂直居中

刚刚介绍的绝对居中可实现父容器的垂直居中，而想要实现可视区域内垂直居中，还需要多一层属性为 `fixed` 的容器。

HTML:

```
<div class="box">
    <div class="demo">
        <img class="img" src="http://i1.piimg.com/503500/97e61bc409806ae1.jpg">
    </div>
</div>
```

CSS:

```
html,
body {
    height: 100%;
    margin: 0;
}
.box {
    position: fixed; // 使容器固定到可视区域中
    height: 100%;
    background: rgba(0,0,0,0.7);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.demo {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.img {
    width: 100%;
}
```

## 4. 侧边栏垂直居中

如果想要内容块垂直居中于一块侧边栏区域，那只需要修改 `top`，`left`，`right`，`bottom` 的值即可，举例内容块绝对居中于右边栏

HTML 同上

CSS:

```
.box {
    width: 300px;
    height: 300px;
    background: #ccc;
    position: relative;
}

// .demo 部分是关键代码，右边栏
.demo {
    position: absolute;
    top: 0;
    left: auto;
    right: 10px;
    bottom: 0;
    margin: auto;
    width: 100px;
    height: 100px;
}

.demo img {
    width: 100px;
}
```

注意：相对的一组属性，有一个大于 0，则另一个为 auto

## 5. 响应式

绝对居中对百分比高宽、及最大最小值都支持良好。

```
// .demo 部分是关键代码
.demo {
    position: absolute;
    top: 0;
    left: auto;
    right: 10px;
    bottom: 0;
    margin: auto;
    width: 50%;
    height: 50%;
    min-width: 200px;
    max-width: 400px;
}
```

## 6. 重绘

绝对居中是唯一支持 `resize:both;` 属性实现垂直居中的技术。

如果设置了 `resize:both;` 属性，则允许用户调整 div 的大小。使用绝对居中可以保持内容块的居中显示

## 7. 图片

如果内容块的内容只是一张图片，可以对图片自身应用绝对居中样式，而不是父元素。

HTML:

```
<body>
    <div class="box">
        <img class="demo" src="http://i1.piimg.com/503500/97e61bc409806ae1.jpg">
    </div>
</body>
```

CSS:

```
.demo {
    width: 50%;
    height: auto;
    min-width: 200px;
    max-width: 400px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```

## 8. 负外边距

使用前提：内容块元素高宽已知，且不会改变

```
// box-sizing: content-box;
.demo {
    width: 400px;
    height: 400px;
    position: absolute;
    padding: 10px;
    top: 50%;
    left: 50%;
    box-sizing: content-box;
    margin-top: calc(- (height + padding) / 2);
    margin-left: calc(- (width + padding) / 2);  
}

// box-sizing: border-box;
.demo {
    width: 400px;
    height: 400px;
    position: absolute;
    padding: 10px;
    top: 50%;
    left: 50%;
    box-sizing: border-box;
    margin-top: calc(- height / 2);
    margin-left: calc(- width / 2);  
}
```

## 9. 变形（Transform）

此方法的原理和负外边距一致，但允许内容块的高宽改变

HTML:

```
<body>
    <div class="box">
        <div class="demo">
            <img class="img" src="http://i1.piimg.com/503500/97e61bc409806ae1.jpg">
        </div>
    </div>
</body>
```

CSS:

```
.demo {
    width: 50%;
    margin: auto;
    position: absolute;
    top: 50%; left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
```

## 10. 行内块元素（Inline-Block）

## 11. 弹性盒子（Flexbox）

CSS3 新增属性，也是设计趋势，不仅用于居中，还能帮助解决分栏、布局等问题。



[资料一](http://blog.csdn.net/freshlover/article/details/11579669)

[资料二](http://blog.163.com/hongshaoguoguo@126/blog/static/1804698120135156225265/)