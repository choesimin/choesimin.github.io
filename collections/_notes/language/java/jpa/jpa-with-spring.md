---
layout: note
permalink: /384
title: Spring Framework의 JPA를 위한 기능들 (Spring Data JPA)
description: Spring Framework의 JPA 추상화와 Spring Data JPA를 통해, repository pattern 기반의 data access layer를 구현하고, 선언적으로 transaction을 관리할 수 있습니다.
date: 2025-09-28
---


## JPA와 Spring Framework 통합

- Spring Framework는 JPA 사용을 위한 **강력한 추상화**와 **편의 기능**을 제공합니다.
    - **EntityManager** lifecycle 관리를 자동화하여 개발자가 직접 EntityManager를 생성하고 관리할 필요가 없습니다.
    - **DataSource** 설정과 **connection pool** 관리를 Spring Boot가 자동으로 처리합니다.
    - **JPA vendor adapter**를 통해 Hibernate, EclipseLink 등 다양한 JPA provider를 동일한 방식으로 사용할 수 있습니다.
    - **auto-configuration**으로 복잡한 XML 설정 없이도 annotation 기반의 간편한 설정이 가능합니다.

- **Spring Data JPA**를 통해 repository pattern을 쉽게 구현할 수 있습니다.
    - **interface 기반 개발**로 구현체를 작성하지 않고도 CRUD 기능을 자동으로 제공받을 수 있습니다.
    - **query method naming convention**을 통해 method 이름만으로 복잡한 query를 자동 생성할 수 있습니다.
    - **custom query** 작성 시 `@Query` annotation으로 JPQL이나 native SQL을 직접 정의할 수 있습니다.
    - **pagination과 sorting** 기능이 built-in으로 제공되어 대용량 data 처리가 간편합니다.

- **transaction 관리**와 **exception 처리**가 Spring container와 seamless하게 통합됩니다.
    - **declarative transaction management**로 `@Transactional` annotation만으로 transaction 경계를 정의할 수 있습니다.
    - **propagation과 isolation** 설정을 통해 세밀한 transaction 제어가 가능합니다.
    - **automatic exception translation**으로 JPA의 checked exception이 Spring의 unchecked `DataAccessException` hierarchy로 변환됩니다.
    - **rollback 조건**을 `rollbackFor` 속성으로 flexible하게 설정할 수 있습니다.


---


## Spring JPA 설정

- Spring 환경에서 JPA를 사용하기 위해서는 **DataSource**, **EntityManagerFactory**, **TransactionManager** 설정이 필요합니다.
- **Spring Boot**를 사용하면 **auto-configuration**을 통해 대부분의 설정이 자동으로 구성됩니다.
- **profile별 설정**을 통해 개발, 테스트, 운영 환경을 분리하여 관리할 수 있습니다.


### Spring Boot Auto-Configuration

- **starter dependency** : `spring-boot-starter-data-jpa`만 추가하면 필요한 모든 dependency가 자동으로 포함됩니다.
    - Hibernate, HikariCP, Spring Data JPA 등이 함께 설정됩니다.
    - version compatibility가 Spring Boot team에 의해 검증되어 dependency conflict 걱정이 없습니다.
    - 필요한 경우 특정 component의 version을 override할 수 있습니다.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```

- **application.yml 설정** : 간단한 property 설정만으로 JPA 환경을 구성할 수 있습니다.
    - DataSource auto-configuration이 database connection을 자동으로 설정합니다.
    - JPA properties를 통해 Hibernate 설정을 customize할 수 있습니다.
    - profile별로 다른 설정을 적용하여 환경을 분리할 수 있습니다.

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: user
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
    
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true
        jdbc.batch_size: 25
        order_inserts: true
        order_updates: true

# Profile별 설정
---
spring:
  config:
    activate:
      on-profile: dev
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: create-drop
```

- **entity scanning** : `@Entity` class들이 자동으로 scan되고 등록됩니다.
    - main application class가 있는 package와 그 하위 package의 entity들이 자동으로 검색됩니다.
    - `@EntityScan` annotation으로 scan 범위를 명시적으로 지정할 수 있습니다.
    - 여러 module로 구성된 project에서 특히 유용합니다.


---


## Spring Data JPA

- **Spring Data JPA**는 repository pattern을 기반으로 JPA를 더욱 쉽게 사용할 수 있게 해주는 framework입니다.
- **interface 기반 개발**을 통해 boilerplate code를 대폭 줄일 수 있습니다.
- **query method 자동 생성**과 **custom query 지원**으로 다양한 요구 사항을 만족시킬 수 있습니다.


