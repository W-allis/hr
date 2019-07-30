module.exports = {
  plugins: [
    require("autoprefixer")({

    }),
    require("postcss-pxtorem")({
      rootValue: 20,
      unitPrecision: 5,
      propList: ['*', '!border-width', '!border', '!letter-spacing', '!box-shadow'],
      selectorBlackList: ['cube-ui'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    })
  ]
}