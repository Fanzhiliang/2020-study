const path = require('path')
// 生成html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 打包时复制文件到打包目录
const CopyWebpackPlugin = require('copy-webpack-plugin');


// 静态文件目录
const StaticPath = './public'
// 打包文件目录
const BuildPath = './dist'
// src文件目录
const SrcPath = './src'

module.exports = {
  //  入口文件
  // entry: path.resolve(SrcPath, 'index.js'),
  entry: {
    index: path.resolve(SrcPath, 'index.js'),
    readme: path.resolve(SrcPath, 'readme.js'),
  },
  // 打包路径
  output: {
    // 必须是绝对路径
    path: path.join(__dirname, BuildPath),
    // [name]：多入口文件名
    // [hash]：hash值
    filename: 'static/js/[name].[hash].js'
  },
  devServer: {
    port: 3000,
    // 自动打开
    open: true,
    // gzip 压缩
    compress: true,
    // 此路径下的打包文件可在浏览器中访问
    contentBase: path.resolve(StaticPath),
    // 代理
    // proxy: {
    //   [process.env.BASE_API]: {
    //     target: '',
    //     changeOrigin: true,
    //     ws: false,
    //     pathRewrite: {
    //       ['^' + process.env.BASE_API]: ''
    //     }
    //   }
    // }
  },
  resolve: {
    alias: {
      '@': path.resolve(SrcPath)
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: path.resolve('node_modules'),
        include: path.resolve('src')
      },
      //处理文件
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              outputPath: "static/img/",
              // 小于200kb用base64解析
              limit: 200 * 1024
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, StaticPath, 'index.html'),
      filename: 'index.html',
      title: '首页',
      // 只引用某些入口文件，这些入口的值要在 entry 设置
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, StaticPath, 'index.html'),
      filename: 'readme.html',
      title: '简历',
      // 只引用某些入口文件，这些入口的值要在 entry 设置
      chunks: ['readme']
    }),
    new CopyWebpackPlugin([
      // 把 静态 文件夹内的内容复制到 打包 文件夹下
      {
        from: path.resolve(__dirname, StaticPath),
        to: path.resolve(__dirname, BuildPath)
      }
    ]),
  ]
}