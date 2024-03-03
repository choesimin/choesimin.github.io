---
layout: skill
title: TypeScript Advanced Type - Mapped Type ()
date: 2024-03-03
---




## Mapped Type

- 맵드 타입(Mapped Types)은 TypeScript에서 기존의 타입을 기반으로 새로운 타입을 생성하는 방법을 제공합니다. 이 기능을 사용하면, 기존 타입의 각 속성을 변형하여 새로운 타입을 만들 수 있습니다.
    - e.g., 속성을 읽기 전용으로 만들나, 선택적으로 설정하거나, 심지어 속성 이름을 변형하는 등 다양한 용도로 사용될 수 있습니다.
    - 이를 통해 코드의 재사용성을 높이고, 타입 안전성을 강화할 수 있습니다.


### 맵드 타입의 기본 구조

맵드 타입은 다음과 같은 구조를 가집니다.

```typescript
type MappedType<T> = {
  [P in keyof T]: T[P];
}
```

- `T`는 변형을 적용할 기존 타입입니다.
- `keyof T`는 타입 `T`의 모든 속성 키를 유니온 타입으로 추출합니다.
- `P in keyof T`는 `T`의 각 속성에 대해 반복(iterate)하며, 각 속성 키 `P`에 대해 적용할 변형을 정의합니다.
- `T[P]`는 속성 키 `P`에 해당하는 타입을 나타냅니다.


### 읽기 전용 맵드 타입

기존 타입의 모든 속성을 읽기 전용으로 만드는 맵드 타입 예제입니다.

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

person.name = "Jane"; // 오류: 'name' 속성은 읽기 전용이므로 할당할 수 없습니다.
```


### 선택적 속성 맵드 타입

기존 타입의 모든 속성을 선택적으로 만드는 맵드 타입 예제입니다.

```typescript
type PartialPerson = {
  [P in keyof Person]?: Person[P];
}

const person: PartialPerson = {
  name: "John" // 'age' 속성은 선택적이므로 생략 가능
};
```


### 맵드 타입을 사용한 속성 이름 변형

기존 타입의 속성 이름에 접두사를 추가하는 맵드 타입 예제입니다.

```typescript
type PrefixedPerson = {
  [P in keyof Person as `prefixed_${string & P}`]: Person[P]
}

const person: PrefixedPerson = {
  prefixed_name: "John",
  prefixed_age: 30
};
```

이 예제에서는 `as` 절을 사용하여 속성 키의 이름을 변형합니다. 이 기능은 TypeScript 4.1 버전에서 도입되었습니다.





---




## 맵드 타입 응용 : 다른 고급 Type과 함께 사용하기

- TypeScript에서 맵드 타입을 활용할 수 있는 방법과 응용 사례는 다양합니다.


### 조건부 타입과의 결합

맵드 타입은 조건부 타입과 결합하여 특정 조건에 따라 타입을 다르게 할당할 수 있습니다. 예를 들어, 특정 타입만 읽기 전용으로 만들고 싶을 때 사용할 수 있습니다.

```typescript
type ConditionalReadonly<T> = {
  [P in keyof T]: T[P] extends Function ? T[P] : Readonly<T[P]>;
};
```

이 예제에서는 `T[P]`가 `Function` 타입을 상속한다면 그대로 두고, 그렇지 않은 경우에는 `Readonly<T[P]>`를 적용합니다.


### 템플릿 리터럴 타입과의 결합

맵드 타입은 템플릿 리터럴 타입과 결합하여 속성의 이름을 동적으로 생성할 수 있습니다. 이를 통해 기존 타입의 속성을 기반으로 새로운 속성 이름을 생성하는 것이 가능합니다.

```typescript
type PropertyNames<T> = {
  [P in keyof T as `get${Capitalize<string & P>}Method`]: () => T[P]
};
```

이 예제에서는 각 속성 이름 앞에 `get`을 붙이고 `Method`를 뒤에 붙여 새로운 메소드 이름을 생성합니다.


### 유틸리티 타입 확장

맵드 타입은 기존 유틸리티 타입을 확장하거나 변형하여 새로운 유틸리티 타입을 만드는 데 사용될 수 있습니다. 예를 들어, `Partial`과 `Readonly`를 결합한 새로운 유틸리티 타입을 정의할 수 있습니다.

```typescript
type PartialReadonly<T> = {
  [P in keyof T]?: Readonly<T[P]>;
};
```

이 타입은 객체의 모든 속성을 선택적이면서 동시에 읽기 전용으로 만듭니다.


