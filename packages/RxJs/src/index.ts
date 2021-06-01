import { from, Observable } from 'rxjs';
require('./operators');

const observable = from([1, 2, 3]);
const subscription = observable.subscribe((x) => console.log('from', x));

subscription.unsubscribe();

//清除功能的 observable

const intervalOb = new Observable(function subscribe(subscriber) {
  let intervalId = setInterval(() => {
    subscriber.next('h1');
  }, 1000);

  return function unsubscribe() {
    console.log('clear');
    clearInterval(intervalId);
  };
});

let un = intervalOb.subscribe((x) => console.log(x));
//leater

un.unsubscribe();

//和下面类似 👇

interface Sub {
  next: (v: any) => void;
}
function subscribe(subscriber: Sub) {
  const intervalId = setInterval(() => {
    subscriber.next('h1');
  }, 1000);
  return function unsubscribe() {
    clearInterval(intervalId);
  };
}
// const unsubscribe =subscribe({next:(x)=>{console.log(x)}});

// //later
// unsubscribe();
