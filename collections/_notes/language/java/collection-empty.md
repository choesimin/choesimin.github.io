---
layout: note
permalink: /431
title: Java Collection Empty 검사
description: Java Collection의 empty 상태를 검사하는 방법은 isEmpty(), size() == 0, null check의 결합으로 구분되며, null-safe 검사를 위해 utility class를 활용합니다.
date: 2025-06-01
---


## Collection Empty 검사

- Java `Collection`이 비어있는지 확인하는 방법은 **`isEmpty()`**, **`size()` 비교**, **null check와의 결합**으로 구분됩니다.
    - 각 방법은 가독성, 성능, null 안전성에서 차이가 있습니다.
    - `Collection` interface는 `isEmpty()` method를 제공하여 empty 상태를 명시적으로 확인합니다.
    - null인 `Collection`을 다룰 때는 `NullPointerException` 방지를 위한 추가 검사가 필요합니다.


---


## isEmpty()와 size() 비교

- `Collection`의 empty 상태를 확인하는 **두 가지 기본 방법**은 가독성과 성능 측면에서 차이가 있습니다.
    - `isEmpty()`는 의도를 명확하게 표현하는 방법입니다.
    - `size() == 0`은 크기를 직접 비교하는 방법입니다.
    - 대부분의 경우 두 방법의 성능 차이는 미미하지만 구현에 따라 달라질 수 있습니다.


### isEmpty()

- `isEmpty()`는 `Collection`이 **비어있는지 명시적으로 확인**하는 method입니다.
    - `Collection` interface에 정의된 표준 method입니다.
    - code의 의도를 분명하게 드러내어 가독성이 높습니다.
    - 대부분의 구현체에서 `size() == 0`과 동일한 logic으로 구현됩니다.

```java
List<String> list = new ArrayList<>();

if (list.isEmpty()) {
    System.out.println("List is empty");
}
```

- `ArrayList`의 `isEmpty()` 구현은 **size field를 직접 확인**합니다.

```java
public boolean isEmpty() {
    return size == 0;
}
```


### size() == 0

- `size() == 0`은 `Collection`의 **크기를 직접 비교**하여 empty 상태를 확인합니다.
    - `isEmpty()`보다 의도가 덜 명확합니다.
    - 일부 구현체에서는 `size()` 계산에 추가 비용이 발생할 수 있습니다.
    - `LinkedList`와 같은 구현체는 size를 field로 관리하므로 성능 차이가 없습니다.

```java
List<String> list = new ArrayList<>();

if (list.size() == 0) {
    System.out.println("List is empty");
}
```

- `ConcurrentLinkedQueue`의 `size()`는 **전체 node를 순회**하여 크기를 계산합니다.
    - `isEmpty()`는 첫 번째 node만 확인하여 O(1) 시간 복잡도(time complexity)를 가집니다.
    - `size()`는 모든 node를 순회하여 O(n) 시간 복잡도를 가집니다.

```java
public boolean isEmpty() {
    return first() == null;  // O(1)
}

public int size() {
    int count = 0;
    for (Node<E> p = first(); p != null; p = succ(p))  // O(n)
        count++;
    return count;
}
```


---


## Null Check와의 결합

- `Collection`이 **null일 수 있는 상황**에서는 `NullPointerException` 방지를 위한 추가 검사가 필요합니다.
    - null check를 먼저 수행한 후 `isEmpty()`를 호출해야 합니다.
    - 두 검사를 결합하면 null이거나 비어있는 경우를 모두 처리합니다.


### 기본 Null Check

- `Collection`이 null일 수 있는 경우 **명시적으로 null을 먼저 확인**해야 합니다.

```java
List<String> list = getList();  // null을 반환할 수 있음

if (list != null && !list.isEmpty()) {
    System.out.println("List has elements");
}
```

- null check를 먼저 수행하여 **short-circuit 평가**로 `NullPointerException`을 방지합니다.


### Optional과의 결합

- Java 8 이상에서는 **`Optional`을 활용**하여 null-safe 검사를 수행합니다.

```java
Optional<List<String>> optionalList = Optional.ofNullable(getList());

optionalList
    .filter(list -> !list.isEmpty())
    .ifPresent(list -> System.out.println("List has elements"));
```

- `Optional.ofNullable()`은 null을 빈 `Optional`로 변환합니다.
- `filter()`는 비어있지 않은 `Collection`만 통과시킵니다.


---


## Utility Class 활용

- **Apache Commons Collections**와 **Spring Framework**는 null-safe empty 검사를 제공하는 utility method를 포함합니다.
    - 별도의 null check 없이 안전하게 empty 상태를 확인합니다.
    - code의 간결성과 가독성을 향상시킵니다.


### Apache Commons CollectionUtils

- `CollectionUtils.isEmpty()`는 **null이거나 비어있는 경우 true**를 반환합니다.

```java
import org.apache.commons.collections4.CollectionUtils;

List<String> list = getList();  // null을 반환할 수 있음

if (CollectionUtils.isEmpty(list)) {
    System.out.println("List is null or empty");
}
```

- 내부 구현은 null check와 `isEmpty()` 호출을 결합합니다.

```java
public static boolean isEmpty(Collection<?> coll) {
    return coll == null || coll.isEmpty();
}
```


### Spring CollectionUtils

- Spring Framework도 **동일한 pattern의 `isEmpty()` method**를 제공합니다.

```java
import org.springframework.util.CollectionUtils;

List<String> list = getList();

if (CollectionUtils.isEmpty(list)) {
    System.out.println("List is null or empty");
}
```


---


## 권장 Pattern

- 상황에 따라 **적절한 empty 검사 방법**을 선택하면 code의 안전성과 가독성이 향상됩니다.

- **`isEmpty()` 우선 사용** : `Collection`이 null이 아님이 보장되는 경우 `isEmpty()`를 사용합니다.
    - 의도가 명확하고 가독성이 높습니다.
    - 대부분의 `Collection` 구현체에서 최적화되어 있습니다.

```java
List<String> list = new ArrayList<>();  // null이 아님이 보장됨

if (list.isEmpty()) {
    // empty 처리
}
```

- **null-safe 검사 필요 시** : `Collection`이 null일 수 있는 경우 utility class를 활용합니다.
    - Apache Commons `CollectionUtils.isEmpty()`를 사용합니다.
    - Spring 환경에서는 Spring `CollectionUtils`를 사용합니다.

```java
List<String> list = getList();  // null을 반환할 수 있음

if (CollectionUtils.isEmpty(list)) {
    // null 또는 empty 처리
}
```

- **명시적 null check** : utility class를 사용할 수 없는 경우 명시적으로 null을 먼저 확인합니다.

```java
List<String> list = getList();

if (list != null && !list.isEmpty()) {
    // 정상 처리
}
```

- **`size()` 사용 지양** : `isEmpty()` 대신 `size() == 0`을 사용하는 것은 권장하지 않습니다.
    - 가독성이 떨어집니다.
    - 일부 구현체에서는 성능 저하가 발생할 수 있습니다.
    - `ConcurrentLinkedQueue`처럼 `size()` 계산 비용이 큰 경우 `isEmpty()`를 사용해야 합니다.


---


## Reference

- <https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Collection.html>
- <https://commons.apache.org/proper/commons-collections/apidocs/org/apache/commons/collections4/CollectionUtils.html>
- <https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/util/CollectionUtils.html>

