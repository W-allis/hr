
namespace wallis_d {

  interface Handler {
    (params?: any): void
  }

  export interface Observe_object {
    next?: Handler,
    error?: Handler
    complete?: Handler
  }
}

function init() {

}

namespace wallis {
  class Subscribe {

    static subscribeTo(observe_object: any, type?: string) {
      if (observe_object instanceof Array) {
        return function wrap(subscriber) {
          for(var i = 0; i < observe_object.length && !subscriber._unsubscribe; i++) {
            subscriber.next(observe_object[i])
          }
          subscriber.complete()
        }
      }
      if (observe_object instanceof HTMLElement) {
        return function wrap(subscriber) {
          observe_object.addEventListener(type, subscriber.next)
        }
      }
    }
  }

  class Observer {

    private destination: wallis_d.Observe_object = { }
    private _unsubscribe: Boolean = false

    private _subscribe

    constructor(subscribe: any) {
      this._subscribe = subscribe
    }

    private init() {

    }

    private _next(value: any): void {

    }

    private hasBeen() {

    }

    private _error(error): void {
    }

    private _complete() {
    }

    private safeObserver(observerOrNext: wallis_d.Observe_object, error?, complete?) {
      if (typeof observerOrNext === 'object') {
        this.destination.next = function(value) {
          try {
            (observerOrNext.next || this._next)(value)
          } catch (error) {
            console.error(error)
          }
        }
        this.destination.error = function(error) {
          try {
            (observerOrNext.error || this._error)(error)
          } catch (error) {
            console.error(error)
          }
          this._unsubscribe = true
        }

        this.destination.complete = function() {
          try {
            (observerOrNext.complete || this._complete)()
          } catch (error) {
            console.error(error)
          }
          this._unsubscribe = true
        }
      } else {
        this.destination.next = (value) => {
          try {
            (observerOrNext || this._next)(value)
          } catch (error) {
            console.error(error)
          }
        }
        this.destination.error = () => {
          try {
            (error || this._error)()
          } catch (error) {
            console.error(error)
          }
          this._unsubscribe = true
        }

        this.destination.complete = () => {
          try {
            (complete || this._complete)()
          } catch (error) {
            console.error(error)
          }
          this._unsubscribe = true
        }
      }
    }

    // can return Subscriber
    subscribe(observerOrNext, error?, complete?) {
      const safe = this.safeObserver(observerOrNext, error, complete)
      this._subscribe(this.destination)
    }
  }

  export class Observable {
    static from(observe_object: string|Array<any>): Observer {
      return new Observer(Subscribe.subscribeTo(observe_object))
    }
    static fromEvent(el, type: string): Observer {
      return new Observer(Subscribe.subscribeTo(el, type))
    }
  }
}

wallis.Observable.from([1, 2, 3]).subscribe(res => {
  console.log(res)
}) // toSubscribe

wallis.Observable.fromEvent(document.querySelector('.btn'), 'click').subscribe(res => {
  console.log(res)
})