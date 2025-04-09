---
layout: note
permalink: /167
title: DIP - 의존 관계 역전 원칙
description: 고수준 module은 저수준 module의 구현에 의존해서는 안됩니다.
date: 2023-11-05
---


## DIP (Dependency Inversion Principle) : 의존 관계 역전 원칙

```txt
고수준 module은 저수준 module의 구현에 의존해서는 안되며, 저수준 module이 고수준 module에서 정의한 추상 type에 의존해야 합니다.
```

| 고수준 Module | 저수준 Module |
| --- | --- |
| 의미있는 기능을 제공하는 module입니다. | 고수준 module을 구현하기 위해 필요한 하위 기능의 실제 구현체입니다. |
| 정책에 가깝습니다. | 기술에 가깝습니다. |

```mermaid
classDiagram

class Client
class Interface
class Module1
class Module2
class Module3

Client --|> Interface
Interface <|.. Module1
Interface <|.. Module2
Interface <|.. Module3
```

- DIP는 객체가 다른 class를 참조해서 사용해야 할 때, 대상 class를 직접 참조하는 것이 아니라, **대상의 상위 요소(abstract class, interface)로 참조**하라는 원칙입니다.
    - client(사용자)가 상속 관계로 이루어진 module을 사용할 때, 하위 module instance을 직접 사용하지 말라는 뜻입니다.
        - 하위 module의 구체적인 내용에 client가 의존하게 되어, **하위 module에 변화가 있을 때마다 client나 상위 module을 수정해야 되기 때문**입니다.

- 의존 관계 역전 원칙은 추상화된 interface나 상위 class에 의존하여, **변하기 쉬운 것의 변화에 영향을 받지 않게** 하는 것입니다.
    - 하위 class일수록, 구체 class일수록, 변할 가능성이 높습니다.
    - 상위 class일수록, interface일수록, 추상 class일수록, 변하지 않을 가능성이 높습니다

- 결국 DIP는 추상화를 이용하라는 원칙이며, 이는 개방 폐쇄 원칙(OCP)과 통하는 부분입니다.

- DIP는 다형성을 이용한 DI(Dependency Injection, 의존성 주입)를 통해 구현할 수 있습니다.
    - 객체들이 서로 정보를 주고 받을 때는 의존 관계가 형성됩니다.
        - 변하지 않을 가능성이 높은 **추상성이 높은 class(상위 class, interface, 추상 class)와 통신**해야 합니다.
    - 의존 관계가 형성된다는 말(class 간에 의존한다는 말)은, 한 class가 어떤 기능을 수행할 때 다른 class의 service가 필요한 경우를 의미합니다.
        - 예를 들어, A class의 method에서 B class type의 parameter를 받아 B 객체의 method를 사용한다면, A class는 B class에 의존하고 있는 것입니다.


### DIP 원칙 실천법 : 안정된 추상화

#### 변동성이 큰 구체 class를 참조하지 않기

- 구체 class 대신 추상 interface를 참조합니다.
- 언어가 정적 type이든 동적 type이든 관계없이 모두 적용할 수 있습니다.
- 이 규칙은 객체 생성 방식을 강하게 제약하며, 일반적으로 (Abstract Factory)를 사용하도록 강제합니다.

#### 변동성이 큰 구체 class로부터 파생하지 않기

- 상속은 신중하게 사용해야 합니다.
    - 정적 type 언어에서 상속은 source code에 존재하는 모든 관계 중 가장 강력하고 뻣뻣하기 때문에 변경하기 어려습니다.
- 동적 type 언어라면 문제가 덜 되지만, 의존성을 가짐에는 변함이 없으므로 신중해야 합니다.

#### 구체 함수를 override하지 않기

- 대체로 구체 함수는 source code 의존성을 필요로 합니다.
- 따라서 구체 함수를 override하면 의존성을 제거할 수 없게 되며, 실제로는 그 의존성을 상속하게 됩니다.
- 이러한 의존성을 제거하려면, 구체 함수가 아닌 추상 함수로 선언하고, 구현체들에서 각자의 용도에 맞게 구현해야 합니다.

#### 구체적이며 변동성이 크다면 그 이름을 언급하지 않기

- **이름을 언금하지 않는다**는 말은 **의존하지 않는다**는 말과 같습니다.
- 그래서 이 말은 DIP를 다른 방식으로 그대로 풀어쓴 것입니다.


### Abstract Factory로 DIP 지키기

