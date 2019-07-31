export function bind(fn, context?) {
  return function wrap(thisArg) {
    return fn.call(context, thisArg)
  }
}

export function mixins(target, resource: {}, context?): {} {
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

export function deepMerge(...args) {
  const target = {}

  args.forEach(item =>{
    const resource = item
    const resourceKeys = Object.getOwnPropertyNames(resource)
    
    resourceKeys.forEach(key => {
      if (typeof target[key] === 'object' && typeof resource[key] === 'object') {
        target[key] = deepMerge(target[key], resource[key])
      } else if (typeof resource[key] === 'object') {
        target[key] = deepMerge({}, resource[key])
      } else {
        target[key] = resource[key]
      }
    })
  })

  return target
}

// const a = deepMerge({ name: 123, student: { value: 4 }, type: { get: 325 }, list: 321 }, { name: 369, student: { name: 63 }, type: 369, list: { value: 65 } })
// console.log(a)