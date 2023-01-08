# Design Pattern

- code를 재사용하는 것과 마찬가지로 '경험을 재사용'하는 것

---


# Design 원칙

- application에서 달라지는 부분을 찾아내고, 달라지지 않는 부분으로부터 분리시키기
    - 모든 design pattern의 기반이 되는 원칙
    - 모든 pattern은 'system의 일부분을 다른 부분과 독립적으로 변화시킬 수 있는' 방법을 제공하기 위한 것

- 구현이 아닌 interface에 맞춰서 programming하기
    - == 상위 형식에 맞춰서 programming하기
        - 객체를 변수에 대입할 때 상위 형식을 구체적으로 구현한 형식이라면 어떤 객체든 집어넣을 수 있기 때문
        - 이렇게 하면 변수를 선언하는 class에서 실제 객체의 형식을 몰라도 됨
    - 실제 실행시에 쓰이는 객체가 code에 의해서 고정되지 않아야 함
    - 어떤 상위 형식(supertype)에 맞춰서 programming함으로써 다형성을 활용하기

- 상속보다는 구성(composition)을 활용하기
    - 두 class를 합칠 때, 'A에는 B가 있다'가 'A는 B이다' 보다 나을 수 있음
    - 구성을 이용하여 system을 만들면 유연성을 높일 수 있음

- 서로 상호작용을 하는 객체 사이에서는 가능하면 loose coupling design을 사용해야 함
    - 느슨하게 결합하는 design을 사용하면 변경 사항이 생겨도 무난히 처리할 수 있는 유연한 객체지향 system을 구축할 수 있음
        - 객체 사이의 상호의존성을 최소화할 수 있기 때문

- class는 확장에 대해서는 열려 있어야 하지만, code 변경에 대해서는 닫혀 있어야 함
    - OCP : Open-Closed Principle
    - 기존 code는 건드리지 않고 확장을 통해서 새로운 행동을 추가할 수 있게 해야 함
        - 새로운 기능을 추가하는 데에 유연해서, 변화에 잘 적응할 수 있으면서도 튼튼한 design을 만들 수 있음
    - 그렇다고 무조건 OCP를 적용하는 것은 좋지 않음
        - 불필요하게 복잡하고 이해하기 힘든 code만 만들게 될 수도 있음

- 추상화된 것에 의존하도록 만들기 (구상 class에 의존하도록 만들지 않기)
    - 의존성 뒤집기 원칙 (Dependency Inversion Principle)
        - '뒤집기(inversion)'
            - 객체지향 design을 할 때 일반적으로 생각하는 방법과는 반대로(뒤집어서) 생각해야 하기 때문
                - 보통은 의존성이 위에서 아래로 내려감 (고수준 구성요소가 저수준 구성요소에 의존)
            - ex) factory pattern : 저수준 module과 고수준 module이 둘 다 하나의 추상 class에 의존함
    - '특정 구현이 아닌 interface에 맞춰서 programmin한다'는 원칙보다 추상화를 더 많이 강조함
        - 고수준 구성요소가 저수준 구성요소에 의존하면 안 됨
            - 고수준 구성요소 : 다른 저수준 구성요소에 의해 정의되는 행동이 들어있는 구성요소
        - 항상 추상화에 의존해야 함
    - 구상 class처럼 구체적인 것이 아닌 추상 class나 interface와 같이 추상적인 것에 의존하는 code를 만들어야 함
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

---

# Reference

- Head First Design Patterns