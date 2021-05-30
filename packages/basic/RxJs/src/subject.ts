import {Subject} from 'rxjs'

const subject=new Subject<number>();

subject.subscribe({next:(x)=>{console.log('观察这A',x)}})

subject.subscribe({next:(x)=>{console.log('观察者B',x)}})

subject.next(1);
subject.next(2);