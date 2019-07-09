const path = require('path')

module.exports = {
  dev: {
    outputPath: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    
    staticPath: './static',

    UI: [
      ''
    ],

    proxyTable: {
      '/api': {
        target: 'http://www.baidu.com',
        changeOrigin: false,
        pathRewrite: {
          '^/api': ''
        },
      },
      "/sentiment": {
        target: "http://192.168.38.11:5000",
        changeOrigin: false,
        pathRewrite:{"^/sentiment":""}
      },
    }
  },
  build: {
    staticPath: './static',
    publicPath: '/',

    analyzer: false,
    gzip: true
  }
}