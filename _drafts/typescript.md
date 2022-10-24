---
title: TypeScript 初级
---

## 特性

- 优点
  - 趋势
  - 可以发现 15% 的常见 bug
  - 让代码的可读性更好，可以更好的理解代码是在做什么
  - 可以对 JavaScript 有更好的理解和新的视角
- 缺点
  - 编写时间比 JavaScript 要长，因为你必须要指定类型，对于一些较小的独立项目，可能不值使用
  - 需要编译，项目越大消耗时间越长

## 类型

JavaScript 7 种原始类型：

- undefined
- null
- string
- number
- bigint
- boolean
- symbol

### 类型注释

在 TypeScript 中，我们可以在声明一个变量之后设置我们想要添加的类型 `:type` (一般称之为「类型注释」或「类型签名」)

```ts
let id: number;
let firstName: string = "test";
let hasDog: boolean = true;
```

### 类型推断

如果变量有默认值的话，也可以不显式声明类型，TypeScript 会自动推断变量的类型（类型推断）

```ts
let id = 5; // number 类型
```

### 联合类型

可以将变量设置为联合类型（联合类型是可以分配多个类型的变量）

```ts
let age: string | number;
age = 17;
age = "17";
```

## TypeScript 中的数组

在 TypeScript 中，可以定义数组包含的数据类型：

```ts
let ids: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Tony", "Tom"];
let options: boolean[] = [true, false];
let books: object[] = [
  { name: "Tom", age: 1 },
  { name: "Tony", age: 12 },
];

let arr: ang[] = ["hello", 1, true];

ids.push(6);
ids.push("7"); // ERROR: Argument of type 'string' is not assignable to parameter of type 'number'
```

也可以使用联合类型来定义包含多种类型的数组

```ts
let person: (string | number | boolean)[] = ["Tom", 1, true];
```

如果数组有默认值，也会进行类型推断：

```ts
let person = ["Tom", 1, true];
person[0] = 100;
person[1] = { name: "Tony" }; // Error - person array can't contain objects
```

### 元组（Tuple）

TypeScript 中可以定义一种特殊类型的数组：元组（Tuple）。元组是具有固定大小和已知数据类型的数组，它比常规数组更严格

```ts
let person: [string, number, boolean] = ["Tom", 1, true];
person[0] = 17; // Error - Value at index 0 can only be a string
```

## TypeScript 中的对象

必须拥有正确的属性和值类型：

```ts
// 使用特定的对象类型注释声明一个名为 person 的变量
let person: {
  name: string;
  age: number;
  isProgrammer: boolean;
};

// 给 person 分配一个具有所有必要属性和值类型的对象
person = {
  name: "Tom",
  age: 17,
  isProgrammer: true,
};

person.age = "17"; // Error: should be a number

person = {
  name: "Tom",
  age: 3,
};
// Error: missing the isProgrammer property
```

在定义对象的类型时，我们通常会使用 interface。如果我们需要检查多个对象是否具有相同的特定属性和值类型时，是很有用的：

```ts
interface Person {
  name: string;
  age: nmber;
  isProgrammer: boolean;
}

let person1: Person = {
  name: "Tom",
  age: 3,
  isProgrammer: false,
};
```

我们还可以用函数的类型签名声明一个函数属性，通用函数（sayHi）和箭头函数（sayBye）都可以声明：

```ts
interface Animal {
  eat(name: string): string;
  speak: (name: string) => string;
}

let tom: Animal = {
  eat: function (name: string) {
    return `eat ${name}`;
  },
  speak: (name: string) => `speak ${name}`,
};

console.log(tom.eat("Tony"));
console.log(tom.speak("哈哈哈"));
```

需要注意的是，虽然 eat、speak 分别是用普通函数和箭头函数声明的，但是它们具体是什么样的函数类型都可以，TypeScript 是不关心这些的。

## TypeScript 中的函数

可以定义函数参数和返回值的类型：

```ts
// 定义一个名为 circle 的函数，它接受一个类型为 number 的直径变量，并返回一个字符串
function circle(diam: number): string {
  return "圆的周长为：" + Math.PI * diam;
}

console.log(circle(10)); // 圆的周长为：31.415
```

ES6 箭头函数的写法：

```ts
const circle = (diam: number): string => {
  return `圆的周长为：` + Math.PI * diam;
};
```

