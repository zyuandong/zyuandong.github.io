---
title: Mac / Windows 下安装多种版本的 JDK
category: 工具
tags: [Java, Mac, Windows]
---

## 1. 前言

在日常的开发过程中，很长时间里都是使用 Java 8 为主要开发版本，但是最近突然发现 IDE 的部分插件需要不低于 Java 11 的版本才能正常使用其功能。考虑到大部分项目还是使用的 Java 8 版本，贸然升级开发版本担心会产生兼容问题，解决这些问题可能会影响开发进度，于是只能考虑其他的办法。

正好联想到平时使用 `nvm` 来管理 Node.js 版本，那是否也可以安装多种版本的 JDK，需要使用什么版本都可以自由切换，并且互不影响呢？

最后查询到很多同学都有安装多种版本 JDK 的需求，并且也已经有了很通用的方案。尝试过后果然很理想的解决了我的问题，在此简单记录一下方便以后随时回顾。

## 2. 下载 JDK

以下是几个常用的 JDK 下载地址。

Oracle JDK 下载地址：

- [Oracle JDK](https://www.oracle.com/java/technologies/downloads/)

新款 Mac 已经使用 M1 芯片替换了 Intel 芯片，架构也由 x86 改变为 ARM 架构，目前只有 Azul 提供了适配 ARM 架构的 JDK 版本：

- [Zulu JDK](https://www.azul.com/downloads/)

包含了各种版本的 JDK 下载地址集合，很方便：

- [injdk.cn](https://www.injdk.cn/)

## 3. Mac OS 系统

### 3.1. 安装并配置

### 3.2. 使用

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

### 3.3. 配置后使其生效

`source ~/.base_profile`

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

## 4. Windows 系统

### 4.1. 安装并配置

### 4.2. 使用

```shell
JAVA_HOME=%JAVA8_HOME%
JAVA8_HOME=c:\...\...\jdk1.8
JAVA11_HOME=c:\...\...\jdk_11
Path=%JAVA_HOME%\lib;%JAVA_HOME%\jre\bin;
CLASSPATH=%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar;
```

切换版本时需要修改环境变量中 `JAVA_HOME` 的值

...

{% comment %}

## 5. 参考

- [JAVA 安装下载及安装配置](https://zhuanlan.zhihu.com/p/451787386)
- [Windows/Mac JDK（含 M1/M2 Arm 原生 JDK）安装，附各个版本 JDK 下载链接](http://www.bryh.cn/a/52786.html)
- [Mac M1Pro 芯片,新手从安装 jdk 到第一个 Java 程序详细指南(2022 年 10 月)](https://blog.csdn.net/qq_38877139/article/details/127467596)
- [Mac 系统 Java 环境搭建完整教程](https://blog.csdn.net/weixin_43103074/article/details/124445284)
- [苹果的 Mac OS 系统适合 Java 开发吗？](https://www.zhihu.com/question/349910310)
- [升级 MacBook Pro M1 Pro 啦](https://zhuanlan.zhihu.com/p/558809261)
- [MacM1 芯片安装 java 开发环境（idea+jdk）](https://www.jianshu.com/p/58f7232eb7ba)
- [MacBookPro M1 版 Java 开发工具大全套讲解与安装](https://www.cnblogs.com/jiliangqian/p/16554540.html)

{% endcomment %}
