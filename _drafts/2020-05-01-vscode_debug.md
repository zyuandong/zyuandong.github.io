---
title: 使用 VS Code 进行 Debug
category: 随笔
---

## 前端

## 后端

Node.js + nodemon

1. 生成 `launch.json` 文件

2. 选择 `Add Configuration...`，在 `launch.json` 中会自动出现下拉选项，选择 `Node.js: Nodemon Setup`，会自动生成相关配置

   ```json
   {
     "console": "integratedTerminal",
     "internalConsoleOptions": "neverOpen",
     "name": "nodemon",
     "program": "${workspaceFolder}/app.js",
     "request": "launch",
     "restart": true,
     "runtimeExecutable": "nodemon",
     "skipFiles": ["<node_internals>/**"],
     "type": "pwa-node"
   }
   ```

3. 修改 `runtimeExecutable` 字段为本地 nodemon 命令的具体位置

   - 全局 nodemon，e.g.：`C:\\Users\\Administrator\\AppData\\Roaming\\npm\\nodemon`

   - 当前项目中安装的 nodemon，e.g.：`${workspaceFolder}/node_modules/.bin/nodemon`

4. 修改 `program` 字段为要启动的文件

5. 完成。

`launch.json` 文件内容如下:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "name": "nodemon",
      "program": "${workspaceFolder}\\bin\\www",
      "request": "launch",
      "restart": true,
      "runtimeExecutable": "C:\\Users\\Administrator\\AppData\\Roaming\\npm\\nodemon",
      "skipFiles": ["<node_internals>/**"],
      "type": "pwa-node"
    },
    {
      "type": "pwa-node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}\\bin\\www"
    }
  ]
}
```

最好全局安装 nodemon

查看 nodemon 命令的具体位置

- Linux：`which nodemon`（扩展：`whereis`）
- Windows：`where nodemon`

## 参考

- [总结 vscode 调试 vue,nodejs 的各种方法](https://www.cnblogs.com/pdysb/p/12775994.html#_caption0)

- [vscode debugger 配置 nodemon 报错](https://blog.csdn.net/weixin_38080573/article/details/110322901)

- [vscode 配置 nodemon 调试](https://blog.csdn.net/zwkkkk1/article/details/82254725)
