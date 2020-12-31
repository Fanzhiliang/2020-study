const webpack = require('webpack')
const { merge } = require('webpack-merge')
const base = require('./webpack.config.js')

//将css打包成.css文件，而不是放在style标签内
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//压缩css代码
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//使用上面的插件后，js代码就不压缩了，要用这插件
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = merge(base, {
  mode: 'production',
  output: {
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 注意 loader 加载顺序和书写顺序是相反的
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(sass|scss)$/,
        // 注意 loader 加载顺序和书写顺序是相反的
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
    ]
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserWebpackPlugin()]
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: "'production'",
      BASE_API: "'/prod'"
    }),
    // 抽离css
    new MiniCssExtractPlugin({
      filename: 'static/css/main.[hash].css'
    })
  ]
})