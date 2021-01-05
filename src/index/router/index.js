import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/About',
    name: 'About',
    component: () => import('../views/About/index.vue'),
    meta: { title: '关于' }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router
