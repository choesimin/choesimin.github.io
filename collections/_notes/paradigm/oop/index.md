---
layout: note
permalink: /164
title: 객체 지향 Programming (OOP)
description: 객체 지향 Programming은 객체를 중심으로 code를 작성하는 Programming 방법론입니다.
date: 2025-03-05
---


## 객체 지향 Programming

- 객체 지향 Programming(Object-Oriented Programming, OOP)은 **software를 객체들의 모음으로 구성하는 programming paradigm**입니다.
    - 각 객체는 **data**와 해당 data를 처리하는 **method**(함수)를 포함합니다.

- 객체 지향 Programming은 실제 세계의 개념과 유사하게 modeling하여 복잡한 system을 더 직관적으로 설계하고 구현할 수 있게 합니다.


### 객체 지향 Programming의 장점

- code 재사용성이 높아 개발 효율성을 향상시킵니다.

- 모듈화된 code 구조로 유지 보수가 용이합니다.

- 실제 세계의 문제를 직관적으로 modeling할 수 있습니다.

- project 규모가 커져도 체계적인 관리가 가능합니다.

- 확장성이 좋아 새로운 기능을 추가하기 쉽습니다.


### 객체 지향 Programming의 단점

- 절차적 Programming에 비해 설계가 복잡할 수 있습니다.

- 객체 간의 관계가 복잡해지면 성능 저하가 발생할 수 있습니다.

- 간단한 문제에 대해서는 과도한 설계가 될 수 있습니다.

- 학습 곡선이 상대적으로 가파른 편입니다.


---


## 객체 지향 Programming의 핵심 개념

- 객체 지향 Programming은 **class**와 **객체**, **캡슐화**, **상속**, **다형성**, **추상화** 등의 개념을 기반으로 합니다.


### 핵심 개념 1. Class와 객체

- **class**는 **객체를 생성하기 위한 template** 또는 청사진입니다.
    - class는 data를 저장하는 속성(attribute)과 행동을 정의하는 method를 포함합니다.
    - 예를 들어, `Car` class가 있다면 `color`, `model` 등의 속성과 `start()`, `stop()` 등의 method를 가질 수 있습니다.

- **객체**(object)는 class의 instance로, **class에서 정의한 속성과 method를 가진 실체**입니다.


### 핵심 개념 2. 캡슐화

- 캡슐화는 **object의 data와 해당 data를 조작하는 method를 하나의 단위로 묶는 것**입니다.

- **객체 내부 구현을 외부로부터 숨기고, 필요한 interface만 노출**합니다.

- 접근 제어자(access modifier)를 통해 data 접근을 제한할 수 있습니다.
    - private, protected, public 같은 접근 제어자를 사용합니다.

- 캡슐화를 통해 객체의 무결성을 보호하고 유지 보수성을 향상시킬 수 있습니다.


### 핵심 개념 3. 상속

- 상속은 **기존 class의 속성과 method를 새로운 class가 물려받는 개념**입니다.

- **부모 class(superclass)의 특성을 자식 class(subclass)가 재사용**할 수 있습니다.

- code 재사용성을 높이고 계층 관계를 표현하는 데 유용합니다.
    - 예를 들어, `Vehicle` class를 상속받은 `Car`와 `Motorcycle` class를 만들 수 있습니다.


### 핵심 개념 4. 다형성

- 다형성은 **같은 interface**를 통해 다양한 객체가 **각자의 방식으로 동작**할 수 있게 하는 원칙입니다.

- **method overriding**을 통해 부모 class의 method를 자식 class에서 재정의할 수 있습니다.

- **method overloading**을 통해 같은 이름의 method를 다른 parameter로 여러 개 정의할 수 있습니다.

- 다형성을 통해 code의 유연성과 확장성이 향상됩니다.


### 핵심 개념 5. 추상화

- 추상화는 복잡한 system에서 **필요한 부분만 강조하고 불필요한 세부 사항은 숨기는 과정**입니다.

- 복잡한 현실 세계의 개념을 **단순화**하여 표현합니다.

- **interface**와 **abstract class**를 통해 구현할 수 있습니다.
    - 구체적인 구현보다는 객체가 제공하는 기능에 집중합니다.


---


## 객체 지향 설계를 위한 원칙 : SOLID

- SOLID는 객체 지향 설계의 5가지 기본 원칙을 나타내는 약어입니다.
    - 각 원칙의 첫 글자를 따서 이름 지어졌습니다.
    - SRP, OCP, LSP, ISP, DIP 원칙을 지칭합니다.

1. **Single Responsibility Principle** (단일 책임 원칙) : 하나의 class는 하나의 책임만 가져야 합니다.

2. **Open/Closed Principle** (개방-폐쇄 원칙) : software 요소는 확장에는 열려 있으나 수정에는 닫혀 있어야 합니다.

3. **Liskov Substitution Principle** (Liskov 치환 원칙) : 부모 class의 객체는 자식 class의 객체로 대체 가능해야 합니다.

4. **Interface Segregation Principle** (Interface 분리 원칙) : client는 자신이 사용하지 않는 interface에 의존하지 않아야 합니다.

5. **Dependency Inversion Principle** (의존성 역전 원칙) : 고수준 module은 저수준 module에 의존하지 않아야 하며, 둘 다 추상화에 의존해야 합니다.
