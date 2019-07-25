interface Tree {
  key?: string,
  type: string,
  value: string|RegExp|boolean|Function|number|null|undefined|Array<Tree>
}

const simpleList = ['undefined', 'boolean', 'string', 'number', 'null']

export class Utils {
  constructor() { }
  
  type(value: any): string {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
  }

  /**
   * @param args 参数类型不一致时，以第一个参数为准，从后往前依次混入
   */
  deepMerger(...args: any[]) {
    const Trees: Tree[] = args.map(arg => this.generateTree(arg))

    const type_0 = Trees[0].type

    if (!(type_0 === 'object' || type_0 === 'array')) {

      return Trees[0].value
    }

    const output = Trees.reduce((total, curr) => {
      if (curr.type === type_0) {
        if (total.type === 'object' && curr.type === 'object') {
          total.value = this.filterKey((<Array<Tree>>total.value).concat((<Array<Tree>>curr.value)))
        } else if (total.type === 'array' && curr.type === 'array') {
          total.value = (<Array<Tree>>total.value).concat((<Array<Tree>>curr.value))
        }
      }
      return total
    })
    return this.analysiser(output)

  }

  private analysiser(tree: Tree): any {
    if (tree.type === 'function') {
      return tree.value
    }

    if (tree.type === 'regexp') {
      return tree.value
    }

    if (tree.type === 'undefined') {
      return tree.value
    }

    if (tree.type === 'null') {
      return tree.value
    }

    if (tree.type === 'string') {
      return tree.value
    }

    if (tree.type === 'number') {
      return tree.value
    }

    if (tree.type === 'boolean') {
      return tree.value
    }

    if (tree.type === 'array') {
      return (<Array<Tree>>tree.value).map(item => this.analysiser.call(this, item))
    }

    if (tree.type === 'object') {
      return (<Array<Tree>>tree.value).reduce((total, curr) => {
        total[curr.key] = curr.type === 'array' ? (total[curr.key] || []).concat(this.analysiser.call(this, curr)) : this.analysiser.call(this, curr)
        
        return total
      }, { })
    }
  }

  // 源头已经过滤不是同一类型不可进入递归
  private filterKey(source: Tree[]): any {
    const output = []

    source.forEach(item => {
      const sub = output.findIndex(child => child.key === item.key)
      if (sub < 0) {
        return output.push(item)
      }

      if (output[sub].type === 'object' && item.type === 'object') {
        output[sub].value = this.filterKey.call(this, output[sub].value.concat(item.value))
      } else if (output[sub].type === 'array' && item.type === 'array') {
        output[sub].value = output[sub].value.concat(item.value)
      } else {
        output[sub] = { ...item }
      }
    })
    
    return output
  }

  private generateTree(value): Tree {

    if (this.type(value) === 'function') {
      let fnBodyExp = /(?:\/\*[\s\S]*?\*\/|\/\/.*?\r?\n|[^{])+\{([\s\S]*)\}$/
      // 函数参数正则
      let fnParamsExp = /^[^\(]*\(\s*([^\)]*)\)/m

      return { 
        type: 'function',
        value: new Function(...value.toString().match(fnParamsExp)[1].split(','), value.toString().match(fnBodyExp)[1])
      }
    }

    if (this.type(value) === 'regexp') {
      return { 
        type: 'regexp',
        value: eval(value.toString())
      }
    }
  
    if (this.type(value) === 'string') {
      return { 
        type: 'string',
        value: value
      }
    }
  
    if (this.type(value) === 'boolean') {
      return { 
        type: 'boolean',
        value: value
      }
    }

    if (this.type(value) === 'number') {
      return { 
        type: 'number',
        value: value
      }
    }

    if (this.type(value) === 'undefined') {
      return { 
        type: 'undefined',
        value: undefined
      }
    }

    if (this.type(value) === 'null') {
      return { 
        type: 'null',
        value: null
      }
    }

    if (this.type(value) === 'array') {
      return { 
        type: 'array',
        value: value.map((item: any) => this.generateTree(item))
      }
    }

    if (this.type(value) === 'object') {
      return {
        type: 'object',
        value: Object.keys(value).map((key: string) => ({ key, ...this.generateTree(value[key]) }))
      }
    }
  }
} 

const utils = new Utils()

const a2 = [1, 2, 3]
const a3 = [1, 2, 3]

var b = utils.deepMerger(a2, a3)

console.log(b)
