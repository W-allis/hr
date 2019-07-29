import { NgComponent } from '@/ag'

@NgComponent({
  templateUrl: './index.html',
  styleUrl: ['./index.less']
})
export class NgFormComponent {

}

const template = require('./index.html')

import { generaterAstDom } from '@/utils/vdom'
import { parse } from 'parse5'

console.log(generaterAstDom(parse(template.default).childNodes[0].childNodes[1].childNodes[0]))