---
layout: note
permalink: /398
title: Kotlin Extension Function - 기존 Class에 함수 추가하기
description: extension function은 기존 class를 수정하지 않고 새로운 함수를 추가하는 기능으로, Kotlin의 표현력과 가독성을 높이는 핵심 기능입니다.
date: 2025-01-04
---


## Extension Function

- **extension function(확장 함수)**은 기존 class에 새로운 함수를 추가합니다.
    - class의 source code를 수정하지 않고 기능을 확장합니다.
    - 상속 없이도 class에 함수를 추가합니다.
    - 외부 library나 final class도 확장할 수 있습니다.

```kotlin
// String class에 extension function 추가
fun String.addExclamation(): String {
    return this + "!"
}

println("Hello".addExclamation())   // Hello!
```


### Extension Function의 구조

- **receiver type** : 확장할 class를 지정합니다.
- **receiver object** : 함수 내부에서 `this`로 접근하는 실제 객체입니다.

```kotlin
//  receiver type
//       ↓
fun String.removeSpaces(): String {
    return this.replace(" ", "")
//         ↑
//   receiver object (this는 생략 가능)
}

val result = "Hello World".removeSpaces()   // HelloWorld
```


### Extension Function의 장점

- **기존 code를 변경하지 않고 기능을 추가**합니다.
    - 외부 library의 class도 확장할 수 있습니다.
    - final class도 확장할 수 있습니다.

- **가독성 높은 method chaining**이 가능합니다.
    - utility 함수를 객체의 method처럼 호출합니다.
    - 자연스러운 순서로 code를 읽습니다.

```kotlin
// utility 함수 방식
StringUtils.capitalize(StringUtils.trim(input))

// extension function 방식
input.trim().capitalize()
```

- **관심사를 분리**합니다.
    - core class는 핵심 기능만 유지합니다.
    - 부가 기능은 extension으로 분리합니다.


---


## Extension Function 문법

- **`fun ReceiverType.functionName(): ReturnType`** 형태로 정의합니다.
    - receiver type 뒤에 `.`을 붙이고 함수 이름을 작성합니다.
    - 함수 body에서 `this`로 receiver object에 접근합니다.


### 기본 형태

```kotlin
fun Int.isEven(): Boolean = this % 2 == 0
fun Int.isOdd(): Boolean = !this.isEven()

println(4.isEven())   // true
println(5.isOdd())    // true
```


### Parameter가 있는 Extension Function

```kotlin
fun String.repeat(times: Int): String {
    val builder = StringBuilder()
    repeat(times) {
        builder.append(this)
    }
    return builder.toString()
}

println("Ha".repeat(3))   // HaHaHa
```


### Generic Extension Function

- **generic type에 extension function을 정의**합니다.
    - 다양한 type에 공통 기능을 추가합니다.

```kotlin
fun <T> List<T>.secondOrNull(): T? {
    return if (size >= 2) this[1] else null
}

listOf(1, 2, 3).secondOrNull()      // 2
listOf("a").secondOrNull()          // null
emptyList<Int>().secondOrNull()     // null
```


### 제약 조건이 있는 Generic Extension

```kotlin
// Comparable을 구현한 type만 확장
fun <T : Comparable<T>> List<T>.isSorted(): Boolean {
    return this == this.sorted()
}

listOf(1, 2, 3).isSorted()      // true
listOf(3, 1, 2).isSorted()      // false
```


---


## Extension Property

- **extension property(확장 property)**는 기존 class에 property를 추가합니다.
    - backing field를 가질 수 없으므로 getter/setter로만 구현합니다.
    - 초기화 값을 가질 수 없습니다.

```kotlin
// extension property 정의
val String.lastChar: Char
    get() = this[length - 1]

var StringBuilder.lastChar: Char
    get() = this[length - 1]
    set(value) {
        this.setCharAt(length - 1, value)
    }

// 사용
println("Kotlin".lastChar)   // n

val sb = StringBuilder("Hello")
sb.lastChar = '!'
println(sb)   // Hell!
```


### Extension Property 예제

```kotlin
val String.isBlankOrEmpty: Boolean
    get() = this.isBlank() || this.isEmpty()

val List<Int>.average: Double
    get() = if (isEmpty()) 0.0 else sum().toDouble() / size

println("".isBlankOrEmpty)           // true
println("  ".isBlankOrEmpty)         // true
println(listOf(1, 2, 3).average)     // 2.0
```


