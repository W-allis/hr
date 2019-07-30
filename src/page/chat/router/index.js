import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/page/chat/views/Layout/layout'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Layout }
]

export default new VueRouter({
  mode: 'hash',
  routes
})