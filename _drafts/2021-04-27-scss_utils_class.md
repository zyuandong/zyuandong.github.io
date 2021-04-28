---
title: 使用 scss 定义常用工具类
date: 2021-04-27
---

## 生成工具类

```scss
$placements: 't', 'r', 'b', 'l';

@for $number from 0 through 100 {
  // .w-#{$number} {
  //   width: #{$number}rem;
  // }
  // .w-p-#{$number} {
  //   width: percentage($number)
  // }
  .p-#{$number} {
    padding: #{$number}rem;
  }
  .m-#{$number} {
    margin: #{$number}rem;
  }

  @each $placement in $placements {
    @if $placement == 't' {
      .p-#{$placement}-#{$number} {
        padding: #{$number}rem 0 0 0;
      }
      .m-#{$placement}-#{$number} {
        margin: #{$number}rem 0 0 0;
      }
    } @else if $placement == 'r' {
      .p-#{$placement}-#{$number} {
        padding: 0 #{$number}rem 0 0;
      }
      .m-#{$placement}-#{$number} {
        margin: 0 #{$number}rem 0 0;
      }
    } @else if $placement == 'b' {
      .p-#{$placement}-#{$number} {
        padding: 0 0 #{$number}rem 0;
      }
      .m-#{$placement}-#{$number} {
        margin: 0 0 #{$number}rem 0;
      }
    } @else if $placement == 'l' {
      .p-#{$placement}-#{$number} {
        padding: 0 0 0 #{$number}rem;
      }
      .m-#{$placement}-#{$number} {
        margin: 0 0 0 #{$number}rem;
      }
    }
  }
}
```

相关概念：
1. 变量
2. `@for` 遍历整数区间
3. `@each` 遍历 list/map
4. `@if/@else/@else if`
5. 内置模块 `math.percentage()`

## 工具

[Sass/SCSS 2 CSS](https://www.sassmeister.com/)
[CSS 2 Sass/SCSS](http://css2sass.herokuapp.com/)

## 参考资料

[Less 中文网](http://lesscss.cn/)
[Less 英文网](https://lesscss.org/)
[Sass/SCSS 官网](https://sass-lang.com/)
[记一次vue+element+echarts项目的优化（如何轻松将项目性能提升70%）](https://juejin.cn/post/6844903607985258510)
