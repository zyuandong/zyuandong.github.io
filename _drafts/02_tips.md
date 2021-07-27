---
title: 02 Tips
date: 2021-07-05
category:
tags:
last_modified_date: 2021-07-05
---

## === 20210727 ===

[subpng](https://www.subpng.com/png-c6gb7r/)

[joypixels](https://www.joypixels.com/)

[让 Web 页在 Windows 下支持 Emoji 显示](https://zhuanlan.zhihu.com/p/101111226)

## === 20210720 ===

[sg:wx CSS3实战小技巧--使用CSS变量实现波浪动画](https://mp.weixin.qq.com/s?src=11&timestamp=1626675301&ver=3199&signature=Ajwvf8aIXarpHbOK-Fm0-4KepbxvVTezoaxiGmyNZ9id8KwChJz5InsZn0Xule2*NdxuD7tK7b-b9WPM6fAya39Kusb7yMFasAyfx89loWxP8Vd1QDgQ6f6YZOCOfRYI&new=1)

[vue elementui实现主题色皮肤切换](https://www.jianshu.com/p/199f450e1001)

[vite 下一代前端开发与构建工具(一)](https://juejin.cn/post/6983587446541778957)

[详解利用css3的var()实现运行时改变scss的变量值](https://www.jb51.net/css/765884.html)

## === 20210716 ===

FormData 对象、上传文件

[FormData 对象的使用](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects)

[FormData API](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)

[关于前端上传文件全面基础扫盲贴(三) ----- FormData](https://segmentfault.com/a/1190000019945843)

[前端用FormData实现文件上传以及图片回显](https://www.jianshu.com/p/05dbd59895b6)

[elementUI实现自定义上传文件并携带参数](https://www.jianshu.com/p/09ea2762eaae)

[如何使用Swagger上传文件](https://www.jb51.net/article/140105.htm)

## === 20210715 ===

坑：Vue3.x 子组件使用 reactive() 接收 props 时，字段应相同，e.g.

```javascript
export default {
  props: {
    data: Object
  },
  setup(props) {
    const state = reactive({
      data: props.data, // ok
      dataObj: props.data // 有异常
    })
  }
}
```

~~当父组件更新 data 对象中的一个字段时，子组件中的 data，dataObj 均能正常更新~~

~~当父组件更新整个 data 对象时，子组件中只有 data 能够正常响应更新；dataObj 还是原来的值~~

props 值就是 Proxy 对象，template 模板中可以直接访问，不需要 setup() return

### Vue3.x watch props

```javascript
<template>
  <div>{{ data }}</div>
</template>

export default {
  props: {
    data: Object
  },
  setup(props) {
    watch(() => props.data, (val, oldVal) => {
      console.log(val, oldVal);
    });

    return {
      // ...
    }
  }
}
```

## === 20210714 ===

[sg:wx vue组件之间的传值](https://mp.weixin.qq.com/s?src=11&timestamp=1626312303&ver=3191&signature=Zn6JjM5VfHvI3kUriEXn3bv*EvRGA*cdZlmS61utbfSRnrWI*Vs4QaKf0uVeg6RaJeolEsGEMtZecs8zNBZJqWqSBoFLqYZj4sUM5ydhAVHDybLgvJlJXN6NGJJogOrF&new=1)

[sg:wx Vue3响应式系统源码解析-Ref篇](https://mp.weixin.qq.com/s?src=11&timestamp=1626312316&ver=3191&signature=D267wMWqd28kw-QbJtD1ie*lMp2vSkXvk52DJYPgRdxKZWVyltjqyS2h7O6h9f-K6xYymO8C7jrdvLt8cTZoUVsIZgdoqH*YJYm3ukqO4h9Vsv6*cnaRXINqWYxfgjh*&new=1)

[全面了解Vue3的 ref 和相关函数和计算属性](https://www.cnblogs.com/jyk/p/14639578.html)

## === 20210713 ===

[sg:wx 总结一下，Vue3 与 Vue2 的Props、全局组件的异同点！](https://mp.weixin.qq.com/s?src=11&timestamp=1626168242&ver=3188&signature=301mQAhB6SHmwp2-T0kU-PAYsz5lckQe3SJSuLRnCVU48ZdwA*B6AGpiZyx90oHDDZrBaTbOCPgtvF6sZi-LXT4JXGZfTdhL2gAXpDs3utk54n*imqoge44qL37wViRF&new=1)

[vue3+typescript+element-plus表单验证(非获取实例)](https://www.cnblogs.com/delgoh/p/14276576.html)

[vue3封装表单组件,不能触发element-plus的form/form-item的验证事件，解决办法](https://blog.csdn.net/u011401390/article/details/116298509)

[重学vue之vue3中compositionAPI](https://blog.csdn.net/qq_45549336/article/details/111034107)

[antd vue表单验证_使用Vue Composition API写出清晰、可扩展的表单](https://blog.csdn.net/weixin_30025473/article/details/112175144)

[Vue3.0系列之表单验证](https://blog.csdn.net/muou_hang/article/details/106147026)

## === 20210709 ===

[sg:wx JavaScript - parseFloat](https://mp.weixin.qq.com/s?src=11&timestamp=1625644576&ver=3175&signature=YH7cr*8irRJRfE4Xnm26OQA8bo3h4je7uH6P466Wfr4q-g-Fv8GIBACAa*jgRtbDZCVoFNnwxO80hi6tKLuIWaZZX8k*7yNZUcMitYqhwcVmbE*2t4DfZX*OSIVpNoMw&new=1)

## === 20210706 ===

- 坑：axios-mock-adapter 会拦截所有请求，这样会导致原本想获取真实接口的请求也被拦截
  解决办法：`const adapter = new MockAdapter(axiosInstance, { onNoMatch: 'passthrough' })`，添加配置 `{ onNoMatch: 'passthrough' }`

在 JavaScript 中，如何判断值是否为 NaN

- `window.isNaN()`
  - `window.isNaN(1)` // false
  - `window.isNaN('1')` // false
  - `window.isNaN(true)` // false
  - `window.isNaN(null)` // false
  - `window.isNaN(Symbol())` // TypeError: Cannot convert a Symbol value to a number
  - `window.isNaN(undefined)` // true
  - `window.isNaN('abc')` // true
  - `window.isNaN({a: 1})` // true
  - `window.isNaN(NaN)` // true
  - 先使用 `typeof` 判断是否为： "number"，再使用 `window.isNaN()` 判断是否为 NaN
  - isNaN() 本意是通过 Number 方法把参数转换成数字类型，如若转换成功，则返回 false，反之返回 true，它只是判断参数是否能转成数字，不能用来判断是否严格等于 NaN
- ES6: `Number.isNaN()`
  - 只有 `Number.isNaN(NaN)` // true
- ES6: `Object.is()`
  - `Object.is(0 , ' ')` // false
  - `Object.is(null, undefined)` // false
  - `Object.is([1], true)` // false
  - `Object.is(-0, +0)` // false
  - `Object.is(NaN, NaN)` // true
- `NaN != NaN` // true

[sg:wx Vue 3 生命周期完整指南](https://mp.weixin.qq.com/s?src=11&timestamp=1625478471&ver=3172&signature=IonT52-KTMtZbg5QZi7gSVt18DL--okr*LvghZQd9*GefzIeElHpxmRZWNEHidpTKTLlxJta4AF-Ltna-hfo16-3*kB*3KbMJIsiD5bNTcjcZ94AZlQDmU1xbdhysfiY&new=1)

[接口：mock 模拟数据以及接口调用遇到的 axios 的坑](https://blog.csdn.net/u013592575/article/details/79211997/)

[前端工具 mock 的使用 - 造数据模拟网络请求](https://www.cnblogs.com/tandaxia/p/7885957.html)

[Vue NodeGui](https://vue.nodegui.org/)

[blog: 退之](http://www.yanghongdong.cn/)

[axios-mock-adapter：axios 的模拟调试器](https://segmentfault.com/a/1190000009464850)

[详解 vue2.0+axios+mock+axios-mock+adapter 实现登陆](https://www.jb51.net/article/144048.htm)

[vue3 中使用 element-plus 调用 message](https://blog.csdn.net/qq_40185480/article/details/110926273)

[github: newbee-ltd](https://github.com/newbee-ltd)

[Axios 与 qs](https://www.jianshu.com/p/dfcbcfa726a3)

[axios 中的 qs 介绍](https://www.jianshu.com/p/67223e177aa6)

[Vite 实现原理](https://blog.csdn.net/weixin_38550182/article/details/116714630)

## === 20210705 ===

## npm: axios-mock-adapter

- `const adapter = new MockAdapter(axios);` or `const adapter = new MockAdapter(axiosInstance);`
  - 传值 axios，模拟的接口需要 axios 对象去访问： axios.get(...)
  - 传值 axios 实例，模拟的接口需要 axios 实例去访问：axiosInstance.get(...)
- `adapter.onGet(url).reply(status, data, headers)` or `adapter.onGet(url).reply(return [status, data, headers])`，其中 data 类型为 function
  - `replay(status, data, headers)`: data 为一次性生成，多次调用不会返回新数据
  - `replay(return [status, data, headers])`: 每次调用都会返回新数据
