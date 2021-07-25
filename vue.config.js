const path = require('path')
const dayjs = require('dayjs')
const isDev = process.env.NODE_ENV === 'development'
const now = dayjs().format('YYYY-MM-DD HH:mm:ss')

function resolve (dir) {
  return path.join(__dirname, dir)
}
const externals = {}
const cdn = {
  dev: {
    css: [
      // '//res.wx.qq.com/open/libs/weui/2.1.3/weui.css'
    ],
    js: []
  },
  build: {
    css: [
      // '//res.wx.qq.com/open/libs/weui/2.1.3/weui.min.css'
    ],
    js: []
  }
}
const PORT = process.env.PORT || 2021
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    port: PORT,
    host: '0.0.0.0',
    overlay: {
      warnings: true,
      errors: true
    }
    // proxy: {
    //   // detail: https://cli.vuejs.org/config/#devserver-proxy
    // }
  },
  pluginOptions: {
    // import global scss variables and mixins
    // 'style-resources-loader': {
    //   preProcessor: 'less',
    //   patterns: [
    //     // resolve('./src/assets/styles/global.less')
    //   ]
    // }
  },
  configureWebpack (config) {
    config.externals = externals
    if (process.env.NODE_ENV === 'production') {
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  chainWebpack (config) {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]'
      })
      .end()

    config.plugin('html').tap(args => {
      args[0].cdn = isDev ? cdn.dev : cdn.build
      return args
    })

    config.plugin('define').tap((args) => {
      // DefinePlugin 设置值 必须 JSON 序列化 或者 使用 双引号 包起来
      args[0]['process.env'].NOW = JSON.stringify(now)
      return args
    })

    const oneOfsMap = config.module.rule('less').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            resolve('./src/assets/styles/global.less')
          ]
        })
        .end()
    })
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            '@green': '#409eff'
          }
        }
      }
    }
  }
}
