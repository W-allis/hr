import { getToken } from './utils/user'

const whiteList = ['login']

$(document).on('pageInit', function(e, pageId, $page) {
  if (!whiteList.includes(pageId)) {
    if (!getToken()) {
      $.router.load('#login')
    }
  }

})