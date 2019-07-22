

interface Handler {
  (): any|void
}

interface Observer {
  next?: Handler,
  error?: Handler,
  complete?: Handler
}

const EmptyFunction: Handler = () => {}

// 操作符， 独立模块
class Operators {
  map(shecdule) {
    // const $shecdule = new Observe()
    if (typeof shecdule !== 'function') {
      throw 'arguments[0] must be a function'
    }
    
    // this.lift(shecdule)
    return function mapOperatorFunction(source) {

      return source.lift(shecdule)
    }
    // return $shecdule
  }

  debounceTime(time: number) {
    // const $shecdule = new Observe()
    
    // $shecdule.lift((function() {
    //   var timer

    //   return function() {
    //     clearTimeout(timer)
    //     timer = setTimeout(function() {

    //     }, time)
    //   }
    // })())

    // return $shecdule
  }
}

class SafeObserver {

  private destination: any
  isUnsubscriber: boolean = false

  constructor(destination: Observer) {
    this.destination = destination
  }

  unsubscriber() {
    this.isUnsubscriber = true
    console.log('i must be unsubscriber observable')
  }

  protected next() {
    if (!this.isUnsubscriber) {
      try {
        this.destination.next()
      } catch (error) {
        this.unsubscriber()
        throw error
      }
    }
  }

  protected error() {
    if (!this.isUnsubscriber) {

      try {
        this.destination.error()
      } catch (error) {
        this.unsubscriber()
        throw error
      }
      this.unsubscriber()
    }
  }

  protected complete() {
    if (this.isUnsubscriber) {
      try {
        this.destination.complete()
      } catch (error) {
        this.unsubscriber()
        throw error
      }
      this.unsubscriber()
    }
  }
}

class Subscription {

}

// subscriber 已经注册好，now 注册被观察对象
class OnSubscriber {
  
  constructor() {

  }

  
}

// Observable 单播，
// from of fromEvent 被观察者
// Observer 观察者， 
// Subject 多播
class Observe extends Operators {
  
  shecdule: any[] = []

  constructor() {
    super()
  }

  lift(shecdule: any) {

    this.shecdule.push(shecdule)
    return this
  }

  subscribe(ObserverOrNext: Observer|Handler, error: Handler = EmptyFunction, complete: Handler = EmptyFunction) {

    const destination: Observer = { }

    if (typeof ObserverOrNext === 'object') {
      destination.next = ObserverOrNext.next || EmptyFunction
      destination.error = ObserverOrNext.error || EmptyFunction
      destination.complete = ObserverOrNext.complete || EmptyFunction
    } else {
      destination.next = ObserverOrNext || EmptyFunction
      destination.error = error
      destination.complete = complete
    }

    const safeObserver = new SafeObserver(destination)

    return safeObserver
  }
}

class Observable {
  constructor() { }

  static from(args: any[]) {
    return new Observe()
  }

}

interface Subscriber {
  subscribe(fn): void
}

class Shecdule {

}

var ovser = Observable.from([1, 2, 3]).map(item => item + 1)

console.log(ovser)

// Observable.from([1, 2, 3, 4])
//   .map(function(value) {
//     return value + 2
//   })
//   .subscribe(function(res) {
//     console.log(res)
//   })
