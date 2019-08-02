import Vue from 'vue'

import 'cube-ui/lib/cube.min.css'
import Cube from 'cube-ui'

Vue.use(Cube)

import './components'

import router from './router'

import App from './home/app'
import '@/styles/normal.scss'
import './style/chat.sass'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})