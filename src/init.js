
import Rx from 'rx'
import Cycle from '@cycle/core'
import {label, input, h2, div, makeDOMDriver} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http'

// dom read efffect: detect slider change
// racalcualate bmi
// dom write effect: display bmi
function main (sources) {
  const changeWeight$ = sources.DOM.select('.weight').events('input')
    .map(ev => ev.target.value)
  const changeHeight$ = sources.DOM.select('.height').events('input')
    .map(ev => ev.target.value)

  const state$ = Rx.Observable.combineLatest(
    changeWeight$.startWith(65),
    changeHeight$.startWith(170),
    (weight, height) => {
      const heightMeters = height * 0.01
      const bmi = Math.round(weight / (heightMeters * heightMeters))
      return {
        bmi: bmi,
        weight: weight,
        height: height
      }
    }
  )
  return {
    DOM: state$.map(state =>
      div([
        div([
          label('Weight: ' + state.weight + 'kg'),
          input('.weight', {type: 'range', min: 40, max: 150, value: state.weight})
        ]),
        div([
          label('Height: ' + state.height + 'cm'),
          input('.height', {type: 'range', min: 140, max: 220, value: state.height})
        ]),
        h2('BMI is ' + state.bmi)
      ])
    )
  }
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver()
}

Cycle.run(main, drivers)


