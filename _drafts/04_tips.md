---
title: 04 Tips
date: 2021-09-04
category:
tags:
---

## 20211026

### 修改复选框样式

```html
<label for="auto-login" class="checkbox">
  <span class="checkbox-input">
    <input type="checkbox" class="checkbox-original" id="auto-login" />
    <span class="checkbox-inner"></span>
  </span>
  <span class="checkbox-label">自动登录</span>
</label>
```

样式:

```scss
.checkbox {
  cursor: pointer;
  position: relative;

  .checkbox-input {
    line-height: 1;
    vertical-align: middle;
    margin: 0 0.08rem 0 0;
  }

  .checkbox-inner {
    display: inline-block;
    width: 0.16rem;
    height: 0.16rem;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    border-radius: 0.02rem;
    position: relative;
    z-index: 1;
    transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46), background-color 0.25s
        cubic-bezier(0.71, -0.46, 0.29, 1.46);

    &:hover {
      border-color: #1890ff;
    }

    &::after {
      content: "";
      width: 0.04rem;
      height: 0.08rem;
      box-sizing: content-box;
      border: 1px solid #fff;
      border-top: 0;
      border-left: 0;
      position: absolute;
      top: 1px;
      left: 0.04rem;
      transform: rotate(45deg) scaleY(0);
      transition: transform 0.15s ease-in 0.05s;
      transform-origin: center;
    }
  }

  input[type="checkbox"] {
    width: 0;
    height: 0;
    opacity: 0;
    outline: none;
    position: absolute;
    z-index: -1;

    &:checked + .checkbox-inner {
      background-color: #409eff;
      border-color: #409eff;

      &::after {
        transform: rotate(45deg) scaleY(1);
      }
    }
  }
}
```

## 20211023

`<marquee>` 标签用来插入一段滚动的文字(已弃用)

## 20211022

