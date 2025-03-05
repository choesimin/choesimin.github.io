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


