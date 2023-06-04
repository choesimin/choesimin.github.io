---
layout: note
title: Design 원칙
version: 2023-06-04
---




## Application에서 달라지는 부분을 찾아내고, 달라지지 않는 부분으로부터 분리시키기

- 모든 design pattern의 기반이 되는 원칙입니다.
    - 모든 pattern은 'system의 일부분을 다른 부분과 독립적으로 변화시킬 수 있는' 방법을 제공하기 위한 것입니다.




---




## 구현이 아닌 Interface에 맞춰서 개발하기

- 상위 형식에 맞춰서 개발해야 합니다.
    - 객체를 변수에 대입할 때 상위 형식을 구체적으로 구현한 형식이라면 어떤 객체든 집어넣을 수 있기 때문입니다.
    - 이렇게 하면 변수를 선언하는 class에서 실제 객체의 형식을 몰라도 됩니다.

- 실제 실행시에 쓰이는 객체가 code에 의해서 고정되지 않아야 합니다.
- 상위 형식(super type)에 맞춰서 programming함으로써 다형성을 활용할 수 있습니다.




---




## 상속보다는 구성(composition)을 활용하기

- 두 class를 합칠 때, 'A에는 B가 있다'가 'A는 B이다' 보다 나을 수 있습니다.
- composition을 이용하여 system을 만들면 유연성을 높일 수 있습니다.




---




## 서로 상호작용을 하는 객체 사이에서는 가능하면 Loose Coupling Design을 사용하기

- 느슨하게 결합하는 design을 사용하면 변경 사항이 생겨도 무난히 처리할 수 있는 유연한 객체지향 system을 구축할 수 있습니다.
    - 객체 사이의 상호의존성을 최소화할 수 있기 때문




---




## 개방 폐쇄 원칙

- OCP : Open-Closed Principle.
    - class는 확장에 대해서는 열려 있어야 하지만, code 변경에 대해서는 닫혀 있어야 합니다.

- 기존 code는 건드리지 않고 확장을 통해서 새로운 행동을 추가할 수 있게 해야 합니다.
    - 변화에 잘 적응할 수 있는 튼튼한 design을 만들어야 합니다.
        - 새로운 기능을 추가하는 데에 유연해야 합니다.

- 무조건 OCP를 적용하는 것은 좋지 않습니다.
    - 불필요하게 복잡하고 이해하기 힘든 code가 될 수 있기 때문입니다.




---




## 추상화된 것에 의존하도록 만들기

- concrete class에 의존하도록 만들어서는 안 됩니다.

- 의존성 뒤집기 원칙 (Dependency Inversion Principle)
    - '뒤집기(inversion)'
        - 객체지향 design을 할 때 일반적으로 생각하는 방법과는 반대로(뒤집어서) 생각해야 하기 때문
            - 보통은 의존성이 위에서 아래로 내려감 (고수준 구성요소가 저수준 구성요소에 의존)
        - e.g., Factory Pattern에서는 저수준 module과 고수준 module이 둘 다 하나의 abstract class에 의존합니다.
- '특정 구현이 아닌 interface에 맞춰서 programmin한다'는 원칙보다 추상화를 더 많이 강조함
    - 고수준 구성요소가 저수준 구성요소에 의존하면 안 됨
        - 고수준 구성요소 : 다른 저수준 구성요소에 의해 정의되는 행동이 들어있는 구성요소
    - 항상 추상화에 의존해야 함
- 구상 class처럼 구체적인 것이 아닌 abstract class나 interface와 같이 추상적인 것에 의존하는 code를 만들어야 함
- guide line (모두 지킬 수 없지만, 어기더라도 알고 어겨야 함)
    1. 어떤 변수에도 구상 class에 대한 reference를 저장하지 않기
        - new 연산자를 사용하면 구상 class에 대한 reference를 사용하게 되는 것임
        - factory pattern에서는 구상 class에 대한 reference를 변수에 저장하는 일을 미리 방지함
    2. 구상 class에서 유도된 class를은 만들지 않기
        - 구상 class에서 유도된 class를 만들면 특정 구상 class에 의존하게 됨
        - interface나 추상 class처럼 추상화된 것으로부터 class를 만들어야 함
    3. base class에 이미 구현되어 있던 method를 overriding하지 않기
        - 이미 구현되어 있는 method를 overriding한다는 것은 애초부터 base class가 제대로 추상화된 것이 아니었다고 볼 수 있음
        - base class에서 method를 정의할 때는 모든 sub class에서 공유할 수 있는 것만 정의해야 함


