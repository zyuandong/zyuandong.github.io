---
title: Code Snippets
---

## 获取文件流数据并下载

```js
promiseApi()
  .then((res) => {
    const link = document.createElement("a");
    const url = window.URL.createObjectURL(new Blob([res.data]));
    link.href = url;
    link.setAttribute("download", "xxx.txt");
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  })
  .catch((err) => {});
```
