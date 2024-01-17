---
layout: note
title: Design Pattern
date: 2023-06-04
---




```txt
Don’t reinvent the wheel.
바퀴를 다시 발명하지 마라.
```

- design pattern이란 'software 설계'(`design`)의 '특정 맥락에서 자주 발생하는 고질적인 문제들이 또 발생했을 때, 재사용할 할 수 있는 훌륭한 해결책'(`pattern`)입니다.

- design pattern은 경험을 재사용하는 것입니다.

- design pattern은 '규칙'이나 '법칙'이 아닌 '지침' 정도로 생각해야 합니다.
    - 정의를 엄격하게 따를 필요는 없고, 필요에 따라 적당히 고쳐서 사용해도 됩니다.
    - 실제 pattern이 적용되는 곳을 보면 고전적인 pattern design하고 다른 부분도 많습니다.
    - pattern을 고쳐서 사용할 때는 고전적인 pattern design과 다른 부분을 문서화해 놓는 것이 좋습니다.




---




## Pattern : 일반화하기

```txt
A solution to a problem in a context.
특정 상황(Context)에서 주어진 문제(Problem)에 대한 해결책(Solution).
```

- 설계 문제와 해결책의 유사점을 일반화한 것입니다.
    - 각기 다른 software module이나 기능을 가진 다양한 응용 software system를 개발할 때, 서로 간에 공통되는 설계 문제가 존재하며, 이를 처리하는 해결책 사이에도 공통점이 있습니다.

- pattern은 공통의 언어를 만들어주며 팀원 사이의 의사소통을 원활하게 해줍니다.
    - e.g., "기능마다 별도의 class를 만들고, 그 기능들로 해야할 일을 한번에 처리해주는 class를 만들자"라고 제안하는 것보다 "Facade Pattern을 써보자"라고 제안하는 쪽이 이해하기 쉽습니다.




---




## Design Pattern의 구조

- design pattern은 context, problem, solution으로 구성됩니다.

| Iterator Pattern | 예시 |
| --- | --- |
| Context | 다수의 object collection을 가지고 있다. |
| Problem | collection의 구현을 밖으로 드러내지 않고 object들을 처리하고 싶다. |
| Solution | 별도의 class에 iteration을 encapsulation한다. |


### 1. Context

- 문제가 발생하는 여러 상황을 기술합니다.
    - pattern이 적용될 수 있는 상황입니다.
- 경우에 따라서는 pattern이 유용하지 못한 상황을 나타내기도 합니다.
- 반복적으로 일어날 수 있는 상황이어야 합니다.


### 2. Problem

- pattern이 적용되어 해결될 필요가 있는 여러 설계 문제(design issue)들을 기술합니다.
    - 여러 제약사항과 영향력도 문제 해결을 위해 고려해야 합니다.

- problem은 context 내에서 이루고자 하는 목적입니다.
    - context 내에서 생길 수 있는 제약조건도 problem에 포함됩니다.


### 3. Solution

- 문제를 해결하도록 설계를 구성하는 요소들과 그 요소들 사이의 관계, 책임, 협력 관계를 기술합니다.
    - 구체적인 구현 방법이나 언어에 의존적이지 않으며, 다양한 상황에 적용할 수 있는 일종의 template입니다.

- solution은 일련의 제약조건 내에서 목적을 달성할 수 있는 일반적인 설계(design)입니다.




---




## Design Pattern의 분류

- design pattern의 분류 기준은 두 가지가 있습니다.
    1. 생성, 구조, 행위.
    2. class, object.


### 생성 & 구조 & 행위

| 생성 Pattern | 구조 Pattern | 행위 Pattern |
| --- | --- | --- |
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

#### 생성(Creational) Pattern

- 객체 생성에 관련된 pattern입니다.
    - 객체 instance 생성을 위한 pattern입니다.
    - client와 그 client에서 생성해야 할 instance 사이의 연결을 끊습니다.
- 객체의 생성과 조합을 encapsulation해 특정 객체가 생성되거나 변경되어도 program 구조에 영향을 크게 받지 않도록 유연성을 제공합니다.

#### 구조(Structural) Pattern

- class나 객체를 조합해 더 큰 구조를 만드는 pattern입니다.
    - composition(합성)을 통해서 더 큰 구조를 만듭니다.

- 구조 pattern의 예시.
    - 서로 다른 interface를 지닌 2개의 객체를 묶어 단일 interface를 제공하기.
    - 객체들을 서로 묶어 새로운 기능을 제공하기.

#### 행위(Behavioral) Pattern

- 객체나 class 사이의 algorithm(상호작용)이나 책임 분배(역할 분담)에 관련된 pattern입니다.
- 한 객체가 혼자 수행할 수 없는 작업을 여러 개의 객체로 분배하고, 그렇게 하면서도 객체 사이의 결합도를 최소화하는 것에 중점을 둡니다.


