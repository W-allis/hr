interface Tree {
  key?: string,
  type: string,
  value: string|RegExp|boolean|Function|number|null|undefined|Array<Tree>
}

export class Utils {
  constructor() { }
  
  type(value: any): string {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
  }

  /**
   * @param args 参数类型不一致时，从后往前依次混入
   */
  deepMerger(...args: any[]) {
    const Trees: Tree[] = args.map(arg => this.generateTree(arg))

    const type0 = Trees[0].type

    if (!(type0 === 'array' || type0 === 'object')) {
      return Trees[0].value
    }

    const MainTree = Trees.reduce((total, current) => {
      if (current.type === type0) {
        total.value = (<Array<Tree>>total.value).concat((<Array<Tree>>current.value))
      }
      return total
    }, { value: [], type: type0 })
    
    this.filterKey(MainTree)
    // console.log(MainTree)
  }

  private filterKey(tree: Tree): Tree {
    console.log(tree)
    if (tree.type === 'object') {

    }
    return tree
  }

  private generateTree(value): Tree {
    if (this.type(value) === 'function') {
      return { 
        type: 'function',
        value: eval(value.toString())
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

console.log(utils.deepMerger({ label: '测', value: '123' }, { name: '心怀铅', group: '佛' }, null))