---
layout: note
permalink: /277
title: "@Transactional Best Practices - Spring Transaction 사용 권장 사항"
description: "Spring의 @Transactional을 안전하고 효과적으로 사용하기 위해, service layer에만 적용, readOnly 설정, transaction 범위 최소화 등의 다양한 권장 사항을 따르는 것이 좋습니다."
date: 2025-12-01
---


## @Transactional Best Practices

- Spring transaction을 안전하고 효과적으로 사용하기 위해, 몇 가지 best practice를 따르는 것이 좋습니다.

1. service layer에만 `@Transactional`을 적용합니다.
2. 모든 조회 method에 `readOnly = true`를 설정합니다.
3. transaction 범위를 최소화합니다.
4. exception 처리를 명시적으로 합니다.
5. self-invocation 문제를 해결합니다.
6. lazy loading을 transaction 범위 내에서만 사용합니다.
7. 적절한 propagation을 설정합니다.
8. 필요시 timeout을 설정합니다.
9. isolation level은 신중히 선택합니다.
10. logging과 monitoring으로 transaction을 추적합니다.
11. Spring Data JPA를 최대한 활용합니다.


---


## 1. Service Layer에만 @Transactional 적용

- `@Transactional`은 service layer의 business logic method에만 적용하는 것이 best practice입니다.

- controller에는 `@Transactional`을 적용하면 안 됩니다.
    - controller는 HTTP 요청/응답만 담당해야 합니다.
    - transaction 경계를 명확히 하기 위해 service layer에서만 관리합니다.

```java
// 잘못된 예
@Controller
public class UserController {
    @Transactional
    public ResponseEntity<User> createUser(User user) {
        // ...
    }
}

// 올바른 예
@Controller
public class UserController {
    @Autowired
    private UserService userService;

    public ResponseEntity<User> createUser(User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }
}

@Service
public class UserService {
    @Transactional
    public User createUser(User user) {
        return userRepository.save(user);
    }
}
```

- controller는 service를 호출하고 service에서 transaction을 관리합니다.

- repository에는 `@Transactional`을 적용하면 안 됩니다.
    - repository는 순수한 data access만 담당해야 합니다.
    - transaction은 service layer에서 선언적으로 관리합니다.

```java
// 잘못된 예
@Repository
public class UserRepository {
    @Transactional
    public User save(User user) {
        // ...
    }
}

// 올바른 예
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}

@Service
public class UserService {
    @Transactional
    public User createUser(User user) {
        return userRepository.save(user);
    }
}
```

- repository의 모든 method는 service의 transaction 범위 내에서 실행됩니다.


---


## 2. 조회 Method에는 readOnly = true 설정

- 조회만 수행하는 모든 method에는 반드시 `readOnly = true`를 설정해야 합니다.

```java
@Service
public class UserService {
    @Transactional(readOnly = true)
    public UserDto getUserById(Long id) {
        return new UserDto(userRepository.findById(id).orElseThrow());
    }

    @Transactional(readOnly = true)
    public List<UserDto> searchUsers(String keyword) {
        return userRepository.findByNameContaining(keyword)
                .stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDto updateUser(Long id, UpdateRequest request) {
        User user = userRepository.findById(id).orElseThrow();
        user.update(request);
        return new UserDto(userRepository.save(user));
    }
}
```

- `readOnly = true`를 설정하면 Hibernate의 dirty checking과 flush가 생략되어 성능이 향상됩니다.
- 의도하지 않은 data 수정을 방지하는 안전 장치 역할을 합니다.
- 조회와 쓰기 logic을 명확히 구분할 수 있습니다.


---


## 3. Transaction 범위를 최소화

- transaction은 필요한 최소한의 범위만 포함하도록 설정해야 합니다.

```java
// 잘못된 예
@Service
public class OrderService {
    @Transactional
    public void processOrder(Order order) {
        orderRepository.save(order);
        paymentGateway.charge(order);
        emailService.send(order);
    }
}

// 올바른 예
@Service
public class OrderService {
    @Transactional
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public void processOrder(Order order) {
        Order saved = saveOrder(order);
        paymentGateway.charge(saved);
        emailService.send(saved);
    }
}
```

