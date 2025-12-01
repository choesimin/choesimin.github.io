---
layout: note
permalink: /276
title: "@Transactional - Spring의 선언적 Transaction 관리"
description: "@Transactional은 Spring에서 제공하는 선언적 transaction 관리 annotation으로, AOP를 기반으로 method 실행 전후로 transaction을 자동으로 시작하고 commit 또는 rollback하는 mechanism을 제공합니다."
date: 2025-12-01
---


## @Transactional Annotation

- `@Transactional`은 Spring에서 transaction 경계를 선언적으로 정의하는 annotation입니다.
- method나 class level에서 사용하여, 해당 범위의 code 실행 시 transaction이 자동으로 관리됩니다.
- Spring AOP를 기반으로 동작하며, proxy object가 transaction 시작, commit, rollback을 처리합니다.
- programming 방식의 transaction 관리(`TransactionTemplate`)와 달리, 선언적 방식으로 code를 간결하게 유지할 수 있습니다.


### 기본 동작 원리

- Spring이 `@Transactional`이 적용된 bean을 proxy로 감싸서, method 호출 전후에 transaction logic을 삽입합니다.
- method 호출이 들어오면 Spring의 transaction interceptor가 먼저 실행되고, transaction이 시작됩니다.
- 실제 method가 실행되며, method가 정상 종료되면 commit되고 exception이 발생하면 rollback됩니다.
- **Checked Exception**은 기본적으로 commit되고, **Unchecked Exception(RuntimeException)**은 기본적으로 rollback됩니다.
- `rollbackFor`, `noRollbackFor` attribute로 exception별 동작을 customizing할 수 있습니다.


### 사용 범위

- **Method Level**에서는 개별 method마다 transaction 설정을 다르게 할 수 있으며, 가장 세밀한 제어가 가능합니다.
    - 일반적으로 service layer의 business logic method에 적용합니다.

```java
// Method Level @Transactional 적용 예시
@Service
public class UserService {
    @Transactional
    public void createUser(User user) {
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public User getUser(Long id) {
        return userRepository.findById(id);
    }
}
```

- **Class Level**에서는 class의 모든 public method에 동일한 transaction 설정이 적용됩니다.
    - method level의 annotation이 class level을 override합니다.
    - class 내 모든 method가 동일한 transaction 정책을 따를 때 유용합니다.

```java
// Class Level @Transactional 적용 예시
@Service
@Transactional
public class OrderService {
    public void placeOrder(Order order) {
        orderRepository.save(order);
    }

    public Order getOrder(Long id) {
        return orderRepository.findById(id);
    }
}
```


---


## 주요 Attribute

- Spring의 `@Transactional` annotation은 다양한 attribute를 제공하여 transaction 동작을 세밀하게 제어할 수 있습니다.


### `propagation` : Transaction 전파

- transaction이 중첩되어 호출될 때, 기존 transaction을 이어받을지 새로 시작할지를 결정합니다.
- 기본값은 `Propagation.REQUIRED`입니다.

```java
// Propagation 예시
@Service
public class PaymentService {
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void processPayment(Payment payment) {
        paymentRepository.save(payment);
    }
}
```

- `REQUIRED` : 기존 transaction이 있으면 이어받고, 없으면 새로 시작합니다.
- `REQUIRES_NEW` : 항상 새로운 transaction을 시작하며, 기존 transaction은 suspend됩니다.
- `SUPPORTS` : 기존 transaction이 있으면 이어받고, 없으면 non-transactional하게 실행됩니다.
- `NOT_SUPPORTED` : transaction 없이 실행하며, 기존 transaction이 있으면 suspend합니다.
- `MANDATORY` : 반드시 기존 transaction 내에서만 실행되어야 하며, 없으면 exception을 발생시킵니다.
- `NEVER` : transaction 없이만 실행되어야 하며, 기존 transaction이 있으면 exception을 발생시킵니다.
- `NESTED` : 기존 transaction 내에 중첩된 transaction을 생성합니다.
    - 일부 database에서만 지원합니다.


### `isolation` : Isolation Level

- isolation level은 동시에 실행되는 여러 transaction 간의 격리 수준을 설정합니다.
- isolation level이 높을수록 consistency는 보장되지만 동시성이 떨어지고, 낮을수록 동시성이 높지만 consistency 문제가 발생할 수 있습니다.
- 기본값은 `Isolation.DEFAULT`(database 기본값)입니다.

```java
// Isolation Level 예시
@Service
public class InventoryService {
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void updateStock(Product product, int quantity) {
        product.setStock(product.getStock() + quantity);
        productRepository.save(product);
    }
}
```

- `READ_UNCOMMITTED` : 가장 낮은 격리 수준으로, dirty read, non-repeatable read, phantom read 모두 발생할 수 있습니다.
- `READ_COMMITTED` : dirty read는 방지하지만, non-repeatable read와 phantom read는 발생할 수 있습니다.
- `REPEATABLE_READ` : dirty read와 non-repeatable read는 방지하지만, phantom read는 발생할 수 있습니다.
- `SERIALIZABLE` : 가장 높은 격리 수준으로 모든 synchronization issue를 방지합니다.


