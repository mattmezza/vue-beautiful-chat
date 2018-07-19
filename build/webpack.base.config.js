const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

//  "build:client": "cross-env NODE_ENV=production webpack --config ./build/webpack.client.config.js --progress --hide-modules",

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    library: 'vue-beautiful-chat',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  // devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new UglifyJSPlugin(),
    new CopyWebpackPlugin([
      { from: 'public/*', to: '', flatten: true },
    ])
  ]
}
