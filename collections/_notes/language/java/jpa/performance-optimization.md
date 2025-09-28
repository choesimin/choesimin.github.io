---
layout: note
permalink: /383
title: JPA 성능 최적화하기 (N+1 해결, Fetch 전략, Cache 활용)
description: JPA는 개발 생산성을 높이지만 잘못 사용하면 심각한 성능 문제를 야기하기 때문에, N+1 query 해결, 적절한 fetch 전략, cache 활용 등, 체계적인 성능 최적화 전략이 필요합니다.
date: 2025-09-28
---


## JPA 성능 최적화

- JPA는 개발 생산성을 크게 향상시키지만, **잘못 사용하면 심각한 성능 문제**를 야기할 수 있습니다.
- **N+1 query**, **불필요한 data loading**, **비효율적인 cache 사용** 등이 주요 성능 저해 요소입니다.
    - 따라서 JPA 성능 최적화는 **N+1 query 해결**, **적절한 fetch 전략**, **cache 활용**이 핵심입니다.
- **monitoring과 profiling**을 통해 성능 병목 지점을 정확히 파악해야 합니다.
    - **체계적인 접근**을 통해 단계별로 성능을 개선하고, **지속적인 monitoring**으로 성능을 유지해야 합니다.
- **database schema 설계**와 **query 최적화**도 JPA 성능에 큰 영향을 미칩니다.


### JPA 성능 문제의 주요 원인

- **ORM 추상화의 부작용** : 개발자가 실제 실행되는 SQL을 인지하지 못해 비효율적인 query가 생성됩니다.
    - 간단해 보이는 객체 탐색이 수십 개의 SQL을 실행할 수 있습니다.
    - lazy loading과 eager loading의 잘못된 설정이 성능 문제를 유발합니다.
    - entity 연관 관계 탐색 시 예상치 못한 추가 query가 실행됩니다.

- **persistence context 오용** : entity lifecycle 관리의 오해로 인한 성능 저하가 발생합니다.
    - 장시간 유지되는 persistence context로 인한 memory 누수가 발생할 수 있습니다.
    - 대용량 data 처리 시 1차 cache가 오히려 성능을 저하시킬 수 있습니다.
    - dirty checking overhead가 read-heavy application에서 불필요한 부담을 줍니다.

- **database 설계와의 불일치** : JPA mapping과 database 최적화 간의 mismatch가 문제를 야기합니다.
    - 객체 지향 설계와 관계형 database 최적화 사이의 trade-off를 고려해야 합니다.
    - index 설계와 JPA query pattern이 맞지 않아 성능이 저하될 수 있습니다.
    - 정규화된 schema와 JPA의 object graph 탐색이 충돌할 수 있습니다.


### 성능 최적화 전략

- **측정 기반 최적화** : 추측이 아닌 실제 측정 data를 바탕으로 최적화를 수행해야 합니다.
    - SQL logging을 통해 실제 실행되는 query를 확인하고 분석합니다.
    - application performance monitoring을 통해 bottleneck을 정확히 파악합니다.
    - load testing을 통해 실제 운영 환경과 유사한 조건에서 성능을 검증합니다.

- **단계별 접근** : 가장 효과가 큰 최적화부터 단계적으로 적용합니다.
    - N+1 query 해결을 최우선으로 하여 가장 큰 성능 향상을 달성합니다.
    - fetch 전략 최적화를 통해 불필요한 data loading을 제거합니다.
    - cache 적용으로 반복적인 database 접근을 줄입니다.

- **지속적인 관리** : 성능 최적화는 일회성이 아닌 지속적인 관리가 필요합니다.
    - 정기적인 performance review를 통해 성능 regression을 방지합니다.
    - 새로운 기능 개발 시 성능 영향도를 사전에 검토합니다.
    - monitoring alert을 설정하여 성능 문제를 조기에 발견하고 대응합니다.


---


## N+1 Query 문제 해결

- **N+1 query 문제**는 JPA 사용 시 가장 흔히 발생하는 성능 문제입니다.
- 연관 entity 조회 시 예상보다 많은 query가 실행되는 현상으로, **심각한 성능 저하**를 초래할 수 있습니다.
- **fetch join**, **batch fetching**, **entity graph** 등 다양한 해결 방법을 상황에 맞게 선택해야 합니다.


