
import Rx from 'rx'
import Cycle from '@cycle/core'
import {label, input, h1, hr, div, makeDOMDriver} from '@cycle/dom'

// Logic (functional)
function main (sources) {
  const inputEv$ = sources.DOM.select('.field').events('input')
  const name$ = inputEv$.map(ev => ev.target.value).startWith('')
  return {
    DOM: name$.map(name =>
      div([
        label('Name:'),
        input('.field', {type: 'text'}),
        hr(),
        h1(`Hello ${name}!`)
      ])
    )
  }
}

const drivers = {
  DOM: makeDOMDriver('#app')
}

Cycle.run(main, drivers)


