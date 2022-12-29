# Strategy Pattern

- 알고리즘군을 정의하고 각각을 캡슐화하여 교환해서 사용할 수 있도록 만듬
- algorithm을 사용하는 client와는 독립적으로 algorithm을 변경할 수 있음


---

# Example : 오리 Class

- client에서는 '나는 행동'과 '꽥꽥거리는 행동' 모두에 대해서 캡슐화된 알고리즘군을 '활용'함
    - client는 setter로 행동 변수를 설정하고 perform 함수를 사용하면 됨
        - ex) setFlyBehavior() -> performFly()
- 각 행동의 집합을 알고리즘군으로 생각하면 됨

## Client

```mermaid
classDiagram

class Duck {
    FlyBehavior flyBehavior
    QuackBehavior quackBehavior
    swim()
    display()
    performFly()
    performQuack()
    setFlyBehavior()
    setQuackBehavior()
}

class MallarDuck {
    display() 물오리의 모양 표시
}

class RedheadDuck {
    display() 붉은머리 오리 모양 표시
}

class RubberDuck {
    display() 고무 오리 모양 표시
}

class DecoyDuck {
    display() 가짜 오리 모양 표시
}

Duck <|-- MallarDuck
Duck <|-- RedheadDuck
Duck <|-- RubberDuck
Duck <|-- DecoyDuck
```

## 캡슐화된 나는 행동

```mermaid
classDiagram

class FlyBehavior {
    <<interface>>
    fly()
}

class FlyWithWings {
    fly() 오리가 나는 것을 구현
}

class FlyNoWay {
    fly() : 아무것도 하지 않음 - 날 수 없음
}

FlyBehavior <|.. FlyWithWings
FlyBehavior <|.. FlyNoWay
```

## 캡슐화된 꽥꽥거리는 행동

```mermaid
classDiagram

class QuackBehavior {
    <<interface>>
    quack()
}

class Quack {
    quack() 꽥꽥 소리를 내는 것을 구ㅕㄴ
}

class Squeak {
    quack() : 고무 오리가 내는 삑삑 소리 구현
}

class MuteQuack {
    quack() : 아무것도 하지 않음 - 소리 내기 못함
}

QuackBehavior <|.. Quack
QuackBehavior <|.. Squeak
QuackBehavior <|.. MuteQuack
```



---

# Reference

- Head First Design Patterns