---
title: JavaScript Blob
category: 技术
tags: [JavaScript, Blob]
---

xmlHttpRequest 请求的 responseType 需要设置为 blob 或者 arraybuffer

``` javascript
const blob = new Blob([res.data]);
const a = document.createElement('a');
const href = URL.createObjectURL(blob);
a.download = `${dateFormat(new Date())}.docx`;
a.href = href;
a.click();
a.remove();
URL.revokeObjectURL(href);
```

## 参考

- [javascript如何使用Blob对象下载文件](https://www.yisu.com/zixun/152920.html)
- [JS中的Blob对象](https://www.jianshu.com/p/b322c2d5d778)
- [你不知道的 Blob](http://caibaojian.com/blob.html)