---
layout: skill
permalink: /167
title: DIP - 의존 관계 역전 원칙
description: 고수준 module은 저수준 module의 구현에 의존해서는 안됩니다.
date: 2023-11-05
---


## DIP (Dependency Inversion Principle) : 의존 관계 역전 원칙

```txt
고수준 module은 저수준 module의 구현에 의존해서는 안되며, 저수준 module이 고수준 module에서 정의한 추상 type에 의존해야 합니다.
```

| 고수준 Module | 저수준 Module |
| 