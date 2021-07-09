---
title: 02 Tips
date: 2021-07-05
category:
tags:
last_modified_date: 2021-07-05
---

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
