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
