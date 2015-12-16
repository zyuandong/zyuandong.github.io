---
title: Nginx牛刀小试
category: web
tags: [web, Nginx]
monthLast: true
---

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