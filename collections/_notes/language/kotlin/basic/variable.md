---
layout: note
permalink: /288
title: Kotlin 변수 선언 - val, var, const
description: Kotlin은 val(불변)과 var(가변)로 변수를 선언하며, type 추론을 통해 간결한 code 작성이 가능합니다.
date: 2025-12-31
---


## 변수 선언

- Kotlin은 **`val`과 `var` keyword로 변수를 선언**합니다.
    - Java의 `final` 여부를 keyword로 명확히 구분합니다.
    - type 추론을 지원하여 type 명시가 선택 사항입니다.

```kotlin
val name = "Kotlin"    // 불변 (immutable)
var count = 0          // 가변 (mutable)
```


---


## val : 읽기 전용 변수

- `val`은 **한 번 할당하면 재할당할 수 없는** 읽기 전용 변수입니다.
    - Java의 `final` 변수와 유사합니다.
    - 참조 자체는 변경할 수 없지만, 객체 내부 상태는 변경될 수 있습니다.

```kotlin
val message = "Hello"
// message = "World"    // compile error : Val cannot be reassigned

val list = mutableListOf(1, 2, 3)
list.add(4)    // 가능 : 객체 내부 상태 변경
// list = mutableListOf(5, 6)    // compile error : 참조 변경 불가
```

- **`val`을 기본으로 사용**하는 것이 권장됩니다.
    - 불변성을 유지하면 code의 예측 가능성이 높아집니다.
    - 동시성 환경에서 안전합니다.
    - 변경이 필요한 경우에만 `var`로 변경합니다.


---


## var : 가변 변수

- `var`은 **값을 재할당할 수 있는** 가변 변수입니다.
    - 같은 type의 값으로만 재할당할 수 있습니다.
    - 다른 type의 값을 할당하면 compile error가 발생합니다.

```kotlin
var score = 100
score = 200    // 가능

// score = "high"    // compile error : type mismatch
```

- loop 변수나 상태 변경이 필요한 경우에 사용합니다.

```kotlin
var sum = 0
for (i in 1..10) {
    sum += i
}
```


---


## Type 추론과 명시적 선언

- Kotlin compiler는 **초기값으로부터 type을 추론**합니다.
    - type을 명시하지 않아도 compiler가 자동으로 결정합니다.

```kotlin
val name = "Kotlin"      // String으로 추론
val count = 42           // Int로 추론
val ratio = 3.14         // Double로 추론
val isValid = true       // Boolean으로 추론
```

- **명시적 type 선언**도 가능합니다.
    - 가독성을 위해 또는 추론과 다른 type이 필요할 때 사용합니다.

```kotlin
val age: Int = 25
val price: Long = 1000L
val rate: Float = 0.5f

// 추론과 다른 type 지정
val number: Long = 100    // Int가 아닌 Long으로 지정
val decimal: Double = 10.0    // Float가 아닌 Double
```

- **초기화를 지연**하는 경우 type을 반드시 명시해야 합니다.

```kotlin
val name: String    // type 명시 필수
name = "Kotlin"     // 나중에 초기화
```


---


## const val : Compile Time 상수

- `const val`은 **compile time에 결정되는 상수**입니다.
    - `val`은 runtime에 값이 결정될 수 있지만, `const val`은 compile time에 결정되어야 합니다.
    - primitive type과 String만 사용할 수 있습니다.
    - top-level 또는 `object` 내부에서만 선언할 수 있습니다.

```kotlin
const val MAX_COUNT = 100           // compile time 상수
const val API_URL = "https://api.example.com"

object Config {
    const val TIMEOUT = 5000
}
```

- `val`과 `const val`은 값 결정 시점, 사용 가능 type, 선언 위치에서 차이가 있습니다.

| 구분 | val | const val |
| --- | --- | --- |
| 값 결정 시점 | runtime | compile time |
| 사용 가능 type | 모든 type | primitive, String |
| 선언 위치 | 어디서나 | top-level, object |
| 함수 호출 | 가능 | 불가능 |

```kotlin
val runtimeValue = computeValue()       // 가능
// const val compileValue = computeValue()    // compile error
```


---


## lateinit : 지연 초기화

- `lateinit`은 **non-null 변수의 초기화를 지연**할 때 사용합니다.
    - `var`에만 사용할 수 있습니다.
    - primitive type에는 사용할 수 없습니다.
    - 초기화 전에 접근하면 `UninitializedPropertyAccessException`이 발생합니다.

```kotlin
class UserService {
    lateinit var repository: UserRepository

    fun init() {
        repository = UserRepository()
    }

    fun getUser(id: Long): User {
        return repository.findById(id)
    }
}
```

- **초기화 여부 확인**은 `::property.isInitialized`로 가능합니다.

```kotlin
if (::repository.isInitialized) {
    repository.findById(id)
}
```

- 주로 dependency injection이나 test 환경에서 사용합니다.


---


## lazy : 지연 계산

- `lazy`는 **처음 접근할 때 초기화**되는 위임 property입니다.
    - `val`에만 사용할 수 있습니다.
    - 비용이 큰 초기화를 필요한 시점까지 미룰 수 있습니다.

```kotlin
val heavyObject: HeavyClass by lazy {
    println("Initializing...")
    HeavyClass()
}

// 첫 접근 시 "Initializing..." 출력 후 초기화
println(heavyObject.name)

// 두 번째 접근부터는 이미 초기화된 값 반환
println(heavyObject.name)
```

- **thread safety option**을 지정할 수 있습니다.

```kotlin
// 기본값 : thread-safe (동기화 O)
val safe by lazy { compute() }

// 단일 thread 환경 : 동기화 없음 (성능 향상)
val fast by lazy(LazyThreadSafetyMode.NONE) { compute() }

// publication mode : 여러 thread가 동시에 초기화할 수 있음
val published by lazy(LazyThreadSafetyMode.PUBLICATION) { compute() }
```


---


## lateinit vs lazy

- 두 방식 모두 지연 초기화를 지원하지만, 사용 목적이 다릅니다.

| 구분 | lateinit | lazy |
| --- | --- | --- |
| 적용 대상 | var | val |
| 초기화 시점 | 수동으로 초기화 | 첫 접근 시 자동 |
| primitive type | 불가능 | 가능 |
| null 허용 | 불가능 | 가능 |
| 초기화 확인 | `isInitialized` | 항상 초기화됨 |
| 사용 사례 | DI, test | 비용이 큰 연산 |

```kotlin
// lateinit : 외부에서 주입
class Service {
    lateinit var dependency: Dependency
}

// lazy : 필요할 때 계산
class Calculator {
    val result: Int by lazy { expensiveComputation() }
}
```


---


## Java와의 비교

- Kotlin은 Java보다 **변수 선언이 간결하고 안전**합니다.

```java
// Java
final String name = "Kotlin";    // 불변
String message = "Hello";        // 가변 (final 없음)

private UserRepository repository;    // null 가능, 나중에 초기화
```

```kotlin
// Kotlin
val name = "Kotlin"              // 불변, type 추론
var message = "Hello"            // 가변 명시

lateinit var repository: UserRepository    // non-null 보장
```

| Java | Kotlin | 설명 |
| --- | --- | --- |
| `final Type name = value` | `val name = value` | 불변 변수 |
| `Type name = value` | `var name = value` | 가변 변수 |
| `static final` | `const val` | compile time 상수 |
| 필드 + null check | `lateinit var` | 지연 초기화 |


---


## Reference

- <https://kotlinlang.org/docs/basic-syntax.html#variables>
- <https://kotlinlang.org/docs/properties.html>

