---
layout: note
permalink: /385
title: JPA Persistence Context - 영속성 관리하기
description: JPA에서 entity를 관리하는 핵심 개념인 persistence context(영속성 context)는 entity의 생명 주기를 관리하고 다양한 성능 최적화 기능을 제공합니다.
date: 2025-09-29
---


## JPA Persistence Context

- JPA에서 entity를 관리하는 핵심 개념인 **persistence context(영속성 context)**는 entity의 생명 주기를 관리하고 다양한 성능 최적화 기능을 제공합니다.
- persistence context는 **first level cache(1차 cache)**, **dirty checking(변경 감지)**, **lazy loading(지연 loading)** 등의 기능을 통해 application과 database 간의 효율적인 data 처리를 가능하게 합니다.
- 각 JPA 구현체는 고유한 방식으로 persistence context를 구현하며, Spring Data JPA에서는 transaction 범위와 연계하여 자동으로 관리됩니다.


### Persistence Context 개념

- persistence context(영속성 context)는 **entity를 영구 저장하는 환경**을 의미하며, JPA의 핵심 architecture 요소입니다.
- `EntityManager`가 entity를 관리할 때 사용하는 **논리적인 공간**으로, application과 database 사이에서 중간 계층 역할을 합니다.
- persistence context는 entity의 상태 변화를 추적하고, database와의 동기화를 효율적으로 처리합니다.
- JPA 명세에서 정의된 표준 개념이므로, 모든 JPA 구현체에서 동일한 방식으로 동작합니다.


---


## Entity 생명 주기

- entity는 persistence context와의 관계에 따라 **네 가지 상태**로 구분되며, 각 상태는 서로 다른 특성을 가집니다.
- 생명 주기 상태는 `EntityManager`의 method 호출이나 transaction 처리에 따라 자동으로 변경됩니다.


### Transient State : 비영속 상태

- persistence context와 전혀 관계가 없는 **새로운 상태**의 entity입니다.
- 단순히 객체를 생성한 상태로, JPA가 해당 entity를 인식하지 못합니다.
    - `User user = new User();`와 같이 새로운 객체를 생성한 직후의 상태입니다.
    - 이 상태에서는 persistence context의 어떤 기능도 사용할 수 없습니다.
- transient 상태의 entity는 database와 연결되지 않으며, 변경 감지나 지연 loading 등의 기능이 동작하지 않습니다.


### Persistent : 영속 상태

- persistence context에 **관리되고 있는 상태**의 entity입니다.
- `EntityManager.persist()` method를 통해 persistence context에 저장된 entity나, database에서 조회한 entity가 이 상태에 해당합니다.
    - persistent 상태의 entity는 first level cache에 저장되어 빠른 조회가 가능합니다.
    - dirty checking을 통해 entity의 변경 사항이 자동으로 감지됩니다.
    - transaction commit 시점에 변경 사항이 database에 자동으로 반영됩니다.
- persistent 상태에서는 lazy loading, 변경 감지, identity 보장 등 모든 JPA 기능을 사용할 수 있습니다.


### Detached : 준영속 상태

- persistence context에 저장되었다가 **분리된 상태**의 entity입니다.
- `EntityManager.detach()`, `EntityManager.clear()`, `EntityManager.close()` method 호출 시 발생합니다.
    - detached 상태의 entity는 더 이상 persistence context의 관리를 받지 않습니다.
    - 변경 감지 기능이 동작하지 않으므로, entity를 수정해도 database에 반영되지 않습니다.
    - lazy loading을 시도하면 `LazyInitializationException`이 발생할 수 있습니다.
- detached 상태의 entity를 다시 persistent 상태로 만들려면 `EntityManager.merge()` method를 사용해야 합니다.


### Removed : 삭제 상태

- persistence context에서 **삭제하기로 예약된 상태**의 entity입니다.
- `EntityManager.remove()` method를 호출하면 entity가 removed 상태로 변경됩니다.
    - 실제 database 삭제는 transaction commit 시점에 수행됩니다.
    - removed 상태의 entity는 persistence context에서 관리되지만, database에서 제거될 예정입니다.
