---
title: WebSocket
---

## location

( location = ) > ( location 完整路径 ) > ( location ^~ 路径 ) > ( location ,\* 正则顺序 ) > ( location 部分起始路径 ) > ( / )

## proxy_pass

在 nginx 中配置 proxy_pass 代理转发时，如果在 proxy_pass 后面的 url 加/，表示绝对根路径；如果没有/，表示相对路径，把匹配的路径部分也给代理走。

假设下面四种情况分别用 `http://192.168.1.1/proxy/test.html` 进行访问。

```nginx
# 1.
locatin /proxy/ {
  pxoxy_pass http://127.0.0.1/;
}
# 代理到 http://127.0.0.1/test.html

# 2. ???
locatin /proxy/ {
  pxoxy_pass http://127.0.0.1;
}
# 代理到 http://127.0.0.1/proxy/test.html

# 3.
locatin /proxy/ {
  pxoxy_pass http://127.0.0.1/context/;
}
# 代理到 http://127.0.0.1/context/test.html

# 4. ???
locatin /proxy/ {
  pxoxy_pass http://127.0.0.1/context;
}
# 代理到 http://127.0.0.1/contexttest.html
```

## WebSocket

```nginx
location /websocket/ {
  proxy_set_header Upgrade &http_upgrade; # 必须
  proxy_set_header Connection "upgrade"; # 必须
  proxy_http_version 1.1;
  proxy_read_timeout 6000s; # 超时时间
  proxy_pass http://192.168.3.13:8086/integration-cplatform-service/;
}
```

## 参考

- [搞懂现代 Web 端即时通讯技术一文就够：WebSocket、socket.io、SSE](https://www.163.com/dy/article/GJ9QQ5VP0511X1MK.html?f=post2020_dy_recommends)

- [Nginx 之 location 详解](https://blog.csdn.net/qq_40907977/article/details/106815216)

- [一份简单够用的 Nginx Location 配置讲解](https://baijiahao.baidu.com/s?id=1721001111848497442&wfr=spider&for=pc)

- [Nginx 如何支持 WebSocket](https://blog.csdn.net/summer_fish/article/details/118960408)

- [解决 nginx 下 websocket 的长连接问题](https://baijiahao.baidu.com/s?id=1714370851394804830&wfr=spider&for=pc)

- [nginx 处理 websocket 连接](https://blog.csdn.net/weixin_43931358/article/details/111039750)
