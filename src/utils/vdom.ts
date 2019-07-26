namespace VDom {
  interface VDom_T {
    tag: string
    attribute: { [key: string]: string } 
    content: string
    children?: Array<VDom_T|string>
    render(): Node
  }

  class $Element implements VDom_T {

    tag: string
    attribute: { [key: string]: string } | null 
    content: string
    children: Array<VDom_T|string>

    constructor(tag_name: string, attributeOrChildren: Array<VDom_T|string>|Object, children?: Array<VDom_T|string>) {
      
      if (attributeOrChildren instanceof Array) {
        children = attributeOrChildren
        attributeOrChildren = { }
      }
      this.tag = tag_name
      this.attribute = <{ [key: string]: string } | null >attributeOrChildren
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

  function El(tag_name: string, attributeOrChildren: Array<string|VDom_T>|Object, children?: Array<string|VDom_T>) {
    return new $Element(tag_name, attributeOrChildren, children)
  }

  
  var vdom = El('div', { 'id': 'container' }, [
    El('h1', { style: 'color:red' }, ['simple virtual dom']),
    El('p', ['hello world']),
    El('ul', [El('li', ['item #1']), El('li', ['item #2'])]),  
  ])

  console.log(vdom.render())
}

namespace Analyser_Node {

}