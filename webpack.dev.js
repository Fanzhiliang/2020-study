const webpack = require('webpack')
const { merge } = require('webpack-merge')
const base = require('./webpack.config.js')

module.exports = merge(base, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: "'development'",
      BASE_API: "'/dev'"
    })
  ]
})