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
-v /data/.../webapps/ROOT:/usr/local/tomcat/webapps \
tomcat:8.5
```

宿主机映射目录（/data/.../webapps/ROOT）下包含 index.html 文件

- [wx: 如何在docker中用Tomcat运行web项目](https://mp.weixin.qq.com/s?src=11&timestamp=1635239475&ver=3398&signature=STSjaZVyRbjwYGr18JdkDdC8jFoLHDQBv9*aSrSBzIx6rtgcW27mFd-SCsQBDzCAt4q3hvNzXo-WzRS61t1EidJ*wotO*ZDEiHTRBDRFfDlC*sbVQjIRNKJBCQugHKw4&new=1)

- [wx: 12个docker常用命令！以tomcat为例](https://mp.weixin.qq.com/s?src=11&timestamp=1635239475&ver=3398&signature=RP88I3Fcg9RIjWPxqscwaHVDVHVt3BgcPSoSCErgtf4-1m3yAS0YyihErpbxbN9r7XERxRV0VIqQHQQwNHDk4YICzZEzrHq1d8jafjqDwvaXA6STnJB9WCxgaJw5gyGI&new=1)