import { getToken } from '@/utils/user'
import { AppId, RedirectUri } from '@/utils/json'

const whiteList = ['login']

// $(document).on('pageInit', function(e, pageId, $page) {
//   if (!whiteList.includes(pageId)) {
//     if (!getToken()) {
//       // $.router.load('#login', true)
//       location.replace('./login.html')
//       // location.replace('#login')
//     }
//   }

// })

$(function() {

  if (!getToken()) {
    // location.replace('./login.html')
    //?code=001S1vcO1DV3Fa1oz2cO1w4tcO1S1vcd&state=STATE
    //https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx9ced274b8be31a53&secret=SECRET&code=001S1vcO1DV3Fa1oz2cO1w4tcO1S1vcd&grant_type=authorization_code
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppId}&redirect_uri=${RedirectUri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
  }
})


