export interface VDom_T {
  tag: string
  attribute: { [key: string]: string }
  content: string
  children?: Array<VDom_T | string>
  render(): Node
}