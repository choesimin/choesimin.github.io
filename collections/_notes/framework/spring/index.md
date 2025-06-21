---
layout: note
permalink: /341
title: Spring Framework - Java Enterprise Application 쉽게 개발하기
description: Spring framework는 Java enterprise application 개발을 위한 포괄적인 programming 및 configuration model을 제공하는 opensource application framework입니다.
date: 2025-06-20
---


## Spring Framework

- Spring framework는 **제어의 역전(IoC)**, **의존성 주입(DI)**, **관점 지향 programming(AOP)**을 핵심 원리로 하여 결합도가 낮고 test 가능한 application 개발을 지원합니다.

- **POJO(Plain Old Java Object) 기반 개발**을 통해 특정 framework에 종속되지 않는 깔끔한 code 작성을 가능하게 합니다.

- **풍부한 생태계**를 통해 enterprise application 개발에 필요한 거의 모든 기능을 제공받을 수 있습니다.
    - Spring Cloud를 통한 microservice architecture 지원, Spring Batch를 통한 대용량 batch processing, Spring Integration을 통한 enterprise integration pattern 구현 등.

- **강력한 community**와 상용 지원을 통해 안정적인 운영이 가능합니다.
    - VMware(구 Pivotal)의 공식 지원과 지속적인 update를 제공받을 수 있습니다.
    - 풍부한 문서와 tutorial, best practice가 공유되고 있습니다.

- 전자 정부 표준 framework의 기반 기술로 채택되어, 한국의 공공 부문에서 널리 사용되고 있습니다.


### IoC Container와 의존성 주입

- Spring의 핵심인 **IoC(Inversion of Control) Container**는 객체의 생성, 구성, lifecycle을 관리하는 중앙 집중식 관리 system입니다.

- 기존 방식에서는 객체가 자신이 사용할 의존 객체를 직접 생성했지만, IoC에서는 container가 객체 간의 의존 관계를 관리합니다.
    - 객체는 자신이 필요로 하는 의존성을 외부에서 주입받아 사용합니다.
    - 이를 통해 객체 간의 결합도를 현저히 낮출 수 있습니다.

- **ApplicationContext**가 IoC container의 구현체 역할을 하며, bean의 정의와 생성, 관리를 담당합니다.
    - bean은 Spring IoC container에 의해 관리되는 객체를 의미합니다.
    - XML configuration, Java configuration, annotation 등 다양한 방식으로 bean을 정의할 수 있습니다.

#### 의존성 주입 방식

- **Constructor Injection**은 생성자를 통해 의존성을 주입하는 방식으로, 불변성과 필수 의존성을 보장합니다.

- **Setter Injection**은 setter method를 통해 의존성을 주입하며, 선택적 의존성에 적합합니다.

- **Field Injection**은 `@Autowired` annotation을 field에 직접 적용하는 방식이지만, test 어려움과 의존성 은닉 문제로 권장되지 않습니다.


### AOP (Aspect Oriented Programming)

- **관점 지향 programming**은 핵심 business logic과 공통 기능(횡단 관심사)을 분리하여 code의 모듈성을 향상시키는 programming paradigm입니다.

- logging, security, transaction 관리, caching 등의 공통 기능을 aspect로 분리하여 중복 code를 제거하고 유지 보수성을 개선합니다.
    - 핵심 logic에 영향을 주지 않으면서 공통 기능을 투명하게 적용할 수 있습니다.
    - 하나의 aspect 수정으로 모든 관련 기능에 동시 적용이 가능합니다.

- **AspectJ** expression을 사용하여 advice가 적용될 join point를 정확하게 지정할 수 있습니다.
    - Before, After, Around 등 다양한 advice type을 지원합니다.
    - method 실행 전후, 예외 발생 시점 등에 부가 기능을 삽입할 수 있습니다.


---


## Spring MVC Architecture

- **Model-View-Controller pattern**을 구현한 web application framework로, presentation layer와 business layer를 명확히 분리합니다.


