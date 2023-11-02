---
layout: note
title: Clean Architecture Chapter 3 - 설계 원칙
date: 2023-11-02
---




## 7장. SRP : Single Responsibility Principle : 단일 책임 원칙

```
콘웨이(conway) 법칙에 따른 따름정리 : software system이 가질 수 있는 최적의 구조는 system을 만드는 조직의 사회적 구조에 커다란 영향을 받는다. 따라서 각 software module은 변경의 이유가 하나, 단 하나여야만 한다.
```
- 하나의 module은 하나의, 오직 하나의 actor에 대해서만 책임져야 함
- 이 원칙을 위반하는 징후들
    1. 우발적 중복
        - 서로 다른 actor가 의존하는 code를 가까이 배치되는 경우
    2. 병합
        - 서로 다른 team에 속했을 개발자가 작업했을 때 변경 사항이 충돌하는 경우
- data와 method를 구분하고 퍼사드(Facade) pattern으로 해결


## 8장. OCP : Open-Closed Pinciple : 개방-폐쇄 원칙

```
1980년대에 버트란트 마이어(Bertrand Meyer)에 의해 유명해진 원칙이다. 기존 code를 수정하기보다는 반드시 새로운 code를 추가하는 방식으로 system의 행위를 변경할 수 있도록 설계해야만 software system을 쉽게 변경할 수 있다는 것이 이 원칙의 요지이다.
```
- software 개체(artifact)는 확장에는 열려 있어야 하고, 변경에는 닫혀 있어야 함
    - software 개체의 행위는 확장할 수 있어야 하지만, 이때 개체를 변경해서는 안 됨
- system을 component 단위로 분리하고, 저수준 component에서 발생한 변경으로부터 고수준 component를 보호할 수 있는 형태의 의존성 계층구조가 만들어지도록 해야 함


## 9장. LSP : Liskov Subsitution Principle : 리스코프 치환 원칙

```
1988년 바바라 리스코프(Barbara Liskov)가 정의한, 하위 타입(subtype)에 관한 유명한 원칙이다. 요약하면, 상호 대체 가능한 구성요소는 반드시 서로 치환 가능해야 한다는 계약을 반드시 지켜야 한다.
```
```
S type의 객체 o1 각각에 대응하는 T type 객체 o2가 있고, T type을 이용해서 정의한 모든 program P에서 o2의 자리에 o1을 치환하더라도 P의 행위가 변하지 않는다면, S는T의 하위 type이다.
```
- LSP는 architecture 수준까지 확장할 수 있고, 반드시 확장해야만 함
    - 치환 가능성을 조금이라도 위배하면 system architecture가 오염되어 상당량의 별도 mechanism을 추가해야할 수 있기 때문


## 10장. ISP : Interface Segregation Principle : 인터페이스 분리 원칙

```
이 원칙에 따르면 software 설계자는 사용하지 않은 것에 의존하지 않아야 한다.
```


## 11장. DIP : Dependenvy Inversion Principle : 의존성 역전 원칙

```
고수준 정책을 구현하는 code는 저수준 세부사항을 구현하는 code에 절대로 의존해서는 안 된다. 대신 세부사항이 정책에 의존해야 한다.
```
- 유연성이 극대화된 system : 의존성이 추상(abstraction)에 의존하며 구체(concretion)에는 의존하지 않는 system
    - Java같은 정적 type 언어에서 이 말은 use, import, include 구문은 오직 interface나 추상 class 같은 추상적인 선언만을 참조해야 한다는 뜻
        - 구체적인 요소에 의존할 수는 있지만 변동성이 큰(volatile) 구체적인 요소에는 절대로 의존해서는 안 됨

- 안정된 추상화
    - interface는 구현체보다 변경 가능성이 적으며 architect는 interface의 변동성을 낮추기 위해서 노력해야 함
    - 안정된 software architecture란?
        - 변동성이 큰 구현체에 의존하는 일은 지양함
        - 안정된 추상 interface에 의존하는 것을 선호함
    - 방법
        1. 변동성이 큰 구체 class를 참조하지 않기
            - 대신 추상 팩토리(Abstract Factory)를 사용하기
        2. 변동성이 큰 구체 class로부터 파생하지 않기
            - 상속은 아주 신중하기 사용하기
                - 상속은 source code의 모든 관계 중 가장 강력하고 뻣뻣하기 때문에 변경하기 어려움
        3. 구체 함수를 override하지 않기
            - 대체로 구체 함수는 source code 의존성을 필요로 함
                - 구체 함수를 override하면 이러한 의존성을 제거할 수 없게 됨 (의존성을 상속받게 되는 셈)
            - 차라리 추상 함수로 선언하고 구현체들에서 각잔의 용도에 맞게 구현하는 것이 나음
        4. 구체적이며 변동성이 크다면 그 이름을 언급하지 않기
            - DIP 원칙을 다른 방식으로 풀어쓴 말




---




# Reference

- Clean Architecture (도서) - Robert C. Martin
