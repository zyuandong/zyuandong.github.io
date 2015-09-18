---
layout: default
title: 滚动条自动滚到底部
tag: css
monthLast: true
---

许多时候，为了展示效果，我们需要触发一个条件便让滚动条能自动滚到最底部，经过实验与测试，总结如下：

## Mozilla 的 scrollTopMax

先提出一个很有用的 DOM 属性 scrollTopMax，字面意思，它返回的自然就是滚动条的 **长度**。

这里需要特别指出这个长度，它与 scrollTop 的返回值不同，scrollTop 返回的是滚动条当前位置与顶部的偏移量，也就是我们常说的 **高度**。

当然，我们也可以设置 scrollTop 的值，使滚动条滚动到指定的位置。说到这里，你一定想到了如何实现本文的题目了吧。

`DOM.scrollTop = DOM.scrollTopMax;`

这样就能轻松实现。

正当我高高兴兴哼着小调，转站 webkit 内核浏览器测试我的方式时~~~

@！#**&…%…&^$#@##@…@……@%

竟然失效了！！！是的，失效了！！！滚动条稳稳的停在那一动不动。

这下理解为啥标题里要加上 “Mozilla 的” 这几个字了吧，没错，查了资料才发现，scrollTopMax 是 FireFox 浏览器自带的 DOM 属性，瞬间感觉主角 buffer 的光芒熠熠生辉。

## 迂回作战

有问题就有解决的办法，直接亮兵器吧：

~~~
DOM.scrollTop = DOM.scrollHeight - DOM.clientHeight
~~~

这样就能直接打破三路，不管 FrieFox 、Chrome 统统使用~~~

暂时先写到这，继续干活，稍后在做深入实验。

---end---