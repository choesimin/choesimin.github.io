---
layout: note
permalink: /234
title: TypeScript Mapped Type - 기존 Type으로 새로운 Type 생성하기
description: Mapped Type은 TypeScript에서 기존 타입의 속성들을 변형하여 새로운 타입을 생성하는 기능입니다.
date: 2024-03-04
---


## Mapped Type

- Mapped Type은 TypeScript에서 **기존의 type을 기반으로 새로운 type을 생성하는 방법을 제공**합니다.

- Mapped Type을 사용하면, **기존 type의 각 속성을 변형하여 새로운 type을 만들 수 있습니다.**
    - 예를 들어, 속성을 읽기 전용으로 만들거나, 선택적으로 설정하거나, 심지어 속성 이름을 변형하는 등 다양한 용도로 사용될 수 있습니다.

```typescript
type MappedType<T> = {
    [P in keyof T]: T[P];
}
```

- `T`는 변형을 적용할 기존 type입니다.
- `keyof T`는 type `T`의 모든 속성 key를 union type으로 추출합니다.
- `P in keyof T`는 `T`의 각 속성에 대해 반복(iterate)하며, 각 속성 key `P`에 대해 적용할 변형을 정의합니다.
- `T[P]`는 속성 key `P`에 해당하는 type을 나타냅니다.


### 읽기 전용 Mapped Type

- 기존 type의 **모든 속성을 읽기 전용(readonly)으로 만듭니다.**

```typescript
interface Person {
    name: string;
    age: number;
}

type ReadonlyPerson = {
    readonly [P in keyof Person]: Person[P];
}

const person: ReadonlyPerson = {
    name: "John",
    age: 30
};

person.name = "Jane";    // 오류: 'name' 속성은 읽기 전용이므로 할당할 수 없습니다.
```


### 선택적 속성 Mapped Type

- 기존 type의 **모든 속성을 선택적(optional property)으로 만듭니다.**

```typescript
type PartialPerson = {
    [P in keyof Person]?: Person[P];
}

const person: PartialPerson = {
    name: "John"    // 'age' 속성은 선택적이므로 생략 가능
};
```


---


## Mapped Type 응용 : 다른 고급 Type과 함께 사용하기

- TypeScript에서 mapped type을 활용할 수 있는 방법과 응용 사례는 다양합니다.


### 조건부 Type과의 결합

- mapped type은 조건부 type과 결합하여 특정 조건에 따라 type을 다르게 할당할 수 있습니다.
    - 예를 들어, 특정 type만 읽기 전용으로 만들고 싶을 때 사용할 수 있습니다.

```typescript
type ConditionalReadonly<T> = {
    [P in keyof T]: T[P] extends Function ? T[P] : Readonly<T[P]>;
};
```

- `T[P]`가 `Function` type을 상속한다면 그대로 두고, 그렇지 않은 경우에는 `Readonly<T[P]>`를 적용합니다.


### Template Literal Type과의 결합

- mapped type은 template literal type과 결합하여 속성의 이름을 동적으로 생성할 수 있습니다.
- 이를 통해 기존 type의 속성을 기반으로 새로운 속성 이름을 생성하는 것이 가능합니다.

```typescript
// 각 속성 이름 앞에 `get`을 붙이고 `Method`를 뒤에 붙여 새로운 메소드 이름 생성
type PropertyNames<T> = {
    [P in keyof T as `get${Capitalize<string & P>}Method`]: () => T[P]
};
```

```typescript
// 기존 type의 속성 이름에 접두사 추가
type PrefixedPerson = {
    [P in keyof Person as `prefixed_${string & P}`]: Person[P]
}

const person: PrefixedPerson = {
    prefixed_name: "John",
    prefixed_age: 30
};
```


### Utility Type 확장

- mapped type은 기존 utility type을 확장하거나 변형하여 새로운 utility type을 만드는 데 사용될 수 있습니다.
    - 예를 들어, `Partial`과 `Readonly`를 결합한 새로운 utility type을 정의할 수 있습니다.

```typescript
type PartialReadonly<T> = {
    [P in keyof T]?: Readonly<T[P]>;
};
```

- `PartialReadonly` type은 객체의 모든 속성을 선택적이면서 동시에 읽기 전용으로 만듭니다.
