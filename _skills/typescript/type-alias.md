---
layout: skill
title: TypeScript - Type Alias
date: 2024-02-27
---




## Type Alias - Type에 이름 붙이기

- type alias는 **기존에 존재하는 하나 이상의 type에 새로운 이름을 부여**하는, TypeScript의 강력한 type system을 활용한 기능 중 하나입니다.
    - 복잡한 type 구조를 간결하게 표현하고, code의 가독성을 높일 수 있습니다.

- type alias는 `type` keyword를 사용하여 정의합니다.

```typescript
type Person = {
    name: string,
    age?: number
}
```


### Type Alias의 특징

1. **재사용성** : type alias를 통해 정의한 type은 project 전반에 걸쳐 재사용할 수 있어, type 관리를 용이하게 합니다.

2. **가독성 향상** : 복잡한 type을 간결하고 의미 있는 이름으로 정의할 수 있어, code의 가독성이 향상됩니다.

3. **확장성 제한** : type alias는 확장이 불가능하며, 상속이나 interface처럼 기존 type을 확장하여 새로운 type을 만들 수 없습니다.
    - 대신, intersection type을 사용하여 type을 결합할 수는 있습니다.




---




## Type Alias 사용하기


### Primitive Type Alias

- 간단한 예로, 문자열이나 숫자 같은 기본 type에 더 구체적인 이름을 부여할 수 있습니다.

```typescript
type UserID = number;
type UserName = string;

type Str = 'Lee';    // string literal type
```


### Union Type Alias

- 두 개 이상의 type을 하나로 결합한 type을 정의할 때 사용합니다.
- union type을 통해 변수가 여러 type 중 하나를 가질 수 있음을 명시할 수 있습니다.

```typescript
type StringOrNumber = string | number;    // primitive union type
type Func = (() => string) | (() => void);    // function union type
type Shape = Square | Rectangle  Circle;    // interface union type

type Name = 'Lee' | 'Kim';    // string literal union type
type Num = 1 | 2 | 3 | 4 | 5;    // number literal union type
type Obj = {a: 1} | {b: 2};    // object literal union type
```


### Tuple Type Alias

- 고정된 길이의 배열 type을 정의할 때 사용하며, 각 요소의 type을 정확히 지정할 수 있습니다.

```typescript
type Point = [number, number];

type Tuple = [string, boolean];
const tupleA: Tuple = ['', true];    // OK
const tupleB: Tuple = ['', ''];    // Error
```


### Object Type Alias

- 객체의 구조를 정의할 때 사용합니다.
- interface와 유사하지만, type alias를 사용하면 객체 type뿐만 아니라 다른 type들과의 조합도 가능합니다.

```typescript
type Point = {
    x: number;
    y: number;
};

type User = {
    id: UserID;    // type alias를 type으로 지정
    name: UserName;    // type alias를 type으로 지정
    age: number;
};
```


### Intersection Type Alias

- 두 개 이상의 type을 모두 만족하는 새로운 type을 생성할 때 사용합니다.
- 이를 통해 여러 type의 특성을 합칠 수 있습니다.

```typescript
type Circle = {
    radius: number;
};

type Colorful = {
    color: string;
};

type ColorfulCircle = Circle & Colorful;
```




---




## 비슷하지만 다른 Type Alias와 Interface

- type alias와 interface 모두 custom type을 정의하고, 정의한 custom type을 type으로 사용할 수 있습니다.

```typescript
// 작성 : type alias
type Person = {
    name: string,
    age?: number
}

// 작성 : interface
interface Person {
    name: string,
    age?: number
}
```

```typescript
// 사용 : type alias, interface 공통
const person = {} as Person;    // 빈 객체를 'Person' type으로 지정
person.name = 'Lee';
person.age = 20;
person.address = 'Seoul';    // Error
```

- 작성과 사용 방법이 비슷하지만, 몇 가지 주요한 차이점이 있습니다.

