
import { Wx } from './index'

export function serialization(params: { [key: string]: any }): string {

  if (Wx.type(params) !== 'object') return ''

  const paramsKeys = Object.keys(params) 

  if (!paramsKeys.length) return ''

  return paramsKeys.reduce((total, curr, index): string => `${total}&${curr}=${params[curr]}`, '?')
}

export function unSerialization(str: string): any {
  const result = {  }

  if (Wx.type(str) !== 'string') return result

  return str.split('&').reduce((total: {}, curr: string): {} => {

    const item = curr.split('=')

    return (total[item[0]] = item[1], total)
  }, { }) 
  // return paramsKeys.reduce((total, curr, index): string => `${total}&${curr}=${params[curr]}`, '?')
}
