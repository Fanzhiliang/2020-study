const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const base = require('./webpack.config.js')
const PublicPath = '/'

module.exports = merge(base, {
  mode: 'development',
  output: {
    publicPath: PublicPath
  },
  module: {
    rules: [
      // 处理 js 新语法
      {
        test: /\.(js|jsx)$/,
        // cacheDirectory：开启缓存
        use: 'babel-loader?cacheDirectory',
        // 明确范围
        exclude: path.resolve('node_modules'),
        include: path.resolve('src')
      },
      {
        test: /\.(css|sass|scss)$/,
        // 注意 loader 加载顺序和书写顺序是相反的
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: "'development'",
      BASE_API: "'/dev'",
      BASE_URL: "'" + PublicPath + "'"
    })
  ]
})