- database operation만 transaction에 포함시킵니다.
- 외부 API 호출이나 network 작업은 transaction 밖에서 수행합니다.
- transaction 범위가 짧을수록 concurrency와 performance가 개선됩니다.


---


## 4. 명시적으로 Exception 처리

- checked exception과 unchecked exception의 차이를 이해하고 명시적으로 처리해야 합니다.

```java
@Service
public class PaymentService {
    @Transactional(rollbackFor = PaymentException.class)
    public void processPayment(Order order) throws PaymentException {
        try {
            paymentGateway.charge(order);
        } catch (PaymentGatewayException e) {
            throw new PaymentException("Payment failed", e);
        }
    }

    @Transactional
    public void saveOrderWithValidation(Order order) {
        if (order.getAmount() <= 0) {
            throw new InvalidOrderException("Invalid amount");
        }
        orderRepository.save(order);
    }

    @Transactional(noRollbackFor = DuplicateOrderException.class)
    public void createOrderWithCheck(Order order) {
        try {
            orderRepository.save(order);
        } catch (DataIntegrityViolationException e) {
            auditLog.recordDuplicate(order);
            throw new DuplicateOrderException("Order already exists");
        }
    }
}
```

- business rule 위반은 unchecked exception으로 처리합니다.
- 기본 동작을 override할 때는 명시적으로 `rollbackFor`나 `noRollbackFor`를 설정합니다.
- exception handling의 의도를 code로 명확히 표현합니다.


---


## 5. Self-Invocation 문제 해결

- 같은 class 내에서 `@Transactional` method를 호출할 때 문제가 발생합니다.

```java
// 잘못된 예
@Service
public class OrderService {
    public void createOrder(Order order) {
        saveOrder(order);
    }

    @Transactional
    public void saveOrder(Order order) {
        orderRepository.save(order);
    }
}

// 올바른 예 1 : Service 분리
@Service
public class OrderService {
    @Autowired
    private OrderSaveService orderSaveService;

    public void createOrder(Order order) {
        orderSaveService.saveOrder(order);
    }
}

@Service
public class OrderSaveService {
    @Transactional
    public void saveOrder(Order order) {
        orderRepository.save(order);
    }
}

// 올바른 예 2 : Caller에 @Transactional 추가
@Service
public class OrderService {
    @Transactional
    public void createOrder(Order order) {
        saveOrder(order);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void saveOrder(Order order) {
        orderRepository.save(order);
    }
}
```

- 다른 service로 분리하는 방법이 가장 권장됩니다.
- 불가피한 경우 caller에 `@Transactional`을 추가합니다.


---


## 6. Lazy Loading을 Transaction 범위 내에서만 사용

- JPA의 lazy loading은 transaction 범위 내에서만 동작합니다.

```java
// 잘못된 예
@Service
public class PostService {
    @Transactional(readOnly = true)
    public PostDto getPost(Long id) {
        Post post = postRepository.findById(id).orElseThrow();
        return new PostDto(post);
    }
}

@RestController
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping("/posts/{id}")
    public ResponseEntity<PostDto> getPost(@PathVariable Long id) {
        PostDto post = postService.getPost(id);
        post.getComments().size();
        return ResponseEntity.ok(post);
    }
}

// 올바른 예 1 : Service에서 lazy loading
@Service
public class PostService {
    @Transactional(readOnly = true)
    public PostDto getPost(Long id) {
        Post post = postRepository.findById(id).orElseThrow();
        int commentCount = post.getComments().size();
        return new PostDto(post, commentCount);
    }
}

// 올바른 예 2 : Fetch join 사용
@Service
public class PostService {
    @Transactional(readOnly = true)
    public PostDto getPost(Long id) {
        Post post = postRepository.findWithComments(id);
        return new PostDto(post);
    }
}
```

- service에서 필요한 모든 data를 load해야 합니다.
- 또는 fetch join을 사용하여 미리 필요한 data를 함께 조회합니다.
- lazy loading이 필요하면 transaction 범위를 확장합니다.


---


## 7. 적절한 Propagation 설정

- transaction 전파 방식을 상황에 맞게 설정해야 합니다.

