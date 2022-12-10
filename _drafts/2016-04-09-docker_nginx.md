---
title: Docker 使用 Nginx 镜像部署前端
category: 工具
---

## 上传打包后的代码至服务器

e.g.

`/root/<project name>/dist`

同时上传 Nginx 配置文件，用于之后的外部挂载，e.g.

`/root/<project name>/nginx/default.conf`

```nginx
server {
  listen       80;
  server_name  localhost;

  #charset koi8-r;
  access_log  /var/log/nginx/host.access.log  main;
  error_log  /var/log/nginx/error.log  error;

  location / {
    root   /usr/share/nginx/html;
    add_header Access-Control-Allow-Origin *;
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
    add_header 'Access-Control-Allow-Headers' '*';
    add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
    index  index.html index.htm;
    try_files $uri $uri/ @router;
  }

  location /lottery_service_api/ {
    # rewrite  /api/(.*)  /$1  break;
    proxy_pass http://47.96.178.84:3000/;
  }

  location /socket.io {
    # rewrite  /api/(.*)  /$1  break;
    proxy_pass http://47.96.178.84:3000;
  }

  location @router {
    rewrite ^(.+)$ /index.html last;
  }

  #error_page  404              /404.html;

  # redirect server error pages to the static page /50x.html
  #
  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
    root   /usr/share/nginx/html;
  }
}
```

## Dockerfile

```docker
FROM nginx
COPY dist/ /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
```

生成 image:

`docker build -t <image name>:<tag> .`

tag 可以看做版本号，如果不加 `:<tag>`，则默认 tag 为 latest

## 创建并启动容器

```sh
docker run -d \
--name lottery-web_v1 \
-p 3001:80 \
-v /root/<project name>/nginx:/etc/nginx/conf.d \
-v /root/<project name>/dist:/usr/share/nginx/html \
lottery-web
```
