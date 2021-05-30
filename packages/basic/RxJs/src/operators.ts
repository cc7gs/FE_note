import {from} from 'rxjs'
import {map,filter,delay} from 'rxjs/operators'

import {addItem} from './utils'

let numersObservable=from([1,2,3,4,5]);
let squaredNumbers=numersObservable.pipe(
    filter(val=>val>2),
    delay(1000),
    map(val=>val*val)
);

let subscription=squaredNumbers.subscribe(result=>{
    addItem(result)
})
// subscription.unsubscribe();
 