### N+1 Query 발생 원인과 문제점

- **lazy loading의 부작용** : 연관 entity를 개별적으로 loading할 때 발생합니다.
    - 하나의 query로 N개의 entity를 조회한 후, 각 entity의 연관 data를 위해 N번의 추가 query가 실행됩니다.
    - `@OneToMany`, `@ManyToOne` 등의 연관 관계에서 주로 발생합니다.
    - 개발 단계에서는 작은 dataset으로 인해 문제가 드러나지 않을 수 있습니다.

```java
// N+1 문제 발생 예제
List<Order> orders = entityManager.createQuery("SELECT o FROM Order o", Order.class)
    .getResultList();  // 1번의 query로 orders 조회

for (Order order : orders) {
    System.out.println(order.getUser().getName());  // 각 order마다 user 조회 query 실행 (N번)
}
// 총 1 + N번의 query 실행
```

- **eager loading의 cartesian product** : 여러 연관 관계를 eager loading할 때 발생합니다.
    - 두 개 이상의 collection을 동시에 fetch하면 cartesian product가 생성됩니다.
    - 결과 set이 기하급수적으로 증가하여 memory와 network 사용량이 급증합니다.
    - database에서 중복된 data를 반복적으로 전송하게 됩니다.

- **문제의 심각성** : production 환경에서 치명적인 성능 저하를 야기할 수 있습니다.
    - 10개의 order가 있으면 11번의 query가 실행되지만, 1000개가 있으면 1001번이 실행됩니다.
    - database connection pool 고갈과 network traffic 급증을 초래할 수 있습니다.
    - application response time이 수십 배 증가할 수 있습니다.


### Fetch Join을 통한 해결

- **JPQL fetch join** : 가장 확실한 N+1 문제 해결 방법입니다.
    - `JOIN FETCH` keyword를 사용하여 연관 entity를 한 번에 조회합니다.
    - 하나의 SQL query로 필요한 모든 data를 가져와 추가 query 실행을 방지합니다.
    - inner join과 left join을 적절히 선택하여 data 무결성을 보장해야 합니다.

```java
// fetch join을 사용한 N+1 해결
List<Order> orders = entityManager.createQuery(
    "SELECT o FROM Order o JOIN FETCH o.user", Order.class)
    .getResultList();

for (Order order : orders) {
    System.out.println(order.getUser().getName());  // 추가 query 없이 접근 가능
}

// 여러 연관 관계 fetch
List<Order> ordersWithItems = entityManager.createQuery(
    "SELECT DISTINCT o FROM Order o " +
    "JOIN FETCH o.user " +
    "JOIN FETCH o.orderItems", Order.class)
    .getResultList();
```

- **fetch join 제약 사항과 해결책** : fetch join 사용 시 주의해야 할 점들이 있습니다.
    - 두 개 이상의 collection을 동시에 fetch join하면 cartesian product 문제가 발생합니다.
    - `DISTINCT` keyword를 사용하여 중복 제거를 하되, application level에서 처리해야 합니다.
    - pagination과 함께 사용할 때는 memory에서 sorting이 발생할 수 있습니다.

```java
// 단계별 fetch join으로 cartesian product 방지
List<User> users = entityManager.createQuery(
    "SELECT DISTINCT u FROM User u JOIN FETCH u.orders", User.class)
    .getResultList();

// 두 번째 query에서 addresses fetch
users = entityManager.createQuery(
    "SELECT DISTINCT u FROM User u JOIN FETCH u.addresses WHERE u IN :users", User.class)
    .setParameter("users", users)
    .getResultList();
```


### Batch Fetching 전략

- **@BatchSize annotation** : 연관 entity를 batch 단위로 loading합니다.
    - entity나 collection에 `@BatchSize(size = 20)`을 설정하여 batch loading을 활성화합니다.
    - N+1 query를 N/batch_size + 1 query로 줄여 성능을 크게 향상시킵니다.
    - memory 사용량과 query 횟수의 적절한 balance를 찾아 batch size를 조정해야 합니다.

