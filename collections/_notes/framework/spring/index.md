---
published: false
---



## Spring Framework

- Spring Framework는 Java platform을 위한 opensource application framework로, 동적인 website 개발을 위한 다양한 service를 제공합니다.

- **제어의 역전(IoC)**, **관점 지향 programming(AOP)**, **Model-View-Controller(MVC)** pattern을 핵심으로 하여 enterprise급 application 개발을 지원합니다.

- 전자 정부 표준 framework의 기반 기술로 사용되며, 대규모 data 처리와 동시다발적인 transaction을 처리할 수 있는 안정성을 제공합니다.

- **의존성 주입(Dependency Injection)**과 **제어의 역전(Inversion of Control)** 원리를 기반으로 하여, loose coupling이 가능하게 하고, test 가능한 code 작성을 지원합니다.


---


## IoC(Inversion of Control) 기반 설계

- Spring의 핵심 특징인 **제어의 역전**은 객체의 생성과 lifecycle 관리 권한을 개발자가 아닌 특별한 객체인 container에게 위임하는 방식입니다.

- 기존 방식에서는 객체가 직접 의존성 객체를 생성하고 method를 호출하는 모든 작업을 제어했지만, IoC에서는 container가 이러한 제어권을 담당합니다.
    - 객체의 생성부터 생명주기까지 모든 제어권이 container로 이전됩니다.
    - 각 객체들 간의 의존 관계를 개발자가 직접 관리할 필요가 없습니다.

- **ApplicationContext**를 통해 bean의 정의와 관리를 수행합니다.
    - bean은 Spring IoC container에 의해 관리되는 object를 의미합니다.
    - container는 XML configuration, annotation, Java configuration 등 다양한 방식으로 bean을 정의할 수 있습니다.


### Dependency Injection과 Dependency Lookup

- IoC는 **DI(Dependency Injection)**와 **DL(Dependency Lookup)** 두 가지 방식으로 구현됩니다.

- **DL(의존성 검색)**은 container에서 별도의 저장소에 보관된 bean을 API를 통해 검색하여 사용하는 방법입니다.
    - container가 제공하는 API를 이용하여 필요한 bean을 찾아서 사용합니다.

- **DI(의존성 주입)**은 의존 관계에 있는 객체를 외부에서 주입받는 방식입니다.
    - 각 class 간의 의존 관계를 bean 설정 정보를 바탕으로 container가 자동으로 연결합니다.
    - 객체가 필요로 하는 의존성을 직접 생성하지 않고 외부에서 받아서 사용합니다.


---


## POJO(Plain Old Java Object) 지향

- Spring은 **POJO** 방식을 채택하여 평범한 Java 객체로 application을 개발할 수 있도록 지원합니다.

- POJO는 getter/setter를 가진 단순한 객체로 정의되며, 특별한 framework에 종속되지 않는 특징을 가집니다.
    - 의존성이 없어 test 및 유지 보수가 편리합니다.
    - 객체지향적인 다양한 설계와 구현이 가능합니다.

- EJB(Enterprise JavaBeans)의 복잡성을 해결하기 위해 등장했습니다.
    - EJB는 하나의 logic을 위해 불필요하게 복잡한 code가 과도하게 요구되었습니다.
    - POJO 방식이 다시 주목받으면서 Spring Framework도 함께 부상하게 되었습니다.

- 특정 interface나 class를 강제로 상속받지 않아도 되는 개발 방식을 지향합니다.


---


## AOP(Aspect Oriented Programming) 지원

- **관점 지향 programming**을 통해 핵심 기능과 공통 기능을 분리하여 개발 효율성을 높입니다.

- 무분별하게 중복되는 공통 기능 code를 한 곳에 모아 관리할 수 있습니다.
    - 중복 code 제거가 가능합니다.
    - 공통 기능 하나의 수정으로 모든 핵심 기능들의 공통 기능을 동시에 수정할 수 있습니다.

- 효율적인 유지 보수와 재사용성 극대화를 실현합니다.
    - 핵심 logic에 영향을 주지 않으면서 공통 기능을 적용할 수 있습니다.
    - logging, security, transaction 관리 등의 공통 기능을 aspect로 분리하여 관리합니다.

