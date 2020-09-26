module.exports = {
  lintOnSave: false,
  productionSourceMap: false,

  chainWebpack: (config) => {
    // Inline images & svgs into build
    config.module
      .rule('images')
      .use('url-loader')
      .options({
        limit: 4096 * 3
      })
    config.module
      .rule('svg')
      .use('file-loader')
      .loader('url-loader')
      .options({
        limit: 4096 * 3
      })
  },

  css: {
    extract: false
  }
}