```java
@Entity
public class Order {
    @ManyToOne(fetch = FetchType.LAZY)
    @BatchSize(size = 20)
    private User user;
    
    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    @BatchSize(size = 15)
    private List<OrderItem> orderItems = new ArrayList<>();
}

// 사용 예제
List<Order> orders = entityManager.createQuery("SELECT o FROM Order o", Order.class)
    .setMaxResults(50)
    .getResultList();

for (Order order : orders) {
    order.getUser().getName();  // batch loading으로 효율적으로 처리
}
```

- **global batch size 설정** : application 전체에 적용되는 batch size를 설정합니다.
    - `hibernate.default_batch_fetch_size` property로 global 설정이 가능합니다.
    - 개별 entity의 `@BatchSize` annotation이 global 설정보다 우선순위가 높습니다.
    - 적절한 batch size는 보통 4, 8, 16, 32 등의 2의 거듭제곱 값을 사용합니다.
        - JDBC driver와 database가 2의 거듭제곱 단위로 최적화된 경우가 많기 때문입니다.

```properties
# hibernate properties
hibernate.default_batch_fetch_size=16
```


### Entity Graph 활용

- **JPA 2.1 entity graph** : 동적으로 fetch 전략을 제어할 수 있는 강력한 기능입니다.
    - `@NamedEntityGraph` annotation으로 미리 정의하거나 runtime에 동적으로 생성할 수 있습니다.
    - 상황에 따라 다른 loading 전략을 적용하여 flexibility를 확보합니다.
    - query hint로 entity graph를 지정하여 사용합니다.

```java
@Entity
@NamedEntityGraphs({
    @NamedEntityGraph(
        name = "Order.withUser",
        attributeNodes = @NamedAttributeNode("user")
    ),
    @NamedEntityGraph(
        name = "Order.withUserAndItems",
        attributeNodes = {
            @NamedAttributeNode("user"),
            @NamedAttributeNode(value = "orderItems", subgraph = "items")
        },
        subgraphs = @NamedSubgraph(
            name = "items",
            attributeNodes = @NamedAttributeNode("product")
        )
    )
})
public class Order {
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    
    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private List<OrderItem> orderItems = new ArrayList<>();
}

// 사용 방법
List<Order> orders = entityManager.createQuery("SELECT o FROM Order o", Order.class)
    .setHint("javax.persistence.fetchgraph", 
             entityManager.getEntityGraph("Order.withUser"))
    .getResultList();
```


---


## Fetch 전략 최적화

- 적절한 **fetch 전략 선택**은 JPA 성능에 직접적인 영향을 미칩니다.
- **lazy vs eager loading**의 trade-off를 이해하고 사용 pattern에 맞게 설정해야 합니다.
- **projection**과 **DTO pattern**을 활용하여 필요한 data만 효율적으로 조회할 수 있습니다.


### Lazy vs Eager Loading 최적화

- **기본 전략 조정** : JPA의 기본 fetch type을 사용 pattern에 맞게 조정해야 합니다.
    - `@OneToOne`, `@ManyToOne`은 기본적으로 EAGER이지만 대부분 LAZY로 변경하는 것을 권장합니다.
    - `@OneToMany`, `@ManyToMany`는 기본적으로 LAZY이며 이를 유지하는 것이 좋습니다.
    - 80% 이상 함께 사용되는 연관 관계만 EAGER loading을 고려합니다.

```java
@Entity
public class Order {
    // 기본값이 EAGER이지만 LAZY로 변경 권장
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    
    // 기본값이 LAZY (권장)
    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private List<OrderItem> orderItems = new ArrayList<>();
    
    // 항상 함께 사용되는 경우에만 EAGER 고려
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private OrderSummary summary;
}
```

- **사용 pattern 분석** : 실제 application에서 entity가 어떻게 사용되는지 분석해야 합니다.
    - 각 연관 관계별 접근 빈도를 측정하여 적절한 fetch 전략을 결정합니다.
    - admin 기능과 일반 user 기능에서 서로 다른 fetch 요구 사항이 있을 수 있습니다.
    - business logic 변화에 따라 fetch 전략도 지속적으로 조정해야 합니다.


### Projection 활용

