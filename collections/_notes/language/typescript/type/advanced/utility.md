---
layout: note
permalink: /78
title: TypeScript Utility Type - Type을 조작하기 위한 내장 Type
description: Utility Type은 type을 효과적으로 재사용하고 조작하기 위해 설계된 내장 type 집합으로, 개발자가 선언적이고 간결한 방식으로 기존 type을 변형하여 새로운 type을 생성할 수 있게 해주는 Partial, Readonly, Record 등의 미리 정의된 type들입니다.
date: 2024-03-03
---


## Utility Type

- TypeScript의 utility type은 type system 내에서 **type을 효과적으로 재사용하고 조작하기 위해 설계된 built-in(내장) type 집합**입니다.
    - 개발자가 보다 선언적이고 간결한 방식으로 type을 정의하고, type 조작을 통해 새로운 type을 생성할 수 있게 해줍니다.

- utility type은 일반적인 type 변환을 쉽게 수행할 수 있도록, TypeScript에서 기본으로 제공하는 미리 정의된 type 집합을 제공합니다.
    - utility type들을 사용하면, 기존 type을 변형하여 새로운 type을 생성하는 등의 작업을 간편하게 할 수 있습니다.
        - TypeScript type system의 강력한 type 변환 기능을 활용하여, 복잡한 type 조작을 보다 간편하고 안전하게 수행할 수 있습니다.

- 여러 utility type들이 조건부 type을 사용하여 구현되었습니다.
    - 조건부(conditional) type은 특정 조건에 따라 type을 결정할 수 있게 해주는 고급 type 중 하나입니다.

- utility type에는 `Partial`, `Readonly`, `Record`, `Pick`, `Omit` 등, 특정한 type 변환 작업을 위해 설계된 다양한 type이 있습니다.

| Utility Type | 설명 |
| --- | --- |
| `Partial<T>` | type `T`의 모든 속성을 선택적으로 만듦. |
| `Readonly<T>` | type `T`의 모든 속성을 읽기 전용으로 만듦. |
| `Record<K,T>` | key의 type이 `K`이고 값의 type이 `T`인 객체 type을 생성함. |
| `Pick<T,K>` | type `T`에서 속성 `K`만을 선택하여 구성된 type을 생성함. |
| `Omit<T,K>` | type `T`에서 속성 `K`를 제외한 type을 생성함. |
| `Exclude<T,U>` | type `T`에서 `U`에 할당할 수 있는 모든 속성을 제외함. |
| `Extract<T,U>` | type `T`에서 `U`에 할당할 수 있는 모든 속성만을 추출함. |
| `NonNullable<T>` | type `T`에서 `null`과 `undefined`를 제외한 type을 생성함. |
| `Parameters<T>` | 함수 type `T`의 매개 변수 type들을 tuple type으로 생성함. |
| `ConstructorParameters<T>` | class 생성자 type `T`의 매개 변수 type들을 tuple type으로 생성함. |
| `ReturnType<T>` | 함수 type `T`의 반환 type을 생성함. |
| `InstanceType<T>` | 생성자 함수 type `T`의 instance type을 생성함. |
| `Required<T>` | type `T`의 모든 속성을 필수로 만듦. |
| `ThisParameterType` | 함수 type의 `this` 매개 변수의 type을 추출함. TypeScript 3.2에서 추가됨. |
| `OmitThisParameter` | 함수 type에서 `this` 매개 변수 type을 제거함. TypeScript 3.0에서 추가됨. |
| `ThisType<T>` | 객체 literal이나 interface에서 `this`의 type을 지정함. TypeScript 2.0에서 추가됨. `--noImplicitThis` flag 필요. |


### Utility Type을 사용하는 이유

1. **type 안전성 향상** : utility type을 사용함으로써 개발자는 기존 type의 구조를 유지하면서, 특정 속성을 수정하거나 추가하는 등의 type 조작을 안전하게 수행할 수 있습니다.
    - code 전반에 걸쳐 일관된 type 안전성을 보장합니다.

2. **code 재사용성 증대** : utility type을 활용하면, 기존 type을 기반으로 새로운 type을 쉽게 생성하고 조작할 수 있습니다.
    - 비슷한 type pattern이 반복될 때 code 중복을 줄이고, 재사용성을 높이는 데 도움이 됩니다.

3. **개발 생산성 향상** : utility type을 사용하면 복잡한 type 조작을 간단한 선언으로 해결할 수 있어, 개발 과정이 간소화됩니다.
    - 개발자가 보다 신속하게 type-safe한 code를 작성할 수 있게 해주며, 결과적으로 생산성을 증대시킵니다.

