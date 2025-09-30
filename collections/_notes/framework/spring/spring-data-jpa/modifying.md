---
layout: note
permalink: /387
title: Spring Data JPA의 @Modifying Annotation
description: Spring Data JPA의 @Modifying annotation은 @Query로 작성한 UPDATE, DELETE, INSERT, DDL query가 data 변경 작업임을 명시하는 marker annotation입니다.
date: 2025-09-30
---


## @Modifying Annotation

- `@Modifying` annotation은 **UPDATE, DELETE, INSERT, DDL query를 실행**하기 위해 **`@Query`와 함께 사용**하는 Spring Data JPA의 핵심 기능입니다.
    - `@Query`로 직접 작성한 JPQL이나 native SQL에만 `@Modifying`을 추가하면 되며, derived query method나 custom 구현 method에는 필요하지 않습니다.
- 기본적으로 Spring Data JPA repository method는 조회용으로 간주되므로, data를 변경하는 query는 `@Modifying`을 명시해야 정상 동작합니다.
- bulk operation을 수행할 때 persistence context와의 동기화 문제를 해결하기 위한 option들을 제공합니다.


---


## @Modifying의 필요성

- Spring Data JPA는 **기본적으로 모든 query를 조회 query로 간주**하여 최적화합니다.
- data를 변경하는 query는 다른 방식으로 처리되어야 하므로, `@Modifying`으로 명시적으로 표시해야 합니다.
- `@Modifying` 없이 UPDATE나 DELETE query를 실행하면 `InvalidDataAccessApiUsageException`이 발생합니다.


### Query 실행 방식의 차이

- 조회 query는 **result set을 entity로 변환**하는 과정을 거칩니다.
- 변경 query는 **affected rows 수를 반환**하거나 아무것도 반환하지 않습니다.
    - Spring Data JPA는 query의 성격에 따라 다른 실행 전략을 사용합니다.
    - `@Modifying`이 없으면 framework가 query를 조회용으로 잘못 해석하여 error가 발생합니다.
    - `EntityManager.executeUpdate()`를 호출해야 하는 query를 `EntityManager.createQuery()`로 실행하려고 시도하기 때문입니다.
- `@Modifying`은 Spring Data JPA에게 해당 query가 updating query임을 알려주는 marker 역할을 합니다.


### @Query와의 관계

- `@Modifying`은 **반드시 `@Query` annotation과 함께 사용**해야 합니다.
- derived query method나 custom 구현 method에는 `@Modifying`이 필요하지 않습니다.
    - derived query method는 method 이름으로 이미 query 성격이 결정되기 때문입니다.
    - `deleteByUsername()`과 같은 method는 이름 자체가 삭제 작업임을 나타냅니다.
    - custom 구현체에서는 `EntityManager`를 직접 제어하므로 `@Modifying`이 불필요합니다.
- **`@Query`로 직접 작성한 JPQL이나 native SQL에만 `@Modifying`을 추가**합니다.


---


## 기본 사용법

- `@Modifying`은 **method level annotation**으로, `@Query`와 함께 repository interface의 method에 선언합니다.
- UPDATE, DELETE, INSERT query 모두 `@Modifying`으로 표시해야 합니다.


### UPDATE Query

- entity의 특정 field를 **일괄적으로 수정**할 때 사용합니다.
- 조건에 맞는 여러 entity를 한 번의 query로 update할 수 있습니다.

```java
@Modifying
@Query("UPDATE User u SET u.active = false WHERE u.lastLoginDate < :date")
void deactivateUsersNotLoggedInSince(@Param("date") LocalDate date);
```

- 마지막 로그인 날짜가 특정 날짜보다 이전인 사용자들을 비활성화합니다.
- 개별 entity를 조회하고 수정하는 것보다 훨씬 효율적입니다.
- 단일 UPDATE query로 database를 직접 변경하므로 성능이 우수합니다.


### DELETE Query

- 조건에 맞는 entity를 **일괄적으로 삭제**할 때 사용합니다.
- 여러 entity를 한 번의 query로 삭제할 수 있어 batch 작업에 유용합니다.

```java
@Modifying
@Query("DELETE FROM User u WHERE u.active = false")
int deleteDeactivatedUsers();
```

