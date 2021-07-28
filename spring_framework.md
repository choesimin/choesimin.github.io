# Spring Framework

- java platform을 위한 oepnsource application framework
- 동적인 website를 개발하기 위한 여러가지 service를 제공
- 전자정부 표준 framework의 기반 기술로 쓰임
- enterprise급
  - 대규모 data 처리
  - 동시다발적인 transaction

### Spring Framework의 특징 : IoC 기반

- Inversion of Control : 제어의 역전
  - 기존에 사용자가 모든 작업을 제어하던 것을 특별한 객체에 위임
  - 객체는 자신의 모든 권한을 다른 대상에 위임함으로써 제어권한을 위임받은 특별한 객체에 의해 결정되고 만들어짐
    - 객체의 생성부터 생명주기 등 모든 객체에 대한 제어권이 특별한 객체로 넘어감
- 원래 방식
  - 객체 결정 및 생성 -> 의존성 객체 생성 -> 객채 내의 메소드 호출 하는 작업을 반복
  - 이는 각 객체들이 프로그램의 흐름을 결정하고 각 객체를 구성하는 작업에 직접 참여한 것 (모든 작업을 사용자가 제어)
- IoC의 구성 : DI + DL
  - IoC는 DI와 DL에 의해 구현됨
  - DL (Dependency Lookup : 의존성 검색)
    - container에서는 객체들을 관리하기 위해 별도의 저장소에 bean을 저장
    - container에서 제공하는 API를 이용하여 사용하고자 하는 bean을 검색하는 방법
  - DI (Dependency Injection : 의존성 주입)
    - 의존성이 있는 객체를 주입한다는 의미로 이해하면 편함
    - 의존성 : 하나의 객체가 어떠한 다른 객체를 사용하고 있는 것
    - IoC에서의 의존성 : 각 클래스 사이에 필요로 하는 의존 관계를 bean 설정 정보를 바탕으로 container가 자동으로 연결해주는 것

### Spring Framework의 특징 : POJO

- Plain Old Java Object : 평범한 java 객체
  - POJO는 getter/setter를 가진 단순한 객체로 정의됨
  - 의존성이 없고 추후 테스트 및 유지보수가 편리한 유연성의 장점을 가짐
  - 따라서, 객체지향적인 다양한 설계와 구현이 가능해짐
- History
  - 이전에 EJB(Enterprise JavaBeans)가 확장과 재사용이 가능한 logic을 개발하기 위해 사용되었음
  - 그러나, EJB는 한가지 logic을 위해 불필요한 복잡한 logic이 과도하게 들어감
  - 그래서 POJO는 다시금 조명을 받게 됨 -> Spring이 함께 부상함

### Spring Framework의 특징 : AOP

- Aspect Oriented Programming : 관점 지향 programming
  - AOP에서는 핵심 기능과 공통 기능을 분리시켜 핵심 로직에 영향을 끼치지 않게 공통 기능을 끼워넣는 개발 형태
  - 무분별하게 중복되는 code(공통 기능)를 한 곳에 모아둠
    - 중복 code 제거 가능
    - 공통 기능 하나의 수정으로 모든 핵심 기능들의 공통 기능을 수정할 수 있음
  - 효율적인 유지보수가 가능 + 재활용성 극대화
- History
  - OOP(Object Oriented Programming) 방식은 대부분의 software 개발 process에서 사용됨
  - 객체지향 원칙에 따라 관심사가 같은 data를 한 곳에 모아 분리하고 낮은 결합도를 갖게하여 독립적이고 유연한 모듈로 캡슐화하는 것을 일컬음
  - 이 과정에서 중복 code가 많아지고, 이는 가독성, 확장성, 유지보수성을 떨어뜨림
  - 이 문제를 보완하기 위해 나온 것이 AOP

### Spring Framework의 특징 : MVC (Model2)