- **JPQL projection** : 필요한 field만 선택하여 조회하는 기법입니다.
    - entity 전체가 아닌 특정 field만 조회하여 network traffic과 memory 사용량을 줄입니다.
    - constructor expression을 사용하여 DTO 객체를 직접 생성할 수 있습니다.
    - 대용량 entity나 BLOB field가 있는 경우 특히 효과적입니다.

```java
// DTO class
public class UserSummary {
    private String username;
    private String email;
    private Long orderCount;
    
    public UserSummary(String username, String email, Long orderCount) {
        this.username = username;
        this.email = email;
        this.orderCount = orderCount;
    }
}

// Constructor expression 사용
List<UserSummary> summaries = entityManager.createQuery(
    "SELECT NEW com.example.dto.UserSummary(u.username, u.email, " +
    "(SELECT COUNT(o) FROM Order o WHERE o.user = u)) " +
    "FROM User u WHERE u.active = true", UserSummary.class)
    .getResultList();

// 특정 field만 조회
List<Object[]> results = entityManager.createQuery(
    "SELECT u.username, u.email FROM User u WHERE u.active = true")
    .getResultList();
```

- **interface 기반 projection** : Spring Data JPA에서 제공하는 projection 기능입니다.
    - interface를 정의하여 필요한 property만 노출할 수 있습니다.
    - dynamic projection을 통해 runtime에 projection type을 결정할 수 있습니다.
    - nested projection을 사용하여 연관 entity의 일부 정보도 포함할 수 있습니다.


### Read-Only Query 최적화

- **@Transactional(readOnly = true)** : 조회 전용 query의 성능을 최적화합니다.
    - Hibernate의 flush mode가 MANUAL로 변경되어 dirty checking이 비활성화됩니다.
    - session-level cache의 overhead가 줄어들어 memory 사용량이 감소합니다.
    - database connection pool에서도 read-only connection을 별도로 관리할 수 있습니다.

```java
@Service
@Transactional(readOnly = true)
public class UserQueryService {
    
    public List<User> findActiveUsers() {
        // read-only transaction에서 실행
        // dirty checking 비활성화로 성능 향상
        return userRepository.findByActiveTrue();
    }
    
    public UserStatistics getUserStatistics() {
        // 복잡한 집계 query도 read-only에서 최적화
        return userRepository.calculateUserStatistics();
    }
}
```


---


## Cache 전략

- **적절한 cache 전략**은 JPA 성능 향상의 핵심 요소입니다.
- **1차 cache**와 **2차 cache**의 특성을 이해하고 효과적으로 활용해야 합니다.
- **query result cache**를 통해 더욱 세밀한 성능 최적화가 가능합니다.


### 1차 Cache 활용

- **persistence context cache** : transaction 범위 내에서 entity의 uniqueness와 caching을 보장합니다.
    - 같은 primary key로 조회 시 database 접근 없이 memory에서 반환합니다.
    - entity의 identity를 보장하고 consistent한 상태를 유지합니다.
    - transaction 종료 시 자동으로 clear되므로 별도 관리가 불필요합니다.

```java
@Transactional
public void demonstrateFirstLevelCache() {
    // 첫 번째 조회: database에서 loading
    User user1 = entityManager.find(User.class, 1L);
    
    // 두 번째 조회: 1차 cache에서 반환 (database 접근 없음)
    User user2 = entityManager.find(User.class, 1L);
    
    // 같은 instance임을 보장
    assert user1 == user2;  // true
}
```

- **1차 cache 관리** : 적절한 cache 관리를 통해 memory 사용량을 제어합니다.
    - `entityManager.clear()`로 전체 persistence context를 정리할 수 있습니다.
    - 대용량 batch processing에서는 정기적인 cache 정리가 필요합니다.
    - `entityManager.detach(entity)`로 특정 entity만 cache에서 제거할 수 있습니다.


### 2차 Cache 설정

- **2차 cache 개념** : 여러 transaction 간에 공유되는 application level cache입니다.
    - EntityManagerFactory level에서 관리되는 shared cache입니다.
    - 자주 조회되는 reference data나 변경이 적은 entity에 적용합니다.
    - cache provider로 Ehcache, Hazelcast, Infinispan 등을 선택할 수 있습니다.

