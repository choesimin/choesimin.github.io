---
layout: note
permalink: /290
title: Kotlin 함수
description: Kotlin 함수는 fun keyword로 선언하며, default parameter, named argument, 단일 표현식 함수 등 간결한 문법을 제공합니다.
date: 2025-12-31
---


## 함수 선언

- Kotlin은 **`fun` keyword로 함수를 선언**합니다.
    - parameter는 `이름: type` 형식으로 작성합니다.
    - return type은 parameter 뒤에 `: type`으로 명시합니다.

```kotlin
fun add(a: Int, b: Int): Int {
    return a + b
}

fun greet(name: String): String {
    return "Hello, $name!"
}
```

- **반환값이 없는 함수**는 `Unit`을 반환합니다.
    - `Unit`은 생략할 수 있습니다.

```kotlin
fun printMessage(message: String): Unit {
    println(message)
}

// Unit 생략
fun printMessage(message: String) {
    println(message)
}
```


---


## 단일 표현식 함수

- **함수 본문이 단일 표현식**이면 `=`로 간결하게 작성할 수 있습니다.
    - 중괄호와 `return`을 생략합니다.
    - return type도 추론 가능하면 생략할 수 있습니다.

```kotlin
fun add(a: Int, b: Int): Int = a + b

// return type 추론
fun add(a: Int, b: Int) = a + b

fun greet(name: String) = "Hello, $name!"

fun max(a: Int, b: Int) = if (a > b) a else b
```

- 함수가 복잡해지면 **명시적 return type을 권장**합니다.
    - public API의 경우 return type을 명시하는 것이 좋습니다.


---


## Default Parameter

- **default parameter(기본 매개 변수)**는 parameter에 기본값을 지정하는 기능입니다.
    - 함수 호출 시 해당 인자를 생략할 수 있습니다.
    - Java의 method overloading을 대체합니다.

```kotlin
fun createUser(
    name: String,
    age: Int = 0,
    active: Boolean = true
) {
    println("$name, $age, $active")
}

// 호출
createUser("Kim")                    // Kim, 0, true
createUser("Lee", 25)                // Lee, 25, true
createUser("Park", 30, false)        // Park, 30, false
```

- **default parameter는 뒤쪽에 배치**하는 것이 좋습니다.
    - 앞쪽에 있으면 named argument를 사용해야 합니다.


---


## Named Argument

- **parameter 이름을 지정하여 인자를 전달**할 수 있습니다.
    - 순서에 관계없이 원하는 parameter에 값을 전달할 수 있습니다.
    - code 가독성이 높아집니다.

```kotlin
fun createUser(name: String, age: Int, active: Boolean) {
    // ...
}

// named argument 사용
createUser(name = "Kim", age = 25, active = true)

// 순서 변경 가능
createUser(active = false, name = "Lee", age = 30)

// 일부만 named argument 사용
createUser("Park", age = 28, active = true)
```

- **default parameter와 함께 사용**하면 유연한 호출이 가능합니다.

```kotlin
fun sendEmail(
    to: String,
    subject: String = "No Subject",
    body: String = "",
    cc: String? = null
) {
    // ...
}

sendEmail(to = "user@example.com")
sendEmail(to = "user@example.com", body = "Hello!")
sendEmail(to = "user@example.com", cc = "admin@example.com")
```


---


## Vararg

- **가변 인자**를 받을 때 `vararg` keyword를 사용합니다.
    - 0개 이상의 인자를 배열로 받습니다.
    - 함수당 하나의 `vararg`만 사용할 수 있습니다.

```kotlin
fun printAll(vararg messages: String) {
    for (message in messages) {
        println(message)
    }
}

printAll("Hello", "World", "Kotlin")
printAll()    // 인자 없이 호출 가능
```

- **spread operator (`*`)**로 배열을 펼쳐서 전달할 수 있습니다.

```kotlin
val items = arrayOf("A", "B", "C")
printAll(*items)    // spread operator

// 다른 인자와 함께 사용
printAll("Start", *items, "End")
```

- `vararg`가 **마지막 parameter가 아닌 경우** named argument가 필요합니다.

```kotlin
fun format(vararg values: String, separator: String): String {
    return values.joinToString(separator)
}

// named argument 필요
format("A", "B", "C", separator = ", ")
```


---


## Local Function

- **함수 내부에 함수를 정의**할 수 있습니다.
    - 외부 함수의 변수에 접근할 수 있습니다.
    - 특정 함수 내에서만 사용되는 logic을 캡슐화합니다.

```kotlin
fun processUser(user: User) {
    // local function
    fun validate(value: String, fieldName: String) {
        if (value.isEmpty()) {
            throw IllegalArgumentException("$fieldName is empty")
        }
    }

    validate(user.name, "Name")
    validate(user.email, "Email")

    // 처리 logic
}
```