没必要明确声明 circle 是一个函数，TypeScript 会进行类型推断。TypeScript 还会推断函数的返回类型，但是如果函数体比较复杂，还是建议清晰的显式声明返回类型。

我们可以在参数后添加一个 ？，表示它为可选参数；另外参数的类型也可以使一个联合类型：

```ts
const add = (a: number, b: number, c?: number | string) => {
  console.log(c);
  return a + b;
};

console.log(add(5, 4, "可以是 number、string，也可以为空"));
```

如果函数没有返回值，在 TypeScript 里表示为返回 void，也不需要显式声明，TypeScript 一样可以进行类型推断：

```ts
const log = (msg: string): void => {
  console.log("打印一些内容：" + msg);
};
```

## any 类型

使用 any 类型，基本上可以将 TypeScript 恢复为 JavaScript。

如果代码里使用了大量的 any，那 TypeScript 也就失去了意义，所以应该尽量避免使用 any。

## DOM 和类型转换

TypeScript 没办法像 JavaScript 那样访问 DOM。这意味着每当我们尝试访问 DOM 元素时，TypeScript 都无法确定它们是否真的存在。

```ts
const link = document.querySelector("a");

console.log(link.href); // Error: Object is possibly 'null'. TypeScript can't be sure the anchor tag exists, as it can't access the DOM
```

使用非空断言运算符（!），我们可以明确地告诉编译器一个表达式的值不是 null 或 undefined。当编译器无法准确地进行类型推断时，这可能很有用：

```ts
// 我们明确告诉 TypeScript a 标签肯定存在
const link = document.querySelector("a")!;

console.log(link.href); // 正常输出
```

这里我们没必要声明 link 变量的类型。这是因为 TypeScript 可以通过类型推断确认它的类型为 HTMLAnchorElement。

但是如果我们需要通过 class 或 id 来选择一个 DOM 元素呢？这时 TypeScript 就没办法判断类型了：

```ts
const form = document.getElementById("signup-form");

console.log(form.method);
// ERROR: Object is possibly 'null'.
// ERROR: Property 'method' does not exist on type 'HTMLElement'.
```

我们需要告诉 TypeScript form 确定是存在的，并且我们知道它的类型是 HTMLFormElement。我们可以通过类型转换来做到这一点：

```ts
const form = document.getElementById("signup-form") as HTMLFormElement;

console.log(form.method); // post
```

TypeScript 还内置了一个 Event 对象。如果我们在表单中添加一个 submit 的事件侦听器，TypeScript 可以自动帮我们推断类型错误：

```ts
const form = document.getElementById("signup-form") as HTMLFormElement;

form.addEventListener("submit", (e: Event) => {
  e.preventDefault(); // 阻止页面刷新

  console.log(e.tarrget); // ERROR: Property 'tarrget' does not exist on type 'Event'. Did you mean 'target'?
});
```

## TypeScript 中的类

我们可以定义类中每条数据的类型：

```ts
class Person {
  name: string;
  isCool: boolean;
  age: number;

  constructor(n: string, c: boolean, a: number) {
    this.name = n;
    this.isCool = c;
    this.age = a;
  }

  sayHello() {
    return `Hi，我是 ${this.name} ，我今年 ${this.age} 岁了`;
  }
}

const person1 = new Person("ConardLi", true, 17);
const person2 = new Person("Jerry", "yes", 20); // ERROR: Argument of type 'string' is not assignable to parameter of type 'boolean'.

console.log(person1.sayHello()); // Hi, 我是 ConardLi，我今年 17 岁了
```

可以创建一个仅包含从 Person 构造的对象数组：

```ts
let People: Person[] = [person1, person2];
```

我们可以给类的属性添加访问修饰符，TypeScript 还提供了一个新的 readonly 访问修饰符。

```ts
class Person {
  readonly name: string; // 不可以变的
  private isCool: boolean; // 类的私有属性、外部访问不到
  protected email: string; // 只能从这个类和子类中进行访问和修改
  public age: number; // 任何地方都可以访问和修改

  constructor(n: string, c: boolean, a: number) {
    this.name = n;
    this.isCool = c;
    this.age = a;
  }

  sayHello() {
    return `Hi，我是 ${this.name} ，我今年 ${this.age} 岁了`;
  }
}

const person1 = new Person("ConardLi", true, "conard@xx.com", 17);
console.log(person1.name); // ConardLi
person1.name = "Jerry"; // Error: read only
```

