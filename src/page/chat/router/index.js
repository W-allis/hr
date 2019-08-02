import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/page/chat/views/layout/layout'

const _import = require('./_import.production')

Vue.use(VueRouter)


const routes = [
  { path: '/', redirect: '/degree' },
  { path: '/degree', component: Layout, children: [
    { path: '', component: _import('degree/index') }
  ] },
  { path: '/person', component: Layout, children: [
    { path: '', component: _import('person/index') }
  ] },
  { path: '/teach-in', component: Layout, children: [
    { path: '', component: _import('teach-in/index') }
  ] },
  { path: '/search', component: _import('search/index') }
]

export default new VueRouter({
  mode: 'hash',
  routes
})