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
        test: /\.(css|sass|scss)$/,
        // 注意 loader 加载顺序和书写顺序是相反的
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 根据抽离出来的css文件路径来设置
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
    // 压缩配置
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserWebpackPlugin()],
    // 代码分割
    splitChunks: {
      /**
       * initial：对异步导入的文件不处理
       * async：只对异步导入的文件进行处理
       * all：全部
      */
      chunks: 'all',
      cacheGroups: {
        // 第三方模块
        vendor: {
          // chunks 名称
          name: 'vendor',
          // 权重，越高越优先抽离
          priority: 1,
          test: /node_modules/,
          // 大小限制：大于多少才抽离
          minSize: 0,
          // 复用限制：用了多少次才抽离
          minChunks: 1
        },
        // 公共模块
        common: {
          name: 'common',
          priority: 1,
          minSize: 0,
          minChunks: 2
        },
      }
    }
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