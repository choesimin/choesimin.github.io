# Design Pattern

```
Don’t reinvent the wheel
(바퀴를 다시 발명하지 마라)
```

- (software 설계)의 (특정 맥락에서 자주 발생하는 고질적인 문제들이 또 발생했을 때, 재사용할 할 수있는 훌륭한 해결책)
- 경험을 재사용하는 것

- Pattern
    ```
    A solution to a problem in a context
    특정 상황(Context)에서 자주 반복되는 비슷한 문제(Problem)에 대한 해결책(Solution)
    ```
    - 설계 문제와 해결책의 유사점을 일반화한 것
        - 각기 다른 software 모듈이나 기능을 가진 다양한 응용 software system들을 개발할 때, 서로 간에 공통되는 설계 문제가 존재하며 이를 처리하는 해결책 사이에도 공통점이 있음
    - pattern은 공통의 언어를 만들어주며 팀원 사이의 의사소통을 원활하게 해줌




## 구조

1. Context
    - 문제가 발생하는 여러 상황을 기술함
        - pattern이 적용될 수 있는 상황
    - 경우에 따라서는 pattern이 유용하지 못한 상황을 나타내기도 함

2. Problem
    - pattern이 적용되어 해결될 필요가 있는 여러 design issue들을 기술함
        - 여러 제약사항과 영향력도 문제 해결을 위해 고려해야 함

3. Solution
    - 문제를 해결하도록 설계를 구성하는 요소들과 그 요소들 사이의 관계, 책임, 협력 관계를 기술함
        - 구체적인 구현 방법이나 언어에 의존적이지 않으며, 다양한 상황에 적용할 수 있는 일종의 template

- Example : Iterator pattern
    ```
    Context : Objects의 Collection을 가지고 있다.
    Problem : Collection의 구현을 밖으로 드러내지 않고 Object들을 처리하고 싶다.
    Solution : 별도의 class에 Iteration을 Encapsulation한다.
    ```




## 분류

- 생성(Creational) Pattern
    - 객체 생성에 관련된 pattern
    - 객체의 생성과 조합을 캡슐화해 특정 객체가 생성되거나 변경되어도 program 구조에 영향을 크게 받지 않도록 유연성을 제공함

- 구조(Structural) Pattern
    - class나 객체를 조합해 더 큰 구조를 만드는 pattern
    - example
        - 서로 다른 interface를 지닌 2개의 객체를 묶어 단일 interface를 제공하기
        - 객체들을 서로 묶어 새로운 기능을 제공하기

- 행위(Behavioral) Pattern
    - 객체나 class 사이의 algorithm이나 책임 분배에 관련된 pattern
    - 한 객체가 혼자 수행할 수 없는 작업을 여러 개의 객체로 분배하고, 그렇게 하면서도 객체 사이의 결합도를 최소화하는 것에 중점 둠




## 종류

| 생성 Pattern | 구조 Pattern | 행위 Pattern |
| - | - | - |
| Builder | Bridge | Mediator |
| Prototype | Decorator | Interpreter |
| Factory Method | Facade | Iterator |
| Abstract Factory | Flyweight | Template Method |
| Singleton | Proxy | Observer |
|  | Composite | State |
|  | Adapter | Visitor |
|  |  | Command |
|  |  | Strategy |
|  |  | Memento |
|  |  | Chain of Responsibility |




### 생성 pattern

- Builder
    - 복잡한 instance를 조립하여 만드는 구조
    - 생성과 표기를 분리해서 복잡한 객체를 생성
        - 복합 객체를 생성할 때 객체를 생성하는 방법(과정)과 객체를 구현(표현)하는 방법을 분리함으로써 동일한 생성 절차에서 서로 다른 표현 결과를 만들 수 있음

- Prototype
    - 처음부터 일반적인 원형을 만들어 놓고, 그것을 복사한 후 필요한 부분만 수정하여 사용하는 pattern
        - 기존 객체를 복제함으로써 객체를 생성
    - 생성할 객체의 원형을 제공하는 instance에서 생성할 객체들의 type이 결정되도록 설정함
    - 객체를 생성할 때 갖추어야 할 기본 형태가 있을 때 사용함

