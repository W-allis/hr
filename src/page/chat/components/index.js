import Vue from 'vue'

const requireAll = require.context('./', true, /\.vue/)

const instance = requireAll.keys().forEach(item => {
  const component = requireAll(item).default
  if (typeof component.name !== 'string' &&!component.name) throw `please checkout component name` 

  Vue.component(component.name, component)
})
