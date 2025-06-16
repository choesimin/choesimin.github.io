---
published: false
---

# Spring Framework

- java platform을 위한 opensource application framework
- 동적인 website를 개발하기 위한 여러 가지 service를 제공
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
    - 의존성이 없고 추후 테스트 및 유지 보수가 편리한 유연성의 장점을 가짐
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
    - 효율적인 유지 보수가 가능 + 재활용성 극대화
- History
    - OOP(Object Oriented Programming) 방식은 대부분의 software 개발 process에서 사용됨
    - 객체지향 원칙에 따라 관심사가 같은 data를 한 곳에 모아 분리하고 낮은 결합도를 갖게하여 독립적이고 유연한 모듈로 캡슐화(encapsulation)하는 것을 일컬음
    - 이 과정에서 중복 code가 많아지고, 이는 가독성, 확장성, 유지 보수성을 떨어뜨림
    - 이 문제를 보완하기 위해 나온 것이 AOP

### Spring Framework의 특징 : MVC (Model2)

- Model + View + Controller 구조로 사용자 interface와 business logic을 분리하여 개발하는 것
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
    - Model, View, Controller를 나누어 source를 분리함으로써 각 source의 목적이 명확해져 유지 보수하기에 용이
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
    - JNDI, EJB, Validation, Scheduling, Internalization 등 enterprise service들을 포함
- Spring AOP
    - 관점지향 programming을 가능하게 함
- Spring DAO
    - Data Access Object
    - database data에 접근하는 객체
    - Spring JDBC는 추상 layer를 지원함으로써 예외 처리하는 부분을 간편화시켜 일관된 방법으로 code를 짤 수 있게 도와줌
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

## Reference

- https://khj93.tistory.com/entry/Spring-Spring-Framework%EB%9E%80-%EA%B8%B0%EB%B3%B8-%EA%B0%9C%EB%85%90-%ED%95%B5%EC%8B%AC-%EC%A0%95%EB%A6%AC
    - 기본 개념
- https://jonny-cho.github.io/spring/2019/01/21/springbootmysql/
    - spring + mysql + mybatis (@Mapper 방식)
- https://m.blog.naver.com/sgs03091/222067037646
    - Domain, VO, DTO, Entity 비교


















# Spring Framework

- Spring Framework는 Java 기반 enterprise application 개발을 위한 포괄적인 programming 및 configuration model을 제공하는 open source framework입니다.
- **의존성 주입**과 **제어의 역전** 원리를 기반으로 느슨한 결합도를 가진 application을 구축합니다.
- 복잡한 enterprise application 개발에 필요한 infrastructure를 제공하여 개발자가 business logic에 집중할 수 있게 합니다.

## 핵심 특징

- **IoC Container** : object의 생성과 생명주기를 Spring이 관리하여 개발자가 직접 object를 생성하거나 의존성을 관리할 필요가 없습니다.
    - `ApplicationContext`가 bean을 관리하고 필요한 곳에 주입합니다.
    - singleton pattern을 기본으로 하여 memory 효율성을 높입니다.
- **Dependency Injection** : object 간의 의존 관계를 외부에서 주입하여 결합도를 낮춥니다.
    - constructor injection, setter injection, field injection 방식을 지원합니다.
    - interface 기반 programming을 통해 test 가능한 code를 작성합니다.
- **AOP 지원** : 관점 지향 programming을 통해 cross-cutting concern을 모듈화합니다.
    - logging, security, transaction 관리 등을 business logic과 분리합니다.
    - proxy 기반으로 runtime에 aspect를 적용합니다.
- **POJO 기반 개발** : Plain Old Java Object를 사용하여 특정 framework에 종속되지 않는 code를 작성합니다.
    - 기존 Java class를 그대로 사용하면서 Spring의 기능을 활용합니다.
    - test와 maintenance가 용이한 구조를 제공합니다.

## 주요 module

### Spring Core Container

- **Spring Core** : IoC Container의 핵심 기능을 제공합니다.
    - `BeanFactory`와 `ApplicationContext`를 통해 bean을 관리합니다.
    - configuration metadata를 기반으로 object를 생성하고 조립합니다.
- **Spring Beans** : bean의 정의와 생성을 담당합니다.
    - bean의 scope, lifecycle callback, dependency를 관리합니다.
    - annotation 기반과 XML 기반 configuration을 지원합니다.
- **Spring Context** : application context를 제공하여 enterprise 기능을 확장합니다.
    - internationalization, event propagation, resource loading을 지원합니다.
    - `@Component`, `@Service`, `@Repository` 등의 stereotype annotation을 처리합니다.

### Spring Web

