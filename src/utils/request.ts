import { Observable, interval, timer, bindCallback, ObservableInput, forkJoin, throwError } from 'rxjs'
import { ajax, AjaxResponse } from 'rxjs/ajax'
import { zip, takeUntil, delayWhen, map, catchError, retry, delay, count } from 'rxjs/operators'
import { Wx } from './index'

interface Handler {
  (): any|void
}

const Headers = {
  token: '',
  'content-type': 'application/json;charset=UTF-8'
}

function serialization(params: { [key: string]: any }): string {

  if (Wx.type(params) !== 'object') return ''

  const paramsKeys = Object.keys(params) 

  if (!paramsKeys.length) return ''

  return paramsKeys.reduce((total, curr, index): string => `${total}&${curr}=${params[curr]}`, '?')
}

class $Request {

  handleError(error): ObservableInput<any> {
    return throwError(error)
  }

  handleResponse(response: AjaxResponse): ObservableInput<any>|AjaxResponse {
    if ((<{ data: any } & AjaxResponse>response).response.resCode !== 0) {
      return throwError(response)
    }
    return response.response
  }

  constructor() {}

  post(url: string, data?: any, options?: any) {
    return ajax.post(url, data, Wx.merge(Headers, options))
      .pipe(
        map(this.handleResponse),
        catchError(this.handleError)
      )
  }

  get(url: string, data?: any, options?: any) {
    return ajax.get(url + serialization(data), Wx.merge(Headers, options))
      .pipe(
        map(this.handleResponse),
        catchError(this.handleError)
      )
  }
}

export const request = new $Request()