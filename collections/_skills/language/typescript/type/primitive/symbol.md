---
layout: skill
permalink: /144
title: TypeScript Symbol Type - 고유 값
description: TypeScript의 Symbol Type은 변경 불가능한 고유한 값을 나타내며, 객체 속성의 key로 사용되어 이름 충돌을 방지하고 Metaprogramming 기능을 제공합니다.
date: 2024-02-28
---


## Symbol Type

- JavaScript의 symbol type은 ES6(ES2015)에서 도입된, **변경 불가능한 원시(primitive) type**입니다.

- 각 symbol 값은 고유하며, 주로 객체 속성의 key로 사용됩니다.
    - symbol type을 사용하는 주된 목적은 이름 충돌의 위험 없이 객체에 유일한 속성들을 추가하는 것입니다.

- symbol을 사용하면 객체에 Metaprogramming 기능을 추가하여, JavaScript engine이 객체를 어떻게 처리해야 할지에 대한 사용자 정의 동작을 구현할 수 있습니다.

- TypeScript에서 symbol type은 `Symbol()`로 표현합니다.
    - symbol type의 동작 방식, 사용 방법은 정적 typing을 제외하고 JavaScript와 모두 동일합니다.