- removed 상태의 entity에 대한 추가적인 조작은 권장되지 않습니다.


---


## Persistence Context 주요 기능

- persistence context는 **성능 최적화**와 **data 일관성 보장**을 위한 다양한 기능을 제공합니다.
- 이러한 기능들은 application의 성능을 크게 향상시키고, 개발자가 database 처리를 더 편리하게 할 수 있도록 도와줍니다.


### First Level Cache (1차 Cache)

- persistence context 내부에 **Map 구조의 cache**를 유지하여 entity를 저장합니다.
- primary key를 key로 사용하고, entity 객체를 value로 저장하는 구조입니다.
    - 동일한 primary key로 entity를 조회할 때, database를 거치지 않고 first level cache에서 바로 반환합니다.
    - first level cache는 transaction 범위 내에서만 유효하므로, transaction이 종료되면 cache도 함께 사라집니다.
    - 같은 transaction 내에서 반복적으로 같은 entity를 조회할 때 성능상 이점을 제공합니다.
- first level cache는 성능 향상보다는 **identity 보장**과 **일관성 유지**에 더 중요한 역할을 합니다.


### Identity Guarantee (동일성 보장)

- 같은 primary key를 가진 entity는 **항상 동일한 객체 참조**를 반환합니다.
- first level cache를 통해 같은 entity에 대한 여러 번의 조회가 동일한 객체를 반환하도록 보장합니다.
    - Java의 `==` 비교와 `equals()` 비교가 모두 true를 반환합니다.
    - 이는 application level에서 객체의 일관성을 보장하는 중요한 기능입니다.
- identity 보장을 통해 entity의 상태 변화를 안전하게 추적할 수 있습니다.


### Dirty Checking (변경 감지)

- persistence context는 entity의 **변경 사항을 자동으로 감지**하여 database에 반영합니다.
- entity를 persistence context에 저장할 때의 **snapshot**을 보관하고, transaction commit 시점에 현재 상태와 비교합니다.
    - 변경된 field가 발견되면 자동으로 UPDATE query가 생성되어 실행됩니다.
    - 개발자가 별도로 update method를 호출할 필요가 없습니다.
    - 변경되지 않은 entity에 대해서는 불필요한 UPDATE query가 실행되지 않습니다.
- dirty checking은 persistent 상태의 entity에서만 동작하며, detached 상태에서는 작동하지 않습니다.


### Lazy Loading (지연 Loading)

- 연관된 entity나 collection을 **실제 사용하는 시점**에 database에서 조회하는 기능입니다.
- `@ManyToOne`, `@OneToMany` 등의 연관 관계에서 `fetch = FetchType.LAZY` 설정을 통해 활용할 수 있습니다.
    - lazy loading이 설정된 field에 접근할 때 proxy 객체를 통해 실제 database 조회가 수행됩니다.
    - 불필요한 join query를 방지하여 초기 조회 성능을 향상시킵니다.
    - N+1 문제를 방지하기 위해서는 fetch join이나 batch size 설정이 필요합니다.
- lazy loading은 persistence context가 활성화된 상태에서만 정상 동작합니다.


### Write-Behind (쓰기 지연)

- SQL query를 즉시 실행하지 않고 **내부 저장소에 모아두었다가** transaction commit 시점에 일괄 실행하는 기능입니다.
- `EntityManager.persist()`, `EntityManager.remove()` 등의 method 호출 시 SQL이 즉시 실행되지 않습니다.
    - write-behind SQL 저장소에 INSERT, UPDATE, DELETE query가 순서대로 저장됩니다.
    - transaction commit 시점에 저장된 모든 query가 database에 일괄 전송됩니다.
    - 이를 통해 database와의 통신 횟수를 줄이고 성능을 향상시킵니다.
- write-behind는 transaction 내에서 여러 entity 조작을 효율적으로 처리할 수 있게 해줍니다.


---


## 구현체별 Persistence Context

