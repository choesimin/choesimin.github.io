---
layout: skill
permalink: /171
title: Singleton Pattern - 하나의 객체만 만들어 공용으로 사용하기
description: Singleton은 class에 instance가 하나만 있도록 하면서 이 instance에 대한 전역 접근 지점(access point)을 제공하는 생성 design pattern입니다.
date: 2023-11-01
---


## Singleton Pattern

- Singleton Pattern은 해당 class의 instance가 하나만 만들어지고, 어디서든지 그 instance에 접근할 수 있도록 하기 위한 pattern입니다.

- 하나만 있어도 되는 객체를 만들 때 사용할 수 있습니다.
    - 예를 들어, Connection pool, Thread pool, Cache, 대화 상자, 사용자 설정 & Registry 설정 객체, Log 기록용 객체, Device driver(Printer, Graphic card), ...


### Singleton 주요 특징 : Instance를 추가로 만들 수 없음

- 객체의 생성자를 private으로 지정하여, 다른 어떤 class에서도 instance를 추가로 만들지 못하도록 합니다.
- client는 instance를 직접 만들지 않고, instance를 달라고 요청(`getInstance()`)합니다.
    - 생성자가 private하기 때문에, instance가 필요하면 반드시 singleton class를 거치게 됩니다.


### 'Singleton class'와 '모든 함수와 변수가 static으로 선언된 class'의 비교

- Singleton class는 결과적으로 '모든 method와 변수가 static으로 선언된 class'와 같으나, Singleton class가 더 낫습니다.
- '모든 method와 변수가 static으로 선언된 class'는 필요한 내용이 class에 다 들어있고, 복잡한 초기화가 필요 없는 경우에만 사용할 수 있습니다.
    - Java에서 정적 초기화를 할 때, 초기화 순서와 관련된 bug가 생길 수 있습니다.
    - 초기화 순서와 관련된 bug는 찾아내기 어렵고 복잡미묘하기 때문에, 차라리 singleton을 만드는 것이 낫습니다.

#### (Singleton 객체와 비교했을 때) 전역 변수의 단점

- 게으른(lazy) instance 생성을 할 수 없습니다.
    - 전역 변수는 application이 시작될 때 객체가 생성되며, 처음부터 끝까지 instance를 가지고 있어야 합니다.
    - 만약 이 객체가 자원을 많이 차지하고, application이 끝날 때까지 이 객체를 한 번도 사용하지 않는다면, 자원만 잡아먹는 객체가 됩니다.
    - 그러나 예외적으로, 어떤 platform에서는 객체를 나중에 만들기도 합니다.

- Java의 전역 변수는 객체에 대한 정적 reference입니다.
    - 간단한 객체에 대한 전역 reference를 자꾸 만들게 되어 namespace를 지저분하게 만듭니다.
    - singleton도 남용될 수 있지만, namespace를 지저분해지게 만드는 정도까진 아닙니다.


### Singleton class의 sub class를 만드는 것은 권장하지 않음

- singleton을 sub class로 확장할 이유가 없습니다.
- application을 만들 때, singleton을 꽤 많이 사용하고 있다면 전반적인 설계(design)을 다시 생각해 보는 것이 좋습니다.
    - singleton은 제한된 용도로 특수한 상황에서 사용하기 위해 만들어진 것이기 때문입니다.

- singleton은 생성자가 private으로 선언되어 있어, 확장할 수 없습니다.
    - sub class를 만들기 위해서는 생성자를 public 또는 protected로 선언해야 합니다.
        - 하지만 이렇게 하면 다른 곳에서 instance를 만들 수 있기 때문에 더 이상 singleton이 아니게 됩니다.

- singleton은 정적 변수를 바탕으로 구현하기 때문에 모든 sub class들이 똑같은 instance 변수를 공유하게 됩니다.
    - sub class를 만들려면 base class에서 registry 역할을 하는 것을 구현해 놓아야 합니다.


