# FastAI(公开更新通道)

本仓库是 **FastAI**(基于 VS Code 的定制版 AI 编辑器)的公开更新通道,只放应用自动读取的两个小文件:

| 位置 | 内容 |
| --- | --- |
| `update/manifest.json` | 版本清单:应用启动后自动读取,有更高版本就提示更新 |
| `update/clients.json` | 客户端伪装在线档案:应用每天自动拉取 |

源码与成品安装包存放在私有仓库中(仅作者账号可见),不在此公开。

## 规则

- 本仓库必须保持公开(Public),否则应用读不到上面两个文件,更新提示与伪装热更会失效;
- 维护方式见 [update/README.md](update/README.md);
- 发布新版本:构建 → 打包 zip → 上传到私有仓库 Releases → 更新本仓库 `manifest.json` 的 `version` 与 `url`。

## 命名约定

- 产品 / 应用:FastAI(`FastAI.exe`)
- 发布包:`FastAI-<版本>-win32-x64.zip`
- 用户数据目录:`%APPDATA%\FastAI`
- 版本号:FastAI 独立编号(当前 30.0.0,下一版 30.0.1)
