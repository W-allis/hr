import { NgComponent } from '@/ag'

@NgComponent({
  templateUrl: './index.html',
  styleUrl: ['./index.less']
})
export class NgFormComponent {

}

const template = require('./index.html')
  console.log(template.default)

function VirtrolDom(template) {

}