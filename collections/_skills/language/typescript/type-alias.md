---
layout: skill
permalink: /233
title: TypeScript Type Alias - Type 별칭
description: TypeScript의 Type Alias는 기존 type에 새로운 이름을 부여하여, 복잡한 type 구조를 간결하게 표현하고 가독성을 높일 수 있는 기능입니다.
date: 2024-02-27
---


## Type Alias : Type에 이름 붙이기

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


