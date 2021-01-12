import Vue from 'vue'
import App from './App.vue'
import Message from '@/plugins/Message/index'

Vue.use(Message)

new Vue({
  render: h => h(App),
}).$mount('#app')