我们可以通过下面的写法，属性会在构造函数中自动分配，我们类会更加简洁：

```ts
class Person {
  constructor(
    readonly name: string,
    private isCool: boolean,
    protected email: string,
    public age: number
  ) {}
}
```

> 如果我们省略访问修饰符，默认情况下属性都是 public，另外和 JavaScript 一样，类也是可以 extends 的。

## TypeScript 中的接口

接口定义了对象的外观：

```ts
interface Person {
  name: string;
  age: number;
}

function sayHi(person: Person) {
  console.log(`Hi ${person.name}`);
}

sayHi({
  name: "Tom",
  age: 17,
});
```

还可以使用类型别名定义对象类型：

```ts
type Person = {
  name: string;
  age: number;
};
```

或者可以直接匿名定义对象类型：

```ts
function sayHi(person: { name: string; age: number }) {
  console.log(`Hi ${person.name}`);
}
```

interface 和 type 非常相似，很多情况下它俩可以随便用。比如它们两个都可以扩展：

扩展 interface：

```ts
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear: Bear = {
  name: "Winnie",
  honey: true,
};
```

扩展 type：

```ts
type Animal = {
  name: string;
};

type Bear = Animal & {
  honey: boolean;
};

const bear: Bear = {
  name: "Winnie",
  honey: true,
};
```

但是有个比较明显的区别，interface 是可以自动合并类型的，但是 type 不支持：

```ts
interface Animal {
  name: string;
}

interface Animal {
  tail: boolean;
}

const dog: Animal = {
  name: "Tom",
  tail: true,
};
```

类型别名在创建后无法更改：

```ts
type Animal = {
  name: string;
};

type Animal = {
  tail: boolean;
}; // Error: Duplicate identifier 'Animal'
```

一般来说，当你不知道用啥的时候，默认就用 interface 就行，直到 interface 满足不了我们的需求的时候再用 type。

### 类的 interface

我们可以通过实现一个接口来告诉一个类它必须包含某些属性和方法：

```ts
interface HasFormatter {
  format(): string;
}

class Person implements HasFormatter {
  constructor(public username: string, protected password: string) {}

  format() {
    return this.username.tolocaleLowerCase();
  }
}

let person1: HasFormatter;
let person2: HasFormatter;

person1 = new Person("Tony", "admin123");
person2 = new Person("Tom", "admin123");

console.log(person1.format()); // Tony
```

确保 people 是一个 实现 HasFormatter 的对象数组（确保每 people 都有 format 方法）：

```ts
let people: HasFormatter[] = [];
people.push(person1);
people.push(person2);
```

## 泛型

泛型可以让我们创建一个可以在多种类型上工作的组件，它能够支持当前的数据类型，同时也能支持未来的数据类型，这大大提升了组件的可重用性。我们来看下面这个例子：

addID 函数接受一个任意对象，并返回一个新对象，其中包含传入对象的所有属性和值，以及一个 0 到 1000 之间随机的 id 属性。

```ts
const addID = (obj: object) => {
  let id = Math.floor(Math.random() * 1000);ss

  return { ...obj, id };
};

let person1 = addID({ name: "Tom", age: 40 });

console.log(person1.id); // 271
console.log(person1.name); // Error: Property 'name' does not exist on type '{id: number;}'.
```

当我们尝试访问 name 属性时，TypeScript 会出错。这是因为当我们将一个对象传递给 addID 时，我们并没有指定这个对象应该有什么属性 -- 所以 TypeScript 不知道这个对象有什么属性。因此，TypeScript 知道的唯一属性返回对象的 id。

那么，我们怎么将任意对象传递给 addID，而且任然可以告诉 TypeScript 该对象具有哪些属性和值？这种场景就可以使用泛型了，`<T>` - T 被称为类型参数：

```ts
// <T> 只是一种编写习惯 - 我们也可以用 <X> 或 <A>
const addID = <T>(obj: T) => {
  let id = Math.floor(Math.random() * 1000);

  return { ...obj, id };
};
```

这是啥意思呢？现在当我们再将一个对象传递给 addID 时，我们已经告诉 TypeScript 来捕获它的类型了 -- 所以 T 就变成了我们传入的任何类型。addID 现在会知道我们传入的对象上有哪些属性。

但现在有一个问题：任何东西都可以传入 addID，TypeScript 将捕获类型而且并不会报告问题：

