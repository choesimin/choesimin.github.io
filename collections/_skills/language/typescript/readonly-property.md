---
layout: skill
permalink: /140
title: TypeScript Read Only Property - 읽기 전용 속성
description: TypeScript의 Read Only Property는 객체의 특정 속성을 수정할 수 없게 만드는 방법으로, 객체 생성 후 해당 속성의 값을 변경할 수 없습니다.
date: 2024-03-11
---


## `readonly` : 읽기 전용 속성

- TypeScript는 개발자가 class, interface, type alias에서 **property를 수정할 수 없게 만드는** `readonly` 한정자를 제공합니다.
- `readonly` 속성을 사용하면 객체 생성 후 해당 property의 값을 변경할 수 없습니다.
    - 이는 **불변성을 보장**하고, code를 더 안전하게 만들며, 의도하지 않은 변화로부터 보호하는 데 유용합니다.
    - 특히 함수형(functional) programming, 선언형(declarative) programming 등의 불변성을 중시하는 programming paradigm을 채택할 때 유용합니다.

- `readonly` 속성은 주로 class의 member 변수나 interface의 property에 사용됩니다.
    - class 생성자(constructor)에서 `readonly` property를 초기화할 수 있지만, 이후에는 그 값을 변경할 수 없습니다.


### `readonly` 속성을 갖는 Class

```typescript
class Person {
    readonly name: string;

    constructor(name: string) {
        this.name = name;    // 초기화는 가능함
    }

    changeName(newName: string) {
        this.name = newName;    // Error: Cannot assign to 'name' because it is a read-only property.
    }
}

const person = new Person("Alice");
console.log(person.name);    // "Alice"

person.name = "Bob";    // Error: Cannot assign to 'name' because it is a read-only property.
```

- `Person` class는 `readonly`로 선언된 `name` property를 갖고 있습니다.
    - `name` property는 객체 생성 시에만 값을 할당할 수 있으며, 이후에는 그 값을 변경할 수 없습니다.
    - 변경을 시도하면 TypeScript compiler는 오류를 발생시킵니다.


### `readonly` 속성을 갖는 Interface

```typescript
interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
}

const person: ReadonlyPerson = {
    name: "Alice",
    age: 30
};

person.name = "Bob";    // Error: Cannot assign to 'name' because it is a read-only property.
```

- `ReadonlyPerson` interface의 모든 property는 `readonly`로 선언되어 있어, 객체가 처음 생성될 때 이후에는 수정할 수 없습니다.


---


## `readonly`에 관한 Utility Type

- 대상의 모든 구성 요소에 일괄적으로 `readonly`를 적용하기 위해, `Readonly`, `ReadonlyArray` utility type을 사용할 수 있습니다.


### `ReadOnly<T>` : 객체 모든 속성을 `readonly`로 바꾸기

- 객체를 생성할 때 `Readonly` utility type을 사용하여, 모든 property를 `readonly`로 만들 수 있습니다.
    - 이 방식이 interface나 type alias에서 개별 property를 `readonly`로 만드는 것보다 더 간편할 수 있습니다.

```typescript
const obj: Readonly<{ property: string }> = { property: "value" };
obj.property = "another value";    // Error: Cannot assign to 'property' because it is a read-only property.
```

```typescript
interface Person {
    name: string;
    age: number;
}

const person: Readonly<Person> = {
    name: "Alice",
    age: 30
};

person.name = "Bob";    // Error: Cannot assign to 'name' because it is a read-only property.
```


### `ReadonlyArray<T>` : 배열의 모든 요소를 `readonly`로 바꾸기

- `readonly` 한정자는 배열(array)에도 사용될 수 있습니다.
- `ReadonlyArray<T>` utility type을 사용하면, 배열의 내용(항목)을 변경(추가, 삭제, 변경)할 수 없습니다.
    - 배열의 불변성을 강제합니다.

```typescript
let a: ReadonlyArray<number> = [1, 2, 3];

a.push(4);    // Error: Property 'push' does not exist on type 'readonly number[]'.
a[0] = 4;    // Error: Index signature in type 'readonly number[]' only permits reading.
```


---


## `const`와 `readonly`

- `const`와 `readonly`는 TypeScript 내에서 서로 보완적인 역할을 하며, data의 불변성을 관리하는 데 중요한 역할을 합니다.
    - `const`는 변수 자체에 적용되고, `readonly`는 객체의 속성에 적용됩니다.
    - `const`는 변수에 대한 binding을 불변으로 만들지만, `readonly`는 객체의 property를 변경할 수 없게 만듭니다.

- `readonly` 한정자는 변수 선언에 직접 사용될 수 없습니다.
    - `readonly`는 주로 객체의 property나 class의 member 변수의 불변성을 명시할 때 사용됩니다.
    - 변수에 대해서는 `const` 키워드를 사용하여 해당 변수가 재할당될 수 없음을 나타냅니다.


### 변수에 대한 `const` 사용

- 변수를 선언할 때 `const`를 사용하면, 그 변수에 다른 값을 재할당할 수 없습니다.
- 이는 변수의 불변성을 보장하지만, `const`로 선언된 객체의 내부 상태(property의 값)는 변경될 수 있습니다.

```typescript
const number = 42;
number = 43;    // Error: Cannot assign to 'number' because it is a constant.

const obj = { property: "value" };
obj.property = "new value";
obj = { anotherProperty: "value" };    // Error: Cannot assign to 'obj' because it is a constant.
```

- `obj` 객체의 내부 상태는 변경이 가능하나, 객체 자체는 변경할 수 없습니다.


### 객체 property에 대한 `readonly` 사용

- `readonly` 한정자는 객체의 property나 class member에 적용될 수 있으며, 이를 통해 해당 property의 값을 변경할 수 없게 만듭니다.
- `readonly`는 type을 정의할 때 사용됩니다.

```typescript
interface ReadonlyObject {
    readonly property: string;
}

let readonlyObj: ReadonlyObject = { property: "value" };
readonlyObj.property = "new value";    // Error: Cannot assign to 'property' because it is a read-only property.
```
