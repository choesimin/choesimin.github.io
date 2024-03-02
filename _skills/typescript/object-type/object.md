---
layout: skill
title: TypeScript Object Type - Object (객체)
date: 2024-02-29
---




## Object Type : All Non-Primitive Type

- TypeScript에서 `object` type은 원시 type을 제외한 값(배열, 함수, 객체 등)을 포함합니다.
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




---




## 지나치게 유연한 `object` Type

- TypeScript에서 `object` type은 원시 type을 제외한 모든 비원시(non-primitive) type의 객체를 포함할 수 있는 유연한 type입니다.
- `object` type의 유연성은 다양한 객체를 하나의 type으로 처리할 수 있게 해주지만, 과도한 유연성은 code 품질에 부정적인 영향을 줄 수 있습니다.
    1. type 안정성 감소 : `object` type은 구체적인 구조를 정의하지 않기 때문에, 객체가 예측 가능한 속성을 가지고 있는지, 또는 올바른 type의 값을 가지고 있는지 compile time에 확인할 수 없습니다.
    2. 가독성 저하 : `object` type을 사용하면 해당 변수가 어떤 구조를 가지고 있는지 code만으로는 명확하게 알 수 없습니다.
    3. 유지보수성 저하 : `object` type의 변수를 수정하거나 확장해야 할 경우, 해당 변수가 어떤 속성이나 method를 지원하는지 알기 어렵습니다.

- 따라서, code의 명확성과 안정성을 보장하기 위해 가능한 한 `object` type 대신 더 구체적인 type을 선언하여 사용하는 것을 권장합니다.
- 구체적인 type을 사용함으로써, type 안정성을 높이고, code의 가독성 및 유지보수성을 향상시킬 수 있습니다.


### 구체적인 type 사용하기

- `object` type의 지나친 유연성 때문에 발생하는 문제를 해결하기 위해, 가능한 한 `object` type 대신 구체적인 type을 사용해야 합니다.

#### Interface와 Type Aliase

- 구체적인 객체 구조를 정의하는 가장 일반적인 방법은 interface와 type alias을 사용하는 것입니다.
- 이 방법을 통해 객체가 가질 수 있는 속성과 그 type을 명시적으로 선언할 수 있습니다.

```typescript
interface User {
    id: number;
    name: string;
    email?: string;    // optional property
}

type Product = {
    id: number;
    name: string;
    price: number;
};
```

#### Class

- class를 사용하면 type과 함께 객체의 구조와 행위를 정의할 수 있습니다.
- class는 type checking과 함께 instance 생성 logic을 포함할 수 있으므로, 객체 지향 programming paradigm을 따르는 application에 적합합니다.

```typescript
class Car {
    constructor(public make: string, public model: string, public year: number) {}
}

let myCar: Car = new Car("Toyota", "Corolla", 2020);
```

#### 배열과 Tuple

- 배열과 tuple에 대해서도, 가능한 한 구체적인 type을 사용해야 합니다.
- 이는 배열 내의 요소 type을 명확히 함으로써 type 안정성을 향상시킵니다.

```typescript
let numbers: number[] = [1, 2, 3, 4, 5];
type StringNumberPair = [string, number];
et pair: StringNumberPair = ["one", 1];
```
