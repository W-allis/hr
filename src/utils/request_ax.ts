import axios from 'axios'
import { mixins, bind, deepMerge } from './mixin'

interface T {
  (any): any
  request(...args: any): any
}

function type(param) {
  return Object.prototype.toString.call(param).slice(8, -1).toLowerCase()
}

namespace wallis {
  class $Cancel {

    source

    constructor() {
      var CancelToken = axios.CancelToken
      console.log(CancelToken.source())
      this.source = CancelToken.source()
    }
  }

  class Request {

    private sheduler = []
    private source

    constructor() {
      mixins(Promise.prototype, Request.prototype, this)
    }

    ajax(options) {

      const cancel = new $Cancel()
      console.log(cancel)
      // this.source = cancel.source

      // options = deepMerge(options, { cancelToken: this.source.token })

      return new Promise((resolve, reject) => {
        Promise.all(this.sheduler.map(item => item(options))).then(config => {
          axios(options).then(resolve)
        })
      })

      // return result
    }

    cancel() {
      if (this.source) {
        console.log(this.source)
        this.source.cancel()
      }
    }

    create(options) {
      axios.create(options)
      return this
    }


    // interceptors() {
    //   return {
    request(...args) {
      console.log(arguments)
      this.sheduler.push(...args.map(item => this.safeSheduler(item)))
    } 
    //   }
    // }

    private safeSheduler(sheduler) {
      if (type(sheduler) !== 'function') throw 'sheduler must be a function'
    
      return function wrap(config) {
        return new Promise((resolve, reject) => {
          const result = sheduler(config)
    
          if (type(sheduler) === 'promise') {
            result.then(resolve)
          } else {
            resolve(result)
          }
        })
      }
    }
  }

  function createInstance() {
    const request = new Request()

    const instance = bind(Request.prototype.ajax, request)

    mixins(instance, Request.prototype, request)
    return instance
  }

  const request = createInstance() as T

  request.request(function(config) {
    config.headers = {}
    config.headers.token = 6542
    return config
  })

  var a = request({
    url: '1234',
    method: 'get'
  }).then(res => {
    console.log(res)
  }).catch(error => {
    console.log(error)
  })
  console.log(a)
  a.cancel('取消ajax')

  var CancelToken = axios.CancelToken;
  var source = CancelToken.source();
  console.log(source)
  axios({
      method:"GET",
      url:"https://api.github.com/",
      cancelToken:source.token
  }).then((res) => {
      console.log(res.data);
  }).catch((err) => {
    console.log(err);
  })
  source.cancel('取消ajax')


}