```properties
# hibernate cache 설정
hibernate.cache.use_second_level_cache=true
hibernate.cache.region.factory_class=org.hibernate.cache.jcache.JCacheRegionFactory
hibernate.javax.cache.provider=org.ehcache.jsr107.EhcacheCachingProvider
```

- **cache concurrency strategy** : entity의 사용 pattern에 맞는 cache 전략을 선택합니다.
    - **READ_ONLY** : 읽기 전용 data에 사용하며 가장 빠른 성능을 제공합니다.
    - **NONSTRICT_READ_WRITE** : 가끔 변경되는 data에 사용하며 cache consistency를 느슨하게 관리합니다.
    - **READ_WRITE** : 자주 변경되는 data에 사용하며 strong consistency를 보장합니다.

```java
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
public class Country {
    @Id
    private String code;
    private String name;
    // reference data는 READ_ONLY 전략 적합
}

@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class User {
    @Id
    private Long id;
    private String username;
    private String email;
    // 자주 변경되는 user data는 READ_WRITE 전략
}
```


### Query Result Cache

- **query cache 활성화** : JPQL query 결과를 cache하여 반복 실행 시 성능을 향상시킵니다.
    - `hibernate.cache.use_query_cache=true` 설정으로 query cache를 활성화합니다.
    - query별로 `setCacheable(true)` 또는 hint를 사용하여 cache를 적용합니다.
    - query string과 parameter를 key로 사용하여 cache entry를 관리합니다.

```java
// Query cache 사용
List<User> activeUsers = entityManager.createQuery(
    "SELECT u FROM User u WHERE u.active = true ORDER BY u.username", User.class)
    .setHint("org.hibernate.cacheable", true)
    .getResultList();

// 또는 setCacheable 사용
List<Product> expensiveProducts = entityManager.createQuery(
    "SELECT p FROM Product p WHERE p.price > :price", Product.class)
    .setParameter("price", new BigDecimal("1000"))
    .setCacheable(true)
    .getResultList();
```

- **cache 효과 측정** : cache hit ratio를 monitoring하여 cache 효과를 검증합니다.
    - Hibernate statistics를 통해 cache hit/miss ratio를 확인할 수 있습니다.
    - cache hit ratio가 80% 이상이 되도록 cache 전략을 조정합니다.
    - parameter가 자주 변경되는 query는 cache 효과가 제한적입니다.


---


## Bulk Operation

- **대용량 data 처리**에서는 개별 entity 단위 작업보다 **bulk operation**이 훨씬 효율적입니다.
- **JPQL bulk update/delete**와 **batch processing**을 활용하여 성능을 대폭 향상시킬 수 있습니다.
- bulk operation 사용 시 **persistence context와의 동기화** 문제를 주의해야 합니다.


### JPQL Bulk Update/Delete

- **bulk update** : 여러 entity를 한 번에 update하는 효율적인 방법입니다.
    - 개별 entity를 조회하고 수정하는 것보다 수십 배 빠른 성능을 제공합니다.
    - 하나의 UPDATE SQL로 조건에 맞는 모든 record를 한 번에 처리합니다.
    - persistence context를 bypass하므로 entity lifecycle event가 발생하지 않습니다.

```java
// 비효율적인 방법: 개별 entity update
@Transactional
public void updateUserStatusIndividually(UserStatus oldStatus, UserStatus newStatus) {
    List<User> users = entityManager.createQuery(
        "SELECT u FROM User u WHERE u.status = :oldStatus", User.class)
        .setParameter("oldStatus", oldStatus)
        .getResultList();
    
    for (User user : users) {
        user.setStatus(newStatus);  // 각 user마다 UPDATE SQL 실행
    }
    // N번의 UPDATE SQL 실행
}

// 효율적인 방법: bulk update
@Transactional
public int updateUserStatusBulk(UserStatus oldStatus, UserStatus newStatus) {
    return entityManager.createQuery(
        "UPDATE User u SET u.status = :newStatus, u.lastModified = :now " +
        "WHERE u.status = :oldStatus")
        .setParameter("newStatus", newStatus)
        .setParameter("oldStatus", oldStatus)
        .setParameter("now", LocalDateTime.now())
        .executeUpdate();  // 1번의 UPDATE SQL로 모든 record 처리
}
```

