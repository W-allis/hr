const path = require('path')

module.exports = {
  dev: {
    outputPath: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    
    staticPath: './static',

    proxyTable: {
      '/api': {
        target: 'http://www.baidu.com',
        changeOrigin: false,
        pathRewrite: {
          '^/api': ''
        }
      } 
    }
  },
  build: {
    staticPath: './static',
    publicPath: '/',

    analyzer: false,
    gzip: true
  }
}