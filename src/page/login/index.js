

import './style/index.less'

import '@/icon'

import '@/styles/index.scss'

import { setToken, getToken } from '@/utils/user'
import { unSerialization } from '@/utils/formatterParams'
import { getAppId } from '@/api/openid'
import { postLogin } from '@/api/sentiment'

import { AppId, RedirectUri } from '@/utils/json'

import bg from './assets/img/login_bg.png'

$('.wxp-login-bg img').prop('src', bg)

import logo from './assets/img/logo.png'

$('.wxp-logo img').prop('src', logo)

// 登录模块
$(function() {
  // https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx9ced274b8be31a53&secret=SECRET&code=001S1vcO1DV3Fa1oz2cO1w4tcO1S1vcd&grant_type=authorization_code
  const params = unSerialization(location.search.slice(1))
  let openId = null
  if (!(params.state && params.code)) {
    location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppId}&redirect_uri=${RedirectUri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
    return 
  }


  // 待跟新
  function validator() {
    var flag = false
    // const 
    const mobile = $('.wxp-mobile').val().trim()
    const password = $('.wxp-password').val()

    $('.wxp-mobile').off('input')

    $('.wxp-mobile').on('input', function() {
      $('.wxp-mobile-error').html('')
    })

    $('.wxp-password').off('input')

    $('.wxp-password').on('input', function() {
      $('.wxp-password-error').html('')
    })

    if (!mobile) {
      $('.wxp-mobile-error').html('手机号码不能为空')
      flag = true
    } else {
 
      if (!(/^1[3456789]\d{9}$/.test(mobile))) {
        $('.wxp-mobile-error').html('手机号码格式错误')
        flag = true
      }
    }

    if (!password) {
      $('.wxp-password-error').html('密码不能为空')
      flag = true
    }

    if (flag) {
      return
    }

    return {
      mobile,
      password
    }
  }

  $('.wxp-login-click').on('click', function() {
    const validas = validator()
    if (validas) {
      $.showPreloader('登陆中')

      // 点击登录再请求appid，避免因为错误导致失效
      getAppId({
        appid: AppId,
        code: params.code,
        grant_type: 'authorization_code',
        secret: '677a5e38cd975e714310ff0b295786ab'
      }).subscribe(res => {
        debugger
        if (res.errcode) {
          $.alert('code值过期，请重新登录', function() {
            // 重置获取code值
            location.replace('./login.html') 
          })
        }
        openId = res.openid    
        postLogin({
          phone_number: validas.mobile,
          password: validas.password,
          open_id: openId
        }).subscribe(res => {
          // if (res.resCode === 2) {
          //   alert('当前手机号不存在或密码错误')
          // }
          if (res.resCode === 0) {
            setToken(openId)
            location.replace('./index.html') 
          } else {
            $.alert(res.errorMsg, function() {
              // 重置获取code值
              location.replace('./login.html') 
            })
          }
          $.hidePreloader()
        }, error => {
          // 重置获取code值
          location.replace('./login.html') 
        })
      }, error => {
        debugger
        // 重置获取code值
        location.replace('./login.html') 
      })

      
    }
  })

  $('.wxp-show-password').click(function() {
    
    $('.wxp-password').prop('type', 'text')
    $('.wxp-show-password').toggleClass('hide')
    $('.wxp-hide-password').toggleClass('hide')
  })

  $('.wxp-hide-password').click(function() {
    
    $('.wxp-password').prop('type', 'password')
    $('.wxp-show-password').toggleClass('hide')
    $('.wxp-hide-password').toggleClass('hide')
  })
  // 设置使用sui的初始化，写在最后面
  $.init()
})