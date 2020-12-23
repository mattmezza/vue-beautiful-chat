const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  lintOnSave: false,
  productionSourceMap: isProd,
  publicPath: isProd ? '/vue-beautiful-chat/' : '/'
}
