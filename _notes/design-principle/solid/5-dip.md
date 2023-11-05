---
layout: note
title: DIP - 의존 관계 역전 원칙
date: 2023-11-05
---





## DIP (Dependency Inversion Principle) : 의존 관계 역전 원칙

```txt
고수준 module은 저수준 module의 구현에 의존해서는 안되며, 저수준 module이 고수준 module에서 정의한 추상 type에 의존해야 합니다.
```

| 고수준 Module | 저수준 Module |
| --- | --- |
| 의미있는 기능을 제공하는 module | 고수준 module을 구현하기 위해 필요한 하위 기능의 실제 구현체 |

- DIP는 다형성을 이용한 DI(Dependency Injection, 의존성 주입)를 통해 구현 가능합니다.







---




# Reference

- <https://ko.wikipedia.org/wiki/SOLID_(객체_지향_설계)>
