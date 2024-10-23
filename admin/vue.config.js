// vue.config.js
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const webpack = require('webpack');

module.exports = {
  publicPath: '/',
  outputDir: 'dist', // 在build时生成文件的目录
  assetsDir: 'static',
  devServer: {
    // 代理 支持webpack-dev-server所有选项
    disableHostCheck: true,
    port: 3001, // 端口号
    https: false
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        __isBrowser__: true
      })
    ],
  },

  chainWebpack: config => {
    config.module
      .rule('fonts')
      .test(/\.(ttf|woff)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options = {
          ...options,
          limit: 10000,
          name: '[name].[hash:7].[ext]',
        }
        return options
      })
      .end()
    config.resolve.alias
      .set('@', resolve('src'))
      .set('~', resolve('src/components'))
      .set('$root', resolve('..'))
    // SVG集成配置
    // 重点:删除默认配置中处理svg
    config.module.rules.delete('svg')
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}
