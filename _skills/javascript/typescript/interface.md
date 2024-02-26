---
layout: skill
title: TypeScript - Interface
date: 2024-02-26
---




## TypeScript의 Interface

- TypeScript의 interface는 **변수, 함수, class가 특정 구조와 type을 갖추도록 명시**하는 데 사용됩니다.
    - 여러 type의 property로 이루어진 새로운 type을 정의하는 것과 같습니다.
        - interface에 선언된 property 또는 method의 구현을 강제하여 일관성을 유지할 수 있도록 합니다.
    - interface는 **객체가 구현해야 할 구체적인 사항을 지정하고, 지키도록 강제**합니다.

- interface는 compile time에 구조와 type을 검사하기 위해 사용되며, runtime에는 제거됩니다.
    - TypeScript file이 compile된 JavaScript file에는 interface에 대한 code가 없습니다.

- JavaScript ES6는 interface를 지원하지 않지만, TypeScript는 interface를 지원합니다.
    - TypeScript는 interface를 통해 개발자가 더 명확하고 유지보수가 용이한 code를 작성할 수 있도록 합니다.




---




## 변수와 Interface

- interface는 변수의 type으로 사용할 수 있습니다.
- interface를 type으로 선언한 변수는 해당 interface를 준수하여야 합니다.
- interface를 정의하는 것은 새로운 type을 정의하는 것과 유사합니다.

```typescript
interface Todo {
    id: number;
    content: string;
    completed: boolean;
}

// 변수 'todo'의 type으로 'Todo' interface를 선언함
let todo: Todo;

// 변수 todo는 Todo interface를 준수해야 함
todo = { id: 1, content: 'typescript', completed: false };
```

- interface를 사용하여 함수 parameter의 type을 선언할 수 있습니다.
    - 해당 함수에는 함수 parameter의 type으로 지정한 interface를 준수하는 인수를 전달해야 합니다.
    - 함수에 객체를 전달할 때 복잡한 매개 변수 검사 과정이 필요 없어서 매우 유용합니다.

```typescript
interface Todo {
    id: number;
    content: string;
    completed: boolean;
}

let todos: Todo[] = [];

// parameter 'todo'의 type으로 'Todo' interface를 선언함
function addTodo(todo: Todo) {
    todos = [...todos, todo];
}

// parameter 'todo'는 'Todo' interface를 준수해야 함
const newTodo: Todo = { id: 1, content: 'typescript', completed: false };
addTodo(newTodo);
console.log(todos);    // [ { id: 1, content: 'typescript', completed: false } ]
```




---




## 함수와 Interface

- interface는 함수의 type으로 사용할 수 있습니다.
- 함수의 interface에는 type이 선언된 parameter list와 return type을 정의합니다.
- 함수 interface를 구현하는 함수는 interface를 준수하여야 한다.

```typescript
interface SquareFunc {
    (num: number): number;
}

// 함수 interface를 구현하는 함수는 interface를 준수해야 함
const squareFunc: SquareFunc = function (num: number) {
    return num * num;
}

console.log(squareFunc(10));    // 100
```




---




## Class와 Interface

- class 선언문의 `implements` 뒤에 interface를 선언하면, 해당 class는 지정된 interface를 반드시 구현해야 합니다.
    - 이로써 interface를 구현하는 class들은 일관성을 유지할 수 있게 됩니다.

- interface는 property와 method를 가질 수 있다는 점에서 class와 유사하나, 직접 instance를 생성할 수는 없습니다.

```typescript
interface ITodo {
    id: number;
    content: string;
    completed: boolean;
}

// 'Todo' class는 'ITodo' interface를 구현해야 함
class Todo implements ITodo {
    constructor (
        public id: number,
        public content: string,
        public completed: boolean
    ) { }
}

const todo = new Todo(1, 'Typescript', false);
console.log(todo);
```

- interface는 property뿐만 아니라 method도 포함할 수 있으며, 추상 class와 달리 모든 method는 추상 method이어야 한다.
    - 추상 class는 추상 method와 일반 method 모두 가질 수 있습니다.

- interface를 구현하는 class는 interface에서 정의한 property와 추상 methdo를 반드시 구현해야 합니다.

