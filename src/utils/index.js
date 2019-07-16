
const simpleList = ['undefined', 'boolean', 'string', 'number', 'null']
// 获取对象类型
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}

// 将对象生成树状结构，这一步已经将所有值都重新复制一份
function tree(value) {
  
  var type = getType(value)
    // 函数体正则
  var fnBodyExp = /(?:\/\*[\s\S]*?\*\/|\/\/.*?\r?\n|[^{])+\{([\s\S]*)\}$/
    // 函数参数正则
  var fnParamsExp = /^[^\(]*\(\s*([^\)]*)\)/m
    // 匹配正则体正则
  var reExp = /\/(.*)\//
  
  // 如果是简单数据类型，则直接提取值
  if (simpleList.includes(type)) {
    
    return {
      type: type,
      value: value
    }
  }
  
  // 正则数据类型拷贝
  if (type === 'regexp') {
    
    return {
      type: 'regexp',
      value: new RegExp(value.toString().match(reExp)[1])
    }
  }
  
  // 函数数据类型拷贝
  if (type === 'function') {
    console.log(value.toString())
    return {
      type: 'function',
      // value: new Function(...value.toString().match(fnParamsExp)[1].split(','), value.toString().match(fnBodyExp)[1])
      value: eval(value.toString())
    }
  }
  
  // 数组数据类型拷贝
  if (type === 'array') {
    return {
      type: 'array',
      value: value.map(tree)
    }
  }
  
  // 对象数据类型拷贝
  if (type === 'object') {
    return {
      type: 'object',
      value: Object.keys(value).map(key => ({ key: key, ...tree(value[key]) }))
    }
  }
}

// 将所有生成的树状结构数据进行差异性合并
function merger() {
  // 方案一 将所有树状结构添加到一个数组，对数组进行遍历处理，生成只有唯一key的数组
  var filter_tree = [...arguments].filter(item => item.type === 'object')
  var map_all = filter_tree.reduce((total, current) => total.concat(current.value), [])
  // var direct_copy = ['undefined', 'boolean', 'string', 'number', 'null', 'regexp', 'function']
  // 真正的功能函数
  function doJob(map) {
    const output = []
    map.forEach(child => {
      const item = output.find(_child => _child.key === child.key)
      if (!item) {
        output.push(child)
      } else {
        
        if (child.type === 'array' && item.type === 'array') {
          item.value = item.value.concat(child.value)
        } else if (child.type === 'object' && item.type === 'object') {
          item.value = doJob(item.value.concat(child.value))	
        } else {
          item.type = child.type
          item.value = child.value
        }
        
      }
    })
    
    return output
  }
  
  return doJob(map_all)
}

function generateData(treeData) {
  
  if (treeData.type === 'array') {
    return treeData.value.map(generateData)
  }
  
  if (treeData.type === 'object') {

    return treeData.value.reduce((total, current) => (total[current.key] = generateData(current), total), { })
  }
  
  return treeData.value
}

function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }

  if ((`${time}`).length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  // console.log(formatObj, cFormat)
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]

    if (key === 'a') return ['日', '一', '二', '三', '四', '五', '六'][value]
    if (result.length > 0 && value < 10) {
      value = `0${value}`
    }
    return value || 0
  })
  return time_str
}

export const Wx = {
  redux: (origin, keys) => {
    return keys.reduce((result, currentKey) => {
      return result ? result[currentKey] : null
    }, origin)
  },
  type: (param) => {
    return Object.prototype.toString.call(param).slice(8, -1).toLowerCase()
  },
  merge: (...args) => {
    const output = merger(...[...args].map(tree))
    return output.reduce((total, current) => (total[current.key] = generateData(current), total), { })
  },
  parseTime
}
