---
title: VS Code 下如何使用 Tomcat
category: 随笔
---

1. VS Code 安装插件 Tomcat for Java

2. 打包项目生成 war 包

   项目根目录下快捷键 `Ctrl + Shift + p` 调出 VS Code 命令面板，输入 tomcat，执行命令：`Tomcat: Generate War Package from Current Folder`

3. `TOMCAT SERVERS` 中新建一个 tomcat 服务，需要选择本地 Tomcat 目录

4. 运行 war 包

   选中生成的 war 包，右键选择 `Run on Tomcat Server`

## 参考

- [VsCode 运行Java Web 项目（Tomcat）](https://www.jianshu.com/p/1355b54a5801)