- **Spring Web MVC** : model-view-controller pattern 기반의 web application framework입니다.
    - `DispatcherServlet`이 모든 request를 받아 적절한 controller에 위임합니다.
    - `@Controller`, `@RequestMapping` annotation을 통해 web endpoint를 정의합니다.
    - view resolver를 통해 logical view name을 실제 view로 변환합니다.
- **Spring WebFlux** : reactive programming model을 지원하는 non-blocking web framework입니다.
    - Mono와 Flux를 사용하여 asynchronous data stream을 처리합니다.
    - back pressure를 지원하여 resource 사용량을 최적화합니다.

### Spring Data Access

- **Spring JDBC** : JDBC boilerplate code를 줄이고 database access를 단순화합니다.
    - `JdbcTemplate`을 통해 SQL 실행과 결과 처리를 자동화합니다.
    - exception handling을 통일하여 database별 차이를 추상화합니다.
- **Spring ORM** : Hibernate, JPA, MyBatis 등의 ORM framework와 통합됩니다.
    - transaction 관리를 declarative하게 처리합니다.
    - `@Transactional` annotation을 통해 transaction 경계를 설정합니다.

## 주요 annotation

### Core annotation

- **`@Component`** : Spring이 관리하는 bean으로 등록합니다.
    - component scan을 통해 자동으로 감지되어 IoC container에 등록됩니다.
    - `@Service`, `@Repository`, `@Controller`의 상위 개념입니다.
- **`@Autowired`** : 의존성을 자동으로 주입합니다.
    - type 기반으로 matching되는 bean을 찾아 주입합니다.
    - `required` 속성을 통해 필수 여부를 설정합니다.
- **`@Configuration`** : Java 기반 configuration class를 정의합니다.
    - `@Bean` method를 통해 bean을 정의하고 등록합니다.
    - XML configuration을 대체하는 방식입니다.

### Web annotation

- **`@Controller`** : web request를 처리하는 controller class를 표시합니다.
    - `@RequestMapping` annotation과 함께 사용하여 URL mapping을 설정합니다.
    - view name을 return하여 view resolver가 실제 view를 찾아 rendering합니다.
- **`@RestController`** : RESTful web service를 위한 controller를 정의합니다.
    - `@Controller`와 `@ResponseBody`를 결합한 annotation입니다.
    - JSON이나 XML 형태의 response body를 직접 return합니다.
- **`@RequestMapping`** : HTTP request를 특정 method에 mapping합니다.
    - HTTP method, URL pattern, parameter 조건을 설정합니다.
    - `@GetMapping`, `@PostMapping` 등의 specialized annotation도 사용 가능합니다.

## 장점과 특징

### 개발 생산성 향상

- **Convention over Configuration** : 기본 설정을 통해 빠른 개발이 가능합니다.
    - annotation 기반 configuration으로 XML 설정을 최소화합니다.
    - auto-configuration을 통해 필요한 bean을 자동으로 구성합니다.
- **Code 재사용성** : 모듈화된 구조로 component를 재사용합니다.
    - interface 기반 programming으로 구현체를 쉽게 교체합니다.
    - template pattern을 활용하여 공통 logic을 추상화합니다.

### Enterprise 급 기능

- **Transaction 관리** : declarative transaction management를 제공합니다.
    - `@Transactional` annotation으로 transaction 경계를 선언적으로 관리합니다.
    - 다양한 transaction manager를 지원하여 platform에 독립적입니다.
- **Security 통합** : Spring Security와 seamless하게 통합됩니다.
    - authentication과 authorization을 선언적으로 처리합니다.
    - method level security를 통해 세밀한 권한 제어가 가능합니다.
- **Test 지원** : 포괄적인 testing framework를 제공합니다.
    - `@SpringBootTest`, `@WebMvcTest` 등으로 다양한 layer를 test합니다.
    - mock object와 test context를 통해 isolation된 test를 작성합니다.

## Spring Boot와의 관계

- **Spring Boot** : Spring Framework 기반의 rapid application development platform입니다.
    - auto-configuration을 통해 최소한의 설정으로 application을 구성합니다.
    - embedded server를 제공하여 standalone application으로 실행 가능합니다.
- **Starter dependencies** : 관련된 dependency를 묶어서 제공합니다.
    - `spring-boot-starter-web`, `spring-boot-starter-data-jpa` 등으로 필요한 library를 한 번에 추가합니다.
    - version compatibility를 자동으로 관리하여 dependency conflict를 방지합니다.

## 활용 사례

### Web Application 개발

- **RESTful API Server** : `@RestController`와 Spring MVC를 사용합니다.
    - JSON serialization/deserialization을 자동으로 처리합니다.
    - validation, exception handling, content negotiation을 지원합니다.
- **Microservice Architecture** : Spring Cloud와 함께 분산 system을 구축합니다.
    - service discovery, circuit breaker, distributed configuration을 지원합니다.
    - container 기반 배포와 cloud platform 통합이 용이합니다.

