---
layout: skill
title: TypeScript - 변수와 함수에 Type 선언하기
date: 2024-02-25
---




## Type 선언하기

- type 선언(type declaration)은 code 예측성을 향상시킵니다.
- type 선언은 강력한 type check를 가능하게 하여, '문법 오류'나 'type과 일치하지 않는 값의 할당' 등의 기본적인 오류를 runtime 전에 검출합니다.
    - compile 시점에 type과 문법을 검사합니다.
- VisualStudioCode와 같은 도구를 사용하면, code 작성 시점에 오류를 검출할 수 있어서 개발 효율이 대폭 향상됩니다.


### 변수 Type 선언하기

- TypeScript는 변수명 뒤에 type을 명시하는 것으로 type을 선언할 수 있습니다.

```typescript
let foo: string = 'hello';
```

- 선언한 type에 맞지 않는 값을 할당하면 compile 시점에 오류가 발생합니다.

```typescript
let bar: number = true; // error TS2322: Type 'true' is not assignable to type 'number'.
```


### 함수 Type 선언하기

- 함수의 매개 변수와 반환 값에 대한 type을 선언할 수 있습니다.
- 일반 변수와 마찬가지로 선언된 type에 일치하지 않는 값이 주어지면 오류가 발생합니다.

```typescript
// 함수 선언식
function multiply1(x: number, y: number): number {
    return x * y;
}

// 함수 표현식
const multiply2 = (x: number, y: number): number => x * y;

console.log(multiply1(10, 2));
console.log(multiply2(10, 3));

console.log(multiply1(true, 1));    // error TS2345: Argument of type 'true' is not assignable to parameter of type 'number'.
```


### 다양한 Type에 대한 사전 선언

- TypeScript는 ES5, ES6의 Superset(상위 확장)이므로 **JavaScript의 type을 그대로 사용할 수 있습니다.**
- JavaScript의 type 외에도, **TypeScript 고유의 type이 추가로 제공됩니다.**
- **type은 소문자와 대문자를 구별**하며, **TypeScript가 기본 제공하는 type은 모두 소문자**입니다.

| Type | JS | TS | 설명 |
| --- | --- | --- | --- |
| boolean | O | O | true/false 값 |
| null | O | O | 값이 없다는 것을 명시함 |
| undefined | O | O | 값을 할당하지 않은 변수의 초기값 |
| number | O | O | 숫자 값 (정수, 실수, Infinity, NaN) |
| string | O | O | 문자열 |
| symbol | O | O | 고유하고 수정 불가능한 data type (주로 객체 속성들의 식별자로 사용함) |
| object | O | O | 객체형 (참조형) |
| array |  | O | 배열 |
| tuple |  | O | 고정된 요소 수 만큼의 type을 미리 선언 후 배열을 표현 |
| enum |  | O | 열거형 (숫자 값 집합에 이름을 지정한 것) |
| any |  | O | 모든 type에 대응 가능한 type (type 추론할 수 없거나 type check가 필요 없는 변수에 사용함) |
| void |  | O | 반환 값이 없는 함수의 반환 type |
| never |  | O | 절대 발생하지 않는 값 |

```typescript
/* boolean */
let isDone: boolean = false;

/* null */
let n: null = null;

/* undefined */
let u: undefined = undefined;

/* number */
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

/* string */
let color: string = "blue";
color = 'red';
let myName: string = `Lee`;    // ES6 template 문자열
let greeting: string = `Hello, my name is ${ myName }.`;    // ES6 template 대입문

/* object */
const obj: object = {};

/* array */
let list1: any[] = [1, 'two', true];
let list2: number[] = [1, 2, 3];
let list3: Array<number> = [1, 2, 3];    // generic 배열 type

/* tuple */
let tuple: [string, number];
tuple = ['hello', 10]; // OK
tuple = [10, 'hello']; // Error
tuple = ['hello', 10, 'world', 100];    // Error
tuple.push(true);    // Error

/* enum */
enum Color1 {Red, Green, Blue};
let c1: Color1 = Color1.Green;
console.log(c1);    // 1

enum Color2 {Red = 1, Green, Blue};
let c2: Color2 = Color2.Green;
console.log(c2);    // 2

enum Color3 {Red = 1, Green = 2, Blue = 4};
let c3: Color3 = Color3.Blue;
console.log(c3);    // 4

/* any */
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false;    // okay, definitely a boolean

/* void */
function warnUser(): void {
    console.log("This is my warning message");
}

/* never */
function infiniteLoop(): never {
    while (true) {}
}

function error(message: string): never {
    throw new Error(message);
}
```


#### Type을 대문자로 선언하는 경우 : 객체 유형

```typescript
const today: Date = new Date();    // Date type

const elem: HTMLElement = document.getElementById('myId');    // HTMLElement type

class Person { }
const person: Person = new Person();    // Person type
```

- **객체의 유형도 type으로 선언할 수 있으며**, 이 경우에 type은 대문자로 시작합니다.

```typescript
/* String : String 생성자 함수로 생성된 String wrapper 객체 type */
let objectStr: String;
objectStr = 'hello';    // OK
objectStr = new String('hello');    // OK

/* string : 원시 문자열 type */
let primitiveStr: string;
primitiveStr = 'hello';    // OK
primitiveStr = new String('hello');    // Error : 원시 type 문자열 type에 객체를 할당하면 오류 발생
// Type 'String' is not assignable to type 'string'.
// 'string' is a primitive, but 'String' is a wrapper object. Prefer using 'string' when possible.
```

- `string` type은 TypeScript가 기본으로 제공하는 원시 type인 문자열 type을 의미합니다.
- 하지만 대문자로 시작하는 `String` type은 `String` 생성자 함수로 생성된 `String` wrapper 객체 type을 의미합니다.
- 따라서 `string` type에 `String` type을 할당하면 오류가 발생합니다.
    - `String` type에는 `string` type을 할당할 수 있습니다.




---




## Reference

- <https://poiemaweb.com/typescript-typing>
- <https://inpa.tistory.com/entry/TS-📘-타입스크립트-타입-선언-종류-💯-총정리>
