---
title: Mac / Windows 下安装不同版本的 JDK
category: 工具
tags: [Java, Mac, Windows]
---

## Windows

```shell
JAVA_HOME=%JAVA8_HOME%
JAVA8_HOME=c:\...\...\jdk1.8
JAVA11_HOME=c:\...\...\jdk_11
Path=%JAVA_HOME%\lib;%JAVA_HOME%\jre\bin;
CLASSPATH=%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar;
```

## Mac OS

```shell
# For Java
export JAVA_8_HOME=$(/usr/libexec/java_home -v 1.8)
export JAVA_11_HOME=$(/usr/libexec/java_home -v 11)

alias java8='export JAVA_HOME=$JAVA_8_HOME'
alias java11='export JAVA_HOME=$JAVA_11_HOME'
# default java 8
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_231.jdk/Contents/Home
```

`java8`、`java11` 切换 8 、11 版本

### 配置后使其生效

`source ~/.base_profile`

## 20221127

[官网 JDK](https://www.oracle.com/java/technologies/downloads/)

[injdk.cn](https://www.injdk.cn/)

M1 芯片 arm 架构

[azul.com](https://www.azul.com/downloads/)

```shell
# 查看 JDK 安装路径
$ /usr/libexec/java_home -V

Matching Java Virtual Machines (2):
    11.0.17 (arm64) "Azul Systems, Inc." - "Zulu 11.60.19" /Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home
    1.8.0_352 (arm64) "Azul Systems, Inc." - "Zulu 8.66.0.15" /Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home
/Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home

$ /usr/libexec/java_home -v 1.8
/Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home

$ /usr/libexec/java_home -v 11
/Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home
```

## 参考

[Mac 系统 Java 环境搭建完整教程](https://blog.csdn.net/weixin_43103074/article/details/124445284)

[苹果的 Mac OS 系统适合 Java 开发吗？](https://www.zhihu.com/question/349910310)

[升级 MacBook Pro M1 Pro 啦](https://zhuanlan.zhihu.com/p/558809261)

[MacM1 芯片安装 java 开发环境（idea+jdk）](https://www.jianshu.com/p/58f7232eb7ba)

[MacBookPro M1 版 Java 开发工具大全套讲解与安装](https://www.cnblogs.com/jiliangqian/p/16554540.html)

[Mac M1Pro 芯片,新手从安装 jdk 到第一个 Java 程序详细指南(2022 年 10 月)](https://blog.csdn.net/qq_38877139/article/details/127467596)

[JAVA 安装下载及安装配置](https://zhuanlan.zhihu.com/p/451787386)

[Windows/Mac JDK（含 M1/M2 Arm 原生 JDK）安装，附各个版本 JDK 下载链接](http://www.bryh.cn/a/52786.html)
