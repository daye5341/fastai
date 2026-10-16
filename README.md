# FastAI 更新通道

本仓库是 **FastAI 应用的更新通道**(不是源码仓库),存放:

- `update/manifest.json` —— FastAI「检查更新」读取的版本清单(静态 JSON)。

## 清单格式

```json
{
  "version": "1.143.0.1",
  "url": "https://github.com/daye5341/fastai/releases/download/v1.143.0.1/FastAI-1.143.0.1-win32-x64.zip",
  "notes": "一行更新说明(可选)"
}
```

- **version**: 版本号。前三段跟 VS Code 基底版本,第四段是 FastAI 自己的修补序号
  (当前 `1.143.0.0`;改一次发一版就 `1.143.0.1`、`1.143.0.2`…;将来换基底到 1.144 就从 `1.144.0.0` 开始)。
- **url**: 新版压缩包下载地址(建议放本仓库的 Releases 里,直链即用)。
- FastAI 应用侧:本地版本取自 `product.json` 的 `fastaiUpdateVersion`,与该清单对比,清单更高时提示"发现新版本"。

## 应用侧配置

FastAI 设置里 `fastai.update.manifestUrl` 指向本清单的直链:

```
https://raw.githubusercontent.com/daye5341/fastai/main/update/manifest.json
```

> 注意:本仓库必须保持**公开(Public)**,否则应用无法直接读取该地址。

## 发布新版的步骤

1. 构建出新的 `VSCode-win32-x64` 目录,打包成 zip(如 `FastAI-1.143.0.1-win32-x64.zip`);
2. 在本仓库 **Releases** 新建一个 release(标签如 `v1.143.0.1`),把 zip 作为附件上传;
3. 把新版应用的 `product.json` 里 `fastaiUpdateVersion` 改成新号(如 `1.143.0.1`);
4. 修改本仓库 `update/manifest.json`:version 改成同一个新号,url 改成第 2 步的附件直链;
5. 提交并推送 —— 之后所有旧版 FastAI 启动(或手动「FastAI: 检查更新」)就会提示新版本。
