---
layout: skill
permalink: /101
title: TypeScript Any Type - Type Check 우회하기
description: TypeScript의 Any Type은 모든 종류의 값이 할당 가능한 가장 유연한 type으로, Type Check를 우회할 수 있습니다.
date: 2024-03-04
---


## `any` Type : TypeScript의 Type Check 기능 우회하기

- TypeScript에서 `any` type은 **가장 유연한 type**으로, **어떤 종류의 값도 할당할 수 있습니다.**
    - 문자열, 숫자, 배열, 객체 등 어떤 type이든 `any` type 변수에 할당 가능합니다.

- `any` type을 사용하면, 해당 변수에 대한 **compile time type check를 compiler가 수행하지 않습니다.**
    - TypeScript의 type 검사 기능을 일시적으로 끌 수 있습니다.
    - 이는 동적 type 언어의 특징을 유지하면서 TypeScript를 사용하고자 할 때 유용합니다.
        - 예를 들어, JavaScript와의 호환성을 유지하면서 점진적으로 TypeScript를 도입하거나, type 정보가 없는 library를 사용할 때.

- 그러나 `any` type은 TypeScript의 **핵심 가치인 type 안정성을 손상**시킬 수 있기 때문에, 가능한 **사용을 최소화**하는 것이 좋습니다.
    - `any` type은 TypeScript의 type system을 우회하기 때문에, code 내에서 type 관련 오류가 발생할 가능성을 증가시킵니다.
    - code의 type 안정성과 유지 보수성을 유지하기 위해서는 `any` type 대신 더 구체적이고 명확한 type(`unknown`, generic, union type 등)을 사용하는 것이 바람직합니다.
        - 특히 type 안정성이 중요한 project에서는 `any` type의 사용을 피하는 것이 좋습니다.


```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;    // okay, definitely a boolean

let looselyTyped: any = {};
let d = looselyTyped.a.b.c.d;    // any type을 사용하면, 모든 하위 속성도 자동으로 any type이 됨
```


---


## `any` Type 사용 최소화 전략

- `any` type은 TypeScript의 type check를 우회할 수 있는 유연한 도구이지만, type 안정성을 저해할 수 있으므로 신중하게 사용해야 합니다.
- TypeScript의 다양한 type system 기능을 활용하여 `any` 사용을 최소화하고, project의 type 안정성과 가독성을 향상시키는 것이 좋습니다.
- `any` type을 사용하고 있다면 점진적으로 구체적인 type으로 변경해 나가야 합니다.


### `any` Type 대신 고려할 수 있는 Type들

#### `unknown` Type

- `unknown` type은 `any`와 비슷하게 모든 종류의 값을 할당할 수 있지만, `unknown` type에 할당된 변수는 사용하기 전에 해당 변수의 type을 확인해야 합니다.
    - `unknown` type 변수 사용 전 type을 확인하는 과정은, type 안정성을 높이는 데 도움이 됩니다.

```typescript
let value: unknown;
value = "Hello";    // OK
value = 123;    // OK

if (typeof value === "string") {
    console.log(value.toUpperCase());    // type check 후 사용
}
```

#### Generic Type

- 함수나 class 등에서 입력 type을 미리 정의하지 않고, 사용 시점에 type을 결정할 수 있습니다.
- generic을 사용하면 유연함을 유지하면서도 type 안정성을 향상시킬 수 있습니다.

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity("myString");    // output은 string type
```

#### Union Type

- 두 개 이상의 type 중 하나일 수 있는 변수의 type을 지정할 때 사용합니다.
- union type은 `any` type보다 type을 더 명확하게 제한할 수 있습니다.

```typescript
let myVar: number | string;
myVar = "Hello";    // OK
myVar = 123;    // OK
```


### `any` Type 사용을 막는 Compiler Option : `noImplicitAny`

- `noImplicitAny` option은 TypeScript의 type checker가 변수, 매개 변수, 반환 값 등의 type을 자동으로 `any`로 추론하지 못하게 막습니다.
    - 개발자가 명시적으로 type을 선언하지 않았을 때, compiler가 오류를 발생시킵니다.

- `noImplicitAny` option을 통해 `any` type의 사용을 줄이고, TypeScript의 type 추론(type inferenece) 기능에 의존하지 않는 명확한 type 선언을 장려할 수 있습니다.

```json
{
    "compilerOptions": {
        "noImplicitAny": true
    }
}
```

- `tsconfig.json` file에서 `noImplicitAny` option을 `true`로 설정하여 활성화할 수 있습니다.
