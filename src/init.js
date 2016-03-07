
import Rx from 'rx'

// Logic (functional)
function main (DOMSource) {
  const click$ = DOMSource
  return {
    DOM: click$
      .startWith(null)
      .flatMapLatest(() =>
        Rx.Observable.timer(0, 1000)
            .map(i => `Seconds elapses ${i}`)
      ),
    Log: Rx.Observable.timer(0, 2000).map(i => 2 * i)
  }
}
// source: input (read) effects
// sink: output (write) effects

// drivers (imperative)
function DOMDriver (text$) {
  text$.subscribe(text => {
    const container = document.querySelector('#app')
    container.textContent = text
  })
  const DOMSource = Rx.Observable.fromEvent(document, 'click')
  return DOMSource
}

function consoleLogDriver (msg$) {
  msg$.subscribe(msg => console.log(msg))
}

function run (mainFn, drivers) {
  const proxyDOMSource = new Rx.Subject()
  const sink = mainFn(proxyDOMSource)

  const DOMSource = drivers.DOM(sink.DOM)
  DOMSource.subscribe(click => proxyDOMSource.onNext(click))

  // Object.keys(drivers).forEach(key => {
  //   drivers[key](sink[key])
  // })
}

const drivers = {
  DOM: DOMDriver,
  Log: consoleLogDriver
}

run(main, drivers)


