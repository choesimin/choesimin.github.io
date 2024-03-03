---
layout: skill
title: TypeScript - Type Inference (Type 추론)
date: 2024-02-27
---




## Type Inference

- 만약 **type 선언을 생략하면, 값이 할당되는 과정에서 동적으로 type이 결정**되며, 이를 **type 추론(type inference)**이라 합니다.

TypeScript의 타입 추론(Type Inference)은 코드에서 타입을 명시적으로 지정하지 않아도 TypeScript 컴파일러가 자동으로 타입 정보를 유추하는 기능입니다. 이를 통해 개발자는 타입을 간결하게 유지하면서도 타입 안전성을 확보할 수 있습니다. 타입 추론은 TypeScript에서 중요한 역할을 하며, 다양한 상황에서 작동합니다.

TypeScript의 타입 추론 기능은 코드의 명시성을 유지하면서도 타입 선언의 번거로움을 줄여줍니다. 이를 통해 개발자는 보다 효율적으로 타입 안전한 코드를 작성할 수 있습니다.
그러나 복잡한 상황에서는 타입 추론의 한계를 이해하고 필요한 경우 타입 선언을 명시적으로 제공하는 것이 좋습니다.


### 기본 타입 추론

변수나 상수에 초기값을 할당할 때 TypeScript는 할당된 값의 타입을 해당 변수나 상수의 타입으로 추론합니다.

```typescript
let num = 5; // num은 number로 추론됩니다.
const message = "Hello, TypeScript"; // message는 string으로 추론됩니다.
```

```typescript
let foo = 123;    // foo는 number type
foo = 'hi';    // Error: Type '"hi"' is not assignable to type 'number'.
```

- 변수 foo에 type을 선언하지 않았으나, type 추론에 의해 변수의 type이 결정됩니다.
- 동적 type 언어는 type 추론에 의해 변수의 type이 결정된 후에도 같은 변수에 여러 type의 값을 교차하여 할당할 수 있습니다.
- 하지만 정적 type 언어는 type이 결정된 후에는 type을 변경할 수 없습니다.
- TypeScript는 정적 type 언어이므로, type 추론으로 type이 결정된 이후에 다른 type의 값을 할당하면 오류가 발생합니다.



### 함수 타입 추론

함수에서 반환 값에 대한 타입을 명시하지 않으면 TypeScript는 반환되는 값들을 분석하여 반환 타입을 추론합니다.

```typescript
function add(x: number, y: number) {
  return x + y; // 반환 타입은 number로 추론됩니다.
}
```

매개변수에 대해서도, 컨텍스트 타이핑(contextual typing)을 통해 일부 타입을 추론할 수 있습니다.


### 베스트 커먼 타입 추론

여러 타입이 혼합된 배열을 생성할 때 TypeScript는 배열의 요소로 가능한 모든 타입을 포함하는 "가장 근접한 공통 타입"(best common type)을 추론합니다.

```typescript
let mixedArray = [1, "two", true]; // (number | string | boolean)[] 타입으로 추론됩니다.
```


### 컨텍스트 타이핑

TypeScript는 변수나 함수의 사용 컨텍스트를 기반으로 타입을 추론합니다. 예를 들어, 이벤트 핸들러에서 이벤트 객체의 타입을 추론할 수 있습니다.

```typescript
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.button);  // mouseEvent는 MouseEvent 타입으로 추론됩니다.
};
```


### 제네릭 타입 추론

제네릭을 사용할 때 명시적으로 타입 인수를 제공하지 않으면 TypeScript는 함수의 인수나 변수의 할당 값 등을 기반으로 해당 제네릭 타입을 추론할 수 있습니다.

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity("myString"); // output은 string 타입으로 추론됩니다.
```




---




## Type 추론이 불가능한 경우 : `any`

- type 선언을 생략하고 값도 할당하지 않아서 type을 추론할 수 없으면, 자동으로 `any` type이 됩니다.

```typescript
let foo;    // let foo: any

foo = 'Hello';
console.log(typeof foo);    // string

foo = true;
console.log(typeof foo);    // boolean
```

- `any` type의 변수는 JavaScript의 `var` keyword로 선언된 변수처럼, 어떤 type의 값도 재할당이 가능합니다.
- 그러나 `any` type은 TypeScript를 사용하는 장점을 없애기 때문에, 사용하지 않는 편이 좋습니다.




---




## Reference

- <https://poiemaweb.com/typescript-typing>
