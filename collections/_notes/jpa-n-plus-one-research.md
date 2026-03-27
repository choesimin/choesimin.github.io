# JPA N+1 문제 - 글감 조사 보고서

> 조사일: 2026-03-27 | 대상 문서: `framework/jpa/n-plus-one.md` (#480)


---


## 1. 해결 방법별 상세 비교


### 1-1. Fetch Join

#### JPQL 작성 방법과 실제 생성 쿼리

```java
// Repository
@Query("SELECT d FROM Department d JOIN FETCH d.employees")
List<Department> findAllWithEmployees();
```

**생성되는 SQL:**
```sql
SELECT d.*, e.*
FROM department d
INNER JOIN employee e ON d.id = e.department_id
```

- `JOIN FETCH`는 JPQL 전용 키워드로, SQL의 `JOIN`과 달리 연관된 entity를 **영속성 context에 함께 로드**
- `LEFT JOIN FETCH`를 사용하면 자식이 없는 부모도 포함

```java
@Query("SELECT d FROM Department d LEFT JOIN FETCH d.employees")
List<Department> findAllWithEmployeesIncludingEmpty();
```

**출처:**
- https://vladmihalcea.com/join-fetch-pagination-spring/
- https://www.prometheanz.com/blog/jpa-n-plus-one-query-problem-solution

#### 페이징(setFirstResult/setMaxResults) 사용 시 문제점

컬렉션 fetch join과 페이징을 함께 사용하면 **HHH90003004 경고**가 발생한다.

```
HHH90003004: firstResult/maxResults specified with collection fetch; applying in memory
```

**문제 원인:**
- fetch join으로 컬렉션을 조회하면 SQL 결과가 **row 중복** (부모 1개 + 자식 N개 → N rows)
- DB 레벨의 `LIMIT/OFFSET`이 부모 entity 기준이 아닌 **row 기준**으로 적용됨
- Hibernate가 이를 인지하고 **전체 결과를 메모리에 로드한 후 Java 레벨에서 페이징** 수행
- 데이터가 많으면 **OutOfMemoryError 위험**

**해결 방법 — 2단계 쿼리:**
```java
// 1단계: ID만 페이징 조회
@Query("SELECT d.id FROM Department d")
Page<Long> findDepartmentIds(Pageable pageable);

// 2단계: ID 기반으로 fetch join
@Query("SELECT d FROM Department d LEFT JOIN FETCH d.employees WHERE d.id IN :ids")
List<Department> findAllWithEmployeesByIds(@Param("ids") List<Long> ids);
```

**출처:**
- https://vladmihalcea.com/join-fetch-pagination-spring/
- https://tomcatflow.com/blog/hibernate-fetch-join-pagination/

#### 컬렉션 2개 이상 fetch join 시 카테시안 곱 문제

```java
// ❌ 이 쿼리는 MultipleBagFetchException 발생
@Query("SELECT d FROM Department d JOIN FETCH d.employees JOIN FETCH d.projects")
List<Department> findAllWithEmployeesAndProjects();
```

**발생 원인:**
- Hibernate에서 `List`로 매핑된 컬렉션은 내부적으로 **Bag** 타입으로 처리
- 2개 이상의 Bag을 동시에 fetch join하면 SQL 결과가 **카테시안 곱**(M × N rows)
- Hibernate가 어떤 row가 어느 컬렉션에 속하는지 **구분 불가**

```
org.hibernate.loader.MultipleBagFetchException:
  cannot simultaneously fetch multiple bags
```

**해결 방법 1 — List를 Set으로 변경:**
```java
@Entity
public class Department {
    @OneToMany(mappedBy = "department")
    private Set<Employee> employees;  // List → Set

    @OneToMany(mappedBy = "department")
    private Set<Project> projects;    // List → Set
}
```

**해결 방법 2 — 쿼리 분리:**
```java
// 쿼리 1: employees만 fetch
@Query("SELECT d FROM Department d LEFT JOIN FETCH d.employees")
List<Department> findAllWithEmployees();

// 쿼리 2: projects만 fetch (영속성 context 덕분에 1차 캐시에서 병합)
@Query("SELECT d FROM Department d LEFT JOIN FETCH d.projects")
List<Department> findAllWithProjects();
```

**출처:**
- https://www.baeldung.com/java-hibernate-multiplebagfetchexception
- https://thorben-janssen.com/fix-multiplebagfetchexception-hibernate/


---


### 1-2. EntityGraph

#### @EntityGraph 어노테이션 사용법

**방법 1 — attributePaths 직접 지정 (ad-hoc):**
```java
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    @EntityGraph(attributePaths = {"employees"})
    List<Department> findAll();

    // 중첩 연관 관계도 dot notation으로 지정 가능
    @EntityGraph(attributePaths = {"employees", "employees.address"})
    List<Department> findAllWithEmployeesAndAddresses();
}
```

**방법 2 — NamedEntityGraph 사용 (재사용 가능):**
```java
@NamedEntityGraph(
    name = "Department.withEmployees",
    attributeNodes = @NamedAttributeNode("employees")
)
@Entity
public class Department { ... }

// Repository에서 참조
@EntityGraph(value = "Department.withEmployees")
List<Department> findAll();
```

**방법 3 — 중첩 Subgraph:**
```java
@NamedEntityGraph(
    name = "Department.detail",
    attributeNodes = {
        @NamedAttributeNode(value = "employees", subgraph = "employeeSubgraph")
    },
    subgraphs = {
        @NamedSubgraph(
            name = "employeeSubgraph",
            attributeNodes = {
                @NamedAttributeNode("address"),
                @NamedAttributeNode("skills")
            }
        )
    }
)
@Entity
public class Department { ... }
```

**출처:**
- https://www.baeldung.com/jpa-entity-graph
- https://www.codelessgenie.com/blog/named-entity-graph-sub-subgraph/
- https://jpa-buddy.com/blog/dynamic-entity-graphs-in-spring-data-jpa/

#### Fetch Join과의 차이점

| 항목 | Fetch Join | EntityGraph |
|------|-----------|-------------|
| 정의 방식 | JPQL 쿼리 문자열에 `JOIN FETCH` 작성 | 어노테이션으로 선언 |
| 적용 범위 | 커스텀 `@Query` 필수 | `findAll()`, `findBy...` 등 파생 쿼리에도 적용 가능 |
| 중복 결과 | 부모 entity가 중복될 수 있음 → `DISTINCT` 필요 | 일반적으로 중복 제거됨 |
| 재사용성 | 쿼리마다 개별 작성 | `@NamedEntityGraph`로 여러 메서드에서 재사용 |
| 동적 제어 | 어려움 (쿼리 문자열 변경 필요) | `EntityManager.createEntityGraph()`로 동적 구성 가능 |
| 내부 동작 | 직접 SQL JOIN 생성 | JPA 제공자가 최적화하여 JOIN 또는 추가 쿼리 생성 |
| 표준 | JPA 표준 (JPQL) | JPA 2.1 표준 |

**출처:**
- https://dev.to/tommyc/spring-jpa-entitygraph-24go
- https://learncodewithdurgesh.com/tutorials/spring-boot-tutorials/entitygraph-in-spring-data-jpa


---


### 1-3. BatchSize

#### @BatchSize 어노테이션과 hibernate.default_batch_fetch_size 설정

**방법 1 — 특정 연관 관계에 적용:**
```java
@Entity
public class Department {
    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
    @BatchSize(size = 20)
    private List<Employee> employees;
}
```

**방법 2 — 전역 설정 (application.yml):**
```yaml
spring:
  jpa:
    properties:
      hibernate:
        default_batch_fetch_size: 20
```

- 전역 설정은 모든 LAZY 연관 관계에 일괄 적용
- `@BatchSize` 어노테이션은 전역 설정을 **오버라이드**

#### IN 절을 사용하는 동작 방식

부모 entity 3개를 조회한 후 `employees`에 접근하는 경우:

```sql
-- N+1 (BatchSize 미적용)
SELECT * FROM employee WHERE department_id = 1;
SELECT * FROM employee WHERE department_id = 2;
SELECT * FROM employee WHERE department_id = 3;

-- BatchSize = 10 적용 시 (3개가 하나의 batch로 묶임)
SELECT * FROM employee WHERE department_id IN (1, 2, 3);
```

- 부모가 25개이고 `@BatchSize(size=10)`이면 → **3번의 쿼리** (10 + 10 + 5)
- 총 쿼리 수: `1(부모) + ceil(N / batchSize)(자식)` = **N+1이 아닌 1+ceil(N/B)**

#### 적절한 BatchSize 값 선택 기준

| BatchSize 범위 | 특징 | 적합한 경우 |
|---------------|------|-----------|
| 4, 8, 16 | 안전하고 메모리 효율적 | 일반적인 CRUD 애플리케이션 |
| 32, 50 | 적절한 균형 | 중간 규모 데이터 처리 |
| 100+ | 쿼리 수 최소화 | 대용량 배치 처리 (주의 필요) |
| 500, 1000+ | **비권장** | DB의 IN절 제한(Oracle 1000개), 메모리 과다 사용 |

**권장 값: 16 ~ 32 (전역), 필요 시 특정 연관 관계에 더 큰 값 지정**

**주의사항:**
- Hibernate는 설정된 batch size까지의 모든 크기에 대해 **prepared statement를 캐싱**
- 너무 큰 값은 시작 시간과 메모리 사용량 증가
- 2의 거듭제곱 값이 관례적으로 권장됨 (시스템 정렬, 메모리 페이지 크기)

**출처:**
- https://stackoverflow.com/questions/21162172/default-batch-fetch-size-recommended-values
- https://www.w3tutorials.net/blog/default-batch-fetch-size-recommended-values/
- https://thorben-janssen.com/hibernate-tips-how-to-fetch-associations-in-batches/
- https://www.baeldung.com/hibernate-fetchmode


---


### 1-4. Subselect

#### @Fetch(FetchMode.SUBSELECT) 동작 방식

```java
@Entity
public class Department {
    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
    @Fetch(FetchMode.SUBSELECT)
    private List<Employee> employees;
}
```

**동작:**
1. 부모 entity 조회 쿼리 실행
2. 어떤 부모의 컬렉션이든 **최초 접근 시**, 원래 부모 조회 쿼리를 **서브쿼리로 재사용**하여 모든 자식을 한 번에 로드

```sql
-- 1단계: 부모 조회
SELECT d.* FROM department d WHERE d.location = 'Seoul'

-- 2단계: 어떤 department.getEmployees() 접근 시 (1회만 실행)
SELECT e.* FROM employee e
WHERE e.department_id IN (
    SELECT d.id FROM department d WHERE d.location = 'Seoul'
)
```

- **총 쿼리: 항상 정확히 2개** (부모 1 + 자식 1)
- BatchSize와 달리 부모 수에 관계없이 **단 1회의 추가 쿼리**

#### BatchSize vs Subselect 비교

| 항목 | @BatchSize(size=N) | @Fetch(FetchMode.SUBSELECT) |
|------|-------------------|---------------------------|
| 추가 쿼리 수 | ceil(부모수 / N) | 항상 1 |
| IN 절 크기 | 최대 N개 ID | 서브쿼리 (원본 쿼리 재사용) |
| JPA 표준 | ❌ Hibernate 전용 | ❌ Hibernate 전용 |
| 적합 사례 | 산발적/부분적 컬렉션 접근 | 항상 전체 목록의 컬렉션에 접근 |

#### 사용 적합 사례

- **적합:** 부모 목록을 조회한 뒤 **대부분의 부모에 대해 컬렉션에 접근**하는 경우 (예: UI 그리드, 리포트)
- **부적합:**
  - 단일 entity만 조회하는 경우 (이점 없음)
  - 부모 조회 결과가 매우 많은 경우 (서브쿼리가 비효율적일 수 있음)
  - 페이징과 함께 사용 시 주의 필요

**출처:**
- https://www.baeldung.com/hibernate-fetchmode
- https://201405kpb.gitbooks.io/hibernatebook/content/Book/fetching/fetching-fetchmode-subselect.html
- https://stackoverflow.com/questions/32984799/fetchmode-join-vs-subselect


---


## 2. 실사용 주의사항


### 2-1. 컬렉션 fetch join + 페이징 조합의 문제 (HHH90003004 경고)

```
WARN  HHH90003004: firstResult/maxResults specified with collection fetch;
      applying in memory!
```

**발생 시나리오:**
```java
@Query("SELECT d FROM Department d JOIN FETCH d.employees")
Page<Department> findAllWithEmployees(Pageable pageable);  // ⚠️ 위험
```

**왜 위험한가:**
1. SQL에 `LIMIT/OFFSET` 적용 불가 (row가 자식 수만큼 중복되어 있으므로)
2. Hibernate가 **전체 데이터를 메모리에 로드** 후 Java에서 페이징
3. 10만 건 데이터 → 전부 메모리 적재 → **OOM 위험**

**올바른 해결 패턴:**
```java
// Step 1: 부모 ID만 페이징
@Query(value = "SELECT d.id FROM Department d",
       countQuery = "SELECT COUNT(d) FROM Department d")
Page<Long> findDepartmentIds(Pageable pageable);

// Step 2: ID 목록으로 fetch join
@Query("SELECT DISTINCT d FROM Department d LEFT JOIN FETCH d.employees WHERE d.id IN :ids")
List<Department> findWithEmployeesByIds(@Param("ids") List<Long> ids);
```

**사용 코드:**
```java
Page<Long> idPage = repository.findDepartmentIds(PageRequest.of(0, 20));
List<Department> departments = repository.findWithEmployeesByIds(idPage.getContent());
```

**출처:**
- https://vladmihalcea.com/join-fetch-pagination-spring/
- https://tomcatflow.com/blog/hibernate-fetch-join-pagination/


### 2-2. 둘 이상의 컬렉션 fetch join 금지 이유 (MultipleBagFetchException)

**Entity 예시:**
```java
@Entity
public class Department {
    @OneToMany(mappedBy = "department")
    private List<Employee> employees;    // Bag

    @OneToMany(mappedBy = "department")
    private List<Project> projects;      // Bag
}
```

**카테시안 곱 발생 과정:**
- employees가 2명, projects가 3개인 department → SQL 결과 2 × 3 = **6 rows**
- Hibernate가 어떤 row 조합이 올바른 것인지 판별 불가

**해결 방법:**

| 방법 | 코드 변경 | 장점 | 단점 |
|------|---------|------|------|
| **List → Set** | `private Set<Employee> employees` | 간단, 두 컬렉션 동시 fetch 가능 | 순서 보장 안 됨 |
| **쿼리 분리** | 각 컬렉션별 별도 쿼리 | 기존 List 유지 | 쿼리 수 증가 (2~3개) |
| **@OrderColumn** | `@OrderColumn(name = "pos")` 추가 | List 유지 + 동시 fetch | DB에 순서 컬럼 필요 |

**출처:**
- https://www.baeldung.com/java-hibernate-multiplebagfetchexception
- https://thorben-janssen.com/fix-multiplebagfetchexception-hibernate/


### 2-3. distinct 키워드 사용 이유와 Hibernate 6.x에서의 변경사항

#### Hibernate 5.x 이하

fetch join 시 부모 entity가 자식 수만큼 **중복 반환**됨:

```java
// employees가 3명인 department → 결과 리스트에 동일 department가 3번 등장
@Query("SELECT d FROM Department d JOIN FETCH d.employees")
List<Department> result;  // [dept1, dept1, dept1, dept2, dept2, ...]
```

**DISTINCT로 해결:**
```java
@Query("SELECT DISTINCT d FROM Department d JOIN FETCH d.employees")
List<Department> result;  // [dept1, dept2, ...]
```

**주의:** 이 `DISTINCT`는 두 가지 역할을 수행
1. **SQL 레벨:** `SELECT DISTINCT ...` 실행 (하지만 row가 다르므로 실제로 제거되지 않음)
2. **Hibernate 레벨:** 결과 리스트에서 중복 부모 entity 제거

불필요한 SQL DISTINCT를 제거하려면:
```java
// Hibernate 5.x에서 SQL DISTINCT를 생략하고 엔티티 중복만 제거
@QueryHints(@QueryHint(name = org.hibernate.jpa.QueryHints.HINT_PASS_DISTINCT_THROUGH, value = "false"))
@Query("SELECT DISTINCT d FROM Department d JOIN FETCH d.employees")
List<Department> findAllDistinct();
```

#### Hibernate 6.x 변경사항

- **자동 중복 제거:** Hibernate 6에서는 fetch join 결과의 중복 entity를 **자동으로 제거**
- `DISTINCT` 키워드 없이도 중복이 발생하지 않음
- `PASS_DISTINCT_THROUGH` 힌트는 **더 이상 필요 없음** (deprecated)
- 스칼라 프로젝션(DTO 등)에서는 여전히 `DISTINCT`가 SQL 레벨에서 필요

```java
// Hibernate 6.x: DISTINCT 없이도 정상 동작
@Query("SELECT d FROM Department d JOIN FETCH d.employees")
List<Department> findAllWithEmployees();  // 중복 없음
```

**출처:**
- https://vladmihalcea.com/jpql-distinct-jpa-hibernate/


### 2-4. 실제 쿼리 로그 확인 방법

#### 방법 1: Hibernate 기본 설정 (show_sql)

```yaml
# application.yml
spring:
  jpa:
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        highlight_sql: true       # 콘솔에 색상 적용
        use_sql_comments: true    # JPQL 원문을 주석으로 출력

logging:
  level:
    org.hibernate.SQL: DEBUG                 # SQL 문 출력
    org.hibernate.orm.jdbc.bind: TRACE       # 바인딩 파라미터 값 출력 (Hibernate 6)
    # org.hibernate.type.descriptor.sql: TRACE  # Hibernate 5.x 바인딩 파라미터
```

**출력 예시:**
```
Hibernate:
    /* SELECT d FROM Department d */ select
        d1_0.id,
        d1_0.name
    from
        department d1_0
-- binding parameter (1:BIGINT) <- [1]
```

**한계:**
- 파라미터 값이 `?`로 표시됨 (`show-sql` 단독 사용 시)
- `org.hibernate.orm.jdbc.bind: TRACE`로 보완 가능하나 로그가 분리되어 가독성 떨어짐

#### 방법 2: P6Spy (권장 - 파라미터 바인딩 포함)

**의존성 추가 (Maven):**
```xml
<dependency>
    <groupId>com.github.gavlyukovskiy</groupId>
    <artifactId>p6spy-spring-boot-starter</artifactId>
    <version>1.9.1</version>
</dependency>
```

**application.yml 설정:**
```yaml
spring:
  datasource:
    url: jdbc:p6spy:mysql://localhost:3306/mydb   # jdbc:p6spy: 접두사 추가
    driver-class-name: com.p6spy.engine.spy.P6SpyDriver
  jpa:
    show-sql: false    # P6Spy가 처리하므로 false

logging:
  level:
    p6spy: DEBUG
```

**spy.properties (선택사항, src/main/resources):**
```properties
appender=com.p6spy.engine.spy.appender.StdoutLogger
logMessageFormat=com.p6spy.engine.spy.appender.CustomLineFormat
customLogMessageFormat=%(currentTime)|%(executionTime)ms|%(category)|%(sqlSingleLine)
driverlist=com.mysql.cj.jdbc.Driver
```

**P6Spy 출력 예시:**
```
2026-03-27 11:30:00|3ms|statement|select d.id, d.name from department d where d.name = 'Engineering'
```

- 실제 바인딩된 값이 SQL에 직접 포함되어 출력
- **개발/디버깅 환경 전용** (운영 환경에서는 성능 및 보안 이슈)

**출처:**
- https://www.baeldung.com/java-p6spy-intercept-sql-logging
- https://github.com/gavlyukovskiy/spring-boot-data-source-decorator
- https://www.w3tutorials.net/blog/spring-boot-show-sql-parameter-binding/


---


## 3. 종합 비교표


### 해결 방법 종합 비교

| 기준 | Fetch Join | EntityGraph | @BatchSize | @Fetch(SUBSELECT) |
|------|-----------|-------------|------------|-------------------|
| **SQL 쿼리 수** | 1 | 1 | 1 + ceil(N/B) | 2 |
| **페이징 호환** | ❌ (메모리 페이징) | ❌ (메모리 페이징) | ✅ | ⚠️ (제한적) |
| **데이터 중복** | ✅ (카테시안 곱) | ✅ (내부 JOIN) | ❌ | ❌ |
| **다중 컬렉션** | ❌ (MultipleBagFetchException) | ❌ (동일 문제) | ✅ | ✅ |
| **JPA 표준** | ✅ (JPQL) | ✅ (JPA 2.1) | ❌ (Hibernate) | ❌ (Hibernate) |
| **적용 위치** | 쿼리 레벨 | 메서드/쿼리 레벨 | 엔티티/전역 레벨 | 엔티티 레벨 |
| **추천 사례** | 단일 컬렉션 + 소량 데이터 | REST API 유연한 fetch 전략 | 대용량 + 페이징 필요 | 목록 조회 후 전체 컬렉션 접근 |


### 상황별 추천 전략

| 상황 | 추천 방법 | 이유 |
|------|---------|------|
| 단일 연관 관계, 소량 데이터 | **Fetch Join** | 가장 단순하고 쿼리 1회 |
| 여러 API에서 다른 fetch 전략 필요 | **EntityGraph** | 어노테이션 교체만으로 전략 변경 |
| 페이징 + LAZY 컬렉션 | **@BatchSize** (전역) | 페이징 호환, IN절로 효율적 |
| 목록 조회 + 모든 자식 필요 | **@Fetch(SUBSELECT)** | 정확히 2회 쿼리로 최적 |
| 다중 컬렉션 동시 로드 | **@BatchSize** 또는 **쿼리 분리** | MultipleBagFetchException 회피 |
| 대규모 운영 시스템 | **@BatchSize 전역 설정 (16~32)** + 필요 시 Fetch Join 보완 | 균형잡힌 성능 |


---


## 4. 참고 출처 모음

| 주제 | URL |
|------|-----|
| Fetch Join + 페이징 | https://vladmihalcea.com/join-fetch-pagination-spring/ |
| MultipleBagFetchException | https://www.baeldung.com/java-hibernate-multiplebagfetchexception |
| MultipleBagFetchException 해결 | https://thorben-janssen.com/fix-multiplebagfetchexception-hibernate/ |
| JPQL DISTINCT + Hibernate | https://vladmihalcea.com/jpql-distinct-jpa-hibernate/ |
| EntityGraph | https://www.baeldung.com/jpa-entity-graph |
| EntityGraph 중첩 Subgraph | https://www.codelessgenie.com/blog/named-entity-graph-sub-subgraph/ |
| FetchMode (Subselect 포함) | https://www.baeldung.com/hibernate-fetchmode |
| BatchSize 권장 값 | https://stackoverflow.com/questions/21162172/default-batch-fetch-size-recommended-values |
| BatchSize 배치 fetch | https://thorben-janssen.com/hibernate-tips-how-to-fetch-associations-in-batches/ |
| P6Spy 설정 | https://www.baeldung.com/java-p6spy-intercept-sql-logging |
| P6Spy Spring Boot Starter | https://github.com/gavlyukovskiy/spring-boot-data-source-decorator |
| N+1 종합 가이드 | https://prgrmmng.com/solving-n-plus-one-select-problem-in-jpa |
| Hibernate 6 EntityGraph+Pagination | https://discourse.hibernate.org/t/hibernate-orm-6-entitygraph-and-pagination-search-warning/8942 |
| Spring Data JPA N+1 실전 | https://edge-case.hashnode.dev/the-n-1-problem-in-spring-data-jpa-a-practical-guide |
| SQL 파라미터 바인딩 로그 | https://www.w3tutorials.net/blog/spring-boot-show-sql-parameter-binding/ |
