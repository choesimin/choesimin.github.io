---
layout: skill
title: TypeScript Advanced Type - Conditional Type (조건에 따라 Type 결정하기)
date: 2024-03-12
---




## 조건부 Type : 특정 조건에 따라 Type 결정하기

- 조건부(conditional) type은 TypeScript에서 **특정 조건에 따라 type을 결정**할 수 있게 해주는 고급 type system의 기능입니다.
    - TypeScript 2.8 version에서 도입되었습니다.

- 조건부 type을 통해 **type의 형태를 동적으로 조작**할 수 있어, 복잡한 type 관계를 표현할 때 유용합니다.
    - type을 programming 언어의 `if` 문처럼 다룰 수 있게 해주어, type의 선택적 사용을 가능하게 합니다.

- 많은 utility type들이 조건부 type을 사용하여 구현되어 있습니다.
    - e.g., `Partial<T>`, `Required<T>`, `Readonly<T>`, `Record<K, T>`, `Pick<T, K>`, `Exclude<T, U>`, `Extract<T, U>`, `NonNullable<T>`, `ReturnType<T>`, `InstanceType<T>`.
    - 따라서 조건부 type으로 기능을 구현하기 전에, TypeScript에서 미리 만들어 놓은 utility type이 있는지 확인하는 것이 좋습니다.

- 조건부 type은 JavaScript에 있는 삼항 연산자 조건문(`condition ? trueExpression : falseExpression`) 같은 형태를 가집니다.

```typescript
SomeType extends OtherType ? TrueType : FalseType;
```

- `extends`를 기준으로 왼쪽에 있는 type이 오른쪽 type에 할당할 수 있다면 첫 번째 분기('참' 값 분기)를, 그렇지 않다면 뒤의 분기('거짓' 값 분기)를 얻게 됩니다.

```typescript
interface Animal {
    live(): void;
}
interface Dog extends Animal {
    woof(): void;
}
 
type Example1 = Dog extends Animal ? number : string;    // type Example1 = number;
type Example2 = RegExp extends Animal ? number : string;    // type Example2 = string;
```

- `Dog extends Animal`에 따라 type이 `number`인지 `string`인지 결정됩니다.




---




## Generic Type과 함께 사용하기

- 조건부 type은 일반적으로 generic type과 함께 사용됩니다.
    - 조건부 type만 사용하는 것보다 더 유용하기 때문입니다.

```typescript
T extends U ? X : Y;
```

- `T`와 `U`는 generic type입니다.

- 조건부 type을 generic type과 함께 사용할 때는 `T extends U ? X : Y` 형태의 구문을 사용하여, **type `T`가 `U`를 확장(상속)한다면 `X` type을, 그렇지 않다면 `Y` type을 결과로 반환**합니다.
    - `T`가 `U`에 할당 가능한 경우에는 결과 type이 `X`가 되고, 그렇지 않은 경우에는 `Y`가 됩니다.
        - "`T`가 `U`에 할당 가능한 경우"는 "`T`가 `U`의 하위 type인 경우"를 의미합니다.


### 조건부 Type 적용 전

- `createLabel` 함수는 입력 값의 type에 따라 반환 값의 type이 달라지기 때문에, 여러 개의 함수를 만들어 overloading합니다.

```typescript
interface IdLabel {
    id: number;
}
interface NameLabel {
    name: string;
}
 
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(idOrName: number | string): IdLabel | NameLabel;
function createLabel(idOrName: number | string): IdLabel | NameLabel {
    throw "unimplemented";
}
```

- 함수를 직접 선언하여 overloading하는 방식을 사용하면 program 전체에서 매번 비슷한 종류의 함수를 만들어야 합니다.
    - `createLabel` 함수에서 새로운 type을 다루고 싶을 때마다 overloading 함수의 수는 계속해서 늘어납니다.
    - 이는 효율적이지 못하며, overloading 함수를 계속 만드는 것은 번거로운 작업입니다.

- **generic type과 조건부 type을 함께 사용하여**, 함수를 더 간편하게 overloading할 수 있습니다.


### 조건부 Type 적용 후

- 여러 type에 대한 case를 위해 함수를 overloading하는 것 대신, **generic type에 조건부 type을 적용하여 overloading된 함수 수를 줄일 수 있습니다.**

```typescript
interface IdLabel {
    id: number;
}
interface NameLabel {
    name: string;
}
 
type IdOrName<T extends number | string> = T extends number ? IdLabel : NameLabel;
function createLabel<T extends number | string>(idOrName: T): IdOrName<T> {
    throw "unimplemented";
}

let a = createLabel("typescript");    // let a: NameLabel
let b = createLabel(2.8);    // let b: IdLabel
let c = createLabel(Math.random() ? "hello" : 42);    // let c: NameLabel | IdLabel
```

