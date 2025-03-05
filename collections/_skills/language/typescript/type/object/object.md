---
layout: skill
permalink: /181
title: TypeScript Object Type - 객체 자체를 나타내는 Type
description: TypeScript의 object Type은 원시 type을 제외한 모든 객체를 포함하는 type으로, 객체, 배열, 함수, class instance 등 다양한 객체를 다룰 수 있습니다.
date: 2024-02-29
---


## Object Type : All Non-Primitive Type

- TypeScript에서 `object` type은 **원시 type을 제외한 값**(배열, 함수, 객체 등)을 포함합니다.
    - 원시 type에는 `number`, `string`, `boolean`, `bigint`, `symbol`, `null`, `undefined`가 있으며, 이 type들을 제외한 모든 type이 `object` type에 속합니다.

- `object` type을 사용하여 변수를 선언할 수 있으며, 이는 해당 변수가 원시 type이 아닌 값을 가질 수 있음을 의미합니다.

```typescript
/* 객체 literal (이름과 값을 가진 속성의 집합) */
let user: object = { name: "John", age: 30 };

/* 배열 (순서가 있는 값의 집합) */
let numbers: object = [1, 2, 3, 4, 5];

/* 함수 (실행 가능한 code block) */
let greet: object = function() { console.log("Hello World!"); };
greet({ name: "Alice", age: 30 });    // 정상 작동
greet({ name: "Bob" });    // Error: Property 'age' is missing in type '{ name: string; }'

/* class instances (특정 class의 생성자를 통해 생성된 객체) */
class Car {
    constructor(public make: string, public model: string) {}
}
let myCar: object = new Car("Toyota", "Corolla");

/* built-in 객체 (JavaScript에 내장된 객체) */
let today: object = new Date();
let pattern: object = /d+/g;
let map: object = new Map();
let set: object = new Set();

/* promise (비동기 작업 완료 결과 값) */
let promise: object = new Promise((resolve, reject) => {
 resolve("Success");
});

/* tuple (각 요소의 type을 지정할 수 있는 고정된 길이의 배열) */
let tuple: object = ["hello", 100];

/* 복잡한 중첩 객체 (내부에 다른 객체, 배열, 함수 등이 중첩된 구조를 가진 객체) */
let complex: object = {
    data: [1, 2, 3],
    func: function() { console.log("Complex"); },
    object: { key: "value" }
};
```

- `object` type에 원시 type의 값을 할당받으려고 하면 TypeScript compiler가 오류를 발생시킵니다.

```typescript
let obj: object;

obj = 42;    // Error: Type 'number' is not assignable to type 'object'.
obj = "hello";    // Error: Type 'string' is not assignable to type 'object'.
obj = true;    // Error: Type 'boolean' is not assignable to type 'object'.
```


