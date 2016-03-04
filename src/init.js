
import Rx from 'rx'

// Logic (functional)
function main () {
  return Rx.Observable.timer(0, 1000)
    .map(i => `Seconds elapses ${i}`)
}

// Effects (imperative)
function DOMEffects (text$) {
  text$.subscribe(text => {
    const container = document.querySelector('#app')
    container.textContent = text
  })
}

function consoleLogEffect (msg$) {
  msg$.subscribe(msg => console.log(msg))
}

const sink = main()
DOMEffects(sink)
consoleLogEffect(sink)
