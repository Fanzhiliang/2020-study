const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const Base = require('./webpack.config.js')
const { unshiftModuleRuleStyleLoader } = require('./webpack.utils')
const Mode = 'production'
const { StaticPath, BuildPath, DllPath } = require('./config')
const PublicPath = './'

// 将css打包成.css文件，而不是放在style标签内
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css代码
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 使用上面的插件后，js代码就不压缩了，要用这插件
const TerserWebpackPlugin = require('terser-webpack-plugin')
// 开启多进程打包
const Happypack = require('happypack')
//  开启多进程压缩 js 代码
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
// 打包时复制文件到打包目录
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 打包时清除不需要的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 开启 Scope Hosting
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
// 插入标签
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')

module.exports = merge(Base, {
  mode: Mode,
  output: {
    publicPath: PublicPath,
  },
  module: {
    rules: [
      // 处理 js 新语法
      {
        test: /\.(js|jsx)$/,
        // 使用 Happypack 开启多进程打包
        use: 'Happypack/loader?id=babel',
        // 明确范围
        exclude: path.resolve('node_modules'),
        include: path.resolve('src'),
      },
      // 处理样式 将样式写入 css 文件
      unshiftModuleRuleStyleLoader({
        config: Base,
        test: /\.(css|sass|scss)$/,
        loader: {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // 根据抽离出来的css文件路径来设置
            publicPath: '../../',
          },
        },
      }),
    ],
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
          minChunks: 1,
        },
        // 公共模块
        common: {
          name: 'common',
          priority: 1,
          minSize: 0,
          minChunks: 2,
        },
      },
    },
  },
  resolve: {
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向 ES6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main'],
  },
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
  },
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: '\'' + PublicPath + '\'',
      process: {
        env: {
          NODE_ENV: '\'' + Mode + '\'',
          BASE_URL: '\'' + PublicPath + '\'',
          BASE_API: '\'/prod\'',
          RESUME_BASE_API: '\'http://mock.alcyh.com/mock/5ffc04cfab3f3634c357d8e7/resume\'',
        },
      },
    }),
    // 抽离css
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
    }),
    // 开启多进程打包
    new Happypack({
      id: 'babel',
      use: [
        {
          // cacheDirectory：开启缓存
          loader: 'babel-loader?cacheDirectory',
        },
      ],
    }),
    // 开启多进程压缩 js 代码
    new WebpackParallelUglifyPlugin({
      test: /.js$/g,
      include: [],
      exclude: [],
      cacheDir: '',
      workerCount: '',
      sourceMap: false,
      uglifyJS: {
        output: {
          /*
           是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
           可以设置为false
          */
          beautify: false,
          /*
           是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
          */
          comments: false,
        },
        /*
          是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用
          不大的警告
        */
        warnings: false,
        compress: {
          /*
           是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
          */
          drop_console: true,
          /*
           是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不
           转换，为了达到更好的压缩效果，可以设置为false
          */
          collapse_vars: true,
          /*
           是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
           var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
          */
          reduce_vars: true,
        },
      },
    }),
    new CopyWebpackPlugin([
      // 把 静态 文件夹内的内容复制到 打包 文件夹下
      {
        from: path.resolve(__dirname, StaticPath),
        to: path.resolve(__dirname, BuildPath),
      },
    ]),
    // 打包时清除不需要的文件
    new CleanWebpackPlugin({
      // 打包时不把 dll 文件打包进来
      cleanAfterEveryBuildPatterns: [DllPath],
    }),
    // 开启 Scope Hosting
    new ModuleConcatenationPlugin(),
    // 插入标签
    new HtmlWebpackTagsPlugin({
      tags: [
        'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js',
        'https://cdn.jsdelivr.net/npm/vue-router@3.4.9/dist/vue-router.min.js',
        'https://cdn.jsdelivr.net/npm/vuex@3.6.0/dist/vuex.min.js',
        'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
      ],
      append: false,
      publicPath: '',
    }),
  ],
})