- **persistence context 동기화** : bulk operation 후 persistence context 정리가 필요합니다.
    - bulk operation은 persistence context를 bypass하므로 cache된 entity가 outdated될 수 있습니다.
    - `entityManager.clear()`를 호출하여 persistence context를 정리해야 합니다.
    - 이후 entity 조회 시 database에서 최신 data를 가져옵니다.

```java
@Transactional
public void updateAndRefresh() {
    // Bulk update 실행
    int updatedCount = entityManager.createQuery(
        "UPDATE User u SET u.lastLogin = :now WHERE u.active = true")
        .setParameter("now", LocalDateTime.now())
        .executeUpdate();
    
    // Persistence context 정리 (중요!)
    entityManager.clear();
    
    // 이제 entity 조회 시 최신 data가 반환됨
    User user = entityManager.find(User.class, 1L);
}
```


### Batch Processing

- **JDBC batch size 설정** : 여러 DML 연산을 batch로 묶어서 실행합니다.
    - `hibernate.jdbc.batch_size` property로 batch 크기를 설정합니다.
    - network round trip 횟수를 줄여 성능을 향상시킵니다.
    - 적절한 batch size는 보통 10-50 정도이며, 환경에 따라 tuning이 필요합니다.

```properties
# hibernate.properties
hibernate.jdbc.batch_size=25
hibernate.order_inserts=true
hibernate.order_updates=true
hibernate.jdbc.batch_versioned_data=true
```

```java
@Transactional
public void batchInsertUsers(List<User> users) {
    int batchSize = 25;
    
    for (int i = 0; i < users.size(); i++) {
        entityManager.persist(users.get(i));
        
        // batch size마다 flush하여 batch 실행
        if (i % batchSize == 0) {
            entityManager.flush();
            entityManager.clear();
        }
    }
    
    // 남은 entity들 처리
    entityManager.flush();
    entityManager.clear();
}
```


---


## Performance Monitoring

- **지속적인 monitoring**과 **profiling**을 통해 성능 병목 지점을 파악해야 합니다.
- **SQL logging**과 **statistics 수집**으로 실제 database 접근 pattern을 분석합니다.
- **APM tool**과 **database monitoring**을 통해 종합적인 성능 관리가 필요합니다.


### Hibernate Statistics

- **statistics 활성화** : Hibernate 내부 통계를 수집하여 성능을 분석합니다.
    - `hibernate.generate_statistics=true` 설정으로 statistics 수집을 활성화합니다.
    - query 실행 횟수, cache hit ratio, connection 사용량 등을 monitoring합니다.
    - JMX를 통해 runtime에 statistics를 확인하고 관리할 수 있습니다.

```properties
# Statistics 활성화
hibernate.generate_statistics=true
hibernate.stats.fetch_statistics=true
```

```java
@Service
public class HibernateStatsService {
    
    @PersistenceContext
    private EntityManager entityManager;
    
    public void logStatistics() {
        SessionFactory sessionFactory = entityManager.getEntityManagerFactory()
            .unwrap(SessionFactory.class);
        
        Statistics stats = sessionFactory.getStatistics();
        
        System.out.println("Entity fetch count: " + stats.getEntityFetchCount());
        System.out.println("Entity load count: " + stats.getEntityLoadCount());
        System.out.println("Query execution count: " + stats.getQueryExecutionCount());
        System.out.println("Cache hit count: " + stats.getSecondLevelCacheHitCount());
        System.out.println("Cache miss count: " + stats.getSecondLevelCacheMissCount());
        
        // Cache hit ratio 계산
        long hitCount = stats.getSecondLevelCacheHitCount();
        long missCount = stats.getSecondLevelCacheMissCount();
        double hitRatio = (double) hitCount / (hitCount + missCount) * 100;
        System.out.println("Cache hit ratio: " + String.format("%.2f%%", hitRatio));
    }
    
    public void clearStatistics() {
        SessionFactory sessionFactory = entityManager.getEntityManagerFactory()
            .unwrap(SessionFactory.class);
        sessionFactory.getStatistics().clear();
    }
}
```

