---
layout: note
permalink: /479
title: SpEL - Spring Expression Language
description: SpEL은 runtime에 객체 graph를 조회하고 조작할 수 있는 Spring의 표현식 언어로, annotation 속성이나 설정에서 동적 값을 처리할 때 사용됩니다.
date: 2026-01-21
---


## SpEL

- 아래 code에서 `"#userId"`, `"#user.id"` 같은 문자열이 **SpEL(Spring Expression Language) 표현식**입니다.

```java
@Cacheable(key = "#userId")
public User findById(Long userId) { ... }

@PreAuthorize("#user.id == authentication.principal.id")
public void updateUser(User user) { ... }
```

- SpEL은 **runtime에 문자열 표현식을 해석하여 값을 계산하거나 객체에 접근**합니다.
    - `#userId`는 method parameter `userId`의 값으로 치환됩니다.
    - `#user.id`는 parameter `user`의 `id` property에 접근합니다.
    - compile 시점이 아닌 runtime에 평가되므로, 실행 환경에 따라 동적으로 값이 결정됩니다.

- Spring의 다양한 annotation에서 SpEL을 지원합니다.
    - `@Value`는 설정 값을 field에 주입할 때 사용합니다.
    - `@Cacheable`, `@CacheEvict`는 cache key를 동적으로 생성할 때 사용합니다.
    - `@PreAuthorize`, `@PostAuthorize`는 method 수준의 보안 규칙을 정의할 때 사용합니다.
    - `@EventListener`는 조건부 event 처리를 정의할 때 사용합니다.
    - custom annotation에서도 AOP와 함께 활용할 수 있습니다.


---


## 기본 문법

- SpEL은 literal, 연산자, 변수 참조 등의 기본 문법을 제공합니다.


### Literal 표현식

- 문자열, 숫자, boolean, null 등의 literal 값을 표현할 수 있습니다.

| 유형 | 예시 | 설명 |
| --- | --- | --- |
| 문자열 | `'Hello World'` | 작은따옴표로 감싸서 표현 |
| 숫자 | `42`, `3.14`, `1e10` | 정수, 실수, 지수 표기 |
| boolean | `true`, `false` | boolean 값 |
| null | `null` | null 값 |

```java
@Value("#{'Hello World'}")
private String greeting;  // "Hello World"

@Value("#{42}")
private int count;  // 42

@Value("#{true}")
private boolean enabled;  // true
```


### 연산자

- 산술, 비교, 논리, 삼항 연산자 등을 지원합니다.

| 유형 | 연산자 | 예시 |
| --- | --- | --- |
| 산술 | `+`, `-`, `*`, `/`, `%`, `^` | `#{2 + 3}` → `5` |
| 비교 | `==`, `!=`, `<`, `>`, `<=`, `>=` | `#{age > 18}` |
| 논리 | `and`, `or`, `not`, `!` | `#{flag and enabled}` |
| 삼항 | `? :` | `#{age > 18 ? 'adult' : 'minor'}` |
| Elvis | `?:` | `#{name ?: 'default'}` (null이면 default) |
| Safe Navigation | `?.` | `#{user?.address?.city}` (null-safe 접근) |

```java
// 산술 : property 값에 계산 적용
@Value("#{${timeout.seconds} * 1000}")
private int timeoutMs;  // timeout.seconds=5 → 5000

// 삼항 : 조건에 따라 다른 값 주입
@Value("#{${server.port} > 8000 ? 'high' : 'low'}")
private String portRange;

// Elvis : null이면 기본값 사용
@Value("#{${app.name} ?: 'DefaultApp'}")
private String appName;

// Safe Navigation : null-safe하게 property 접근
@PreAuthorize("#user?.role == 'ADMIN'")
public void adminOnly(User user) { ... }
```


### 변수 참조

- `#variableName` 형식으로 변수를 참조합니다.

- **method parameter** : Spring annotation에서 사용 시, **method parameter 이름이 자동으로 변수로 등록**됩니다.

```java
@Cacheable(key = "#userId")                    // userId parameter 참조
public User findById(Long userId) { ... }

@EventListener(condition = "#event.success")   // event parameter 참조
public void handle(OrderEvent event) { ... }
```

- **`#this`** : 현재 평가 중인 객체를 참조합니다.
    - collection 순회 시 현재 요소를 가리킵니다.

- **`#root`** : 평가 context의 root 객체를 참조합니다.
    - `@Cacheable`에서는 method 정보를 담은 객체, `@PreAuthorize`에서는 security context 등이 root가 됩니다.

- **사용자 정의 변수** : `EvaluationContext`에 직접 등록한 변수를 참조합니다.

```java
ExpressionParser parser = new SpelExpressionParser();
EvaluationContext context = new StandardEvaluationContext();
context.setVariable("name", "Spring");

String result = parser.parseExpression("#name").getValue(context, String.class);
// result = "Spring"
```


---


## 객체 접근

- SpEL은 property, method, collection 등 객체의 다양한 요소에 접근할 수 있습니다.


### Property 접근

- `.propertyName` 형식으로 객체의 property에 접근합니다.
    - getter method가 있으면 자동으로 호출됩니다.

```java
// #user.name → user.getName() 호출
// #user.address.city → user.getAddress().getCity() 호출

@PreAuthorize("#user.role == 'ADMIN'")
public void updateUser(User user) { ... }

@Cacheable(key = "#order.customer.id")
public Order findOrder(Order order) { ... }
```


### Method 호출

