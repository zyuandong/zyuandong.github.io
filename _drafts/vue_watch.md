---
title: Vue Watch
tags: [Vue]
---

```vue
<script>
export default {
  computed: {
    defaultActive: function () {
      return this.$route.path;
    },
  },
  watch: {
    $router: function (val) {
      return val;
    },
  },
};
</script>
```

对于普通函数，函数中的 this 指向函数运行时所在的对象。

JS 代码分为 预解析阶段和执行阶段，在预解析阶段遇到函数声明会提前进行预解析，此时下面代码中的箭头函数会在全局定义，因为 var vm = new Vue({...}) 这句代码在预解析阶段还没有被执行。当到了执行阶段并且在控制台改变 a 的值后，watch 中的下面代码中的箭头函数开始执行，此时的运行环境确实是新创建的 vm 对象。但是对于箭头函数来说，箭头函数中的 this 指向的是定义时的对象而不是函数运行时所在的对象，这一点与普通函数有很大的区别。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="app">{{ sum }}</div>

    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          a: 1,
          b: 2,
          sum: 3,
        },
        watch: {
          a: function () {
            console.log(this);
            this.sum = this.a + this.b;
          },
          b: function () {
            this.sum = this.a + this.b;
          },

          // a: () => {
          //   console.log(this);
          //   this.sum = this.a + this.b;
          // },
          // b: () => {
          //   this.sum = this.a + this.b;
          // }
        },
      });
    </script>
  </body>
</html>
```

注意： **箭头函数中的 this 指向的是定义时的对象而不是函数运行时所在的对象**

## 参考

[聊一聊 Vue 中 watch 的回调函数为什么不能是箭头函数？](https://blog.csdn.net/qq_43199318/article/details/103380119)