- 조건부 type을 사용하면 단일 함수까지 overloading 없이 단순화시킬 수 있습니다.


### 재귀 참조 불가

- union type, intersection type과 유사하게, **조건부 type은 재귀적으로 자기 자신을 참조할 수 없습니다.**

```typescript
type ElementType<T> = T extends any[] ? ElementType<T[number]> : T;    // Error
```




---




## 분산적인 조건부 Type (Distributive Conditional Type)

- 조건부 type이 generic type과 함께 사용될 때, **type 인수(argument)로 union type을 받으면 분산적으로 동작**하게 됩니다.
    - 조건부 type에 대한 instance를 생성하는 과정에서 자동으로 union type으로 분산됩니다.
    - union type의 각 요소(member)에 대해 개별적으로 조건을 평가하여 결과 type을 결정합니다.

- `T`에 대한 type 인수로 `A | B | C`를 사용하여 `T extends U ? X : Y` type을 instance로 만들면, `(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)` 변환되어 type이 결정됩니다.

```typescript
type ToArray<T> = T extends any ? T[] : never;

type StrArrOrNumArr = ToArray<string | number>;    // type StrArrOrNumArr = string[] | number[]
```

1. `ToArray` 조건부 type을 적용시키기 위해, type 인수로 받은 union type(`string | number`)을 가져옵니다.
2. `ToArray` 조건부 type은 **union type의 member들을 분리**하여, 각 member에 배열로 변환하는 작업을 따로 적용합니다.
    - 각 member에 따로 적용하기 때문에, 변환 작업은 **`ToArray<string> | ToArray<number>`로 진행**합니다.
        - `ToArray<string | number>`이 아닙니다.
3. `StrArrOrNumArr` type은 분산성이 적용된 결과인 **`string[] | number[]` type을 최종적으로 반환**합니다.


### 분산 조건부 Type 사용하지 않기 : 분산 동작 방지

- 분산성이 적용된 일반적인 동작을 원하지 않으면, **`extends` keyword의 양 옆 요소들을 대괄호(`[]`)로 감싸서** 분산을 방지할 수 있습니다.

```typescript
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type StrArrOrNumArr = ToArrayNonDist<string | number>;    // type StrArrOrNumArr = (string | number)[]
```

- `ToArrayNonDist` 조건부 type은 분산 동작을 하지 않도록 요소들을 대괄호로 감쌌기 때문에, **type 인수로 union type이 들어와도 분산적인 동작을 하지 않습니다.**
    - union type의 member들을 분리하지 않고, **union type 자체에 배열 변환 작업**을 합니다.
    - 따라서 변환 작업은 **`ToArray<string | number>`로 진행**하고, **결과도 `(string | number)[]`로 반환**합니다.


### 분산 조건부 Type 활용 예제 : Union Type Filtering

```typescript
type Diff<T, U> = T extends U ? never : T;    // U에 할당할 수 있는 type을 T에서 제거
type Filter<T, U> = T extends U ? T : never;    // U에 할당할 수 없는 type을 T에서 제거

type T1 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;    // "b" | "d"
type T2 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">;    // "a" | "c"
type T3 = Diff<string | number | (() => void), Function>;    // string | number
type T4 = Filter<string | number | (() => void), Function>;    // () => void

type NonNullable<T> = Diff<T, null | undefined>;    // T에서 null과 undefined를 제거

type T5 = NonNullable<string | number | undefined>;    // string | number
type T6 = NonNullable<string | string[] | null | undefined>;    // string | string[]

function f1<T>(x: T, y: NonNullable<T>) {
    x = y;    // 성공
    y = x;    // 오류
}

function f2<T extends string | undefined>(x: T, y: NonNullable<T>) {
    x = y;    // 성공
    y = x;    // 오류
    let s1: string = x;    // 오류
    let s2: string = y;    // 성공
}
```




---




## 조건부 Type의 Type 추론 : `infer` Keyword

- `infer` keyword는 TypeScript의 고급 type 기능 중 하나로, **조건부 type(`T extends U ? X : Y`) 내에서 사용되어 type을 동적으로 추론**하는 데 사용됩니다.
    - `infer` keyword를 통해 조건부 type의 type 추론(type inference) 기능을 사용할 수 있으며, **'참' 값 분기에서 비교하는 type을 추론**합니다.

- `infer` keyword는 주로 generic type과 함께 사용되며, 특정 type의 구조에서 일부를 동적으로 추론할 때 유용합니다.
    - e.g., 함수 type의 매개 변수나 반환 type을 추론하거나, generic type에서 특정 type을 추출하는 데 사용됩니다.


