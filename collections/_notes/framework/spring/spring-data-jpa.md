---
layout: note
permalink: /386
title: Spring Data JPA - JPA 쉽게 사용하기
description: Spring Data JPA는 JPA를 wrapping하여 boilerplate code 없이 repository pattern 기반의 data access layer를 구현하고, transaction 및 persistence context 관리를 자동화하는 Spring 생태계의 핵심 기술입니다.
date: 2025-09-29
---


## Spring Data JPA

- Spring Data JPA는 **JPA 기반의 data access layer를 쉽게 구현**할 수 있도록 지원하는 Spring Framework의 하위 project입니다.
- Repository pattern을 통해 반복적인 CRUD code를 제거하고, method 이름만으로 query를 자동 생성하는 강력한 기능을 제공합니다.
- JPA 구현체(주로 Hibernate)를 wrapping하여 transaction 관리, persistence context 관리 등을 자동화합니다.


---


## Spring Data JPA 개념

- Spring Data JPA는 **JPA를 더 쉽고 편리하게 사용**하기 위한 abstraction layer입니다.
- 개발자가 boilerplate code를 작성하지 않고도 database 작업을 수행할 수 있도록 다양한 기능을 제공합니다.
- JPA 표준 기능을 그대로 사용하면서, Spring의 편의 기능을 추가로 활용할 수 있습니다.


### JPA와의 관계

- Spring Data JPA는 **JPA의 구현체가 아니라 JPA를 활용하는 framework**입니다.
- 내부적으로 JPA 구현체(Hibernate, EclipseLink 등)를 사용하며, 이를 더 편리하게 사용할 수 있도록 wrapping합니다.
    - JPA의 `EntityManager`를 직접 다루지 않고도 database 작업을 수행할 수 있습니다.
    - JPA의 모든 기능을 그대로 사용할 수 있으며, 필요시 `EntityManager`에 직접 접근할 수도 있습니다.
    - persistence context, entity 생명 주기 등 JPA의 핵심 개념은 그대로 적용됩니다.
- Spring Data JPA를 사용하더라도 JPA의 동작 원리를 이해하는 것이 중요합니다.


### Spring Framework와의 통합

- Spring Data JPA는 **Spring의 핵심 기능들과 완벽하게 통합**되어 동작합니다.
- Spring Container가 제공하는 dependency injection, transaction 관리, AOP 등의 기능을 활용합니다.
    - `@Transactional` annotation을 통한 선언적 transaction 관리가 가능합니다.
    - Spring의 exception translation을 통해 JPA exception을 Spring의 `DataAccessException`으로 변환합니다.
    - component scan을 통해 repository를 자동으로 bean으로 등록합니다.
- Spring Boot를 사용하면 auto-configuration을 통해 설정이 더욱 간소화됩니다.


---


## Repository Pattern

- Repository pattern이란 **data access logic을 추상화하여 business logic과 분리**하는 design pattern입니다.
    - "database 작업을 담당하는 전용 객체"를 만들어서 business logic과 database code를 분리하는 방식입니다.
    1. database 접근 코드를 repository interface 뒤로 숨깁니다.
    2. business logic은 repository interface만 의존하고, 실제 구현 방식(JPA, JDBC 등)은 알 필요가 없게 됩니다.
        - test 시 repository를 mock으로 쉽게 교체할 수도 있습니다.

- Spring Data JPA의 핵심은 **Repository pattern**을 통한 data access layer 구현입니다.
    - interface만 정의하면 Spring Data JPA가 runtime에 구현체를 자동으로 생성합니다.


### Repository 계층 구조

- Spring Data JPA는 **여러 단계의 repository interface**를 제공하여 필요한 기능만 선택적으로 사용할 수 있습니다.
- 각 interface는 상위 interface를 상속하며, 점진적으로 더 많은 기능을 제공합니다.
    - `Repository` : marker interface로, 아무 method도 제공하지 않습니다.
    - `CrudRepository` : 기본적인 CRUD 기능을 제공합니다.
    - `PagingAndSortingRepository` : paging과 sorting 기능을 추가로 제공합니다.
    - `JpaRepository` : JPA에 특화된 batch 작업, flush 등의 기능을 제공합니다.
