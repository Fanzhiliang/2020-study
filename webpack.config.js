const path = require('path')
const { StaticPath, BuildPath, SrcPath } = require('./config')
const { getAdditionalData } = require('./webpack.utils')

// 生成html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 处理 vue
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const Base = {
  //  入口文件
  // entry: path.resolve(SrcPath, 'index.js'),
  entry: {
    // 此处写成数组为了和 webpack.dev.js 的热更新配置合并
    index: [
      path.resolve(SrcPath, 'index', 'main.ts'),
    ],
    resume: [
      path.resolve(SrcPath, 'resume', 'main.ts'),
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
    extensions: ['.js', '.jsx', '.vue', '.ts', '.d.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(SrcPath),
    },
  },
  module: {
    rules: [
      // 处理文件
      {
        test: /\.(svg|png|jpg|gif|jpeg|bmp|tiff|eot|woff|woff2|ttf)$/i,
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
      // 处理样式
      {
        test: /\.(css|sass|scss)$/,
        // 注意 loader 加载顺序和书写顺序是相反的
        use: [
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              // additionalData: '@import "@/styles/global.scss";',
              // 设置多入口文件自动加载
              additionalData: (content, loaderContext) => getAdditionalData(Base, content, loaderContext),
            },
          },
        ],
      },
      // 处理 .vue 文件
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              ts: 'ts-loader',
              tsx: 'babel-loader!ts-loader',
            },
          },
        },
        include: path.resolve('src'),
      },
      // 处理 ts 语法
      {
        test: /\.(ts|tsx)$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: { appendTsxSuffixTo: [/\.vue$/] },
          },
        ],
        // 明确范围
        exclude: path.resolve('node_modules'),
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
      filename: 'resume.html',
      title: '简历',
      // 只引用某些入口文件，这些入口的值要在 entry 设置
      chunks: ['resume'],
    }),
    // 解析 .vue 文件
    new VueLoaderPlugin(),
  ],
}

module.exports = Base
