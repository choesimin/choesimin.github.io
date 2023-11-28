---
layout: note
title: Clean Architecture - Architecture 경계
date: 2023-11-28
---





시스템이 3가지 컴포넌트(UI, 업무 규칙, DB)로만 구성된다고 생각하기 쉬움
몇몇 단순한 시스템에서는 이 정도로 충분하지만, 대다수의 시스템에서 컴포넌트는 이보다 많음

 
[ 결론 ]

아키텍처 경계는 어디에나 존재하며, 아키텍처 경계가 언제 필요한지를 신중하게 파악해내야 함

이러한 경계를 제대로 구현하려면 비용이 많이 든다는 사실도 인지하고 있어야 함
동시에 이러한 경계가 무시되었다면 나중에 다시 추가하는 비용이 크다는 사실도 알아야 함


매우 똑똑한 일부 사람들이 수년 동안 말해왔듯이, 추상화가 필요하리라고 미리 예측해서는 안됨(YAGNI)

YAGNI(You Aren’t Going to Need It)에는 지혜가 담겨 있는데, 오버 엔지니어링이 언더 엔지니어링보다 나쁠때가 훨씬 많음
반대로 어떤 아키텍처 경계도 존재하지 않는 상황에서 경계가 정말로 필요하다는 사실을 발견할 수 있음
하지만 그때서야 경계를 추가하려면 비용이 많이 들고 큰 위험을 감수해야 함


그러므로 소프트웨어 아키텍트는 미래를 내다보고 현명하게 추측해야 함

비용을 산정하고, 어디에 경계를 둘지, 그리고 완벽하게 구현할 경계와 부분적으로 구현할 경계, 무시할 경계를 결정해야 함
이는 일회성 결정이 아니며, 프로젝트 초반에는 구현할 경계와 무시할 경계인지를 쉽게 결정할 수 없으므로 지켜봐야 함
그리고 시스템이 발전함에 따라 주의를 기울여야 함
경계가 필요할 수도 있는 부분에 주목하고, 경계가 존재하지 않아 생기는 마찰의 어렴풋한 첫 조짐을 신중하게 관찰해야 함
첫 조짐이 보이는 시점에 해당 경계를 구현하는 비용과 무시할 때 감수할 비용을 가늠해보고, 결정 사항을 자주 검토해야 함
목표는 경계의 구현 비용이 무시해서 생기는 비용보다 적어지는 그 변곡점에서 경계를 구현하는 것
목표를 달성하려면 빈틈없이 지켜봐야 한다.



## Architecture 경계 : 선 긋기

- 경계(boundary)는 **software 요소를 서로 분리**하고, 경계 한편에 있는 요소가 **반대편에 있는 요소를 알지 못하도록** 막습니다.
    - 경계는 변경이 전파되는 것을 막는 방화벽을 구축하고 관리하는 수단입니다.

- 경계 중 일부는 project 초기에, 심지어 code가 작성되기도 전에 정의되며, 어떤 경계는 매우 나중에 정의되기도 합니다.
    - 초기에 정의되는 경계는 가능한 오랫동안 결정을 연기시켜, 이들 결정이 핵심적인 업무 규칙(business logic)을 오염시키지 못하게 하려는 목적입니다.

- 너무 일찍 내려진 결정에 대한 결합(coupling)은 인적 자원의 효율을 떨어뜨립니다.
    - 좋은 architecture는 system의 업무 요구 사항(UseCase)과 관련 없는 결정은 가능한 한 최후에 내릴 수 있게 해줍니다.
    - 업무 요구 사항(Usecase)과 관련 없는 것들로는 framework, database, web server, utility library, 의존성 주입 등이 있습니다.

- 경계는 **관련이 있는 것과 없는 것 사이**에 정의합니다.
    - e.g., GUI와 업무 규칙 사이에 긋고, database와 업무 규칙 사이에 긋습니다.

- 경계 선을 정의하려면 먼저 system을 component 단위로 분할해야 합니다.
    - plugin으로 분할된 component(저수준의 세부 사항)의 의존성의 방향은 핵심 업무 규칙 component(고수준의 추상화)를 향하도록 합니다.


### Plugin Architecture

- software 개발 기술의 역사는 **plugin을 손쉽게 생성**하여, **확장 가능하며 유지보수가 쉬운 system architecture를 확립**할 수 있게 만드는 방법에 대한 이야기입니다.
    - 그래서 plugin architecture가 탄생하였습니다.

- 경계 맞은 편의 component는 다른 시점에 다른 이유로 변경되므로 SRP(단일 책임 원칙)을 적용해야 합니다.
    - 경계의 한 쪽에 위치한 component는 경계 반대편의 component와는 다른 속도로 변경되므로, 둘 사이에는 반드시 경계가 필요합니다.
    - system을 plugin architecture로 배치함으로써 변경이 전파되지 않도록 방화벽을 생성할 수 있습니다.

```mermaid
classDiagram
Business Rules <-- GUI : ---- Boundary ----
Business Rules <-- DB : ---- Boundary ----
```

#### 업무 규칙과 Database 사이의 경계

- 업무 규칙은 database와 관련된 나머지 세부 사항에 대해 어떤 것도 알아서는 안 됩니다.

```mermaid
classDiagram
Business Rules --> Database Interface
<<Interface>> Database Interface
Database Interface <-- Database Access : ---- Boundary ----
Database Access --> Database
```

#### 업무 규칙과 GUI 사이의 경계

- system의 행위를 입출력이 지닌 행위와 똑같이 생각해서는 안 됩니다.
    - system의 행위에서 입력과 출력은 중요하지 않습니다.
- `GUI`는 다른 종류의 interface로 얼마든지 교체할 수 있으며, `Business Rules`은 이에 대해 영향을 받지 않아야 합니다.

```mermaid
classDiagram
Business Rules <-- GUI : ---- Boundary ----
```




---




# Reference

- Clean Architecture (도서) - Robert C. Martin
- <https://mangkyu.tistory.com/276>
- <https://hwannny.tistory.com/37>
