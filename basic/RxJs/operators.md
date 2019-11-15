# 熟悉操作符(Operators)
例如，被调用的运算符map类似于同名的Array方法。就像[1, 2, 3].map(x => x * x) 一样输出[1, 4, 9]，Observable创建如下：

```js
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

map(x => x * x)(of(1, 2, 3)).subscribe((v) => console.log(`value: ${v}`));

// Logs:
// value: 1 
// value: 4
// value: 9
```