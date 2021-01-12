import { Vue, Component } from 'vue-property-decorator'
import { CreateElement } from 'vue/types'
import { id } from './config'
import { MessageInstance } from './types'
import './style.scss'

@Component({
  name: 'Message',
  el: '#' + id,
})
export default class Message extends Vue implements MessageInstance {
  render(h: CreateElement) {
    return h('div', {
      class: {
        '_message-container': true,
        show: this.isShow,
      },
    }, [
      h('span', this.message),
    ])
  }

  message = '&nbsp;'

  isShow = false

  duration = 3000

  timer:any = null

  show() {
    if (this.isShow) {
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
      }, 100)
    } else {
      this.isShow = true
    }

    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.isShow = false
    }, this.duration)
  }
}
