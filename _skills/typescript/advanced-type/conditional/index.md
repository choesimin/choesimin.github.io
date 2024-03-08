---
layout: skill
title: TypeScript Advanced Type - Conditional Type (조건에 따라 Type 결정하기)
date: 2024-03-04
---




## Conditional Type : 특정 조건에 따라 Type 결정하기

- 조건부(conditional) type은 TypeScript에서 **특정 조건에 따라 type을 결정**할 수 있게 해주는 고급 type system의 기능입니다.
    - type의 형태를 동적으로 조작할 수 있어, 복잡한 type 관계를 표현할 때 유용합니다.
        - type을 programming 언어의 `if` 문(또는 삼항 연산자)처럼 다룰 수 있게 해주어, type의 선택적 사용을 가능하게 합니다.
    - 조건부 type은 TypeScript의 code를 유연하고 재사용 가능하게 만들어줍니다.

- 조건부 type은 일반적으로 generic type과 함께 사용되며, TypeScript 2.8 version에서 도입되었습니다.

```typescript
T extends U ? X : Y;
```

- `T extends U ? X : Y`는 "type `T`가 `U`에 할당 가능한 경우 type `X`를, 그렇지 않은 경우 type `Y`를 사용하라"는 의미입니다.
    - `T`와 `U`는 type입니다.
    - `T`가 `U`에 할당 가능한 경우의 결과 type은 `X`가 되고, 그렇지 않은 경우는 `Y`가 됩니다.
        - "`T`가 `U`에 할당 가능한 경우"는 "`T`가 `U`의 하위 type인 경우"를 의미합니다.

- 많은 utility type들이 조건부 type을 직접적으로 사용하여 구현되어 있습니다.
    - e.g., `Partial<T>`, `Required<T>`, `Readonly<T>`, `Record<K, T>`, `Pick<T, K>`, `Exclude<T, U>`, `Extract<T, U>`, `NonNullable<T>`, `ReturnType<T>`, `InstanceType<T>`.
    - 따라서 조건부 type을 사용하여 기능을 구현하기 전에, TypeScript에서 미리 정의한 utility type이 있는지 확인하는 것이 좋습니다.




---




## 조건부 Type 사용 예시


### 조건부 Type을 사용한 Type Filtering

```typescript
type IsString<T> = T extends string ? 'yes' : 'no';

type A = IsString<string>;    // 'yes'
type B = IsString<number>;    // 'no'
```

- `IsString` type은 generic type `T`가 `string`에 할당 가능한지를 검사하여, 그 결과에 따라 `'yes'` 또는 `'no'`라는 literal type을 반환합니다.


#### `never` Type Filtering

- 조건부 type을 사용하여 특정 조건을 만족하는 type만을 추출할 수 있습니다.
- `never` type은 TypeScript에서 "type 없음"을 나타내므로, 조건에 맞지 않는 type을 filtering할 때 유용하게 사용됩니다.

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
```

- `NonNullable` type은 `null`이나 `undefined`를 제외한 type을 생성합니다.


### 조건부 Type을 사용한 Type 추출

```typescript
type ExtractStringOrNumber<T> = T extends string | number ? T : never;

type C = ExtractStringOrNumber<string | boolean | number>;    // string | number
```

- `ExtractStringOrNumber` type은 union type `T`에서 `string` 또는 `number` type만을 추출합니다.
- `boolean` type은 `never`로 대체되므로 결과적으로 추출되지 않습니다.


### 조건부 Type을 이용한 함수 Overloading 단순화

- 조건부 type을 사용하면, 복잡한 함수 overloading을 단순화할 수 있습니다.

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : T;

function f1(a: number): number;
function f1(a: string): string;
function f1(a: number | string) {
    return a;
}

type Test = ReturnType<typeof f1>;    // string | number
```

- `ReturnType`은 함수 type에서 반환 type을 추론합니다.
- `infer R` keyword를 사용하여 반환 type을 `R`로 추론하고, 이를 조건부 type의 결과로 사용합니다.
- 따라서 `Test` type은 `string | number` union type이 됩니다.


### 복잡한 조건과 Type 추론

- `infer` keyword를 사용하여 조건부 type 내에서 type을 추론할 수 있습니다.
- 이를 통해 함수의 매개 변수 type이나 반환 type 등을 추출하는 등의 고급 type 조작이 가능해집니다.

```typescript
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
```

- `UnpackPromise` type은 `Promise`에서 감싸진 type을 추출합니다.
    - e.g., `Promise<string>`의 경우 `string`을 반환합니다.

