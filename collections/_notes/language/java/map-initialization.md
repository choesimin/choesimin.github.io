---
layout: note
permalink: /353
title: Empty Map 만들기 - Collections.emptyMap()와 new HashMap()
description: 빈 map을 생성할 때, 크게 두 가지 방법을 사용할 수 있으며, 각각 다른 상황에서 장단점이 있습니다.
date: 2025-06-30
---


## `Collections.emptyMap()` vs `new HashMap()`

- Java에서 빈 map을 생성할 때 `Collections.emptyMap()`과 `new HashMap()`은 서로 다른 특성과 성능을 가집니다.
- `Collections.emptyMap()`은 **불변 객체를 재사용**하여 memory 효율성을 높이고, `new HashMap()`은 **가변 객체를 새로 생성**하여 유연성을 제공합니다.
- 두 방법의 차이점을 이해하면 상황에 맞는 최적의 선택을 할 수 있습니다.


---


## Collections.emptyMap()의 특징과 장점

- `Collections.emptyMap()`은 **불변하고 재사용 가능한 빈 map**을 반환합니다.
    - 한 번 생성된 singleton 객체를 모든 호출에서 재사용하기 때문에 memory 할당 비용이 없습니다.
    - immutable 특성으로 인해 thread-safe 환경에서 안전하게 사용할 수 있습니다.

- **memory 효율성**이 뛰어나며 성능상 이점이 있습니다.
    - 새로운 객체를 생성하지 않고 기존 객체를 참조하기 때문에 garbage collection 부담이 줄어듭니다.
    - 내부 array나 bucket 구조를 생성하지 않아 memory overhead가 없습니다.

- **null 대신 empty collection을 반환**하는 programming pattern에 적합합니다.
    - `NullPointerException` 발생 위험을 제거하고 code의 안정성을 높입니다.
    - client code에서 null check를 할 필요가 없어 code가 더 간결해집니다.


---


## `new HashMap()`의 특징과 사용 목적

- `new HashMap()`은 **가변하고 확장 가능한 빈 map**을 생성합니다.
    - 생성 후 element를 추가하거나 제거할 수 있는 mutable 특성을 가집니다.
    - 초기 capacity(16)와 load factor(0.75)를 가진 새로운 hash table을 생성합니다.

- **동적으로 data를 추가해야 하는 상황**에 필수적입니다.
    - method 실행 중 element가 추가될 가능성이 있는 경우 반드시 사용해야 합니다.
    - collection의 크기가 runtime에 결정되는 경우에 적합합니다.

- **memory 할당 비용과 초기화 overhead**가 발생합니다.
    - 매번 새로운 객체를 생성하므로 memory allocation과 initialization 비용이 있습니다.
    - 내부 bucket array와 관련 metadata를 위한 추가 memory가 필요합니다.


---


## 성능 비교

- `Collections.emptyMap()`이 **object 생성과 memory 사용량 측면에서 월등히 우수**합니다.
    - 객체 생성 시간이 거의 0에 가까우며 constant time performance를 보입니다.
    - singleton pattern을 사용하여 reference sharing을 통해 memory를 절약합니다.

- `new HashMap()`은 **초기화 작업으로 인한 성능 overhead**가 있습니다.
    - hash table 구조 생성과 default capacity 설정에 시간이 소요됩니다.
    - 작은 규모에서는 차이가 미미하지만 대량 생성 시 성능 차이가 누적됩니다.

- **concurrent environment에서 `Collections.emptyMap()`이 더 안전**합니다.
    - immutable 특성으로 인해 별도 synchronization 없이 thread-safe합니다.
    - `new HashMap()`은 thread-safe하지 않아 concurrent access 시 별도 동기화가 필요합니다.


---


## 선택 기준

| `Collections.emptyMap()` | `new HashMap()` |
| --- | --- |
| 불변 객체로 memory 효율적 | 가변 객체로 유연성 제공 |
| null 대신 empty collection 반환 | 동적으로 data 추가 가능 |
| 성능상 이점 (constant time) | 초기화 overhead 발생 |
| thread-safe (immutable) | thread-safe하지 않음 (mutable) |


### `Collections.emptyMap()` 권장

- **method에서 빈 결과를 반환해야 하는 경우**에 사용합니다.
    - database query 결과가 empty인 경우 null 대신 empty map을 반환할 때 적합합니다.
    - API response에서 data가 없을 때 일관된 type을 유지하기 위해 사용합니다.

