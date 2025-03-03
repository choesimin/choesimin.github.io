---
layout: skill
date: 2024-03-02
title: TypeScript Intersection Type - 객체 속성 합치기
description: TypeScript의 Intersection Type은 여러 type을 결합하여 모든 type의 속성을 포함하는 복합 type을 생성하는 기능으로, 다양한 객체의 특성을 통합하거나 확장할 때 유용합니다.
---


## Intersection Type : 객체 합치기

- TypeScript의 intersection type은 **여러 type들을 결합해, 모든 type의 속성(property)을 포함하는 복합 type을 생성**합니다.
    - 다양한 interface나 type들의 특성을 통합하여, **필요한 모든 속성을 가진 새로운 type을 정의**할 때 사용됩니다.

- intersection type은 복잡한 data 구조의 표현, 다양한 source의 data 통합, 여러 interface의 구현 등 다양한 상황에 활용될 수 있습니다.
    - 특히 여러 type의 속성을 동시에 만족해야 하는 객체를 다룰 때 유용합니다.

- 여러 type들을 `&` 연산자로 결합하여 intersection type을 만듭니다.

```typescript
type Type1 = {
    a: number;
    b: string;
}

type Type2 = {
    c: boolean;
}

type IntersectionType = Type1 & Type2;

const intersectionType: IntersectionType = {
    a: 1,
    b: "String",
    c: false
};
```


### Intersection Type 사용 주의사항 : Type 충돌

- intersection type을 사용할 때는 주의가 필요합니다.
- **결합되는 type들 사이에 중복되는 속성이 없도록 해야** 하며, 만약 **중복된 속성이 있을 경우 해당 속성은 모든 결합된 type에서 공통으로 만족하는 type이 되어야** 합니다.
    - 서로 다른 type으로 정의된 동일한 이름의 속성을 가진 type들을 결합하려 하면, type 충돌이 발생합니다.

```typescript
interface Product {
    id: number;
    name: string;
}

interface Order {
    id: string;    // Product interface와 동일한 속성명이지만, type이 다름
    quantity: number;
}

type ProductOrder = Product & Order;    // Error : type 충돌
```

- `id` 속성은 `Product` interface에서는 `number` type이고, `Order` interface에서는 `string` type으로 정의되어 있어 type 충돌이 발생합니다.
- 따라서, `ProductOrder` type을 사용하여 객체를 생성하려고 할 때, 오류가 발생합니다.


---


## Intersection Type 활용하기

- type alias 외에도 함수 매개 변수, interface 확장, generic과 같은 여러 방식으로 적용할 수 있어, 상황에 따라 type의 유연성과 재사용성을 높일 수 있습니다.


### Type Alias 합치기

- 두 개의 기본적인 type alias을 정의하고, 이를 합쳐서 intersection type을 만듭니다.

```typescript
// 첫 번째 type alias 정의
type Color = {
    color: string;
};

// 두 번째 type alias 정의
type Dimension = {
    width: number;
    height: number;
};

// Color와 Dimension type을 결합하여 ColoredRectangle intersection type 생성
type ColoredRectangle = Color & Dimension;

// ColoredRectangle type의 객체 생성 예시
const myRectangle: ColoredRectangle = {
    color: "blue",
    width: 20,
    height: 10
};

console.log(myRectangle);
```

- `ColoredRectangle` intersection type은 `Color` type의 `color` 속성과 `Dimension` type의 `width` 및 `height` 속성을 모두 포함합니다.


### Interface 확장하기

- 서로 다른 interface를 결합하여, 각 interface의 모든 속성을 포함하는 새로운 type을 만듭니다.

```typescript
interface User {
    id: number;
    name: string;
}

interface Permissions {
    permissions: string[];
}

// User와 Permissions의 특성을 모두 갖는 AdminUser type
type AdminUser = User & Permissions;

const admin: AdminUser = {
    id: 1,
    name: "Admin",
    permissions: ["create", "read", "update", "delete"]
};
```

- `User`와 `Permissions` interface를 결합하여 `AdminUser` type을 생성합니다.

#### Interface 확장하기 : 상속 Version

- interface의 상속(`extends`) 기능을 사용하면, intersection type(`&`)을 사용하는 것과 같은 결과를 얻을 수 있습니다.
    - `extends` keyword를 사용하여, 한 interface가 다른 하나 또는 여러 interface의 속성을 상속받도록 할 수 있습니다.

- 여러 interface를 확장하여 새 interface를 만들면, 확장된 interface는 모든 부모 interface의 속성을 포함하게 됩니다.

```typescript
interface User {
    id: number;
    name: string;
}

interface Permissions {
    permissions: string[];
}

// User와 Permissions interface를 상속받아 AdminUser interface 정의
interface AdminUser extends User, Permissions {
}

const admin: AdminUser = {
    id: 1,
    name: "Admin",
    permissions: ["create", "read", "update", "delete"]
};
```

- interface 상속을 사용하여 `User`와 `Permissions` interface의 특성을 모두 갖는 `AdminUser` interface를 정의합니다.
    - `AdminUser` interface는 `User`와 `Permissions` interface의 모든 속성을 상속받습니다.
    - 따라서 `AdminUser` type의 객체를 생성할 때, `User`와 `Permissions` interface에서 정의된 모든 field를 포함해야 합니다.


### 함수 매개 변수의 Type 확장하기

- 함수가 받는 매개 변수의 type을 더 상세하게 지정하고자 할 때, intersection type을 활용할 수 있습니다.

```typescript
interface User {
    id: number;
    name: string;
}

function createUserSession(user: User & { sessionId: string }) {
    console.log(`User ${user.name} has session ID: ${user.sessionId}`);
}

createUserSession({ id: 2, name: "Jane Doe", sessionId: "abc123" });
```


### Generic과 함께 사용하기

- intersection type을 통해 generic을 사용한 기능을 확장하거나 결합할 수 있습니다.

```typescript
function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const merged = mergeObjects({ name: "John" }, { age: 30 });
console.log(merged);    // { name: "John", age: 30 }
```


---


## 원시 Type의 Intersection : 가능하지만 쓸모없음

- intersection type을 사용한 원시 type(primitive type)의 결합은 기술적으로 가능하긴 하지만, 유용하지 않습니다.
    - intersection type은 주로 여러 객체 type을 결합하여 새로운 type을 생성하는 데 사용됩니다.
        - 객체 type이 다양한 속성과 method를 갖고 있기 때문에, 여러 type의 속성과 method를 결합하여 더 복합적인 객체 type을 만들 수 있기 때문입니다.

- 원시 type의 intersection을 생성하면, 그 결과는 결합된 모든 type의 특성을 만족하는 type이어야 합니다.
- 서로 다른 원시 type 간에는 공통된 특성이 없기 때문에, 원시 type 간의 결합은 실질적으로 의미가 없습니다.

```typescript
type ImpossibleType = string & number;
```

- `ImpossibleType`은 `string` type과 `number` type의 공통된 특성을 갖는 type이어야 합니다.
- 실제로 `string`과 `number`는 서로 호환되지 않는 type이므로, 이러한 type의 intersection은 어떠한 값도 만족시킬 수 없는 type이 됩니다.
