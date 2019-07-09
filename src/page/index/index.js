// import $ from 'zepto'

import { setToken } from './utils/user'
// 当前页面css
import '@/styles/normal.scss'
import './style/user.less'

// 设置进入页面校验时候含有token
import './permission'

// import { getCompanyList } from '@/api/sentiment'
import { eventBus } from './utils/index'

// import '@/utils/Observable'

eventBus.$on('update:value', function(value) {
  // console.log(value)
})

eventBus.$emit('update:value', '1234')

// getCompanyList().subscribe(res => {
//   // console.log(res)
// })
console.dir($)
$(function() {
  
  $('.wxp-login-btn').click(function() {
    setToken('12345')
    $.router.load('#sentiment-list')
  })

  // 设置使用sui的初始化，写在最后面
  $.init()
})
