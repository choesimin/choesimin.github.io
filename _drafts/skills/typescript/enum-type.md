---
layout: skill
title: TypeScript - Type
date: 2024-02-27
---



TypeScript의 타입 시스템은 매우 다양하고, 타입을 크게 기본 타입(Primitive Types), 객체 타입(Object Types), 그리고 특수 타입(Special Types)으로 분류할 수 있습니다. 여기에는 TypeScript가 제공하는 고급 타입(Advanced Types)도 포함됩니다.

### 기본 타입 (Primitive Types)
- `number`
- `string`
- `boolean`
- `bigint`
- `symbol`
- `null`
- `undefined`

### 객체 타입 (Object Types)
- `object`
- 배열 (Array): `T[]` 또는 `Array<T>`
- 튜플 (Tuple): `[T1, T2, ...]`
- 열거형 (Enum): `enum { ... }`
- 클래스 (Class)
- 인터페이스 (Interface)
- 함수 (Function): `(arg1: Type, arg2: Type) => ReturnType`

### 특수 타입 (Special Types)
- `any`
- `unknown`
- `never`
- `void`

### 고급 타입 (Advanced Types)
- 유니온 타입 (Union Type): `Type1 | Type2`
- 교차 타입 (Intersection Type): `Type1 & Type2`
- 리터럴 타입 (Literal Types): `'a'`, `100`, `true`
- 조건부 타입 (Conditional Types): `T extends U ? X : Y`
- 맵핑된 타입 (Mapped Types): `{ [P in Keys]: Type }`
- 제네릭 타입 (Generic Types): `<T>`
- 인덱스 타입 (Index Types): `{ [key: Type]: T }`
- 인덱스 접근 타입 (Indexed Access Types): `T[K]`
- 타입 가드 (Type Guards)
- 타입 단언 (Type Assertions): `<Type>value` 또는 `value as Type`
- 템플릿 리터럴 타입 (Template Literal Types)

이 분류는 TypeScript의 타입 시스템을 기본적으로 이해하는 데 도움이 되며, 각 타입은 다양한 상황에서 유용하게 사용됩니다.



- primitive
    - boolean
    - number
    - string
    - array
- never
- literal
- union
- intersection
- enum