---


## Nullable Receiver

- **nullable type에도 extension function을 정의**합니다.
    - 함수 내부에서 `this`가 null일 수 있습니다.
    - null 처리 logic을 extension 안에 캡슐화합니다.

```kotlin
fun String?.orEmpty(): String {
    return this ?: ""
}

fun String?.isNullOrBlank(): Boolean {
    return this == null || this.isBlank()
}

val name: String? = null
println(name.orEmpty())        // ""
println(name.isNullOrBlank())  // true
```


### Nullable Receiver 활용

```kotlin
fun <T> List<T>?.orEmpty(): List<T> {
    return this ?: emptyList()
}

fun Int?.orZero(): Int = this ?: 0

val numbers: List<Int>? = null
println(numbers.orEmpty())    // []

val count: Int? = null
println(count.orZero())       // 0
```


---


## Extension Function의 특성

- extension function은 일반 member 함수와 다른 특성이 있습니다.


### 정적 Dispatch

- **extension function은 compile 시점에 호출될 함수가 결정**됩니다.
    - runtime의 실제 type이 아닌, 선언된 type 기준으로 호출됩니다.
    - 다형성(polymorphism)이 적용되지 않습니다.

```kotlin
open class Animal
class Dog : Animal()

fun Animal.speak() = "Animal speaks"
fun Dog.speak() = "Dog barks"

fun printSpeak(animal: Animal) {
    println(animal.speak())
}

printSpeak(Dog())   // Animal speaks (Dog가 아닌 Animal의 extension 호출)
```


### Member 함수 우선

- **member 함수와 signature가 같으면 member 함수가 우선**됩니다.
    - extension function은 member 함수를 override할 수 없습니다.

```kotlin
class Example {
    fun printMessage() = println("Member function")
}

fun Example.printMessage() = println("Extension function")

Example().printMessage()   // Member function
```


### Private Member 접근 불가

- **extension function은 class의 private member에 접근할 수 없습니다**.
    - extension은 class 외부에서 정의되기 때문입니다.
    - public, protected, internal member만 접근 가능합니다.

```kotlin
class Secret {
    private val password = "1234"
    internal val code = "ABC"
}

fun Secret.tryAccess() {
    // println(password)   // compile error : private 접근 불가
    println(code)          // OK : internal 접근 가능
}
```


---


## Companion Object Extension

- **companion object에도 extension function을 정의**합니다.
    - class 이름으로 직접 호출하는 static-like 함수를 추가합니다.

```kotlin
class MyClass {
    companion object
}

fun MyClass.Companion.create(): MyClass {
    return MyClass()
}

// 사용
val instance = MyClass.create()
```


### Factory 함수 추가

```kotlin
data class User(val name: String, val email: String) {
    companion object
}

fun User.Companion.fromMap(map: Map<String, String>): User {
    return User(
        name = map["name"] ?: "",
        email = map["email"] ?: ""
    )
}

// 사용
val userMap = mapOf("name" to "Kim", "email" to "kim@example.com")
val user = User.fromMap(userMap)
```


---


## 표준 Library Extension Function

- Kotlin 표준 library는 다양한 extension function을 제공합니다.


### String Extension

```kotlin
// 표준 library의 String extension
val text = "  Hello World  "

text.trim()              // "Hello World"
text.uppercase()         // "  HELLO WORLD  "
text.lowercase()         // "  hello world  "
text.replace(" ", "-")   // "--Hello-World--"
text.split(" ")          // ["", "", "Hello", "World", "", ""]
text.startsWith("  H")   // true
text.contains("World")   // true
```


### Collection Extension

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

numbers.first()              // 1
numbers.last()               // 5
numbers.take(3)              // [1, 2, 3]
numbers.drop(2)              // [3, 4, 5]
numbers.reversed()           // [5, 4, 3, 2, 1]
numbers.shuffled()           // 무작위 순서
numbers.distinct()           // 중복 제거
numbers.chunked(2)           // [[1, 2], [3, 4], [5]]
```


### Any Extension

```kotlin
val value = "Kotlin"

// let : 변환 후 결과 반환
val length = value.let { it.length }   // 6

// also : 부수 효과 후 객체 반환
val logged = value.also { println(it) }   // Kotlin 출력 후 "Kotlin" 반환

// takeIf : 조건 만족하면 객체, 아니면 null
val result = value.takeIf { it.length > 3 }   // "Kotlin"

