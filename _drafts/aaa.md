---
title: 隐身模式备份
date: 2020-07-30
category:
tags:
---

el-form el-table 嵌套

el-form el-foem 嵌套

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
