
import Rx from 'rx'
import Cycle from '@cycle/core'
import {h1, span, makeDOMDriver} from '@cycle/dom'

// Logic (functional)
function main (sources) {
  const mouseover$ = sources.DOM.select('span').events('mouseover')
  return {
    DOM: mouseover$
      .startWith(null)
      .flatMapLatest(() =>
        Rx.Observable.timer(0, 1000)
            .map(i =>
              h1({ style: { background: 'red' } }, [
                span([
                  `Seconds elapses ${i}`
                ])
              ])
            )
      ),
    Log: Rx.Observable.timer(0, 2000).map(i => 2 * i)
  }
}

function consoleLogDriver (msg$) {
  msg$.subscribe(msg => console.log(msg))
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  Log: consoleLogDriver
}

Cycle.run(main, drivers)


