'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    devServer: {
        overlay: {
            errors: true,
            warnings: true
        }
    },
    // 页面入口文件配置
    entry: {
        app: './src/main.js'
    },
    // 对应输出项配置（即入口文件最终要生成什么名字的文件、存放到哪里）app.js
    output: {
        path: config.build.assetsRoot, //导出目录的绝对路径
        filename: '[name].js', //导出文件的文件名
        publicPath: process.env.NODE_ENV === 'production' //生产模式或开发模式下html、js等文件内部引用的公共路径
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    // 主要设置模块如何被解析
    resolve: {
        //查找module的话从这里开始查找
        // root: 'E:/github/flux-example/src', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js', '.vue', '.json', '.less', '.css', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        // 创建import或require的别名
        alias: {
            // AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'src': path.resolve(__dirname, '../src'),
            'api': path.resolve(__dirname, '../src/api'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'filters': path.resolve(__dirname, '../src/filters'),
            'i18n': path.resolve(__dirname, '../src/i18n'),
            'mock': path.resolve(__dirname, '../src/mock'),
            'router': path.resolve(__dirname, '../src/router'),
            'store': path.resolve(__dirname, '../src/store'),
            'styles': path.resolve(__dirname, '../src/styles'),
            'utils': path.resolve(__dirname, '../src/utils'),
            'views': path.resolve(__dirname, '../src/views'),
            'static': path.resolve(__dirname, '../static')
        }
    },
    // 最关键的一块配置。它告知 webpack 每一种文件都需要使用什么加载器来处理
    // 如何处理项目不同类型的模块
    module: {
        rules: [
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                exclude: [resolve('src/assets')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/, // vue文件后缀    
                loader: 'vue-loader',//使用vue-loader处理
                options: vueLoaderConfig//options是对vue-loader做的额外选项配置
            },
            {
                test: /\.js$/, // js文件后缀
                loader: 'babel-loader', //使用babel-loader处理
                include: [resolve('src'), resolve('test')] //必须处理包含src和test文件夹
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //图片后缀
                loader: 'url-loader', //使用url-loader处理
                options: { // options是对loader做额外的选项配置
                    limit: 10000, //图片小于10000字节时以base64的方式引用
                    name: utils.assetsPath('img/[name].[hash:7].[ext]') //文件名为name.7位hash值.拓展名
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, //字体文件
                loader: 'url-loader', //使用url-loader处理
                options: { //eg:关于query 仅由于兼容性原因而存在。请使用 options 代替
                    limit: 10000, //字体文件小于1000字节的时候处理方式
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]') //文件名为name.7位hash值.拓展名
                }
            }
        ]
    }
}
