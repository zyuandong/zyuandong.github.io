---
title: CSS 动画
---

| 属性                      | 描述                                                                                   |
| :------------------------ | :------------------------------------------------------------------------------------- |
| @keyframes                | 规定动画                                                                               |
| animation                 | 所有动画属性的简写属性                                                                 |
| animation-name            | 规定 @keyframes 动画的名称                                                             |
| animation-duration        | 规定动画完成一个周期所花费的秒或毫秒。默认是 0                                         |
| animation-timing-function | 规定动画的速度曲线。默认是 "ease"                                                      |
| animation-fill-mode       | 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式 |
| animation-delay           | 规定动画何时开始。默认是 0                                                             |
| animation-iteration-count | 规定动画被播放的次数。默认是 1                                                         |
| animation-direction       | 规定动画是否在下一周期逆向地播放。默认是 "normal"                                      |
| animation-play-state      | 规定动画是否正在运行或暂停。默认是 "running"                                           |

示例：

```css
@keyframes myfirst {
  0% {
    background: red;
  }
  25% {
    background: yellow;
  }
  50% {
    background: blue;
  }
  100% {
    background: green;
  }
}

@-webkit-keyframes myfirst /* Safari 与 Chrome */ {
  0% {
    background: red;
  }
  25% {
    background: yellow;
  }
  50% {
    background: blue;
  }
  100% {
    background: green;
  }
}

div {
  animation-name: myfirst;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-delay: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-play-state: running;
  /* Safari 与 Chrome: */
  -webkit-animation-name: myfirst;
  -webkit-animation-duration: 5s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-delay: 2s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  -webkit-animation-play-state: running;
}
```

animation 简写方式：

```css
div {
  animation: myfirst 5s linear 2s infinite alternate;
  /* Safari 与 Chrome: */
  -webkit-animation: myfirst 5s linear 2s infinite alternate;
}
```
