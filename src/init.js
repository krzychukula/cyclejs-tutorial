// import Rx from 'rxjs/Rx';
//
// Rx.Observable.of(1,2,3)

import {Observable} from 'rxjs/Observable'
// import {map} from 'rxjs/operator/map';
// Observable.of(1,2,3)::map(x => x + '!!!'); // etc
import 'rxjs/add/operator/map'

Observable.timer(0, 1000)
  .map(i => `Seconds elapses ${i}`)
  .subscribe(text => {
    const container = document.querySelector('#app')
    container.textContent = text
  })
