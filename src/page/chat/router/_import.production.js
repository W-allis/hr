module.exports = path => (resolve) => {
  return import(`@/page/chat/views/${path}.vue`).then(res => {
    resolve(res)
  })
}