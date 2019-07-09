interface Handler {
  (): any|void
}

class EventBus {

  private handlerList: Map<string, any> = new Map()
  
  constructor() {}

  $on(things: string, handler: Handler): void {
    this.handlerList[things] = handler
  }

  $emit(things: string, ...args: any[]) {
    return this.handlerList[things](...args)
  }
}

export const eventBus = new EventBus()
