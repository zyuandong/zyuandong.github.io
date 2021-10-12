---
title: CSS 布局 / 基础总结
tags: [CSS]
---

- 单列布局
  - header/content/footer 等宽居中布局
  - header/footer 等宽，content 略窄布局
  - 升级：自适应
- 两列布局
  - 一列固定宽度，另一个占满剩余宽度
  - 一列由内容撑开，另一列占满剩余宽度
  - 升级：自适应
- 三列布局
  中间列自适应宽度，旁边两侧固定宽度
  - 圣杯布局和双飞翼布局
- 伪等高布局
- 粘连布局

## 三列布局

- 左右两侧宽度固定
- 中间内容宽度能够自适应

## 双飞翼布局

1. 使用 float 让左中右三列浮动
2. 使用负 margin 让左右两列与中间列处于同一水平线
3. 中间列增加一个 div 内容元素，设置 margin 值为左右两列的宽度
4. 清除浮动，让父元素高度正常显示

- [几种常见的 CSS 布局](https://mp.weixin.qq.com/s?src=11&timestamp=1634028503&ver=3369&signature=-gin9unDpn2TXzIuIfP7monGxfQteIIEXDDzDDQpR1LqNXT1Id-4pIgO4K1WgxDQMpnwk3x08f57hCBkS6Y22y0Ysea2zB18BjfHN3A8fr2A6seB63Tqw-fMQW*TIhew&new=1)