- 일반적으로 `JpaRepository`를 상속하여 사용하는 것이 가장 편리합니다.


### 기본 CRUD Operation

- `JpaRepository`는 **별도 구현 없이 즉시 사용 가능한 CRUD method**를 제공합니다.
- entity의 생성, 조회, 수정, 삭제 작업을 간단한 method 호출만으로 수행할 수 있습니다.
    - `save(entity)` : entity를 저장하거나 수정합니다.
    - `findById(id)` : primary key로 entity를 조회합니다.
    - `findAll()` : 모든 entity를 조회합니다.
    - `delete(entity)` : entity를 삭제합니다.
    - `count()` : entity의 총 개수를 반환합니다.
    - `existsById(id)` : 해당 id를 가진 entity의 존재 여부를 확인합니다.
- 이러한 기본 method만으로도 대부분의 단순한 CRUD 작업을 처리할 수 있습니다.


### Query Method

- method 이름만으로 **자동으로 query를 생성**하는 강력한 기능입니다.
- naming convention을 따라 method 이름을 작성하면, Spring Data JPA가 JPQL을 자동으로 생성하여 실행합니다.
    - `findByUsername(String username)` : username field로 조회하는 query를 생성합니다.
    - `findByAgeGreaterThan(int age)` : age가 특정 값보다 큰 entity를 조회합니다.
    - `findByUsernameAndAge(String username, int age)` : 여러 조건을 조합할 수 있습니다.
    - `countByStatus(String status)` : 조건에 맞는 entity의 개수를 반환합니다.
    - `deleteByUsername(String username)` : 조건에 맞는 entity를 삭제합니다.
- query method는 간단한 조회 조건에 매우 유용하지만, 복잡한 query에는 `@Query`를 사용하는 것이 좋습니다.


---


## Query 작성 방법

- Spring Data JPA는 **다양한 방식으로 query를 작성**할 수 있는 유연성을 제공합니다.
- 상황과 복잡도에 따라 적절한 방법을 선택하여 사용할 수 있습니다.


### @Query Annotation

- JPQL이나 native SQL을 **직접 작성**하여 복잡한 query를 실행할 수 있습니다.
- query method로 표현하기 어려운 복잡한 조건이나 join을 처리할 때 유용합니다.
    - `@Query("SELECT u FROM User u WHERE u.age > :age")` 형태로 JPQL을 작성합니다.
    - named parameter(`:age`)나 positional parameter(`?1`)를 사용할 수 있습니다.
    - `nativeQuery = true` option으로 native SQL을 사용할 수 있습니다.
    - `@Modifying`과 함께 사용하여 UPDATE, DELETE query를 실행할 수 있습니다.
- JPQL을 사용하면 database에 독립적인 query를 작성할 수 있습니다.


### Named Query

- entity class에 **미리 정의된 query**를 작성하고 이름으로 참조하는 방법입니다.
- `@NamedQuery` annotation을 entity class에 선언하여 사용합니다.
    - query의 재사용성이 높아지고, entity와 관련된 query를 한곳에 모아 관리할 수 있습니다.
    - application 시작 시점에 query 문법을 검증하므로, runtime error를 방지할 수 있습니다.
    - repository interface에서는 method 이름만으로 named query를 실행할 수 있습니다.
- 현대적인 개발에서는 `@Query`를 더 많이 사용하는 추세입니다.


### QueryDSL 통합

- **type-safe한 query 작성**을 위해 QueryDSL을 통합하여 사용할 수 있습니다.
- compile time에 query 오류를 발견할 수 있고, IDE의 자동완성 기능을 활용할 수 있습니다.
    - QueryDSL은 Java code로 query를 작성하므로 refactoring이 용이합니다.
    - 복잡한 동적 query를 작성할 때 JPQL보다 훨씬 편리합니다.
    - `QuerydslPredicateExecutor` interface를 상속하여 QueryDSL 기능을 사용할 수 있습니다.
- 대규모 project나 복잡한 query가 많은 경우 QueryDSL 도입을 적극 권장합니다.


### Specification

