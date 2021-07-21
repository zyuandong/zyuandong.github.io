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

[JS - Promise使用详解--摘抄笔记](https://www.cnblogs.com/sweeeper/p/8442613.html)

[Promise](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014345008539155e93fc16046d4bb7854943814c4f9dc2000)

[Angularjs promise对象解析](https://www.cnblogs.com/sword-successful/p/4626797.html)

[[AngularJS] AngularJS系列(7) 进阶篇之promise](https://www.cnblogs.com/neverc/p/5928285.html)

[Javascript：Promise对象基础](https://www.jianshu.com/p/82237a7ca6e5)

