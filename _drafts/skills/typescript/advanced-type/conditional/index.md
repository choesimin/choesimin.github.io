---
layout: skill
title: TypeScript Advanced Type - Conditional Type ()
date: 2024-03-03
---





## Conditional Type

조건부 타입(Conditional Types)은 TypeScript에서 특정 조건에 따라 타입을 결정할 수 있게 해주는 고급 타입 시스템의 기능입니다. 이는 타입을 프로그래밍 언어의 if 문처럼 다룰 수 있게 해주어, 타입의 선택적 사용을 가능하게 합니다. 조건부 타입은 타입스크립트의 코드를 보다 유연하고 재사용 가능하게 만들어줍니다.

TypeScript의 조건부 타입(Conditional Types)은 입력된 타입에 따라 타입을 조건적으로 결정할 수 있게 해주는 고급 타입 시스템 기능입니다. 이를 통해 타입의 형태를 동적으로 조작할 수 있어, 복잡한 타입 관계를 표현할 때 유용합니다. 조건부 타입은 일반적으로 제네릭 타입과 함께 사용되며, 타입스크립트 2.8 버전에서 도입되었습니다.


```typescript
T extends U ? X : Y;
```

이는 "타입 `T`가 `U`에 할당 가능한 경우 타입 `X`를, 그렇지 않은 경우 타입 `Y`를 사용하라"는 의미입니다.
여기서 `T`와 `U`는 타입이고, `T`가 `U`에 할당 가능한 경우(`T`가 `U`의 서브타입인 경우) 결과 타입은 `X`가 되고, 그렇지 않은 경우 `Y`가 됩니다. 




---





## 조건부 타입 사용 예시



### 조건부 타입을 사용한 타입 필터링

```typescript
type IsString<T> = T extends string ? 'yes' : 'no';

type A = IsString<string>;  // 'yes'
type B = IsString<number>;  // 'no'
```

이 예제에서 `IsString` 타입은 제네릭 타입 `T`가 `string`에 할당 가능한지를 검사하여, 그 결과에 따라 `'yes'` 또는 `'no'`라는 리터럴 타입을 반환합니다.


#### `never` 타입 필터링

조건부 타입을 사용하여 특정 조건을 만족하는 타입만을 추출할 수 있습니다. `never` 타입은 타입스크립트에서 "타입 없음"을 나타내므로, 조건에 맞지 않는 타입을 필터링할 때 유용하게 사용됩니다.

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
```

`NonNullable` 타입은 `null`이나 `undefined`를 제외한 타입을 생성합니다.




### 조건부 타입을 사용한 타입 추출

```typescript
type ExtractStringOrNumber<T> = T extends string | number ? T : never;

type C = ExtractStringOrNumber<string | boolean | number>;  // string | number
```

이 예제에서 `ExtractStringOrNumber` 타입은 유니온 타입 `T`에서 `string` 또는 `number` 타입만을 추출합니다. `boolean` 타입은 `never`로 대체되므로 결과적으로 추출되지 않습니다.





### 조건부 타입을 이용한 함수 오버로드 단순화

조건부 타입을 사용하면, 복잡한 함수 오버로드를 단순화할 수 있습니다.

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : T;

function f1(a: number): number;
function f1(a: string): string;
function f1(a: number | string) {
  return a;
}

type Test = ReturnType<typeof f1>;  // string | number
```

여기서 `ReturnType`은 함수 타입에서 반환 타입을 추론합니다. `infer R` 키워드를 사용하여 반환 타입을 `R`로 추론하고, 이를 조건부 타입의 결과로 사용합니다. 따라서 `Test` 타입은 `string | number` 유니온 타입이 됩니다.




### 복잡한 조건과 타입 추론

`infer` 키워드를 사용하여 조건부 타입 내에서 타입을 추론할 수 있습니다. 이를 통해 함수의 매개변수 타입이나 반환 타입 등을 추출하는 등의 고급 타입 조작이 가능해집니다.

```typescript
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
```

`UnpackPromise` 타입은 `Promise`에서 감싸진 타입을 추출합니다. 예를 들어, `Promise<string>`의 경우 `string`을 반환합니다.

조건부 타입은 TypeScript의 타입 시스템을 보다 동적이고 유연하게 만들어 주며, 복잡한 타입 조건을 간결하게 표현할 수 있게 해줍니다. 이를 통해 라이브러리나 프레임워크를 작성할 때 사용자에게 보다 정확한 타입 정보를 제공할 수 있고, 타입 관련 버그를 줄일 수 있습니다.