### Data Access Layer

- **Database Integration** : Spring Data JPA를 통해 repository pattern을 구현합니다.
    - query method naming convention으로 자동 query 생성이 가능합니다.
    - pagination, sorting, auditing 기능을 기본 제공합니다.
- **Cache Management** : `@Cacheable` annotation으로 선언적 caching을 적용합니다.
    - Redis, Ehcache 등 다양한 caching provider를 지원합니다.
    - cache eviction과 conditional caching을 설정합니다.

## 성능 고려 사항

### Memory 관리

- **Bean Scope 설정** : singleton, prototype, request, session scope를 적절히 사용합니다.
    - stateless bean은 singleton으로, stateful bean은 prototype으로 설정합니다.
    - web application에서는 request나 session scope를 활용합니다.
- **Lazy Initialization** : `@Lazy` annotation을 통해 필요한 시점에 bean을 생성합니다.
    - application 시작 시간을 단축하고 memory 사용량을 줄입니다.
    - circular dependency 문제를 해결하는 데도 활용됩니다.

### 성능 최적화

- **Connection Pool 관리** : database connection pool을 적절히 구성합니다.
    - HikariCP를 사용하여 connection pool 성능을 최적화합니다.
    - connection timeout, maximum pool size 등을 환경에 맞게 설정합니다.
- **AOP Overhead 최소화** : aspect의 적용 범위를 필요한 부분으로 제한합니다.
    - pointcut expression을 정확히 작성하여 불필요한 proxy 생성을 방지합니다.
    - CGLIB proxy 대신 JDK dynamic proxy를 사용하여 성능을 향상합니다.
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    







    
    







    
    







    
    







    
    







    
    







    
    







    
    







    
    







    
    







    
    







    
    







    
    







    
    







    
    







    
    







    
    







    
    







    












# Spring Framework

- Spring Framework는 Java로 enterprise급 application을 쉽게 만들 수 있도록 도와주는 framework입니다.
- 복잡한 기업용 application 개발에 필요한 infrastructure를 제공하여 개발자가 business logic에 집중할 수 있게 합니다.
- 2003년부터 시작되어 현재까지 지속적으로 발전하고 있으며, Java 개발 생태계에서 가장 널리 사용되는 framework 중 하나입니다.

## Spring이 해결하는 문제

- **복잡한 설정과 관리** : 기존 Java enterprise 개발에서 object 생성과 dependency 관리가 복잡했던 문제를 해결합니다.
- **중복되는 boilerplate code** : database 연결, transaction 처리, logging 등 반복되는 code를 줄여줍니다.
- **tight coupling** : component 간의 강한 결합을 줄여 유지보수하기 쉬운 code를 만들 수 있습니다.
- **test의 어려움** : 각 component를 독립적으로 test할 수 있는 환경을 제공합니다.

## Spring의 핵심 철학

- **단순함과 유연성** : 복잡한 문제를 간단하게 해결할 수 있는 방법을 제공하면서도 다양한 요구사항에 유연하게 대응합니다.
- **비침입적 설계** : 기존 Java code를 크게 변경하지 않고도 Spring의 기능을 활용할 수 있습니다.
- **convention over configuration** : 일반적인 관례를 따르면 복잡한 설정 없이도 application을 구축할 수 있습니다.
- **test 친화적** : application의 각 부분을 쉽게 test할 수 있도록 설계되었습니다.

## 주요 기능

### IoC Container와 Dependency Injection

- **IoC(Inversion of Control)** : object의 생성과 관리를 개발자가 아닌 Spring이 담당합니다.
- **Dependency Injection** : 필요한 object를 Spring이 자동으로 주입해주어 개발자가 직접 생성할 필요가 없습니다.
- 이를 통해 component 간의 결합도가 낮아지고 code의 재사용성과 test 가능성이 높아집니다.

### AOP(Aspect Oriented Programming)

- **관심사의 분리** : logging, security, transaction 관리 등 여러 곳에서 공통으로 사용되는 기능을 별도로 관리합니다.
- **code 중복 제거** : 공통 기능을 한 곳에서 정의하고 필요한 곳에 자동으로 적용됩니다.
- business logic과 부가적인 기능을 분리하여 code의 가독성과 유지보수성을 향상시킵니다.

### Transaction 관리

- **선언적 transaction** : annotation이나 설정만으로 transaction을 관리할 수 있습니다.
- **다양한 platform 지원** : 여러 database와 transaction manager를 통일된 방식으로 사용할 수 있습니다.
- 복잡한 transaction 처리 logic을 직접 작성할 필요가 없어집니다.

## Spring의 구성 요소

### Core Container

