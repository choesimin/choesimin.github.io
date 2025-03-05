---
layout: skill
permalink: /60
title: TypeScript Type Guard - Type 좁히기
description: TypeScript의 Type Guard는 변수의 type을 좁히기 위해 사용하는 기능으로, type assertion과 비슷하게 사용할 수 있습니다.
date: 2024-02-28
---


## Type Guard : Type 좁히기

- type guard는 특정 scope 내에서 **변수의 type을 보다 구체적으로 좁히기(narrowing) 위해 사용**하는 표현식입니다.

- type guard를 사용하면 **특정 조건에서 변수가 특정 type임을 보장**할 수 있으며, 이를 통해 type 안정성을 높이고 runtime error를 줄일 수 있습니다.
    - 하지만 남용하면 코드의 복잡성이 증가할 수 있기 때문에, 필요한 경우에만 적절히 사용하는 것이 좋습니다.

- **`typeof`, `instanceof`, `in` keyword를 사용한 type guard**는 JavaScript에서 지원하는 기본적인 type과 class에 대해 사용될 수 있으며, 더 복잡한 type이나 interface에 대해서는 **사용자 정의 type guard**를 사용해야 합니다.


