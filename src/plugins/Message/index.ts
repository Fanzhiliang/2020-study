import Vue from 'vue'
import { MessageInterface, MessageInstance } from './types'
import { id } from './config'
import Message from './Message'

let $message: MessageInstance = null

// 初始化
const init = function() {
  const MessageContainer = document.createElement('div')

  MessageContainer.setAttribute('id', id)

  document.body.appendChild(MessageContainer)

  setTimeout(function() {
    $message = new Message()
  }, 0)
}

const message: MessageInterface = function(message = '') {
  if ($message) {
    $message.message = message

    $message.$nextTick(function() {
      $message.show()
    })
  }
}

export default {
  install: function(vue: typeof Vue) {
    vue.prototype.$message = message
  },
}

declare module 'vue/types/vue' {
  interface Vue {
    $message: MessageInterface
  }
}

init()