- `.methodName(args)` 형식으로 method를 호출합니다.

```java
// 문자열 method 호출
@Cacheable(key = "#name.toUpperCase()")
public User findByName(String name) { ... }

// parameter의 method 호출
@PreAuthorize("#ids.contains(#id)")
public void delete(List<Long> ids, Long id) { ... }
```


### Collection 접근

- index나 key를 사용하여 collection 요소에 접근합니다.

```java
// List의 첫 번째 요소로 cache key 생성
@Cacheable(key = "#ids[0]")
public List<User> findByIds(List<Long> ids) { ... }

// Map에서 특정 key의 값 사용
@PreAuthorize("#params['role'] == 'ADMIN'")
public void process(Map<String, String> params) { ... }
```


### Collection Selection과 Projection

- **Selection (`?[]`)** : 조건에 맞는 요소만 filtering합니다.

- **Projection (`.![]`)** : 각 요소에서 특정 property만 추출합니다.

```java
// users 중 active가 true인 user만 filtering
@PreAuthorize("#users.?[active == true].size() > 0")
public void processActiveUsers(List<User> users) { ... }

// users의 id만 추출하여 cache key로 사용
@Cacheable(key = "#users.![id]")
public Result calculate(List<User> users) { ... }
```


---


## Bean 참조

- `@beanName` 형식으로 Spring container에 등록된 bean을 참조합니다.
    - `@`는 bean을 참조하는 SpEL 문법이며, Spring의 `@Component`, `@Service` 등의 annotation과는 다릅니다.
    - bean 이름은 class 이름의 첫 글자를 소문자로 바꾼 것이 기본값입니다.
        - `UserService` → `@userService`.

```java
// bean의 method를 호출하여 권한 검사
@PreAuthorize("@securityService.hasAccess(#userId)")
public User getUser(Long userId) { ... }

// bean에서 설정 값을 가져와 주입
@Value("#{@environment.getProperty('app.timeout')}")
private String timeout;

// bean의 method 결과를 cache key로 사용
@Cacheable(key = "@cacheKeyGenerator.generate(#user)")
public Result process(User user) { ... }
```

- bean 참조는 **proxy를 통해 호출되므로 AOP가 정상 적용**됩니다.
    - 같은 class 내에서 `this.method()`로 호출하면 proxy를 우회하여 `@Transactional` 등이 무시됩니다.
    - `@beanName.method()` 형식으로 호출하면 proxy를 경유하므로 AOP가 동작합니다.
    - Saga pattern 구현 시 보상 method를 bean 참조로 호출하는 이유입니다.

```java
// Self-Invocation 문제 해결 예시
@Compensatable(rollbackMethod = "@orderAdaptor.compensateSave(#orderId)")
public void save(Long orderId) { ... }

// @orderAdaptor를 통해 호출되므로 아래 method의 @Transactional이 정상 적용됨
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void compensateSave(Long orderId) { ... }
```


---


## Spring에서의 활용

- Spring은 다양한 annotation에서 SpEL을 지원하며, 동적 값 주입과 조건부 처리에 활용됩니다.


### @Value Annotation

- property 파일이나 표현식 값을 field에 주입합니다.

```java
@Value("${app.name}")                    // property 값 주입
private String appName;

@Value("#{systemProperties['user.home']}")  // system property 접근
private String userHome;

@Value("#{@userService.getDefaultUser()}")  // bean method 호출
private User defaultUser;

@Value("#{${app.timeout} * 1000}")          // 계산식 적용
private int timeoutMs;
```


### @Cacheable Annotation

- cache key를 동적으로 생성합니다.

```java
@Cacheable(value = "users", key = "#userId")
public User findById(Long userId) { ... }

@Cacheable(value = "users", key = "#user.id")
public User save(User user) { ... }

@Cacheable(value = "users", condition = "#userId > 10")
public User findById(Long userId) { ... }
```


### @PreAuthorize / @PostAuthorize Annotation

- method 수준의 보안 규칙을 정의합니다.

```java
@PreAuthorize("hasRole('ADMIN')")
public void deleteUser(Long id) { ... }

@PreAuthorize("#userId == authentication.principal.id")
public User getUser(Long userId) { ... }

@PostAuthorize("returnObject.owner == authentication.name")
public Document getDocument(Long id) { ... }
```


### @EventListener Annotation

- 조건부 event 처리를 정의합니다.

```java
@EventListener(condition = "#event.success")
public void handleSuccessEvent(OrderEvent event) { ... }
```


---


## 주의 사항

- SpEL은 강력하지만 **runtime에 평가되므로 compile 시점에 오류를 발견할 수 없습니다.**
    - 오타나 잘못된 property 참조가 있어도 실행 전까지 알 수 없습니다.
    - test code로 표현식이 올바르게 동작하는지 검증하는 것이 좋습니다.

- **복잡한 logic은 SpEL 대신 code로 작성**하는 것이 유지 보수에 유리합니다.
    - 표현식이 길어지면 가독성이 떨어지고 debugging이 어려워집니다.
    - 복잡한 조건은 별도 method로 분리하고 SpEL에서 호출하는 방식을 권장합니다.

- **사용자 입력을 SpEL 표현식에 직접 포함하면 보안 취약점**이 발생할 수 있습니다.
    - injection 공격에 노출될 수 있으므로, 사용자 입력은 반드시 검증하거나 변수로 전달해야 합니다.


---


## Reference

- <https://docs.spring.io/spring-framework/reference/core/expressions.html>

