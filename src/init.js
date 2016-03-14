
import Rx from 'rx'
import Cycle from '@cycle/core'
import {label, p, button, div, makeDOMDriver} from '@cycle/dom'

// Logic (functional)
function main (sources) {
  const decrementClicks$ = sources.DOM
    .select('.decrement').events('click')
  const incrementClicks$ = sources.DOM
    .select('.increment').events('click')
  const decrementAction$ = decrementClicks$.map(ev => -1)
  const incrementAction$ = incrementClicks$.map(ev => +1)
  const number$ = Rx.Observable.of(10)
    .merge(decrementAction$).merge(incrementAction$)
    .scan((previousValue, currentValue) => previousValue + currentValue)

  return {
    DOM: number$.map(number =>
      div([
        button('.decrement', 'Decrement'),
        button('.increment', 'Increment'),
        p([
          label(String(number))
        ])
      ])
    )
  }
}

const drivers = {
  DOM: makeDOMDriver('#app')
}

Cycle.run(main, drivers)


