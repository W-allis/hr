import { parse } from 'parse5'
import { El } from './velement'

export class GeneraterAstDom {

  private root_node
  
  constructor(template) {
    this.root_node = parse(template.default).childNodes[0].childNodes[1].childNodes[0]

    this.init.call(this, this.root_node)
  }

  init(node) {
    if (node.nodeName === '#text') {

      return [node.value]
    } else {
      return El(node.nodeName, (node.attrs || []).reduce((total, curr) => (total[curr.name] = curr.value, total), {}), (node.childNodes || []).map(item => this.init.call(this, item)))
    }
  }
}
