---
title: web 安全
category: 技术
tag: web
---

## 常见的前端安全策略

1. DOM check
2. HTTPS
3. csp

## 比较

**DOM check**

维护成本大，很难彻底解决攻击

**HTTPS**

从网络协议中开辟加密信道用于交换信息，能从网络层很好控制攻击，但是需要证书支持，且加载速度慢，访问效率不高。内部访问的资源也必须同在HTTPS协议中。

**csp**

一种代价小，回报大的安全策略，但是兼容性不好。

......