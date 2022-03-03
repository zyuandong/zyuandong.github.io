---
title: JavaScript Blob
category: 技术
tags: [JavaScript, Blob]
---

xmlHttpRequest 请求的 responseType 需要设置为 blob 或者 arraybuffer

```javascript
const blob = new Blob([res.data]);
const a = document.createElement("a");
const href = URL.createObjectURL(blob);
a.download = `${dateFormat(new Date())}.docx`;
a.href = href;
a.click();
a.remove();
URL.revokeObjectURL(href);
```

! **手机端浏览器此功能不能正常使用，(iOS 除外)**

## 20220303

```js
// request.js
export const fileDownload = ({ fileContentId }) =>
  request({
    baseURL,
    url: `/files/downFile/${fileContentId}`,
    method: "get",
    // responseType: 'blob'
  });

// xxx.vue
export default {
  methods: {
    down({ fileName, fileContentId }) {
      fileDownload({ fileContentId })
        .then((res) => {
          console.log(res.data);
          let el = document.createElement("a");
          let href = window.URL.createObjectURL(new Blob([res.data]));
          el.setAttribute("href", href);
          el.setAttribute("download", fileName);
          el.click();
          el.remove();
          window.URL.revokeObjectURL(href);
        })
        .catch();
    },
  },
};
```

## 参考

- [javascript 如何使用 Blob 对象下载文件](https://www.yisu.com/zixun/152920.html)
- [JS 中的 Blob 对象](https://www.jianshu.com/p/b322c2d5d778)
- [你不知道的 Blob](http://caibaojian.com/blob.html)