| 기능 / 특징 | Type Alias | Interface |
| --- | --- | --- |
| **정의 방식** | **`type` keyword**를 사용하여 정의함. | **`interface` keyword**를 사용하여 정의함. |
| **확장 가능성** | **확장 불가능**. 새로운 type(intersection type)을 생성하여 확장해야 함. | **확장 가능**. `extends`를 사용하거나 같은 이름으로 추가 선언하여 확장할 수 있음. |
| **재정의 및 병합** | **재정의 불가능**. 동일 이름으로 여러 번 선언할 수 없음. | **자동 병합 지원**. 동일 이름의 interface를 여러 번 선언하면 자동으로 병합됨. |
| **Union/Intersection Type** | **지원**함. union type과 intersection type 사용 가능. | **직접적으로 지원하지 않음**. interface를 확장하여 유사한 기능 구현 가능. |
| **Type 결합** | **복잡한 type 결합에 유리**함. 다양한 type을 결합한 새로운 type 정의 가능. | 주로 **상속을 통한 확장에 유리**함. 단일 상속 구조를 따름. |

- 대부분의 경우, type alias와 interface는 개인적인 선호에 따라 선택하여 사용할 수 있습니다.
    - 많은 개발자들이 함수형 programming paradigm과 잘 맞기 때문에 type alias를 선호합니다.
        - type alias의 풍부한 type 표현을 사용하여, type-safe한 방식으로 함수형 programming 기능(함수형 구성, 불변성 등)을 쉽게 충족시킬 수 있습니다.

- interface와 type alias 둘 중 하나를 반드시 사용해야 하거나, 사용하는 편이 더 나은 경우도 있습니다.


### Interface를 사용해야 할 때 

- interface가 가지고 있는 대부분의 기능은 type alias로도 사용할 수 있지만, 예외적으로 **interface의 '선언 병합(declaration merging)'은 type alias에서 사용할 수 없습니다.**
- 따라서 기존의 library를 확장하거나 새로운 type의 spec을 작성할 때, **선언 병합이 필요다면 interface를 사용**해야 합니다.
    - interface의 선언 병합은 type alias에서 intersection type을 사용하여 비슷하게 구현할 수도 있습니다.

- 또한, program에 OOP의 **상속 개념을 적용하는 경우, interface의 `extends` keyword를 사용**하는 것이 type alias들을 intersection type으로 만들어 사용하는 것보다 더 낫습니다.


### Type Alias를 사용해야 할 때

1. primitive type에 새로운 이름(별칭)을 생성할 때.
2. union type, tuple type, function type, 또는 더 복잡한 type을 정의할 때.
3. 함수를 overloading할 때.
4. mapped type, 조건부(conditional) type, type guard, 또는 기타 고급(advanced) type 기능을 사용할 때.

- interface로는 구현하기 어려운 **type alias만의 고급 기능**들이 있습니다.
    - e.g., 조건부(conditional) type, generic type, type guard, 고급(advanced) type 등.
    - type alias의 고급 기능을 사용하여, 강력한 type system을 갖춘 application을 만들 수 있습니다.

#### Type Alias 고급 기능 사용 예제 : 객체의 Getter Method 자동 생성하기

- type alias는 interface보다 표현력이 더 풍부합니다.
    - 수많은 고급 type 기능(advanced type feature)들을 interface는 지원하지 않으며, 이러한 고급 기능들은 TypeScript가 발전함에 따라 계속해서 추가되고 있습니다.

- 아래는 interface로 구현할 수 없는 고급 type 기능 구현 예제입니다.
    - 모든 object type 객체에 대해서, getter method를 자동으로 생성해주는 type alias입니다.
    - mapped type, template literal types, `keyof` 연산자(operator)를 사용합니다.

```typescript
type Client = {
    name: string;
    address: string;
}

type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]:  () => T[K];
};

type clientType = Getters<Client>;
// type clientType = {
//     getName: () => string;
//     getAddress: () => string;
// }
```




---




## Reference

- <https://poiemaweb.com/typescript-alias>
- <https://blog.logrocket.com/types-vs-interfaces-typescript/>
