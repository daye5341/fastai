# update —— 更新通道与在线档案

应用运行时直接读取的两个线上文件。改这里的数据,不用发布新版应用即可生效。

## manifest.json —— 版本清单

线上地址:`https://raw.githubusercontent.com/daye5341/fastai/main/update/manifest.json`

- 应用侧:`fastai.update.manifestUrl` 已预置上述地址;`fastai.update.autoCheck`(默认开)= 启动后自动检查,每天最多一次;命令面板「FastAI: 检查更新」可手动检查;
- 只提示,不自动下载、不自动安装;
- `url` 指向成品 zip 的下载地址(在私有仓库 Releases 中,登录作者账号后可下载);
- 版本号规则:前三段跟 VS Code 基底,第四段为 FastAI 修补序号(当前 `1.143.0.0` → 下一版 `1.143.0.1`)。

发布新版流程:

1. 构建新应用目录、打包 `FastAI-1.143.0.1-win32-x64.zip`;
2. 上传到私有仓库 `fastai-private` 的 Releases(标签如 `v1.143.0.1`);
3. 新版应用 `product.json`:把 `fastaiUpdateVersion` 改为 `1.143.0.1`;
4. 修改本文件:`version` 同步为 `1.143.0.1`,`url` 改为 release 附件直链;
5. 提交推送,旧版应用启动或手动检查时即收到提示。

本地测试(不动线上清单):`node serve-test.cjs`,把设置的 manifestUrl 临时改为 `http://127.0.0.1:8899/manifest.json`,执行「FastAI: 检查更新」验证,测完改回。

## clients.json —— 客户端伪装在线档案

「客户端伪装」的档案库:客户端改名、UA 版本变化(如 2026-06 Windsurf 并入 Devin)时改这里即可,应用**每天自动拉取**(24 小时一次,jsdelivr 优先、GitHub raw 兜底);顶栏「客户端伪装」按钮可手动刷新。

- `profiles` 中同 id 覆盖内置档案、新 id 直接追加;
- 拉取失败时回退内置快照;`claude-code / codex / gemini-cli / qwen-code / opencode` 的版本号自动跟随 npm 最新版本;
- 维护:改本文件然后提交推送即可。

> 本仓库必须保持公开(Public),应用才能直接读取以上文件。
