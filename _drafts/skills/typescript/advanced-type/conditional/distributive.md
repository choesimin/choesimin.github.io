---
layout: skill
title: TypeScript Conditional Type - 분배 조건부 타입
date: 2024-03-03
---





## 분배 조건부 타입 (Distributive Conditional Types)


조건부 타입은 기본적으로 제네릭 타입에 대해 분배적으로 작동합니다. 즉, 유니온 타입을 조건부 타입에 넣으면, 각 유니온 멤버에 대해 개별적으로 조건부 타입이 적용되고 그 결과가 다시 유니온 타입으로 합쳐집니다.
TypeScript의 분배 조건부 타입(Distributive Conditional Types)은 조건부 타입이 유니온 타입(Union Types)에 대해 분배되는 특성을 설명합니다. 이는 조건부 타입을 유니온 타입의 각 멤버에 개별적으로 적용한 후, 그 결과를 다시 유니온 타입으로 합치는 방식을 말합니다. 이 특성은 복잡한 타입 변환을 단순하고 예측 가능한 방식으로 처리할 수 있게 해줍니다.



### 분배 조건부 타입의 작동 방식

분배 조건부 타입은 다음과 같은 형태의 조건부 타입에서 자동으로 발생합니다:

```typescript
T extends U ? X : Y
```

여기서 `T`가 유니온 타입이라면, TypeScript는 이 조건을 `T`의 각 멤버에 대해 개별적으로 적용합니다. 예를 들어, `T`가 `A | B` 유형이고 `U`가 `B` 유형이라면, TypeScript는 먼저 `A extends U ? X : Y`를 평가하고, 그 다음으로 `B extends U ? X : Y`를 평가하여, 두 결과를 `|` 연산자로 합칩니다.

### 예제

```typescript
type ExampleType<T> = T extends string ? string : number;
```

`ExampleType`은 제네릭 타입 `T`가 `string` 타입에 할당 가능한 경우 `string`을 반환하고, 그렇지 않으면 `number`를 반환합니다. `T`가 `string | boolean` 유니온 타입인 경우, TypeScript는 분배 조건부 타입을 사용하여 각 멤버에 대해 조건부 타입을 개별적으로 적용합니다:

```typescript
type Result = ExampleType<string | boolean>;
// 이는 'string | number' 타입으로 평가됩니다.
```

여기서 `string`은 `string`에 할당 가능하므로 첫 번째 분기(`string`)가 선택되고, `boolean`은 `string`에 할당 가능하지 않으므로 두 번째 분기(`number`)가 선택됩니다. 결과적으로 `Result` 타입은 `string | number`가 됩니다.





```typescript
type IsNumberOrString<T> = T extends number | string ? T : never;
type A = IsNumberOrString<number | string | boolean>; // number | string
```

이 예제에서 `A`의 타입은 `number | string`이 됩니다. `boolean`은 조건에 맞지 않으므로 결과에서 제외됩니다.






### 분배 방지

분배 조건부 타입의 자동 분배 행위는 유용할 수 있지만, 경우에 따라 이를 방지하고 싶을 수도 있습니다. 이를 위해 TypeScript는 조건부 타입 앞에 괄호를 사용하여 분배를 방지할 수 있습니다:

```typescript
type NonDistributiveExampleType<T> = [T] extends [string] ? string : number;
```

이 경우, `[T] extends [string] ? string : number`는 `T` 전체에 대해 단일 조건을 적용하므로, 유니온 타입에 대해 개별적으로 분배되지 않습니다.

분배 조건부 타입은 TypeScript에서 강력한 타입 변환과 조건부 로직을 구현할 수 있게 해주는 중요한 기능입니다. 이를 통해 개발자는 타입의 조건에 따라 다양한 타입 변환을 세밀하게 제어할 수 있습니다.




---




## 분배 조건부 타입에서의 `never`


TypeScript의 분배 조건부 타입(Distributive Conditional Types)에서 `never` 타입은 매우 중요한 역할을 합니다. `never` 타입은 그 자체로 "절대 발생할 수 없는" 타입을 나타내며, 조건부 타입에서 특정 조건을 만족하지 않는 유니온 타입의 멤버를 "제거"하는 데 사용될 수 있습니다.


### `never`의 역할

분배 조건부 타입을 사용할 때, 조건이 `false`로 평가되는 경우 해당 분기에서 `never` 타입을 반환하도록 할 수 있습니다. 이는 유니온 타입에서 특정 타입을 필터링하고자 할 때 유용합니다. TypeScript는 최종적인 타입 계산 시 `never` 타입을 자동으로 제외하기 때문에, 이 기법을 통해 조건에 부합하지 않는 타입을 유니온에서 제거할 수 있습니다.


### 예제: 필터링 유틸리티 타입

```typescript
type Exclude<T, U> = T extends U ? never : T;

type Result = Exclude<"a" | "b" | "c", "a">;
// Result 타입은 "b" | "c"
```

위 예제에서 `Exclude` 타입은 첫 번째 제네릭 인자 `T`에서 두 번째 인자 `U`에 해당하는 타입을 제외한 타입을 생성합니다. `T`가 `U`에 할당 가능하면, `never`를 반환하여 해당 타입을 결과 유니온 타입에서 제외합니다.


### 분배 조건부 타입과 `never`의 결합

분배 조건부 타입의 특성을 활용하여, 복잡한 유니온 타입에서 특정 조건을 만족하지 않는 모든 타입을 제거할 수 있습니다. 이는 타입 가드, 타입 필터링, 또는 타입 추론 시 매우 유용하게 사용됩니다.

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type Cleaned = NonNullable<string | number | undefined | null>;
// Cleaned 타입은 string | number
```

`NonNullable` 유틸리티 타입은 `null` 또는 `undefined` 타입을 제외하고 싶을 때 사용할 수 있습니다. 조건부 타입이 `null` 또는 `undefined`와 일치하면 `never`를 반환하여 해당 타입을 결과 유니온에서 제거합니다.


### 결론

분배 조건부 타입에서 `never`를 사용하는 것은 타입스크립트의 고급 타입 시스템을 효과적으로 활용하는 방법 중 하나입니다. `never`를 통해 조건에 부합하지 않는 타입을 유니온 타입에서 제거함으로써, 더 정확하고 안전한 타입을 정의할 수 있습니다. 이 기법은 복잡한 타입 조건과 타입 변환 작업에서 특히 유용하며, 타입스크립트 코드의 타입 안정성과 가독성을 향상시킵니다.




















