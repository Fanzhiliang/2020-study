const path = require('path')
const { StaticPath, BuildPath, SrcPath, DllPath } = require('./config')

// 生成html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 打包时复制文件到打包目录
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 处理 vue
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 动态链接库
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')

module.exports = {
  //  入口文件
  // entry: path.resolve(SrcPath, 'index.js'),
  entry: {
    // 此处写成数组为了和 webpack.dev.js 的热更新配置合并
    index: [
      path.resolve(SrcPath, 'index', 'main.js'),
    ],
    readme: [
      path.resolve(SrcPath, 'readme', 'main.js'),
    ],
  },
  // 打包路径
  output: {
    // 必须是绝对路径
    path: path.join(__dirname, BuildPath),
    // [name]：多入口文件名
    // [hash]：hash值
    filename: 'static/js/[name].[hash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(SrcPath),
    },
  },
  module: {
    rules: [
      // 处理文件
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              outputPath: 'static/img/',
              // 小于200kb用base64解析
              limit: 200 * 1024,
            },
          },
        ],
      },
      // 处理 .vue 文件
      {
        test: /\.vue$/,
        use: 'vue-loader',
        include: path.resolve('src'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, StaticPath, 'index.html'),
      filename: 'index.html',
      title: '首页',
      // 只引用某些入口文件，这些入口的值要在 entry 设置
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, StaticPath, 'index.html'),
      filename: 'readme.html',
      title: '简历',
      // 只引用某些入口文件，这些入口的值要在 entry 设置
      chunks: ['readme'],
    }),
    new CopyWebpackPlugin([
      // 把 静态 文件夹内的内容复制到 打包 文件夹下
      {
        from: path.resolve(__dirname, StaticPath),
        to: path.resolve(__dirname, BuildPath),
      },
    ]),
    // 解析 .vue 文件
    new VueLoaderPlugin(),
    // 使用 vue 的动态链接库
    new DllReferencePlugin({
      manifest: require(path.join(__dirname, DllPath, 'vue.manifest.json')),
    }),
  ],
}
