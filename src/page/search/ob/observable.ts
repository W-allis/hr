
interface Observer_d {
  next: Function,
  error?: Function,
  complete?: Function
}

interface $Observer_d extends Observer_d {
  closed: Boolean
}

class $Operators {

}


class $Observer {

  private _subscriber
  private destination: $Observer_d

  constructor(subscriber) {
    this._subscriber = subscriber
  }

  private safeObserver(observerOrNext: Observer_d|Function, error?, complete?) {
    if (observerOrNext instanceof Function) {
      this.destination = {
        closed: false,
        next: value => {
          try {
            (observerOrNext || this.next)(value)
          } catch (error) {
            console.error(error)
          }
        },
        error: _value => {
          try {
            (error || this.error)(_value)
          } catch (error) {
            console.error(error)
          }
          this.close()
        },
        complete: _ => {
          try {
            (complete || this.complete)()
          } catch (error) {
            console.error(error)
          }
          this.close()
        }
      }

      return this.destination
    }

    this.destination = {
      closed: false,
      next: value => {
        try {
          (observerOrNext.next || this.next)(value)
        } catch (error) {
          console.error(error)
        }
      },
      error: _value => {
        try {
          (observerOrNext.error || this.error)(_value)
        } catch (error) {
          console.error(error)
        }
        this.close()
      },
      complete: _ => {
        try {
          (observerOrNext.complete || this.complete)()
        } catch (error) {
          console.error(error)
        }

        this.close()
      }
    }

    return this.destination
  }

  private close() {
    this.destination.closed = true
  }

  private next() {

  }

  private error() {
    
  }

  private complete() {
    
  }

  subscribe(observerOrNext, error?, complete?) {
    const value = this._subscriber(this.safeObserver(observerOrNext, error, complete))
  }
}

class $Subscribe {

  static subscribeTo(observed: any, type?: string) {
    if (observed instanceof Array) {
      return $Subscribe.isArray(observed)
    }

    if (observed instanceof HTMLElement) {
      return $Subscribe.isEvent(observed, type)
    }
  }

  static isArray(observed: Array<any>) {
    return function wrap(subscribe) {
      for (let i = 0; i < observed.length && !subscribe.closed; i++) {
        subscribe.next(observed[i])
      }

      subscribe.complete()
    }
  }

  static isEvent(observed: HTMLElement, type?: string) {
    return function wrap(subscribe) {
      observed.addEventListener(type, subscribe.next)
    }
  }
}

class $Observable {
  static from(input: Array<any>) {
    return new $Observer($Subscribe.subscribeTo(input))
  }
  static fromEvent(el: HTMLElement, type: string) {
    return new $Observer($Subscribe.subscribeTo(el, type))
  }
}

$Observable.from([1, 2]).subscribe(res => {
  console.log(res)
})