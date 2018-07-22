'use strict'
require('./check-versions')()
// nodejs环境配置
const config = require('../config')
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn') //强制打开浏览器
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware') //使用代理的中间件
const webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
//端口号
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
//是否自动打开浏览器
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
//http的代理url
const proxyTable = config.dev.proxyTable

const app = express() //启动express
const compiler = webpack(webpackConfig) //webpack编译
//webpack-dev-middleware的作用
//1.将编译后的生成的静态文件放在内存中,所以在npm run dev后磁盘上不会生成文件
//2.当文件改变时,会自动编译。
//3.当在编译过程中请求某个资源时，webpack-dev-server不会让这个请求失败，而是会一直阻塞它，直到webpack编译完毕
const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})
//webpack-hot-middleware的作用就是实现浏览器的无刷新更新
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => { },// 若为false则关闭控制台的日志输出，console.log为打印
    heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
//声明hotMiddleware无刷新更新的时机:html-webpack-plugin 的template更改之后
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//     compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//         hotMiddleware.publish({ action: 'reload' })
//         cb()
//     })
// })

// enable hot-reload and state-preserving
// compilation error display
// 应用hotMiddleware中间件
app.use(hotMiddleware)

// proxy api requests
//将代理请求的配置应用到express服务上
Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
//使用connect-history-api-fallback匹配资源
//如果不匹配就可以重定向到指定地址
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// 应用devMiddleware中间件
app.use(devMiddleware)


// serve pure static assets
// 配置express静态资源目录
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
//编译成功后打印uri
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    // 满足条件则自动打开浏览器
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    //启动express服务
    server = app.listen(port)
    _resolve()
  })
})

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}
