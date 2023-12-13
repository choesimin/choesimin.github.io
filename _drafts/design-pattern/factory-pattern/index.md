---
layout: note
title: Factory Pattern - 객체 생성을 캡슐화하기
version: 2023-05-18
---




## Factory Pattern - 객체 생성을 캡슐화하기

- Factory Pattern은 객체를 생성하는 부분을 캡슐화합니다.
    - 객체 생성을 처리하는 class를 **factory**라고 부릅니다.

- 객체 생성하는 작업을 한 class에 캡슐화시켜 놓으면, 구현을 변경해야 하는 경우에 factory class 하나만 고치면 됩니다.
    - code에서 중복되는 내용을 제거할 수 있습니다.

- Factory Pattern에는 Factory Method Pattern과 Abstract Factory Pattern이 있습니다.




---




## Factory Method Pattern & Abstract Factory Pattern

- 두 pattern 모두 application을 특정 구현으로부터 분리시키는 역할을 합니다.
    - 객체 생성을 캡슐화해서 application의 결합을 느슨하게 만들고, 특정 구현에 덜 의존하도록 합니다.

- 두 pattern은 객체를 만드는 방법에 차이가 있습니다.


| Factory Method Pattern | Abstract Factory Pattern |
| - | - |
| 상속(inheritance)을 통해서 객체를 만듭니다. | 구성(composition)을 통해서 객체를 만듭니다. |
|  |  |
|  |  |
| 'client code'와 'instance를 만들어야 할 concrete class'를 분리시켜야 할 때 활용합니다. 어떤 concrete class를 필요로 하게 될지 미리 알 수 없는 경우에도 유용합니다. sub class를 만들고 factory method를 구현하기만 하면 됩니다. | client에서 제품군(서로 연관된 일련의 제품들)을 만들어야 할 때 활용합니다. |


### Factory Method Pattern : Inheritance

- 상속을 통해서 객체를 만듭니다.
- sub class를 통해서 객체를 만듭니다.
- client와 concrete 형식을 분리시켜주는 역할
    - client에서는 자신이 사용할 추상 형식만 알면 되고, concrete 형식은 sub class에서 처리해 줌
- 'client code'와 'instance를 만들어야할 concrete class'를 분리시켜야 할 때 활용하기
    - 어떤 concrete class를 필요로 하게 될지 미리 알 수 없는 경우에도 유용함
        - sub class를 만들고 factory method를 구현하기만 하면 됨


### Abstract Factory Pattern : Composition

- 구성(composition)을 통해서 객체를 만듭니다.
- 제품군을 만들기 위한 추상 형식을 제공합니다.
    - 제품이 생산되는 방법은 이 추상 형식의 sub class에서 정의합니다.
- factory method pattern을 쓸 때와 마찬가지로 client와 client에서 사용하는 실제 concrete 제품이 분리됨
- 일련의 연관된 제품을 하나로 묶을 수 있음
- 제품군에 제품을 추가하거나 하는 식으로 관련된 제품들을 확대해야 하는 경우에는 interface를 수정해야만 함
    - interface를 바꾸게 되면 모든 sub class의 interface를 바꿔야 하므로 좋지 않음
- concrete factory를 구현할 때 factory method를 사용하기도 함
    - factory method pattern과는 다르게 제품을 생산하기 위한 용도로 쓰임
- client에서 제품군(서로 연관된 일련의 제품들)을 만들어야 할 때 활용하기




---




## Reference

- Head First Design Patterns - Eric Freeman, Elisabeth Robson, Bert Bates, Kathy Sierra
