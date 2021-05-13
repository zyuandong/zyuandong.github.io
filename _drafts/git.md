---
title: Git
date: 2021-04-30
---

## 刪除某条提交记录

查看提交记录

```bash
git log

> commit C
> commit B
> commit A
```

想删除记录 B

### 情况一：commit 没有被 push 到远程仓库

```bash
git reset A --hard
git cherry-pick C
```

执行以上命令即可

同理，处理 A-B-C-D，要删除 B:

```bash
git reset A --hard
git cherry-pick C D
```

若删除记录之后有很多的 commit，可使用 `git rebase -i <commitId>`：

```bash
git rebase -i A
```

### 情况二：commit 已经 push 到远程仓库

此情况比较复杂，在多人协同开发情况下，如果已经有人拉取了此待删除的记录，除了删除远程仓库的记录外，还需通知其他人。

现在假设暂无其他人拉取此记录，操作方式如下：

```bash
git reset --hard A
git push origin HEAD --force
```

**注意：此操作会将 B 之后的记录一并删除**

## git tag

[git tag 的基本用法](https://mp.weixin.qq.com/s?src=11&timestamp=1620892195&ver=3065&signature=Tirnl*vOnhdwInpxhdlrPSZmlMwbk86nzijrswn-e-0EeenQF9kB6YmSYFaWj6NMcUqWC6-5xwAmHev89mZsDvfoIdeMXkwUu9nGAZOIhwHUgmrGzXy7tIUH0a1a1zio&new=1)

## 参考资料

删除本地
[git怎么删除某一次提交？(Elpie Kay 的回答)](https://www.zhihu.com/question/324710274/answer/685892850)

删除远程
[清除Github提交历史记录](http://zhuanlan.zhihu.com/p/35078876)

其他待验证
[Git奇技|随意删除某个commit](https://zhuanlan.zhihu.com/p/270033984)

[git revert命令](https://mp.weixin.qq.com/s?src=11&timestamp=1619752860&ver=3039&signature=*tfIdAQRtmiUElxK*N*unQbS1ZXm*Ug92QvtmjYKOAP3H6Yif71l3HQYPPz1gYNypeqfWwoqYU*s09cZutBksc7g*fz20Lna3anrF0-fjuQAVio4prQ6cfi27yjmRdjf&new=1)

[git 删除远程分支上的某次提交](https://zhuanlan.zhihu.com/p/39645306)