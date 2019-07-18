// https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx9ced274b8be31a53&secret=SECRET&code=001S1vcO1DV3Fa1oz2cO1w4tcO1S1vcd&grant_type=authorization_code
import { request } from '@/utils/request'

export function getAppId(params) {
  return request.get(`${process.env.appid}/sns/oauth2/access_token`, params)
}