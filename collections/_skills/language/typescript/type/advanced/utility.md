---
layout: skill
permalink: /78
title: TypeScript Utility Type - Type을 조작하기 위한 내장 Type
description: Utility Type은 type을 효과적으로 재사용하고 조작하기 위해 설계된 내장 type 집합으로, 개발자가 선언적이고 간결한 방식으로 기존 type을 변형하여 새로운 type을 생성할 수 있게 해주는 Partial, Readonly, Record 등의 미리 정의된 type들입니다.
date: 2024-03-03
---


## Utility Type

- TypeScript의 utility type은 type system 내에서 **type을 효과적으로 재사용하고 조작하기 위해 설계된 built-in(내장) type 집합**입니다.
    - 개발자가 보다 선언적이고 간결한 방식으로 type을 정의하고, type 조작을 통해 새로운 type을 생성할 수 있게 해줍니다.

- utility type은 일반적인 type 변환을 쉽게 수행할 수 있도록, TypeScript에서 기본으로 제공하는 미리 정의된 type 집합을 제공합니다.
    - utility type들을 사용하면, 기존 type을 변형하여 새로운 type을 생성하는 등의 작업을 간편하게 할 수 있습니다.
        - TypeScript type system의 강력한 type 변환 기능을 활용하여, 복잡한 type 조작을 보다 간편하고 안전하게 수행할 수 있습니다.

- 여러 utility type들이 조건부 type을 사용하여 구현되었습니다.
    - 조건부(conditional) type은 특정 조건에 따라 type을 결정할 수 있게 해주는 고급 type 중 하나입니다.

- utility type에는 `Partial`, `Readonly`, `Record`, `Pick`, `Omit` 등, 특정한 type 변환 작업을 위해 설계된 다양한 type이 있습니다.

| Utility Type | 설명 |
| 