- JPA Criteria API를 기반으로 **재사용 가능한 query 조건**을 정의하는 방법입니다.
- 복잡한 검색 조건을 조합하여 동적 query를 생성할 때 유용합니다.
    - `JpaSpecificationExecutor` interface를 상속하여 사용합니다.
    - `Specification` 객체를 조합하여 AND, OR 등의 논리 연산을 수행할 수 있습니다.
    - 검색 조건을 독립적인 specification으로 분리하여 재사용성을 높일 수 있습니다.
- QueryDSL에 비해 type-safe하진 않지만, 추가적인 library 없이 사용할 수 있다는 장점이 있습니다.


---


## Transaction 관리

- Spring Data JPA는 **Spring의 선언적 transaction 관리**와 완벽하게 통합됩니다.
- `@Transactional` annotation을 통해 transaction 경계를 명확하게 정의할 수 있습니다.


### @Transactional Annotation

- method나 class level에서 **transaction 범위를 선언적으로 정의**합니다.
- Spring AOP를 통해 transaction 시작, commit, rollback이 자동으로 처리됩니다.
    - `@Transactional`이 적용된 method가 실행되면 transaction이 시작됩니다.
    - method가 정상 종료되면 자동으로 commit되고, exception이 발생하면 rollback됩니다.
    - `readOnly = true` option으로 읽기 전용 transaction을 설정할 수 있습니다.
    - `propagation` option으로 transaction 전파 방식을 제어할 수 있습니다.
    - `isolation` option으로 transaction isolation level을 지정할 수 있습니다.
- repository method는 기본적으로 transaction 내에서 실행되지만, service layer에서 `@Transactional`을 명시하는 것이 권장됩니다.


### Persistence Context와 Transaction

- persistence context는 **transaction과 동일한 생명 주기**를 가집니다.
- `@Transactional` 범위가 persistence context의 범위가 되므로, transaction 관리가 곧 persistence context 관리입니다.
    - transaction이 시작되면 persistence context가 생성됩니다.
    - transaction이 commit되면 persistence context의 변경 사항이 database에 flush됩니다.
    - transaction이 종료되면 persistence context도 close되고, entity는 detached 상태가 됩니다.
- lazy loading은 persistence context가 활성화된 transaction 범위 내에서만 동작합니다.


### Read-Only Transaction

- **읽기 전용 작업**에는 `@Transactional(readOnly = true)`를 사용하여 성능을 최적화할 수 있습니다.
- read-only transaction은 flush를 생략하고, dirty checking을 수행하지 않아 성능상 이점을 제공합니다.
    - Hibernate는 read-only transaction에서 snapshot을 저장하지 않으므로 memory 사용량이 감소합니다.
    - database에 read-only hint를 전달하여 database level의 최적화도 가능합니다.
    - 실수로 data를 변경하는 것을 방지하는 안전 장치 역할도 합니다.
- 조회만 수행하는 service method에는 항상 `readOnly = true`를 설정하는 것이 좋습니다.


---


## Paging과 Sorting

- Spring Data JPA는 **대량의 data를 효율적으로 조회**하기 위한 paging과 sorting 기능을 제공합니다.
- 복잡한 paging logic을 직접 구현하지 않고도 간단하게 사용할 수 있습니다.


### Pageable Interface

- **paging 정보를 전달**하기 위한 interface입니다.
- repository method의 parameter로 `Pageable`을 받으면 자동으로 paging query가 생성됩니다.
    - `PageRequest.of(page, size)` 형태로 `Pageable` 객체를 생성합니다.
    - page는 0부터 시작하며, size는 한 page에 포함될 data 개수입니다.
    - `Sort` 객체를 함께 전달하여 정렬 조건을 추가할 수 있습니다.
- Spring MVC와 통합하여 HTTP request parameter로부터 자동으로 `Pageable` 객체를 생성할 수 있습니다.


### Page와 Slice

- paging 결과를 담는 **두 가지 return type**을 제공합니다.
    - 상황에 따라 적절한 type을 선택하여 사용할 수 있습니다.

1. `Page` : 전체 data 개수를 포함하는 paging 결과입니다.
    - `Page`는 total count query를 추가로 실행하여 전체 개수를 계산합니다.
