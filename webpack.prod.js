const webpack = require('webpack')
const { merge } = require('webpack-merge')
const base = require('./webpack.config.js')

module.exports = merge(base, {
  mode: 'production',
  output: {
    publicPath: './'
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: "'production'",
      BASE_API: "'/prod'"
    })
  ]
})