// takeUnless : 조건 불만족하면 객체, 아니면 null
val result2 = value.takeUnless { it.isEmpty() }   // "Kotlin"
```


---


## Extension Function 설계 Guide

- extension function은 강력하지만 무분별하게 사용하면 code 추적이 어려워지고 namespace가 오염됩니다.
    - 명확한 naming, 적절한 visibility 제한, member 함수와의 역할 구분을 통해 유지 보수성을 확보합니다.


### 명확한 이름 사용

- **함수 이름은 동작을 명확히 표현**해야 합니다.
    - receiver type의 context에서 자연스러운 이름을 사용합니다.

```kotlin
// 나쁜 예 : 모호한 이름
fun String.process(): String { ... }

// 좋은 예 : 명확한 이름
fun String.removeWhitespace(): String { ... }
fun String.toTitleCase(): String { ... }
```


### 적절한 Scope 설정

- **extension function의 visibility를 적절히 제한**합니다.
    - 전역으로 공개할 필요 없으면 private이나 internal로 제한합니다.
    - file 내에서만 사용하면 private으로 정의합니다.

```kotlin
// file 내부에서만 사용
private fun String.internal(): String { ... }

// module 내부에서만 사용
internal fun String.moduleOnly(): String { ... }
```


### Member 함수로 할지 Extension으로 할지 선택

| 상황 | 선택 |
| --- | --- |
| class의 핵심 기능 | member 함수 |
| private member 접근 필요 | member 함수 |
| 외부 library class 확장 | extension function |
| 특정 module에서만 필요한 기능 | extension function |
| utility 성격의 함수 | extension function |


### 과도한 Extension 지양

- **너무 많은 extension은 혼란을 유발**합니다.
    - IDE 자동 완성에 너무 많은 항목이 표시됩니다.
    - 어디서 정의된 함수인지 추적이 어렵습니다.

```kotlin
// 나쁜 예 : 관련 없는 기능을 String에 추가
fun String.saveToDatabase() { ... }
fun String.sendEmail() { ... }

// 좋은 예 : 관련 있는 기능만 추가
fun String.isValidEmail(): Boolean { ... }
fun String.maskEmail(): String { ... }
```


---


## 실전 활용 예제

- 반복되는 utility logic은 extension function으로 정의하면 가독성과 재사용성이 높아집니다.
    - 특히 String validation, 숫자 formatting, collection 안전 접근 등에서 유용합니다.


### Validation Extension

```kotlin
fun String.isValidEmail(): Boolean {
    val regex = Regex("^[A-Za-z0-9+_.-]+@(.+)$")
    return regex.matches(this)
}

fun String.isValidPhoneNumber(): Boolean {
    val regex = Regex("^\\d{3}-\\d{4}-\\d{4}$")
    return regex.matches(this)
}

"test@example.com".isValidEmail()    // true
"010-1234-5678".isValidPhoneNumber() // true
```


### Formatting Extension

```kotlin
fun Int.toOrdinal(): String {
    return when {
        this % 100 in 11..13 -> "${this}th"
        this % 10 == 1 -> "${this}st"
        this % 10 == 2 -> "${this}nd"
        this % 10 == 3 -> "${this}rd"
        else -> "${this}th"
    }
}

fun Long.toReadableSize(): String {
    val units = listOf("B", "KB", "MB", "GB", "TB")
    var size = this.toDouble()
    var unitIndex = 0
    while (size >= 1024 && unitIndex < units.size - 1) {
        size /= 1024
        unitIndex++
    }
    return "%.2f %s".format(size, units[unitIndex])
}

println(1.toOrdinal())              // 1st
println(22.toOrdinal())             // 22nd
println(1536000L.toReadableSize())  // 1.46 MB
```


### Collection Extension

```kotlin
fun <T> List<T>.safeGet(index: Int): T? {
    return if (index in indices) this[index] else null
}

fun <T> List<T>.randomOrNull(): T? {
    return if (isEmpty()) null else random()
}

fun <K, V> Map<K, V>.getOrThrow(key: K): V {
    return this[key] ?: throw NoSuchElementException("Key not found: $key")
}

listOf(1, 2, 3).safeGet(10)    // null
listOf(1, 2, 3).randomOrNull() // 1, 2, 또는 3
```


---


## Reference

- <https://kotlinlang.org/docs/extensions.html>

