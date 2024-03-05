---
layout: skill
title: TypeScript Object Type - Function (함수 Signature)
date: 2024-02-29
---




## 함수 Type : 함수의 Signature 정의하기

- 함수 type은 **함수의 매개 변수와 반환 값의 type을 정의**하는 데 사용합니다.
    - 함수의 매개 변수와 반환 type을 정의한 것을 '**함수의 signature**'라 부릅니다.
    - 함수 type을 통해 명시적으로 선언된 signature를 갖는 함수는 compile 시점에 TypeScript에 의해 검사됩니다.
    - 함수가 올바르게 사용되고 있는지 확인함으로써, code의 안정성과 가독성을 향상시킬 수 있습니다.

- 함수 type은 매개 변수의 type과 반환 type을 명시하여 정의합니다.

```typescript
let myFunction: (param1: type1, param2: type2) => returnType;
```




---




## 함수 Type의 다양한 사용 예시

- TypeScript는 다양한 형태의 함수를 지원하므로, 함수 type 역시 다양한 상황에서 유연하게 활용할 수 있습니다.


### 1. 단순 함수 Type 선언

- 수학 연산을 수행하는 함수 type을 선언합니다.
- "함수 type을 먼저 선언하고 함수를 나중에 할당"해도 되고, "함수 type을 inline으로 정의(화살표 함수 사용)하고 함수를 바로 할당"해도 됩니다.

```typescript
let add: (x: number, y: number) => number;

add = function(x: number, y: number): number {
    return x + y;
};

console.log(add(10, 20));    // 30
```

```typescript
const multiply: (x: number, y: number) => number = (x, y) => {
    return x * y;
};

console.log(multiply(5, 3));    // 15
```


### 2. 선택적 매개 변수와 기본 매개 변수

- 선택적 매개 변수를 함수 type을 정의할 때 사용할 수 있습니다.
    - 선택적 매개 변수(optional parameter)는 함수 호출 시 반드시 제공하지 않아도 되는 매개 변수를 의미합니다.

```typescript
let greet: (name: string, greeting?: string) => string;

greet = function(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
};

console.log(greet("Alice"));    // Hello, Alice!
console.log(greet("Bob", "Hi"));    // Hi, Bob!
```


### 3. Callback 함수 Type

- 함수 type은 콜백(callback) 함수의 type을 정의하는 데에도 사용될 수 있습니다.

```typescript
let processString: (input: string, callback: (result: string) => void) => void;

processString = function(input: string, callback: (result: string) => void): void {
    callback(input.toUpperCase());
};

processString("hello", result => console.log(result));    // HELLO
```


### 4. 함수 Type과 Interface

- 인터페이스에 함수 type을 사용하여, 복잡한 객체의 구조를 명확하게 정의할 수 있습니다.
    - 함수 type을 interface 내에서 정의함으로써, 함수가 받아야 할 매개 변수의 type과 반환해야 할 값의 type을 지정합니다.


```typescript
interface StringProcessor {
    (input: string): string;
}

let stringReverser: StringProcessor = function(input: string): string {
    return input.split("").reverse().join("");
};

console.log(stringReverser("TypeScript"));    // tpircSepyT
```