### `timeout` : Transaction 시간 제한

- timeout은 transaction이 완료되어야 하는 최대 시간 (초 단위)을 지정합니다.
- 시간을 초과하면 transaction이 자동으로 rollback되며, `TransactionTimedOutException`이 발생합니다.
- 기본값은 `-1`(제한 없음)입니다.

```java
// Timeout 예시
@Service
public class OrderService {
    @Transactional(timeout = 30)
    public void processOrder(Order order) {
        orderRepository.save(order);
    }
}
```

- 오래 실행되는 query나 외부 API call을 포함하는 transaction에 timeout을 설정하여 resource 낭비를 방지합니다.


### `readOnly` : 읽기 전용 Transaction

- **읽기 전용 작업**에는 `readOnly = true`를 설정하면 Spring과 database가 최적화를 수행합니다.
- 기본값은 `false`입니다.

```java
// Read-Only 예시
@Service
public class ReportService {
    @Transactional(readOnly = true)
    public SalesReport generateMonthlySalesReport(int month) {
        List<Order> orders = orderRepository.findByMonth(month);
        return calculateReport(orders);
    }
}
```

- Hibernate는 snapshot을 저장하지 않아 memory 사용량이 감소합니다.
- dirty checking이 수행되지 않아 성능이 향상됩니다.
- database에 read-only hint를 전달하여 database level의 최적화도 가능합니다.
- 실수로 data를 변경하는 것을 방지하는 안전 장치 역할을 합니다.
- 조회만 수행하는 method에는 항상 `readOnly = true`를 설정하는 것이 best practice입니다.


### `rollbackFor` / `noRollbackFor` : Exception별 Rollback 규칙

- `rollbackFor`는 지정된 exception이 발생하면 rollback됩니다.
    - checked exception도 rollback하고 싶을 때 사용합니다.
    - `@Transactional(rollbackFor = Exception.class)`를 사용하면 모든 exception에 대해 rollback됩니다.

```java
// rollbackFor 예시
@Service
public class FileService {
    @Transactional(rollbackFor = IOException.class)
    public void readFile(String path) throws IOException {
        // IOException은 checked exception입니다.
    }
}
```

- `noRollbackFor`는 지정된 exception은 발생해도 rollback하지 않습니다.
    - 특정 exception은 의도적으로 handling하고 commit하고 싶을 때 사용합니다.
    - `@Transactional(noRollbackFor = InvalidDataException.class)`를 사용하면 해당 exception 발생 시에도 commit됩니다.

```java
// noRollbackFor 예시
@Service
public class DataService {
    @Transactional(noRollbackFor = InvalidDataException.class)
    public void processData(Data data) throws InvalidDataException {
        if (!data.isValid()) {
            throw new InvalidDataException("Data is invalid");
        }
        dataRepository.save(data);
    }
}
```

- 기본 규칙보다 명시적(explicit)으로 기재하는 것이 code 의도를 명확하게 드러냅니다.


---


## Spring Transaction Manager와의 관계

- `@Transactional`이 동작하려면 **PlatformTransactionManager** bean이 등록되어 있어야 합니다.

```java
// Transaction Manager 설정 예시
@Configuration
@EnableTransactionManagement
public class AppConfig {
    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}
```

- Spring Boot는 auto-configuration을 통해 application의 설정에 맞는 transaction manager를 자동으로 등록합니다.
    - JPA 사용 시에는 `JpaTransactionManager`가 등록됩니다.
    - JDBC 사용 시에는 `DataSourceTransactionManager`가 등록됩니다.
    - 여러 data source 사용 시에는 custom `@Primary` bean으로 기본 transaction manager를 지정해야 합니다.

```java
// Multiple DataSources 예시
@Configuration
public class MultiDataSourceConfig {
    @Bean
    @Primary
    public PlatformTransactionManager primaryTransactionManager(
            @Qualifier("primaryDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean
    public PlatformTransactionManager secondaryTransactionManager(
            @Qualifier("secondaryDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}
```

- `@EnableTransactionManagement` annotation으로 `@Transactional` support를 명시적으로 활성화할 수 있습니다.
    - Spring Boot는 기본적으로 자동 활성화하므로 대부분의 경우 추가 설정이 필요 없습니다.


---


## 주의 사항

- **self-invocation 문제** : 같은 class 내에서 `@Transactional` method를 호출하면, proxy를 거치지 않아 transaction이 적용되지 않습니다.
    - 다른 bean을 주입받아 호출하거나, method를 분리하여 해결합니다.

- **interface 기반 proxy** : class 기반 proxy(CGLIB)를 사용하는 경우, `@Transactional`이 interface에만 정의되어 있으면 동작하지 않을 수 있습니다.

- **private method 미지원** : `@Transactional`은 public method에만 적용되며, private method는 proxy를 거치지 않으므로 transaction이 적용되지 않습니다.

- **exception 처리** : method 내에서 exception을 catch하면 rollback이 발생하지 않으므로, exception을 properly propagate하여 Spring이 catch하도록 해야 합니다.


---


## Reference

- <https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html#transaction>
- <https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/annotation/Transactional.html>

