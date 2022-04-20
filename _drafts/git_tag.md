---
title: Git - tag
---

## 创建标签

`git tag <tag name>`

### 轻量标签 or 备注标签

轻量标签：`git tag <tag name>`

备注标签：`git tag -a <tag name> -m <message>`

## 查看所有标签

`git tag -l`

## 本地标签提交到远程库

`git push --tags`

## 删除本地标签

`git tag -d <tag name>`

## 删除远程标签

`git push origin --delete <tag name>`

远程如果存在名称相同的分支和标签名，推荐：`git push origin :refs/tags/<tag name>`

删除远程标签后再删除本地标签

## 参考

[Git——在 Git 中删除标签](https://zhuanlan.zhihu.com/p/465427172)
