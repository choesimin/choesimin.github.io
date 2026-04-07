---
layout: note
permalink: /425
title: Spring Pageable - Page 번호, 크기, 정렬을 캡슐화한 Pagination Interface
description: Spring Data의 `Pageable`은 page 번호, 크기, 정렬 조건을 캡슐화한 interface로, controller에서 query parameter를 자동으로 binding받아 repository의 pagination query에 전달합니다.
date: 2026-04-07
---


## Pageable

- `Pageable`은 Spring Data가 제공하는 pagination 정보를 담는 interface입니다.
    - page 번호, page 크기, 정렬 조건을 하나의 객체로 캡슐화합니다.
    - controller에서 query parameter를 자동으로 `Pageable` 객체에 binding합니다.

- Spring MVC controller의 method parameter에 `Pageable`을 선언하면, query parameter가 자동 mapping됩니다.
    - `?page=0&size=10&sort=name,asc` 형식으로 요청합니다.
    - `page`는 0부터 시작합니다.

```java
@GetMapping("/users")
public Page<User> getUsers(Pageable pageable) {
    return userRepository.findAll(pageable);
}
```

```
GET /users?page=0&size=10&sort=name,asc
```


---


## Query Parameter

- `Pageable`은 `page`, `size`, `sort` query parameter를 자동으로 binding합니다.

| parameter | 설명 | 기본값 |
| --- | --- | --- |
| `page` | page 번호 (0부터 시작) | `0` |
| `size` | page 당 항목 수 | `20` |
| `sort` | 정렬 기준 (property,direction) | 없음 |

- `sort`는 여러 개를 지정하여 다중 정렬을 적용합니다.

```
GET /users?page=0&size=10&sort=name,asc&sort=createdAt,desc
```


### 기본값 변경

- `@PageableDefault` annotation으로 기본값을 변경합니다.

```java
@GetMapping("/users")
public Page<User> getUsers(
        @PageableDefault(size = 5, sort = "createdAt", direction = Sort.Direction.DESC)
        Pageable pageable) {
    return userRepository.findAll(pageable);
}
```

- application 전체의 기본값은 `application.yml`에서 설정합니다.

```yaml
spring:
  data:
    web:
      pageable:
        default-page-size: 10
        max-page-size: 100
        one-indexed-parameters: false  # true로 설정하면 page가 1부터 시작
```


---


## Page와 Slice

- Spring Data는 pagination 결과를 `Page`와 `Slice` 두 가지 type으로 반환합니다.


### Page

- `Page`는 전체 data 건수와 전체 page 수를 함께 반환합니다.
    - 내부적으로 `COUNT` query를 추가로 실행하여 전체 건수를 조회합니다.
    - 전체 page 수를 표시해야 하는 일반적인 pagination UI에 적합합니다.

```java
public interface UserRepository extends JpaRepository<User, Long> {
    Page<User> findByStatus(String status, Pageable pageable);
}
```

```java
Page<User> page = userRepository.findByStatus("ACTIVE", pageable);

page.getContent();         // 현재 page의 data 목록
page.getTotalElements();   // 전체 data 건수
page.getTotalPages();      // 전체 page 수
page.getNumber();          // 현재 page 번호
page.getSize();            // page 크기
page.hasNext();            // 다음 page 존재 여부
page.isFirst();            // 첫 번째 page 여부
```


### Slice

- `Slice`는 `COUNT` query를 실행하지 않고, 다음 page 존재 여부만 확인합니다.
    - 요청한 size보다 1개 더 조회하여 다음 page가 있는지 판단합니다.
    - "더 보기" button 방식의 무한 scroll UI에 적합합니다.
    - `COUNT` query가 없으므로 `Page`보다 성능이 좋습니다.

```java
public interface UserRepository extends JpaRepository<User, Long> {
    Slice<User> findByStatus(String status, Pageable pageable);
}
```

```java
Slice<User> slice = userRepository.findByStatus("ACTIVE", pageable);

slice.getContent();    // 현재 page의 data 목록
slice.hasNext();       // 다음 page 존재 여부
slice.getNumber();     // 현재 page 번호
slice.getSize();       // page 크기
// getTotalElements(), getTotalPages()는 사용 불가
```

| 구분 | `Page` | `Slice` |
| --- | --- | --- |
| `COUNT` query | 실행 | 미실행 |
| 전체 건수 | 조회 가능 | 조회 불가 |
| 다음 page 확인 | 가능 | 가능 |
| 성능 | `COUNT` query로 인해 상대적으로 느림 | `COUNT` query가 없어 빠름 |
| 적합한 UI | page 번호 표시 | 무한 scroll, "더 보기" |


---


## DTO 변환

- `Page`의 `map()` method로 entity를 DTO로 변환합니다.
    - pagination 정보는 유지되면서 content만 변환됩니다.

```java
@GetMapping("/users")
public Page<UserDto> getUsers(Pageable pageable) {
    Page<User> users = userRepository.findAll(pageable);
    return users.map(UserDto::from);
}
```

```java
public class UserDto {
    private Long id;
    private String name;
    private String email;

    public static UserDto from(User user) {
        UserDto dto = new UserDto();
        dto.id = user.getId();
        dto.name = user.getName();
        dto.email = user.getEmail();
        return dto;
    }
}
```


---


## COUNT Query 최적화

- `Page`를 사용할 때 `COUNT` query가 성능 병목이 될 수 있습니다.
    - 복잡한 join이 포함된 query에서 `COUNT` query도 동일한 join을 수행하면 불필요한 overhead가 발생합니다.

- `@Query` annotation의 `countQuery` 속성으로 `COUNT` query를 별도로 지정합니다.

```java
@Query(
    value = "SELECT u FROM User u JOIN FETCH u.department WHERE u.status = :status",
    countQuery = "SELECT COUNT(u) FROM User u WHERE u.status = :status"
)
Page<User> findByStatus(@Param("status") String status, Pageable pageable);
```

- `COUNT` query에서는 join을 제거하여 불필요한 table 접근을 줄입니다.


---


## 정렬 제한

- client가 임의의 property로 정렬을 요청하면 보안이나 성능 문제가 발생합니다.
    - 존재하지 않는 property를 지정하면 exception이 발생합니다.
    - index가 없는 column으로 정렬하면 성능이 저하됩니다.

- 허용할 정렬 property를 제한하여 안전하게 처리합니다.

```java
@GetMapping("/users")
public Page<User> getUsers(Pageable pageable) {
    List<String> allowedSortProperties = List.of("name", "createdAt", "email");

    for (Sort.Order order : pageable.getSort()) {
        if (!allowedSortProperties.contains(order.getProperty())) {
            throw new IllegalArgumentException(
                    "허용되지 않는 정렬 기준입니다 : " + order.getProperty());
        }
    }

    return userRepository.findAll(pageable);
}
```


---


## Reference

- <https://docs.spring.io/spring-data/commons/reference/repositories/core-extensions.html#core.web.basic.paging-and-sorting>
- <https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html#jpa.query-methods.special-parameters>

