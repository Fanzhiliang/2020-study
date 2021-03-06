## 2020年学习 Webpack5 笔记

### 1 初始化一个webpack项目

```
// 必须先全局安装
npm install -g webpack
npm install -g webpack-cli

// 项目下安装
npm init
npm install --save-dev webpack

// 打包
webpack
```

### 2 webpack打包

[视频 55:00 左右](https://www.bilibili.com/video/BV1a741197Hn?from=search&seid=9663403959295893105)

根据import引入等关键字，将依赖文件打包成一个文件。

#### 2.1 输出文件

输出文件的大体结构

```
(function(module) {
  var installedModules = {};
  function __webpack_require__(moduleId){
    // SOME CODE
  }
  // 。。。
  return __webpack_require__(0); // entry file
})([ /* modules array */])
```

上述结构中的核心方法：

```
function __webpack_require__(moduleId){
  // check if module is in cache
  if(installedModules[moduleId]){
    return installedModules[moduleId].exports;
  }
  // create a new module (and put into cache)
  var module = installedModules[moduleId] = {
    i: moduleId,
      l: false,
      exports: {}
  };
  // exe the module func
  modules[moduleId].call{
    module.exports,
      module,
      module.exports,
      __webpack_require__
  };
  // flag the module as loaded
  module.l = true;
  // return the exxports of the module
  return module.exports;
}
```

#### 2.2 webpack打包过程
1. 从入口文件开始，分析整个应用的依赖树
2. 将每个依赖模块包装起来，放到一个数组中等待调用
3. 实现模块加载的方法，并把它放到模块执行的环境中，确保模块间可以互相调用
4. 把执行入口文件的逻辑放在一个函数表达式中，并立即执行这个函数

### 3 实战

[视频 86:00 左右](https://www.bilibili.com/video/BV1a741197Hn?from=search&seid=9663403959295893105)

#### 3.1 语义化版本

1. ^version：中版本和小版本

    ^1.0.1 -> 1.x.x

2. ~version：小版本

    ^1.0.1 -> 1.0.x

3. version：特定版本

#### 3.2 初始化开发环境

1. webpack-dev-server
```
// 安装
npm install webpack-dev-server --save-dev

// 运行
webpack-dev-server
```

2. 遇到的问题：Error: Cannot find module 'webpack-cli/bin/config-yargs'
```
// 安装旧版本的 webpack-cli
npm install webpack-cli@3 --save-dev
```

#### 3.3 处理css

```
// 安装 样式 loader
npm install --save-dev css-loader style-loader
// 安装 样式预处理 loader
npm install --save-dev postcss-loader autoprefixer@7
// 处理 scss
npm install --save-dev sass-loader node-sass

// webpack-config.js 配置
devServer: {
  // 此路径下的打包文件可在浏览器中访问
  publicPath: '/dist'
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
    }
  ]
}

// 项目根目录新建 postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

1. 注意 loader 的顺序

2. devServer 不设置 publicPath 开发运行时会访问项目根目录

3. 抽离 css 单独文件

```
// 安装相关插件
npm install --save-dev mini-css-extract-plugin optimize-css-assets-webpack-plugin terser-webpack-plugin

// webpack.config.js
// 最好只在生产环境下配置

//将css打包成.css文件，而不是放在style标签内
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//压缩css代码
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//使用上面的插件后，js代码就不压缩了，要用这插件
const TerserWebpackPlugin = require("terser-webpack-plugin");

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
  // 抽离css
  new MiniCssExtractPlugin({
    filename: 'static/css/main.[contenthash].css'
  })
]

```

#### 3.4 处理图片

```
// 安装 loader
npm install --save-dev file-loader url-loader

// webpack-config.js 配置
module: {
  rules: [
    //处理文件
    {
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            outputPath: "static/img/",
            limit: 200 * 1024 //小于200kb用base64解析
          }
        }
      ]
    }
  ]
}
```

#### 3.5 处理html

```
// 安装 plugin
npm install --save-dev html-webpack-plugin copy-webpack-plugin@5 html-withimg-loader

// 将静态文件都放到public文件夹下

