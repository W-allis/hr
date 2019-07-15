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
import { CompanyItem, SentimentItem } from './components'

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

  let queryModel = {
    pageNum: 1,
    pageSize: 15,
    company: getCompany() 
  }

  const sentimentList = [...Array(15).keys()].map(item => (
    { url: 'http://www.baidu.com', title: '这是一个用纯文纯文纯文本的简单卡片。但卡片可以包含自己的页头，页脚，列表视图，图像，和里面的任何元素', from: '腾讯新闻', date: '2019/05/09' }
  ))

  const mockItem = { url: 'http://www.baidu.com', title: '这是一个用纯文纯文纯文本的简单卡片。但卡片可以包含自己的页头，页脚，列表视图，图像，和里面的任何元素', from: '腾讯新闻', date: '2019/05/09' }

  function getSentimentList(queryModel) {
    $('.wxp-sentiment-list').html(SentimentItem({
      sentimentList: [...Array(queryModel.pageNum * queryModel.pageSize).keys()].map(item => mockItem)
    }))
  }

  // 预加载（滑动翻页）
  function preloadSentiment() {
    var timer = false
    return function() {

      // 如果正在加载，则退出
      clearTimeout(timer)
      // 设置flag
      // 模拟1s的加载过程
      timer = setTimeout(function() {
        // 加载完毕，则注销无限加载事件，以防不必要的加载
        // $.detachInfiniteScroll($('.infinite-scroll'))
        // // 删除加载提示符
        // $('.infinite-scroll-preloader').remove()
        // 添加新条目
        queryModel.pageNum++
        getSentimentList(queryModel)
        //容器发生改变,如果是js滚动，需要刷新滚动
        $.refreshScroller()
      }, 1000)
    }
  }

  // 页面初始化加载的数据
  $(document).on('pageInit', '#sentiment-list', function(e, pageId, $page) { 
    // 预加载条数
    getSentimentList(queryModel)

    // 注册'infinite'事件处理函数
    $($page).on('infinite', preloadSentiment())
  })

  // 下拉刷新
  $(document).on('refresh', '.pull-to-refresh-content',function(e) {
    // 模拟2s的加载过程
    setTimeout(function() {
      // 重置搜索条件
      queryModel = {
        pageNum: 1,
        pageSize: 15,
        company: getCompany()
      }
      getSentimentList(queryModel)

      // 加载完毕需要重置
      $.pullToRefreshDone('.pull-to-refresh-content')
    }, 2000)
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

