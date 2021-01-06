const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const Base = require('./webpack.config.js')
const Mode = 'development'
const Port = 3000
const Host = 'localhost'
const { StaticPath, DllPath } = require('./config')
const PublicPath = '/'

// 热更新
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
// 动态链接库
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
// 插入标签
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')

module.exports = merge(Base, {
  mode: Mode,
  //  入口文件
  entry: {
    index: [
      'webpack-dev-server/client?http://' + Host + ':' + Port,
      'webpack/hot/dev-server',
    ],
  },
  output: {
    publicPath: PublicPath,
  },
  devServer: {
    port: Port,
    // 自动打开
    open: true,
    // gzip 压缩
    compress: true,
    // 热更新
    hot: true,
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
  module: {
    rules: [
      // 处理 js 新语法
      {
        test: /\.(js|jsx)$/,
        // cacheDirectory：开启缓存
        use: 'babel-loader?cacheDirectory',
        // 明确范围
        exclude: path.resolve('node_modules'),
        include: path.resolve('src'),
      },
      {
        test: /\.(css|sass|scss)$/,
        // 注意 loader 加载顺序和书写顺序是相反的
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@import "@/styles/index.scss";',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: '\'' + PublicPath + '\'',
      process: {
        env: {
          NODE_ENV: '\'' + Mode + '\'',
          BASE_URL: '\'' + PublicPath + '\'',
          BASE_API: '\'/dev\'',
        },
      },
    }),
    // 热更新
    new HotModuleReplacementPlugin(),
    // 使用动态链接库
    new DllReferencePlugin({
      manifest: require(path.join(__dirname, StaticPath, DllPath, 'WebpackDll.manifest.json')),
    }),
    // 插入标签
    new HtmlWebpackTagsPlugin({
      tags: [
        path.join(DllPath, 'WebpackDll.dll.js'),
      ],
      append: false,
    }),
  ],
})