### Repository Interface

- **JpaRepository 상속** : 기본적인 CRUD 기능이 자동으로 제공됩니다.
    - `save()`, `findById()`, `findAll()`, `delete()` 등의 method를 별도 구현 없이 사용할 수 있습니다.
    - pagination과 sorting 기능도 자동으로 제공됩니다.
    - batch operation을 위한 `saveAll()`, `deleteInBatch()` 등의 method도 포함됩니다.

```java
public interface UserRepository extends JpaRepository<User, Long> {
    // 기본 CRUD 메서드들이 자동 제공됨
    // save(), findById(), findAll(), delete() 등
}

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    
    public User createUser(User user) {
        return userRepository.save(user);
    }
    
    public Page<User> findAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, 
            Sort.by("createdAt").descending());
        return userRepository.findAll(pageable);
    }
}
```


### Query Method 자동 생성

- **method naming convention** : method 이름을 분석하여 적절한 JPQL을 자동 생성합니다.
    - `findBy`, `countBy`, `deleteBy` 등의 prefix를 사용합니다.
    - property name과 연산자를 조합하여 복잡한 조건도 표현할 수 있습니다.
    - compile time에 method signature가 검증되어 runtime error를 줄일 수 있습니다.

```java
public interface UserRepository extends JpaRepository<User, Long> {
    // 단일 조건 검색
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    
    // 복합 조건 검색
    List<User> findByUsernameAndEmail(String username, String email);
    List<User> findByUsernameOrEmail(String username, String email);
    
    // 비교 연산자
    List<User> findByAgeGreaterThan(int age);
    List<User> findByAgeBetween(int startAge, int endAge);
    
    // 문자열 검색
    List<User> findByUsernameContaining(String keyword);
    List<User> findByUsernameStartingWith(String prefix);
    
    // 정렬과 제한
    List<User> findTop10ByActiveOrderByCreatedAtDesc(boolean active);
    
    // 존재 여부 확인
    boolean existsByUsername(String username);
    long countByActive(boolean active);
}
```


### Custom Query

- **@Query annotation** : 복잡한 business logic이 포함된 query를 직접 작성할 수 있습니다.
    - JPQL이나 native SQL을 method에 직접 정의할 수 있습니다.
    - named parameter와 positional parameter를 모두 지원합니다.
    - SpEL을 활용하여 동적 query도 작성할 수 있습니다.

```java
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.username = :username AND u.active = :active")
    Optional<User> findByUsernameAndActive(@Param("username") String username, 
                                          @Param("active") boolean active);
    
    @Query("SELECT DISTINCT u FROM User u " +
           "JOIN FETCH u.orders o " +
           "WHERE o.status = :status")
    List<User> findUsersWithOrdersByStatus(@Param("status") OrderStatus status);
    
    @Query(value = "SELECT * FROM users u WHERE u.created_at > DATE_SUB(NOW(), INTERVAL ?1 DAY)", 
           nativeQuery = true)
    List<User> findUsersCreatedInLastDays(int days);
}
```

- **@Modifying annotation** : UPDATE나 DELETE query를 실행할 수 있습니다.
    - bulk operation을 통해 여러 record를 한 번에 처리할 수 있습니다.
    - `clearAutomatically` option으로 persistence context를 자동으로 정리할 수 있습니다.
    - `flushAutomatically` option으로 query 실행 전에 자동으로 flush할 수 있습니다.

```java
@Modifying
@Query("UPDATE User u SET u.active = :active WHERE u.lastLogin < :date")
int updateInactiveUsers(@Param("active") boolean active, @Param("date") LocalDateTime date);

@Modifying
@Query("DELETE FROM User u WHERE u.active = false AND u.createdAt < :date")
int deleteInactiveOldUsers(@Param("date") LocalDateTime date);
```


---


## Transaction 관리

- Spring의 **선언적 transaction 관리**를 통해 간단하고 안전한 transaction 처리가 가능합니다.
- **@Transactional annotation**으로 transaction 경계를 명확히 정의할 수 있습니다.
- **propagation**과 **isolation** 설정을 통해 복잡한 transaction 요구 사항을 만족시킬 수 있습니다.


### @Transactional 기본 사용법

- **method level transaction** : service layer의 method에 `@Transactional`을 적용하는 것이 일반적입니다.
    - method 시작 시 transaction이 자동으로 시작되고, 정상 종료 시 commit됩니다.
    - RuntimeException 발생 시 자동으로 rollback이 수행됩니다.
    - checked exception에 대해서는 `rollbackFor` 속성으로 rollback 조건을 지정할 수 있습니다.

