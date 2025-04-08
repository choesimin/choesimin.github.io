---
layout: skill
permalink: /80
title: Software 설계 - 청사진 그리기
description: 요구 사항을 실제 구현 가능한 설계도로 변환하는 과정을 software design이라고 합니다.
date: 2025-02-09
---


## Software Design : Software 설계하기

- software design(설계)은 요구 사항을 실제 구현 가능한 blueprint(청사진)으로 변환하는 과정입니다.

- software design은 향후 개발과 유지 보수의 기초가 되는 중요한 단계입니다.
    - design이 부실하면 개발 과정에서 문제가 발생할 가능성이 높아집니다.
    - design이 부실하면 유지 보수 비용이 증가합니다.


### Design Process : 설계의 과정

1. **요구 사항 분석** : system이 해결해야 할 문제와 제약 사항을 파악하는 단계.
    - 기능적 요구 사항과 비기능적 요구 사항을 정의합니다.
    - 이해관계자의 needs를 명확히 파악합니다.

2. **High-Level Design** : system의 전체적인 구조를 설계하는 단계.
    - architecture pattern을 선택합니다.
    - 주요 component와 interface를 정의합니다.

3. **Detailed Design** : 각 component의 상세 내용을 설계하는 단계.
    - class diagram, sequence diagram 등을 작성합니다.
    - design pattern을 적용합니다.

4. **Design Review** : 설계의 적절성을 검토하는 단계.
    - 설계가 요구 사항을 충족하는지 확인합니다.
    - 설계의 quality를 평가합니다.


---


## Design Principle : 여러 가지 설계 원칙

- 상황에 따라 적용할 수 있는 여러 설계 원칙들이 존재합니다.


### OOP를 위한 SOLID 원칙

- **Single Responsibility Principle**은 하나의 class가 하나의 책임만 가져야 한다는 원칙입니다.
    - code의 응집도를 높이고 결합도를 낮추는 효과가 있습니다.
    - code의 재사용성과 유지 보수성이 향상됩니다.

- **Open-Closed Principle**은 확장에는 열려있고 수정에는 닫혀있어야 한다는 원칙입니다.
    - 기존 code를 수정하지 않고 새로운 기능을 추가할 수 있어야 합니다.
    - interface나 abstract class를 활용하여 구현합니다.

- **Liskov Substitution Principle**은 상위 type의 객체를 하위 type의 객체로 치환해도 program이 올바르게 동작해야 한다는 원칙입니다.
    - 상속 관계에서 자식 class가 부모 class의 기능을 온전히 수행할 수 있어야 합니다.
    - 상속 관계의 진정한 의미를 담고 있는 원칙입니다.

- **Interface Segregation Principle**은 client가 자신이 사용하지 않는 method에 의존하지 않아야 한다는 원칙입니다.
    - interface를 client의 필요에 맞게 분리해야 합니다.
    - 불필요한 의존성을 제거하여 system의 유연성을 높입니다.

- **Dependency Inversion Principle**은 상위 module이 하위 module에 의존하지 않아야 한다는 원칙입니다.
    - 구체적인 class가 아닌 추상화된 interface에 의존해야 합니다.
    - system의 결합도를 낮추고 유연성을 높입니다.


### 다양한 Design Pattern

- design pattern은 software 개발에서 자주 발생하는 문제에 대한 검증된 해결책입니다.
    - 개발자 간의 의사소통을 원활하게 합니다.
    - code의 재사용성과 유지 보수성을 높입니다.

- **Creational Pattern**은 객체 생성과 관련된 pattern입니다.
    - Singleton, Factory Method, Abstract Factory, Builder, Prototype pattern이 있습니다.
    - 객체 생성 과정의 유연성을 높입니다.

- **Structural Pattern**은 class나 객체를 조합하여 더 큰 구조를 만드는 pattern입니다.
    - Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy pattern이 있습니다.
    - system의 구조를 유연하게 확장할 수 있게 합니다.

- **Behavioral Pattern**은 객체 간의 상호작용과 책임 분배를 다루는 pattern입니다.
    - Observer, Strategy, Command, State, Template Method pattern이 있습니다.
    - 객체 간의 결합도를 낮추고 유연한 상호작용을 가능하게 합니다.


### 다양한 Architecture Pattern

- architecture pattern은 system 수준의 구조적 문제를 해결하는 방법을 제시합니다.

- **Layered Architecture**는 system을 계층으로 분리하여 구성하는 pattern입니다.
    - presentation layer, business layer, persistence layer로 구성됩니다.
    - 각 layer의 역할과 책임이 명확하게 분리됩니다.

- **Microservices Architecture**는 application을 작은 독립적인 service들로 분리하는 pattern입니다.
    - 각 service는 독립적으로 개발, 배포, 확장이 가능합니다.
    - service 간의 결합도가 낮아 유연한 system 구성이 가능합니다.

- **Event-Driven Architecture**는 event의 생성, 감지, 소비를 중심으로 구성하는 pattern입니다.
    - 비동기 처리와 확장성이 용이합니다.
    - service 간의 결합도를 낮출 수 있습니다.
