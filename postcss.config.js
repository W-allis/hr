module.exports = {
  plugins: [
    require("autoprefixer")({

    }),
    require("postcss-pxtorem")({
      rootValue: 20,
      unitPrecision: 5,
      propList: ['*', '!border-width', '!border', '!letter-spacing'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    })
  ]
}