// webpack-config.js 配置
// 打包路径
output: {
  filename: 'static/js/main.js'
},
devServer: {
  contentBase: path.join(__dirname, "public")
},
module: {
  rules: [
    //处理在html中图片文件路径
    {
      test: /\.html$/,
      use: "html-withimg-loader"
    }
  ]
},
plugins: {
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
  ])
}
```

1. 如果 html-withimg-loader 无效，可以试着将 file-loader 或者 url-loader 的 options.esModule 设为false
2. 如果要在 HtmlWebpackPlugin 设置 title 需要在 html 添加 <title><%= htmlWebpackPlugin.options.title %></title> 替换，并且会和 html-withimg-loader 冲突无效

#### 3.6 环境变量

```
npm install --save-dev webpack-merge

// 项目根目录新建 webpack.dev.js 和 webpack.prod.js
// 开发环境：development、生成环境：production
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

// package.json
{
  "scripts": {
    "dev": "webpack-dev-server --config webpack.dev.js",
    "dev:prod": "webpack-dev-server --config webpack.prod.js",
    "build": "webpack --config webpack.prod.js"
  }
}
```

#### 3.7 babel 处理新语法

安装 babel-loader 处理 es6 等新语法

```
// 安装
npm install --save-dev  babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env

// webpack.config.js
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      use: 'babel-loader',
      exclude: path.resolve('node_modules'),
      include: path.resolve('src')
    },
  ]
}

// 根目录下新建 .babelrc
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": []
}
```

#### 3.8 设置别名

```
// 方便模块的应用
resolve: {
  alias: {
    '@': path.resolve(SrcPath)
  }
},
```

#### 3.9 多入口文件

```
// webpack.config.js

//  入口文件
entry: {
  index: path.resolve(SrcPath, 'index.js'),
  resume: path.resolve(SrcPath, 'resume.js'),
},
// 打包路径
output: {
  // [name]：多入口文件名
  // [contenthash]：hash值
  filename: 'static/js/[name].[contenthash].js'
},

plugins: [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, StaticPath, 'index.html'),
    filename: 'index.html',
    // 只引用某些入口文件，这些入口的值要在 entry 设置
    chunks: ['index']
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, StaticPath, 'index.html'),
    filename: 'resume.html',
    // 只引用某些入口文件，这些入口的值要在 entry 设置
    chunks: ['resume']
  }),
]
```

1. 注意 HtmlWebpackPlugin 的 chunks 数组要设置 entry 有的值

#### 3.10 抽离第三方模块和公共代码

```
// webpack.prod.js 最好只配置生产环境
optimization: {
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
}
```

1. chunks 名称可以用于 HtmlWebpackPlugin 的 chunks 配置哪个入口文件用哪部分的代码，但是一般会智能地帮你设置好。

#### 3.11 处理 vue 和 jsx

```
// 处理 .vue 文件
npm install --save-dev vue-loader vue-template-compiler

// vue 中使用 jsx
npm install --save-dev babel-plugin-transform-vue-jsx

// webpack.config.js
// 处理 vue
const VueLoaderPlugin = require('vue-loader/lib/plugin')

plugins: [
  new VueLoaderPlugin()
]
```

#### 3.12 module chunk 和 bundle 的区别

1. module - 各个源码文件、图片、样式，在 webpack 中都是模块
2. chunk - 代码块，entry 入口文件设置、import 异步加载、splitChunks 分割代码块
3. bundle - 最终输出的文件

### 4 webpack 性能优化

#### 4.1 优化 babel-loader

```
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      // cacheDirectory：开启缓存
      use: 'babel-loader?cacheDirectory',
      // 明确范围
      exclude: path.resolve('node_modules'),
      include: path.resolve('src')
    }
  ]
}
```

#### 4.2 多进程打包

1. JS 是单线程的，可以开启多进程打包（区分好线程和进程）
2. 项目较大，打包慢，启动多进程能提高打包速度
3. 项目较小，打包块，启动多进程反而会影响打包速度，因为开启进程也是需要时间的
4. 按需使用

```
// 安装
npm install --save-dev happyPack webpack-parallel-uglify-plugin
// webpack.prod.js
// 开启多进程打包
const Happypack = require('happypack')
//  开启多进程压缩 js 代码
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')


module: {
  rules: [
    // 处理 js 新语法
    {
      test: /\.(js|jsx)$/,
      // 使用 Happypack 开启多进程打包
      use: 'Happypack/loader?id=babel',
    },
  ]
},
plugins: [
  // 开启多进程打包
  new Happypack({
    id: 'babel',
    use: [
      {
        // cacheDirectory：开启缓存
        loader: 'babel-loader?cacheDirectory'
      }
    ]
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
        comments: false
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
        reduce_vars: true
      }
    }
  }),
]
```

#### 4.3 热更新

```
// 热更新
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')

