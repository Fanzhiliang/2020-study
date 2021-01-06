const path = require('path')
const { StaticPath, DllPath } = require('./config')
const Mode = 'production'

const DllPlugin = require('webpack/lib/DllPlugin')

module.exports = {
  mode: Mode,
  // 入口文件
  entry: {
    // 把相关模块放进一个单独的动态链接库
    WebpackDll: ['vue', 'vue-router', 'vuex'],
  },
  output: {
    // 输出的动态链接库文件名称，也就是 entry 中设置的属性名
    filename: '[name].dll.js',
    // 输出的文件目录
    path: path.join(__dirname, StaticPath, DllPath),
    // 存放动态链接库的全局变量名称，加上_dll_ 是为了防止全局变量冲突
    library: '_dll_[name]',
  },
  plugins: [
    new DllPlugin({
      // 动态链接库的全局变量名称，和 output.library 保持一致
      name: '_dll_[name]',
      // 描述动态链接库的描述文件
      path: path.resolve(StaticPath, DllPath, '[name].manifest.json'),
    }),
  ],
}