```typescript
T extends (infer U) ? X : Y
```

- 조건부 type을 사용할 때, `T extends U ? X : Y` 형태의 조건문에서 `U`의 위치에 `infer` keyword를 사용하여 type을 추론할 수 있습니다.
    - `infer` keyword 다음에 나오는 변수(e.g., `infer R`)는 조건부 type이 참인 경우에만 type을 추론하며, 이 변수는 추론된 type을 나타내는 데 사용됩니다.

- `infer` keyword의 사용은 복잡한 type 조작을 단순화하고, code의 가독성을 높이며, 재사용 가능한 type을 생성하는 데 큰 도움을 줍니다.
    1. **복잡한 type 추론 가능** : `infer`를 사용하면, 복잡한 구조에서 특정 type을 추출하거나, 함수의 반환 type, tuple의 요소 type 등을 쉽게 추론할 수 있습니다.
    2. **가독성 향상** : 복잡한 type 연산을 명확하고 간결한 방식으로 표현할 수 있어, type 정의를 이해하기 쉬워집니다.
    3. **재사용성 증가** : 추론된 type을 다양한 곳에서 재사용할 수 있어, type code의 중복을 줄이고 유지보수성을 향상시킵니다.

- `infer` keyword는 조건부 type의 **`true` 분기에서만 사용할 수 있습니다.**
- 추론할 type이 명확하지 않거나 조건부 type이 항상 참이 아닌 경우, **`never` type을 반환하도록 설계하는 것이 일반적**입니다.


### 배열 요소의 Type 추론

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;

type Item = ElementType<number[]>;    // number
type NoItem = ElementType<string>;    // never
```

- `ElementType<T>` type은 배열 `T`의 요소 type을 추론합니다.
    - `T`가 배열이라면, `infer U`를 사용하여 배열의 요소 type을 `U`로 추론하고, 그 type을 반환합니다.
    - 배열이 아닌 경우에는 `never` type을 반환합니다.


### 함수 반환 Type 추론

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Func = () => number;
type FuncReturnType = ReturnType<Func>;    // number
```

- `ReturnType<T>` 조건부 type을 사용하여, generic type `T`가 함수 type일 경우 그 함수의 반환 type을 추론합니다.
    - `T`가 함수 type이라면, 해당 함수의 반환 type을 `infer R`를 사용하여 `R`로 추론하고, 그 type을 반환합니다.
    - 함수 type이 아닌 경우에는 `never`를 반환합니다.

- `T extends (...args: any[]) => infer R ? R : never` 구문에서 `infer R` 부분은 `T` type의 함수가 반환하는 type을 `R`로 추론하라는 의미입니다.


### Promise의 결과 Type 추론

```typescript
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type PromiseType = Promise<number>;
type ResolvedType = UnwrapPromise<PromiseType>;    // number
type NonPromiseType = UnwrapPromise<string>;    // string
```

- `UnwrapPromise<T>` type은 `T`가 `Promise`의 instance일 경우, promise가 해결(`resolve`)될 때의 type을 추론합니다.
    - 만약 `T`가 `Promise` type이라면, 그 안에 감싸진 type을 `infer U`를 사용하여 추론하고 반환합니다.
    - `T`가 promise가 아니라면, `T` 자체를 반환합니다.


### 객체에서 특정 Property의 Type 추론

```typescript
type PropertyType<T, K extends keyof T> = T extends { [P in K]: infer U } ? U : never;

interface Example {
    name: string;
    age: number;
}

type NameType = PropertyType<Example, 'name'>;    // string
type AgeType = PropertyType<Example, 'age'>;    // number
```

- `PropertyType<T, K>` type은 객체 type `T`에서 key `K`에 해당하는 property의 type을 추론합니다.
    - `PropertyType<T, K>` type은 객체 `T`가 key `K`를 가지고 있고, 해당 key의 type을 `infer U`를 통해 `U`로 추론할 수 있다면, 그 type을 반환합니다.
    - 만약 `T`에 `K` key가 없다면, `never` type을 반환합니다.




---




## 다양한 조건부 Type 사용 예시


### 조건부 Type을 사용한 Type Filtering

```typescript
type IsString<T> = T extends string ? 'yes' : 'no';

type A = IsString<string>;    // 'yes'
type B = IsString<number>;    // 'no'
```

- `IsString` type은 generic type `T`가 `string`에 할당 가능한지 검사하여, 그 결과에 따라 `'yes'` 또는 `'no'`라는 literal type을 반환합니다.

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




---




## Reference


- <https://www.typescriptlang.org/ko/docs/handbook/2/conditional-types.html>
- <https://typescript-kr.github.io/pages/advanced-types.html#조건부-type-conditional-types>
