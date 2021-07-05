---
title: 02 Tips
date: 2021-07-05
category:
tags:
---

===  20210705 ===

## npm: axios-mock-adapter

- `const adapter = new MockAdapter(axios);` or `const adapter = new MockAdapter(axiosInstance);`
  - 传值 axios，模拟的接口需要 axios 对象去访问： axios.get(...)
  - 传值 axios 实例，模拟的接口需要 axios 实例去访问：axiosInstance.get(...)
- `adapter.onGet(url).reply(status, data, headers)` or `adapter.onGet(url).reply(return [status, data, headers])`，其中 data 类型为 function
  - `replay(status, data, headers)`: data 为一次性生成，多次调用不会返回新数据
  - `replay(return [status, data, headers])`: 每次调用都会返回新数据
