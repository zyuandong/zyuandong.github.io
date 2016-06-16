---
title: Nginx 端口映射访问
category: 后端技术
tags: [Nginx]
---

## 故事的开始

这是我第一次接触 Nginx，起因是帮朋友做一个宣传性质的官网和一套简单的后台管理系统（特粗糙）。坑货为了省钱只给我准备了一台服务器，要求只有一个就是能用就好，我也只能
硬着头皮在一台服务器上做两个网站。

最后，基本功能实现，因为绑定了两个域名，以及不想在 url 中出现端口号，不得不查阅网上资料，照着例子完成了下面的配置。

## 故事的经过

简单的配置方法：

`/etc/nginx/sites-enabled` 下的配置文件

```
upstream qzf {
    server 127.0.0.1:3000;
    keepalive 64;
}
server {
    listen 80;
    server_name www.qzfny.com qzfny.com;
    access_log /var/log/nginx/qzf.log;
    location / {
        proxy_set_header   X-Real-IP            $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header   Host                   $http_host;
        proxy_set_header   X-NginX-Proxy    true;
        proxy_set_header   Connection "";
        proxy_http_version 1.1;
        proxy_pass         http://qzf;
    }
}
```

## 故事的结尾

目的是达到了，可毕竟第一次用，并没有太深入的了解，所以没有详细的配置过程讲解，在此只是做一个简单的记录，待更新。。。

## 未完待续。。。