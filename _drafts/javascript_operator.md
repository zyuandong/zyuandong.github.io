---
title: JavaScript 中的 ?.、??、??= 运算符
---

`?.`

```js
let a;

let b = a?.name; // b = undefined
```

`?.` 叫做可选链，只有当 a 存在，同时 a 具有 name 属性的时候，才会把值赋给 b，否则就会将 undefined 赋值给 b。重要的是，不管 a 存在与否，这么做都不会报错。

---

`??`

```js
let b;

let a = 0;

let c = { name: "buzhimingqianduan" };

b = a ?? c; // b = 0
```

`??` 是空值合并运算符，当 a 除了 undefined、或者 null 之外的任何值，b 都会等于 a，否则就等于 c。

---

`??=`

```js
let b = "你好";

let a = 0;

let c = null;

let d = "123";

b ??= a; // b = "你好"

c ??= d; // c = "123"
```

`??=` 为空值赋值运算符，当 `??=` 左边的的值为 undefined 或者 null 的时候，才会将右侧变量的值赋值给左侧变量。其他所有值都不会进行赋值。
