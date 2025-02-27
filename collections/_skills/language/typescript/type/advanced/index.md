---
layout: skill
title: TypeScript Advanced Type (고급 Type)
date: 2024-02-27
---


## 고급 Type : TypeScript의 고급 Type System

- TypeScript의 고급 type system은 code의 재사용성, 유지 보수성, 그리고 type 안전성을 향상시키는 다양한 기능을 제공합니다.
- 고급 type에는 generic type, utility type, conditional type, mapped type이 포함됩니다.
- 각각의 type은 TypeScript에서 보다 복잡한 type 관계를 표현하고 다루기 위한 강력한 도구를 제공합니다.


### Generic Type

- generic type은 **type을 parameter처럼 사용**하여, 다양한 type에 대해 작동할 수 있는 component(함수, class, interface 등)를 생성할 수 있게 해줍니다.
- 이를 통해 code의 재사용성을 높이며, type 안전성을 유지할 수 있습니다.

```typescript
function identity<T>(arg: T): T {
    return arg;
}
```

- `identity` 함수는 어떤 type의 값이든 받아 동일한 type의 값을 반환합니다.
- generic을 사용함으로써, 이 함수는 다양한 type에 대해 유연하게 사용될 수 있습니다.


### Utility Type

- TypeScript는 **기존 type을 변환하여 새로운 type을 생성**하는 데 도움을 주는 **여러 내장(built-in) utility type**을 제공합니다.
- 이는 code의 중복을 줄이고, type 변환의 편의성을 향상시킵니다.

```typescript
type PartialPoint = Partial<{ x: number; y: number }>;
```

- `Partial` utility type은 모든 property를 선택적으로 만듭니다.
- `PartialPoint` type은 `x`와 `y` property가 모두 선택적인 새로운 type입니다.


### Conditional Type

- conditional(조건부) type은 **type의 조건부 logic을 표현**할 수 있게 해주며, **입력된 type에 따라 다른 type을 반환**할 수 있습니다.

```typescript
type IsNumber<T> = T extends number ? "yes" : "no";
```

- `IsNumber` type은 `T`가 `number` type에 할당 가능한 경우 "yes" type을, 그렇지 않은 경우 "no" type을 반환합니다.


### Mapped Type

- mapped type은 **기존 type의 property를 반복하여 새로운 type을 생성하거나 변형**할 수 있게 해줍니다.

```typescript
type ReadonlyPoint = Readonly<{ x: number; y: number }>;
```

- `Readonly` mapped type은 모든 property를 읽기 전용(readonly)으로 만듭니다.
- `ReadonlyPoint` type은 `x`와 `y`가 읽기 전용인 새로운 type입니다.
