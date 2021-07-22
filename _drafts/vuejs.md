---
title: vuejs
date: 2019-12-29
---

**input @change ，当输入变化时，并没有立即触发事件（执行方法），反而是失焦后执行方法**

更改为 @input 后，输入就触发

类似vue的mvvm框架都是数据与视图双向绑定的，而change事件往往用于视图改变的时候去操作数据，这在mvvm框架里面显得多此一举，框架本身已映射视图的变化到数据上，所以绝大部分的change事件监听都是不必要的，对应vue，可改写为methods方法或者computed计算属性。

**表单校验，针对number（integer，float）处理方式不同**

integer:

```
<el-input v-model.number="item" prop="item"></el-input>
rules：{
	item: {
		[type: 'integer', min: x, max: xx, ...]
	}
}
```

float:

v-model.number 不允许输入小数点，因此对于需要输入小数的情况，建议使用 pattern

`<keep-alive></keep-alive>`

solt

## Style scoped

因为标签中使用了 scoped ，因此 .is-current 之后的样式无法实现，e.g:

```vue
<style lang="scss" scoped>
#test {
  .el-tree {
    .is-current {
      color: blue;
    }
  }
}
</style>
```

修改为：

```vue
<style lang="scss" scoped>
#test {
  /deep/ .el-tree {
    .is-current {
      color: blue;
    }
  }
}
</style>

// :deep .el-tree {// ...}

// :deep(.el-tree) {// ...}
```

[vite中引入less，修改组件样式](https://blog.csdn.net/heixiuheixiu666/article/details/114693881)

参考：

[类型为 number 数字验证不通过的BUG](https://github.com/yiminghe/async-validator/issues/21)

[How to apply min/max attribute to v-model in Vue?](https://stackoverflow.com/questions/43285895/how-to-apply-min-max-attribute-to-v-model-in-vue)

[Vue学习笔记-ElmentUI表单校验](https://www.jianshu.com/p/a07c0efba5d0)

[Vue Element表单绑定（三）表单验证2](https://my.oschina.net/tianma3798/blog/3010425)

[rc-form-validation@2.5.0](http://react-component.github.io/form-validation/examples/form.html)

[async-validator](https://github.com/yiminghe/async-validator#transform) *

[表单验证，type为number和regexp时功能错误](https://github.com/ant-design/ant-design/issues/731)

[vue如何使用rules对表单字段进行校验](https://www.cnblogs.com/luoxuemei/p/9295506.html)

[Vue事件API](https://github.com/answershuto/learnVue/blob/master/docs/Vue事件机制.MarkDown) *

---

[vuejs学习——vue+vuex+vue-router项目搭建(一)](https://www.cnblogs.com/ychl/p/6107821.html)

[搭建vue+webpack+mock脚手架（一）](https://segmentfault.com/a/1190000008279215)

[5个Vue.js项目的令人敬畏的模板](https://baijiahao.baidu.com/s?id=1606305883663025122&wfr=spider&for=pc)

### # this.$refs 妙用

[element-ui 中 el-table 自适应容器高度问题](https://segmentfault.com/q/1010000017556641)

[vue+element-ui表格最大高度适配解决方案](https://blog.csdn.net/m13302979400/article/details/88538041)