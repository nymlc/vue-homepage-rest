'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {//生成loader
        const loaders = [cssLoader]// 默认是css-loader
        if (loader) {// 如果参数loader存在
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {//将loaderOptions和sourceMap组成一个对象
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {// 如果传入的options存在extract且为true
            return ExtractTextPlugin.extract({//ExtractTextPlugin分离js中引入的css文件
                use: loaders,//处理的loader
                fallback: 'vue-style-loader'//没有被提取分离时使用的loader
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    //返回css类型对应的loader组成的对象 generateLoaders()来生成loader
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {
            indentedSyntax: true
        }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    //定义返回的数组，数组中保存的是针对各类型的样式文件的处理方式
    const output = []
    // 调用cssLoaders方法返回各类型的样式对象(css: loader)
    const loaders = exports.cssLoaders(options)
    //循环遍历loaders
    for (const extension in loaders) {
        //根据遍历获得的key(extension)来得到value(loader)
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),// 处理的文件类型
            use: loader//用loader来处理，loader来自loaders[extension]
        })
    }
    return output
}
