---
title: 随笔
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



[如何不使用loop循环，创建一个长度为100的数组，并且每个元素的值等于它的下标？](https://www.zhihu.com/question/41493194)



---



[前端面试每日 3+1](https://github.com/haizlin/fe-interview)



---



[深入理解JavaScript的执行机制（同步和异步）](https://blog.csdn.net/jssy_csu/article/details/78627628)



---

[一篇文章带你搞定Vue-Router的导航守卫](https://baijiahao.baidu.com/s?id=1612908077665784077&wfr=spider&for=pc)

[Vue.js——vue-resource全攻略](https://www.cnblogs.com/chenhuichao/p/8308993.html)

[原生js实现Ajax](https://www.cnblogs.com/colima/p/5339227.html)

[浅谈Vue.js与后端API交互——axios的应用](https://blog.csdn.net/joyce_lcy/article/details/78873733)

[CSS Modules 用法教程](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)

[webpack 引入css-loader style-loader报错Module build failed: Unknown word](https://blog.csdn.net/JavaBlueQueen/article/details/87705797)

[css模块化及CSS Modules使用详解](https://blog.csdn.net/xiangzhihong8/article/details/53195926)

[CSS Modules使用方法](https://www.cnblogs.com/kugeliu/p/7889018.html)

[在React中使用CSS Modules设置样式](https://www.cnblogs.com/diligentYe/p/6602010.html)

[Git先生的故事](https://www.jianshu.com/p/1ea0f3b7b409)

[git 分支( branch ) 的基本使用](https://www.cnblogs.com/TonyYPZhang/p/6219265.html)

[花信](https://www.cnblogs.com/microcosm/)

[百度：js引擎 渲染引擎]([https://www.baidu.com/s?ie=UTF-8&wd=js%E5%BC%95%E6%93%8E%20%E6%B8%B2%E6%9F%93%E5%BC%95%E6%93%8E](https://www.baidu.com/s?ie=UTF-8&wd=js引擎 渲染引擎))

[百度：虚拟dom]([https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E8%99%9A%E6%8B%9Fdom&oq=fragment%2520js&rsv_pq=d2aac114012bcabe&rsv_t=d5ddN4F3gdUUAo0bfai6L4OKTPnAEB1B9kG3Y4RoDsYSv7j%2FHSY%2FZsVmHhw&rqlang=cn&rsv_enter=1&inputT=5829&rsv_sug3=13&rsv_sug1=13&rsv_sug7=100&bs=fragment%20js](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=虚拟dom&oq=fragment%20js&rsv_pq=d2aac114012bcabe&rsv_t=d5ddN4F3gdUUAo0bfai6L4OKTPnAEB1B9kG3Y4RoDsYSv7j%2FHSY%2FZsVmHhw&rqlang=cn&rsv_enter=1&inputT=5829&rsv_sug3=13&rsv_sug1=13&rsv_sug7=100&bs=fragment js))

[DOM与虚拟DOM](https://blog.csdn.net/zhouyl02/article/details/82807466)

[百度：js 闭包]([https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=js%20%E9%97%AD%E5%8C%85&oq=js%2520%25E4%25B8%2589%25E5%25A4%25A7%25E7%2589%25B9%25E7%2582%25B9&rsv_pq=d8ffd24000000296&rsv_t=9085E8%2BXs38BN7LJFG8EEjUqPtXiZuf4C%2FOz%2BUTOCAxiguOLFnspjCwezLw&rqlang=cn&rsv_enter=1&rsv_sug3=5&rsv_sug1=5&rsv_sug7=100&bs=js%20%E4%B8%89%E5%A4%A7%E7%89%B9%E7%82%B9](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=js 闭包&oq=js%20%E4%B8%89%E5%A4%A7%E7%89%B9%E7%82%B9&rsv_pq=d8ffd24000000296&rsv_t=9085E8%2BXs38BN7LJFG8EEjUqPtXiZuf4C%2FOz%2BUTOCAxiguOLFnspjCwezLw&rqlang=cn&rsv_enter=1&rsv_sug3=5&rsv_sug1=5&rsv_sug7=100&bs=js 三大特点))

[看《ECMAScript6入门》，关于let的小疑问以及引申问题](http://f2e.im/t/316#reply3)

---

[前端开发博客](http://caibaojian.com/c/qianduan)

[Introduction](http://caibaojian.com/book/)

[Generator 函数](http://caibaojian.com/es6/generator.html)

[Vue.js](http://caibaojian.com/vue/)

[yield](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield)

[百度：ts 与 es6 的关系]([https://www.baidu.com/s?ie=UTF-8&wd=ts%20%E4%B8%8E%20es6%20%E7%9A%84%E5%85%B3%E7%B3%BB](https://www.baidu.com/s?ie=UTF-8&wd=ts 与 es6 的关系))

[ts与es6学习记录](https://www.cnblogs.com/damai/p/9120974.html)

[ES6 & TS](https://www.jianshu.com/p/49430e339295)

[TS的优势，以及和ES6做对比](https://www.jianshu.com/p/d2d15111f9d4)

[为什么要使用TypeScript？有哪些情景请简单介绍一下，或者来个例子?](https://www.zhihu.com/question/64563945)

[百度：强类型和弱类型的区别]([https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E5%BC%BA%E7%B1%BB%E5%9E%8B%E5%92%8C%E5%BC%B1%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%8C%BA%E5%88%AB&oq=javascript&rsv_pq=f453e4ca0006a523&rsv_t=292ajbTC66OZ%2FPT%2Bsp3G1gbMYhHnO1UDY8GrGeAzz%2BM9hvkoqddqm%2BEZlv8&rqlang=cn&rsv_enter=1&rsv_sug3=14&rsv_sug1=14&rsv_sug7=100&bs=javascript](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=强类型和弱类型的区别&oq=javascript&rsv_pq=f453e4ca0006a523&rsv_t=292ajbTC66OZ%2FPT%2Bsp3G1gbMYhHnO1UDY8GrGeAzz%2BM9hvkoqddqm%2BEZlv8&rqlang=cn&rsv_enter=1&rsv_sug3=14&rsv_sug1=14&rsv_sug7=100&bs=javascript))

[强类型语言和弱类型语言](https://blog.csdn.net/sinolzeng/article/details/40742757)

[百度：为什么说java是解释型语言]([https://www.baidu.com/s?ie=UTF-8&wd=%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AF%B4java%E6%98%AF%E8%A7%A3%E9%87%8A%E5%9E%8B%E8%AF%AD%E8%A8%80](https://www.baidu.com/s?ie=UTF-8&wd=为什么说java是解释型语言))

[我所理解的Java到底是解释型语言还是编译型语言](https://blog.csdn.net/gaosure/article/details/58252393)

[百度：静态语言与动态语言]([https://www.baidu.com/s?ie=UTF-8&wd=%E9%9D%99%E6%80%81%E8%AF%AD%E8%A8%80%E4%B8%8E%E5%8A%A8%E6%80%81%E8%AF%AD%E8%A8%80](https://www.baidu.com/s?ie=UTF-8&wd=静态语言与动态语言))

[静态语言和动态语言的区别](https://www.cnblogs.com/raind/p/8551791.html)

[菜鸟：TypeScript 基础类型](https://www.runoob.com/typescript/ts-type.html)

[TypeScript 入门教程](https://ts.xcatliu.com/)

[TS文档简介](https://www.tslang.cn/docs/home.html)

[前端开发中提到的“脚手架”到底指什么，CLI？gulp 和 gulp-cli有什么区别](https://www.cnblogs.com/lalalagq/p/9901196.html)

[gulp和gulp-cli的区别](https://feizhaojun.com/?p=570)