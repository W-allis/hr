const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = require('../config')
const utils = require('./utils')

const resolve = function(_path) {
  return path.resolve(__dirname, '../src/assets/plug', _path)
}

module.exports = {
  entry: {

  },
  output: {
    filename: utils.staticJoin('js/[name]_[hash:8].js'),
    path: config.dev.outputPath
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', 'json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    // loaders: [
    //   {
    //     path
    //   }
    // ],
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // {
      //   test: /\.html(\?.*)?$/,
      //   loader: 'html-loader'
      // },
      {
        test: /\.ts(\?.*)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.js(\?.*)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // 解决zepto没有按照模块化导入导致的bug
      {
        test: /zepto/,
        loader: 'exports-loader?window.Zepto!script-loader'
      },
      {
        test: /\.(png|swf|gif|jpe?g)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.staticJoin('image/[name].[ext]')
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|qlv)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.staticJoin('media/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.staticJoin('fonts/[name].[ext]')
        }
      }
    ]
  },
  externals: {
    $: 'zepto'
    // sui: [
    //   resolve('sui-mobile.css'),
    //   resolve('sui-mobile.extend.css'),
    //   resolve('sui-mobile.js'),
    //   resolve('sui-mobile.extend.js')
    // ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../assets'),
      to: config.dev.staticPath,
      ignore: ['.*']
    }])
  ],
  node: {
    fs: 'empty',
    cjs: 'empty'
  }
}