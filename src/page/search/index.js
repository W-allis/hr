import './style/search.less'

import '@/utils/Observable'
import '@/utils/rx'

import '@/utils/store'

import { Validate } from '@/utils/Validate'

import '@/app.module'

const page = (function() {

  function Page() {
    
    this.init()
  }

  Page.prototype.init = function() {
    new Validate({
      el: '#form'
    })
  }

  return new Page() 
})()