### Class & Object

| Class Pattern | Object Pattern |
| --- | --- |
| Template Method | Strategy |
| Factory Method | Observer |
| Adaptor | Decorator |
| Interpreter | Proxy |
|  | Composite |
|  | Iterator |
|  | State |
|  | Abstract Factory |
|  | Singleton |
|  | Visitor |
|  | Memento |
|  | Chain of Responsibility |
|  | Bridge |
|  | Mediator |
|  | Flyweight |
|  | Prototype |
|  | Builder |
|  | Facade |
|  | Command |

#### Class Pattern

- class 사이의 관계가 상속을 통해서 어떤 식으로 정의되는지를 다룹니다.
- compile시에 관계가 결정됩니다.

#### Object Pattern

- 객체 사이의 관계를 다룹니다.
    - 객체 사이의 관계는 보통 composition을 통해서 정의됩니다.

- 일반적으로 실행 중에 관계가 생성됩니다.
    - 따라서 class pattern보다 더 동적이고 유연합니다.




---




## Design Pattern의 종류


### 생성 Pattern

#### Builder Pattern

- 복잡한 instance를 조립하여 만드는 구조입니다.
- 생성과 표기를 분리해서 복잡한 객체를 생성합니다.
    - 복합 객체를 생성할 때 객체를 생성하는 방법(과정)과 객체를 구현(표현)하는 방법을 분리함으로써, 동일한 생성 절차에서 서로 다른 표현 결과를 만들 수 있습니다.

#### Prototype Pattern

- 처음부터 일반적인 원형을 만들어 놓고, 그것을 복사한 후 필요한 부분만 수정하여 사용합니다.
    - 기존 객체를 복제함으로써 객체를 생성합니다.
- 생성할 객체의 원형을 제공하는 instance에서 생성할 객체들의 type이 결정되도록 설정합니다.
- 객체를 생성할 때 갖추어야 할 기본 형태가 있을 때 사용합니다.

#### Factory Method Pattern

- 상위 class에서 객체를 생성하는 interface를 정의하고, 하위 class에서 instance를 생성하도록 합니다
    - 상위 class에서 instance를 만드는 방법만 결정합니다.
    - 하위 class에서 그 data의 생성을 책임지고 조작하는 함수들을 overloading합니다.
- interface와 실제 객체를 생성하는 class를 분리할 수 있게 합니다.

#### Abstract Factory Pattern

- 구체적인 class에 의존하지 않고 서로 연관되거나 의존적인 객체들의 조합을 만드는 interface를 제공합니다.
- 이 pattern을 통해 생성된 class는 사용자에게 interface(API)를 제공합니다.
    - 구체적인 구현은 concrete product class에서 이루어집니다.

#### Singleton Pattern

- 전역 변수를 사용하지 않고 객체를 하나만 생성하도록 하며, 생성된 객체를 어디에서든지 참조할 수 있도록 합니다.
- 한 class에 한 객체만 존재하도록 제한합니다.


### 구조 Pattern

#### Bridge Pattern

- 추상화된 부분과 실제 구현 부분을 독립적으로 확장할 수 있습니다.
    - 기능의 class 계층과 구현의 class 계층을 연결하고, 구현부에서 추상 계층을 분리합니다.
- 구현뿐만 아니라, 추상화된 부분까지 변경해야 하는 경우 활용합니다.

#### Decorator Pattern

- 기존에 구현되어 있는 class에 필요한 기능을 추가해나갑니다.
- 기능 확장이 필요할 때, 객체 간의 결합을 통해 기능을 동적으로 유연하게 확장할 수 있게 해줍니다.
- 상속의 대안으로 사용합니다.
- 객체의 결합을 통해 기능을 동적으로 유연하게 확장합니다.

#### Facade Pattern

- 복잡한 system에 대하여 단순한 interface를 제공합니다.
- 사용자의 system 간 또는 여타 system과의 결합도를 낮춥니다.
    - system 구조에 대한 파악을 쉽게 할 수 있게 해줍니다.
- 통합된 interface를 제공합니다.
- 오류에 대해서 단위별로 확인할 수 있습니다.
- 단순한 interface를 제공하여 사용자의 접근성을 높일 수 있습니다.

#### Flyweight Pattern

- 다수의 객체를 생성하는 경우, 모두가 갖는 본질적인 요소를 class화하여 공유합니다.
    - memory를 절약할 수 있습니다.
    - class의 경량화를 목적으로 합니다.
- 여러 개의 가상 instance를 제공하여 memory를 절감합니다.

#### Proxy Pattern

- 특정 객체로의 접근을 제어하기 위한 용도로 사용합니다.
    - 실체 객체에 대한 대리 객체이며, 실체 객체에 대한 접근 이전에 필요한 행동을 취할 수 있게 합니다.
    - 이 점을 이용해서 미리 할당하지 않아도 상관없는 것들을 실제 이용할 떄 할당하게 하여 memory 용량을 아낄 수 있습니다.
