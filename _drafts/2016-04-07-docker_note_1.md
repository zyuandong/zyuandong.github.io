---
title: Docker 学习笔记（一）
category: 随笔
tag: Docker
monthLast: true
---

=== 20210608 更新 ===

[Docker--从入门到实践](https://yeasy.gitbook.io/docker_practice/)

---

## Docker概念

### 容器技术

Linux容器技术很早就有了，比较有名的是被集成到主流Linux内核中的LXC项目。容器通过对操作系统的资源访问进行限制，构建成独立的资源池，让应用运行在一个相对隔离的空间里，同时容器间也可以进行通信。
容器技术对比虚拟化技术，容器比虚拟化更轻量级，对资源的消耗小很多。容器操作也更快捷，启动和停止都要比虚拟机快。但Docker容器需要与主机共享操作系统内核，不能像虚拟机那样运行独立的内核。
Docker是一个基于LXC技术构建的容器引擎，基于GO语言开发，遵循Apache2.0协议开源。Docker的发展得益于为使用者提供了更好的容器操作接口。包括一系列的容器，镜像，网络等管理工具，可以让用户简单的创建和使用容器。
Docker支持将应用打包进一个可以移植的容器中，重新定义了应用开发，测试，部署上线的过程，核心理念就是 Build once, Run anywhere。
Docker容器技术的典型应用场景是开发运维上提供持续集成和持续部署的服务。
下面我们开始介绍Docker中的几个基本概念。

### 镜像

Docker的镜像概念类似于虚拟机里的镜像，是一个只读的模板，一个独立的文件系统，包括运行容器所需的数据，可以用来创建新的容器。
镜像可以基于Dockerfile构建，Dockerfile是一个描述文件，里面包含若干条命令，每条命令都会对基础文件系统创建新的层次结构。
用户可以通过编写Dockerfile创建新的镜像，也可以直接从类似github的Docker Hub上下载镜像使用。

```cmd
docker search nginx

docker images
docker image ls

docker pull nginx

docker run --name nginx-container -p 8080:80 -d nginx

docker image rm <image ID>
```

### 容器

Docker容器是由Docker镜像创建的运行实例。Docker容器类似虚拟机，可以支持的操作包括启动，停止，删除等。每个容器间是相互隔离的，但隔离的效果比不上虚拟机。容器中会运行特定的应用，包含特定应用的代码及所需的依赖文件。
在Docker容器中，每个容器之间的隔离使用过Linux的 CGroups 和 Namespaces 技术实现的。其中 CGroups 对CPU，内存，磁盘等资源的访问限制，Namespaces 提供了环境的隔离。

```cmd
docker ps

docker container ls
docker container ls -a

docker stop <container name>

docker restart <container name>

docker start <container name>

docker rm <container name>

docker container exec -it <container id> /bin/bash
```

### 仓库

如果你使用过 git 和 github 就很容易理解Docker的仓库概念。Docker仓库相当于一个 github 上的代码库。
Docker 仓库是用来包含镜像的位置，Docker提供一个注册服务器（Registry）来保存多个仓库，每个仓库又可以包含多个具备不同tag的镜像。Docker运行中使用的默认仓库是 Docker Hub 公共仓库。
仓库支持的操作类似 git，创建了新的镜像后，我们可以 push 提交到仓库，也可以从指定仓库 pull拉取镜像到本地。

## 搭建 Docker 环境

操作系统 CentOS

```shell
sudo yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-engine
```

安装 Docker 的依赖库:

`yum install -y yum-utils device-mapper-persistent-data lvm2`

添加 Docker CE 的软件源信息:

`yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo`

安装 Docker CE:

`yum makecache fast`

`yum -y install docker-ce`

启动 Docker 服务:

`systemctl start docker`

## 基于 Nginx 部署 Vue 项目

结构说明：

```text
/demo
|
|__ Dockerfile
|__ dist
|__ nginx
      |__ default.conf
```

Dockerfile 文件：

```dockerfile
FROM nginx
COPY dist/ /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
```

default.conf 文件：

```nginx
server {
  listen       80;
  server_name  192.168.62.14;

  #charset koi8-r;
  access_log  /var/log/nginx/host.access.log  main;
  error_log  /var/log/nginx/error.log  error;

  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
  }

  location /server-manager {
    rewrite  /api/(.*)  /$1  break;
    proxy_pass http://192.168.64.20:8888/;
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

生成镜像：

在存在 Dockerfile 的目录下执行命令：

`docker build -t <image name> .`

查看所有镜像：

`docker images`

启动容器：

`docker run -d --name <container name> -p 8080:80 <image name>`

- `docer run` 基于镜像启动容器
- `-d` 后台方式运行
- `--name <container name>` 设置容器名
- `-p 8080:80` 端口映射，将宿主的 8080 端口映射到容器的 80 端口

访问地址： http://IP:8080，即可正常访问项目。

IP 地址为宿主机的地址

查看容器：

```sh
# 所有容器
docker ps -a
docker container ls -a

# 运行中容器
docker ps
docker container ls
```

停止容器：

`docker container stop <container ID | container name>`

运行已停止的容器：

`docker container start <container ID | container name>`

删除容器：

`docker container rm <contaienr ID | container name>`

### 需要修改容器中的配置文件

实际开发中，经常会遇到需要修改容器中配置文件的情况，比如之前例子中的 Nginx 配置，有一下几种方法：

- 方法一：进入容器修改

针对修改 Nginx 配置文件这个例子，进入容器内部:

 `docker container exec -it <container name> bash`

修改 Nginx 配置文件：

`vi /etc/nginx/conf.d/default.conf`

**注：默认容器环境下不包含 vim，通过 `apt-get update` -> `apt-get install vim` 安装 vim**

之后重启 Nginx 服务即可:

`nginx -s reload`

- 方法二：映射配置文件

很显然方法一并不是通用的方法，接着介绍一个简洁、高效的方法：

> 映射配置文件：把宿主机上的配置文件映射到启动的容器当中

``` Dockerfile
docker run \
-d --name <container name> \
-p 8080:80 \
-v /root/nginx:/etc/nginx/conf.d \
-v /root/dist:/usr/share/nginx/html \
<image name>
```

or

``` Dockerfile
docker run \
-d --name <container name> \
-p 8080:80 \
--mount type=bind,source=/root/nginx,target=/etc/nginx/conf.d \
--mount type=bind,source=/root/dist,target=/usr/share/nginx/html \
<image name>
```

这样以后修改了配置文件，只需要重启容器就能使配置文件生效。

*最开始 -v 或者 --volume 选项是给单独容器使用， --mount 选项是给集群服务使用。但是从 Docker 17.06 开始，也可以在单独容器上使用 --mount。*

shell 脚本 `runApp.sh`：

```shell
#!/bin/bash

echo ""

SOURCE_PATH="/home/soft/demo/xxcj"

docker stop news-app

docker rm news-app

docker run \
-d --name news-app \
-p 8082:80 \
-v ${SOURCE_PATH}/dist:/usr/share/nginx/html \
-v ${SOURCE_PATH}/nginx:/etc/nginx/conf.d \
nginx-vue-image_1.0

# --mount type=bind,source=${SOURCE_PATH}/dist,target=/usr/share/nginx/html \
# --mount type=bind,source=${SOURCE_PATH}/nginx,target=/etc/nginx/conf.d \
```

运行脚本：

`bash runApp.sh` or `./runApp.sh`

## 参考

- [8 个基本的 Docker 容器管理命令](https://mp.weixin.qq.com/s?src=11&timestamp=1620971083&ver=3067&signature=RlymF*sP*UEbU*eQRpI3coenrhRYMNOtvm*WBw5Km*uadfWKkDAB9w5Rpo0JqQ5zDMb15z4JUMsHsYHUrb1G0Lk5599S2HYT*5qyYUIHJGUjFqIrEw9uhkbKPtJGOHhh&new=1)

- [docker上启动nginx,并配置修改nginx的配置文件](https://blog.csdn.net/weixin_45839894/article/details/112269082)

- [Docker部署nginx并修改配置文件](https://blog.csdn.net/weixin_34354173/article/details/92726480)

- [Docker + Nginx 部署 Vue 项目](https://zhuanlan.zhihu.com/p/345622879)

- [[手把手系列之]Docker 部署 vue 项目](https://mp.weixin.qq.com/s?src=11&timestamp=1620971110&ver=3067&signature=FG1qt3ryyKjwm4extLRMUA76XAQ4wQyPPh0WqA7H8lCqgEReI8hm9qSgPkk2ys1fnZ93ur41foA*gLWV-YDiBHICfrhfhNIWaJi6UuP4xaGW-kSJ-iVUP7liS03BJSv*&new=1)

- [Dockerfile 详解，看这一篇就够了](https://mp.weixin.qq.com/s?src=11&timestamp=1620971128&ver=3067&signature=1b8aa4iDOAu3FODtaJsKZMWgS-*WX-9nxBGVHFDejNpnM2AclUsqRfNycnqREx5Oe8atM69zCeu8mJDHlmKF9sWECzQk*kJBWx8Qr*n66gQbaTitw455g15DmJMGCHCi&new=1)

- [使用nginx代理vue项目静态文件](https://mp.weixin.qq.com/s?src=11&timestamp=1620971153&ver=3067&signature=EB6NnhoulxyTerTQyTfUc52LXsll-DCaggDZpUj4fnFb55TMvzIwBwAzpef6mBYo5HQUIzREnR--qzU4gV*Y69oukaoEWln2ieF6mY694S7QgR74JOH-gZM*2nvWgSaO&new=1)

- [nginx 基本入门(至今为止见过最好的 nginx 入门文章，没有之一。)](https://www.jianshu.com/p/93ac21161ac6)

- [docker上启动nginx,并配置修改nginx的配置文件](https://blog.csdn.net/Dhjie_king/article/details/113868250)

- [Nginx部署Vue项目实战案例](https://mp.weixin.qq.com/s?src=11&timestamp=1620971170&ver=3067&signature=RnSS4MJkb*h*KIigIsNG3Eg8teAfVyPZM2HDjxch1oi6xAQ2Hvj7ETijUVz1PE3yoTcdchZEiHAjy1Qjkxdx29Lb4MOCf4RYUob1NeH7*MmRHUhEK-cRTlKyUWxvYMmr&new=1)

- [最简单的docker教程：在docker里运行nginx服务器](https://zhuanlan.zhihu.com/p/50918703)

- [sg:wx Docker镜像（image）详解](https://mp.weixin.qq.com/s?src=11&timestamp=1625643229&ver=3175&signature=k*EJ6*IcBmAIpR96dutqsZq1NTAO*Efi8e84r7WSwSdIeGpYX7VQHShceQn4KsaVNpVy4iCHvXqeo-fhbO6Pzbrq9FZ-nvFkSySvxN227xGTCKK8iZP8B6WjVCs4ytJ5&new=1)
