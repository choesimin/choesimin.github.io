---
layout: skill
title: TypeScript Advanced Type - Generic Type ()
date: 2024-02-27
---




## Generic Type

제네릭 타입(Generic Types)은 TypeScript에서 타입을 파라미터처럼 사용하여 다양한 타입에 대해 작동할 수 있는 함수, 클래스, 인터페이스 등을 생성할 수 있게 해주는 강력한 기능입니다. 제네릭을 사용함으로써 코드의 재사용성을 높이고, 타입 체크 시 더 높은 유연성과 타입 안전성을 제공합니다.


### 제네릭의 기본 개념

제네릭을 사용하면, 하나의 함수나 클래스가 여러 타입에 대해 작동할 수 있게 됩니다. 이는 코드를 작성할 때 구체적인 타입을 명시하는 대신, 타입 변수(T)를 사용하여 함수나 클래스를 정의함으로써 달성됩니다. 이 타입 변수는 함수나 클래스가 호출되거나 인스턴스화될 때 구체적인 타입으로 대체됩니다.


### 제네릭 함수 예제

```typescript
function identity<T>(arg: T): T {
    return arg;
}
```
`identity` 함수는 어떤 타입의 인자도 받을 수 있고, 받은 인자와 동일한 타입으로 값을 반환합니다. 여기서 `T`는 타입 변수로, 함수가 호출될 때 결정됩니다.

```typescript
let output1 = identity<string>("myString");  // output1의 타입은 'string'
let output2 = identity<number>(100);         // output2의 타입은 'number'
```
함수 호출 시, `<string>`, `<number>`와 같이 타입 인자를 제공하여 `T`의 구체적인 타입을 지정합니다. 이를 통해 컴파일러는 반환값의 타입을 정확히 알 수 있습니다.


### 제네릭 인터페이스 예제

제네릭은 인터페이스에도 사용될 수 있으며, 이를 통해 다양한 타입을 가질 수 있는 객체를 정의할 수 있습니다.

```typescript
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```
여기서 `GenericIdentityFn` 인터페이스는 제네릭을 사용하여 정의되었습니다. `myIdentity` 함수는 이 인터페이스의 구현체로, `number` 타입의 인자를 받고 `number` 타입을 반환하는 함수로 지정됩니다.


### 제네릭 클래스 예제

제네릭은 클래스 정의에도 사용될 수 있으며, 이를 통해 다양한 타입을 가질 수 있는 클래스 인스턴스를 생성할 수 있습니다.

```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```
`GenericNumber` 클래스는 타입 `T`에 대해 제네릭입니다. `myGenericNumber` 인스턴스는 `number` 타입을 사용하여 생성되며, 이로 인해 해당 인스턴스의 `zeroValue` 프로퍼티와 `add` 메소드는 모두 `number` 타입을 사용하게 됩니다.

제네릭 타입을 사용함으로써, 단일 함수, 인터페이스, 클래스 정의를 통해 다양한 타입을 유연하게 처리할 수 있게 되며, 이는 코드의 재사용성과 유지보수성을 크게 향상시킵니다.


