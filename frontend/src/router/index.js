import Vue from 'vue'
import VueRouter from 'vue-router'

import Start from '@/views/Start'
import Todo from '@/views/Todo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Start,
  },
  {
    path: '/list',
    component: Todo,
  },
]
console.log('router')
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