- OOP의 한계를 보완하기 위해 도입되었습니다.
    - 객체지향 programming에서 발생하는 중복 code 문제를 해결합니다.
    - 가독성, 확장성, 유지 보수성을 향상시킵니다.
    - business logic과 infrastructure code를 분리하여 유지 보수성을 개선합니다.

---

## MVC(Model-View-Controller) Pattern

- **Model2 구조**를 기반으로 사용자 interface와 business logic을 분리하여 개발합니다.

### Model 영역

- **data 처리**를 담당하며 Service와 DAO로 구분됩니다.

- Service는 business logic을 처리하는 영역입니다.
    - HTTP 통신을 직접 하지 않아야 하며, request나 response 객체를 매개변수로 받지 않습니다.
    - View에 종속적인 code가 없어야 하고, View가 변경되어도 재사용 가능해야 합니다.
    - View와 Controller에 대한 정보를 가지고 있어서는 안 됩니다.

### View 영역

- **사용자 interface**를 담당하며 사용자에게 보여지는 부분을 처리합니다.

- Controller를 통해 Model의 data에 대한 시각화를 담당합니다.
    - 자신이 요청을 보낼 Controller의 정보만 알고 있어야 합니다.
    - Model이 가진 정보를 저장하거나 Model, Controller의 구성 요소를 알아서는 안 됩니다.

### Controller 영역

- **요청 처리와 응답 전달**을 담당하는 중간 역할을 수행합니다.

- View에서 받은 요청을 가공하여 Model에 전달하고, Model의 결과를 View로 전달합니다.
    - 모든 요청 error와 Model error를 처리합니다.
    - View와 Model의 정보를 모두 알고 있어야 합니다.

### MVC의 장점

- source를 분리함으로써 각 source의 목적이 명확해져 유지 보수가 용이합니다.

- View 정보가 변경되어도 Controller에서 data 가공만 처리하면 되므로 개발 비용을 절감할 수 있습니다.

- Service 영역의 재사용이 가능하여 확장성이 향상됩니다.

---

## Spring Boot

- Spring Boot는 Spring Framework를 기반으로 한 micro framework로, 복잡한 설정 없이 빠르게 application을 개발할 수 있도록 지원합니다.

- **자동 구성(Auto Configuration)** 기능을 통해 classpath의 dependency를 분석하여 필요한 bean을 자동으로 생성하고 설정합니다.
    - 개발자가 별도의 복잡한 XML configuration을 작성할 필요가 없습니다.
    - 일반적인 설정들이 convention에 따라 자동으로 적용됩니다.

- **내장형 server**를 제공하여 별도의 web server 설치 없이 standalone application으로 실행 가능합니다.
    - Tomcat, Jetty, Undertow 등의 내장 server를 지원합니다.
    - JAR file 하나로 전체 application을 packaging하여 배포할 수 있습니다.

- **Starter Dependencies**를 통해 관련된 library들을 묶어서 제공하여 dependency 관리를 단순화합니다.
    - `spring-boot-starter-web`, `spring-boot-starter-data-jpa` 등 용도별로 필요한 dependency를 한 번에 가져올 수 있습니다.

---

## Spring Framework의 구조

- Spring Framework는 modular 구조로 설계되어 필요한 기능만 선택적으로 사용할 수 있습니다.

### Core Container

- **Spring Core**는 Spring Container를 의미하며 Framework의 핵심입니다.
    - Bean Factory Container가 핵심 역할을 담당합니다.
    - IoC pattern을 적용하여 객체 구성부터 의존성 처리까지 모든 작업을 처리합니다.
    - BeanFactory interface를 통해 bean 관리를 수행합니다.

- **Spring Context**는 Framework의 context 정보들을 제공하는 설정을 담당합니다.
    - JNDI, EJB, Validation, Scheduling, Internationalization 등 enterprise service들을 포함합니다.
    - ApplicationContext interface를 제공하여 enterprise service들을 통합하고 국제화, event propagation 등의 기능을 지원합니다.

### Data Access Layer

- **Spring DAO**는 Database Access Object로 database data에 접근하는 객체입니다.
    - Spring JDBC는 추상 layer를 지원하여 예외 처리 부분을 간편화합니다.
    - 일관된 방법으로 code를 작성할 수 있도록 지원합니다.
    - JDBC abstraction layer를 제공하여 boilerplate code를 줄이고 database 작업을 단순화합니다.