2. `Slice` : 다음 page의 존재 여부만 확인하는 가벼운 paging 결과입니다.
    - `Slice`는 현재 page size보다 1개 더 조회하여 다음 page 존재 여부를 판단합니다.

- 무한 scroll 같은 UI에서는 `Slice`를 사용하는 것이 성능상 유리합니다.


### Sorting

- **정렬 조건을 동적으로 지정**할 수 있는 기능입니다.
- `Sort` 객체를 통해 여러 field에 대한 복합 정렬을 수행할 수 있습니다.
    - `Sort.by("username")` 형태로 단일 field 정렬을 지정합니다.
    - `Sort.by("username").and(Sort.by("age").descending())` 형태로 복합 정렬이 가능합니다.
    - method 이름에 `OrderBy`를 포함하여 고정된 정렬 조건을 지정할 수도 있습니다.
- sorting 조건이 복잡한 경우 `@Query`에서 ORDER BY를 직접 작성하는 것도 고려할 수 있습니다.


---


## Auditing

- Spring Data JPA는 **entity의 생성 일시, 수정 일시, 생성자, 수정자 등을 자동으로 관리**하는 auditing 기능을 제공합니다.
- 반복적인 audit field 관리 code를 제거하고, 일관된 방식으로 audit 정보를 기록할 수 있습니다.


### Auditing 설정

- `@EnableJpaAuditing` annotation을 configuration class에 추가하여 auditing 기능을 활성화합니다.
- entity에는 `@EntityListeners(AuditingEntityListener.class)`를 추가합니다.
    - `@CreatedDate` : entity 생성 시간을 자동으로 저장합니다.
    - `@LastModifiedDate` : entity 수정 시간을 자동으로 갱신합니다.
    - `@CreatedBy` : entity를 생성한 사용자 정보를 저장합니다.
    - `@LastModifiedBy` : entity를 수정한 사용자 정보를 저장합니다.
- `AuditorAware` interface를 구현하여 현재 사용자 정보를 제공해야 합니다.


### Base Entity Pattern

- audit field를 **공통 base entity**로 추출하여 중복을 제거할 수 있습니다.
- 모든 entity가 상속받을 수 있는 추상 class를 만들어 audit field를 관리합니다.
    - `@MappedSuperclass` annotation을 사용하여 base entity를 정의합니다.
    - 생성일시, 수정일시 등 공통 field를 base entity에 선언합니다.
    - 실제 entity는 base entity를 상속받아 audit 기능을 자동으로 사용합니다.
- base entity pattern은 code 중복을 줄이고 유지 보수성을 높입니다.


---


## Custom Repository 구현

- Spring Data JPA의 기본 기능만으로 부족한 경우, **custom repository를 구현**하여 기능을 확장할 수 있습니다.
- complex query나 특별한 처리 logic이 필요한 경우 custom repository가 유용합니다.


### Custom Interface 정의

- 추가하고자 하는 **custom method를 정의한 interface**를 생성합니다.
- 이 interface는 Spring Data JPA repository와 별도로 존재하며, 원하는 method signature를 자유롭게 정의할 수 있습니다.
    - custom interface 이름은 임의로 지정할 수 있습니다.
    - 복잡한 통계 query, bulk update, native query 등을 선언합니다.
- custom interface는 여러 repository에서 재사용할 수도 있습니다.


### Custom 구현체 작성

- custom interface를 **구현하는 class**를 작성합니다.
- 구현 class의 이름은 반드시 `{Repository이름}Impl` 형식을 따라야 Spring이 자동으로 인식합니다.
    - `EntityManager`를 injection 받아 직접 JPQL이나 Criteria API를 사용할 수 있습니다.
    - JDBC template, QueryDSL 등 다른 기술을 함께 사용할 수도 있습니다.
    - 복잡한 business logic을 repository layer에서 처리할 수 있습니다.
- custom 구현체는 자동으로 bean으로 등록되고, Spring Data JPA repository와 통합됩니다.


### Repository 통합

- 기본 `JpaRepository`와 **custom interface를 모두 상속**하여 통합된 repository를 만듭니다.
- 하나의 repository interface에서 기본 CRUD method와 custom method를 모두 사용할 수 있습니다.
    - `interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom` 형태로 선언합니다.
    - Spring Data JPA가 runtime에 proxy를 생성하여 모든 method를 통합합니다.
    - client code는 단일 repository interface만 injection 받아 사용합니다.