- Factory Method
    - 상위 class에서 객체를 생성하는 interface를 정의하고, 하위 class에서 instance를 생성하도록 하는 방식
        - 상위 class에서 instance를 만드는 방법만 결정
        - 하위 class에서 그 data의 생성을 책임지고 조작하는 함수들을 overloading함
    - interface와 실제 객체를 생성하는 class를 분리할 수 있게 함
    - 생성할 객체의 class를 국한받지 않고 객체를 생성함

- Abstract Factory
    - 구체적인 class에 의존하지 않고 서로 연관되거나 의존적인 객체들의 조합을 만드는 interface를 제공하는 pattern
    - 이 pattern을 통해 생성된 class에서는 사용자에게 interface(API)를 제공하고, 구체적인 구현은 Concrete Product class에서 이루어짐
    - 동일한 주제의 다른 factory 묶음

- Singleton
    - 전역 변수를 사용하지 않고 객체를 하나만 생성하도록 하며, 생성된 객체를 어디에서든지 참조할 수 있도록 하는 design pattern
    - 한 class에 한 객체만 존재하도록 제한함




### 구조 pattern

- Bridge
    - 추상화된 부분과 실제 구현 부분을 독립적으로 확장할 수 있는 design pattern
        - 기능의 class 계층과 구현의 class 계층을 연결하고, 구현부에서 추상 계층을 분리함
    - 구현뿐만 아니라, 추상화된 부분까지 변경해야 하는 경우 활용하기

- Decorator
    - 기존에 구현되어 있는 class에 필요한 기능을 추가해나가는 design pattern
    - 기능 확장이 필요할 때 객체 간의 결합을 통해 기능을 동적으로 유연하게 확장할 수 있게 해줌
    - 상속의 대안으로 사용됨
    - 객체의 결합을 통해 기능을 동적으로 유연하게 확장함

- Facade
    - 복잡한 system에 대하여 단순한 interface를 제공함으로써 사용자의 system 간 또는 여타 system과의 결합도를 낮추어 system 구조에 대한 파악을 쉽게 할 수 있게 해주는 pattern
    - 통합된 interface 제공
    - 오류에 대해서 단위별로 확인할 수 있게 함
    - 단순한 interface 제공을 통해 사용자의 접근성을 높일 수 있음

- Flyweight
    - 다수의 객체로 생성될 경우 모두가 갖는 본질적인 요소를 class화하여 공유하는 pattern
        - memory를 절약할 수 있음
        - 'class의 경량화'를 목적으로 함
    - 여러 개의 '가상 instance'를 제공하여 memory 절감

- Proxy
    - '실체 객체에 대한 대리 객체'로 실체 객체에 대한 접근 이전에 필요한 행동을 취할 수 있게 해주는 pattern
        - 이 점을 이용해서 미리 할당하지 않아도 상관없는 것들을 실제 이용할 떄 할당하게 하여 memory 용량을 아낄 수 있음
        - 실체 객체를 드러나지 않게 하여 정보은닉의 역할도 수행함
    - 특정 객체로의 접근을 제어하기 위한 용도로 사용

- Composite
    - 객체들의 관계를 tree 구조로 구성하여 부분-전체 계층을 표현하는 pattern
    - 사용자가 단일 객체과 복합 객체 모두 동일하게 다루도록 함
    - 복합 객체와 단일 객체를 동일하게 취급

- Adapter
    - 기존에 생성된 class를 재사용할 수 있도록 중간에서 맞춰주는 역할의 interface를 만드는 pattern
    - 상속을 이용하는 class pattern과 위임을 이용하는 instance pattern의 두 가지 형태로 사용됨
    - interface가 호환되지 않는 class들을 함께 이용할 수 있도록 타 class의 interface를 기존 interface에 덧씌움



### 행위 pattern

