// FastAI「检查更新」本地测试服务:把同目录的 manifest.json 通过 HTTP 提供出去。
// 用法:  node serve-test.cjs
// 然后:  在 FastAI 设置里把 fastai.update.manifestUrl 填为 http://127.0.0.1:8899/manifest.json
//         执行命令「FastAI: 检查更新」即可看到效果。
const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 8899
const FILE = path.join(__dirname, 'manifest.json')

http.createServer((req, res) => {
	if (req.url && req.url.startsWith('/manifest.json')) {
		try {
			const body = fs.readFileSync(FILE)
			res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
			res.end(body)
			console.log(new Date().toISOString(), '已提供清单', req.url)
		} catch (e) {
			res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' })
			res.end('读不到 manifest.json: ' + String(e))
		}
	} else {
		res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
		res.end('404 请访问 /manifest.json')
	}
}).listen(PORT, '127.0.0.1', () => {
	console.log('FastAI 更新清单测试服务已启动:')
	console.log(`  http://127.0.0.1:${PORT}/manifest.json`)
	console.log('把它填进 FastAI 设置 fastai.update.manifestUrl,再执行「FastAI: 检查更新」。')
})
