---
layout: note
permalink: /283
title: Dependency Injection - Spring의 의존성 주입
description: Dependency Injection(DI)은 객체 간의 의존 관계를 외부에서 주입하는 design pattern으로, Spring IoC container가 bean의 생성과 의존성 주입을 자동으로 관리합니다.
date: 2025-12-30
---


# Dependency Injection

- Dependency Injection(DI)은 **객체가 필요로 하는 의존성을 외부에서 주입받는 design pattern**입니다.
    - 객체가 직접 의존 객체를 생성하지 않고, 외부에서 생성된 객체를 전달받습니다.
    - 객체 지향 programming에서 널리 사용되는 개념으로, Spring에만 국한되지 않습니다.

- Spring framework는 **IoC(Inversion of Control) container**를 통해 DI를 구현합니다.
    - IoC container가 bean의 lifecycle과 의존 관계를 관리합니다.
    - 개발자는 의존성 설정만 선언하고, 실제 주입은 container가 처리합니다.


---


## DI가 필요한 이유

- 객체 간의 **결합도를 낮추고 유연한 구조**를 만들기 위해 DI를 사용합니다.
    - 강한 결합은 변경에 취약하고, 느슨한 결합은 변경에 유연합니다.


### 강한 결합의 문제

- 객체 내부에서 다른 객체를 직접 생성하면 **강한 결합**이 발생합니다.
    - 의존 객체가 변경되면 해당 객체를 사용하는 모든 code를 수정해야 합니다.
    - test 시 mock 객체로 대체하기 어렵습니다.

```java
public class OrderService {

    // 강한 결합 : OrderService가 EmailSender를 직접 생성
    private final EmailSender emailSender = new EmailSender();

    public void placeOrder(Order order) {
        // 주문 처리 logic
        emailSender.send("주문이 완료되었습니다.");
    }
}
```

- `EmailSender`를 `SmsSender`로 변경하려면 `OrderService` code를 수정해야 합니다.
- `OrderService`를 test할 때 실제 email이 발송되는 문제가 있습니다.


### 느슨한 결합의 장점

- 외부에서 의존 객체를 주입받으면 **느슨한 결합**을 달성합니다.
    - interface에 의존하므로 구현체 변경이 용이합니다.
    - runtime에 의존 관계가 결정되어 유연한 구조를 가집니다.

```java
public class OrderService {

    // 느슨한 결합 : interface에 의존하고 외부에서 주입받음
    private final MessageSender messageSender;

    public OrderService(MessageSender messageSender) {
        this.messageSender = messageSender;
    }

    public void placeOrder(Order order) {
        // 주문 처리 logic
        messageSender.send("주문이 완료되었습니다.");
    }
}
```

- `MessageSender` interface를 구현한 어떤 객체도 주입 가능합니다.
- test 시 mock 객체를 주입하여 실제 전송 없이 검증할 수 있습니다.
- SOLID 원칙 중 **OCP(Open-Closed Principle)**와 **DIP(Dependency Inversion Principle)**를 준수합니다.


---


## Spring IoC Container

- Spring IoC container는 **bean의 생성, 설정, 조립을 담당**하는 핵심 component입니다.
    - `ApplicationContext` interface가 IoC container를 대표합니다.
    - container는 설정 metadata를 읽어 bean을 생성하고 의존성을 주입합니다.

```mermaid
flowchart LR
    config[설정 Metadata]
    container[Spring IoC Container]
    beans[구성된 Bean들]

    config --> container
    container --> beans
```

- 설정 metadata는 XML, Java annotation, Java code 등으로 정의할 수 있습니다.
    - 현대 Spring 개발에서는 annotation 기반 설정이 주로 사용됩니다.


### Bean 등록 방식

- **Component Scan** : `@Component`, `@Service`, `@Repository`, `@Controller` annotation이 붙은 class를 자동으로 bean으로 등록합니다.

```java
@Service
public class OrderService {
    // Spring이 자동으로 bean으로 등록
}
```

- **Java Config** : `@Configuration` class에서 `@Bean` method로 직접 bean을 정의합니다.

```java
@Configuration
public class AppConfig {

    @Bean
    public OrderService orderService(MessageSender messageSender) {
        return new OrderService(messageSender);
    }
}
```


### 의존성 주입 시점

- Spring container는 **bean 생성 시점에 의존성을 주입**합니다.
    - 생성자 주입 : bean 생성과 동시에 의존성 주입이 완료됩니다.
    - Field/수정자 주입 : bean 생성 후 의존성이 주입됩니다.

