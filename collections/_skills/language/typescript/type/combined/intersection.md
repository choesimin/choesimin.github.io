---
layout: skill
permalink: /192
title: TypeScript Intersection Type - 객체 속성 합치기
description: TypeScript의 Intersection Type은 여러 type을 결합하여 모든 type의 속성을 포함하는 복합 type을 생성하는 기능으로, 다양한 객체의 특성을 통합하거나 확장할 때 유용합니다.
date: 2024-03-02
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


