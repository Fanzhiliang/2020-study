// 导入样式
import './style/reset.css'
import './style/index.scss'

// 导入模块
import { moduleLog } from './moduleLog'

console.log(moduleLog())

document.write(moduleLog())

import img3 from './assets/img-3.jpg'

const img = new Image()
img.width = 100
document.body.appendChild(img)
img.src = img3