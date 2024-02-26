---
layout: post
title: TypeScript - Interface
date: 2024-02-26
---




- **Interface**는 일반적으로 **type check를 위해 사용되며 변수, 함수, Class에 사용**할 수 있습니다.

Interface는 여러가지 타입을 갖는 프로퍼티로 이루어진 새로운 타입을 정의하는 것과 유사하다. Interface에 선언된 프로퍼티 또는 메소드의 구현을 강제하여 일관성을 유지할 수 있도록 하는 것이다. ES6는 Interface를 지원하지 않지만 TypeScript는 Interface를 지원한다.

Interface는 프로퍼티와 메소드를 가질 수 있다는 점에서 클래스와 유사하나 직접 인스턴스를 생성할 수 없고 모든 메소드는 추상 메소드이다. 단, 추상 클래스의 추상 메소드와 달리 abstract 키워드를 사용하지 않는다.




---




## 변수와 Interface

Interface는 변수의 타입으로 사용할 수 있다. 이때 Interface를 타입으로 선언한 변수는 해당 Interface를 준수하여야 한다. 이것은 새로운 타입을 정의하는 것과 유사하다.

```typescript
// Interface의 정의
interface Todo {
    id: number;
    content: string;
    completed: boolean;
}

// 변수 todo의 타입으로 Todo Interface를 선언하였다.
let todo: Todo;

// 변수 todo는 Todo Interface를 준수하여야 한다.
todo = { id: 1, content: 'typescript', completed: false };
```

Interface를 사용하여 함수 파라미터의 타입을 선언할 수 있다. 이때 해당 함수에는 함수 파라미터의 타입으로 지정한 Interface를 준수하는 인수를 전달하여야 한다. 함수에 객체를 전달할 때 복잡한 매개변수 체크가 필요없어서 매우 유용하다.

```typescript
// Interface의 정의
interface Todo {
    id: number;
    content: string;
    completed: boolean;
}

let todos: Todo[] = [];

// 파라미터 todo의 타입으로 Todo Interface를 선언하였다.
function addTodo(todo: Todo) {
    todos = [...todos, todo];
}

// 파라미터 todo는 Todo Interface를 준수하여야 한다.
const newTodo: Todo = { id: 1, content: 'typescript', completed: false };
addTodo(newTodo);
console.log(todos)
// [ { id: 1, content: 'typescript', completed: false } ]
```




---




## 함수와 Interface

Interface는 함수의 타입으로 사용할 수 있다. 이때 함수의 Interface에는 타입이 선언된 파라미터 리스트와 리턴 타입을 정의한다. 함수 인테페이스를 구현하는 함수는 Interface를 준수하여야 한다.

```typescript
// 함수 Interface의 정의
interface SquareFunc {
    (num: number): number;
}

// 함수 인테페이스를 구현하는 함수는 Interface를 준수하여야 한다.
const squareFunc: SquareFunc = function (num: number) {
    return num * num;
}

console.log(squareFunc(10)); // 100
```




---




## 클래스와 Interface

클래스 선언문의 implements 뒤에 Interface를 선언하면 해당 클래스는 지정된 Interface를 반드시 구현하여야 한다. 이는 Interface를 구현하는 클래스의 일관성을 유지할 수 있는 장점을 갖는다. Interface는 프로퍼티와 메소드를 가질 수 있다는 점에서 클래스와 유사하나 직접 인스턴스를 생성할 수는 없다.

```typescript
// Interface의 정의
interface ITodo {
    id: number;
    content: string;
    completed: boolean;
}

// Todo 클래스는 ITodo Interface를 구현하여야 한다.
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

Interface는 프로퍼티뿐만 아니라 메소드도 포함할 수 있다. 단, 모든 메소드는 추상 메소드이어야 한다. Interface를 구현하는 클래스는 Interface에서 정의한 프로퍼티와 추상 메소드를 반드시 구현하여야 한다.

```typescript
// Interface의 정의
interface IPerson {
    name: string;
    sayHello(): void;
}

/*
Interface를 구현하는 클래스는 Interface에서 정의한 프로퍼티와 추상 메소드를 반드시 구현하여야 한다.
*/
class Person implements IPerson {
    // Interface에서 정의한 프로퍼티의 구현
    constructor(public name: string) {}

    // Interface에서 정의한 추상 메소드의 구현
    sayHello() {
        console.log(`Hello ${this.name}`);
    }
}

function greeter(person: IPerson): void {
    person.sayHello();
}

const me = new Person('Lee');
greeter(me); // Hello Lee
```




---




## 선택적 속성 (Optional Property)

Interface의 프로퍼티는 반드시 구현되어야 한다. 하지만 Interface의 프로퍼티가 선택적으로 필요한 경우가 있을 수 있다. 선택적 프로퍼티(Optional Property)는 프로퍼티명 뒤에 `?`를 붙이며 생략하여도 에러가 발생하지 않는다.

```typescript
interface UserInfo {
    username: string;
    password: string;
    age?: number;
    address?: string;
}

const userInfo: UserInfo = {
    username: 'ungmo2@gmail.com',
    password: '123456'
}

console.log(userInfo);
```

이렇게 선택적 프로퍼티를 사용하면 사용 가능한 프로퍼티를 파악할 수 있어서 코드를 이해하기 쉬워진다.




---




## Interface 상속

Interface는 extends 키워드를 사용하여 Interface 또는 클래스를 상속받을 수 있다.

```typescript
interface Person {
    name: string;
    age?: number;
}

interface Student extends Person {
    grade: number;
}

const student: Student =    {
    name: 'Lee',
    age: 20,
    grade: 3
}
```

복수의 Interface를 상속받을 수도 있다.

```typescript
interface Person {
    name: string;
    age?: number;
}

interface Developer {
    skills: string[];
}

interface WebDeveloper extends Person, Developer {}

const webDeveloper: WebDeveloper =    {
    name: 'Lee',
    age: 20,
    skills: ['HTML', 'CSS', 'JavaScript']
}
```

Interface는 Interface 뿐만 아니라 클래스도 상속받을 수 있다. 단, 클래스의 모든 멤버(public, protected, private)가 상속되지만 구현까지 상속하지는 않는다.

```typescript
class Person {
    constructor(public name: string, public age: number) {}
}

interface Developer extends Person {
    skills: string[];
}

const developer: Developer =    {
    name: 'Lee',
    age: 20,
    skills: ['HTML', 'CSS', 'JavaScript']
}
```




---




## Reference

- <https://poiemaweb.com/typescript-interface>
