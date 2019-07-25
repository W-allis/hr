export class EventBus {
  private collections: { } = { }

  emit(event_name: string, ...args) {
    
    if (!this.collections[event_name]) throw `you have not register ${event_name} event`

    return new Promise((resolve, reject) => {
      resolve(this.collections[event_name](...args))
    })
  }

  on(event_name: string, handler: Function) {
    this.collections[event_name] = handler
  }

  off(event_name: string) {
    delete this.collections[event_name]
  }
}