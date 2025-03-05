---
layout: skill
permalink: /101
title: TypeScript Any Type - Type Check 우회하기
description: TypeScript의 Any Type은 모든 종류의 값이 할당 가능한 가장 유연한 type으로, Type Check를 우회할 수 있습니다.
date: 2024-03-04
---


## `any` Type : TypeScript의 Type Check 기능 우회하기

- TypeScript에서 `any` type은 **가장 유연한 type**으로, **어떤 종류의 값도 할당할 수 있습니다.**
    - 문자열, 숫자, 배열, 객체 등 어떤 type이든 `any` type 변수에 할당 가능합니다.

- `any` type을 사용하면, 해당 변수에 대한 **compile time type check를 compiler가 수행하지 않습니다.**
    - TypeScript의 type 검사 기능을 일시적으로 끌 수 있습니다.
    - 이는 동적 type 언어의 특징을 유지하면서 TypeScript를 사용하고자 할 때 유용합니다.
        - 예를 들어, JavaScript와의 호환성을 유지하면서 점진적으로 TypeScript를 도입하거나, type 정보가 없는 library를 사용할 때.

- 그러나 `any` type은 TypeScript의 **핵심 가치인 type 안정성을 손상**시킬 수 있기 때문에, 가능한 **사용을 최소화**하는 것이 좋습니다.
    - `any` type은 TypeScript의 type system을 우회하기 때문에, code 내에서 type 관련 오류가 발생할 가능성을 증가시킵니다.
    - code의 type 안정성과 유지 보수성을 유지하기 위해서는 `any` type 대신 더 구체적이고 명확한 type(`unknown`, generic, union type 등)을 사용하는 것이 바람직합니다.
        - 특히 type 안정성이 중요한 project에서는 `any` type의 사용을 피하는 것이 좋습니다.


```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;    // okay, definitely a boolean

let looselyTyped: any = {};
let d = looselyTyped.a.b.c.d;    // any type을 사용하면, 모든 하위 속성도 자동으로 any type이 됨
```


