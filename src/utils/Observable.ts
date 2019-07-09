/*
interface Handler {
  (): any|void
}

interface Observer {
  next?: Handler,
  error?: Handler,
  complete?: Handler
}

const EmptyFunction: Handler = () => {}

class Observe {

}

class Observable {
  constructor() { }

  static from(args: any[]) {
    return new Observe()
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

  private next() {
    if (!this.isUnsubscriber) {
      try {
        this.destination.next()
      } catch (error) {
        this.unsubscriber()
        throw error
      }
    }
  }

  private error() {
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

  private complete() {
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

// subscriber 已经注册好，now 注册被观察对象
class OnSubscriber {
  
  constructor() {

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

// 操作符， 独立模块
class Operators {
  map(shecdule) {
    // const $shecdule = new Observe()
    
    // $shecdule.lift(shecdule, this.$Obv)

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

interface Subscriber {
  subscribe(fn): void
}

class Shecdule {

}

// Observable.from([1, 2, 3, 4])
//   .map(function(value) {
//     return value + 2
//   })
//   .subscribe(function(res) {
//     console.log(res)
//   })
*/