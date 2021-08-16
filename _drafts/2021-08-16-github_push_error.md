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

```shell
# 1
ssh-keygen -t rsa -C 'de1719@163.com'
Generating public/private rsa key pair.

# 2
Enter file in which to save the key (/Users/zhangyd/.ssh/id_rsa): 
/Users/zhangyd/.ssh/id_rsa already exists.

# 3
Overwrite (y/n)? y

# 4 输入密码，若不需要密码，直接回车
Enter passphrase (empty for no passphrase): 

# 5 再次输入密码，或者回车
Enter same passphrase again: 
Your identification has been saved in /Users/zhangyd/.ssh/id_rsa.
Your public key has been saved in /Users/zhangyd/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:XEF9DNG57RqMHuTHMhac0gHfh83u4CEaFXjWZkHddOQ de1719@163.com
The key's randomart image is:

```

VS Code 自带 push 无法识别带密码的 SSH KEY

```git
git remote set-url <name> <newurl>
```

## 参考

- [GitHub不再支持密码验证解决方案：SSH免密与Token登录配置](https://www.cnblogs.com/zhoulujun/p/15141608.html)
