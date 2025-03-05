---
layout: skill
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