- **default value나 초기값으로 사용하는 경우**에 효과적입니다.
    - field initialization 시 null 대신 empty map으로 초기화할 때 사용합니다.
    - conditional logic에서 empty case를 처리할 때 안전한 default로 활용합니다.

- **immutable collection이 필요한 design pattern**에서 사용합니다.
    - functional programming style에서 side effect를 방지하기 위해 사용합니다.
    - builder pattern에서 optional field의 기본값으로 설정할 때 적합합니다.


### `new HashMap()` 권장

- **runtime에 element를 추가할 예정인 경우**에 필수적으로 사용합니다.
    - loop를 통해 data를 수집하거나 처리 결과를 저장할 때 사용합니다.
    - user input이나 external system으로부터 받은 data를 저장할 때 필요합니다.

- **mutable collection을 parameter로 전달하는 경우**에 사용합니다.
    - method가 collection을 수정할 권한을 가져야 하는 경우 적합합니다.
    - callback이나 event handler에서 state를 변경해야 하는 경우 필요합니다.

- **성능보다 유연성이 우선인 경우**에 선택합니다.
    - 초기 단계에서는 empty이지만 향후 확장 가능성이 있는 경우 사용합니다.
    - prototype이나 실험적 code에서 flexibility를 위해 선택할 수 있습니다.


---


## 활용 예제

- `Collections.emptyMap()`는 주로 **불변하고 읽기 전용인 빈 map이 필요한** 경우에 사용됩니다.
- `new HashMap()`는 주로 **가변하고 element를 동적으로 추가해야 하는** 경우에 사용됩니다.


### `Collections.emptyMap()` 활용 예제

```java
// database query에서 결과가 없을 때 null 대신 empty map 반환
public Map<String, User> findUsersByDepartment(String department) {
    List<User> users = userRepository.findByDepartment(department);
    if (users.isEmpty()) {
        return Collections.emptyMap(); // null 대신 empty map 반환
    }
    return users.stream().collect(Collectors.toMap(User::getId, user -> user));
}

// configuration이 없을 때 default empty map 제공
private final Map<String, String> defaultConfig = Collections.emptyMap();

// method parameter에서 optional map 처리
public void processData(Map<String, Object> options) {
    Map<String, Object> settings = options != null ? options : Collections.emptyMap();
    // null check 없이 안전하게 사용 가능
    settings.forEach((key, value) -> processOption(key, value));
}
```


### `new HashMap()` 활용 예제

```java
// runtime에 data를 동적으로 수집하는 경우
public Map<String, Integer> countWordFrequency(String text) {
    Map<String, Integer> wordCount = new HashMap<>(); // 가변 map 필요
    String[] words = text.split("\\s+");
    for (String word : words) {
        wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
    }
    return wordCount;
}

// cache나 temporary storage로 사용하는 경우
private final Map<String, Object> cache = new HashMap<>();

public Object getCachedValue(String key) {
    return cache.computeIfAbsent(key, k -> expensiveOperation(k));
}
```


---


## 주의 사항과 Best Practice

- **`Collections.emptyMap()`에 element 추가 시도 시 `UnsupportedOperationException`**이 발생합니다.
    - immutable 특성으로 인해 `put()`, `remove()`, `clear()` 등의 수정 작업이 불가능합니다.
    - 실수로 수정하려 할 때 runtime에 exception이 발생하므로 주의가 필요합니다.

- **generic type 추론**에서 `Collections.emptyMap()`이 더 간결합니다.
    - compiler가 context에서 type을 추론하므로 explicit type declaration이 불필요한 경우가 많습니다.
    - `Map<String, Integer> map = Collections.emptyMap();`처럼 간단하게 사용할 수 있습니다.

- **API design 시 일관성**을 위해 empty collection 반환을 표준화합니다.
    - null을 반환하는 method와 empty collection을 반환하는 method가 혼재하면 client code가 복잡해집니다.
    - 가능한 모든 곳에서 empty collection을 반환하여 null check 부담을 줄입니다.

- **performance-critical section**에서는 `Collections.emptyMap()` 사용을 우선 고려합니다.
    - 대량의 empty map이 생성되는 상황에서는 memory와 GC overhead를 크게 줄일 수 있습니다.
    - micro-benchmark보다는 실제 application의 전체적인 성능을 고려하여 선택합니다.


---


## Reference

- <https://stackoverflow.com/questions/14846920/collections-emptymap-vs-new-hashmap>
- <https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#emptyMap-->
- <https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html>
