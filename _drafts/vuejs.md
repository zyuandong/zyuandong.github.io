---
title: vuejs
date: 2019-12-29
---

## 组件/实例的选项的顺序

组件/实例的选项应该有统一的顺序。

这是我们推荐的组件选项默认顺序。它们被划分为几大类，所以你也能知道从插件里添加的新 property 应该放到哪里。

1. 副作用 (触发组件外的影响)

   - el

2. 全局感知 (要求组件以外的知识)

   - name
   - parent

3. 组件类型 (更改组件的类型)

   - functional

4. 模板修改器 (改变模板的编译方式)

   - delimiters
   - comments

5. 模板依赖 (模板内使用的资源)

   - components
   - directives
   - filters

6. 组合 (向选项里合并 property)

   - extends
   - mixins

7. 接口 (组件的接口)

   - inheritAttrs
   - model
   - props/propsData

8. 本地状态 (本地的响应式 property)

   - data
   - computed

9. 事件 (通过响应式事件触发的回调)

   - watch
   - 生命周期钩子 (按照它们被调用的顺序)
     - beforeCreate
     - created
     - beforeMount
     - mounted
     - beforeUpdate
     - updated
     - activated
     - deactivated
     - beforeDestroy
     - destroyed

10. 非响应式的 property (不依赖响应系统的实例 property)

    - methods

11. 渲染 (组件输出的声明式描述)

    - template/render
    - renderError

## 元素 attribute 的顺序

元素 (包括组件) 的 attribute 应该有统一的顺序。

这是我们为组件选项推荐的默认顺序。它们被划分为几大类，所以你也能知道新添加的自定义 attribute 和指令应该放到哪里。

1. 定义 (提供组件的选项)

   - is

2. 列表渲染 (创建多个变化的相同元素)

   - v-for

3. 条件渲染 (元素是否渲染/显示)

   - v-if
   - v-else-if
   - v-else
   - v-show
   - v-cloak

4. 渲染方式 (改变元素的渲染方式)

   - v-pre
   - v-once

5. 全局感知 (需要超越组件的知识)

   - id

6. 唯一的 attribute (需要唯一值的 attribute)

   - ref
   - key

7. 双向绑定 (把绑定和事件结合起来)

   - v-model

8. 其它 attribute (所有普通的绑定或未绑定的 attribute)

9. 事件 (组件事件监听器)

   - v-on

10. 内容 (覆写元素的内容)

    - v-html
    - v-text

---

现象：

父组件获取到数组数据，传递给子组件，子组件并不能正常展示数据。

解决：

父组件在使用子组件 template 时，加上 v-if 判断传递的数据是否为空。

思考：

可能是因为获取数据是一个异步过程，渲染子组件时，还没有获取到数据，获取到数据之后又缺少一个检测机制，导致子组件中无法响应最终的数据。

优化：

在设计组件时，应遵循各司其职的原则，一般子组件需要的数据就在子组件中获取。

---

**input @change ，当输入变化时，并没有立即触发事件（执行方法），反而是失焦后执行方法**

更改为 @input 后，输入就触发

类似 vue 的 mvvm 框架都是数据与视图双向绑定的，而 change 事件往往用于视图改变的时候去操作数据，这在 mvvm 框架里面显得多此一举，框架本身已映射视图的变化到数据上，所以绝大部分的 change 事件监听都是不必要的，对应 vue，可改写为 methods 方法或者 computed 计算属性。

**表单校验，针对 number（integer，float）处理方式不同**

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

// :deep .el-tree {// ...} // :deep(.el-tree) {// ...}
```

[vite 中引入 less，修改组件样式](https://blog.csdn.net/heixiuheixiu666/article/details/114693881)

参考：

[类型为 number 数字验证不通过的 BUG](https://github.com/yiminghe/async-validator/issues/21)

[How to apply min/max attribute to v-model in Vue?](https://stackoverflow.com/questions/43285895/how-to-apply-min-max-attribute-to-v-model-in-vue)

[Vue 学习笔记-ElmentUI 表单校验](https://www.jianshu.com/p/a07c0efba5d0)

[Vue Element 表单绑定（三）表单验证 2](https://my.oschina.net/tianma3798/blog/3010425)

[rc-form-validation@2.5.0](http://react-component.github.io/form-validation/examples/form.html)

[async-validator](https://github.com/yiminghe/async-validator#transform) \*

[表单验证，type 为 number 和 regexp 时功能错误](https://github.com/ant-design/ant-design/issues/731)

[vue 如何使用 rules 对表单字段进行校验](https://www.cnblogs.com/luoxuemei/p/9295506.html)

[Vue 事件 API](https://github.com/answershuto/learnVue/blob/master/docs/Vue事件机制.MarkDown) \*

---

[vuejs 学习——vue+vuex+vue-router 项目搭建(一)](https://www.cnblogs.com/ychl/p/6107821.html)

[搭建 vue+webpack+mock 脚手架（一）](https://segmentfault.com/a/1190000008279215)

[5 个 Vue.js 项目的令人敬畏的模板](https://baijiahao.baidu.com/s?id=1606305883663025122&wfr=spider&for=pc)

### # this.$refs 妙用

[element-ui 中 el-table 自适应容器高度问题](https://segmentfault.com/q/1010000017556641)

[vue+element-ui 表格最大高度适配解决方案](https://blog.csdn.net/m13302979400/article/details/88538041)