```typescript
interface IPerson {
    name: string;
    sayHello(): void;
}

// 'Person' class는 'IPerson' interface에서 정의한 property와 추상 method를 반드시 구현해야 함
class Person implements IPerson {
    // interface에서 정의한 property 구현
    constructor(public name: string) { }

    // interface에서 정의한 추상 method 구현
    sayHello() {
        console.log(`Hello ${this.name}`);
    }
}

function greeter(person: IPerson): void {
    person.sayHello();
}

const me = new Person('Lee');
greeter(me);    // Hello Lee
```


### 비슷하지만 다른 Interface와 추상 Class

- interface와 추상 class(abstract class)는 method, property의 구조와 type을 강제하고, 추상 method(구현 없이 선언만 한 method)를 가진다는 점에서 비슷하지만, 몇 가지 다른 점이 있습니다.

| Interface | Abstract Class |
| --- | --- |
| 주로 **type check를 위해 사용**됩니다.<br>객체의 구조를 정의하며, 이 구조에 따라 객체가 형성되어야 함을 명시합니다. | **구현과 상속을 위해 사용**됩니다.<br>일부 기능을 구현하고, 나머지 기능은 상속받는 class에서 구현하도록 강제할 수 있습니다. |
| property과 method의 signature(추상 method 등)만을 정의할 수 있으며, **구현을 포함할 수 없습니다.** | 추상 method뿐만 아니라 **구현(일반 method 등)도 포함할 수 있습니다.** |
| class는 **여러 interface를 구현(implement)**할 수 있습니다.<br>이를 통해 **다중 상속**과 유사한 효과를 낼 수 있습니다. | class는 **하나의 추상 class만 상속(extend)**할 수 있습니다.<br>이는 JavaScript와 TypeScript에서 다중 상속을 지원하지 않기 때문입니다. |
| **runtime에는 존재하지 않습니다.**<br>TypeScript를 JavaScript로 compile할 때 interface는 제거됩니다. | **runtime에도 존재합니다.**<br>compile 후에도 JavaScript code에 추상 class는 남습니다. |
| 특별한 keyword 없이 추상 method를 정의합니다. | `abstract` keyword를 사용하여 추상 method를 정의합니다. |

- **다중 상속이 필요하거나 type check만이 목적이라면 interface**를, **구현을 공유하고 싶다면 추상 class**를 사용하는 것이 좋습니다.




---




## 선택적 속성 (Optional Property)

- 선택적 속성(optional property)을 선언하여 **interface의 property를 선택적으로 구현**할 수 있습니다.
    - interface의 일반적인 property는 반드시 구현해야 합니다.

- 선택적 속성은 property 이름 뒤에 물음표(`?`)를 붙이며, 구현을 생략해도 오류가 발생하지 않습니다.

```typescript
interface UserInfo {
    username: string;
    password: string;
    age?: number;
    address?: string;
}

const userInfo: UserInfo = {
    username: 'simin@gmail.com',
    password: '123456'
}

console.log(userInfo);
```




---




## Interface 상속 (Interface 확장)

- interface는 `extends` keyword를 사용하여 interface 또는 class를 상속받을 수 있습니다.

```typescript
interface Person {
    name: string;
    age?: number;
}

interface Student extends Person {
    grade: number;
}

const student: Student = {
    name: 'Lee',
    age: 20,
    grade: 3
}
```

- 복수의 interface를 상속받을 수도 있습니다.

```typescript
interface Person {
    name: string;
    age?: number;
}

interface Developer {
    skills: string[];
}

interface WebDeveloper extends Person, Developer {}

const webDeveloper: WebDeveloper = {
    name: 'Lee',
    age: 20,
    skills: ['HTML', 'CSS', 'JavaScript']
}
```

- interface는 interface뿐만 아니라 class도 상속받을 수 있습니다.
- 이때 class의 모든 member(`public`, `protected`, `private`)가 상속되지만, 구현까지 상속하지는 않습니다.

```typescript
class Person {
    constructor(public name: string, public age: number) {}
}

interface Developer extends Person {
    skills: string[];
}

const developer: Developer = {
    name: 'Lee',
    age: 20,
    skills: ['HTML', 'CSS', 'JavaScript']
}
```




---




## Reference

- <https://poiemaweb.com/typescript-interface>
