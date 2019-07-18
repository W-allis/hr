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
      "/wxpAppid": {
        target: "https://api.weixin.qq.com",
        changeOrigin: false,
        secure: false,
        pathRewrite: { "^/wxpAppid": "" }
      },
      "/wxpSentiment": {
        target: "http://192.168.38.11:5000",
        changeOrigin: false,
        pathRewrite:{"^/sentiment":""}
      },
      "/qrcode": {
        target: "https://cdn-qa.cunyingtech.com",
        changeOrigin: true,
        // secure: true,
        pathRewrite:{"^/qrcode":""}
      },
      "https\:\/\/cdn-qa\.cunyingtech\.com": {
        target: "https://cdn-qa.cunyingtech.com",
        changeOrigin: true,
        // secure: true,
        pathRewrite:{"^https://cdn-qa.cunyingtech.com":""}
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