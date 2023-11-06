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

- <https://inpa.tistory.com/entry/OOP-%F0%9F%92%A0-%EC%95%84%EC%A3%BC-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8A%94-DIP-%EC%9D%98%EC%A1%B4-%EC%97%AD%EC%A0%84-%EC%9B%90%EC%B9%99?category=967430>