```java
@Service
@Transactional(readOnly = true) // class level: 기본적으로 read-only
public class UserService {
    private final UserRepository userRepository;
    
    // Read-only method (class level 설정 사용)
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
    
    // Write method (method level에서 readOnly override)
    @Transactional
    public User createUser(User user) {
        validateUser(user);
        return userRepository.save(user);
    }
    
    @Transactional(rollbackFor = {BusinessException.class})
    public void processUserData(List<User> users) throws BusinessException {
        for (User user : users) {
            validateUser(user);
            userRepository.save(user);
        }
    }
}
```


### Transaction Propagation

- **propagation 유형** : 기존 transaction과의 관계를 정의하는 중요한 설정입니다.
    - `REQUIRED` (기본값) : 기존 transaction이 있으면 참여, 없으면 새로 생성.
    - `REQUIRES_NEW` : 항상 새로운 transaction 생성.
    - `SUPPORTS` : 기존 transaction이 있으면 참여, 없어도 실행.

```java
@Service
@Transactional
public class OrderProcessingService {
    
    // 기본 REQUIRED propagation
    public void processOrder(OrderRequest request) {
        Order order = orderService.createOrder(request);
        processPayment(order);
        updateInventory(order);
    }
    
    // REQUIRES_NEW: 독립적인 transaction
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logAuditEvent(String event, String details) {
        // 메인 transaction과 별개로 실행
        auditService.createAuditLog(event, details);
    }
}
```


### Read-Only Transaction 최적화

- **@Transactional(readOnly = true)** : 조회 전용 transaction의 성능을 최적화합니다.
    - Hibernate의 flush mode가 MANUAL로 변경되어 dirty checking이 비활성화됩니다.
    - database driver level에서도 read-only 최적화가 적용될 수 있습니다.
    - 여러 repository 호출이 하나의 transaction에서 일관된 data를 조회할 수 있습니다.

```java
@Service
@Transactional(readOnly = true)
public class UserQueryService {
    
    public UserDetailDto getUserDetails(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException("User not found"));
        
        // 같은 transaction 내에서 일관된 데이터 조회
        List<Order> orders = orderRepository.findByUserId(userId);
        long orderCount = orderRepository.countByUserId(userId);
        
        return UserDetailDto.builder()
            .user(user)
            .orders(orders)
            .orderCount(orderCount)
            .build();
    }
}
```


---


## Exception 처리

- Spring은 JPA의 **checked exception을 unchecked exception으로 변환**하여 일관된 exception hierarchy를 제공합니다.
- **@ControllerAdvice**와 함께 사용하여 **centralized exception handling**을 구현할 수 있습니다.
- **validation**과 **constraint violation**에 대한 체계적인 처리가 가능합니다.


### Exception Translation

- **automatic exception translation** : Spring이 JPA exception을 Spring exception으로 자동 변환합니다.
    - `PersistenceException`을 `DataAccessException`으로 변환하여 일관된 exception hierarchy를 제공합니다.
    - database vendor별 exception을 추상화하여 portable한 exception 처리가 가능합니다.

```java
// Mapping: JPA Exception -> Spring Exception
// EntityNotFoundException -> EmptyResultDataAccessException
// OptimisticLockException -> ObjectOptimisticLockingFailureException
// ConstraintViolationException -> DataIntegrityViolationException

@Service
@Transactional
public class UserService {
    
    public User findUserByUsername(String username) {
        try {
            return userRepository.findByUsername(username);
        } catch (EmptyResultDataAccessException e) {
            throw new UserNotFoundException("User not found: " + username);
        }
    }
}
```


### Global Exception Handling

- **@ControllerAdvice** : application 전체의 exception을 centralized하게 처리합니다.
    - JPA/Spring Data exception을 적절한 HTTP status code와 error response로 변환합니다.
    - validation error와 business exception을 일관된 format으로 처리합니다.

```java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleEntityNotFound(EntityNotFoundException e) {
        return ErrorResponse.builder()
            .error("ENTITY_NOT_FOUND")
            .message(e.getMessage())
            .timestamp(LocalDateTime.now())
            .build();
    }
    
    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleDataIntegrityViolation(DataIntegrityViolationException e) {
        String message = "Data integrity constraint violation";
        if (e.getCause() instanceof ConstraintViolationException) {
            message = parseConstraintViolation((ConstraintViolationException) e.getCause());
        }
        
        return ErrorResponse.builder()
            .error("DATA_INTEGRITY_VIOLATION")
            .message(message)
            .timestamp(LocalDateTime.now())
            .build();
    }
}
```