- **JMX monitoring** : JMX Bean을 통해 runtime에 성능 지표를 monitoring합니다.
    - Spring Boot Actuator와 연동하여 HTTP endpoint로 통계를 확인할 수 있습니다.
    - Micrometer와 통합하여 Prometheus, Grafana 등으로 시각화가 가능합니다.
    - 임계값 기반 alert을 설정하여 성능 문제를 조기에 감지합니다.


### SQL Logging

- **SQL logging 설정** : 실제 실행되는 SQL을 확인하여 성능 문제를 진단합니다.
    - `show_sql=true`와 `format_sql=true`로 SQL을 readable하게 출력합니다.
    - `use_sql_comments=true`로 JPQL과 SQL의 연관성을 파악할 수 있습니다.
    - parameter binding을 확인하여 prepared statement의 효과를 검증합니다.

```properties
# SQL logging 설정
hibernate.show_sql=true
hibernate.format_sql=true
hibernate.use_sql_comments=true
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

- **P6Spy 활용** : 더 자세한 SQL 정보를 확인할 수 있는 도구입니다.
    - 실행 시간과 함께 실제 parameter 값이 binding된 SQL을 확인할 수 있습니다.
    - slow query 감지와 performance 분석에 유용합니다.
    - production 환경에서는 overhead를 고려하여 선택적으로 사용해야 합니다.

```properties
# P6Spy 설정
spring.datasource.driver-class-name=com.p6spy.engine.spy.P6SpyDriver
spring.datasource.url=jdbc:p6spy:h2:mem:testdb

# spy.properties
appender=com.p6spy.engine.spy.appender.Slf4JLogger
logMessageFormat=com.p6spy.engine.spy.appender.MultiLineFormat
```


### Application Performance Monitoring

- **APM tool 활용** : 종합적인 application 성능 monitoring을 위해 APM tool을 활용합니다.
    - New Relic, AppDynamics, Datadog 등의 commercial APM solution을 사용할 수 있습니다.
    - Micrometer와 Spring Boot Actuator를 활용한 custom monitoring도 가능합니다.
    - database connection pool, query execution time, throughput 등을 실시간으로 monitoring합니다.

```java
@Component
public class JpaPerformanceMetrics {
    
    private final MeterRegistry meterRegistry;
    private final Timer.Sample queryTimer;
    
    public JpaPerformanceMetrics(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }
    
    @EventListener
    public void handleQueryExecution(QueryExecutionEvent event) {
        Timer.builder("jpa.query.execution")
            .tag("query.type", event.getQueryType())
            .tag("entity", event.getEntityName())
            .register(meterRegistry)
            .record(event.getExecutionTime(), TimeUnit.MILLISECONDS);
    }
    
