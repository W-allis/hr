export class Validate {
  private el: HTMLElement
  
  constructor(options) {
    this.el = document.querySelector(options.el)

    this.initForm()
  }

  private initForm() {
    const list = this.el.querySelectorAll('.form-control')
    
    list.forEach(item => {
      this.registerValidator()  
    })
    
  }

  registerValidator() {
    
  }

  validateFields() {

  }

  validate() {
    
  }
}