- 비활성화된 모든 사용자를 삭제합니다.
- return type을 `int`로 지정하면 삭제된 entity의 개수를 반환합니다.
- `void`로 지정하면 반환값 없이 삭제만 수행합니다.


### INSERT Query

- native query를 사용하여 **직접 data를 삽입**할 수 있습니다.
- JPQL은 INSERT를 지원하지 않으므로, native SQL을 사용해야 합니다.

```java
@Modifying
@Query(value = "INSERT INTO user_audit (user_id, action, timestamp) VALUES (:userId, :action, :timestamp)", nativeQuery = true)
void insertAuditLog(@Param("userId") Long userId, @Param("action") String action, @Param("timestamp") LocalDateTime timestamp);
```

- audit log나 history table에 data를 기록할 때 유용합니다.
- `nativeQuery = true` option을 반드시 설정해야 합니다.


### DDL Query

- database schema를 **동적으로 변경**할 수 있습니다.
- ALTER, DROP 등의 DDL 명령도 `@Modifying`으로 실행 가능합니다.

```java
@Modifying
@Query(value = "ALTER TABLE user ADD COLUMN login_count INT DEFAULT 0", nativeQuery = true)
void addLoginCountColumn();
```

- runtime에 table 구조를 변경해야 하는 특수한 경우에 사용합니다.
- production 환경에서는 신중하게 사용해야 하며, migration tool 사용을 권장합니다.


---


## Return Type

- `@Modifying` query는 **세 가지 return type**을 지원합니다.
- return type을 통해 query 실행 결과를 확인할 수 있습니다.


### void

- **반환값이 필요 없는 경우** 사용합니다.
- 가장 간단한 형태로, query 실행만 수행하고 결과를 무시합니다.

```java
@Modifying
@Query("UPDATE User u SET u.status = :status WHERE u.id = :id")
void updateUserStatus(@Param("id") Long id, @Param("status") String status);
```

- 실행 성공 여부만 중요하고 affected rows 수가 필요 없을 때 사용합니다.


### int / Integer

- **affected rows의 개수를 반환**받고 싶을 때 사용합니다.
- query가 영향을 준 entity의 개수를 확인할 수 있습니다.

```java
@Modifying
@Query("DELETE FROM User u WHERE u.createdDate < :date")
int deleteOldUsers(@Param("date") LocalDate date);
```

- 삭제되거나 수정된 record 수를 확인하여 business logic에 활용할 수 있습니다.
- `int`는 primitive type이므로 null이 발생하지 않고, `Integer`는 wrapper type으로 null 가능성이 있습니다.


### 기타 Type 제한

- `void`, `int`, `Integer` **이외의 type을 반환하면 error가 발생**합니다.
- `@Modifying` query는 entity나 collection을 반환할 수 없습니다.
    - `String`, `Long`, `List<User>` 등을 return type으로 지정하면 `IllegalArgumentException`이 발생합니다.
    - modifying query는 본질적으로 affected rows 수만 반환할 수 있기 때문입니다.
- 수정된 entity를 조회하려면 별도의 조회 query를 실행해야 합니다.


---


## Persistence Context 동기화 문제

- `@Modifying` query는 **persistence context를 우회하여 database를 직접 변경**합니다.
- 이로 인해 first level cache에 있는 entity와 database의 실제 data 간에 불일치가 발생할 수 있습니다.


### Bulk Operation의 특성

- bulk operation은 **`EntityManager`를 거치지 않고 database를 직접 수정**합니다.
- persistence context에 있는 entity는 전혀 영향을 받지 않으므로, cache와 database 간 불일치가 발생합니다.
    - transaction 내에서 entity를 조회한 후 bulk update를 실행하면 문제가 생깁니다.
    - first level cache에는 update 이전의 값이 그대로 남아있습니다.
    - 이후 같은 entity를 조회하면 database가 아닌 cache에서 outdated된 entity를 반환합니다.
- JPA의 dirty checking이나 write-behind 같은 기능도 bulk operation에는 적용되지 않습니다.


### 문제 발생 Scenario

```java
@Transactional
public void updateAndRead() {
    User user = userRepository.findById(1L).orElseThrow();
    System.out.println("Before: " + user.getActive()); // true
    
    // bulk update 실행
    userRepository.deactivateAllUsers();
    
    User sameUser = userRepository.findById(1L).orElseThrow();
    System.out.println("After: " + sameUser.getActive()); // 여전히 true (문제!)
}
```

