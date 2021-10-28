---
title: Docker & Tomcat
---

```sh
# docker search <image name>:<image tag>
docker search tomcat

# docker pull <image name>:<image tag>
docker pull tomcat

# docker run ...
docker run -d \
--name <continer name> \
-p 8080:8080 \
-v /data/.../webapps/ROOT:/usr/local/tomcat/webapps/ROOT \
tomcat:8.5
```

映射到 Tomcat 的 ROOT 路径，可以通过 `http://ip:8080` 直接访问
映射到 Tomcat 的子路径（e.g. `-v /data/.../webapps/haha:/usr/local/tomcat/webapps/haha`），则通过 `http://ip:8080/haha` 访问

宿主机映射目录（/data/.../webapps/ROOT）下包含 index.html 文件

- [wx: 如何在 docker 中用 Tomcat 运行 web 项目](https://mp.weixin.qq.com/s?src=11&timestamp=1635239475&ver=3398&signature=STSjaZVyRbjwYGr18JdkDdC8jFoLHDQBv9*aSrSBzIx6rtgcW27mFd-SCsQBDzCAt4q3hvNzXo-WzRS61t1EidJ*wotO*ZDEiHTRBDRFfDlC*sbVQjIRNKJBCQugHKw4&new=1)

- [wx: 12 个 docker 常用命令！以 tomcat 为例](https://mp.weixin.qq.com/s?src=11&timestamp=1635239475&ver=3398&signature=RP88I3Fcg9RIjWPxqscwaHVDVHVt3BgcPSoSCErgtf4-1m3yAS0YyihErpbxbN9r7XERxRV0VIqQHQQwNHDk4YICzZEzrHq1d8jafjqDwvaXA6STnJB9WCxgaJw5gyGI&new=1)

- [tomcat 服务如何配置 vue-router 的 history 模式](https://segmentfault.com/q/1010000010079589)