    @EventListener
    public void handleCacheEvent(CacheEvent event) {
        Counter.builder("jpa.cache." + event.getType())
            .tag("region", event.getRegionName())
            .register(meterRegistry)
            .increment();
    }
}
```

- **performance baseline 설정** : 정상적인 성능 기준을 설정하고 deviation을 monitoring합니다.
    - 평균 응답 시간, throughput, error rate 등의 baseline을 설정합니다.
    - 성능 regression을 조기에 발견하기 위한 alert 규칙을 정의합니다.
    - load testing 결과를 바탕으로 realistic한 성능 목표를 설정합니다.


---


## Performance Tuning Checklist

- **체계적인 성능 점검**을 통해 JPA application의 성능을 지속적으로 관리해야 합니다.
- **단계별 checklist**를 활용하여 놓치기 쉬운 최적화 지점(point)을 확인합니다.
- **정기적인 성능 review**를 통해 성능 regression을 방지하고 지속적인 개선을 달성합니다.


### 개발 단계 Checklist

- **entity 설계 검토** : entity 설계가 성능에 미치는 영향을 사전에 검토합니다.
    - [ ] 모든 연관 관계가 LAZY loading으로 설정되어 있는가.
    - [ ] `@BatchSize` annotation이 적절히 설정되어 있는가.
    - [ ] entity graph나 fetch join 전략이 계획되어 있는가.
    - [ ] 대용량 field(BLOB, CLOB)가 별도 entity로 분리되어 있는가.

- **query 작성 검토** : JPQL과 native query 작성 시 성능을 고려합니다.
    - [ ] N+1 query가 발생할 가능성이 있는 코드를 확인했는가.
    - [ ] fetch join이나 entity graph를 적절히 사용했는가.
    - [ ] bulk operation이 필요한 곳에서 개별 entity 수정을 하고 있지 않은가.
    - [ ] projection을 활용하여 불필요한 data loading을 방지했는가.

- **cache 전략 수립** : entity별 적절한 cache 전략을 수립합니다.
    - [ ] reference data에 대해 2차 cache가 설정되어 있는가.
    - [ ] 자주 실행되는 query에 대해 query cache가 고려되었는가.
    - [ ] cache concurrency strategy가 적절히 선택되었는가.
    - [ ] cache region별로 TTL과 size limit이 설정되어 있는가.


### Test 단계 Checklist

- **성능 test 실행** : 실제 운영 환경과 유사한 조건에서 성능을 검증합니다.
    - [ ] 실제 data volume과 유사한 환경에서 테스트했는가.
    - [ ] SQL logging을 통해 실행되는 query를 확인했는가.
    - [ ] 예상 load에서 응답 시간이 목표치를 만족하는가.
    - [ ] memory usage와 connection pool 사용량이 적정한가.

- **monitoring 설정** : 성능 지표를 수집하고 분석할 수 있는 환경을 구축합니다.
    - [ ] Hibernate statistics가 활성화되어 있는가.
    - [ ] APM tool이나 custom metric 수집이 설정되어 있는가.
    - [ ] database monitoring과 연동되어 있는가.
    - [ ] alert 규칙이 정의되어 성능 문제를 조기에 감지할 수 있는가.


### 운영 단계 Checklist

- **정기적인 성능 review** : 운영 중인 system의 성능을 지속적으로 관리합니다.
    - [ ] 주간/월간 성능 report를 통해 trend를 파악하고 있는가.
    - [ ] slow query 발생 현황을 정기적으로 검토하고 있는가.
    - [ ] cache hit ratio가 목표치를 유지하고 있는가.
    - [ ] connection pool 사용률과 wait time이 정상 범위에 있는가.

- **성능 문제 대응** : 성능 문제 발생 시 신속한 대응 체계를 운영합니다.
    - [ ] 성능 문제 발생 시 escalation 절차가 정의되어 있는가.
    - [ ] query plan 분석과 index 추가 등의 대응 방안이 준비되어 있는가.
    - [ ] 긴급 상황에서 cache clear나 connection pool 재설정이 가능한가.
    - [ ] 성능 문제 해결 후 근본 원인 분석과 재발 방지 대책이 수립되는가.

- **지속적인 개선** : 성능 최적화는 일회성이 아닌 지속적인 process입니다.
    - [ ] 새로운 기능 개발 시 성능 영향도 검토가 포함되어 있는가.
    - [ ] database schema 변경 시 JPA mapping과의 영향도를 검토하는가.
    - [ ] 정기적으로 query 최적화와 index tuning을 수행하고 있는가.
    - [ ] 성능 best practice가 개발팀 내에서 공유되고 있는가.


### 긴급 상황 대응 Checklist

- **성능 장애 발생 시** : 신속한 문제 해결을 위한 체계적인 접근이 필요합니다.
    - [ ] 현재 실행 중인 slow query를 확인했는가.
    - [ ] connection pool 상태와 database lock 상황을 점검했는가.
    - [ ] cache 상태와 hit ratio를 확인했는가.
    - [ ] application memory 사용량과 GC 상황을 점검했는가.

- **임시 조치 및 복구** : service 영향을 최소화하면서 문제를 해결합니다.
    - [ ] 문제가 되는 기능의 일시 비활성화를 고려했는가.
    - [ ] cache warm-up이나 connection pool 재설정을 시도했는가.
    - [ ] query timeout 설정이나 batch size 조정을 고려했는가.
    - [ ] database connection limit 증설이나 read replica 활용을 검토했는가.


---


## Reference

- <https://docs.jboss.org/hibernate/orm/6.0/userguide/html_single/Hibernate_User_Guide.html>
- <https://vladmihalcea.com/tutorials/hibernate/>
- <https://docs.spring.io/spring-data/jpa/docs/current/reference/html/>
- <https://www.baeldung.com/jpa-hibernate-performance>
- <https://blog.jooq.org/tag/jpa-performance/>