### DispatcherServlet 중심 구조

- **DispatcherServlet**이 front controller 역할을 하며 모든 HTTP 요청을 중앙에서 처리합니다.
    - 요청을 적절한 controller에 위임하고 응답을 조율하는 역할을 담당합니다.
    - HandlerMapping, HandlerAdapter, ViewResolver 등의 component와 협력하여 요청을 처리합니다.

- **HandlerMapping**은 요청 URL을 담당할 controller를 결정합니다.

- **ViewResolver**는 논리적 view 이름을 실제 view 구현체로 변환합니다.


### Controller와 Model

- **Controller**는 `@Controller` annotation으로 정의하며, HTTP 요청을 처리하는 method를 포함합니다.
    - `@RequestMapping`, `@GetMapping`, `@PostMapping` 등으로 URL mapping을 설정합니다.
    - request parameter, path variable, request body 등을 자동으로 binding하여 처리합니다.

- **Model**은 view에 전달할 data를 담는 객체로, controller에서 business logic 처리 결과를 저장합니다.


### RESTful Web Service 지원

- `@RestController`와 `@ResponseBody`를 통해 JSON, XML 등의 format으로 data를 직접 반환하는 REST API 개발을 지원합니다.

- HTTP method별 mapping과 content negotiation을 통해 RESTful architecture를 쉽게 구현할 수 있습니다.


---


## Spring Boot : Spring Framework 쉽게 사용하기

- **Spring Boot**는 Spring Framework 기반의 micro framework로, 복잡한 설정 없이 production 수준의 application을 빠르게 개발할 수 있도록 설계되었습니다.

- convention over configuration 원칙을 따라 개발자가 별도 설정을 하지 않아도 합리적인 기본값으로 application이 동작합니다.


### Auto Configuration

- **자동 구성(auto configuration)**은 classpath의 dependency를 분석하여 필요한 bean을 자동으로 생성하고 설정하는 핵심 기능입니다.
    - `@SpringBootApplication` annotation이 자동 구성을 활성화합니다.
    - conditional annotation을 통해 특정 조건에서만 bean이 생성되도록 세밀하게 제어합니다.

- 개발자는 XML configuration file이나 복잡한 Java configuration 작성 없이 즉시 개발을 시작할 수 있습니다.


### Starter Dependency

- **Starter**는 관련된 dependency들을 묶어서 제공하는 편의 기능입니다.
    - `spring-boot-starter-web`은 web application 개발에 필요한 모든 dependency를 포함합니다.
    - `spring-boot-starter-data-jpa`는 JPA 기반 data access에 필요한 library들을 제공합니다.
    - `spring-boot-starter-security`는 보안 기능 구현에 필요한 component들을 포함합니다.

- version 충돌 없이 호환되는 library version들이 자동으로 관리됩니다.


### Embedded Server

- **내장 server**를 통해 별도의 WAS(Web Application Server) 설치 없이 standalone application으로 실행됩니다.
    - Tomcat, Jetty, Undertow 등의 내장 server를 지원합니다.
    - `java -jar` 명령으로 간단하게 application을 실행할 수 있습니다.
    - JAR file 하나로 전체 application을 packaging하여 배포와 운영이 간편합니다.


### Production Ready Feature

- **Actuator**를 통해 application의 상태 monitoring, health check, metrics 수집 등의 운영 기능을 기본 제공합니다.
    - `/health`, `/metrics`, `/info` 등의 endpoint를 통해 application 상태를 확인할 수 있습니다.
    - custom health indicator와 metrics를 쉽게 추가할 수 있습니다.

- externalized configuration을 통해 환경별로 다른 설정을 적용할 수 있습니다.


---


## Reference

- <https://spring.io/projects/spring-framework>
- <https://spring.io/projects/spring-boot>
- <https://docs.spring.io/spring-framework/docs/current/reference/html/>
- <https://docs.spring.io/spring-boot/docs/current/reference/html/>
