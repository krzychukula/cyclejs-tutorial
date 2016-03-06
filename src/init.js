
import Rx from 'rx'

// Logic (functional)
function main () {
  return {
    DOM: Rx.Observable.timer(0, 1000)
            .map(i => `Seconds elapses ${i}`),
    Log: Rx.Observable.timer(0, 2000).map(i => 2 * i)
  }
}

// drivers (imperative)
function DOMDriver (text$) {
  text$.subscribe(text => {
    const container = document.querySelector('#app')
    container.textContent = text
  })
}

function consoleLogDriver (msg$) {
  msg$.subscribe(msg => console.log(msg))
}

function run (mainFn, drivers) {
  const sink = mainFn()

  Object.keys(drivers).forEach(key => {
    drivers[key](sink[key])
  })
}

const drivers = {
  DOM: DOMDriver,
  Log: consoleLogDriver
}

run(main, drivers)