// webpack.dev.js
//  入口文件
entry: {
  index: [
    // http://localhost:3000/
    'webpack-dev-server/client?http://'+ Host + ':' + Port,
    'webpack/hot/dev-server',
    path.resolve(SrcPath, 'index.js')
  ],
},
devServer: {
  hot: true
},
plugins: [
  // 热更新
  new HotModuleReplacementPlugin()
]
```

#### 4.4 DllPlugin 动态链接库插件

1. 前端框架如 Vue、React，体积较大，构建慢
2. 版本稳定，不常更新
3. 同一个版本构建一次即可，不用每次都重复构建

```
// config.js
// 动态链接库生产目录
const DllPath = StaticPath + '/static/dll'

// webpack.dll.js
const path = require('path')
const { DllPath } = require('./config')
const Mode = 'development'

const DllPlugin = require('webpack/lib/DllPlugin')

module.exports = {
  mode: Mode,
  // 入口文件
  entry: {
    // 把相关模块放进一个单独的动态链接库
    vue: ['vue']
  },
  output: {
    // 输出的动态链接库文件名称，也就是 entry 中设置的属性名
    filename: '[name].dll.js',
    // 输出的文件目录
    path: path.join(__dirname, DllPath),
    // 存放动态链接库的全局变量名称，加上_dll_ 是为了防止全局变量冲突
    library: '_dll_[name]'
  },
  plugins: [
    new DllPlugin({
      // 动态链接库的全局变量名称，和 output.library 保持一致
      name: '_dll_[name]',
      // 描述动态链接库的描述文件
      path: path.resolve(DllPath, '[name].manifest.json')
    })
  ]
}

// package.json
"scripts": {
  "dll": "webpack --config webpack.dll.js"
}

// 运行命令生产动态链接库
npm run dll

// webpack.config.js
const { DllPath } = require('./config')
// 动态链接库
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')

plugins: {
  // 使用 vue 的动态链接库
  new DllReferencePlugin({
    manifest: require(path.join(__dirname, DllPath, 'vue.manifest.json'))
  })
}
```

#### 4.5 Tree-Shaking

1. 生产环境没使用的代码不会打包
2. 开发环境没使用的代码也会构建

#### 4.6 ES6 Module 和 Commonjs 的区别

1. ES6 Module 静态引用，编译时引用
2. Commonjs 动态引用，执行时引用
3. 只有 ES6 Module 才能静态分析，实现 Tree-Shaking

```
// ES6 Module 静态引入
import api from 'api.js'

if (isOk) {
  // 编译时报错，只能静态引入
  import util from 'util.js'
}


