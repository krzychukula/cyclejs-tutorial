
import Rx from 'rx'
import Cycle from '@cycle/core'
import {label, input, h2, div, makeDOMDriver} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http'

function intent (DOMSource) {
  const changeWeight$ = DOMSource.select('.weight').events('input')
    .map(ev => ev.target.value)
  const changeHeight$ = DOMSource.select('.height').events('input')
    .map(ev => ev.target.value)
  return {
    changeWeight$,
    changeHeight$
  }
}

function model (changeWeight$, changeHeight$) {
  return Rx.Observable.combineLatest(
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
}

function view (state$) {
  return state$.map(state =>
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
// dom read efffect: detect slider change
// racalcualate bmi
// dom write effect: display bmi
function main (sources) {
  const {changeWeight$, changeHeight$} = intent(sources.DOM)
  const state$ = model(changeWeight$, changeHeight$)
  const vtree$ = view(state$)

  return {
    DOM: vtree$
  }
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver()
}

Cycle.run(main, drivers)


