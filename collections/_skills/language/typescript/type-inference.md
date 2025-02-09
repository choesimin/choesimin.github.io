---
layout: skill
title: TypeScript - Type Inference (Type 추론)
date: 2024-02-27
---




## Type 추론 : Compiler의 Type 자동 결정 기능

- TypeScript의 type 추론(type inference)은 **code에서 type을 명시적으로 지정하지 않아도 TypeScript compiler가 자동으로 type 정보를 유추하는 기능**입니다.
    - **type 선언을 생략하면, 값이 할당되는 과정에서 동적으로 type이 결정**됩니다.
    - TypeScript와 달리, JavaScript는 동적 type 언어이기 때문에 모든 값에 기본적으로 type 추론이 적용됩니다.

- type 추론은 다양한 상황에서 작동하며, code의 명시성을 유지하면서도 type 선언의 번거로움을 줄여줍니다.
    - 그러나 type 추론의 한계점이 드러나는 특수한 상황에서는, type 선언을 명시적으로 하는 것이 좋습니다.


### 기본 Type 추론

- 변수나 상수에 초기 값을 할당할 때, TypeScript는 할당된 값의 type을 해당 변수나 상수의 type으로 추론합니다.

```typescript
let num = 5;    // num은 number type
const message = "Hello, TypeScript";    // message는 string type
```

```typescript
let foo = 123;    // foo는 number type
foo = 'hi';    // Error: Type '"hi"' is not assignable to type 'number'.
```

- 변수 foo에 type을 선언하지 않았으나, type 추론에 의해 변수의 type이 결정됩니다.
- 동적 type 언어는 type 추론에 의해 변수의 type이 결정된 후에도 같은 변수에 여러 type의 값을 교차하여 할당할 수 있습니다.
- 하지만 **정적 type 언어는 type이 결정된 후에는 type을 변경할 수 없습니다.**
- TypeScript는 정적 type 언어이므로, type 추론으로 type이 결정된 이후에 다른 type의 값을 할당하면 오류가 발생합니다.


### 함수 Type 추론

- 함수에서 반환 값에 대한 type을 명시하지 않으면 TypeScript는 반환되는 값들을 분석하여 반환 type을 추론합니다.

```typescript
function add(x: number, y: number) {
    return x + y;    // 반환 type은 number로 추론됨
}
```


### Best Common Type 추론

- 여러 type이 혼합된 배열을 생성할 때 TypeScript는 배열의 요소로 가능한 모든 type을 포함하는 "가장 근접한 공통 type(best common type)"을 추론합니다.

```typescript
let mixedArray = [1, "two", true];    // (number | string | boolean)[] type으로 추론됨
```


### Context Typing

- 변수나 함수에 사용된 context를 기반으로 type을 추론합니다.
    - 예를 들어, event handler에서 event 객체의 type을 추론할 수 있습니다.

```typescript
window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.button);    // mouseEvent는 MouseEvent type으로 추론됨
};
```


### Generic Type 추론

- generic을 사용할 때 명시적으로 type 인수를 제공하지 않으면 TypeScript는 함수의 인수나 변수의 할당 값 등을 기반으로 해당 generic type을 추론합니다.

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity("myString");    // output은 string type으로 추론됨
```




---




## Type 추론이 불가능한 경우 : `any` Type

- type 선언을 생략하고 값도 할당하지 않아서 type을 추론할 수 없으면, **자동으로 `any` type**이 됩니다.

```typescript
let foo;    // let foo: any

foo = 'Hello';
console.log(typeof foo);    // string

foo = true;
console.log(typeof foo);    // boolean
```

- `any` type의 변수는 JavaScript의 `var` keyword로 선언된 변수처럼, **어떤 type의 값도 재할당이 가능**합니다.
- 그러나 `any` type은 TypeScript를 사용하는 장점을 없애기 때문에, 사용하지 않는 편이 좋습니다.




---




## Reference

- <https://poiemaweb.com/typescript-typing>
