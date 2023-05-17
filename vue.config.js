'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  outputDir: "html",
  publicPath: "/",
  devServer: {
    open: true,
    port: 8848
  },
  chainWebpack: (config) => {
    config.module
      .rule("scss")
      .oneOf("vue")
      .use("px2rem")
      .loader("px2rem-loader")
      .before("postcss-loader")
      .options({
        remUnit: 75,
        remPrecision: 8,
      })
      .end()

      .rule("js")
      .include.add("/packages")
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap((options) => {
        return options;
      });
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        'images': resolve('src/assets/images'),
      }
    }
  },
  css: {
    extract: true,
    sourceMap: false,
    requireModuleExtension: true,
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/variables.scss";`,
      },
    },
  },
};
