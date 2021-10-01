---
title: Mock
---

[mock.js](http://mockjs.com/examples.html)

[vue+mockjs 模拟数据，实现前后端分离开发](https://www.cnblogs.com/jasonwang2y60/p/7302449.html)

- `mockjs`
- `axios-mock-adapter`

```javascript
import { mock, Random } from 'mockjs';

// mock data e.g:
const createRes = () => {
  return {
    code: 200,
    message: 'success',
    data: {
      id: Random.id(),
      title: Random.ctitle(),
      createTime: Random.datetime()
    }
  }
}

// mock(url, method, data) e.g:
mock(`/xxx-api/xx/get`, 'get', createRes())

```

```javascript
import MockAdapter from 'axios-mock-adapter';

const adapter = new MockAdapter();

```
