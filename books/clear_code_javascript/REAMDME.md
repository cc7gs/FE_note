# JavaScript 代码简洁之道

__本文并不是代码风格指南,而是关于代码的 ==可读性==、==复用性==、==扩展性== 探讨__
## 目录
1. [变量](#变量)
2. [函数](#函数)
3. [对象和数据结构](#对象和数据结构)
4. [类](#类)
5. [SOLID](#SOLID)
6. [测试](#测试)
7. [异步](#异步)
8. [错误处理](#错误处理)
9. [代码风格](#代码风格)
10. [注释](#注释)

## 变量
### 用有意义且有含义的单词命名变量

**Bad:**
```javasript
const yyyymmdstr=moment.format('YYYY/MM/DD');
```
**Good:**
```javascript
const currentDate=moment().format('YYYY/MM/DD');
```
**[回到顶部](#目录)**

### 保持统一
  
  当一个功能在项目中不同文件夹中出现时,此时我们应该保证该命名的统一。
 
**Bad:**
```javascript
getUserInfo()
getClientData()
getCustomerRecord()
```
**Good:**
```javascript
getUser()
```
**[回到顶部](#目录)**

### 每个变量都该命名

可以使用[buddy.js](https://github.com/danielstjules/buddy.js)或者
[ESLint](https://github.com/eslint/eslint/blob/660e0918933e6e7fede26bc675a0763a6b357c94/docs/rules/no-magic-numbers.md)检测代码中未命名的常量

**Bad:**

```javascript
setTimeout(blastOff,864000000);
```
**Good:**
```javascript
const MILLISECONDS_IN_A_DAY = 86400000; 

setTimeout(blastOff, MILLISECONDS_IN_A_DAY);
```

### 使用有意义的变量名

**Bad:**
```javascript
const address = 'One Infinite Loop, Cupertino 95014';
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
saveCityZipCode(address.match(cityZipCodeRegex)[1], address.match(cityZipCodeRegex)[2]);
```

**Good:**
```javascript
const address = 'One Infinite Loop, Cupertino 95014';
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
const [, city, zipCode] = address.match(cityZipCodeRegex) || [];
saveCity
```
**[回到顶部](#目录)**
### 直截了当
避免需要通过上下文来推断的变量，显式优于隐式
**Bad:**
```javascript
const locations = ['Austin', 'New York', 'San Francisco'];
locations.forEach((l) => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // ...
  // 1 是什么?
  dispatch(l);
});
```

**Good:**
```javascript
const locations = ['Austin', 'New York', 'San Francisco'];
locations.forEach((location) => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // ...
  dispatch(location);
});
```
**[回到顶部](#目录)**
### 避免重复的描述
当类/对象名已经有意义时，对其变量进行命名不需要再次重复。

**Bad:**
``` javascript
var Car={
    carMake:'Honda',
    carModel:'Accord',
    carColor:'Blue'
}
function painCar(car){
    car.carColor='red'
}
```
**Good:**
``` javascript
var Car={
    make:'Honda',
    model:'Accord',
    color:'Blue'
}
function paintCar(car){
    car.color='Red';
}
```
**[回到顶部](#目录)**

### 使用默认值

**Bad:**
```javascript
function createMicrobrewery(name) {
  const breweryName = name || 'Hipster Brew Co.';
  // ...
}
```
**Good:**
```javascript
function createMicrobrewery(name = 'Hipster Brew Co.') {
  // ...
}
```
**[回到顶部](#目录)**

## 函数
### 函数参数
 理想情况下函数参数不应该超过3个,如果超过3个以上，此时我们应该通过**es6解构**或者将这些参数**封装成一个对象**
 **Bad:**
 ```javascript
 function createMenu(title,body,buttonText,cancellable){
   //....
 }
 ```
 **Good:**
 ```javascript
  function createMenu({title,body,buttonText,cancellable}){
   //....
 }
 createMenu({
   title:'Foo',
   body:'Bar',
   buttonText:'Baz',
   cancelable:true
 })

//参数封装对象形式
var menuConfig={
    title:'Foo',
   body:'Bar',
   buttonText:'Baz',
   cancelable:true
}
function createMenu(menuConfig){
  //...
}
```
### 功能单一
这是软件功能中最重要的原则之一。

功能不单一的函数将导致难以重构、测试和理解。功能单一的函数易于重构，并使代码更加干净。
**Bad:**
```javascript
function emailClients(clients){
  clients.forEach(client=>{
    let clientRecord=database.lookup(client);
    if(clientRecord.isActive()){
      email(client);
    }
  })
}
```
**Good:**
```javascript
function emailClients(clients){
  clients.forEach(client=>{
    emailClientIfNeeded(client);
  })
}
function emailClientIfNeeded(client){
    if(isClientActive(client)){
        email(client);
    }
}
function isClientActive(client){
  let clientRecord=database.lookup(client);
  return clientRecord.isActive(); 
}
```
**[回到顶部](#目录)**

### 函数名表明其功能
**Bad:**
```javascript
function addToDate(date, month) {
  // ...
}

const date = new Date();

// It's hard to tell from the function name what is added
addToDate(date, 1);
```

**Good:**
```javascript
function addMonthToDate(month, date) {
  // ...
}

const date = new Date();
addMonthToDate(1, date);
```
### 函数应该只做一层抽象
当函数需要的抽象多于一层时通常意味着函数功能过于复杂，需要将其进行分解以提高其可重用性和可测试性。

**Bad:**
```javascript
function parseBatterJsAlternative(code){
    const  REGEXES=[
    //...
  ];
  const statements=code.split(' ');
  const tokens=[];
  REGEXES.forEach((REGEX)=>{
     statements.forEach((statements)=>{
       //...
     });
  });
  const ast=[];
  tokens.forEach((token)=>{
    //let...
  });
  ast.forEach((node)=>{
    //...
  });
}
```
**Good:**
```javascript
function parseBetterJSAlternative(code) {
  const tokens = tokenize(code);
  const ast = lexer(tokens);
  ast.forEach((node) => {
    // parse...
  });
}

function tokenize(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(' ');
  const tokens = [];
  REGEXES.forEach((REGEX) => {
    statements.forEach((statement) => {
      tokens.push( /* ... */ );
    });
  });

  return tokens;
}

function lexer(tokens) {
  const ast = [];
  tokens.forEach((token) => {
    ast.push( /* ... */ );
  });

  return ast;
}
```
### 删除重复代码
很多时候在一个函数中由于一两点的不同，让我们去重新写一个函数。
要想优化重复代码需要有较强的抽象能力，错误的抽象还不如重复代码。所以在抽象过程中必须要遵循 [SOLID](#SOLID) 原则
**Bad:**
```javascript
function showDeveloperList(developers) {
  developers.forEach((developer) => {
    const expectedSalary = developer.calculateExpectedSalary();
    const experience = developer.getExperience();
    const githubLink = developer.getGithubLink();
    const data = {
      expectedSalary,
      experience,
      githubLink
    };

    render(data);
  });
}

function showManagerList(managers) {
  managers.forEach((manager) => {
    const expectedSalary = manager.calculateExpectedSalary();
    const experience = manager.getExperience();
    const portfolio = manager.getMBAProjects();
    const data = {
      expectedSalary,
      experience,
      portfolio
    };

    render(data);
  });
}
```

**Good:**
```javascript
function showEmployeeList(employees) {
  employees.forEach((employee) => {
    const expectedSalary = employee.calculateExpectedSalary();
    const experience = employee.getExperience();

    const data = {
      expectedSalary,
      experience
    };

    switch (employee.type) {
      case 'manager':
        data.portfolio = employee.getMBAProjects();
        break;
      case 'developer':
        data.githubLink = employee.getGithubLink();
        break;
    }

    render(data);
  });
}
```
**[回到顶部](#目录)**

### 使用OBject.assign 设置默认属性
**Bad:**

```javascript
const menuConfig={
  title:null,
  body:'Bar',
  buttonText:null,
  cancellable:true
};
function createMenu(config){
    config.title=config.title||'Foo';
    config.body = config.body || 'Bar';
    config.buttonText = config.buttonText || 'Baz';
    config.cancellable = config.cancellable !== undefined ? config.cancellable : true;
};
createMenu(menuConfig);
```
**Good:**
```javascript
const menuConfig={
  title:'Order',
  //body key 缺失
  buttonText:'Send',
  cancellable:true
};
unction createMenu(config){
    config=Object.assign({
      title: 'Foo',
      body: 'Bar',
      buttonText: 'Baz',
     cancellable: true
    },config);
    //config 变成:{title:'Order',body:'Bar',buttonText:'Send',cancelable:true}
};
createMenu(menuConfig);
```

**[回到顶部](#目录)**

### 不要用flag作为参数
通过 flag的true或false,来判读执行逻辑，违反了一个函数干一件事的原则，因此要拆分该函数。

**Bad:**
```javascript
function createFile(name, temp) {
  if (temp) {
    fs.create(`./temp/${name}`);
  } else {
    fs.create(name);
  }
}
```

**Good:**
```javascript
function createFile(name) {
  fs.create(name);
}

function createTempFile(name) {
  createFile(`./temp/${name}`);
}
```
**[回到顶部](#目录)**

### 避免副作用（第一部分）
 函数接受一个值返回一个新值，除此之外的行为我们都称为副作用，比如修改全局变量、对文件进行IO操作等。
 
 当函数确定需要副作用时，请不要用多个函数/类进行文件操作，有且仅用一个函数/类来处理。

 副作用的三大天坑：随意修改可变数据类型、随意分享没有数据结构的状态、没有在统一地方处理副作用。

 **Bad:**
```javascript
// 全局变量被一个函数引用
// 现在这个变量从字符串变成了数组，如果有其他的函数引用，会发生无法预见的错误。
let name = 'Ryan McDermott';

function splitIntoFirstAndLastName() {
  //变成了数组，此时会有不可预测的错误
  name = name.split(' ');
}

splitIntoFirstAndLastName();

console.log(name); // ['Ryan', 'McDermott'];
```

**Good:**
```javascript
function splitIntoFirstAndLastName(name) {
  return name.split(' ');
}

const name = 'Ryan McDermott';
const newName = splitIntoFirstAndLastName(name);

console.log(name); // 'Ryan McDermott';
console.log(newName); // ['Ryan', 'McDermott'];
```

**[回到顶部](#目录)**

### 避免副作用（第二部分）
在 JavaScript中,基本类型通过赋值传递,对象和数组通过引用传递.以引用传递为例：
假如我们写一个购物车，通过 `addItemToCart()` 方法添加商品到购物车，修改`cart`数组。此时调用`purchase()`方法购买，由于引用传递,获取的购物车数组 正好是最新的数据。

那么我们来看一种坏情况:
  用户点击购买时,该按钮调用`purchase()`功能产生网络请求并将`cart`数组数据发送到服务器。因为糟糕的网络连接，`purchase()`功能必须继续重试请求。现在用户又继续添加新的商品,这时网络恢复，那么`purchase()`方法获取到的`cart`数组就是错误的。

  为了避免这种问题,我们需要每次新增商品时,克隆`cart`数组并返回新的数组。
**Bad:**
```javascript
const addItemToCart = (cart, item) => {
  cart.push({ item, date: Date.now() });
};
```

**Good:**
```javascript
const addItemToCart = (cart, item) => {
  return [...cart, { item, date: Date.now() }];
};
```
**[回到顶部](#目录)**

### 不要全局函数
在 JS 中污染全局是一个非常不好的实践，这么做可能和其他库起冲突。

想象以下例子：如果你想扩展 JS 中的`Array`，为其添加一个 `diff` 函数显示两个数组间的差异，此时应如何去做？你可以将`diff` 写入 `Array.prototype`，但这么做会和其他有类似需求的库造成冲突。如果另一个库对 `diff` 的需求为比较一个数组中首尾元素间的差异呢？

使用 ES6 中的 class 对全局的 Array 做简单的扩展显然是一个更棒的选择。

**Bad:**
```javascript
Array.prototype.diff = function diff(comparisonArray) {
  const hash = new Set(comparisonArray);
  return this.filter(elem => !hash.has(elem));
};
```

**Good:**
```javascript
class SuperArray extends Array {
  diff(comparisonArray) {
    const hash = new Set(comparisonArray);
    return this.filter(elem => !hash.has(elem));
  }
}
```
**[回到顶部](#目录)**

### 采用函数式编程
 函数式的编程具有更干净且便于测试的特点,尽可能使用这种风格。

 **Bad:**
```javascript
const programmerOutput = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];

let totalOutput = 0;

for (let i = 0; i < programmerOutput.length; i++) {
  totalOutput += programmerOutput[i].linesOfCode;
}
```
**Good:**
```javascript
const programmerOutput = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];

const totalOutput = programmerOutput
  .map(output => output.linesOfCode)
  .reduce((totalLines, lines) => totalLines + lines,0);

```
**[回到顶部](#目录)**

### 封装条件语句
**Bad:**
```javascript
if (fsm.state === 'fetching' && isEmpty(listNode)) {
  // ...
}
```

**Good:**
```javascript
function shouldShowSpinner(fsm, listNode) {
  return fsm.state === 'fetching' && isEmpty(listNode);
}

if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
  // ...
}
```
### 尽量别"否定情况"

**Bad:**
```javascript
function isDOMNodeNotPresent(node) {
  // ...
}

if (!isDOMNodeNotPresent(node)) {
  // ...
}
```

**Good:**
```javascript
function isDOMNodePresent(node) {
  // ...
}

if (isDOMNodePresent(node)) {
  // ...
}
```
### 避免条件判断

这看起来似乎不太可能。

大多人听到这的第一反应是：“怎么可能不用 if 完成其他功能呢？”许多情况下通过使用多态(polymorphism)可以达到同样的目的。

第二个问题在于采用这种方式的原因是什么。答案是我们之前提到过的：保持函数功能的单一性。
**Bad:**
```javascript
class Airplane {
  // ...
  getCruisingAltitude() {
    switch (this.type) {
      case '777':
        return this.getMaxAltitude() - this.getPassengerCount();
      case 'Air Force One':
        return this.getMaxAltitude();
      case 'Cessna':
        return this.getMaxAltitude() - this.getFuelExpenditure();
    }
  }
}
```

**Good:**

```javascript
class Airplane {
  // ...
}

class Boeing777 extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getPassengerCount();
  }
}

class AirForceOne extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude();
  }
}

class Cessna extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getFuelExpenditure();
  }
}
```
**[回到顶部](#目录)**

### 避免类型判断(第一部分)
JS 是弱类型语言,这意味着函数可接受任意类型的参数。
有时候会给我们带来麻烦，我们就会用类型判读类避免这些情况发生。仔细想想是你真的需要检查类型还是你的 API 设计有问题？

**Bad:**
```javascript
function travelToTexas(vehicle) {
  if (vehicle instanceof Bicycle) {
    vehicle.pedal(this.currentLocation, new Location('texas'));
  } else if (vehicle instanceof Car) {
    vehicle.drive(this.currentLocation, new Location('texas'));
  }
}
```

**Good:**
```javascript
function travelToTexas(vehicle) {
  vehicle.move(this.currentLocation, new Location('texas'));
}
```

### 避免类型判读(第二部分)
如果你需要做静态类型检查，比如字符串、整数等，推荐使用 TypeScript，不然你的代码会变得又臭又长。
**Bad:**
```javascript
function combine(val1, val2) {
  if (typeof val1 === 'number' && typeof val2 === 'number' ||
      typeof val1 === 'string' && typeof val2 === 'string') {
    return val1 + val2;
  }

  throw new Error('Must be of type String or Number');
}
```

**Good:**
```javascript
function combine(val1, val2) {
  return val1 + val2;
}
```
**[回到顶部](#目录)**

### 避免过度优化
现代的浏览器在运行时会对代码自动进行优化。有时人为对代码进行优化可能是在浪费时间。这里可以找到许多真正需要优化的地方[点击这里](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers)
**Bad:**
```javascript

// 这里使用变量len是因为在老式浏览器中，
// 直接使用正例中的方式会导致每次循环均重复计算list.length的值，
// 现代浏览器已对此做了优化。
for (let i = 0, len = list.length; i < len; i++) {
  // ...
}
```

**Good:**
```javascript
for (let i = 0; i < list.length; i++) {
  // ...
}
```
### 删除无效代码
不再被调用的代码应及时删除。

**Bad:**
```javascript
function oldRequestModule(url) {
  // ...
}

function newRequestModule(url) {
  // ...
}

const req = newRequestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');

```

**Good:**
```javascript
function newRequestModule(url) {
  // ...
}

const req = newRequestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');
```

**完成进度**

- [x]  变量
- [x]  函数
