---
title: JavaScript loops
date: 2021-04-29
---

| 方法            | break  | continue     | return       | return true  | return false | 结论 |
| :-------------- | :----- | :----------- | :----------- | :----------- | :----------- | :--- |
| for             | 允许   | 跳出本次循环 |              |              |              | T    |
| for...in        | 允许   | 跳出本次循环 |              |              |              | T    |
| for...of        |        |              |              |              |              |      |
| Array.forEach() | 不允许 | 不允许       | 跳出本次循环 | 跳出本次循环 | 跳出本次循环 |      |
| Array.map()     | 不允许 | 不允许       | 跳出本次循环 | 跳出本次循环 | 跳出本次循环 |      |
| Array.some()    | 不允许 | 不允许       |              |              |              | T    |
| Array.every()   | 不允许 | 不允许       |              | 跳出本次循环 |              | T    |
| Array.filter()  | 不允许 | 不允许       | 跳出本次循环 | 跳出本次循环 | 跳出本次循环 |      |

## for

## while

## do...while

## forEach

`forEach()` 方法对数组的每个元素执行一次给定的函数。

语法：`arr.forEach(callback(currentValue [, index [, array]])[, thisArg])`

`forEach()` 为每个数组元素执行一次 callback 函数；与 `map()` 或者 `reduce()` 不同的是，它总是返回 undefined 值，并且不可链式调用。其典型用例是在一个调用链的最后执行副作用（side effects，函数式编程上，指函数进行 返回结果值 以外的操作）。

`forEach()` 被调用时，不会改变原数组，也就是调用它的数组（尽管 callback 函数在被调用时可能会改变原数组）。（译注：此处说法可能不够明确，具体可参考 EMCA 语言规范：'forEach does not directly mutate the object on which it is called but the object may be mutated by the calls to callbackfn.'，即 forEach 不会直接改变调用它的对象，但是那个对象可能会被 callback 函数改变。）

[Array.prototype.forEach() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

只能使用使用抛出异常的方式跳出 forEach

```javascript
let arr = [1, 2, 3, 4, 5];

try {
  arr.forEach((item) => {
    // 跳出条件
    if (item === 2) {
      throw new Error("LoopTerminates");
    }
    // ...
    console.log(item);
  });
} catch (e) {
  if (e.message !== "LoopTerminates") throw e;
}
```

[JavaScript 很简单？那你理解的 forEach 真的对吗？](https://mp.weixin.qq.com/s?src=11&timestamp=1619683622&ver=3037&signature=lt0X9FS*qSpWineMLVafbT29t15JugPe7UR6oUcNkR-8fd0xwNKxV*4h-mtgeF9UtbGwGyIBEe-zlUtML1cWmeYQN1Ewug4qDvqH7FZRNFUkXa9OGj4v383fFi*POHMe&new=1)

## for...in

## for...of

[Js 中 for in 和 for of 的区别](https://mp.weixin.qq.com/s?src=11&timestamp=1619683880&ver=3037&signature=7*qHANfmtUWzMBn8MQjxmeXLOm-Hs1ypRICgTyv44Sxfl38ip1K5lL4m7nvJzrpi9bJO07fpU94jSMA*jAf-PklsVr1soF9-8O3PCXJwCkDtdE5UgOQfmMy89ZNZGCT4&new=1)

[js 中的 for in 和 for of 的区别](https://blog.csdn.net/m0_37686205/article/details/89162049)

[js 数组遍历 千万不要使用 for...in...](https://blog.csdn.net/VagueCoder/article/details/47294481)

[for in 遍历对象得到的数据顺序不对(解决方法)](https://www.cnblogs.com/jackal1234/p/15147556.html)

## map

`map()` 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

语法：

```js
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array
}[, thisArg])
```

返回一个新数组

[Array.prototype.map() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

## every

## some

## break [label]

## continue [label]

## 参考资料

[循环与迭代](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Loops_and_iteration)

[js 中的遍历和跳出遍历](https://www.cnblogs.com/yangai/p/13841490.html)

[js 中的 for in 和 for of 的区别](https://blog.csdn.net/m0_37686205/article/details/89162049)
