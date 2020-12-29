// 导入样式
import './style/reset.css'
import './style/index.scss'

// 导入模块
import { moduleLog } from './moduleLog'

console.log(moduleLog())

document.write(moduleLog())


// 处理图片
import img3 from './assets/img-3.jpg'

const img = new Image()
img.width = 100
document.body.appendChild(img)
img.src = img3

// 环境变量
console.log('环境变量：')
console.log(NODE_ENV)
// console.log(BASE_API)