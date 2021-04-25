---
title: java config

---

## Windows

```text
JAVA_HOME=%JAVA8_HOME%
JAVA8_HOME=c:\...\...\jdk1.8
JAVA11_HOME=c:\...\...\jdk_11
Path=%JAVA_HOME%\lib;%JAVA_HOME%\jre\bin;
CLASSPATH=%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar;
```

## Mac OS

```bash
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
