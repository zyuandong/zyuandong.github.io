---
title: JavaScript 之 call、apply、bind
---

通过 apply 和 call 改变函数的 this 指向，他们两个函数的第一个参数都是一样的，表示要改变指向的那个对象，第二个参数，apply 是数组，而 call 则是 arg1,arg2...这种形式。

通过 bind 改变 this 作用域会返回一个新的函数，这个函数不会马上执行。

apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.apply(A,arguments); 即 A 对象应用 B 对象的方法。

call：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.call(A,args1,args2); 即 A 对象调用 B 对象的方法。

bind 除了返回是函数以外，它的参数和 call 一样