- 변동성이 큰 구체적인 객체는 특별히 주의해서 생성해야 합니다.
- 객체를 생성하려면 해당 객체를 구체적으로 정의한 code에 대해 source 의존성이 발생하기 때문입니다.
- 그래서 대다수의 객체 지향 언어에서는 바람직하지 못한 의존성을 처리할 때 **Abstract Factory**를 사용하곤 합니다.

```mermaid
classDiagram
direction LR

class Application
class Service {
    <<interface>>
}
class ServiceFactory {
    <<interface>>
    makeSvc()
}
class ServiceFactoryImpl {
    makeSvc()
}
class ConcreteImpl

Application --> Service
Application --> ServiceFactory
Service <.. ServiceFactory
ServiceFactory <|-- ServiceFactoryImpl
ServiceFactoryImpl --> ConcreteImpl : 생성
ConcreteImpl --|> Service
```

- `Application`은 `Service` interface를 통해 `ConcreteImpl`을 사용합니다.
    - `Application`에서는 어떤 식으로든 `ConcreteImpl`의 instance를 생성해야 기능을 사용할 수 있습니다.
    - 그래서 `Application`은 `ConcreteImpl`에 대한 source code 의존성을 만들지 않으면서 instance를 생성하기 위해, `ServiceFactory` interface의 `mackSvc()` method를 호출합니다.
    - `mackSvc()` method는 `ServiceFactoryImpl`에서 구현되며, `ConcreteImpl` instance를 생성하여 `Service` type으로 반환합니다.

- 구체적인 것들과 추상적인 것들을 분리하는 **architecture 경계**를 그을 수 있습니다.
    - architecture 경계는 구체 component들(`ServiceFactoryImpl`, `ConcreteImpl`)로부터 추상 component들(`Service`, `ServiceFactory`)을 분리합니다.
    - 추상 component는 `Application`의 고수준 업무 규칙을 포함합니다.
    - 구체 component는 business logic을 위해 필요한 세부 사항을 포함합니다.

- source code 의존성과 제어 흐름의 방향이 다릅니다.
    - **source code 의존성의 방향은 구체에서 추상으로** 향합니다.
    - **제어 흐름의 방향은 추상에서 구체로** 향합니다.
    - source code 의존성은 제어 흐름과 반대 방향으로 역전되므로, 이 원칙을 **의존성 역전**이라고 부릅니다.

- 그러나 구체 component는 여전히 DIP를 위반하고 있습니다.
    - `ServiceFactoryImpl`에서 `ConcoreteImpl`에 의존하고 있기 때문에, 구체 component에는 구체적인 의존성이 남아 있습니다.
    - 하지만 이는 일반적이며 DIP 위반을 모두 없앨 수는 없습니다.
    - 이러한 **DIP를 위반하는 class들은 적은 수의 구체 component 내부로 모아 system의 나머지 부분과 분리**할 수 있습니다.
 

### Example : 아이와 장난감

```java
// interface
interface Toy {}

class Robot implements Toy {}
class Lego implements Toy {}
class Doll implements Toy {}

// client
class Kid {
	Toy toy;    // composition
    
    void setToY(Toy toy) {
    	this.toy = toy;
    }
    
    void play() {}
}

// main method
public class Main {
	public static void main(String[] args) {
        Kid boy = Kid();
        
        Toy toy = new Robot();
        boy.setToy(toy);
        boy.play();
        
        Toy toy = new Lego();
        boy.setToy(toy);
        boy.play();
    }
}
```


### Example : Java Collection

- 보통 `ArrayList`나 `HashSet` 자료형을 사용할 때, 변수 type을 `ArrayList`, `HashSet`와 같은 구체 class type으로 선언하는 것이 아닌, `List`나 `Set` 같은 interface type으로 선언하는데, 이것도 DIP 원칙을 따른 code입니다.

```java
// 변수 type을 고수준 module인 interface type으로 선언하여 저수준의 module을 할당합니다.
List<String> myList = new ArrayList()<>;
Set<String> mySet = new HashSet()<>;
Map<int, String> myMap = new HashMap()<>;
```


---


## DIP 적용해보기


### 적용 전

- RPG game에는 character와 character가 장착할 수 있는 다양한 무기(한손검, 양손검, 전투도끼, 망치)들이 있습니다.
- `Character` class는 이름, 체력, 장착 있는 무기를 입력받아 초기화합니다.
- 한손검에도 하나의 종류만 있는 것이 아니라 목검, 강철검 등등 다양한 종류의 검이 있습니다.
    - 따라서 `Character` class의 field 변수로써 `OneHandSword` class type의 변수를 저장해두고, `attack()` method를 수행하여 `OneHandSword` class의 method를 실행합니다.

