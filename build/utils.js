const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('../config')

exports.resolve = function(_path) {
  return path.resolve(__dirname, '../', _path)
}

exports.staticJoin =  function (_path) {
  const staticPath = process.env.NODE_ENV === 'production' ? config.build.staticPath : config.dev.staticPath
  return path.join(staticPath, _path)
}

const rulesCollection = function(options) {
  
  const cssRule = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postCssRule = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const MiniCssRule = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      sourceMap: options.sourceMap
    }
  }

  const stylRule = {
    loader: 'style-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  function doJob(type, _options = { }) {
    const output = options.usePostCss ? [options.extract ? MiniCssRule : stylRule, cssRule, postCssRule] : [options.extract ? MiniCssRule : stylRule, cssRule]

    return type ? (output.push({
      loader: `${type}-loader`,
      options: { sourceMap: options.sourceMap, ..._options }
    }), output) : output
  }

  return {
    css: doJob(),
    less: doJob('less'),
    scss: doJob('sass'),
    sass: doJob('sass', { indentedSyntax: true })
  }
}

exports.styleRules = function(options) {
  const Rules = rulesCollection(options)

  return Object.keys(Rules).reduce((total, current) => (total.push({
    test: new RegExp(`\\.${current}$`),
    use: Rules[current]
  }), total), [])
}

const pagePath = exports.resolve('src/page')
exports.entriesCollection = function() {
  const pages = fs.readdirSync(pagePath)
  
  return pages.reduce((total, current) => (total[current] = path.resolve(pagePath, current), total), { })
}

exports.entries = function() {
  const _entries = exports.entriesCollection()
  
  // 垫片，整理兼容性
  return Object.keys(_entries).reduce((output, current) => (output[current] = ['babel-polyfill', _entries[current]], output), { })
}

exports.htmls = function(options) {
  const entries = exports.entriesCollection()

  return Object.keys(entries).map(key => new HtmlWebpackPlugin({
    template: path.resolve(entries[key], 'index.html'),
    filename: `${key}.html`,
    inject: 'body',

    path: path.join(process.env.NODE_ENV === 'production' ? config.build.publicPath : config.dev.publicPath, config.dev.staticPath),
    minify: options.minify,

    chunks: [key, 'vendor', 'common']
  }))
}