---


## Testing 지원

- Spring Boot는 JPA layer testing을 위한 **강력한 testing 지원**을 제공합니다.
- **@DataJpaTest**를 통해 JPA component만 isolated하게 test할 수 있습니다.
- **TestContainers**와 연동하여 실제 database를 사용한 integration test가 가능합니다.


### @DataJpaTest

- **JPA slice testing** : JPA 관련 component만 loading하여 빠른 test 실행이 가능합니다.
    - Spring Boot context의 JPA 관련 부분만 loading하여 test 시작 시간을 단축합니다.
    - 기본적으로 H2 in-memory database를 사용하여 test database 설정이 불필요합니다.
    - `TestEntityManager`를 통해 test에 특화된 entity 관리 기능을 사용할 수 있습니다.

```java
@DataJpaTest
class UserRepositoryTest {
    
    @Autowired
    private TestEntityManager testEntityManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void findByUsername_shouldReturnUser_whenUserExists() {
        // Given
        User user = User.builder()
            .username("john_doe")
            .email("john@example.com")
            .active(true)
            .build();
        
        testEntityManager.persistAndFlush(user);
        
        // When
        Optional<User> found = userRepository.findByUsername("john_doe");
        
        // Then
        assertThat(found).isPresent();
        assertThat(found.get().getEmail()).isEqualTo("john@example.com");
    }
    
    @Test
    void findByActiveTrue_shouldReturnOnlyActiveUsers() {
        // Given
        testEntityManager.persist(createUser("active_user", true));
        testEntityManager.persist(createUser("inactive_user", false));
        testEntityManager.flush();
        
        // When
        List<User> activeUsers = userRepository.findByActive(true);
        
        // Then
        assertThat(activeUsers).hasSize(1);
        assertThat(activeUsers.get(0).getUsername()).isEqualTo("active_user");
    }
    
    private User createUser(String username, boolean active) {
        return User.builder()
            .username(username)
            .email(username + "@example.com")
            .active(active)
            .build();
    }
}
```


---


## 성능 최적화

- **lazy loading과 eager loading**을 적절히 조합하여 N+1 문제를 해결할 수 있습니다.
- **batch processing**과 **bulk operation**을 통해 대용량 data 처리 성능을 향상시킬 수 있습니다.
- **query 최적화**와 **cache 활용**으로 application 성능을 극대화할 수 있습니다.


### N+1 문제 해결

- **JOIN FETCH** : 연관된 entity를 한 번의 query로 함께 조회합니다.
    - `@Query`와 `JOIN FETCH`를 사용하여 필요한 연관 entity만 선택적으로 loading합니다.
    - `@EntityGraph`를 사용하여 더 선언적인 방식으로 fetch strategy를 정의할 수 있습니다.

```java
public interface UserRepository extends JpaRepository<User, Long> {
    
    @Query("SELECT DISTINCT u FROM User u JOIN FETCH u.orders WHERE u.active = true")
    List<User> findActiveUsersWithOrders();
    
    @EntityGraph(attributePaths = {"orders", "profile"})
    List<User> findByActive(boolean active);
}
```


### Batch Processing

- **Spring Batch와 integration** : 대용량 data 처리를 위한 batch processing이 가능합니다.
    - `@Modifying` query를 사용하여 bulk update/delete operation을 수행합니다.
    - pagination을 활용하여 memory 효율적인 대용량 data 처리가 가능합니다.

```java
@Service
@Transactional
public class BatchUserService {
    
    @Modifying
    @Query("UPDATE User u SET u.status = :newStatus WHERE u.lastLogin < :cutoffDate")
    int updateInactiveUsers(@Param("newStatus") UserStatus newStatus, 
                           @Param("cutoffDate") LocalDateTime cutoffDate);
    
    public void processBatchUsers(int batchSize) {
        int page = 0;
        Page<User> userPage;
        
        do {
            Pageable pageable = PageRequest.of(page, batchSize);
            userPage = userRepository.findByActive(false, pageable);
            
            userPage.getContent().forEach(this::processUser);
            page++;
            
        } while (userPage.hasNext());
    }
}
```


---


## Reference

- <https://spring.io/projects/spring-data-jpa>
- <https://docs.spring.io/spring-data/jpa/docs/current/reference/html/>
- <https://spring.io/guides/gs/accessing-data-jpa/>
- <https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html#orm-jpa>

