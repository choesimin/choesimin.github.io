---
layout: skill
permalink: /237
title: TypeScript Conditional Type - 조건에 따라 Type 결정하기
description: 조건부 type은 TypeScript에서 삼항 연산자와 유사한 구문을 사용하여 특정 조건에 따라 type을 동적으로 결정하는 고급 기능으로, 복잡한 type 관계를 표현하고 많은 유틸리티 type의 기반이 됩니다.
date: 2024-03-12
---


## 조건부 Type : 특정 조건에 따라 Type 결정하기

- 조건부(conditional) type은 TypeScript에서 **특정 조건에 따라 type을 결정**할 수 있게 해주는 고급 type system의 기능입니다.
    - TypeScript 2.8 version에서 도입되었습니다.

- 조건부 type을 통해 **type의 형태를 동적으로 조작**할 수 있어, 복잡한 type 관계를 표현할 때 유용합니다.
    - type을 programming 언어의 `if` 문처럼 다룰 수 있게 해주어, type의 선택적 사용을 가능하게 합니다.

- 많은 utility type들이 조건부 type을 사용하여 구현되어 있습니다.
    - 예를 들어, `Partial<T>`, `Required<T>`, `Readonly<T>`, `Record<K, T>`, `Pick<T, K>`, `Exclude<T, U>`, `Extract<T, U>`, `NonNullable<T>`, `ReturnType<T>`, `InstanceType<T>`.
    - 따라서 조건부 type으로 기능을 구현하기 전에, TypeScript에서 미리 만들어 놓은 utility type이 있는지 확인하는 것이 좋습니다.

- 조건부 type은 JavaScript에 있는 삼항 연산자 조건문(`condition ? trueExpression : falseExpression`) 같은 형태를 가집니다.

```typescript
SomeType extends OtherType ? TrueType : FalseType;
```

- `extends`를 기준으로 왼쪽에 있는 type이 오른쪽 type에 할당할 수 있다면 첫 번째 분기('참' 값 분기)를, 그렇지 않다면 뒤의 분기('거짓' 값 분기)를 얻게 됩니다.

```typescript
interface Animal {
    live(): void;
}
interface Dog extends Animal {
    woof(): void;
}
 
type Example1 = Dog extends Animal ? number : string;    // type Example1 = number;
type Example2 = RegExp extends Animal ? number : string;    // type Example2 = string;
```

- `Dog extends Animal`에 따라 type이 `number`인지 `string`인지 결정됩니다.


