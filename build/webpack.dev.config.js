const Webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')

const utils = require('./utils') 
const config = require('../config') 

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  entry: utils.entries(),
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': require('../config/local')
    }),
    new Webpack.HotModuleReplacementPlugin({

    }),
    ...utils.htmls({
    })
  ],
  module: {
    rules: [
      ...utils.styleRules({
        extract: false,
        usePostCss: true,
        sourceMap: true
      })
    ]
  },
  devServer: {
    contentBase: config.dev.outputPath,
    port: 9527,
    proxy: config.dev.proxyTable
  }
})