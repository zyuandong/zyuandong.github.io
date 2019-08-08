---
title: Others
category:
tags:
---

js 遍历对象

1、for ... in

```
const obj = {
	id: 1,
	name: 'zhangsan',
	age: 18
}
for (let key in obj) {
	console.log(`${key}---${obj[key]}`)
}
```

```
id---1
name---zhangsan
age---18
```



2、Object.keys(obj) / Object.values(obj)

```
const obj = {
	id: 1,
	name: 'zhangsan',
	age: 18
}
Object.keys(obj); // ['id','name','age']
Object.values(obj); // [1,'zhangsan',18]
Object.keys(obj).map(key => {
	console.log(`${key}---${obj[key]}`)
})
```

```
id---1
name---zhangsan
age---18
```



3、Object.getOwnPropertyNames(obj)

返回一个数组，包含对象自身的所有属性（包含不可枚举属性）遍历可以获取key和value

```
const obj = {
	id: 1,
	name: 'zhangsan',
	age: 18
}
Object.getOwnPropertyNames(obj).forEach(key => {
	console.log(`${key}---${obj[key]}`);
})
```

```
id---1
name---zhangsan
age---18
```



-----