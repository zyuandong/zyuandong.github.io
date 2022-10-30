---
title: JavaScript - Cookie
---

```js
// 获取对应 path 下的 cookie（和 Expire 相关）
document.cookie;

// 设置 cookie
var exp = new Date();
exp.setTime(exp.getTime() + 3 * 24 * 60 * 60 * 1000); //3天过期
document.cookie = "key=val" + ";expires=" + exp.toGMTString() + ";path=/";
```

## 参考

[Cookie 的 SameSite 属性](https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)
