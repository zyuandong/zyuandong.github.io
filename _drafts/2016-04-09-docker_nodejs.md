---
title: Docker 部署 Node.js 项目
---

## 上传源代码至服务器

`/root/<project name>/`

## Dockerfile

```docker
FROM centos/nodejs-12-centos7

USER root
RUN mkdir -p /home/lottery-service
WORKDIR /home/lottery-service

# Bundle app source
COPY . /home/lottery-service
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]
```

根据 Dockerfile 生成一个 image:

`docker build -t lottery-servie:0.0.1 .`

## 启动

```sh
docker run -d \
--name lottery-service_v1 \
-p 3000:3000 \
# -v /root/<project name>/lottery-service:/home/lottery-service \
-e TZ="Asia/Shanghai" \ # 设置时区
lottery-service
```
