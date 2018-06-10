const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './test/base-test.js',
  output: {
    path: path.resolve(__dirname, './dist/bundle'),
    filename: 'es5-bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader'
    }]
  }
}
