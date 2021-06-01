---
title: 01 Tips
date: 2020-07-30
category:
tags:
---

el-form el-table 嵌套

el-form el-form 嵌套

nginx try_file

input array 修改无效 举例： 数据运维，查询详细数据的动态过滤条件
[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)

process.env

vue sourceMap

pull request

vue-router hash history

git stash

HX 创建 与 cli 创建小程序的区别

mvvm mvc mvp

bfc

Avoided redundant navigation to current location

---

错误信息
`Computed property “XXX” was assigned to but it has no setter`

[解答](https://blog.csdn.net/JackieDYH/article/details/106743975)

原因：
1、组件中 `v-model="value"`, value 又是 vuex state 中的某个变量
2、vuex 是单向流、v-model 是双向绑定，
3、computed 中只通过get获取参数值，没有set无法改变参数值

解决：
computed 中改为 set/get

``` js
{
  computed: {
    value: {
      set(v){
        this.$store.state.value = v
      },
      get(){
        return this.$store.state.value
      }
    }
  }
}
```

---

zsh / bash

[Mac下使用oh-my-zsh配置Java环境变量和安装maven](https://www.jianshu.com/p/a61714913e26)

[MAC下安装多版本JDK和切换几种方式](https://www.jianshu.com/p/eb0e39651d9e)

[Mac 安装多个版本jdk并切换](https://blog.csdn.net/qq_37570296/article/details/80260260)

[整理：使用 Visual Studio Code (vscode) 编写、运行、 调试 Java 应用程序](https://blog.csdn.net/bat67/article/details/78289602)

[VSCode编写Java程序的最新问题](https://zhangyx.blog.csdn.net/article/details/107599423) ***

## 1. CSS 选择器 img::after 问题

- [图片加载失败后CSS样式处理最佳实践](https://www.zhangxinxu.com/wordpress/2020/10/css-style-image-load-fail/)
- [CSS 无图片显示加载(&失败)效果](https://segmentfault.com/a/1190000005122691)

## 2. CSS 函数 var()、attr()

## 3. 色彩搭配

- [配色表](http://www.peisebiao.cn/)
- [标志库](http://www.biaozhiku.com/)
- [纹理库-配色器](http://www.wenliku.com/color/)
- [HSB色彩模型配色法](http://www.wenliku.com/sheji/24078.html)
- [9组高级感配色方案参考](http://www.wenliku.com/sheji/23832.html)

## 4. Markdown

- [一份简明的 Markdown 笔记与教程](https://mazhuang.org/2018/09/06/markdown-intro/#%E4%BB%BB%E5%8A%A1%E5%88%97%E8%A1%A8)

## 5. Jekyll

- [wx: 学习 jekyll 背后的技术原理（静态网站）](https://mp.weixin.qq.com/s?src=11&timestamp=1622535289&ver=3103&signature=Ugb3Nlzg*4hEd20stLGwLrQufRfwaWWBNyQftc2uWqKeP4Yxk0itXXzlum2PmnEMhkPRdfvHcUlzYv2DwKB6xQ1krLn2sRjX7qkZMqHt6WMEML2u-PQa*o3ESsQTo25K&new=1)
- [前端小课](https://lefex.github.io/)
- [Rouge](https://github.com/rouge-ruby/rouge)
- [jekyll php高亮代码,[Html]Jekyll 代码高亮的几种选择_html/css_WEB-ITnose](https://blog.csdn.net/weixin_34434948/article/details/116058330)
- [Jekyll 使用 Rouge 主题](https://www.cnblogs.com/baiyangcao/p/jekyll_rouge.html)

## 6. JavaScript Blob

Tips：

- 接口返回数据类型设置为 blob
  - `responseType: 'blog'`
- 处理返回数据，并以文件的形式直接下载

```js
if (res.status === 200) {
  const blob = new Blob([res.data]);
  const a = document.createElement('a');
  const href = URL.createObjectURL(blob);
  a.download = `${dateFormat(new Date())}.docx`;
  a.href = href;
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}
```

- [JS中的Blob对象](https://www.jianshu.com/p/b322c2d5d778)

- [wx: 50个常用js库，别再重复造轮子了！](https://mp.weixin.qq.com/s?src=11&timestamp=1622536643&ver=3103&signature=-*0y8co25p48lTIdDcwG1dFiPhs9qqsaP3RNfxUI5XyoBF7DEOcioI1eiCqXqf5wcGyIwAbatAaCKRmwiMvABOInDL2Aamaihy79dfIb7Ds2sknRIxFsgP0cBpW0GbFQ&new=1)