- 실체 객체를 드러나지 않게 하기 때문에, 정보 은닉의 역할도 수행합니다.

#### Composite Pattern

- 객체들의 관계를 tree 구조로 구성하여 부분-전체 계층을 표현합니다.
- 복합 객체와 단일 객체를 동일하게 취급합니다.

#### Adapter Pattern

- 기존에 생성된 class를 재사용할 수 있도록 중간에서 맞춰주는 역할의 interface를 만듭니다.
- 상속을 이용하는 class pattern과 위임을 이용하는 instance pattern의 두 가지 형태로 사용됩니다.
- interface가 호환되지 않는 class들을 함께 이용할 수 있도록 타 class의 interface를 기존 interface에 덧씌웁니다.


### 행위 Pattern

#### Mediator Pattern

- 중간에 객체들의 통신을 통제하고 지시할 수 있는 역할의 중재자를 두고, 중재자에게 모든 것을 요구하여 통신의 빈도수를 줄입니다.
    - 객체의 수가 너무 많아지면 서로 간 통신이 복잡해지기 때문입니다.
        - 복잡한 통신은 객체 지향에서 중요한 느슨한 결합의 특성을 해칩니다.

#### Interpreter Pattern

- 언어의 다양한 해석(구문을 나누고 그 분리된 구문의 해석)을 맡는 class를 각각 작성하여, 여러 형태의 언어 구문을 해석할 수 있게 합니다.
- 문법 자체를 encapsulation하여 사용합니다.

#### Iterator Pattern

- collection 구현 방법을 노출시키지 않으면서도 그 집합체 안에 들어있는 모든 항목에 접근할 방법을 제공합니다.
- 내부 구조를 노출하지 않고 복잡 객체의 원소에 순차적으로 접근할 수 있습니다.

#### Template Method Pattern

- 어떤 작업을 처리하는 일부분을 sub class로 encapsulation해서, 전체 일을 수행하는 구조는 바꾸지 않고 특정 단계에서 수행하는 내역을 바꿉니다.
    - 상위 class(abstract class)는 추상 method로 기능의 골격을 제공합니다.
    - 하위 class(concrete class)의 method에서 세부 처리를 구체화합니다.

#### Observer Pattern

- 한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체들에 연락이 가고 그 내용이 자동으로 갱신됩니다.
    - 일대다의 의존 관계를 가지며, 상호작용하는 객체들은 느슨하게 결합됩니다.

#### State Pattern

- 객체의 상태에 따라 행위 내용을 변경합니다.
    - 객체 상태에 따라 다르게 처리할 수 있습니다.
    - 객체 상태를 encapsulation한 class를 참조합니다.
    - 행위 변경 시 원시 code의 수정을 최소화할 수 있기 때문에 유지보수가 편해집니다.

#### Visitor Pattern

- 각 class의 자료구조로부터 처리 기능을 분리하여 별도의 class를 만들어 놓고, 해당 class의 method가 각 class를 돌아다니며 특정 작업을 수행합니다.
- 객체의 구조는 변경하지 않으면서 기능만 따로 추가하거나 확장할 때 사용합니다.

#### Command Pattern

- 실행될 기능을 encapsulation하여, 주어진 여러 기능을 실행할 수 있는 재사용성이 높은 class를 설계합니다.
    - 요구사항을 객체로 encapsulation합니다.
- 하나의 abstract class에 method를 만들어 각 명령이 들어오면 그에 맞는 sub class가 선택되어 실행됩니다.

#### Strategy Pattern

- algorithm group을 정의하고(abstract class), algorithm들을 각각 하나의 class로 encapsulation한 다음, 필요할 때 서로 교환해서 사용합니다.
- 행위 객체를 class로 encapsulation해 동적으로 행위를 자유롭게 변환합니다.

#### Memento Pattern

- class 설계 관점에서 객체의 정보를 저장할 필요가 있을 때 적용합니다.
    - 객체를 이전 상태로 복구할 수 있습니다.
- 작업취소(undo) 기능을 개발할 때 사용합니다.

#### Chain Of Responsibility Pattern

- 기능에 대한 처리 연결을 경우에 따라서 동적으로 정합니다.
    - 정적으로 어떤 기능에 대한 처리의 연결이 hard coding 되어 있을 때는 기능 처리의 연결 변경이 불가능합니다.
- 한 요청을 2개 이상의 객체에서 처리합니다.




---




## Reference

- Head First Design Patterns (도서) - Eric Freeman, Elisabeth Robson, Bert Bates, Kathy Sierra
- <https://jw92.tistory.com/11>
- <https://velog.io/@poiuyy0420/디자인-패턴-개념과-종류>
- <https://skidrow6122.tistory.com/entry/디자인-패턴-개요>