```ts
let person1 = addID({ name: "Tom", age: 17 });
let person2 = addID("Tony"); // 传递字符串也没问题

console.log(person1.id); // 188
console.log(person1.name); // Tom

console.log(person2.id);
console.log(person2.name); // Error: Property 'name' does not exist on type '"Tom" & {id: number;}'.
```

当我们传入一个字符串时，TypeScript 没有发现任何问题。只有我们尝试访问 name 属性时才会报告错误。所以，我们需要一个约束：我们需要通过将泛型类型 T 作为 object 的扩展，来告诉 TypeScript 只能接受对象：

```ts
const addID = <T extends object>(obj: T) => {
  let id = Math.floor(Math.random() * 1000);

  return { ...obj, id };
};

let person1 = addID({ name: "Tom", age: 40 });
let person2 = addID("Jerry"); // Error: Argument of type 'string' is not assignable to parameter of type 'object'.
```

错误马上就被捕获了，但也不完全是。在 JavaScript 中，数组也是对象，所以我们仍然可以通过传入数组来逃避类型检查：

```ts
let person2 = addID(["Tom", 17]); // 传递数组没问题

console.log(person2.id); // 188
console.log(person2.name); // Error: Property 'name' does not exist on type '(string | number)[] & {id: number;}'
```

要解决这个问题，我们可以这样说：object 参数应该有一个带有字符串值的 name 属性：

```ts
const addID = <T extends { name: string }>(obj: T) => {
  let id = Math.floor(Math.random() * 1000);

  return { ...obj, id };
};

let person2 = addID(["Tom", 17]); // Error: Argument should have a name property with string value
```

泛型允许在参数和返回类型提前未知的组件中具有类型安全。

在 TypeScript 中，泛型用于描述两个值之间的对应关系。在上面的例子中，返回类型与输入类型有关。我们用一个泛型来描述对应关系。

另一个例子：如果需要接受多个类型的函数，最好使用泛型而不是 any。下面展示了使用 any 的问题：

```ts
function logLength(a: any) {
  console.log(a.length); // No error
  return a;
}

let hello = "Hello World";
logLength(hello); // 11

let howMany = 8;
logLength(howMany); // undefined (but no TypeScript error - surely we want TypeScript to tell us we've tried to access a length property on a number!)
```

我们可以尝试使用泛型：

```ts
function logLength<T>(a: T) {
  console.log(a.length); // Error: TypeScript isn't certain that `a` is a value whith a length property
  return a;
}
```

我们现在得到了一些反馈，可以帮助我们持续改进我们的代码。

解决方案：使用一个泛型来扩展一个接口，确保传入的每个参数都有一个 length 属性：

```ts
interface hasLength {
  length: number;
}

function logLength<T extends hasLength>(a: T) {
  console.log(a.length);
  return a;
}

let hello = "Hello world";
logLength(hello); // 11

let howMany = 8;
logLength(howMany); // Error: numbers don't have length properties
```

我们也可以编写这样一个函数，它的参数是一个元素数组，这些元素都有一个 length 属性：

```ts
interface hasLength {
  length: number;
}

function logLengths<T extends hasLength>(a: T[]) {
  a.forEach((element) => {
    console.log(element.length);
  });
}

let arr = [
  "This string has a length prop",
  ["This", "arr", "has", "length"],
  { material: "plastic", length: 17 },
];

logLengths(arr);
// 29
// 4
// 30
```

泛型是 TypeScript 的一个很棒的特性！

### 泛型接口

当我们不知道对象中的某个值是什么类型时，可以使用泛型来传递该类型：

```ts
// The type, T, will be passed in
interface Person<T> {
  name: string;
  age: number;
  documents: T;
}

// We have to pass in the type of `documents` - an array of strings in this case
const person1: Person<string[]> = {
  name: "Tom",
  age: 17,
  documents: ["passport", "bank statement", "visa"],
};

// Again, we implement the `Person` interface, and pass in the type for documents - in this case a string
const person2: Person<string> = {
  name: "Tony",
  age: 20,
  documents: "passport, P45",
};
```

## 枚举

枚举是 TypeScript 给 JavaScript 带来的一个特殊特性。枚举允许我们定义或声明一组相关值，可以是数字或字符串，作为一组命名常量。