- bulk update로 database에서는 `active = false`로 변경되었지만, persistence context의 entity는 여전히 `active = true`입니다.
- 같은 transaction 내에서 entity를 다시 조회하면 database가 아닌 first level cache에서 가져옵니다.
- cache에 있는 entity는 update되지 않았으므로, 잘못된 값을 읽게 됩니다.


---


## @Modifying option

- `@Modifying`은 **persistence context 동기화 문제를 해결**하기 위한 두 가지 option을 제공합니다.
- option을 적절히 사용하면 cache와 database 간의 일관성을 유지할 수 있습니다.


### clearAutomatically

- bulk operation 실행 **후에 persistence context를 자동으로 clear**합니다.
- 기본값은 `false`이며, `true`로 설정하면 query 실행 후 `EntityManager.clear()`가 자동으로 호출됩니다.

```java
@Modifying(clearAutomatically = true)
@Query("UPDATE User u SET u.active = false WHERE u.lastLoginDate < :date")
void deactivateUsersNotLoggedInSince(@Param("date") LocalDate date);
```

- persistence context를 clear하면 모든 entity가 detached 상태가 됩니다.
- 이후 entity 조회 시 database에서 최신 data를 가져오므로 일관성이 보장됩니다.
- 단, clear되지 않은 변경 사항은 모두 손실되므로 주의가 필요합니다.


### flushAutomatically

- bulk operation 실행 **전에 persistence context를 자동으로 flush**합니다.
- 기본값은 `false`이며, `true`로 설정하면 query 실행 전 `EntityManager.flush()`가 자동으로 호출됩니다.

```java
@Modifying(flushAutomatically = true)
@Query("DELETE FROM User u WHERE u.active = false")
int deleteDeactivatedUsers();
```

- persistence context에 있는 변경 사항을 먼저 database에 반영한 후 bulk operation을 수행합니다.
- pending 중인 INSERT, UPDATE, DELETE가 먼저 실행되어 data 일관성이 유지됩니다.
- flush되지 않은 변경 사항이 bulk operation과 충돌하는 것을 방지합니다.


### option 조합 사용

- 두 option을 **함께 사용**하여 완전한 동기화를 달성할 수 있습니다.
- 변경 사항을 먼저 반영하고, 실행 후 cache를 비워 일관성을 보장합니다.

```java
@Modifying(clearAutomatically = true, flushAutomatically = true)
@Query("UPDATE User u SET u.status = 'INACTIVE' WHERE u.lastAccessDate < :date")
void deactivateInactiveUsers(@Param("date") LocalDate date);
```

- `flushAutomatically = true` : bulk operation 전에 pending 변경 사항을 database에 반영합니다.
- `clearAutomatically = true` : bulk operation 후에 persistence context를 clear하여 최신 data를 보장합니다.
- 두 option을 모두 사용하면 가장 안전하지만, 성능 overhead가 발생할 수 있습니다.


---


## @Modifying vs deleteBy Method

- Spring Data JPA는 **두 가지 방식으로 삭제 작업**을 수행할 수 있으며, 각각 동작 방식이 다릅니다.
- 상황에 따라 적절한 방식을 선택하는 것이 중요합니다.


### deleteBy Method 방식

- Spring Data JPA의 **derived query method**로 삭제를 수행합니다.
- method 이름만으로 삭제 logic이 자동 생성되어 편리합니다.

```java
void deleteByActive(boolean active);
int deleteByCreatedDateBefore(LocalDate date);
```

- entity를 **먼저 조회한 후 하나씩 삭제**하는 방식으로 동작합니다.
- 각 entity에 대해 DELETE query가 개별적으로 실행됩니다.
- `@PreRemove`, `@PostRemove` 같은 lifecycle callback이 정상 동작합니다.
- cascade delete나 orphan removal 같은 JPA 기능이 올바르게 적용됩니다.


### @Modifying + @Query 방식

- **bulk delete query를 직접 실행**하여 한 번에 삭제합니다.
- entity를 조회하지 않고 database에서 직접 삭제하므로 빠릅니다.

```java
@Modifying
@Query("DELETE FROM User u WHERE u.active = false")
int deleteDeactivatedUsers();
```

