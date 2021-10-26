---
title: formdata
---

```html
//表单示例
<form id="myForm" action="" method="post">
  <input type="text" name="name" />名字 <input type="password" name="psw" />密码
  <input type="submit" value="提交" />
</form>

<script>
  //方法示例
  // 获取页面已有的一个form表单
  var form = document.getElementById("myForm");
  // 用表单来初始化
  var formData = new FormData(form);
  // 我们可以根据name来访问表单中的字段
  var name = formData.get("name"); // 获取名字
  var psw = formData.get("psw"); // 获取密码
  // 当然也可以在此基础上，添加其他数据
  formData.append("token", "kshdfiwi3rh");

  //set(key, value)来设置修改数据，如果指定的key不存在则会新增一条，如果存在，则会修改对应的value值
  formData.append("k1", "v1");
  formData.set("k1", "1");
  formData.getAll("k1"); // ["1"]

  //has(key)来判断是否对应的key值
  formData.append("k1", "v1");
  formData.append("k2", null);

  formData.has("k1"); // true
  formData.has("k2"); // true
  formData.has("k3"); // false

  //delete(key)删除数据
</script>
```

- [formdata 和 json](https://blog.csdn.net/fksfdh/article/details/106153248)

GraphQL + formdata ?

Node.js + formdata ?
