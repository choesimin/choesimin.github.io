---
layout: note
permalink: /206
title: TypeScript Unknown Type - Type 안전성이 있는 Any Type
description: TypeScript의 Unknown Type은 Type-safe하게 모든 Type의 값을 할당할 수 있으며, 사용하기 전에 Type을 확인해야 하는 Type입니다.
date: 2024-03-04
---


## `unknown` Type : Type-safe하게 모든 Type의 값 할당하기

- `unknown` type은 TypeScript 3.0 version에서 도입되었습니다.
- `any` type과 유사하게, `unknown` type의 변수에는 **어떤 종류의 값도 할당할 수 있습니다.**

- 그러나 `unknown`은 **`any`보다 type 안전성 측면에서 더 엄격**합니다.
    - `unknown` type의 주된 목적은 개발자가 type을 좀 더 명확하게 확인하거나 좁혀나가도록 강제하는 것입니다.

- `unknown` type은 **`any` type의 안전한 대안**으로, TypeScript에서 type 안전성을 높이고자 할 때 유용하게 사용됩니다.
    - `unknown` type의 변수는 사용하기 전에 type 검사 등의 과정을 통해 해당 변수의 type을 좁혀야(type narrowing) 합니다.
        - 이는 type check 없이 사용할 수 있는 `any` type과 대조적입니다.

- `unknown` type의 변수를 사용하기 위해서는 해당 변수가 특정 type인지 확인하는 type guard가 필요합니다.
    - `unknown` type을 사용할 때는 해당 값의 실제 type을 확인하지 않고 직접적으로 사용하려는 시도를 피해야 합니다.

```typescript
let value: unknown;

value = "hello";    // 문자열 할당
value = 123;    // 숫자 할당
value = [];    // 배열 할당

if (typeof value === "string") {    // type guard
    console.log(value.toUpperCase());
} else if (typeof value === "number") {    // type guard
    console.log(value.toFixed(2));
}
```

- `unknown` type은 **type 정보 없이 data를 처리해야 하는 경우** 유용하게 사용됩니다.
    - 예를 들어, **외부 API로부터 받은 data의 type이 미리 정의되지 않은 경우**, `unknown` type을 사용하여 초기 변수를 선언할 수 있습니다.
        - 이후, type guard를 통해 data의 type을 좁혀나갑니다.
    - 예를 들어, library 개발 시 **type 정보 없이 data를 처리해야 하는 경우**, library 사용자가 type을 명확하게 지정하도록 강제하기 위해 `unknown` type을 사용할 수 있습니다.


### `unknown`과 `any`의 차이점

- `unknown`과 `any` type 모두 유연성을 제공하지만, **`unknown`은 type 안전성을 보장**하는 데 더 유리하며, **`any`는 편의성을 제공하지만 type 안전성 측면에서는 단점**이 있습니다.
    - `any` type을 사용할 때는 type 검사를 수동으로 수행할 수 있지만, TypeScript compiler가 type 오류를 자동으로 감지하거나 알려주지 않습니다.
    - `unknown` type을 사용하면 compiler가 type을 확인하거나 확정하지 않고는 사용할 수 없게 함으로써, 더 안전한 code를 작성하도록 강제합니다.
        - `unknown` type을 사용하면 type 안전성을 유지하면서도 동적 type data를 다룰 수 있으며, code의 다른 부분에서 예기치 않은 type 오류가 발생하는 것을 방지할 수 있습니다.

#### `any` Type

- `any` type은 TypeScript의 type check system을 완전히 무시할 수 있게 해줍니다.
    - `any` type의 변수는 어떤 종류의 값이든 할당할 수 있으며, 할당된 값에 대해 어떠한 type의 연산이나 method 호출도 수행할 수 있습니다.
- `any` type을 사용하면 type 안전성이 손상될 수 있으며, 이는 runtime error로 이어질 수 있습니다.
- `any`를 사용하면 TypeScript compiler가 type check를 수행하지 않으므로, 개발자가 직접 type 검사를 수행해야 합니다.