- 단일 DELETE query로 조건에 맞는 모든 entity를 삭제합니다.
- entity lifecycle callback이 호출되지 않습니다.
- cascade나 orphan removal 같은 JPA 기능이 동작하지 않습니다.
- 대량의 data를 삭제할 때 성능이 훨씬 우수합니다.


### 선택 기준

- **소량 data 삭제 + JPA 기능 필요** : `deleteBy` method를 사용합니다.
- **대량 data 삭제 + 성능 중시** : `@Modifying` + `@Query`를 사용합니다.
    - lifecycle callback이 필요하면 `deleteBy` method를 선택합니다.
    - cascade delete가 필요하면 `deleteBy` method를 선택합니다.
    - 수천 개 이상의 record를 삭제한다면 `@Modifying`을 선택합니다.
    - audit log가 필요하다면 `deleteBy` method로 하나씩 처리하거나, `@Modifying` 후 별도로 처리합니다.
- 대부분의 경우 간단한 삭제는 `deleteBy`를, bulk 삭제는 `@Modifying`을 사용하는 것이 적절합니다.


---


## Transaction 필수

- `@Modifying` query는 **반드시 transaction 내에서 실행**되어야 합니다.
- transaction 없이 실행하면 `InvalidDataAccessApiUsageException`이 발생합니다.


### @Transactional과 함께 사용

- repository method나 **service layer에 `@Transactional`을 선언**해야 합니다.
- Spring Data JPA repository는 기본적으로 transaction을 제공하지만, 명시적으로 선언하는 것이 권장됩니다.

```java
@Transactional
public void deactivateOldUsers() {
    LocalDate cutoffDate = LocalDate.now().minusMonths(6);
    userRepository.deactivateUsersNotLoggedInSince(cutoffDate);
}
```

- service layer에서 `@Transactional`을 선언하면 여러 repository 작업을 하나의 transaction으로 묶을 수 있습니다.
- transaction이 commit될 때 변경 사항이 database에 반영됩니다.
- exception 발생 시 자동으로 rollback되어 data 일관성이 보장됩니다.


### Repository Level Transaction

- repository interface의 method에 **직접 `@Transactional`을 선언**할 수도 있습니다.
- 간단한 경우 service layer 없이 사용할 수 있지만, business logic과 data access를 분리하는 것이 더 좋습니다.

```java
public interface UserRepository extends JpaRepository<User, Long> {
    
    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.active = false WHERE u.id = :id")
    void deactivateUser(@Param("id") Long id);
}
```

- Spring Data JPA repository의 기본 method들은 이미 transaction이 적용되어 있습니다.
- custom method에도 `@Transactional`을 명시하면 일관된 transaction 관리가 가능합니다.


---


## 실무 활용 사례

- `@Modifying`은 **대량의 data를 효율적으로 처리**해야 하는 다양한 실무 상황에서 유용합니다.
- 적절한 사용으로 성능을 크게 향상시킬 수 있습니다.


### Batch 작업

- 주기적으로 실행되는 **대량 data 처리 작업**에 적합합니다.
- 개별 entity를 조회하고 수정하는 것보다 훨씬 빠릅니다.

```java
@Modifying
@Query("UPDATE Product p SET p.status = 'EXPIRED' WHERE p.expiryDate < CURRENT_DATE AND p.status = 'ACTIVE'")
int expireProducts();
```

- 매일 자정에 실행하여 만료된 상품의 상태를 일괄 변경합니다.
- 수천 개의 상품을 한 번의 query로 처리하므로 성능이 우수합니다.


### Soft Delete 구현

- 실제로 record를 삭제하지 않고 **삭제 flag만 변경**하는 pattern입니다.
- data를 보존하면서 논리적 삭제를 구현할 수 있습니다.

```java
@Modifying
@Query("UPDATE User u SET u.deleted = true, u.deletedAt = CURRENT_TIMESTAMP WHERE u.id = :id")
void softDeleteUser(@Param("id") Long id);
```

- 물리적 삭제 대신 `deleted` flag를 `true`로 설정합니다.
- 삭제 시점을 기록하여 audit 정보를 유지합니다.
- 필요시 복구가 가능하고, 관련된 data의 참조 무결성이 유지됩니다.


### 통계 Update

- 집계된 통계 정보를 **주기적으로 update**할 때 유용합니다.
- 복잡한 계산을 database level에서 수행할 수 있습니다.

