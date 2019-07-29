import { parse } from 'parse5'

interface VDom_T {
  tag: string
  attribute: { [key: string]: string }
  content: string
  children?: Array<VDom_T | string>
  render(): Node
}

class $Element implements VDom_T {

  tag: string
  attribute: { [key: string]: string } | null
  content: string
  children: Array<VDom_T | string>

  constructor(tag_name: string, attributeOrChildren: Array<VDom_T | string> | Object, children?: Array<VDom_T | string>) {

    if (attributeOrChildren instanceof Array) {
      children = attributeOrChildren
      attributeOrChildren = {}
    }
    this.tag = tag_name
    this.attribute = <{ [key: string]: string } | null>attributeOrChildren
    this.children = children

  }

  private init() {

  }

  render(): Node {
    const el = document.createElement(this.tag)

    for (let attr in this.attribute) {
      el.setAttribute(attr, this.attribute[attr])
    }

    this.children.forEach(item => {

      let node = item instanceof $Element ? item.render() : document.createTextNode(<string>item)
      el.appendChild(node)
    })

    return el
  }
}

function El(tag_name: string, attributeOrChildren: Array<string | VDom_T> | Object, children?: Array<string | VDom_T>) {
  return new $Element(tag_name, attributeOrChildren, children)
}


export function generaterAstDom(node) {
  if (node.nodeName === '#text') {

    return [node.value]
  } else {
    return El(node.nodeName, (node.attrs || []).reduce((total, curr) => (total[curr.name] = curr.value, total), {}), (node.childNodes || []).map(item => generaterAstDom(item)))
  }
}

