function bind(fn, context?) {
  return function wrap(thisArg) {
    return fn.call(context, thisArg)
  }
}

export function mixins(target: {}, resource: {}, context?): {} {
  const resourceKeys = Object.getOwnPropertyNames(resource)
  
  resourceKeys.forEach(key => {
    const fn = resource[key]
    if (fn && typeof fn === 'function') {
      target[key] = bind(fn, context)
    } else {
      target[key] = resource[key]
    }
  })
  
  return target
}

export function deepMerge() {

}