- container는 의존 관계를 분석하여 **올바른 순서로 bean을 생성**합니다.
    - A가 B에 의존하면, B를 먼저 생성한 후 A를 생성합니다.
    - 순환 참조가 발생하면 application context 초기화에 실패합니다.


---


## Spring의 의존성 주입 방식

- Spring은 **생성자 주입, 필드 주입, 수정자 주입** 세 가지 방식을 지원합니다.
    - Spring team은 생성자 주입을 권장합니다.

| 방식 | 특징 | 권장 여부 |
| --- | --- | --- |
| 생성자 주입 | 불변성 보장, 필수 의존성 명시, 순환 참조 조기 발견 | 권장 |
| Field 주입 | 간결한 code, test 어려움, final 불가 | 비권장 |
| 수정자 주입 | 선택적 의존성에 적합, final 불가 | 상황에 따라 |


### 생성자 주입

- **가장 권장되는 방식**으로, 생성자를 통해 의존성을 주입받습니다.
    - 의존성을 `final`로 선언하여 불변성을 보장합니다.
    - 필수 의존성이 누락되면 compile time에 오류가 발생합니다.
    - 순환 참조 시 application 시작 시점에 오류가 발생하여 조기에 발견할 수 있습니다.

```java
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final MessageSender messageSender;

    // 생성자가 하나면 @Autowired 생략 가능
    public OrderService(OrderRepository orderRepository, MessageSender messageSender) {
        this.orderRepository = orderRepository;
        this.messageSender = messageSender;
    }
}
```

- Lombok의 `@RequiredArgsConstructor`를 사용하면 더 간결하게 작성할 수 있습니다.

```java
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final MessageSender messageSender;
}
```


### Field 주입

- field에 `@Autowired`를 선언하여 직접 주입받는 방식입니다.
    - code가 간결하지만, test와 유지 보수에 불리합니다.
    - `final` 선언이 불가능하여 불변성을 보장할 수 없습니다.
    - Spring container 없이는 의존성 주입이 불가능하여 unit test가 어렵습니다.

```java
@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MessageSender messageSender;
}
```

- 실무에서는 **비권장**되며, 주로 test code나 legacy code에서 볼 수 있습니다.


### 수정자 주입

- setter method에 `@Autowired`를 선언하여 주입받는 방식입니다.
    - 선택적 의존성(optional dependency)에 적합합니다.
    - `final` 선언이 불가능합니다.

```java
@Service
public class OrderService {

    private OrderRepository orderRepository;
    private MessageSender messageSender;

    @Autowired
    public void setOrderRepository(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Autowired(required = false)
    public void setMessageSender(MessageSender messageSender) {
        this.messageSender = messageSender;
    }
}
```

- `required = false`로 설정하면 해당 bean이 없어도 application이 정상 시작됩니다.


---


## 동일 Type Bean의 선택

- 동일한 type의 bean이 여러 개 존재할 때, Spring은 어떤 bean을 주입할지 결정할 수 없습니다.
    - `NoUniqueBeanDefinitionException`이 발생하며 application context 초기화에 실패합니다.
    - `@Primary`와 `@Qualifier`로 이 문제를 해결합니다.

- **`@Primary`** : bean 정의 시점에 기본 bean을 지정합니다.
    - 동일 type의 bean 중 `@Qualifier` 없이 주입할 때 선택되는 기본값입니다.
    - 대부분의 경우 하나의 구현체를 사용하고, 특수한 경우에만 다른 구현체가 필요할 때 유용합니다.

- **`@Qualifier`** : 주입 시점에 특정 bean을 명시적으로 선택합니다.
    - bean 이름이나 custom qualifier로 원하는 bean을 지정합니다.
    - `@Primary`보다 우선순위가 높아, `@Qualifier`가 있으면 `@Primary` 설정을 override합니다.

```java
@Component
@Primary
public class EmailSender implements MessageSender { }

@Component
public class SmsSender implements MessageSender { }

@Service
public class NotificationService {

    // @Primary인 EmailSender가 주입됨
    public NotificationService(MessageSender messageSender) { }
}

@Service
public class UrgentNotificationService {

    // @Qualifier로 SmsSender 명시적 주입
    public UrgentNotificationService(@Qualifier("smsSender") MessageSender messageSender) { }
}
```


---


## Reference

- <https://docs.spring.io/spring-framework/reference/core/beans/introduction.html>
- <https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html>

