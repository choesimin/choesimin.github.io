---
layout: skill
permalink: /238
title: TypeScript Generic Type - Type을 Parameter처럼 사용하기
description: Generic Type은 type을 parameter럼 사용하여 다양한 type에 대해 작동할 수 있는 재사용 가능한 함수, class, interface를 만들 수 있게 해주는 기능으로, type 안전성을 유지하면서 code의 유연성을 제공합니다.
date: 2024-03-04
---


## Generic Type : Type을 Parameter처럼 사용하기

- generic type은 **type을 parameter처럼 사용**하여, 다양한 type에 대해 작동할 수 있는 함수, class, interface 등을 생성할 수 있게 해주는 기능입니다.
    - generic을 사용함으로써 type 안전성을 유지하면서, code를 재사용 가능하고 유연하게 만들 수 있습니다.

- **generic을 사용하면, 하나의 함수나 class가 여러 type에 대해 작동할 수 있게 됩니다.**
    - code를 작성할 때 구체적인 type을 명시하는 대신, **type 변수(T)를 사용하여 함수나 class를 정의**합니다.
    - type 변수는 함수나 class가 호출되거나 instance를 생성할 때 구체적인 type으로 대체됩니다.


### 함수의 Generic

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("myString");    // output1의 type은 'string'
let output2 = identity<number>(100);    // output2의 type은 'number'
```

- `identity` 함수는 어떤 type의 인자도 받을 수 있고, 받은 인자와 동일한 type으로 값을 반환합니다.
    - `T`는 type 변수로, 함수가 호출될 때 결정됩니다.

- `identity` 함수 호출 시, `<string>`, `<number>`와 같이 type 인자를 제공하여 `T`의 구체적인 type을 지정합니다.
    - 이를 통해 compiler는 반환 값의 type을 정확히 알 수 있습니다.


### Interface의 Generic

- generic은 interface에도 사용될 수 있으며, 이를 통해 다양한 type을 가질 수 있는 객체를 정의할 수 있습니다.

```typescript
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

- `GenericIdentityFn` interface는 generic을 사용하여 정의되었습니다.
- `myIdentity` 함수는 이 interface의 구현체로, `number` type의 인자를 받고 `number` type을 반환하는 함수로 지정됩니다.



### Class의 Generic

- generic은 class 정의에도 사용될 수 있으며, 이를 통해 다양한 type을 가질 수 있는 class instance를 생성할 수 있습니다.

```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

- `GenericNumber` class는 type `T`에 대해 generic입니다.
- `myGenericNumber` instance는 `number` type을 사용하여 생성되며, 이로 인해 해당 instance의 `zeroValue` property와 `add` method는 모두 `number` type을 사용하게 됩니다.


