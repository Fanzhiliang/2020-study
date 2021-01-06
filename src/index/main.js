// 导入样式
import '@/styles/reset.css'
import './styles/index.scss'

// 导入模块
import { Compute } from '@/utils'

console.log(Compute)

console.log(Compute.add(0.1, 0.2))

// 导入第三方模块
import _ from 'lodash'

console.log(_.add(0.1, 0.2))

// 处理图片
import img3 from '@/assets/img-3.jpg'

const img = new Image()
img.width = 100
document.body.appendChild(img)
img.src = img3

const div = document.createElement('div')

div.classList.add('bg')

document.body.appendChild(div)

// 环境变量
console.log('环境变量：')
console.log(process.env)

// 异步加载js

setTimeout(() => {
  import(/* webpackChunkName: "asyncPlugin" */ '@/plugins/async-plugin.js').then(res => {
    console.log(res.default.message)
  })

  // require.ensure([], function() {
  //   const res = require('./plugins/async-plugin.js')
  //   console.log(res.default.message)
  // })
}, 1500)

// 处理vue
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

new Vue({
  router,
  store,
  render() {
    const title = <h2>Webpack Vue 实例测试</h2>

    return <div>
      { title }
      <App />
      <div class='block-20' />
    </div>
  },
}).$mount('#app')
