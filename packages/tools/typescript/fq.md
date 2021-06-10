---
nav:
  title: 工程化
  path: /typescript
group:
  title: 深入学习
  path: /depth
---

# Typescript 实践中问题总结

## 关于类型收缩

> [摘取案例出处](https://jkchao.github.io/typescript-book-chinese/typings/typeGuard.html#%E5%AD%97%E9%9D%A2%E9%87%8F%E7%B1%BB%E5%9E%8B%E4%BF%9D%E6%8A%A4)

### 类型断言

```ts
interface Foo {
  bar: number;
  bas: string;
}

const foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';
```

### 类型守卫

- **typeof**

```ts
function doSome(x: number | string) {
  if (typeof x === 'string') {
    // 在这个块中，TypeScript 知道 `x` 的类型必须是 `string`
    console.log(x.subtr(1)); // Error: 'subtr' 方法并没有存在于 `string` 上
    console.log(x.substr(1)); // ok
  }

  x.substr(1); // Error: 无法保证 `x` 是 `string` 类型
}
```

- **instanceof**

```ts
class Foo {
  foo = 123;
  common = '123';
}

class Bar {
  bar = 123;
  common = '123';
}

function doStuff(arg: Foo | Bar) {
  if (arg instanceof Foo) {
    console.log(arg.foo); // ok
    console.log(arg.bar); // Error
  } else {
    // 这个块中，一定是 'Bar'
    console.log(arg.foo); // Error
    console.log(arg.bar); // ok
  }
}

doStuff(new Foo());
```

- **in**

```ts
interface A {
  x: number;
}

interface B {
  y: string;
}

function doStuff(q: A | B) {
  if ('x' in q) {
    // q: A
  } else {
    // q: B
  }
}
```

- **字面量类型保护**

```ts
type Man = {
  handsome: 'handsome';
  type: 'man';
};

type Woman = {
  beautiful: 'beautiful';
  type: 'woman';
};

function Human(arg: Man | Woman) {
  if (arg.type === 'man') {
    console.log(arg.handsome);

    console.log(arg.beautiful); // error
  } else {
    // 这一块中一定是 Woman
    console.log(arg.beautiful);
  }
}
```

### 双重断言

```ts
function handler(event: Event) {
  const element = event as HTMLElement; // Error: 'Event' 和 'HTMLElement' 中的任何一个都不能赋值给另外一个
}

function handler(event: Event) {
  const element = event as any as HTMLElement; // ok
}
```

## 常用工具函数

> [具体看这里](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)

### Partial

将所有属性都设置未可选的类型。将返回给定类型的所有子集的类型

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};

interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: 'organize desk',
  description: 'clear clutter',
};

const todo2 = updateTodo(todo1, {
  description: 'throw out trash', //👍
});
```

### Readonly

所有属性都设置为只读，因此属性值不能被赋值。

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Foo = {
  readonly bar: number;
  readonly bas: number;
};

// 初始化
const foo: Foo = { bar: 123, bas: 456 };

// 不能被改变
foo.bar = 456; // Error: foo.bar 为仅读属性
```

### Record

用于将一个类型属性映射到另一个类型。

```ts
type Record<K extends string, T> = {
  [P in K]: T;
};

interface CatInfo {
  age: number;
  breed: string;
}

type CatName = 'miffy' | 'boris' | 'mordred';

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' },
};

cats.boris;
// ^ = const cats: Record<CatName, CatInfo>
```

### Pick

从一个构造对象中挑选类型

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};

todo;
// ^ = const todo: TodoPreview
```

### Omit

从一个构造对象中移除某些属性

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, 'description'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};

todo;
// ^ = const todo: TodoPreview
```

### Exclude

Exclude<Type, ExcludedUnion> 去除`Type`中包含`ExcludedUnion`的属性

```ts
type T0 = Exclude<'a' | 'b' | 'c', 'a'>;
//    ^ = type T0 = "b" | "c"
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>;
//    ^ = type T1 = "c"
type T2 = Exclude<string | number | (() => void), Function>;
//    ^ = type T2 = string | number
```

### Extract

Extract<Type, Union> 取`Type`和`Union`都存在的属性

```ts
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>;
//    ^ = type T0 = "a"
type T1 = Extract<string | number | (() => void), Function>;
//    ^ = type T1 = () => void
```

### ReturnType

构造一个由函数类型的返回类型组成的类型。

```ts
type T0 = ReturnType<() => string>;
//    ^ = type T0 = string
type T1 = ReturnType<(s: string) => void>;
//    ^ = type T1 = void
type T2 = ReturnType<<T>() => T>;
//    ^ = type T2 = unknown
```

### Parameters<type>

取出函数参数作为类型。

```ts
type T1 = Parameters<(a: string) => void>;
// [a:string]
type T2 = Parameters<() => {}>;
// []

declare function f1(arg: { a: number; b: string }): void;
type T3 = Parameters<typeof f1>;
// [arg:{a:number,b:string}]
```

### NonNullable<Type>

去除 null、undefined

```ts
type T0 = NonNullable<string | null | undefined | number>;
// type T0=string| number
```

###

## Unknown vs Any 区别

> [详情查看原文](https://wanago.io/2020/01/27/understanding-any-and-unknown-in-typescript-difference-between-never-and-void/)

Any: 是所有类型的 [top type](https://en.wikipedia.org/wiki/Top_type) 即所有类型都可以赋值给它。

```ts
let uncertain: any = 'Hello world'!;
uncertain = 5;
uncertain = { hello: () => 'Hello world!' };
```

同时使用`any`也意味这放弃了 Typescript 类型检查

```ts
const uncertain: any = 'Hello world!';
uncertain.hello(); //TypeError: uncertain.hello is not a function
```

Unknown: 该类型也被认为是`top type`,但它更具有类型安全。所有类型都可以赋值给它就像`any`一样

```ts
let uncertain: unknown = 'Hello'!;
uncertain = 12;
uncertain = { hello: () => 'Hello!' };
```

```ts
const dog: unknown = getDog();
dog.hello(); // Unable to compile TypeScript: Property ‘hello’ does not exist on type ‘unknown’.
```

```ts
const number: unknown = 15;
(number as string).toLowerCase(); // TypeError: number.toLowerCase is not a function
```

总结: unknown 类型要安全得多，因为它迫使我们执行额外的类型检查来对变量执行操作。

## Void vs Never 区别

1. 若函数没有 `return`我们会收到 undefined,为了忽略它我们使用 `void`表示
2. 若函数由于某些原因(loop、Error)不会返回,我们将使用`Never`表示返回值

```ts
function sayHello(): void {
  console.log('Hello world!');
}

function throwUserNotFoundError(userId: number): never {
  throw new Error(`User with id ${userId} is not found`);
}
```

## Type vs Interface 区别

interface 是接口，type 是类型，本身就是两个概念，只是碰巧表现上比较相似。

希望定义一个变量类型，就用 type，如果希望是能够继承并约束的，就用 interface。

如果你不知道该用哪个，说明你只是想定义一个类型而非接口，所以应该用 type。
