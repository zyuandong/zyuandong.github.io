---
title: Codepen 使用
---

Settings 中可以添加引用资源

举例：添加 Vue + ElementUI

搜索 Vue 出现可选资源，默认是最新版本，可修改版本号：

`https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.14/vue.min.js`

搜索 ElementUI 并选择对应 JS 文件：

`https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.15.7/index.js`

引入 ElementUI 还需要引入对应的 CSS 文件，搜索并不能找到对应的样式文件，但是可以手动配置：

`https://unpkg.com/element-ui@2.15.7/lib/theme-chalk/index.css`

> unpkg.com 是一个用于快速下载、访问 npm 官网中依赖包的网站。但是有可能更新没有跟上 npm 官网，所以会有 npm 发布了新版本，而 unpkg.com 中找不到的问题。现在遇到的就是这个问题。

## 参考

[CodePen - 一个在线的前端代码编辑工具（可用于制作测试页面、代码调试）](https://www.hangge.com/blog/cache/detail_2590.html)

[element 在线运行网站 codepen 报错：Uncaught ReferenceError: Vue is not defined](https://blog.csdn.net/qq_45327886/article/details/124386216)
