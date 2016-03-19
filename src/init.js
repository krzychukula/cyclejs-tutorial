
import Rx from 'rx'
import Cycle from '@cycle/core'
import {label, input, div, makeDOMDriver} from '@cycle/dom'
import {makeHTTPDriver} from '@cycle/http'

function intent (DOMSource) {
  return DOMSource.select('.slider').events('input')
    .map(ev => ev.target.value)
}
function model (newValue$, props$) {
  const initialValue$ = props$.map(p => p.init).first()
  const value$ = initialValue$.concat(newValue$)

  return Rx.Observable.combineLatest(value$, props$, (value, props) => {
    return {
      label: props.label,
      unit: props.unit,
      min: props.min,
      max: props.max,
      value: value
    }
  })
}
function view (state$) {
  return state$.map(state =>
    div('.labeled-slider', [
      label('.label', `${state.label}: ${state.value}${state.unit}`),
      input('.slider', {
        type: 'range',
        min: state.min,
        max: state.max,
        value: state.value
      })
    ])
  )
}
function LabeledSlider (sources) {
  const change$ = intent(sources.DOM)
  const state$ = model(change$, sources.props)
  const vtree$ = view(state$)
  return {
    DOM: vtree$
  }
}

function main (sources) {
  const props$ = Rx.Observable.of({
    label: 'Height',
    unit: 'cm',
    min: 140,
    max: 220,
    init: 170
  })
  return LabeledSlider({
    DOM: sources.DOM,
    props: props$
  })
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver()
}

Cycle.run(main, drivers)
