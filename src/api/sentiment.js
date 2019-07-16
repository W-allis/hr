import { request } from '@/utils/request'

export function getCompanyList(model) {
  return request.post(`${process.env.sentiment}/wechat/companies`, model, { 'content-type': 'application/x-www-form-urlencoded' })
}

export function getSentimentList(model) {
  return request.post(`${process.env.sentiment}/wechat/articles`, model, { 'content-type': 'application/x-www-form-urlencoded' })
}

request.get('https://open.weixin.qq.com//connect/oauth2/authorize?appid=wx93f4cdece0bc1368&redirect_uri=http://www.qq.com/music.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect').subscribe(res => {
  console.log(res)
})
