// import $ from 'zepto'

import { setCompany } from '@/utils/company'
// 当前页面css
import '@/styles/index.scss'
import './style/index.less'

// 设置进入页面校验时候含有token
import '@/utils/permission'

// 引入backToTop
import '@/components/backToTop'

import placeholder2 from './assets/img/placeholder2.jpg'
$('.wxp-company-bg img').prop('src', placeholder2)
// 引入html模块
import { CompanyItem } from '@/components/sentiment'
import { getToken } from '@/utils/user'

// api
import { getCompanyList } from '@/api/sentiment'
import { Wx } from '@/utils'

// 公司模块
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
  let queryModel = {
    open_id: getToken()
  }
  // 页面初始化加载的数据
  $(document).on('pageInit', '#main', function(e, pageId, $page) { 

    getCompanyList(queryModel).subscribe(res => {
      if (res.resCode !== 0) {
        location.replace('./login.html')
      }
      $('.wxp-companylist').html(CompanyItem({
        companyList: res.data.map(item => {
          return { company_name: item.company_name, company_id: item.company_id, total: item.total, sentiment_list: item.sentiment_list.map(child => ({ title: child.title, source: child.source, score: child.score, date: Wx.parseTime(new Date(child.date), '{y}/{m}/{d}'), url: child.href })) }
        })
      }))
    })

    $('.wxp-companylist').on('click', '.card-header', function() {
      setCompany($(this).data('id'))
      // $.router.load('#sentiment-list')
      location.href = './sentiment.html'
    })
    $('.wxp-companylist').on('click', '.wxp-sentiment-item', function() {
      // $.router.load('#sentiment-list')
      location.href = $(this).data('url')
    })
  })
  // var data = [...Array(10).keys()].map(item => ({ company_name: '云南信托', sentiment_list: [...Array(3).keys()].map(item => ({ title: '这仅仅只是一条测试数据，仅供参考，如有雷同，那就雷同', source: '百度新闻', date: '2019-05-17', url: 'http://www.baidu.com' })) }))
  // $('.wxp-companylist').html(CompanyItem({
  //   companyList: data
  // }))
})

// 登录模块
$(function() {

  // 设置使用sui的初始化，写在最后面
  $.init()
})

