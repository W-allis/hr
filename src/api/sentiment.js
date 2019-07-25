import { request } from '@/utils/request'


export function postLogin(model) {
  return request.post(`${process.env.sentiment}/wechat/register`, model, { 'content-type': 'application/x-www-form-urlencoded' })
}

export function getCompanyList(model) {
  return request.post(`${process.env.sentiment}/wechat/index`, model, { 'content-type': 'application/x-www-form-urlencoded' })
}

export function getSentimentList(model) {
  return request.post(`${process.env.sentiment}/wechat/search`, model, { 'content-type': 'application/x-www-form-urlencoded' })
}

export function postReadId(model) {
  return request.post(`${process.env.sentiment}/wechat/set_have_read`, model, { 'content-type': 'application/x-www-form-urlencoded' })
}

// request.get('/wxpAppid/connect/oauth2/authorize?appid=wx93f4cdece0bc1368&redirect_uri=http://www.qq.com/music.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect').subscribe(res => {
//   console.log(res)
// })

// request.get('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx93f4cdece0bc1368&redirect_uri=http://www.qq.com/music.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect').subscribe(res => {
//   console.log(res)
// })
