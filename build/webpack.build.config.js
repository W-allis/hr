const Webpack = require('webpack')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const base = require('./webpack.base.config')
const utils = require('./utils') 
const config = require('../config')

const isProduction = process.env.NODE_ENV === 'production'

const build_config = merge(base, {
  output: {
    publicPath: isProduction ? config.build.publicPath : config.dev.publicPath
  },  
  mode: "production",
  entry: utils.entries(),
  devtool: false,
  module: {
    rules: [
      ...utils.styleRules({
        extract: true,
        usePostCss: true,
        sourceMap: true
      })
    ]
  },
  optimization: {
    splitChunks: {
      minSize: 30000,
      cacheGroups: {
        // 分离公共包
        common: {
          name: 'common',
          test: /[\\/]src.*\.js$/,
          // cacheGroupKey here is `commons` as the key of the cacheGroup
          chunks: 'all'
        },
        // 分离node_modules里面的依赖包
        vue: {
          name: 'vue',
          test: /[\\/]node_modules[\\/].*vue/,
          // cacheGroupKey here is `commons` as the key of the cacheGroup
          chunks: 'all'
        },
        jquery: {
          name: 'jquery',
          test: /[\\/]node_modules[\\/].*jquery/,
          // cacheGroupKey here is `commons` as the key of the cacheGroup
          chunks: 'all'
        }
      }
    }
  },  
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': require('../config/' + (isProduction ? 'prod' : 'dev'))
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: utils.staticJoin('css/[name].css'),
      chunkFilename: '[id].css',
    }),
    new CleanWebpackPlugin(),
    ...utils.htmls({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
})

if (config.build.analyzer) {

  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin 
  build_config.plugins.push(new BundleAnalyzerPlugin())
}

if (config.build.analyzer) {

  const CompressionPlugin = require('compression-webpack-plugin')
  build_config.plugins.push(new CompressionPlugin({
    // 超过压缩
    threshold: 8192,
    // 压缩率
    minRatio: 0.8,
    filename: '[path].gz[query]'
  }))
}


module.exports = build_config