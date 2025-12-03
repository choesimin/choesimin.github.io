---
layout: note
permalink: /279
title: "@Transactional Self-Invocation 문제"
description: 같은 class 내부에서 @Transactional method를 호출할 때 transaction이 적용되지 않는 문제는 Spring AOP의 proxy 기반 구현 방식으로 인해 발생합니다.
date: 2025-12-03
---


## @Transactional Self-Invocation : Proxy 기반 AOP의 제약

- `@Transactional` annotation이 붙은 method를 같은 class 내부에서 호출할 때 transaction이 적용되지 않는 문제입니다.
    - Spring AOP의 proxy 기반 구현 방식으로 인해 발생합니다.
    - 같은 class 내부에서 `this.method()` 형태로 호출하면 proxy를 거치지 않기 때문입니다.

- Spring은 `@Transactional` annotation을 처리하기 위해 proxy 객체를 생성합니다.
    - client가 bean을 주입받을 때 실제 객체가 아닌 proxy 객체를 받습니다.
    - proxy 객체는 외부에서 method 호출 시 transaction 처리 logic을 먼저 수행한 후 실제 객체의 method를 호출합니다.

- 하지만 같은 class 내부에서 `this.method()` 형태로 호출하면 proxy를 거치지 않습니다.
    - `this`는 proxy 객체가 아닌 실제 객체 자신을 가리킵니다.
    - proxy의 transaction 처리 logic이 실행되지 않아 transaction이 적용되지 않습니다.

```java
@Service
public class UserService {

    public void updateUser(Long userId) {
        // transaction이 적용되지 않음
        this.updateUserInternal(userId);
    }

    @Transactional
    public void updateUserInternal(Long userId) {
        // transaction이 적용되어야 하지만 self-invocation으로 인해 적용되지 않음
        userRepository.save(user);
    }
}
```

- `updateUser()`에서 `updateUserInternal()`을 호출할 때 `this`를 통해 호출합니다.
- `this`는 proxy가 아닌 실제 객체를 가리킵니다.
- `@Transactional`이 선언되어 있어도 transaction이 시작되지 않습니다.


---


## Self-Invocation 해결 방법

- 가능하면 별도 class로 분리하는 방법을 사용합니다.
    - 가장 명확하고 유지보수하기 좋은 해결책입니다.

- class 설계 시 transaction 경계를 명확히 하고 self-invocation이 발생하지 않도록 구조를 설계합니다.
    - self-invocation이 필요한 경우 설계를 재검토합니다.
    - Transaction 단위와 business logic 단위를 일치시키는 것이 좋습니다.

- `@Transactional`은 public method에만 적용되므로 private method에 선언하지 않습니다.
    - private method는 외부에서 호출할 수 없어 proxy가 동작하지 않습니다.


### 1. 별도 Class로 분리

- transaction이 필요한 method를 별도 class로 분리합니다.
    - Spring이 관리하는 bean을 주입받아 호출하면 proxy를 통해 호출됩니다.

```java
@Service
public class UserService {

    private final UserTransactionService userTransactionService;

    public void updateUser(Long userId) {
        // proxy를 통해 호출되어 transaction 적용됨
        userTransactionService.updateUserInternal(userId);
    }
}

@Service
public class UserTransactionService {

    @Transactional
    public void updateUserInternal(Long userId) {
        userRepository.save(user);
    }
}
```

- 가장 명확하고 권장되는 방법입니다.
    - class의 책임을 분리하는 효과도 있습니다.
    - 설계적으로도 더 명확한 구조를 만들 수 있습니다.


### 2. Self-injection 사용

- 자기 자신을 주입받아 호출합니다.
    - 주입받은 객체는 proxy이므로 transaction이 적용됩니다.

```java
@Service
public class UserService {

    private final UserService self;

    public UserService(UserService self) {
        this.self = self;
    }

    public void updateUser(Long userId) {
        // proxy를 통해 호출되어 transaction 적용됨
        self.updateUserInternal(userId);
    }

    @Transactional
    public void updateUserInternal(Long userId) {
        userRepository.save(user);
    }
}
```

- Spring 4.3부터 순환 참조 없이 self-injection이 가능합니다.
    - 구조적으로 명확하지 않아 권장되지 않습니다.
    - 자기 자신을 주입받는 것이 직관적이지 않습니다.


### 3. AopContext 사용

- Spring AOP의 `AopContext`를 통해 현재 proxy 객체를 가져옵니다.
    - `@EnableAspectJAutoProxy(exposeProxy = true)` 설정이 필요합니다.

```java
@Configuration
@EnableAspectJAutoProxy(exposeProxy = true)
public class AopConfig {
}

@Service
public class UserService {

    public void updateUser(Long userId) {
        // AopContext를 통해 proxy 객체를 가져와서 호출
        ((UserService) AopContext.currentProxy()).updateUserInternal(userId);
    }

    @Transactional
    public void updateUserInternal(Long userId) {
        userRepository.save(user);
    }
}
```

- Spring AOP에 대한 의존성이 code에 명시적으로 드러납니다.
    - type casting이 필요하고 가독성이 떨어집니다.
    - business logic에 infrastructure code가 침투합니다.
    - 권장되지 않습니다.


### 4. AspectJ weaving 사용

- compile time 또는 load time weaving을 사용하면 proxy 대신 bytecode 조작으로 AOP를 적용합니다.
    - self-invocation 문제가 발생하지 않습니다.
    - proxy를 거치지 않아도 transaction이 적용됩니다.

```java
@Configuration
@EnableTransactionManagement(mode = AdviceMode.ASPECTJ)
public class TransactionConfig {
}

@Service
public class UserService {

    public void updateUser(Long userId) {
        // AspectJ weaving으로 transaction 적용됨
        this.updateUserInternal(userId);
    }

    @Transactional
    public void updateUserInternal(Long userId) {
        userRepository.save(user);
    }
}
```

- 추가 설정과 build 과정 변경이 필요합니다.
    - AspectJ compiler 또는 load time weaver 설정이 필요합니다.
    - build 과정이 복잡해지고 학습 곡선이 있습니다.
    - 대부분의 경우 과도한 방법입니다.


---


## Reference

- <https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html>
- <https://docs.spring.io/spring-framework/reference/core/aop/proxying.html>

