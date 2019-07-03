const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const config = require('../config')
const utils = require('./utils')

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
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
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
      {
        test: /\.(png|swf|gif|jpe?g)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: utils.staticJoin('image/[name].[ext]')
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
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
  plugins: [
    new VueLoaderPlugin()
  ],
  node: {
    fs: 'empty',
    cjs: 'empty'
  }
}