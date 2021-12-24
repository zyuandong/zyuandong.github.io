---
title: macOS 实用工具
category: 工具
tags: [macOS, iTerm2]
---

## iTerm2

### 设置 HotKey Window

设置方式：

iTerm2 > Preferences... > Profiles > '+' 创建一个新窗口 > General (重命名为 Hotkey Window) > Keys (勾选 'A hotkey opens a dedicated window with this profile') > 新弹出的窗口中设置快捷键 （Option + Space）> Ok

优化样式：

- 透明度 （Window > Transparency）
- 尺寸：（Window > Style > 选择 'Full-Width Top of Screen'）

### oh-m-zsh

#### 安装方式

- curl

  `sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`

- wget

  `sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`

- fetch

  `sh -c "$(fetch -o - https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`

#### 主题

在 `~/.zshrc` 下 `ZSH_THEME="dst"`

### 终端使用自动补全时忽略大小写

旧方法：（macOS 新版本默认使用 zsh 后，设置 ~/.inputrc 失效）

`echo "set completion-ignore-case on" >> ~/.inputrc`

新方法：

- [忽略大小写\_Mac 终端 zsh 忽略大小写](https://blog.csdn.net/weixin_39802784/article/details/112669288)

- 安装 oh-m-zsh 后有此效果

### 快捷键

- ⇧: Shift
- ⌃: Ctrl
- ⌥: Option
- ⌘: Command

```console
⌃ + a - 光标移到行首

⌃ + e - 光标移到行尾

⌃ + w - 清除光标之前一个单词

⌃ + k - 清除光标到行尾的字符

⌃ + h - 删除光标前一个字符

# ⌃ + f - 光标后移一个字符 (右箭头替代

# ⌃ + b - 光标前移一个字符 (左箭头替代
```

Mac 默认的终端工具可以通过快捷键 `⌥ + ←` 、 `⌥ + →` 将光标移动至上一个、下一个单词，但在 iTerm2 中只能移动一个字符的位置，效率很低。

最后只需要重新设置映射，便可以在 iTerm2 中使用这两个快捷键，操作如下：

- 打开 iTerm2 的快捷键设置：Profiles -> Open Profiles -> Edit Profiles -> Keys

![iTerm2 配置界面](https://i.loli.net/2021/06/03/oXauYd1iAqDKSwx.png)

- 找到 `⌥ + ←`，双击进入设置，Action 选择 “Send Escape Sequence”，然后输入 “b” 即可。

![设置 ⌥ + ← 映射](https://i.loli.net/2021/06/03/aB3PYXEUgAtOemc.png)

- 下一步，找到 `⌥ + →`，执行同样的操作，最后输入 “f” 即可。

![设置 ⌥ + → 映射](https://i.loli.net/2021/06/03/UJ3bQFNHga6wmkA.png)

## 启用原生的 NTFS 读写

```shell
# 查看挂载信息
sudo mount

# 输入登录密码后输出：
/dev/disk1s5 on / (apfs, local, read-only, journaled)
devfs on /dev (devfs, local, nobrowse)
/dev/disk1s1 on /System/Volumes/Data (apfs, local, journaled, nobrowse)
/dev/disk1s4 on /private/var/vm (apfs, local, journaled, nobrowse)
map auto_home on /System/Volumes/Data/home (autofs, automounted, nobrowse)
/dev/disk1s3 on /Volumes/Recovery (apfs, local, journaled, nobrowse)
/dev/disk2s1 on /Volumes/KINGSTON (ms_ntfs, local, read-only, noowners)

# 卸载
sudo umount /Volumes/KINGSTON/

# 重新挂载
sudo mount -t ntfs -o rw,auto,nobrowse /dev/disk2s1 ~/ntfs-volume
# 之后通过 ~/ntfs-volume 路径就可以读写挂载硬盘了
```

## 系统截图

`command + shift + 3` - 捕捉全屏

`command + shift + 4` - 捕捉所选部分

`command + shift + 5` - 捕捉所选窗口

- [在 Mac 上如何更改用户名或用户帐户/个人文件夹的名称？](https://zhuanlan.zhihu.com/p/361131804)