4. **유연성과 확장성 제공** : utility type들은 다양한 type 조작을 위한 기능을 제공하여, 변경에 유연하게 대처할 수 있게 합니다.
    - project의 요구 사항이 변경되어 type을 수정하거나 확장해야 할 때 유연하게 대응할 수 있도록 해줍니다.


---


## Utility Type의 종류


### `Partial<T>`

- type `T`의 모든 속성을 선택적으로 만듭니다.

```typescript
interface Todo {
    title: string;
    description: string;
}

const updateTodo: Partial<Todo> = { title: "new title" };
```


### `Readonly<T>`

- type `T`의 모든 속성을 읽기 전용(readonly)으로 만듭니다.

```typescript
interface Todo {
    title: string;
}

const myTodo: Readonly<Todo> = { title: "Readonly title" };
myTodo.title = "new title";        // 오류: 'title'은 읽기 전용 속성이므로 할당할 수 없습니다.
```


### `Record<K, T>`

- key의 type이 `K`이고 값의 type이 `T`인 객체 type을 생성합니다.

```typescript
type Page = "home" | "about" | "contact";
const pageinfo: Record<Page, string> = {
    home: "Welcome",
    about: "About us",
    contact: "Contact us",
};
```


### `Pick<T, K>`

- type `T`에서 속성 `K`만을 선택하여 구성된 type을 생성합니다.

```typescript
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;
```


### `Omit<T, K>`

- type `T`에서 속성 `K`를 제외한 type을 생성합니다.

```typescript
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;
```


### `Exclude<T, U>`

- type `T`에서 `U`에 할당할 수 있는 모든 속성을 제외합니다.

```typescript
type T = string | number | boolean;
type TWithoutBoolean = Exclude<T, boolean>;
```


### `Extract<T, U>`

- type `T`에서 `U`에 할당할 수 있는 모든 속성만을 추출합니다.

```typescript
type T = string | number | boolean;
type TOnlyNumber = Extract<T, number>;
```


### `NonNullable<T>`

- type `T`에서 `null`과 `undefined`를 제외한 type을 생성합니다.

```typescript
type T = string | number | null | undefined;
type NonNullableT = NonNullable<T>;
```


### `Parameters<T>`

- 함수 type `T`의 매개 변수 type들을 tuple type으로 생성합니다.

```typescript
function doSomething(name: string, age: number): void {}

type Params = Parameters<typeof doSomething>;
```


### `ConstructorParameters<T>`

- class 생성자 type `T`의 매개 변수 type들을 tuple type으로 생성합니다.

```typescript
class Todo {
    constructor(public title: string, public description: string) {}
}

type CtorParams = ConstructorParameters<typeof Todo>;
```


### `ReturnType<T>`

- 함수 type `T`의 반환 type을 생성합니다.

```typescript
function getAge(): number {
    return 30;
}

type Age = ReturnType<typeof getAge>;
```


### `InstanceType<T>`

- 생성자 함수 type `T`의 instance type을 생성합니다.

```typescript
class Todo {
    title: string;
    constructor(title: string) { this.title = title; }
}

type TodoInstance = InstanceType<typeof Todo>;
```


### `Required<T>`

- type `T`의 모든 속성을 필수로 만듭니다.

```typescript
interface Props {
    a?: number;
    b?: string;
}

const props: Required<Props> = { a: 5, b: "Required" };
```


### `ThisParameterType`

- 함수 type의 `this` 매개 변수의 type을 추출합니다.

```typescript
function toHex(this: Number) {
    return this.toString

(16);
}

type HexThis = ThisParameterType<typeof toHex>;
```


### `OmitThisParameter`

- 함수 type에서 `this` 매개 변수 type을 제거합니다.

```typescript
function toHex(this: Number) {
    return this.toString(16);
}

const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
```


### `ThisType<T>`

- `ThisType<T>` type은 객체 literal이나 interface에서 `this`의 type을 지정합니다.
- 주로 객체 literal의 메소드에서 `this`의 type을 명시적으로 선언할 때 사용됩니다.
- `ThisType<T>`는 TypeScript의 `--noImplicitThis` flag가 활성화된 경우에 유용합니다.

```typescript
type ObjectWithThis = { hello: string } & ThisType<{ world: string }>;

const obj: ObjectWithThis = {
    hello: "Hello",
    getWorld() {
        return this.world;    // `this`의 type이 { world: string }으로 명시적으로 지정됨
    }
};
```

- `ThisType<T>`는 직접적인 예제로 설명하기 어렵습니다.
- `ThisType<T>` type은 주로 mixin이나 고급 객체 구성 pattern에서 사용됩니다.