- local function은 **외부 함수의 변수를 capture**할 수 있습니다.
    - Java와 달리 `var` 변수도 capture하고 수정할 수 있습니다.

```kotlin
fun printProgress(items: List<String>) {
    var count = 0

    fun printItem(item: String) {
        count++    // 외부 변수 capture 및 수정
        println("[$count] $item")
    }

    for (item in items) {
        printItem(item)
    }
}

printProgress(listOf("A", "B", "C"))
// [1] A
// [2] B
// [3] C
```


---


## Infix Function

- **`infix` keyword로 중위 표기법**을 사용할 수 있습니다.
    - member function 또는 extension function이어야 합니다.
    - parameter가 정확히 하나여야 합니다.
    - 기본값이나 vararg를 사용할 수 없습니다.

```kotlin
infix fun Int.times(str: String) = str.repeat(this)

// 중위 표기법 호출
val result = 3 times "Hello "    // "Hello Hello Hello "

// 일반 호출도 가능
val result2 = 3.times("Hi ")
```

- **표준 library의 infix function** 예시입니다.

```kotlin
// to : Pair 생성
val pair = "key" to "value"

// until : 범위 생성 (마지막 값 제외)
for (i in 0 until 10) { }

// downTo : 역순 범위
for (i in 10 downTo 1) { }

// step : 증가값
for (i in 0 until 10 step 2) { }
```


---


## Operator Overloading

- **`operator` keyword로 연산자를 재정의**할 수 있습니다.
    - 정해진 이름의 함수를 정의하면 해당 연산자로 호출할 수 있습니다.

| 연산자 | 함수 이름 |
| --- | --- |
| `+` | plus |
| `-` | minus |
| `*` | times |
| `/` | div |
| `%` | rem |
| `==` | equals |
| `<`, `>` | compareTo |
| `[]` | get, set |
| `()` | invoke |
| `in` | contains |

```kotlin
data class Point(val x: Int, val y: Int) {
    operator fun plus(other: Point) = Point(x + other.x, y + other.y)
    operator fun times(scale: Int) = Point(x * scale, y * scale)
}

val p1 = Point(1, 2)
val p2 = Point(3, 4)

val p3 = p1 + p2      // Point(4, 6)
val p4 = p1 * 3       // Point(3, 6)
```

- **복합 대입 연산자(compound assignment operator)**도 정의할 수 있습니다.

```kotlin
data class Counter(var value: Int) {
    operator fun plusAssign(amount: Int) {
        value += amount
    }
}

val counter = Counter(0)
counter += 5    // counter.value = 5
```


---


## Tailrec

- **`tailrec` keyword로 꼬리 재귀 최적화**를 적용할 수 있습니다.
    - compiler가 재귀를 loop로 변환하여 stack overflow를 방지합니다.
    - 재귀 호출이 함수의 마지막 동작이어야 합니다.

```kotlin
tailrec fun factorial(n: Long, accumulator: Long = 1): Long {
    return if (n <= 1) {
        accumulator
    } else {
        factorial(n - 1, n * accumulator)    // 꼬리 위치
    }
}

println(factorial(10000))    // stack overflow 없이 계산
```

- **꼬리 위치가 아닌 경우** compiler 경고가 발생합니다.

```kotlin
// 꼬리 재귀 아님 : 재귀 호출 후 곱셈 연산
tailrec fun badFactorial(n: Long): Long {
    return if (n <= 1) 1
    else n * badFactorial(n - 1)    // 경고 발생
}
```


---


## Java와의 비교

- Kotlin 함수는 Java method보다 **간결하고 유연**합니다.

```java
// Java : method overloading 필요
public void createUser(String name) {
    createUser(name, 0, true);
}

public void createUser(String name, int age) {
    createUser(name, age, true);
}

public void createUser(String name, int age, boolean active) {
    // ...
}
```

```kotlin
// Kotlin : default parameter로 해결
fun createUser(
    name: String,
    age: Int = 0,
    active: Boolean = true
) {
    // ...
}
```

| Java | Kotlin | 설명 |
| --- | --- | --- |
| method overloading | default parameter | 선택적 인자 |
| Builder pattern | named argument | 가독성 높은 호출 |
| `void` | `Unit` | 반환값 없음 |
| N/A | 단일 표현식 함수 | 간결한 함수 정의 |
| N/A | `tailrec` | 꼬리 재귀 최적화 |


---


## Reference

- <https://kotlinlang.org/docs/functions.html>
- <https://kotlinlang.org/docs/operator-overloading.html>

