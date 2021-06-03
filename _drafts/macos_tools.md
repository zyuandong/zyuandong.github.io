---
title: macOS 实用工具
category: 工具
tags: [macOS, iTerm2]
---

## iTerm2

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

但是只需要重新映射之后，便可以在 iTerm2 中使用这两个快捷键，操作如下：

- 打开 iTerm2 的快捷键设置：Profiles -> Open Profiles -> Edit Profiles -> Keys

![macos_tools-preferences.png](https://i.loli.net/2021/06/03/oXauYd1iAqDKSwx.png)

- 找到 `⌥ + ←`，双击进入设置，Action 选择 “Send Escape Sequence”，然后输入 “b” 即可。

![macos_tools-option_b.png](https://i.loli.net/2021/06/03/aB3PYXEUgAtOemc.png)

- 下一步，找到 `⌥ + →`，执行同样的操作，最后输入 “f” 即可。

![macos_tools-option_f.png](https://i.loli.net/2021/06/03/UJ3bQFNHga6wmkA.png)

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
