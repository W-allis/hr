import { getSentimentList, postReadId } from '@/api/sentiment'
import { Wx } from '../../utils'
import { getToken } from '@/utils/user'

import { getCompany } from '@/utils/company'

import { getReadId, setReadId, deleteReadId } from './utils'

// 当前页面css
import '@/styles/index.scss'
import './style/index.less'

// 设置进入页面校验时候含有token
import '@/utils/permission'

import { SentimentItem } from '@/components/sentiment'
$(function() {
  // var page = (function () {

  //   function SentimentPage() {
  //     this.init()
  //   }

  //   SentimentPage.prototype.init = function() {
      
  //   }

  //   new SentimentPage()

  // })()
})

// 列表模块
$(function() {
  let queryModel = {
    page_number: 1,
    page_size: 15,
    open_id: getToken(),
    company_id: getCompany() 
  }

  let sentimentList = []

  let resetPage = null

  // const sentimentList = [...Array(15).keys()].map(item => (
  //   { url: 'http://www.baidu.com', title: '这是一个用纯文纯文纯文本的简单卡片。但卡片可以包含自己的页头，页脚，列表视图，图像，和里面的任何元素', from: '腾讯新闻', date: '2019/05/09' }
  // ))

  const mockItem = { url: 'http://www.baidu.com', title: '这是一个用纯文纯文纯文本的简单卡片。但卡片可以包含自己的页头，页脚，列表视图，图像，和里面的任何元素', from: '腾讯新闻', date: '2019/05/09' }

  function handleGetSentimentList(queryModel, fn) {
    return getSentimentList(queryModel).subscribe({
      complete: fn,
      next: res => {
        
        if (res.resCode !== 0) {
          location.replace('./login.html')
          return
        }

        sentimentList = sentimentList.concat((res.data || []).map(item => ({ target_url: item.href, title: item.title, score: item.score, source: item.source, date: Wx.parseTime(new Date(item.date), '{y}/{m}/{d}'), read: item.have_read, id: item.id })))
        // console.log(sentimentList)
        if (sentimentList.length >= res.total) {
          // 加载完毕，则注销无限加载事件，以防不必要的加载
          $.detachInfiniteScroll($('.infinite-scroll'))
          // 删除加载提示符
          $('.infinite-scroll-preloader').remove()
        }
        $('.wxp-sentiment-list').html(SentimentItem({
          sentimentList
        }))
      },
      error: error => {
        
      }
    })
    
  }

  // 预加载（滑动翻页）
  function preloadSentiment() {
    var loading = false,
        timer
    return function() {
      // debounce去除同时加载多次事件
      clearTimeout(timer)
      // 如果正在加载，则退出
      if (loading) return
      // clearTimeout(timer)
      // 设置flag
      // 模拟1s的加载过程
      timer = setTimeout(function() {
        // 加载完毕，则注销无限加载事件，以防不必要的加载
        // $.detachInfiniteScroll($('.infinite-scroll'))
        // // 删除加载提示符
        // $('.infinite-scroll-preloader').remove()
        // 添加新条目
        loading = true
        queryModel.page_number++
        handleGetSentimentList(queryModel, function() {
          loading = false
        })
        //容器发生改变,如果是js滚动，需要刷新滚动
        $.refreshScroller()
      }, 500)
    }
  }

  // 页面初始化加载的数据
  $(document).on('pageInit', '#sentiment-list', function(e, pageId, $page) { 
    resetPage = $page
    sentimentList = []
    // 预加载条数
    handleGetSentimentList(queryModel)
    console.log($('page-current'))
    // 注册'infinite'事件处理函数
    $($page).on('infinite', preloadSentiment())

    $($page).on('scroll', function() {
      console.log(123)
    })
  })

  // 下拉刷新
  $(document).on('refresh', '.pull-to-refresh-content', function(e) {
    // 模拟2s的加载过程
    setTimeout(function() {
      // 重置搜索条件
      queryModel = {
        page_number: 1,
        page_size: 15,
        open_id: getToken(),
        company_id: getCompany()
        // company_name: "博信股份"
      }
      sentimentList = [] 
      handleGetSentimentList(queryModel)

      // console.log()
      if (resetPage) {
        // 下拉重置下拉加载
        $(resetPage).off('infinite')
        $(resetPage).on('infinite', preloadSentiment())
      }

      // 加载完毕需要重置
      $.pullToRefreshDone('.pull-to-refresh-content')
    }, 500)
  })

  // 注册跳转+已读事件
  $('.wxp-sentiment-list').on('click', '.wxp-sentiment-item', function() {
    
    postReadId({
      open_id: getToken(),
      article_id_list: [$(this).data('id'), '']
      }).subscribe(res => {})
    // location.href = $(this).data('url')
  })
})

// 登录模块
$(function() {

  // 设置使用sui的初始化，写在最后面
  $.init()
})