- 이 pattern을 통해 기본 기능과 확장 기능을 깔끔하게 통합할 수 있습니다.


---


## 주의 사항과 Best Practice

- Spring Data JPA를 효과적으로 사용하기 위해서는 **몇 가지 주의 사항**을 숙지하고 적절한 사용 pattern을 따라야 합니다.
- JPA의 특성을 이해하고 Spring Data JPA의 편의 기능을 올바르게 활용하는 것이 중요합니다.


### N+1 문제 해결

- lazy loading으로 인한 **N+1 문제는 Spring Data JPA에서도 주의**해야 할 가장 중요한 issue입니다.
- fetch join이나 `@EntityGraph`를 활용하여 N+1 문제를 예방할 수 있습니다.
    - `@Query`에서 `JOIN FETCH`를 명시하여 연관된 entity를 한 번에 조회합니다.
    - `@EntityGraph` annotation으로 fetch할 attribute를 선언적으로 지정할 수 있습니다.
    - Hibernate의 `@BatchSize`를 사용하여 batch fetching을 설정합니다.
    - 복잡한 경우 DTO projection을 활용하여 필요한 data만 조회합니다.
- query 실행 log를 monitoring하여 의도하지 않은 추가 query가 발생하지 않는지 확인해야 합니다.


### Transaction 범위 설정

- **적절한 transaction 범위 설정**은 Spring Data JPA 사용의 핵심입니다.
- service layer에서 `@Transactional`을 명시하여 business logic 단위로 transaction을 관리합니다.
    - repository method는 기본적으로 transaction이 필요하지만, service에서 transaction을 선언하는 것이 권장됩니다.
    - 여러 repository 호출을 하나의 transaction으로 묶어 원자성을 보장합니다.
    - lazy loading이 필요한 경우 transaction 범위 내에서 entity를 사용해야 합니다.
- transaction 범위가 너무 크면 성능 문제가, 너무 작으면 일관성 문제가 발생할 수 있습니다.


### Query Method 남용 방지

- 간단한 query는 **query method로 작성**하되, 복잡한 경우 `@Query`를 사용합니다.
- method 이름이 지나치게 길어지면 가독성이 떨어지고 유지 보수가 어려워집니다.
    - 2-3개 이상의 조건이 조합되면 `@Query`로 전환하는 것을 고려합니다.
    - join이 필요한 경우 query method보다 `@Query`가 더 명확합니다.
    - 복잡한 동적 query는 QueryDSL이나 Specification을 사용합니다.
- query의 의도가 명확하게 드러나는 방법을 선택하는 것이 중요합니다.


### DTO Projection 활용

- entity 전체가 아닌 **필요한 field만 조회**할 때는 DTO projection을 활용합니다.
- 불필요한 data 조회를 줄여 성능을 향상시키고, entity의 변경 위험을 방지할 수 있습니다.
    - interface 기반 projection으로 필요한 field만 선언할 수 있습니다.
    - class 기반 projection으로 custom DTO를 직접 정의할 수 있습니다.
    - JPQL의 constructor expression을 사용하여 query 결과를 DTO로 받을 수 있습니다.
- read-only 작업에서는 DTO projection을 적극적으로 활용하는 것이 권장됩니다.


### Repository 책임 분리

- repository는 **순수한 data access 책임**만 가져야 합니다.
- business logic은 service layer에 두고, repository는 database 작업에만 집중하도록 설계합니다.
    - repository method는 단순한 CRUD나 조회 logic만 포함해야 합니다.
    - 복잡한 business 규칙은 service layer에서 처리합니다.
    - repository method 이름은 수행하는 database 작업을 명확히 표현해야 합니다.
- 이러한 계층 분리를 통해 test와 유지 보수가 용이한 구조를 만들 수 있습니다.


---


## Reference

- <https://docs.spring.io/spring-data/jpa/docs/current/reference/html/>
- <https://spring.io/projects/spring-data-jpa>
- <https://docs.jboss.org/hibernate/orm/6.2/userguide/html_single/Hibernate_User_Guide.html>

