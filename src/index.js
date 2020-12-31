// 导入样式
import './style/reset.css'
import './style/index.scss'

// 导入模块
import { Compute } from '@/utils'

console.log(Compute)

console.log(Compute.add(0.1, 0.2))

// 处理图片
import img3 from './assets/img-3.jpg'

const img = new Image()
img.width = 100
document.body.appendChild(img)
img.src = img3

const div = document.createElement('div')

div.classList.add('bg')

document.body.appendChild(div)

// 环境变量
console.log('环境变量：')
console.log(NODE_ENV)
console.log(BASE_API)
