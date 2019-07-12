// import $ from 'zepto'

import { setToken } from './utils/user'
import { setCompany, getCompany } from './utils/company'
// 当前页面css
import '@/styles/normal.scss'
import './style/index.less'

// 设置进入页面校验时候含有token
import './permission'

// 图片
import yntrust from './assets/img/yntrust.png'
import albb from './assets/img/albb.png'
import bdjt from './assets/img/bdjt.png'
import flash from './assets/img/flash.png'
import gdzc from './assets/img/gdzc.png'
import jdjr from './assets/img/jdjr.png'
import shsm from './assets/img/shsm.png'
import snyg from './assets/img/snyg.png'
import tx from './assets/img/tx.png'
import xckg from './assets/img/xckg.png'

import placeholder from './assets/img/placeholder.jpg'
import placeholder1 from './assets/img/placeholder1.jpg'
import placeholder2 from './assets/img/placeholder2.jpg'
$('.swiper-lazy').prop('src', placeholder2)
// 引入html模块
import { CompanyItem } from './components'

// 公司模块
console.dir($)
$(function() {
  // new $.Swiper('.swiper-container', {
  //   preloadImages: false,
  //   // Enable lazy loading
  //   lazy: true,
  //   pagination: {
  //     el: '.swiper-pagination',
  //     type : 'progressbar',
  //     progressbarOpposite: true,
  //   }
  //   // pagination: {
  //   //   // el: '.swiper-pagination',
  //   // }
  // })

  $('.wxp-companylist .row').html(CompanyItem({
    companyList: [
      { url: yntrust, name: '云南信托' },
      { url: albb, name: '阿里巴巴' },
      { url: jdjr, name: '京东金融' },
      { url: bdjt, name: '百度集团' },
      { url: tx, name: '腾讯微众' },
      { url: flash, name: '北京闪银' },
      { url: gdzc, name: '广东中诚' },
      { url: xckg, name: '新城控股' },
      { url: snyg, name: '苏宁易购' },
      { url: shsm, name: '上海世茂' }
    ]
  }))

  $('.wxp-company-item').click(function() {
    setCompany($(this).data('company'))
    $.router.load('#sentiment-list')
  })
})
// 列表模块
$(function() {
  $(document).on('pageInit', '#sentiment-list', function(e, pageId, $page) {
    
    getCompany()
  })
})

// 登录模块
$(function() {
  
  $('.wxp-login-btn').click(function() {
    setToken('12345')
    $.router.load('#company')
  })

  // 设置使用sui的初始化，写在最后面
  $.init()
})

