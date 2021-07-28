# Layered Architecture

- business logic을 완전히 분리하여 database system과 client의 사이에 배치한 client server system의 일종

### 3-Tier Architecture

- 3-Tier는 infra(server)의 구성 구조임
  - application의 조직은 이것보다 더욱 복잡해질 수 있지만, 3계층 관점은 대규모 program에서 일부분에 관해 생각하기에 편리한 방법
1. Presentation Layer
  - 응용 program의 최상위에 위치
  - 서로 다른 층에 있는 data 등과 communication함
  - GUI 및 front-end의 영역이며, 사용자 interface 제공
2. Application Layer
  - business logic 계층 또는 tracsaction 계층이라고도 함
  - business logic은 workstation으로부터의 client 요청에 대해 마치 server처럼 행동
  - 차례로 어떤 data가 필요한지 결정하고, mainframe computer 상에 위치하고 있을 세 번째 program에 대해서는 마치 client처럼 행동
  - == Middleware
  - back-end의 영역
3. Data Layer
  - database와 그것에 access해서 읽거나 쓰는 것을 관리하는 program을 포함
  - back-end 영역이지만 주로 DB server를 의미

### Spring MVC (Model-View-Controller)

- MVC는 front controller pattern과 함께 사용됨
  - front controller : server로 들어오는 client의 요청을 가장 앞선에서 받아 처리하는 것
- Spring은 DispatcherServlet이라는 front controller를 제공하며, 해당 servlet이 MVC Architecture를 관리
1. front controller가 요청을 받으면, HandlerMapping을 통해 요청을 처리할 수 있는 controller를 찾아 mapping
2. HandlerAdapter를 통해 요청 처리를 위임하여 해당 controller가 요청을 처리
3. controller가 business logic을 수행한 뒤 처리 결과 Model과 이를 출력할 View를 Dispatcher DispatcherServlet에 반환
4. 해당 정보를 바탕으로 DispatcherServlet은 ViewResolder를 통해 적합한 View 객체를 얻음
5. View 객체가 사용자에게 보여줄 응답 화면을 출력

### Layered Architecture의 장점

- system을 layer로 나누면 system 전체를 수정하지 않고도 특정 layer를 수정 및 개선할 수 있어 재사용성을 높일 수 있고 유지보수가 용이함
- 단방향 의존성
  - 각각의 layer는 하위의 인접한 layer에게만 의존
- 관심사의 분리
  - 각 layer는 주어진 고유한 역할만을 수행
  - 표현 계층에는 business logic이 없으며, business 계층에는 DB 관련 logic이 존재하지 않음
- code의 확장성과 재사용성 및 유지 보수 가능성을 높임
  - 각 layer가 서로 독립적이고 역할이 분명하기 때문에, 서로에게 끼치는 영향을 최소화하며 확장 및 수정이 가능
  - layer가 독립적이면, 하나의 Service Layer는 여러개의 Presentaion Layer가 재사용할 수 있음
- 역할이 명확하게 분리되어 있어 code의 가독성이 높음
- 범위가 명확하고 확실하여 기능을 test하기 쉬움

---

### Presentation Layer

- == Web Layer == UI Layer
- 화면 조작 또는 사용자의 입력을 처리하기 위한 관심사를 모아놓은 layer
  - 최종 사용자에게 UI를 제공하거나 client로 응답을 다시 보내는 역할을 담당하는 모든 class임
  - 즉, API의 end point들을 정의하고 전송된 HTTP 요청들을 읽어들이는 logic을 구현

# Application Layer

- Application Layer == Service Layer
- 일반적으로 Domain model의 business logic 1개를 호출해서는 복잡한 요청을 처리할 수 없음
  - 다양한 Domain과 business logic을 사용하여 응답을 처리하는 layer가 필요
  - 여러 business logic을 의미있는 수준으로 묶어 제공하는 역할을 함
- 단, 핵심 business logic을 직접 구현하지 않고 얇게 유지
  - 객체 지향 program은 고유한 책임을 수행하는 협력을 통해 작동
    - 따라서 핵심이 되는 business logic은 Service Layer가 아닌 Domain model들이 가져야 함
    - 각각의 Domain model은 할당된 책임을 수행하며 협력해야 함
  - 여러 Domain들을 생성, 조합, 협력시키는 application(응용) logic을 순수한 Domain 객체에 넣지 않음
    - 그러면 과한 의존성이 생겨 test하기 어렵고, 결합도가 높아지며 응집도가 떨어짐
  - 대신 Service Layer가 Domain model 및 Presentation Layer 사이에서 Domain 기능들을 응용하는 logic을 관장함
    - Service Layer는 transaction 및 Domain model의 기능(business logic) 간의 순서 만을 보장해햐 함
    - 핵심 business logic은 Domain model의 책임임
- Domain model을 캡슐화하는 역할
  - 핵심 business logic을 가진 Domain model을 View, Controller 등 표현 계층에 노출시키는 것은 보안 등 여러 단점이 존재함
  - Service Layer가 표현 계층에게 직접적인 Domain model을 반환하지 않고, DTO 등을 반환하면 표현 계층과 Domain model과의 강결합 의존성을 끊을 수 있음
    - 즉, Service Layer는 Domain model을 캡슐화하여 보호하는 역할도 겸함
    - 단일 책임 원칙을 지킬 수 있으며 유지 보수가 수월해짐

# Business Layer

- == Domain Model
- Data와 그와 관련된 business logic(핵심 기능)을 가진 객체
- 무조건 DB와 관계가 있는 Entity만을 의미하는 것은 아니며, VO처럼 값 객체들도 이 영역임
- Domain 객체 model과 DB schema 사이의 불일치가 발생할 수 있음
  - Mapper를 중간에 둬서 Domain 쪽에 있는 객체와 DB 간의 결합도를 끊어줘야 함
    - 즉, Domain 객체느 DB에 대해 독립적이어야 함
  - Data Mapper는 흔히 ORM(Object Relational Model)이라고 함
  - 후술할 Repository는 Entity 객체를 보관하고 관리하는 collection으로, 엄밀하게 말하면 Domain Layer에 속함

# Persistence Layer

- == Repository Layer
- Data Source를 추상화함
- DB에서 data를 저장, 수정, 불러들이는 등 DB와 관련된 logic을 구현
	- DAO는 data에 접근하도록 DB 접근 관련 logic을 모아둔 객체

---

# Reference

https://xlffm3.github.io/spring%20&%20spring%20boot/LayeredArchitecture/
