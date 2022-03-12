---
title: Vue 3.x
---

## Setup

```js
export default {
  components: {},
  props: {},
  emits: [],
  watch: {},
  expose: {},

  setup(props, { atts, slots, emit, expose }) {
    onBeforeMounted();

    onMounted(() => {
      console.log("mounted!");
    });

    onBeforeUpdate();

    onUpdated(() => {
      console.log("updated!");
    });

    onBeforeUnmount();

    onUnmounted(() => {
      console.log("unmounted!");
    });

    onErrorCaptured();

    onRenderTracked();

    onRenderTriggered();

    onActivated();

    onDeactivated();

    return {};
  },
};
```

## Volar

[johnsoncodehk/volar](https://github.com/johnsoncodehk/volar)

[Vue 的 Vetur 被放弃了吗？](https://www.zhihu.com/question/460113658/answer/1900442618)

[Volar - vue 终极开发神器！](https://www.imooc.com/article/317810)

[为什么我感觉 Vue 3 TypeScript 还是不行？](https://www.zhihu.com/question/453332049/answer/1844784032)

## Componsition API (VCA)

[使用 VCA(Vue Composition API)抽离出的通用逻辑应该叫什么？](https://www.zhihu.com/question/412605622)

[vuejs/vitepress/tree/main/src/client/app](https://github.com/vuejs/vitepress/tree/main/src/client/app)

[Vue3.0 Composition API 提取公共逻辑](https://ljylk.cn/?p=762)

## Vue 3.x + Vite + ESLint + Prettier

[vite vue3 项目配置 eslint、prettier](https://talktocomputer.site/blogs/152/)

[[Vue3]使用 Vite+Eslint+Prettier 构建 Vue3 项目规范](https://blog.csdn.net/sinat_41822552/article/details/123212109)

[vite2+eslint+prettier，解决 VSCode 保存时候自动格式化,导致 ESLint 报冲突](https://blog.csdn.net/u013915263/article/details/121277231)

[Parsing error: ImportDeclaration should appear when the mode is ES6 and in the module context.](https://www.cnblogs.com/notfound/p/12377684.html)

[eslint-plugin-vue](https://eslint.vuejs.org/rules/multi-word-component-names.html)

## Vue 3.x 开源项目

[newbee-ltd/newbee-mall-vue3-app](https://github.com/newbee-ltd/newbee-mall-vue3-app)
