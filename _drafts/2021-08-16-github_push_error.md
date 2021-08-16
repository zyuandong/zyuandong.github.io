---
title: 
---

今天提交代码，push到GitHub上，突然出现这个问题。

> remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
>
>
> remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
>
>
> fatal: unable to access 'https://github.com/xxx/xxx.git/': The requested URL returned error: 403

查看 ssh 目录：

```shell
ls -al ~/.ssh
```

创建新的 SSH KEY：

```shell
ssh-keygen -t rsa -b 406 -C "de1719@163.com"
```

```git
git remote set-url <name> <newurl>
```

## 参考

- [GitHub不再支持密码验证解决方案：SSH免密与Token登录配置](https://www.cnblogs.com/zhoulujun/p/15141608.html)
