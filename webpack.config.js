const path = require('path')
// 生成html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 打包时复制文件到打包目录
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  //  入口文件
  entry: './src/index.js',
  // 打包路径
  output: {
    // 必须是绝对路径
    path: path.join(__dirname, 'dist'),
    filename: 'static/js/main.js'
  },
  devServer: {
    port: 3000,
    // 此路径下的打包文件可在浏览器中访问
    contentBase: path.join(__dirname, "public"),
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
  module: {
    rules: [
      {
        test: /\.css$/,
        // 注意 loader 加载顺序和书写顺序是相反的
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(sass|scss)$/,
        // 注意 loader 加载顺序和书写顺序是相反的
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
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
              limit: 200 * 1024,
              esModule: false
            }
          }
        ]
      },
      //处理在html中图片文件路径
      {
        test: /\.html$/,
        use: "html-withimg-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html"
    }),
    new CopyWebpackPlugin([
      // 把 static 文件内的内容复制到 output.path 路径下的static文件内
      {
        from: path.join(__dirname, 'public/static'),
        to: "./static"
      }
    ]),
  ]
}