- JPA는 명세이므로, 실제 구현은 각 구현체에서 담당하며 고유한 특성을 가집니다.
- 주요 구현체들은 JPA 표준을 준수하면서도 추가적인 기능과 최적화를 제공합니다.


### Hibernate 구현체

- Hibernate에서는 **Session**이 persistence context 역할을 수행합니다.
- `SessionFactory`를 통해 Session을 생성하고, Session이 entity의 생명 주기를 관리합니다.
    - Hibernate Session은 JPA `EntityManager`의 구현체이기도 합니다.
    - Session은 first level cache와 dirty checking, lazy loading 등 모든 persistence context 기능을 제공합니다.
    - Hibernate 고유 기능인 batch fetching, second level cache 등을 추가로 지원합니다.
- Hibernate Session은 thread-safe하지 않으므로, 여러 thread에서 공유해서는 안 됩니다.


### EclipseLink 구현체

- EclipseLink에서는 **EntityManager**가 직접 persistence context를 관리합니다.
- Oracle에서 주도하는 JPA 참조 구현체로, **JPA 명세를 가장 충실히 따릅니다.**
    - EclipseLink의 persistence context는 JPA 표준 기능에 집중되어 있습니다.
    - 추가적인 caching 전략과 성능 최적화 기능을 제공합니다.
    - MOXy를 통한 XML/JSON binding 등 확장 기능을 지원합니다.
- EclipseLink는 enterprise 환경에서 안정성과 표준 준수를 중시하는 project에 적합합니다.


### Spring Data JPA에서의 관리

- Spring Data JPA는 JPA 구현체를 wrapping하여 **transaction 범위와 persistence context를 연동**합니다.
- `@Transactional` annotation을 통해 persistence context의 생명 주기를 자동으로 관리합니다.
    - method 시작 시점에 persistence context가 생성되고, method 종료 시점에 자동으로 close됩니다.
    - transaction이 commit되면 write-behind된 SQL이 자동으로 flush됩니다.
    - transaction이 rollback되면 persistence context의 변경 사항이 모두 취소됩니다.
- Spring Data JPA Repository는 내부적으로 `EntityManager`를 사용하여 persistence context 기능을 활용합니다.


---


## Persistence Context 생명 주기 관리

- persistence context는 **적절한 시점에 생성하고 해제**해야 memory leak과 성능 문제를 방지할 수 있습니다.
- transaction과의 관계를 이해하고, 올바른 범위에서 persistence context를 사용하는 것이 중요합니다.


### Transaction과의 관계

- persistence context는 **transaction과 동일한 생명 주기**를 가지는 것이 일반적입니다.
- transaction이 시작될 때 persistence context가 생성되고, transaction이 종료될 때 함께 종료됩니다.
    - transaction commit 시점에 persistence context의 변경 사항이 database에 반영됩니다.
    - transaction rollback 시점에 persistence context의 모든 변경 사항이 취소됩니다.
    - transaction 범위를 벗어난 entity는 detached 상태가 되어 더 이상 persistence context의 기능을 사용할 수 없습니다.
- Spring에서는 `@Transactional` annotation을 통해 이러한 생명 주기 관리가 자동화됩니다.


### EntityManager 생명 주기

- `EntityManager`는 **thread-safe하지 않으므로** 여러 thread에서 공유해서는 안 됩니다.
- 일반적으로 request당 하나의 `EntityManager`를 사용하는 pattern을 권장합니다.
    - web application에서는 HTTP request 범위에서 `EntityManager`를 생성하고 사용합니다.
    - request 처리가 완료되면 `EntityManager`를 close하여 자원을 해제합니다.
    - Spring Container는 이러한 생명 주기 관리를 proxy를 통해 자동화합니다.
- `EntityManager`를 적절히 close하지 않으면 connection leak이나 memory leak이 발생할 수 있습니다.


### Detached 상태 처리

- transaction 범위를 벗어난 entity는 **detached 상태**가 되므로 별도의 처리가 필요합니다.
- detached 상태의 entity를 다시 사용하려면 `EntityManager.merge()` method를 통해 persistent 상태로 변경해야 합니다.
    - `merge()` method는 detached entity의 값을 새로운 persistent entity에 복사하여 반환합니다.
    - 원본 detached entity는 여전히 detached 상태로 남아있습니다.
    - web application에서는 view layer에서 lazy loading이 필요한 경우 Open Session in View pattern을 고려할 수 있습니다.
