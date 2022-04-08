---
title: Promise
category:
tags:
---

```javascript
Promise.all([getRuleZyx(), getRuleZh(), getRuleZx(), getRuleZtmc()])
  .then(([resZyx, resZh, resZx, resZtmc]) => {
    state.zyx = resZyx.data.data;
    state.zh = resZh.data.data;
    state.zx = resZx.data.data;
    state.ztmc = resZtmc.data.data;
  })
  .catch(() => {});
```

所有 promise 全部 resolve:

```js
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);
Promise.all([p1, p2, p3]).then((res) => {
  console.log(res); // [1,2,3]
});
```

任何 promise 为 reject, 整个 Promise.all 立即终止，并返回此 reject:

```js
const p1 = Promise.resolve(1);
const p2 = Promise.reject(2);
const p3 = Promise.resolve(3);
Promise.all([p1, p2, p3])
  .then((res) => {
    // then 方法不会被执行
    console.log(res);
  })
  .catch((err) => {
    // catch 方法将会被执行，输出结果为：2
    console.log(err);
  });
```

[JS - Promise 使用详解--摘抄笔记](https://www.cnblogs.com/sweeeper/p/8442613.html)

[Promise](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014345008539155e93fc16046d4bb7854943814c4f9dc2000)

[Angularjs promise 对象解析](https://www.cnblogs.com/sword-successful/p/4626797.html)

[[AngularJS] AngularJS 系列(7) 进阶篇之 promise](https://www.cnblogs.com/neverc/p/5928285.html)

[Javascript：Promise 对象基础](https://www.jianshu.com/p/82237a7ca6e5)

[［ES6］Promise 对象 Promise.all()方法的使用](https://itbilu.com/javascript/js/41KMSZ9a.html)

[Promise 的 fulfill 和 resolve 为啥要用两个词?](https://www.zhihu.com/question/34445479)