## 최소 지식 원칙 (Principle of Least Knowledge)

- 데메테르의 법칙(Law of Demeter)과 완전히 똑같은 것을 가리키는 말
- 정말 친한 친구하고만 얘기하기
    - 객체 사이의 상호작용은 될 수 있으면 아주 가까운 '친구' 사이에서만 허용하는 것이 좋음
- 어떤 객체든 그 객체와 상호작용을 하는 class에 개수에 주의해야 함
    - 또한 그런 객체들과 어떤 식으로 상호작용을 하는지에도 주의를 기울어야 함
- 이 원칙을 잘 따르면 여러 class들이 복잡하게 얽혀서 system의 한 부분을 변경했을 때, 다른 부분까시 줄줄이 고쳐야 되는 상황을 방지할 수 있음
    - 객체들 사이의 의존성을 줄일 수 있음
    - 여러 class들이 서로 복잡하게 의존하고 있다면, 관리하기 힘들고, 남들이 보기에도 이해하기 어려운, 불안정한 system이 됨
- 단점 : 다른 구성요소에 대한 method 호출을 처리하기 위해 wrapper class를 더 만들어야 할 수도 있음
    - system이 더 복잡해짐
    - 개발 시간이 늘어남
    - 성능이 더 떨어질 수도 있음


## Hollywood 원칙 (Hollywood Principle)

- 저수준 구성요소에서 system에 접속을 할 수는 있지만, 언제 어떤 식으로 그 구성요소들을 사용할지는 고수준 구성요소에서 결정하게 됨
    - 고수준 구성요소에서 저수준 구성요소에게 `먼저 연락하지 마세요. 저희가 연락 드리겠습니다.`라고 얘기하는 것과 같음
- Hollywood 원칙을 활용하면 의존성 부패를 방지할 수 있음
    - 의존성 부패(dependency rot) : 의존성이 복잡하게 꼬여있는 것
        - ex) 어떤 고수준 구성요소가 저수준 구성요소에 의존하고, 그 저수준 구성요소는 다시 고수준 구성요소에 의존하고, 그 고수준 구성요소는 다시 또 다른 구성요소에 의존하고, 그 다른 구성요소는 또 저수준 구성요소에 의존하고, ...
- templateMethod에서 이 원칙이 잘 보임
    - 고수준 구성요소가 algorithm을 장악하고, method 구현이 필요한 상황에서만 sub class를 불러냄
    - sub class는 자질구레한 method 구현을 제공하기 위한 용도로만 쓰임
        - 호출'당하기' 전까지는 절대 추상 class를 직접 호출하지 않음
- 저수준 구성요소에서 고수준 구성요소에 있는 method를 호출할 수도 있음
    - 저수준 구성요소에서도 상속 계층구조상 위에 있는 class에서 정의한 method를, 상속을 통해서 호출하게 되는 경우가 빈번하게 있음
    - 하지만 저수준 구성요소와 고수준 구성요소 사이에 확연하게 드러나는 순환 의존성이 생기는 것은 피하는 게 좋음


## 단일 역할 원칙

- class를 바꾸는 이유는 한 가지 뿐이어야 함
    - ex) Iterator Pattern의 iterator와 collection의 역할 분리
- 만약 하나의 class에 두 역할이 있다면, 두 가지 이유로 그 class가 바뀔 수 있음
- class를 고치는 것은 최대한 피해야 함
    - 기존의 code를 변경하다 보면 문제가 생길 수 있음
- 응집도(cohesion)
    - 한 class 또는 module이 특정 목적 또는 역할을 얼마나 일관되게 지원하는지를 나타내는 척도
    - 응집도가 높다 == 일련의 서로 연관된 기능이 묶여있다는 것을 의미함
    - 응집도가 낮다 == 서로 상관 없는 기능들이 묶어있다는 것을 의미함
- 단일 역할 원칙을 잘 따르는 class는 응집도가 높고, 관리하기도 더 용이함




---




# Reference

- Head First Design Patterns - Eric Freeman, Elisabeth Robson, Bert Bates, Kathy Sierra
