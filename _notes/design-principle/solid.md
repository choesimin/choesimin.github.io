---
layout: note
title: SOLID - 객체 지향 설계의 5원칙
date: 2023-06-06
---




- SOLID는 객체지향의 특징을 잘 살릴 수 있는 설계의 특징 5가지입니다.

| 약어 | 이름 | 설명 |
| --- | --- | --- |
| SRP | Single Responsibility Principle | 단일 책임 원칙 |
| OCP | Open Closed Principle | 개방 폐쇄 원칙 |
| LSP | Liskov Substitution Principle | Liskov 치환 원칙 |
| ISP | Interface Segregation Principle | Interface 분리 원칙 |
| DIP | Dependency Inversion Principle | 의존 관계 역전 원칙 |




---




## SRP : Single Responsibility Principle : 단일 책임 원칙

```txt
모든 class는 하나의 책임만 가지며, class는 그 책임을 완전히 캡슐화 해야합니다.
```

- class에 변경이 일어나는 이유는 한 가지여야만 합니다.

- 어떤 class에 변경되어야 할 이유가 두 가지 이상이라면, 해당 class는 관심사 분리를 통해 각각의 책임(변경이 일어나는 이유)를 독립시키는 것이 좋습니다.




---




## OCP : Open Closed Principle : 개방 폐쇄 원칙

```txt
Software 개체(class, module 등)는 확장에는 열려있어야 하고, 변경에는 닫혀있어야 합니다.
```

- software 개발 작업에 이용된 많은 개체 중 하나에 수정(변경)을 일으킬 때, 그 개체를 이용하는 다른 개체들을 모두 수정해야 하는 것은 옳지 않습니다.
    - 수정 자체의 작업이 자원을 사용합니다.
    - 수정 과정에서 다른 개체들에 추가 문제가 발생할 수 있습니다.




---




## LSP : Liskov Substitution Principle : Liskov 치환 원칙

```txt
상위 type의 객체를 하위 type의 객체로 치환해도 상위 type을 사용하는 program은 정상적으로 작동해야 합니다.
```

- 자식 class는 최소한 자신의 부모 class에서 가능한 행위는 수행할 수 있어야 합니다.
- 만약 부모 class에서 작동하는 logic을 수정해서 자식 class에 구현했다면(`@Override`), 자식 객체를 사용한 곳에 부모 객체로 치환했을 때 정상적으로 작동하지 못하므로 LSP를 어기는 경우가 됩니다.




---




## ISP : Interface Segregation Principle : Interface 분리 원칙

```txt
client가 자신이 이용하지 않는 method에 의존하지 않아야 합니다.
```

- client는 객체를 사용하는 소비자를 의미합니다.
    - e.g method, class 등.

- 기능이 많은 큰 덩어리의 interface를 구현하는 대신, 구체적이고 작은 단위들로 분리시켜 사용합니다.
    - client들이 꼭 필요한 method들만 이용할 수 있도록 합니다.

- ISP를 통해 system의 내부 의존성을 약화시켜 refactoring, 수정, 재배포를 쉽게 할 수 있습니다.
    - 결합도를 낮춘다는 말과 같습니다.




---




## DIP : Dependency Inversion Principle : 의존 관계 역전 원칙

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