```java
@Service
public class OrderService {
    @Transactional
    public void createOrder(Order order) {
        orderRepository.save(order);
        paymentService.processPayment(order);
    }
}

@Service
public class AuditService {
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logOrderCreation(Order order) {
        auditLogRepository.save(new AuditLog(order));
    }
}

@Service
public class CacheService {
    @Transactional(propagation = Propagation.SUPPORTS)
    public User getUser(Long id) {
        return userCache.getOrLoad(id);
    }
}
```

- `REQUIRED`는 기본값으로 대부분의 service method에서 사용합니다.
- 독립적으로 처리되어야 하는 작업(audit, logging)은 `REQUIRES_NEW`를 사용합니다.
- 조회나 utility method는 `SUPPORTS`를 사용할 수 있습니다.


---


## 8. Timeout 설정

- 예측 불가능하게 오래 실행될 수 있는 작업에는 timeout을 설정해야 합니다.

```java
@Service
public class ReportService {
    @Transactional(timeout = 10)
    public ReportDto generateQuickReport(ReportRequest request) {
        return externalReportService.generate(request);
    }

    @Transactional(timeout = 120, readOnly = true)
    public List<AnalyticsDto> generateAnalyticsReport(int month) {
        return analyticsRepository.findComplexAnalytics(month);
    }

    @Transactional(timeout = -1)
    public void adminBulkImport(File file) {
        List<Record> records = parseFile(file);
        records.forEach(record -> recordRepository.save(record));
    }
}
```

- API 호출이 포함되는 작업은 적절한 timeout을 설정합니다.
- 대량 data 처리는 충분한 timeout을 제공합니다.
- 필요 없는 경우 기본값(`-1`)을 사용합니다.


---


## 9. Transaction 격리 수준 신중히 선택

- 대부분의 경우 database 기본값을 사용하며, 특수한 경우에만 override합니다.

```java
@Service
public class UserService {
    @Transactional
    public void updateUser(User user) {
        userRepository.save(user);
    }
}

@Service
public class ReservationService {
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void reserveSeat(Long showId, int seatNumber) {
        Seat seat = seatRepository.findByShowIdAndNumber(showId, seatNumber);
        if (seat.isAvailable()) {
            seat.reserve();
            seatRepository.save(seat);
        }
    }
}

@Service
public class StatisticsService {
    @Transactional(isolation = Isolation.READ_UNCOMMITTED, readOnly = true)
    public int getApproximateUserCount() {
        return userRepository.count();
    }
}
```

- 대부분의 경우 database의 기본값(`READ_COMMITTED`)으로 충분합니다.
- isolation level을 높이면 performance가 저하되므로 필요한 경우에만 사용합니다.
- 격리 수준을 높여야 한다면 database와 application level에서의 동시성 제어를 함께 고려합니다.


---


## 10. 충분한 Logging과 Monitoring

- transaction 동작을 파악하기 위해 적절한 logging과 monitoring을 설정해야 합니다.

```properties
logging.level.org.springframework.transaction=DEBUG
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

```java
@Service
@Slf4j
public class OrderService {
    @Transactional
    public void createOrder(Order order) {
        log.info("Starting order creation: {}", order.getId());

        try {
            orderRepository.save(order);
            log.info("Order saved successfully: {}", order.getId());

            paymentService.processPayment(order);
            log.info("Payment processed successfully: {}", order.getId());
        } catch (Exception e) {
            log.error("Order creation failed: {}", order.getId(), e);
            throw e;
        }
    }
}
```

- transaction 시작/commit/rollback을 log로 추적합니다.
- 실행 시간이 오래 걸리는 method를 monitoring합니다.
- exception 발생 시 충분한 context 정보를 logging합니다.


---


## 11. Spring Data JPA Repository를 활용

- Spring Data JPA의 기능을 최대한 활용하여 불필요한 code를 줄여야 합니다.

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByAgeGreaterThan(int age);
    long countByStatus(String status);
}

@Service
public class UserService {
    @Transactional
    public User createUser(CreateUserRequest request) {
        User user = new User(request);
        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public UserDto getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(UserDto::new)
                .orElseThrow();
    }
}
```

- repository interface만 정의하면 Spring이 구현체를 제공합니다.
- query method naming convention을 활용합니다.
- 복잡한 query는 `@Query`로 명시합니다.


---


## Reference

- <https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html#transaction>
- <https://spring.io/guides/gs/managing-transactions/>
- <https://docs.spring.io/spring-data/jpa/docs/current/reference/html/>