#### `unknown` Type

- `unknown` type은 어떤 값이든 할당할 수 있지만, `unknown` type의 변수를 사용하기 전에 해당 변수의 type을 검사하거나 확정(assert)해야 합니다.
    - 개발자가 변수의 실제 type을 확인하거나 변환하지 않고는 해당 변수에 대해 아무런 연산도 수행할 수 없게 함으로써, 잠재적인 runtime error를 줄일 수 있습니다.
- `unknown` type은 type을 사전에 알 수 없는 경우나 외부 data source로부터 data를 받아올 때 유용하게 사용될 수 있으며, 이후에 적절한 type 검사를 통해 안전하게 사용할 수 있습니다.


---


## 다양한 `unknown` Type 사용 방법


### `unknown`과 Union Type

- `unknown` type과 union type을 함께 사용하면, 여러 다른 type 중 하나가 될 수 있는 값을 안전하게 처리할 수 있는 유연성을 제공합니다.
    - union type이란 변수가 여러 type 중 하나를 가질 수 있음을 나타내는 방법입니다.
        - 예를 들어, `string | number` union type은 해당 변수가 문자열 또는 숫자 type의 값을 가질 수 있음을 의미합니다.

- `unknown` type을 union type과 함께 사용할 때, `unknown` type의 변수에 대해 진행할 수 있는 연산은 해당 union type의 모든 member에 공통적으로 적용될 수 있는 연산에만 제한됩니다.
    - 특정 type에만 적용 가능한 연산을 수행하기 전에, 해당 변수의 type을 좁혀주는 type guard를 사용하여 변수의 실제 type을 확인해야 합니다.

```typescript
function processValue(value: unknown) {
    if (typeof value === 'string') {
        // 이 block 내에서, value는 string type으로 처리됨
        console.log(value.toUpperCase());    // 문자열 method를 안전하게 호출
    } else if (typeof value === 'number') {
        // 이 block 내에서, value는 number type으로 처리됨
        console.log(value.toFixed(2));    // 숫자 method를 안전하게 호출
    } else {
        console.log('Other type');    // value가 string 또는 number type이 아닌 경우
    }
}
```

- `processValue` 함수는 `unknown` type의 `value` 매개 변수를 받습니다.
- 함수 내에서 `typeof` 연산자를 사용하여 `value`의 type을 check하는 type guard를 적용합니다.
- 이를 통해 `value`가 문자열인지, 숫자인지를 안전하게 확인한 후, 해당 type에 특화된 method(`toUpperCase` 또는 `toFixed`)를 호출합니다.
    - 만약 `value`가 문자열이나 숫자가 아니라면, "Other type"이 출력됩니다.


### `unknown`과 Type 단언

- `unknown` type의 값을 다룰 때, 해당 값의 구체적인 type에 대해 개발자가 확신할 수 있는 경우가 있습니다.
- 이런 경우, type 단언(type assertion)을 사용하여 `unknown` type을 더 구체적인 type으로 변환할 수 있습니다.
- 하지만, type 단언은 주의해서 사용해야 하며, 가능한 type guard를 사용하는 것이 더 안전한 방법입니다.

```typescript
let value: unknown = "Hello, TypeScript";

// type 단언을 사용하여 unknown을 string type으로 변환
let someString: string = value as string;

console.log(someString.toUpperCase());    // "HELLO, TYPESCRIPT"
```


### `unknown`과 Generic 기본 Type

- generic 함수나 generic type을 정의할 때, `unknown`을 기본 type으로 사용하면 함수나 type의 사용성을 높이면서도 type 안전성을 유지할 수 있습니다.
- 이 방법은 함수나 type이 다양한 type의 값을 처리할 수 있도록 하면서도, 호출하는 측에서 명시적인 type 정보를 제공하도록 강제합니다.

```typescript
function processValue<T = unknown>(value: T) {
    // value에 대한 처리 logic
}

processValue(42);    // T는 number
processValue("Hello");    // T는 string
```