- [chrome devTools 调试小技巧](https://www.cnblogs.com/cczlovexw/p/13218565.html)

- [css 超出显示滚动条的三种方法](https://www.cnblogs.com/meiyanstar/p/14307793.html)

- [不隐藏滚动条使滚动条不占据位置](https://www.jianshu.com/p/f21463fe9908)

- [wx: position:sticky 粘性定位的几种巧妙应用](https://mp.weixin.qq.com/s/i1tHSfB7iYt2CA3krqU2uA)

- [element 滚动条组件 el-scrollbar 的使用](https://blog.csdn.net/qq_38157825/article/details/114367278)

- [js 中 reduce 用法详解](https://www.cnblogs.com/smallpen/p/10249288.html)

- [Node.js 构建 GraphQL 接口入门](https://zhuanlan.zhihu.com/p/365630784)

- [TypeScript + GraphQL = TypeGraphQL](https://zhuanlan.zhihu.com/p/56516614)

---

- [element ui 重置表单后无法输入的问题](https://www.jianshu.com/p/894faead5680)

- [vue 的 token 刷新处理](https://zhuanlan.zhihu.com/p/34932738)

- [wx: 如何优雅的在 koa 中处理错误](https://mp.weixin.qq.com/s?src=3&timestamp=1634701184&ver=1&signature=5Ejvg8tOKv*y-zarozxWOzXLxw*eVY8Ot7vIUv9BmqAQIxWwbejXeGPkH1CQ27h4tW2*zaa26DFfZ6ghQ2qUnxoIVkrFmQhW2yEwvI*OVhAndxAF54Wjr5VhamMh2wJvG6Ckg-9RezxW9Gv6Y3q7tw==)

- [Koa 中的错误处理](https://www.cnblogs.com/Wayou/archive/2019/04/08/error_handling_in_koajs.html)

- [zlt2000 / microservices-platform](https://gitee.com/zlt2000/microservices-platform?_from=gitee_search)

- [lefex/FE - 前端 100 天，帮助 10W 人入门并进阶前端。](https://github.com/lefex/FE)

- [单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)

- [Vue 单文件组件基础模板](https://www.cnblogs.com/sampapa/p/6957107.html)

- [vue 实现一个单文件组件的完整过程记录](https://www.jb51.net/article/215909.htm)

- [有了 GraphQL，你可以扔掉 Redux 了](https://mp.weixin.qq.com/s?src=11&timestamp=1634622739&ver=3383&signature=LfUzdTq946UCDiogvNYUIh*ac0*RxDDNtgwFXD1GyRH5Pq8HmZJGMKKFTprTU*L08fFRr517knNLMuNGgxJvxdhg-VDiAmwKh6wsiSzXSJr6jRg4GOshmIn2MJT85gyO&new=1)

- [wx: postcss-px-to-viewport 之 vw、vh、rem](https://mp.weixin.qq.com/s?src=11&timestamp=1634524362&ver=3381&signature=Q5EDl8iwoWNYPyfs5LgyilAgB9EWvKRKn27T6xOR2Rz96DKw-Rf3h6MzfawdRpMVDfsnscsYqsGT*dmhE0RhyY8x6bF36Yny5ecEkcxWgh1gJjWmZliF5EkJeLJpmN4U&new=1)

- [Flex 布局新旧混合写法详解（兼容微信）](https://mp.weixin.qq.com/s?src=3&timestamp=1634520849&ver=1&signature=5Ejvg8tOKv*y-zarozxWOzXLxw*eVY8Ot7vIUv9BmqBNucDZt0cQAupaRYqyTBq-mSMHcxLgRvz4IQssnqrs5*MqsH9F8qasVJSKq4KzKd*y9*UOchBZ16TtbowEnzbwsDDKTkv8lR6Tk7CnIlmOzxnPyUxhfsLytqFI-m9coqs=)

- [m3u8 到底是什么格式？一篇文章搞定 m3u8 下载](https://zhuanlan.zhihu.com/p/346683119)

- [三段论推理中几种常见的错误形式](https://www.jianshu.com/p/39ad8c87bac6)

## list 2 tree

```js
const oldData = [
  { id: 1, name: "boss", parentId: 0 },
  { id: 2, name: "lily", parentId: 1 },
  { id: 3, name: "jack", parentId: 1 },
  { id: 4, name: "john", parentId: 2 },
  { id: 5, name: "boss2", parentId: 0 },
];

function listToTree(oldArr) {
  oldArr.forEach((element) => {
    let parentId = element.parentId;
    if (parentId !== 0) {
      oldArr.forEach((ele) => {
        if (ele.id == parentId) {
          //当内层循环的ID== 外层循环的parendId时，（说明有children），需要往该内层id里建个children并push对应的数组；
          if (!ele.children) {
            ele.children = [];
          }
          ele.children.push(element);
        }
      });
    }
  });
  console.log(oldArr); //此时的数组是在原基础上补充了children;
  oldArr = oldArr.filter((ele) => ele.parentId === 0); //这一步是过滤，按树展开，将多余的数组剔除；
  console.log(oldArr);
  return oldArr;
}
listToTree(oldData);
```

- [js 实现 list 转换成 tree 的方法示例（数组到树）](https://www.jb51.net/article/167897.htm)

## === 20211012 ===

- [又拍云](https://www.cnblogs.com/upyun/)

- [袋鼠云数栈前端](https://www.cnblogs.com/dtux/)

- [算法推荐管](https://www.cnblogs.com/cxyxz/)

- [解决 Vite-React 项目中 js 使用 jsx 语法报错的问题](https://www.cnblogs.com/roseAT/p/15399197.html)

- [Serverless 工程实践 | 零基础上手 Knative 应用](https://www.cnblogs.com/alisystemsoftware/p/15399346.html)

- [uniapp 小程序迁移到 TS](https://www.cnblogs.com/WindrunnerMax/p/15399408.html)

- [【Docker】(9)---每天 5 分钟玩转 Docker 容器技术之镜像](https://www.cnblogs.com/qdhxhz/p/15385917.html)

- [ECMA 2022 (es13) 新特性](https://www.cnblogs.com/guojikun/p/15399917.html)

- [react 之组件生命周期](https://www.cnblogs.com/ypSharing/p/15400990.html)

- [函数式编程 —— 将 JS 方法函数化](https://www.cnblogs.com/index-html/p/js-method-functional-style.html)

- [JavaScript 算法之递归](https://zhuanlan.zhihu.com/p/60643630)

- [要理解递归就要先理解递归：手把手教你写递归](https://www.cnblogs.com/linj7/p/14154347.html)

- [递归函数的定义和几个小例子](https://www.cnblogs.com/tianyiliang/p/7775071.html)

- [学习 JavaScript Reduce 方法的 10 个例子](https://mp.weixin.qq.com/s?src=11&timestamp=1634191425&ver=3373&signature=Alc8QbFHoqUtXJE4ZJvMtVMdV4W5ApisOh31uY9Y6leZQLBg21ta2ARheiGTjKWxIudS2NW1CHd1v3y-UllsceuvcaiA3XSQ*qmTJXCz9u5wP9jc2l**sj6m0ESDjEFj&new=1)

- [浅谈 JS 中 reduce() 的用法](https://www.jianshu.com/p/541b84c9df90)

## === 20210924 ===

问题：

- 微前端接入微应用：
  - 样式冲突：
    - 微应用未占满 （calc() 解决
  - 微应用菜单高亮
    - ElementUI -> ElMenu 组件设置 :defaultActive 时不能使用全路径匹配，应使用模糊匹配，因为主应用接入微应用时会加一层 context

## === 20210923 ===

- [pdf.js](https://github.com/mozilla/pdf.js) : [Demo](https://mozilla.github.io/pdf.js/web/viewer.html)

- [rkusa/pdfjs](https://github.com/rkusa/pdfjs) : [Demo](http://pdfjs.rkusa.st/)

- [react-pdf-ner-annotator](https://www.npmjs.com/package/react-pdf-ner-annotator) : [Demo](https://react-annotator-demo.netlify.app/)

- [@pdftron/webviewer](https://www.npmjs.com/package/@pdftron/webviewer)

- [@pdftron/pdfjs-express](https://www.npmjs.com/package/@pdftron/pdfjs-express)

## === 20210918 ===

- [HTML5 中的 data-\*自定义属性](https://zhuanlan.zhihu.com/p/94849216)

- [vue 监听路由变化](https://www.cnblogs.com/crazycode2/p/8727410.html)(有大量标签)

- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

- [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

- [关于 nodejs 连接 MySQL 返回的数据有 RowDataPacket 问题](https://www.cnblogs.com/lanker/p/9321838.html)

## === 20210910 ===

- [学会这几招,轻松让你的 github 脱颖而出](https://juejin.cn/post/6997070653010477087)

- [搭建一套支持 TS 的 Node 运行环境](https://juejin.cn/post/6996834929401151525)

- [如何优雅地结合 Rxjs 和 WebWorker](https://juejin.cn/post/6844903650687467528)

- [你知道关闭页面时怎么向后台发送消息吗？](https://juejin.cn/post/6997016317635084319)

- [太赞了！腾讯架构师梳理的这份 JS 全解笔记开源分享，看完献上膝盖](https://juejin.cn/post/6975503064744591391#heading-0)

- [js Event Loop 运行机制](https://juejin.cn/post/6844903651664723981)

- [月度文章——Event Loop](https://juejin.cn/post/6844903702424371214)

- [「万字进阶」深入浅出 Commonjs 和 Es Module](https://juejin.cn/post/6994224541312483336)

- [自己动手从 0 开始实现一个分布式 RPC 框架](https://juejin.cn/post/6983862862426931207)

- [【RPC 基础系列 1】聊聊 RPC](https://juejin.cn/post/6983823254490185742)

- [开发基于 gRPC 协议的 Node 服务](https://juejin.cn/post/6972430337548746766)

- [GraphQL 及元数据驱动架构在后端 BFF 中的实践](https://juejin.cn/post/6959487456517292040)

- [CSS 实战笔记(九) BFC](https://juejin.cn/post/6957521308737503245)

- [从入门到精通的分布式服务架构，常用的 RPC 框架原理及介绍](https://juejin.cn/post/6953212166593839135)

- [CSS 中 BFC 知识点](https://juejin.cn/post/6952847988213579807)

- [RPC 服务(二)使用 HTTP 实现一个 RPC 服务](https://juejin.cn/post/6947708165639110692)

- [BFF 与 Nestjs 实战](https://juejin.cn/post/6925028503314235399)

- [一种不错的 BFF Microservice GraphQL/REST API 层的开发方式](https://www.cnblogs.com/hacker-linner/p/14108237.html)

## === 20210909 ===

- [SSM 框架实现用户查询、注册、登录——IDEA 整合 Spring、Spring MVC、Mybatis 框架](https://blog.csdn.net/One_L_Star/article/details/102941637)

- [搞懂现代 Web 端即时通讯技术一文就够：WebSocket、socket.io、SSE](https://www.163.com/dy/article/GJ9QQ5VP0511X1MK.html?f=post2020_dy_recommends)

## === 20210907 ===

- [【原创】GraphQL 学习：分页](https://www.jianshu.com/p/79af61abb4ff)

- [混搭 TypeScript + GraphQL + DI + Decorator 风格写 Node.js 应用](https://mp.weixin.qq.com/s?src=11&timestamp=1630998245&ver=3299&signature=SP-rHF4EMMf2PkAUmnKuNQYAHNiKtiPlESQpj3t3g3aM5pVOt-da2nHSIG9d58Uu-xQ3lIDW9Q5a309wkeUdozgjDkPlAZ*uLoucGuBjhqYpOaaVZpW5lC97J6Rp*5U*&new=1)

- [GraphQL（七）：GraphQL 分页及原理分析](https://www.jianshu.com/p/5e37f6528dc4)

- [koa 框架使用 graphQL 管理 api](https://blog.csdn.net/qq_40816649/article/details/88419762)

---

- [如何评价阿里开源的企业级 Node.js 框架 EggJS？](https://www.zhihu.com/question/50526101)

- [Egg.js](https://eggjs.org/zh-cn/)

- [深度对比三种主流微服务配置中心](https://zhuanlan.zhihu.com/p/62191330)

- [nacos 入门-nacos 简介与启动](http://liflag.cn/post/39)

- [egg 中如何使用 nacos 微服务](https://blog.csdn.net/weixin_40829594/article/details/114111912)

- [注册 Vue SSR 服务到 Nacos 服务中心](https://www.yuque.com/samirguo/oboxgd/uy07zz)

- [node.js 调用 gRpc 服务](https://www.gitmemory.com/issue/alibaba/nacos/5145/803715560)

- [Nacos - 服务端处理实例列表请求](https://segmentfault.com/a/1190000038835528)

- [Node 集成到微服务体系](https://juejin.cn/post/6845166890709417991)

- [Node 微服务选型设计问题。](https://cnodejs.org/topic/5bbda56837a6965f59052042)

- [NestJS](https://docs.nestjs.cn/)

- [Next.js](https://www.nextjs.cn/)

- [wx: RPC 发展史](https://mp.weixin.qq.com/s?src=11&timestamp=1630978481&ver=3299&signature=hbioxSQ0clxzq0TJndFIlU-t0doRooniyDQWK7FWBTb6cgx2nadwCjUYBKzgoMbT0ycetcggAjZ4CwEXc32A9FCkL4MGHs3jaqkPI95xYf8H0fPxFK0bD3HS5-KMYHLi&new=1)

- [wx: gRPC 入门指南 — 简单 RPC（一）](https://mp.weixin.qq.com/s?src=11&timestamp=1630978491&ver=3299&signature=uJUR-NS4j7bZ6exVPeYTzy4yIWYttttd1GHEW4w2RYrTEtNTuKdbJfzRGA8l-SQJkgJTcBh7Fjd-tC00mb8iSWniLZEbUxlfvoL0DFMEYcRd4L16nPlclsik4*CKpk7V&new=1)

- [gRPC 简介及优缺点](https://www.jianshu.com/p/5f664efd5798)

- [gRPC 详解](https://www.jianshu.com/p/9c947d98e192)

- [gRPC](https://www.grpc.io/)

- [nodejs 负载均衡（一）：服务负载均衡](https://zhuanlan.zhihu.com/p/129838721)

## === 20210906 ===

- [微服务平台下基于 GraphQL 构建 BFF 的实践与思考: GMTC](https://www.infoq.cn/video/H66bxlDNX08wsfxuQgyW)

- [GraphQL-BFF：微服务背景下的前后端数据交互方案](https://zhuanlan.zhihu.com/p/75241522)

- [如何使用 GraphQL，Koa 和 MongoDB 设置功能强大的 API（一）](https://www.jianshu.com/p/6b7b1de7c09f)

- [GraphQL 搭配 Koa 最佳入门实践](https://segmentfault.com/a/1190000012720317)

- [wx: 微服务下使用 GraphQL 构建 BFF 的实践](https://mp.weixin.qq.com/s?src=11&timestamp=1630892345&ver=3297&signature=EsfSUVpfs*109HTDTBMrAkriBtZY-li5bRJIDqIWt08yzbpDzYG82Go3vwwF06V6OQe*84Mt2obppUXsUpM6SaeDa8UBWe6tAktvBsx1hg1zzgECPJmhqe9ldS4zDwDW&new=1)

- [微服务下使用 GraphQL 构建 BFF](https://zhuanlan.zhihu.com/p/35108457)

- [GraphQL 及元数据驱动架构在后端 BFF 中的实践](https://zhuanlan.zhihu.com/p/370436576)

- BFF：[Pattern: Backends For Frontends](https://samnewman.io/patterns/architectural/bff/)

---

- [dockone.io: Consul](http://dockone.io/topic/Consul)

- [微服务注册中心产品 ZooKeeper、Eureka、Consul 、Nacos 对比](http://dockone.io/article/58870)

- [wx: 五分钟了解 Consul](https://mp.weixin.qq.com/s?src=11&timestamp=1630893921&ver=3297&signature=FHVezmlekmi7n4loQ3UeAjkGkGd*q85GeWPT4VE1KEMCIeYvs*WeB4n5eVkYnrUwDEh9B4fSbqbubOxUPGH4EVJx8wsNT5abCcqWo0DmCD9ThUNH2Gc7dLET*jFY5gPt&new=1)

---

- [js 中 Promise 与 async/await 的用法](https://blog.csdn.net/guairena/article/details/110530169)

- [KOA2 通过 nacos 实现服务注册 Spring Cloud Gateway 调用](https://blog.csdn.net/python2007cn/article/details/119707192)

- [[进阶篇]nodejs 服务使用随机端口注册 eureka](https://blog.csdn.net/zhubinwell/article/details/79924581)

- [wx: Node.js + Consul 实现服务注册、健康检查、配置中心](https://mp.weixin.qq.com/s?src=11&timestamp=1630915807&ver=3297&signature=8qT65S6q42y*rGv5WKMKjY2npkgJ3XISGSECf3kc5jQBUV5J4AJiJl9elahYeWE43TbvsWBBGFyhvrjzdKfWD5Pi82tvM3eadMNe-ECPuA5oUruvZO2n2eEf16D8DCAT&new=1)

- [基于 nodejs+zookeeper 服务发现](https://blog.csdn.net/jrn1012/article/details/77043523)

- [NodeJs 服务注册与服务发现实现](https://juejin.cn/post/6844903758338457607)

- [nodejs 微服务解决方案](https://segmentfault.com/a/1190000015051682)

- [nodejs 入门教程之 http 的 get 和 request 简介及应用](https://www.cnblogs.com/hanguidong/p/9307391.html)

---

- [wx: koa 与 express 的中间件机制揭秘](https://mp.weixin.qq.com/s?src=11&timestamp=1630895452&ver=3297&signature=7lUYcLcmvyW8z7PpRnOe60pXzyAQWpTVg-JVXHBjtLu9PWVR3G0YgoDPbuY4k2MSPCcs9pA2oFUIkeiqexgUtNG0vzlCQBDYwtjK98G1CGJY95H8oKHpUvJz8xuH13Va&new=1)

- [express 和 koa 的区别](https://www.jianshu.com/p/632bfeebd43d)

## === 20210905 ===

- [Scrimba：交互式教学平台](https://scrimba.com/)

- [【微前端】qiankun 到底是个什么鬼](https://zhuanlan.zhihu.com/p/379744976)

- [使用原生 js 通过缓动函数实现抽奖转盘动画](https://zhuanlan.zhihu.com/p/372894854)

- [js 定时器的时间最小值-setTimeout、setInterval](https://www.cnblogs.com/daysme/p/6207495.html)

- [基本初等函数图形及几种常用曲线](https://blog.csdn.net/hnyy0301/article/details/104150845)

- [wx: 18 种推荐的 CSS 命名和书写规范](https://mp.weixin.qq.com/s?src=11&timestamp=1630565697&ver=3289&signature=NXVAM87nMiFP7SipREWYEPJqBnf9-eVzfmKn6nPfDAY6R7ce2EmYOpSnxMCzcnD3N2x87-A7ErtdXBPrY9pgwI9Xf074omF6WUatll*P60iBxWBDoZzWPq-CfrFDn5Yy&new=1)

- [如何规范 CSS 的命名和书写？](https://www.zhihu.com/question/19586885)

- 百度 fex 团队 [fex-team/styleguide](https://github.com/fex-team/styleguide/blob/master/css.md)

- 腾讯 AlloyTeam [Code Guide by @AlloyTeam](http://alloyteam.github.io/CodeGuide/)

## === 20210901 ===

- [使用 Node.js 实现 base64 和 png 文件相互转换的方法](https://www.jb51.net/article/182413.htm)

- [wx: 5 分钟学会 nodejs 文件增删改查](https://mp.weixin.qq.com/s?src=11&timestamp=1630475591&ver=3287&signature=3lRAE214Zcr3qesKtSsx4OyGnTRe5zQLock0IThxvEJH8Kd5TDktYZDzVR1XZjRM5I5ZUNmhTBXonVoB7Fp*eaUTztju*LXIloaye7skFlD3vKH7KJVTgiEWeWPOxzsJ&new=1)

- [js blob 与 base64 互转、以及 file 和 base64 的相互转换](http://www.manongjc.com/detail/24-civwrgnuqscbpsp.html)

- [wx: 数据库系列：MYSQL VARCHAR 类型详解](https://mp.weixin.qq.com/s?src=11&timestamp=1630465628&ver=3287&signature=HohKfgvV9Z8GjYLx-ebGxJf39kxWjhRLepMq3jRGNVKGW6IFVr67c5YavCc7626DIjysHf5vi6crEjyIJ9cQQ6KPeb4Lnmfx-Pk6IzMHL9UC0u2YkJICVK2ULjGCRMV7&new=1)

- 在线格式转换：[aconvert.com](https://www.aconvert.com/cn/)

- [不要把 svg 转成 base64](https://qianduan.net/dont-svg-base64/)