- Mediator
    - 객체지향 설계에서 객체의 수가 너무 많아지면 서로 간 통신이 복잡해져서 객체지향에서 가장 중요한 느슨한 결합의 특성을 해칠 수 있음
    - 이를 해결하는 방법으로 중간에 이를 통제하고 지시할 수 있는 역할의 중재자를 두고, 중재자에게 모든 것을 요구하여 통신의 빈도수를 줄임

- Interpreter
    - 언어의 다양한 해석(구문을 나누고 그 분리된 구문의 해석)을 맡는 class를 각각 작성하여 여러 형태의 언어 구문을 해석할 수 있게 만드는 design pattern
    - 문법 자체를 캡슐화하여 사용

- Iterator
    - 컬렉션 구현 방법을 노출시키지 않으면서도 그 집합체 안에 들어있는 모든 항목에 접근할 방법을 제공하는 design pattern
    - 내부구조를 노출하지 않고, 복잡 객체의 원소를 순차적으로 접근 가능하게 함

- Template Method
    - 어떤 작업을 처리하는 일부분을 sub class로 캡슐화해서, 전체 일을 수행하는 구조는 바꾸지 않고 특정 단계에서 수행하는 내역을 바꾸는 pattern
        - 상위 class(추상 class)에는 추상 method를 통해 기능의 골격을 제공함
        - 하위 class(구체 class)의 method에는 세부 처리를 구체화하는 방식으로 사용함
        - code량을 줄이고 유지보수를 용이하게 함
    - 상위 작업의 구조를 바꾸지 않으면서 서브 class로 작업의 일부분을 수행

- Observer
    - 한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체들에 연락이 가고 자동으로 내용이 갱신되는 방버으로 일대 다의 의존성을 가지며 상호작용하는 객체 사이에서는 가능하면 느슨하게 결합하는 design pattern
        - 객체의 상태 변화에 따라 다른 객체의 상태도 연동, 일대다 의존

- State
    - 객체 상태를 캡슐화한 class를 참조하게 하는 방식
    - 상태에 따라 다르게 처리할 수 있도록 행위 내용을 변경하는 pattern
        - 변경 시 원시 code의 수정을 최소화할 수 있기 때문에 유지보수가 편해짐
    - 객체의 상태에 따라 행위 내용을 변경

- Visitor
    - 각 class data 구조로부터 처리 기능을 분리하여 별도의 class를 만들어 놓고, 해당 class의 method가 각 class를 돌아다니며 특정 작업을 수행하도록 만드는 pattern
    - 객체의 구조는 변경하지 않으면서 기능만 따로 추가하거나 확장할 때 사용함
    - 특정 구조를 이루는 복합 객체의 원소 특성에 따라 동작을 수행할 수 있도록 지원하는 행위

- Command
    - 실행될 기능을 캡슐화함으로써 주어진 여러 기능을 실행할 수 있는 재사용성이 높은 class를 설계하는 pattern
    - 하나의 추상 class에 method를 만들어 각 명령이 들어오면 그에 맞는 sub class가 선택되어 실됨
    - 요구사항을 객체로 캡슐화

- Strategy
    - algorithm 군을 정의하고(추상 class), 같은 algorithm을 각각 하나의 class로 캡슐화한 다음, 필요할 때 서로 교환해서 사용할 수 있게 하는 pattern
    - 행위 객체를 class로 캡슐화해 동적으로 행위를 자유롭게 변환함

- Memento
    - class 설계 관점에서 객체의 정보를 저장할 필요가 있을 때 적용하는 pattern
    - Undo(작업취소) 기능(객체를 이전 상태로 복구)을 개발할 때 사용함

- Chain of Responsibility
    - 정적으로 어떤 기능에 대한 처리의 연결이 hard coding 되어 있을 때 기능 처리의 연결 변경이 불가능함
    - 이를 연결되어 있는 경우에 따라 동적으로 다르게 처리될 수 있도록 연결해주는 pattern
    - 한 요청을 2개 이상의 객체에서 처리함

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
- https://gmlwjd9405.github.io/2018/07/06/design-pattern.html
    - 개념
- https://velog.io/@poiuyy0420/디자인-패턴-개념과-종류
    - 종류
- https://jw92.tistory.com/11
    - design pattern의 구성 (context, problem, solution)