- detached 상태에서 lazy loading을 시도하면 `LazyInitializationException`이 발생하므로 주의가 필요합니다.


---


## 주의 사항과 Best Practice

- persistence context를 효과적으로 활용하기 위해서는 **몇 가지 주의 사항**을 숙지하고 적절한 사용 pattern을 따라야 합니다.
- 잘못된 사용은 성능 저하나 예상하지 못한 동작을 발생시킬 수 있습니다.


### Memory 관리

- persistence context는 **first level cache에 entity를 계속 보관**하므로, 대량의 data를 처리할 때 memory 사용량에 주의해야 합니다.
- 장시간 실행되는 batch 작업에서는 주기적으로 `EntityManager.clear()`를 호출하여 first level cache를 비워야 합니다.
    - 대량의 entity를 처리할 때는 일정 단위로 `flush()`와 `clear()`를 호출합니다.
    - 불필요한 entity 참조를 제거하여 garbage collection이 정상적으로 동작하도록 합니다.
    - batch 크기를 적절히 조절하여 memory 사용량을 제어합니다.
- memory 부족 상황을 방지하기 위해 application monitoring과 profiling을 수행하는 것이 좋습니다.


### N+1 Problem 방지

- lazy loading 사용 시 **N+1 문제**가 발생할 수 있으므로, fetch join이나 batch fetching을 활용해야 합니다.
- 연관 관계가 복잡한 entity를 조회할 때는 필요한 data만 명시적으로 fetch하는 것이 중요합니다.
    - JPQL의 `JOIN FETCH` 구문을 사용하여 연관된 entity를 한 번에 조회합니다.
    - `@BatchSize` annotation을 사용하여 lazy loading 시 batch 단위로 조회하도록 설정합니다.
    - DTO projection을 활용하여 필요한 field만 선택적으로 조회합니다.
- query 실행 계획을 monitoring하여 예상치 못한 추가 query가 발생하지 않는지 확인해야 합니다.


### Transaction 범위 관리

- persistence context의 기능을 제대로 활용하려면 **적절한 transaction 범위 설정**이 필수입니다.
- transaction 범위가 너무 크면 lock 경합이나 memory 문제가 발생할 수 있고, 너무 작으면 persistence context의 이점을 활용하기 어렵습니다.
    - business logic의 단위에 맞춰 transaction 범위를 설정합니다.
    - read-only 작업에는 `@Transactional(readOnly = true)`를 사용하여 성능을 최적화합니다.
    - 긴 작업은 여러 개의 작은 transaction으로 분할하는 것을 고려합니다.
- transaction 전파 option을 적절히 활용하여 method 간의 transaction 관계를 명확히 정의해야 합니다.


### Entity 상태 관리

- entity의 **현재 상태를 정확히 파악**하고, 상태 변화에 따른 동작을 예측할 수 있어야 합니다.
- 특히 detached 상태의 entity를 다룰 때는 lazy loading이나 dirty checking이 동작하지 않음을 인지해야 합니다.
    - entity의 현재 상태를 확인하기 위해 `EntityManager.contains()` method를 활용합니다.
    - detached entity의 연관 관계를 사용하기 전에 필요한 data를 미리 초기화합니다.
    - DTO와 entity 간의 변환 시점과 방법을 명확히 정의합니다.
- entity 상태 변화 log를 통해 예상치 못한 상태 변화가 발생하지 않는지 monitoring하는 것이 좋습니다.


---


## Reference

- <https://jakarta.ee/specifications/persistence/3.0/>
- <https://docs.jboss.org/hibernate/orm/6.2/userguide/html_single/Hibernate_User_Guide.html>
- <https://www.eclipse.org/eclipselink/documentation/>
- <https://docs.spring.io/spring-data/jpa/docs/current/reference/html/>

