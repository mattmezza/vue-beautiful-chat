module.exports = {
  lintOnSave: true,
  chainWebpack: config => {
    // Inline images & svg into the generated js
    config.module.rule('images').use('url-loader').options({
      limit: 4096*3,
    });
    config.module.rule('svg').use('file-loader').loader('url-loader').options({
      limit: 4096*3,
    });
  },
  css: {
    // Inline the css into the generated js. Otherwise a vue-beautiful-chat.css file is generated in dist/
    // that needs to be included along with the generated js.
    // extract: false
  }
}
