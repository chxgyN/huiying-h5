'use strict'
// 脚手架的自定义配置文件 通过自定义配置覆盖默认配置
// 项目的根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// 导出包含选项的对象
module.exports = {
  //语法检查
  lintOnSave: false,
  productionSourceMap: false,
  outputDir: "html",
  // 部署在域名的根路径上
  publicPath: "/",
  devServer: {
    open: true,
    port: 8080
  },
  // webpack 配置进行更细粒度的修改。
  // 这里面可以定义具名的loader规则和具名插件。
  chainWebpack: (config) => {
    config.module
      .rule("scss")
      .oneOf("vue")
      .use("px2rem")
      .loader("px2rem-loader")
      .before("postcss-loader")
      .options({
        //修改loader选项
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
        //修改loader选项
        return options;
      });
  },

  // 新增/修改 webpack 的 plugins 或者 rules
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
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
        // 传递给 sass-loader
        // 向全局sass样式传入共享的全局变量
        additionalData: `@import "@/assets/styles/variables.scss";`,
      },
    },
  },
};
