---
title: 防抖与节流
date: 2021-04-28
---

由于节流和防抖函数的实现都用到了闭包，所以在了解节流和防抖之前我先简单介绍下什么是闭包。

由于 js 代码在一个执行环境中执行时，会创建变量对象的一个作用域链。作用域链用来指定执行环境有权访问的所有变量和函数的访问顺序，这导致外部环境无法访问内部环境的参数。为了能够访问内部函数的参数，就产生了闭包的概念。

闭包是指有权访问另一个函数内部变量的函数，创建闭包一般是以在一个函数内返回一个函数的形式。它的本质就是一个函数。

```js
function A() {
  var x = 1;
  return function () {
    x++;
    console.log(x);
  };
}

var a = A();

a(); // 1
a(); // 2
```

可以看到，a 指向函数 A 的返回函数，运行完 A()后，A 的执行环境被释放，但是由于返回的函数中有对变量 x 的引用，故再释放时不会释放掉 x，每次调用 a() 时都保持对 x 的引用，因此 x 一直增加。

## 防抖 debounce

当持续触发某事件时，一定时间间隔内没有再触发事件时，事件处理函数才会执行一次，如果设定的时间间隔到来之前，又一次触发了事件，就重新开始延时。

函数在一段时间内的多次调用，仅使得最后一次调用有效

多次调用，在一段时候后没有触发事件，便会执行一次

常用于用户输入查询

```js
function debounce(fn, delay) {
  var ctx;
  var args;
  var timer = null;

  var later = function () {
    fn.apply(ctx, args);
    // 当事件真正执行后，清空定时器
    timer = null;
  };

  return function () {
    ctx = this;
    args = arguments;
    // 当持续触发事件时，若发现事件触发的定时器已设置时，则清除之前的定时器
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 重新设置事件触发的定时器
    timer = setTimeout(later, delay);
  };
}
```

精简版：

```js
function log() {
  console.log("窗口大小改变了！！！");
}

function debounce(fn, delay) {
  var timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

window.addEventListener("resize", debounce(log, 1000));
```

## 防抖策略

- 当持续触发某事件时，一定时间间隔内没有再触发事件时，事件处理函数才会执行一次，如果设定的时间间隔到来之前，又一次触发了事件，就重新开始延时。
- 持续出发某事件，第一次事件处理函数执行，并开始时间间隔计时，在时间间隔到来之前触发的事件都不会执行，时间间隔结束之后，开始新周期

```js
// 立即执行
function debounce(fn, delay, isImmediate: true) {
  var timer;
  return function () {
    if (!timer && isImmediate) {
      fn.apply(this, arguments);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
}

window.addEventListener("mousemove", debounce(log, 5000));

// 综合版
function debounce(fn, delay, isImmediate) {
  var timer;
  return function () {
    clearTimeout(timer);

    if (isImmediate) {
      if (!timer) fn.apply(this, arguments);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, delay);
    }
  };
}

window.addEventListener("mousemove", debounce(log, 5000, false));
```

## 节流 throttle

当持续触发事件时，有规律的每隔一个时间间隔执行一次事件处理函数。

在一段时间内多次调用，仅有一次有效（第一次或者最后一次）

```js
function throttle(fn, delay) {
  var ctx;
  var args;
  // 记录上次触发事件
  var previous = Date.now();

  var later = function () {
    fn.apply(ctx, args);
  };

  return function () {
    ctx = this;
    args = arguments;
    var now = Date.now();
    // 本次事件触发与上一次的时间比较
    var diff = now - previous - delay;

    // 如果隔间时间超过设定时间，即再次设置事件触发的定时器
    if (diff >= 0) {
      // 更新最近事件触发的时间
      previous = now;
      setTimeout(later, delay);
    }
  };
}
```

- 时间戳版本

```js
function log() {
  console.log("窗口大小改变了！！！");
}

// window.addEventListener('resize', log)

const throttleStamp = (fn, delay) => {
  let last = 0;
  return function () {
    let now = Date.now();
    if (now >= last + delay) {
      fn.apply(this, arguments);
      last = now;
    } else {
      console.log(`距离上次调用时间不足 ${delay} ms`);
    }
  };
};

window.addEventListener("resize", throttleStamp(log, 1000));
```

- 定时器版本

```js
function log() {
  console.log("窗口大小改变了！！！");
}

// window.addEventListener('resize', log)

function throttleSetTimeout(fn, delay) {
  var timer = null;
  return function () {
    if (!timer) {
      fn.apply(this, arguments); // 此行在 setTimeout 内外，效果不同
      timer = setTimeout(() => {
        // clearTimeout(timer);
        timer = null;
      }, delay);
    } else {
      console.log("上一个定时器尚未完成");
    }
  };
}

window.addEventListener("resize", throttleSetTimeout(log, 1000));
```

```js
// function throttle(fn, delay) {
//   let timer, context;
//   return function () {
//     context = this;
//     if (!time) {
//       time = setTimeout(function () {
//         fn.apply(context, arguments); // 在定时器内
//         clearTimeout(timer);
//       }, delay);
//     }
//   };
// }
// 注意：fn.apply(context, arguments)指把fn的this绑定到context对象上并执行，这里的context是函数调用时的上下文。
```

以上两中实现方式分别存在问题：

（1）时间戳方式，第一次调用必定执行，但是不会执行最后一次调用

（2）定时器方式，由于是异步的，第一次调用不会执行，但是事件不再触发后，仍然会最后调用一次

结合上面两种方式优化，实现一次调用，两次执行，即首次和末次都执行，代码如下：

```js
function throttle(fn, delay) {
  var last, timer;
  threshhold || (threshhold = 250); // 默认间隔为 250ms
  return function () {
    var context = this;
    var args = arguments;
    var now = +newDate();
    if (last && now < last + delay) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, delay);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
```

## 节流策略

- 首次调用立即执行
- 规定时间内，最后一次调用时立即执行
- 规定时间内，第一次和最后一次调用时立即执行
- 首次调用不执行，最后一次调用，延迟时间内不再调用时执行（定时器版本，接近防抖）

## 参考资料

- [VUE 防抖与节流的最佳解决方案——函数式组件](https://blog.csdn.net/weixin_33905756/article/details/91415517)

- [debounce(防抖)和 throttle(节流)](https://segmentfault.com/a/1190000005926579)

- [新手易懂的防抖节流篇](https://www.jianshu.com/p/a436ff2808d2)
