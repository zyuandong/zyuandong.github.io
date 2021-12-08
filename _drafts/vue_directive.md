---
title: Vue Directive
---

## 局部定义

```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

## 全局定义

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive("focus", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus();
  },
});
```

## 钩子函数

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

- inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

- update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

- componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

- unbind：只调用一次，指令与元素解绑时调用。

接下来我们来看一下钩子函数的参数 (即 el、binding、vnode 和 oldVnode)。

### 钩子函数参数

指令钩子函数会被传入以下参数：

- el：指令所绑定的元素，可以用来直接操作 DOM。
- binding：一个对象，包含以下 property：
  - name：指令名，不包括 v- 前缀。
  - value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
  - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
  - expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
  - arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
  - modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
- vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
- oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

```js
Vue.directive('xx', {
  bind: function(name, binding, vnode, oldVnode) {},
  inserted: function(name, binding, vnode, oldVnode) {},
  update: functin(name, binding, vnode, oldVnode) {},
  componentUpdated: function(name, binding, vnode, oldVnode) {},
  unbind: function(name, binding, vnode, oldVnode) {}
})
```

## 参考

- [自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)

- [vue 自定义指令--directive](https://segmentfault.com/a/1190000018767046)

- [vue2 通过 Vue.directive 自定义指令实现权限判断、防抖节流](https://blog.csdn.net/weixin_42849516/article/details/118100066)

- [Vue.directive 使用注意(小结)*哒哒*前端开发者](https://www.rokub.com/64148.html)

- [Vue directive 回调运用](https://www.cnblogs.com/ylHeyden/p/7544373.html)