- `Character` class의 instance 생성 시, `OneHandSword`에 의존성을 가지게 되어, 공격 동작을 담당하는 `attack()` method도 `OneHandSword`에 의존하게 됩니다.
- 여러 무기들을 장착하게 하려면, `Character` class의 class field 변수 type을 아예 교체해줘야 하는 상황입니다.

```mermaid
classDiagram

class OneHandSword
class TwoHandSword
class BatteAxe
class WarHammer
class Character

Character *-- OneHandSword
Character *-- TwoHandSword
Character *-- BatteAxe
Character *-- WarHammer
```

```java
class OneHandSword {
    final String NAME;
    final int DAMAGE;

    OneHandSword(String name, int damage) {
        NAME = name;
        DAMAGE = damage;
    }

    int attack() {
        return DAMAGE;
    }
}

class TwoHandSword {
    // ...
}

class BatteAxe {
    // ...
}

class WarHammer {
    // ...
}
```

```java
class Character {
    final String NAME;
    int health;
    OneHandSword weapon;    // 저수준 객체에 의존하고 있습니다.

    Character(String name, int health, OneHandSword weapon) {
        this.NAME = name;
        this.health = health;
        this.weapon = weapon;
    }

    int attack() {
        return weapon.attack();    // 의존 객체에서 method를 실행합니다.
    }

    void chageWeapon(OneHandSword weapon) {
        this.weapon = weapon;
    }

    void getInfo() {
        System.out.println("이름 : " + NAME);
        System.out.println("체력 : " + health);
        System.out.println("무기 : " + weapon);
    }
}
```


### 적용 후

- 이미 완전하게 구현된 하위 module에 의존해서는 안 됩니다.
    - 구체 module에 의존하는 것이 아닌, 추상적인 고수준 module에 의존하도록 수정해야 합니다.

- 모든 무기들을 포함할 수 있는 고수준 module인 `Weaponable` interface를 생성합니다.
    - 모든 공격 가능한 무기 객체는 이 interface를 구현(`implements`)합니다.

- `Character` class의 무기 field 변수를 고수준 모듈인 `Weaponable` interface type으로 변경합니다.
    - 모든 공격 가능한 무기는 `Weaponable`을 구현하는 것으로 가정하기 때문에, `Character`는 공격 가능한 모든 무기를 할당받을 수 있습니다.

- DIP 원칙을 따름으로써 무기의 변경에 따라 `Character` class의 code를 변경할 필요가 없으며, 다른 type의 무기 확장에도 무리가 없기 때문에, OCP 원칙 또한 준수하게 됩니다.

```mermaid
classDiagram

class Weaponable {
    <<interface>>
}
class OneHandSword
class TwoHandSword
class BatteAxe
class WarHammer
class Character

Character *-- Weaponable
Weaponable <|.. OneHandSword
Weaponable <|.. TwoHandSword
Weaponable <|.. BatteAxe
Weaponable <|.. WarHammer
```

```java
// 고수준 module
interface Weaponable {
    int attack();
}

class OneHandSword implements Weaponable {
    final String NAME;
    final int DAMAGE;

    OneHandSword(String name, int damage) {
        NAME = name;
        DAMAGE = damage;
    }

    public int attack() {
        return DAMAGE;
    }
}

class TwoHandSword implements Weaponable {
	// ...
}


class BatteAxe implements Weaponable {
	// ...
}

class WarHammer implements Weaponable {
	// ...
}
```

```java
class Character {
    final String NAME;
    int health;
    Weaponable weapon;    // 고수준의 module에 의존하게 합니다.

    Character(String name, int health, Weaponable weapon) {
        this.NAME = name;
        this.health = health;
        this.weapon = weapon;
    }

    int attack() {
        return weapon.attack();
    }

    void chageWeapon(Weaponable weapon) {
        this.weapon = weapon;
    }

    void getInfo() {
        System.out.println("이름 : " + NAME);
        System.out.println("체력 : " + health);
        System.out.println("무기 : " + weapon);
    }
}
```


---


## Reference

- <https://inpa.tistory.com/entry/OOP-%F0%9F%92%A0-%EC%95%84%EC%A3%BC-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8A%94-DIP-%EC%9D%98%EC%A1%B4-%EC%97%AD%EC%A0%84-%EC%9B%90%EC%B9%99?category=967430>
- <https://mangkyu.tistory.com/274>
