---
title: Git - branch
---

## 创建并切换分支

前提：当前分支没有修改未提交的内容

`git checkout -b <branch name>`

## 查看所有分支

`git branch -a`

## 本地分支提交到远程库

## 修改本地分支名称

`git branch -m <old name> <new name>`

## 修改远程分支名称

分步骤：

1. 修改本地分支名称：
   `git branch -m <old name> <new name>`
2. 删除远程分支：
   `git push origin --delete <old name>`
3. 提交新命名的分支：
   `git push origin <new name>`
   或者
   `git push --set-upstream origin <new name>`
4. 把修改后的本地分支与远程分支关联：
   `git branch --set-upstream-to origin/<new name>`
   或者
   `git branch --set-upstream-to=origin/<branch> <new name>`

## 删除本地分支

`git branch -d <branch name>`

在 a 分支只能删除 a 以外的分支

## 删除远程分支

`git push origin --delete <branch name>`

或者

`git push origin :<branch name>` (需要先删除本地分支)

当存在相同名称的标签和分支时，使用一下命名删除远程分支

`git push origin :refs/heads/<branch name>`
