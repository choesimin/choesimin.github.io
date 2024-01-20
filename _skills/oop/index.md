---
layout: note
title: OOP
date: 2023-11-07
---




## OOP : Object Oriented Programming

- OOP는 **객체 지향 programming**을 의미합니다.




---




## 객체 지향에 대한 잘못된 설명

### Data와 함수의 조합

- `o.f()`가 `f(o)`와 다르다는 의미를 내포하기 때문에 정확한 설명이 아닙니다.

### 실제 세계를 Modeling하는 새로운 방법

- 의도가 불분명하며, 정의가 모호합니다.

### OO는 캡슐화(encapsulation), 상속(inheritance), 다형성(polymorphism), 이 세 가지 개념을 적절하게 조합한 것

#### 캡슐화

- C언어에서도 완벽한 캡슐화(encapsulation)가 가능합니다.
    - data 구조와 함수를 header file에 선언하고 구현 file에서 구현하면 됩니다.

- 오히려 C++, C#, Java 등에서 완전한 캡슐화(encapsulation)가 깨집니다.
    - C++ : compiler가 class의 instance 크기를 알아야 하기 때문에 class의 member 변수를 해당 class의 header file에 선언해야 합니다.
    - C#, Java : 아예 header와 구현체를 분리하는 방식을 버렸습니다.
        - class 선언과 정의를 구분하는 것이 불가능합니다.

### 상속

- 객체 지향 언어로 넘어와서 더 편리해지긴 했지만, C언어에서도 가능한 기법입니다.

### 다형성

- C언어에서 함수를 가리키는 pointer를 응용해 구현할 수 있었지만, 객체 지향 언어는 이를 더 편리하고 안전하게 사용할 수 있게 해줍니다.
    - 함수 pointer는 다형성을 위해 사용하기에는 위험합니다.

- 다형성은 객체 지향에서 가장 중요한 부분입니다.
    - 다형성을 통해 제어 흐름을 간접적으로 전환하는 규칙을 부과합니다.




---




## Reference

- Clean Architecture (도서) - Robert C. Martin