# FastAI

基于 VS Code 的定制版 AI 编辑器:中文界面,内置自研扩展 `fastai-models`(多渠道模型接入、客户端伪装、在线模型目录),开箱即用。

本仓库是 **FastAI 的更新通道**(不是源码仓库),存放:

- `update/manifest.json` —— FastAI「检查更新」读取的版本清单(静态 JSON);
- `update/clients.json` —— 「客户端伪装」在线客户端档案表(见下文);
- Releases —— 各版本 `FastAI-<版本>-win32-x64.zip` 安装包(发版时上传)。

## 安装

1. 到本仓库 **Releases** 下载最新 `FastAI-<版本>-win32-x64.zip`;
2. 解压到任意目录(免安装),双击 `FastAI.exe` 运行;
3. 用户数据固定存放于 `%APPDATA%\FastAI-1.0.0` —— 升级只替换程序目录,数据不丢。

## 命名约定

以后所有东西统一用 **FastAI** 这个名称:

- 应用/产品名:`FastAI`(窗口标题、关于页;程序 `FastAI-1.0.0.exe`)
- 工程根目录:`FastAI编辑器`(本机 `D:\FastAI编辑器`,内含源码、成品、发布素材三个目录)
- 源码目录:`FastAI`(VS Code 分支;自研扩展在 `extensions/fastai-models`)
- 应用目录(构建输出,zip 解压后的文件夹名):`FastAI-win32-x64`
- 发布包:`FastAI-<版本>-win32-x64.zip`(如 `FastAI-1.143.0.1-win32-x64.zip`)
- 更新仓库:本仓库 `github.com/daye5341/fastai`
- 用户数据目录:`%APPDATA%\FastAI-1.0.0`(固定不变,升级不迁移、不丢数据)

## 清单格式(update/manifest.json)

```json
{
  "version": "1.143.0.1",
  "url": "https://github.com/daye5341/fastai/releases/download/v1.143.0.1/FastAI-1.143.0.1-win32-x64.zip",
  "notes": "一行更新说明(可选)"
}
```

- **version**:版本号。前三段跟 VS Code 基底版本,第四段是 FastAI 自己的修补序号
  (当前 `1.143.0.0`;改一次发一版就 `1.143.0.1`、`1.143.0.2`…;将来换基底到 1.144 就从 `1.144.0.0` 开始)。
- **url**:新版压缩包下载地址(建议放本仓库的 Releases 里,直链即用)。
- **notes**:一行更新说明(可选)。
- 应用侧:本地版本取自 `product.json` 的 `fastaiUpdateVersion`,与清单对比,清单更高时提示「发现新版本」;
  设置 `fastai.update.manifestUrl` 已预置为本清单的直链,`fastai.update.autoCheck`(默认开)启动后每天最多检查一次;
  也可用命令面板「FastAI: 检查更新」手动检查。

## 客户端伪装档案(update/clients.json)

`update/clients.json` 是「客户端伪装」的在线档案表:客户端改名 / 换 ID(如 2026-06 Windsurf 并入 Devin)或 UA 版本更新时改这里,应用**每天自动拉取**,不用升级应用。

- 应用每 24 小时检查一次(jsdelivr 优先、GitHub raw 兜底);顶栏「客户端伪装」按钮可手动刷新。
- `profiles` 里同 id 覆盖内置档案,新 id 直接追加;文件缺失 / 拉取失败时回退内置快照 + npm 最新版本号
  (claude-code / codex / gemini-cli / qwen-code / opencode 会自动跟 npm 版本)。
- 推送方式与 manifest.json 相同:把 `clients.json` 传进仓库的 `update/` 文件夹即可。

## 应用侧配置

FastAI 设置里 `fastai.update.manifestUrl` 已预置为本清单的直链:

```
https://raw.githubusercontent.com/daye5341/fastai/main/update/manifest.json
```

> 注意:本仓库必须保持**公开(Public)**,否则应用无法直接读取该地址。

## 发布新版的步骤

1. 从源码目录 `FastAI` 构建出新的应用目录,打包成 zip(命名为 `FastAI-<版本>-win32-x64.zip`);
2. 在本仓库 **Releases** 新建一个 release(标签如 `v1.143.0.1`),把 zip 作为附件上传;
3. 把新版应用的 `product.json` 里 `fastaiUpdateVersion` 改成新号(如 `1.143.0.1`);
4. 修改本仓库 `update/manifest.json`:`version` 改成同一个新号,`url` 改成第 2 步的附件直链;
5. 提交并推送 —— 之后所有旧版 FastAI 启动(或手动「FastAI: 检查更新」)就会提示新版本。
