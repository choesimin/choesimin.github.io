---
layout: skill
title: Clean Architecture - 객체 지향 설계
date: 2023-11-05
---


## 객체 지향적으로 Architecture를 설계하기

- 좋은 architecture를 만드는 일은 객체 지향(Object-Oriented, OO) 설계 원칙을 이해하고 응용하는 데에서 출발합니다.


### 객체 지향(OO, Object-Oriented)

- 객체 지향(OO)이란 다형성을 이용하여 전체 system의 모든 source code 의존성에 대한 절대적인 제어 권한을 획득할 수 있는 능력입니다.

- 객체 지향을 사용하면 다형성을 통해 언제 어디서든 Plugin Architect를 구성할 수 있습니다.
    - 고수준의 정책을 포함하는 module은 저수준의 세부사항을 포함하는 module에 대해 독립성을 보장할 수 있습니다.
    - 저수준의 세부사항은 중요도가 낮은 plugin module로 만들어, 고수준의 정책을 포함하는 module과는 독립적으로 개발하고 배포할 수 있습니다.

- OO는 결국 **다형성을 통해 의존성 방향을 제어**할 수 있도록 하는 것이며, 의존성의 방향을 제어하는 것은 architecture 설계에 매우 중요합니다.


### 의존성 역전과 객체 지향

- 의존성 역전은 **다형성을 안전하고 편리하게 적용할 수 있는 mechanism**이 등장한 이후로 많이 사용하기 시작했습니다.
    - **객체 지향**(OO)은 다형성을 안전하고 편리하게 제공합니다.

#### 다형성 Mechanism 등장 전

- 원래(예를 들어, C 언어)는 source code의 의존성 방향은 반드시 제어 흐름(flow of control)을 따르게 됩니다.
    1. main 함수가 고수준 함수를 호출합니다.
    2. 고수준 함수가 중간 수준 함수를 호출합니다.
    3. 중간 수준 함수가 저수준 함수를 호출합니다.

- 제어 흐름은 system의 행위에 따라 결정되며, source code 의존성은 제어 흐름에 따라 결정됩니다.
- 이러한 제약 조건으로 인해 software architect에게는 선택지가 별로 없었습니다.

#### 다형성 Mechanism 등장 후

- 객체 지향 언어는 다형성을 안전하고 편리하게 제공하므로, source code 의존성을 어디에서든 역전시킬 수 있습니다.
    - source code 사이에서 interface를 사용하여 제어 흐름을 반대 방향으로 바꿀 수 있습니다.
    - source code의 제어 흐름과 의존성 방향에 대해 제한받지 않고, 원하는 대로 설정할 수 있습니다.

- 객체 지향의 등장으로 software architect는 system의 source code 의존성 전부에 대해 방향을 결정할 수 있는 절대적인 권한을 갖게 되었습니다.
    - 호출하는 module이든, 호출당하는 module이든, 원하는 방향으로 source code 의존성을 설정할 수 있습니다.

- 의존성을 역전시킴으로써 **배포 독립성**과 **개발 독립성**을 얻습니다.
    - business logic, UI, DB는 배포 가능한 단위로 compile이 가능하며, business logic은 UI와 DB component에 의존하지 않게 되었습니다.
        - component를 개별적이고 독립적으로 배포할 수 있습니다.
    - 배포 독립성 : 특정 component트의 source code가 변경되면 해당 code가 포함된 component만 다시 배포하면 됩니다.
    - 개발 독립성 : system의 module을 독립적으로 배포할 수 있게 되면, 서로 다른 team에서 각 module을 독립적으로 개발할 수 있습니다.


---


## Reference

- Clean Architecture (도서) - Robert C. Martin
- <https://mangkyu.tistory.com/272>
- <https://mangkyu.tistory.com/274>