```java
@Modifying
@Query("UPDATE Post p SET p.viewCount = p.viewCount + 1 WHERE p.id = :postId")
void incrementViewCount(@Param("postId") Long postId);
```

- 조회수를 증가시키는 작업을 database에서 직접 수행합니다.
- entity를 조회하고 수정하는 overhead를 제거하여 성능을 향상시킵니다.


### 관계 정리

- 연관 관계가 복잡한 entity를 삭제하기 전에 **관련 data를 정리**합니다.
- foreign key 제약 조건이 있는 경우 순서를 맞춰 삭제할 수 있습니다.

```java
@Modifying
@Query("DELETE FROM Comment c WHERE c.post.id = :postId")
void deleteCommentsByPostId(@Param("postId") Long postId);

@Modifying
@Query("DELETE FROM Post p WHERE p.id = :postId")
void deletePost(@Param("postId") Long postId);
```

- post를 삭제하기 전에 관련된 comment를 먼저 삭제합니다.
- bulk delete로 성능을 최적화하면서 참조 무결성을 유지합니다.


---


## 주의 사항과 Best Practice

- `@Modifying`을 효과적으로 사용하기 위해서는 **몇 가지 주의 사항**을 숙지해야 합니다.
- 잘못된 사용은 data 불일치나 성능 문제를 야기할 수 있습니다.


### Persistence Context 관리

- bulk operation 전후로 **persistence context의 상태를 항상 고려**해야 합니다.
- 같은 transaction 내에서 entity를 조회한 후 bulk operation을 수행하면 문제가 발생할 수 있습니다.
    - bulk operation 전에 조회한 entity는 outdated된 상태로 남아있습니다.
    - 필요한 경우 `clearAutomatically = true`를 사용하여 cache를 clear합니다.
    - 또는 bulk operation 후 필요한 entity를 다시 조회합니다.
- service layer에서 logic 순서를 조정하여 문제를 예방할 수 있습니다.


### Cascade와 Lifecycle Callback

- `@Modifying` query는 **JPA의 cascade나 lifecycle callback을 무시**합니다.
- entity의 관계 설정이나 event listener가 동작하지 않으므로 주의해야 합니다.
    - `@PreRemove`, `@PostRemove` 같은 callback이 호출되지 않습니다.
    - `CascadeType.REMOVE` 설정이 적용되지 않습니다.
    - `orphanRemoval = true` option도 동작하지 않습니다.
- 이러한 기능이 필요하다면 `deleteBy` method를 사용하거나, 별도로 처리해야 합니다.


### 성능 고려 사항

- bulk operation은 **빠르지만 무조건 좋은 것은 아닙니다**.
- 상황에 따라 적절한 방법을 선택해야 합니다.
    - 소량의 data라면 일반적인 save/delete가 더 나을 수 있습니다.
    - bulk operation은 준비 비용이 있으므로, 극소량 data에는 overhead가 될 수 있습니다.
    - database lock 범위가 넓어질 수 있으므로, 동시성 문제를 고려해야 합니다.
- 실제 성능을 측정하고 monitoring하여 최적의 방법을 선택합니다.


### Transaction 범위

- `@Modifying` query의 **transaction 범위를 적절히 설정**해야 합니다.
- 너무 긴 transaction은 lock 경합을 유발할 수 있습니다.
    - 대량 data를 처리할 때는 적절한 크기로 분할하는 것을 고려합니다.
    - batch 단위로 나누어 처리하면 lock 시간을 줄일 수 있습니다.
    - 필요한 경우 `@Transactional(timeout = ...)` option으로 timeout을 설정합니다.
- 여러 modifying query를 하나의 transaction으로 묶을 때는 순서와 의존성을 고려합니다.


### Test 작성

- `@Modifying` query는 **integration test로 검증**하는 것이 좋습니다.
- unit test만으로는 persistence context 동기화 문제를 발견하기 어렵습니다.
    - 실제 database를 사용하는 test에서 bulk operation 전후의 entity 상태를 확인합니다.
    - `clearAutomatically` option의 동작을 test로 검증합니다.
    - affected rows 수가 예상과 일치하는지 확인합니다.
- test에서 발견된 문제를 바탕으로 option을 조정하고 logic을 개선합니다.


---


## Reference

- <https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/Modifying.html>
- <https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html>
- <https://www.baeldung.com/spring-data-jpa-modifying-annotation>