- **ApplicationContext** : Spring의 핵심인 container로, bean의 생성과 관리를 담당합니다.
- **Bean** : Spring이 관리하는 object로, 일반적인 Java object와 동일하지만 Spring의 lifecycle을 따릅니다.
- configuration 정보를 바탕으로 application에 필요한 object들을 생성하고 연결합니다.

### Web Framework

- **Spring MVC** : web application 개발을 위한 framework로, model-view-controller pattern을 구현합니다.
- **Spring WebFlux** : reactive programming을 지원하는 비동기 web framework입니다.
- RESTful API, web application, microservice 등 다양한 형태의 web 서비스를 구축할 수 있습니다.

### Data Access

- **Spring JDBC** : database 연결과 SQL 실행을 단순화합니다.
- **ORM 지원** : Hibernate, JPA 등의 ORM framework와 seamless하게 통합됩니다.
- **Spring Data** : repository pattern을 통해 data access layer를 쉽게 구현할 수 있습니다.

## Spring 생태계

### Spring Boot

- **빠른 시작** : 복잡한 설정 없이 Spring application을 빠르게 시작할 수 있습니다.
- **auto-configuration** : 필요한 설정을 자동으로 구성해주어 개발 시간을 단축시킵니다.
- **embedded server** : 별도의 server 설치 없이 application을 실행할 수 있습니다.

### 다른 Spring Project들

- **Spring Security** : 인증과 권한 관리를 위한 보안 framework입니다.
- **Spring Data** : 다양한 database와의 통합을 단순화합니다.
- **Spring Cloud** : microservice architecture 구축을 위한 도구들을 제공합니다.
- **Spring Batch** : 대용량 data 처리를 위한 batch processing framework입니다.

## Spring을 사용하는 이유

### 개발 생산성 향상

- **boilerplate code 감소** : 반복적인 code 작성을 크게 줄일 수 있습니다.
- **빠른 개발** : 검증된 pattern과 최적화된 구조를 통해 개발 속도가 향상됩니다.
- **풍부한 ecosystem** : 다양한 library와 tool이 잘 통합되어 있어 필요한 기능을 쉽게 추가할 수 있습니다.

### 안정성과 확장성

- **검증된 architecture** : 수많은 enterprise에서 검증된 안정적인 architecture를 제공합니다.
- **확장성** : 작은 application부터 대규모 enterprise system까지 확장 가능합니다.
- **성능** : 최적화된 구조와 caching, connection pooling 등의 기능으로 높은 성능을 제공합니다.

### 유지보수와 test

- **loose coupling** : component 간의 느슨한 결합으로 변경에 유연하게 대응할 수 있습니다.
- **test 용이성** : mock object와 test framework를 통해 unit test와 integration test를 쉽게 작성할 수 있습니다.
- **community 지원** : 활발한 community와 풍부한 문서로 문제 해결이 용이합니다.

## 어떤 경우에 Spring을 사용하나

### Web Application 개발

- REST API server, web application, microservice 등 다양한 형태의 web 서비스 개발에 적합합니다.
- Spring MVC나 Spring WebFlux를 사용하여 현대적인 web application을 구축할 수 있습니다.

### Enterprise Application

- 복잡한 business logic과 다양한 system 연동이 필요한 기업용 application 개발에 최적화되어 있습니다.
- transaction 관리, security, caching 등 enterprise 환경에서 필요한 기능들을 제공합니다.

### Cloud Native Application

- Spring Boot와 Spring Cloud를 통해 cloud 환경에 최적화된 application을 개발할 수 있습니다.
- container 기반 배포와 microservice architecture 구축이 용이합니다.

## 시작하기

### 학습 순서

- **Spring 기본 개념** : IoC, DI, AOP 등의 핵심 개념을 이해합니다.
- **Spring Boot** : 실제 application 개발을 위해 Spring Boot부터 시작하는 것을 권장합니다.
- **Spring MVC** : web application 개발을 위한 Spring MVC를 학습합니다.
- **Spring Data** : database 연동을 위한 Spring Data를 익힙니다.

### 개발 환경

- **IDE** : IntelliJ IDEA, Eclipse, Visual Studio Code 등에서 Spring 개발이 가능합니다.
- **Build Tool** : Maven이나 Gradle을 사용하여 project를 관리합니다.
- **Spring Initializr** : start.spring.io에서 기본 project 구조를 생성할 수 있습니다.

## 결론

- Spring Framework는 Java enterprise 개발의 복잡성을 해결하고 개발 생산성을 크게 향상시키는 강력한 도구입니다.
- 단순한 web application부터 복잡한 enterprise system까지 다양한 요구사항에 대응할 수 있는 유연성을 제공합니다.
- 활발한 community와 지속적인 발전으로 현재와 미래의 개발 요구사항을 만족시킬 수 있는 안정적인 선택입니다.
    