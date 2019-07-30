import axios from 'axios'
import { mixins } from './mixin'

function type(param) {
  return Object.prototype.toString.call(param).slice(8, -1).toLowerCase()
}

function safeSheduler(sheduler) {
  if (type(sheduler) !== 'function') throw 'sheduler must be a function'

  return function wrap() {
    return new Promise((resolve, reject) => {
      const result = sheduler()

      if (type(sheduler) === 'promise') {
        result.then(resolve)
      } else {
        resolve(result)
      }
    })
  }
}

abstract class Use {
  abstract use(): void
}

class InterceptorsRequest implements Use {
  private sheduler = []
  use(...args): void {
    this.sheduler.unshift(...args.map(item => safeSheduler(item)))
  }
}

class InterceptorsResponse implements Use {
  private sheduler = []
  use(...args): void {
    this.sheduler.push(...args.map(item => safeSheduler(item)))
  }
}

const $A = (function() {

  // 构造函数
  function Request() {
  }

  const D = (function () {
    function _() {

    }
    _.prototype = axios

    return _
  })()

  // 将axios原型挂载到Request原型的原型上
  Request.prototype = new D()

  Request.prototype.interceptors = {
    request: new InterceptorsRequest(),
    response: new InterceptorsResponse()
  }

  Request.prototype.create = function(options) {
    const request = axios.create(options)
    return this
  }

  const request = new Request()
  function ajax() {

  }

  return request

})()

// const request = $A.create({
//   timeout: 6000
// })

function request() {

}


console.dir(request)
console.dir(axios)
// request.interceptors.request.use(function(config) {
//   return new Promise(resolve => {
//     setTimeout(function() {
//       resolve(30000)
//     }, 5000)
//   })
// }, function(config) {
//   return config
// })

// request.interceptors.response.use(function(config) {
//   return new Promise(resolve => {
//     setTimeout(function() {
//       resolve(30000)
//     }, 5000)
//   })
// }, function(config) {
//   return config
// })

// console.dir(axios)

// request({
//   url: '1234',
//   method: 'get'
// })