- Model + View + Controller 구조로 사용자 interface와 businuess logic을 분리하여 개발하는 것
  - MVC는 Model1과 Model2로 나누어져 있으며, 일반적인 MVC는 Model2를 지칭함
  - Model
    - data 처리 담당
    - Service와 DAO로 나누어짐
    - Service
    - 불필요하게 HTTP 통신을 하지 말아야하고, request나 response와 같은 객체를 매개변수로 받아서는 안 됨
    - view에 종속적인 code가 없어야 하고 view가 변경되더라도 Service는 그대로 재사용할 수 있어야 함
    - Model에서는 View와 Controller에 대한 어떠한 정보도 가지고 있어서는 안됨
  - View
    - 사용자 interface를 담당하며 사용자에게 보여지는 부분
    - Controller를 통해 Model에 data에 대한 시각화를 담당
    - 자신이 요청을 보낼 Controller의 정보만 알고 있어야 하는 것이 핵심
    - Model이 가지고 있는 정보를 저장해서는 안 되며 Model, Controller의 구성 요소를 알아서는 안 됨
  - Controller
    - View에게 받은 요청을 가공하여 Model(Service 영역)에 이를 전달
    - 또한 Model로부터 받은 결과를 View로 넘겨주는 역할
    - 모든 요청 error와 Model error를 처리
    - View에 대한 정보를 알고 있어야 함
    - Model과 View의 정보에 대해서 알고 있어야함
  - Model, View, Controller를 나누어 source를 분리함으로써 각 source의 목적이 명확해져 유지보수하기에 용이
  - View의 정보가 달라지더라도 Controller에서 Service에 넘겨줄 매개변수 data 가공만 처리하면 되기 때문에 비용 절감의 효과 있음
  - Service 영역의 재사용이 가능하기 때문에 확장성이 좋아짐

# Spring Framework의 구조

- Spring Core
  - Spring Container를 의미
  - Container는 Spring Framework의 핵심
  - 그 중의 핵심은 Bean Factory Container
    - Bean Factory는 IoC pattern을 적용하여 객체 구성부터 의존성 처리까지 모든 일을 처리하는 역할을 가짐
- Spring Context
  - Spring Framework의 context 정보들을 제공하는 설정 file
  - JNDI, EJB, Validation, Scheduling, Internaliztion 등 enterprice service들을 포함
- Spring AOP
  - 관점지향 programming을 가능하게 함
- Spring DAO
  - Data Access Object
  - database data에 접근하는 객체
  - Spring JDBC는 추상 layer를 지원함으로써 예외 처리하는 부분을 간편화기켜 일관된 방법으로 코드를 짤 수 있게 도와줌
- Spring ORM
  - Object Realtional mapping
  - 객체와의 관계 설정을 하는 것
  - Ibatis, Hibernate, JDO 등 인기있는 객체 관계형 도구(OR 도구)를 사용할 수 있도록 지원
- Spring Web
  - Web context module은 Application module에 내장되어 있고, Web 기반의 응용 program에 대한 Context를 제공하여 일반적인 Web Application 개발에 필요한 기본적인 기능을 지원
  - Jakarta Structs와의 통합을 지원
- Spring MVC
  - MVC에서는 Model2 구조로 Application을 만들수 있도혹 지원
  - MVC framework는 web 응용 program을 작성하기 위한 완전한 기능을 MVC를 구현
    - 전략 interface를 통해 고급 구성이 가능
    - JSP, Velocity, Tiles, iTest 및 POI를 포함한 수 많은 view 기술을 지원

# Domain vs DTO vs VO vs Entity

- domain : Domain Objects (DO) (and the classes from which they are derived) implement business logic, as such they are only located in the Business logic layer / Domain (the essential meaning is the same even if the terms are different)
- DTO : A Data Transfer Object (DTO) is an object intended to carry data

---

# Reference

- https://khj93.tistory.com/entry/Spring-Spring-Framework%EB%9E%80-%EA%B8%B0%EB%B3%B8-%EA%B0%9C%EB%85%90-%ED%95%B5%EC%8B%AC-%EC%A0%95%EB%A6%AC
	- 기본 개념
- https://jonny-cho.github.io/spring/2019/01/21/springbootmysql/
	- spring + mysql + mybatis (@Mapper 방식)
- https://m.blog.naver.com/sgs03091/222067037646
	- Doamin, VO, DTO, Entity 비교


