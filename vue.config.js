/*
 * @Description: 
 * @StartVersion: 2.0
 * @LastVersion: 2.0
 * @Autor: gaoyue
 * @Date: 2022-09-06 18:22:13
 * @LastEditTime: 2022-09-06 18:22:24
 */
const path = require('path')
module.exports = {
  // 修改 src 为 examples
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
     // @ 默认指向 src 目录，这里要改成 examples
    // 另外也可以新增一个 ~ 指向 packages
    config.resolve.alias
      .set('@', path.resolve('examples'))
      .set('~', path.resolve('package'))

    config.module
      .rule('js')
      .include
        .add(/package/)
        .end().include.add(/examples/)
        .end()
      .use('babel')
        .loader('babel-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        })
  }
};