```ts
enum ResourceType {
  BOOK,
  AUTHOR,
  FILM,
  DIRECTOR,
  PERSON,
}

console.log(ResourceType.Book); // 0
console.log(ResourceType.AUTHOR); // 1

// 从 1 开始
enum ResourceType {
  BOOK = 1,
  AUTHOR,
  FILM,
  DIRECTOR,
  PERSON,
}

console.log(ResourceType.BOOK); // 1
console.log(ResourceType.AUTHOR); // 2
```

默认情况下，枚举是基于数字的 -- 它们将字符串值存储为数字。但它们也可以是字符串：

```ts
enum Direction {
  Up = "Up",
  Right = "Right",
  Down = "Down",
  Left = "Left",
}

console.log(Direction.Right); // Right
console.log(Direction.Down); // Down
```

当我们有一组相关的常量时，枚举就可以派上用场了。例如，与在代码中使用非描述性数字不同，枚举通过描述性常量使用代码更具可读性。

枚举还可以防止错误，因为当你输入枚举的名称时，智能提示将弹出可能选择的选项列表。

## TypeScript 严格模式

建议在 tsconfig.json 中启用所有严格的类型检查操作文件。这可能会导致 TypeScript 报告更多的错误，但也更助于帮助你提前发现程序中更多的 bug。

```ts
// tsconfig.json
'strict': true
```

> 严格模式实际上就意味着：禁止隐式 any 和严格的空检查。

### 禁止隐式 any

在下面的函数中，TypeScript 已经推断出参数 a 是 any 类型的。当我们向该函数传递一个数字。并尝试打印一个 name 属性时，没有报错：

```ts
function logName(a) {
  // No error??
  console.log(a.name);
}

logName(97);
```

打开 noImplicitAny 选项后，如果我们没有显式地声明 a 的类型，TypeScript 将立即标记一个错误：

```ts
// Error: Parameter 'a' implicitly has an 'any' type.
function logName(a) {
  console.log(a.name);
}
```

### 严格的空检查

当 strictNullChecks 选项为 false 时，TypeScript 实际上会忽略 null 和 undefined。这可能会在运行时导致意外错误。

当 strictNullChecks 设置为 true 时，null 和 undefined 有它们自己的类型，如果你将它们分配给一个期望具体值（例如，字符串）的变量，则会得到一个类型错误。

```ts
let whoSangThis: string = getSong();

const singles = [
  { song: "touch of grey", artist: "grateful dead" },
  { song: "paint it black", artist: "rolling stones" },
];

const single = singles.find((s) => s.song === whoSangThis);

console.log(single.artist);
```

singles.find 并不能保证它一定能找到这首歌 -- 但是我们已经编写了下面的代码，好像它肯定能找到一样。

通过将 strictNullChecks 设置为 true，TypeScript 将抛出一个错误，因为在尝试使用它之前，我们没有保证 single 一定存在：

```ts
const getSong = () => {
  return `song`;
};

let whoSangThis: string = getSong();

const singles = [
  { song: "touch of grey", artist: "grateful dead" },
  { song: "paing it black", artist: "rolling stones" },
];

const single = singles.find((s) => s.song === whoSangThis);

console.log(single.artist); // Error: Object is possibly 'undefined'.
```

TypeScript 基本上是告诉我们在使用 single 之前要确保它存在。我们需要先检查它是否为 null 或 undefined：

```ts
if (single) {
  console.log(single.artist); // rolling stones
}
```

## TypeScript 中的类型收窄

在 TypeScript 中，变量可以从不太精确的类型转移到更精确的类型，这个过程称为类型收窄。

下面是一个简单的例子，展示了当我们使用带有 typeof 的 if 语句时，TypeScript 如何将不太特定的 string | number 缩小到更特定的类型：

```ts
function addAnother(val: string | number) {
  if (typeof val === "string") {
    // ts 将 val 视为一个字符串
    return val.concat(" " + val);
  }

  // ts 知道 val 在这里是一个数字
  return val + val;
}

console.log(addAnother("哈哈")); // 哈哈 哈哈
console.log(addAnother(17)); // 34
```

另一个例子：下面，我们定义了一个名为 allVehicles 的联合类型，它可以是 Plane 或 Train 类型。

```ts
interface Vehicle {
  topSpeed: number;
}

interface Train extends Vehicle {
  carriages: number;
}

interface Plane extends Vehicle {
  wingSpan: number;
}

type PlaneOrTrain = Plane | Train;

function getSpeedRatio(v: PlaneOrTrain) {
  console.log(v.carriages); // Error: 'carriages' doesn't exist on type 'Plane'
}
```

