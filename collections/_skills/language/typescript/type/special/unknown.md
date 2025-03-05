---
layout: skill
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


