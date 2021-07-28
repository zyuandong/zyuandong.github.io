---
title: 算法面试题（二）
category: 技术
tags: [算法, JavaScript]
---

日常的工作、学习中，经常会遇到一些有趣的面试题，刚开始的时候还没体会到题解的精妙，但通过与其他人讨论解题思路时就会发现其中有很多闪光点。

以下是我收集到的一些编码题，以及部分解题思路，方便多回顾，多反思。

因为收集到的题目数量稍多，我分成了两部分，此为第二部分，点击 [此处]({% link _posts/2015-01-06-interview_question_01.md %}) 跳转至第一部分。

## 1. 解析 url 参数

请写一个函数，功能是将 url 中的参数解析出来。

示例：

- 输入：`http://www.xxxx.com/?a=1&b=2&city=%E5%8C%97%E4%BA%AC`
- 输出：`{a:"1",b:"2",city:"北京"}`

实现：

```javascript
var url = 'http://www.xxxx.com/?a=1&b=2&city=%E5%8C%97%E4%BA%AC';

function getParameter(url) {
  var url_arr = [];
  var res = {};
  url = url.substr(url.indexOf('?') + 1).replace(/&/g, '=');
  url_arr = url.split('=');
  for (var i = 0, len = url_arr.length; i < len; i++) {
    if (i % 2 === 0) {
      res[url_arr[i]] = url_arr[i + 1];
    }
  }
  res.city = decodeURI(res.city);
  return res;
}

console.log(getParameter(url));
```

## 2. 日期格式化

请写一个函数，formatDate(date, format)，date 参数为 Date 对象，format 参数为 yyyy,MM,dd 及-的组合，返回格式化后的字符串，考虑各种情况

```javascript
// TODO
```

## 3. 数组间隔插入空格

在一个数组里每隔 5 个元素插入一个空字符串，使其成为一个新的数组。

示例：

- 输入：`[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]`
- 输出：`[1, 2, 3, 4, 5, " ", 6, 7, 8, 9, 10, " ", 11, 12, 13, 14, 15, " ", 16, 17]`

实现一：

```javascript
function myNewArr(arr) {
  var res_arr = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    res_arr.push(arr[i]);
    if ((i + 1) % 5 === 0) {
      res_arr.push('');
    }
  }
  return res_arr;
}

console.log(
  myNewArr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])
);
// >> [1, 2, 3, 4, 5, " ", 6, 7, 8, 9, 10, " ", 11, 12, 13, 14, 15, " ", 16, 17]
```

实现二：

```javascript
function myNewArr(arr) {
  var count = (arr.length / 5) | 0;
  for (var i = 0; i < count; i++) {
    arr.splice((i + 1) * 5 + i, 0, '');
  }
  return arr;
}

console.log(
  myNewArr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])
);
// splice()里 +i 真是精髓
```

## 4. 不使用 for 循环打印

不使用 for 循环，实现打印 1~100

## 5. 数组整理

一个数组为 0、1 混乱交叉排列，共 100 个元素，如何在只遍历一次的情况下，整理数组，使之前面所有的数都为 0，后边所有的数都为 1。

## 6. 数组删除

请为 Array 增加一个原型方法：该方法的功能是删除数组中索引为 n 的那一项

实现：

```javascript
Array.prototype.delKey = function (n) {
  for (var i = n - 1, len = this.length; i < len; i++) {
    this[i] = this[i + 1];
  }
  this.pop();
  var res = this;
  return res;
};
```