由于 getSpeedRatio 函数处理了多种类型，我们需要一种方法来区分 v 是 Plane 还是 Train。我们可以通过给这两种类型一个共同的区别属性来做到这一点，它带有一个字符串值：

```ts
interface Train extends Vehicle {
  type: "Train";
  carriages: number;
}

interface Plane extends Vehicle {
  type: "Plane";
  wingSpan: number;
}

type PlageOrTrain = Plage | Train;
```

现在，TypeScript 可以缩小 v 的类型：

```ts
function getSpeedRatio(v: PlaneOrTrain) {
  if (v.type === "Train") {
    return v.topSpeed / v.carriages;
  }

  // 如果不是 Train，ts 知道它就是 Plane 了
  return v.topSpeed / v.wingSpan;
}

let bigTrain: Train = {
  type: "Train",
  topSpeed: 100,
  carriages: 20,
};

console.log(getSpeedRatio(bigTrain)); // 5
```

另外，我们还可以通过实现一个类型保护来解决这个问题，可以看看这篇文章：[什么是鸭子类型？](https://mp.weixin.qq.com/s/qJhXDpr2X0Tc65DXzUO3EA)

## TypeScript & React

TypeScript 完全支持 React 和 JSX。这意味着我们可以将 TypeScript 与三个最常见的 React 框架一起使用：

- create-react-app (https://create-react-app.dev/docs/adding-typescript/)
- Gatsby (https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/)
- Next.js (https://nextjs.org/learn/excel/typescript)

如果你需要一个更自定义的 React-TypeScript 配置，你可以自己配置 Webpack 和 tsconfig.json。但是大多数情况下，一个框架就可以完成这项工作。

例如，要用 TypeScript 设置 create-react-app，只需运行：

```zsh
npx create-react-app my-app --template typescript

# or

yarn create react-app my-app --template typescript
```

在 src 文件夹中，我们现在可以创建带有 .ts（普通 TypeScript 文件）或 .tsx（带有 React 的 TypeScript 文件）扩展名的文件，并使用 TypeScript 编写我们的组件。然后将其编译成 public 文件夹中的 JavaScript。

## React props & TypeScript

Person 是一个 React 组件，它接受一个 props 对象，其中 name 应该是一个字符串，age 是一个数字。

```tsx
// src/components/Person.tsx
import React from "react";

const Person: React.FC<{
  name: string;
  age: number;
}> = ({ name, age }) => {
  return (
    <div>
      <div>{name}</div>
      <div>{age}</div>
    </div>
  );
};

export default Person;
```

一般我们更喜欢用 interface 定义 props：

```tsx
interface Props {
  name: string;
  age: number;
}

const Person: React.FC<Props> = ({ name, age }) => {
  return (
    <div>
      <div>{name}</div>
      <div>{age}</div>
    </div>
  );
};
```

然后我们尝试将组件导入到 App.tsx，如果我们没有提供必要的 props，TypeScript 会报错。

```tsx
import React from "react";
import Person from "./components/Person";

const App: React.FC = () => {
  return (
    <div>
      <Person name="Tony" age={17} />
    </div>
  );
};

export default App;
```

## React hooks & TypeScript

### useState()

我们可以用尖括号来声明状态变量的类型。如果我们省略了尖括号，TypeScript 会默认推断 cash 是一个数字。因此，如果想让它也为空，我们必须指定：

```tsx
const Person: React.FC<Props> = ({ name, age }) => {
  const [cash, setCash] = useState<number | null>(1);

  setCash(null);

  return (
    <div>
      <div>{name}</div>
      <div>{age}</div>
    </div>
  );
};
```

### useRef()

useRef 返回一个可变对象，该对象在组件的生命周期内都是持久的。我们可以告诉 TypeScript ref 对象应该指向什么：

```tsx
const Person: React.FC = () => {
  // Initialise .current property to null
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input type="text" ref={inputRef} />
    </div>
  );
};
```

## 参考

- https://www.typescriptlang.org/docs/

- https://react-typescript-cheatsheet.netlify.app/

- https://www.freecodecamp.org/news/learn-typescript-beginners-guide

[TypeScript 终极初学者指南](https://mp.weixin.qq.com/s/_ShxBnF-HdLR_tK8qip7wA)
