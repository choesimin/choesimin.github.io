---
layout: skill
permalink: /142
title: TypeScript Function Type - 함수 Signature
description: TypeScript의 함수 Type은 함수의 Signature를 정의하는 데 사용되며, 함수의 매개 변수와 반환 값의 type을 명시적으로 선언하여 code의 안정성과 가독성을 향상시킵니다.
date: 2024-02-29
---


## 함수 Type : 함수의 Signature 정의하기

- 함수 type은 **함수의 매개 변수와 반환 값의 type을 정의**하는 데 사용합니다.
    - 함수의 매개 변수와 반환 type을 정의한 것을 **함수의 signature**라 부릅니다.
    - 함수 type을 통해 명시적으로 선언된 signature를 갖는 함수는 compile 시점에 TypeScript에 의해 검사됩니다.
    - 함수가 올바르게 사용되고 있는지 확인함으로써, code의 안정성과 가독성을 향상시킬 수 있습니다.

- 함수 type은 매개 변수의 type과 반환 type을 명시하여 정의합니다.

```typescript
let myFunction: (param1: type1, param2: type2) => returnType;
```


