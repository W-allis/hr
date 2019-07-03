import Vue from 'vue'

import App from './home/app'
import '@/styles/normal.scss'
import './style/chat.sass'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})