- **Spring ORM**은 Object Relational Mapping을 통해 객체와의 관계 설정을 담당합니다.
    - Hibernate, MyBatis, JDO 등 인기있는 OR 도구를 사용할 수 있도록 지원합니다.
    - Hibernate, JPA, MyBatis 등의 ORM framework와의 integration을 지원합니다.

- **Spring Transaction**은 선언적 transaction 관리를 담당합니다.
    - programmatic transaction 처리의 복잡성을 해결합니다.

### Web Layer

- **Spring Web**은 Web 기반 application 개발에 필요한 기본적인 기능을 지원합니다.
    - Web context module이 Application module에 내장되어 있습니다.
    - Jakarta Struts와의 통합을 지원합니다.

- **Spring MVC**는 Model2 구조로 Application을 개발할 수 있도록 지원합니다.
    - 전략 interface를 통해 고급 구성이 가능합니다.
    - JSP, Velocity, Tiles 등 다양한 view 기술을 지원합니다.
    - Model-View-Controller pattern을 구현한 web framework로 RESTful web service 개발을 지원합니다.

- **Spring WebFlux**는 reactive programming model을 기반으로 한 non-blocking web framework입니다.

### Security

- **Spring Security**는 authentication과 authorization을 포함한 포괄적인 보안 기능을 제공합니다.

### AOP Module

- **Spring AOP**는 관점 지향 programming을 구현할 수 있게 합니다.
    - 횡단 관심사를 분리하여 code의 모듈성을 향상시킵니다.

---

## 개발 방식

- **Annotation 기반 설정**을 통해 code의 가독성을 높이고 설정을 단순화합니다.
    - `@Component`, `@Service`, `@Repository`, `@Controller` 등의 stereotype annotation을 사용합니다.
    - `@Autowired`, `@Qualifier` 등을 통해 의존성 주입을 구성합니다.

- **Test 지원**이 강화되어 unit test와 integration test를 쉽게 작성할 수 있습니다.
    - `@SpringBootTest`, `@WebMvcTest`, `@DataJpaTest` 등의 test annotation을 제공합니다.
    - MockMvc, TestRestTemplate 등의 test utility를 지원합니다.

---

## Domain Object 구분

- Spring application에서는 data를 처리하는 다양한 객체 유형을 구분하여 사용합니다.

- **Domain Object(DO)**는 business logic을 구현하며 Business logic layer에만 위치합니다.
    - 핵심 business 규칙과 로직을 담당합니다.

- **DTO(Data Transfer Object)**는 data 전송을 목적으로 하는 객체입니다.
    - 계층 간 data 교환을 위해 사용됩니다.

- **VO(Value Object)**와 **Entity**는 각각 값 표현과 영속성 관리를 담당합니다.

---

## 장점

- **낮은 결합도**를 통해 component 간의 독립성을 보장하고 유지 보수성을 향상시킵니다.

- **광범위한 ecosystem**을 통해 다양한 third-party library와의 integration을 지원합니다.
    - database, messaging, caching, monitoring 등 enterprise application에 필요한 대부분의 기능을 제공합니다.

- **강력한 community 지원**과 풍부한 문서화로 학습과 문제 해결이 용이합니다.

- **production-ready** 기능들을 기본으로 제공하여 enterprise 환경에서 안정적으로 사용할 수 있습니다.
    - health check, metrics, monitoring 등의 운영 관련 기능을 포함합니다.

---

## Reference

- <https://spring.io/projects/spring-framework>
- <https://spring.io/projects/spring-boot>
- <https://docs.spring.io/spring-framework/docs/current/reference/html/>
- <https://khj93.tistory.com/entry/Spring-Spring-Framework%EB%9E%80-%EA%B8%B0%EB%B3%B8-%EA%B0%9C%EB%85%90-%ED%95%B5%EC%8B%AC-%EC%A0%95%EB%A6%AC>
- <https://jonny-cho.github.io/spring/2019/01/21/springbootmysql/>
- <https://m.blog.naver.com/sgs03091/222067037646>