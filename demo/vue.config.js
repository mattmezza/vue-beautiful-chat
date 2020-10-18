module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-beautiful-chat/' : '/',
}
