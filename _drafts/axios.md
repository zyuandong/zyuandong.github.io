---
title: Axios
---

```js
import Axios from 'axios';

const instance = Axios.create({
  headers: {},
  baseURL: '',
  timeout: 1000,
});

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
```

## 参考

[axios/zh-cn](http://www.axios-js.com/zh-cn/)

[使用说明](https://www.kancloud.cn/yunye/axios/234845)

[vue axios 全攻略](https://www.cnblogs.com/libin-1/p/6607945.html)

[axios-mock-adapter 模拟 HTTP 返回结果和行为](https://zhuanlan.zhihu.com/p/346521290)

[axios 请求模拟调试器](https://blog.csdn.net/guoscy/article/details/78971572)
