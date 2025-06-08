---
layout: note
permalink: /334
title: Given-When-Then Pattern - Test Case 구조화 방법론
description: Given-When-Then pattern은 test case를 구조화하여 작성하는 방법론으로, 각 test case를 세 개의 명확한 section으로 나누어 작성하여 가독성과 이해도를 높입니다.
date: 2025-06-08
---


## Given-When-Then Pattern

- Given-When-Then pattern은 **test case를 구조화하여 작성하는 방법론**입니다.
- Behavior Driven Development(BDD)에서 시작된 개념으로, test의 가독성과 이해도를 높입니다.
- 각 test case를 세 개의 명확한 section으로 나누어 작성하는 구조를 제공합니다.


---


## Pattern 구성 요소

- Given-When-Then pattern은 Given, When, Then의 세 가지 section으로 구성됩니다.


### Given (전제 조건)

- test를 실행하기 전의 초기 상태나 조건을 설정하는 부분입니다.
- system의 상태, data의 초기값, mock object 설정 등을 포함합니다.
- test가 실행되기 위해 필요한 모든 준비 작업을 담당합니다.
    - database에 특정 data가 존재하는 상황.
    - user가 로그인된 상태.
    - 특정 설정값이 적용된 환경.


### When (실행 동작)

- 실제로 test하고자 하는 행위나 동작을 실행하는 부분입니다.
- 보통 하나의 명확한 action으로 구성됩니다.
- test의 핵심이 되는 기능이나 method 호출을 포함합니다.
    - 특정 API endpoint 호출.
    - button click 동작.
    - method 실행.


### Then (예상 결과)

- When section에서 실행한 동작의 결과를 검증하는 부분입니다.
- 예상되는 결과값, 상태 변화, exception 발생 등을 확인합니다.
- assertion문을 통해 실제 결과와 예상 결과를 비교합니다.
    - 특정 값이 반환되는지 확인.
    - database 상태가 변경되었는지 검증.
    - 올바른 error message가 출력되는지 점검.


---


## 작성 원칙

- **명확성과 단일 책임, 독립성**을 보장하여 test case를 구조화합니다.


### 명확성과 가독성

- 각 section은 독립적이고 명확하게 작성되어야 합니다.
- test의 의도와 목적이 쉽게 파악될 수 있도록 구성합니다.
- business logic과 test logic을 분리하여 이해하기 쉽게 만듭니다.


### 단일 책임 원칙

- 하나의 test case는 하나의 scenario만 검증해야 합니다.
- When section에서는 가능한 한 개의 action만 실행합니다.
- 복잡한 scenario는 여러 개의 test case로 분리하여 작성합니다.


### 독립성 보장

- 각 test case는 다른 test case에 의존하지 않아야 합니다.
- Given section에서 필요한 모든 전제 조건을 명시적으로 설정합니다.
- test 실행 순서와 관계없이 동일한 결과가 나와야 합니다.


---


## 실제 구현 예시

- Java와 Spring Boot를 예로 들어 Given-When-Then pattern을 적용한 test case 작성 예시입니다.


### Unit Test 예시

```java
@Test
public void 사용자_나이_계산_test() {
    // Given
    User user = new User("김철수", LocalDate.of(1990, 5, 15));
    LocalDate currentDate = LocalDate.of(2024, 5, 20);
    
    // When
    int age = user.calculateAge(currentDate);
    
    // Then
    assertEquals(34, age);
}
```


### Integration Test 예시

```java
@Test
public void 주문_생성_API_test() {
    // Given
    String productId = "PROD-001";
    int quantity = 2;
    String userId = "USER-123";
    
    // When
    ResponseEntity<Order> response = restTemplate.postForEntity(
        "/api/orders", 
        new CreateOrderRequest(productId, quantity, userId), 
        Order.class
    );
    
    // Then
    assertEquals(HttpStatus.CREATED, response.getStatusCode());
    assertNotNull(response.getBody().getOrderId());
    assertEquals(productId, response.getBody().getProductId());
}
```


---


## 장점과 효과

- Given-When-Then pattern을 적용하여 여러 가지 장점과 효과를 얻을 수 있습니다.


### 코드 품질 향상

- test case의 구조가 일관성 있게 유지됩니다.
- test의 의도가 명확하게 드러나 유지 보수가 쉬워집니다.
- 새로운 개발자도 test case를 쉽게 이해할 수 있습니다.


### 협업 효율성 증대

- business stakeholder와 개발자 간의 소통이 원활해집니다.
- test case가 documentation 역할을 수행합니다.
- 요구사항과 구현 사항 간의 gap을 줄일 수 있습니다.


### Test 품질 개선

- edge case와 예외 상황을 체계적으로 다룰 수 있습니다.
- test coverage가 향상되고 누락되는 scenario가 줄어듭니다.
- refactoring 시 regression test의 역할을 효과적으로 수행합니다.