// Commonjs 动态引入
const api = require('api.js)
if (isOk) {
  // 编译不报错，可以动态引入
  const util = require('util.js')
}
```

#### 4.7 Scope Hosting

1. 源代码

![源代码](./J(Y}{N@EX@{A]JOEZD)[$DL.png)

2. 默认打包结果

![默认打包结果](./BXE2PJ8Y7MJQB~X16BV$HPY.png)

3. 开启 Scope Hosting

```
// webpack.prod.js
// 开启 Scope Hosting
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')

resolve: {
  // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向 ES6 模块化语法的文件
  mainFields: ['jsnext:main', 'browser', 'main']
},
plugins: [
  // 开启 Scope Hosting
  new ModuleConcatenationPlugin()
]
```

![开启 Scope Hosting](./M6A541X.png)

#### 4.8 babel 详解

1. presets - 集成了多个 plugin
2. @babel/preset-env - 集成了ES6、ES7等语法
3. babel-polyfill - 一些低版本的浏览器不兼容新的函数，需要手动实现
4. core-js - 标准的 babel-polyfill
5. regenerator - 补充 core-js
6. 7.4.0 及以上 @babel/preset-env 直接包含 core-js 和 regenerator，babel-polyfill 已经被弃用了，[详情](https://blog.csdn.net/qq_29722281/article/details/101444335)
7. 按需引入

```
// 安装
npm install core-js regenerator-runtime

// .babelrc

/**
* useBuiltIns：引入方式
* false: 相当于没用，这时就得手动引入所有的 polyfill
* entry: 也需要手动引入 polyfill，即 import ‘@babel/polyfill’;，同时也引入了所有的 polyfill。这个配置项，总觉得没什么用，如果有老哥知道的话可以在评论区提出一起讨论。
* usage: 无需引入 polyfill，babel 会自动按需加载需要的功能
*/

{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}

```

8. babel-polyfill 有一个问题就是会污染全局变量，这在写第三方库的时候很不友好，需要用到 babel-runtime 来解决

```
// 安装
npm install --save-dev @babel/plugin-transform-runtime

/**
* corejs
* false: npm install --save @babel/runtime
* 2: npm install --save @babel/runtime-corejs2
* 3: npm install --save @babel/runtime-corejs3
*/

// 注意环境
// 这里安装的是 corejs 3 ，要根据 .babelrc 的设置来安装
npm install --save @babel/runtime-corejs3

// .babelrc
{
  "plugins": [
    "transform-vue-jsx",
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

### 5 Vue 实战

#### 5.1 Eslint

```
// 安装 babel-eslint 用来处理 jsx 语法
npm install --save-dev eslint babel-eslint
eslint --init

// 配置查看本项目的 .eslintrc.js 文件
```

#### 5.2 Vue-Router

[官网](https://router.vuejs.org/zh/guide/)

#### 5.3 Vuex

[官网](https://vuex.vuejs.org/zh/guide/)

#### 5.4 sass-loader 全局变量

```
module: {
  rules: [
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
            additionalData: '@import "@/styles/index.scss";'
          }
        },
      ],
    },
  ],
},
```

1. 注意 sass-loader 的版本 [参考](https://www.weixiuzhan.cn/news/show-27778.html)

```
sass-loader v8-，这个选项名是 "data"

sass-loader v8 中，这个选项名是 "prependData"

sass-loader v10+，这个选项名是 "additionalData"
```

2. 配置导入的全局文件，把别处的引入删掉，不然可能报错

#### 5.5 sass-loader 多入口全局变量

1. config.js 添加常量、添加 webpack.utils.js 工具文件

```
/**
* config.js
*/
// 全局样式文件路径，多入口下也要这样添加全局样式
const GlobalScssPath = 'styles/global.scss'


/**
* webpack.utils.js
*/
// 给 webpack 配置的某个规则添加新的 loader
function unshiftModuleRuleStyleLoader({
  // webpack 配置
  config,
  // 规则的 test
  test,
  // 新的 loader
  loader,
  // 添加返回后是否把基本配置的这个规则删除
  afterDelete,
}) {
  if (!config || !loader || !test) {
    return {}
  }
  // 设备默认值
  if (typeof afterDelete !== 'boolean') {
    afterDelete = true
  }
  let newRule = {}
  for (const i in config.module.rules) {
    const item = config.module.rules[i]
    if (test.source === item.test.source) {
      // 添加 loader
      item.use.unshift(loader)
      // 保存新规则
      newRule = item
      if (afterDelete) {
        // 把旧规则从基本配置中删去
        config.module.rules.splice(i, 1)
      }
      break
    }
  }
  return newRule
}

// 根据传入的 webpack.entry 配置 sass-loader additionalData
function getAdditionalData(config, content, loaderContext) {
  const path = require('path')
  const fs = require('fs')
  const { SrcPath, GlobalScssPath } = require('./config')

  // 读取文件的路径
  const { resourcePath, rootContext } = loaderContext
  // 获取相对路径
  const relativePath = path.relative(rootContext, resourcePath)
  // 是否是多入口内的文件
  let isEntry = false
  // 全局样式是否存在
  let isExist = false
  // 多入口名称
  let entryName = ''

  // 判断是否多入口文件，如果是保存多入口名称
  if (config.entry && typeof config.entry === 'object') {
    const entryNames = Object.keys(config.entry)
    for (const i in entryNames) {
      entryName = entryNames[i]
      // 获取多入口文件相对路径
      const entryPath = path.join(SrcPath, entryName)
      // 判断是否是多入口文件下的样式有关文件，并且如果是要导入的样式文件就不设置全局样式避免套娃报错
      isEntry = relativePath.startsWith(entryPath) && !relativePath.endsWith('.module.scss')
      isEntry && (isExist = fs.existsSync(path.join(__dirname, entryPath, GlobalScssPath)))
      if (isEntry) break
    }
  }

  return `
    @import "${`@/${GlobalScssPath}`}";
    ${isEntry && isExist ? `@import "@/${entryName}/${GlobalScssPath}";` : ''}
    ${content}
  `
}

module.exports = {
  unshiftModuleRuleStyleLoader,
  getAdditionalData,
}
```

2. 修改 webpack.config.js

```
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
```

3. 修改 webpack.dev.js

```
// 处理样式 将样式写入 style 标签
unshiftModuleRuleStyleLoader({
  config: Base,
  test: /\.(css|sass|scss)$/,
  loader: 'style-loader',
}),
```

4. 修改 webpack.prod.js

```
module: {
  rules: [
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
  ]
},
plugins: [
  // 抽离css
  new MiniCssExtractPlugin({
    filename: 'static/css/[name].[contenthash].css',
  }),
]
```

5. 目录结构，如果要修改就改 config.js 里面的常量地址就好

![目录结构](./entry.png)

#### 5.6 typescript [参考](https://www.jianshu.com/p/39261c02c6db)

1. 安装

```
// 安装
npm install --save vue-class-component vue-property-decorator vuex-module-decorators

// 卸载 eslint 并 删除 .eslintrc.js
npm install -g eslint
npm install --save-dev eslint

// 重新初始选择 typescript
eslint --init

// 安装各种插件
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/experimental-utils @typescript-eslint/parser @typescript-eslint/typescript-estree eslint eslint-config-standard eslint-plugin-standard eslint-plugin-import eslint-plugin-promise eslint-loader eslint-plugin-node eslint-plugin-vue typescript ts-loader
```

2. .eslintrc.js

```
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/essential',
    'standard',
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'comma-dangle': [1, 'always-multiline'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
  },
}

```

3. tsconfig.json

```
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "suppressImplicitAnyIndexErrors": true,
    "resolveJsonModule": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
  ],
  "exclude": [
    "node_modules"
  ]
}
```

4. webpack.config.js

```
resolve: {
  extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx', '.json'],
},
module: {
  rules: [
    // 处理 ts 语法
    {
      test: /\.(ts|tsx)$/,
      use: {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
          happyPackMode: false,
        },
      },
      // 明确范围
      exclude: path.resolve('node_modules'),
      include: path.resolve('src'),
    },
  ]
}
```

5. webpack.dev.js

```
module: {
  rules: [
    {
      test: /\.(js|vue|ts|tsx|jsx)$/,
      use: {
        loader: 'eslint-loader',
        options: {
          fix: false,
          extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx'],
          cache: false,
          emitWarning: true,
          emitError: false,
        },
      },
      enforce: 'pre',
      exclude: path.resolve('node_modules'),
    },
  ]
}
```

#### 5.7 render 内使用 jsx

上面一顿操作后发现在 render 里面不能使用 jsx，需要再修改设置

1. webpack.config.js

```
module: {
  rules: [
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
    },
  ]
}
```

2. tsconfig.json

```
{
  "compilerOptions": {
    // 删除下面的严格模式
    // "strict": true,
    "jsx": "preserve",
  },
  "include": [
    "src/**/*.d.ts"
  ]
}
```

3. src 下添加 typed-css.d.ts 解决 vue 文件导入样式文件报错的问题 [参考](https://blog.csdn.net/qq_41804324/article/details/109388570)

```
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}
```

4. src 下添加 shims-tsx.d.ts 解决 jsx 报错的问题 (这个好像不设置也可以)

```
// eslint-disable-next-line no-unused-vars
import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode
    // tslint:disable no-empty-interface
    type ElementClass = Vue
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
```

5. jsx 使用 v-show v-model 指令 [参考](https://github.com/vuejs/babel-plugin-transform-vue-jsx)

```
npm install --save-dev @vue/babel-plugin-jsx babel-helper-vue-jsx-merge-props babel-plugin-transform-vue-jsx babel-preset-env babel-plugin-jsx-v-model

// 如果是 babel 7 的话 babel-plugin-transform-vue-jsx 要安装 4.X 的版本
npm install --save-dev babel-plugin-transform-vue-jsx@4

// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  "plugins": [
    "jsx-v-model",
    "transform-vue-jsx",
    "@vue/babel-plugin-jsx",
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

#### 5.8 定义全局变量

突然发现不能像 vue-cli 一样定义全局变量，报已经定义过的错误，需要添加 tsconfig.json 的设置

1. tsconfig.json

```
{
  "compilerOptions": {
    "skipLibCheck": true,
    "noImplicitThis": true,
  }
}
```

2. 使用

```
// 定义全局变量 window
declare const global: {
  something(): any
}
```





