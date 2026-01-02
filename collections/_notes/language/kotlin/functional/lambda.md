---
layout: note
permalink: /396
title: Kotlin Lambda 표현식
description: lambda는 이름 없이 정의하는 함수 literal로, 고차 함수와 함께 사용하여 간결하고 표현력 있는 함수형 code를 작성할 수 있게 합니다.
date: 2025-01-02
---


## Lambda

- **lambda**는 이름 없이 정의하는 함수입니다.
    - 함수 literal이라고도 부릅니다.
    - 변수에 저장하거나, 다른 함수에 전달하거나, 즉시 실행할 수 있습니다.
    - 고차 함수의 argument로 자주 사용됩니다.


### Lambda의 유래

- **"lambda"라는 이름은 그리스 문자 λ(람다)에서 유래**했습니다.
    - 1930년대 수학자 Alonzo Church가 **lambda calculus(람다 대수)**를 고안했습니다.
    - lambda calculus는 함수를 정의하고 적용하는 형식 체계로, 현대 함수형 programming의 이론적 기반입니다.
    - Church는 함수를 표현할 때 λ 기호를 사용했고, 이것이 lambda라는 이름의 기원입니다.

- **programming 언어에서 lambda는 1958년 Lisp에서 처음 도입**되었습니다.
    - Lisp의 창시자 John McCarthy가 lambda calculus의 개념을 programming에 적용했습니다.
    - 이후 Haskell, ML 등 함수형 언어에서 핵심 기능으로 자리잡았습니다.

- **주류 언어들은 2010년대에 lambda를 본격적으로 도입**했습니다.
    - C++11(2011), Java 8(2014), JavaScript ES6(2015) 등이 lambda를 추가했습니다.
    - Kotlin은 처음부터 lambda를 일급 시민으로 지원하며 간결한 문법을 제공합니다.


### Lambda의 정의

```kotlin
// 일반 함수
fun sum(a: Int, b: Int): Int = a + b

// lambda : 이름 없는 함수
val sumLambda = { a: Int, b: Int -> a + b }

println(sum(3, 4))          // 7
println(sumLambda(3, 4))    // 7
```

- **lambda를 사용하는 이유**는 간결함과 유연성입니다.
    - 일회성 함수를 별도로 정의하지 않아도 됩니다.
    - 고차 함수와 조합하여 선언적인 code를 작성합니다.
    - collection 연산, event handler, callback 등에 활용합니다.

```kotlin
// lambda 없이 : 별도 함수 정의 필요
fun isEven(n: Int): Boolean = n % 2 == 0
val evens = listOf(1, 2, 3, 4, 5).filter(::isEven)

// lambda 사용 : inline으로 정의
val evens2 = listOf(1, 2, 3, 4, 5).filter { it % 2 == 0 }
```


---


## Lambda 문법

- **lambda는 중괄호 `{ }` 안에 parameter와 body를 작성**합니다.
    - `{ parameters -> body }` 형태입니다.
    - 마지막 표현식이 반환값이 됩니다.
    - `return` keyword를 사용하지 않습니다.

```kotlin
// 기본 형태
val sum: (Int, Int) -> Int = { a: Int, b: Int -> a + b }

// type 추론 : parameter type 생략
val sum2: (Int, Int) -> Int = { a, b -> a + b }

// type 추론 : 변수 type 생략
val sum3 = { a: Int, b: Int -> a + b }
```


### Parameter가 없는 Lambda

- **parameter가 없으면 화살표(`->`)를 생략**합니다.

```kotlin
val greet: () -> String = { "Hello, World!" }
println(greet())    // Hello, World!

val printHello: () -> Unit = { println("Hello") }
printHello()    // Hello
```


### 단일 Parameter와 it

- **parameter가 하나면 `it`으로 참조**할 수 있습니다.
    - parameter 선언과 화살표를 생략합니다.
    - 암묵적으로 `it`이라는 이름이 부여됩니다.

```kotlin
val double: (Int) -> Int = { it * 2 }
println(double(5))    // 10

val numbers = listOf(1, 2, 3, 4, 5)
val doubled = numbers.map { it * 2 }    // [2, 4, 6, 8, 10]
```

- **중첩 lambda에서는 `it` 사용을 피합니다**.
    - 어떤 lambda의 `it`인지 모호해집니다.
    - 명시적으로 parameter 이름을 지정합니다.

```kotlin
// 나쁜 예 : it이 모호함
val result = listOf(listOf(1, 2), listOf(3, 4)).map {
    it.filter { it > 1 }    // 어떤 it?
}

// 좋은 예 : 명시적 이름
val result2 = listOf(listOf(1, 2), listOf(3, 4)).map { innerList ->
    innerList.filter { number -> number > 1 }
}
```


### 사용하지 않는 Parameter

- **사용하지 않는 parameter는 `_`로 표시**합니다.
    - compiler warning을 방지합니다.
    - 의도적으로 무시한다는 것을 명확히 합니다.

```kotlin
val map = mapOf("a" to 1, "b" to 2)

// key를 사용하지 않음
map.forEach { (_, value) ->
    println(value)
}

// 첫 번째 parameter를 사용하지 않음
val printSecond: (Int, Int) -> Unit = { _, second ->
    println(second)
}
```


### 여러 줄 Lambda

- **lambda body가 여러 줄이면 마지막 표현식이 반환값**입니다.

```kotlin
val process: (Int) -> Int = { number ->
    println("Processing: $number")
    val doubled = number * 2
    val result = doubled + 1
    result    // 마지막 표현식이 반환값
}

println(process(5))    // Processing: 5 → 11
```


---


## Trailing Lambda

- **함수의 마지막 parameter가 함수 type이면 괄호 밖으로 뺄 수 있습니다**.
    - trailing lambda 또는 lambda outside parentheses라고 부릅니다.
    - Kotlin의 관용적인 style입니다.

```kotlin
fun operate(a: Int, b: Int, operation: (Int, Int) -> Int): Int {
    return operation(a, b)
}

// 괄호 안에 lambda
val result1 = operate(3, 4, { a, b -> a + b })

// trailing lambda : 괄호 밖으로
val result2 = operate(3, 4) { a, b -> a + b }
```


### 유일한 Parameter인 경우

- **lambda가 유일한 argument면 괄호를 생략**할 수 있습니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

// 괄호 포함
numbers.filter({ it % 2 == 0 })

// trailing lambda
numbers.filter() { it % 2 == 0 }

// 괄호 생략 (권장)
numbers.filter { it % 2 == 0 }
```


### 여러 Lambda Parameter

- **여러 lambda parameter가 있으면 마지막만 밖으로 뺍니다**.

```kotlin
fun <T> process(
    data: T,
    onSuccess: (T) -> Unit,
    onError: (Exception) -> Unit
) {
    try {
        onSuccess(data)
    } catch (e: Exception) {
        onError(e)
    }
}

// 마지막 lambda만 밖으로
process(
    data = "Hello",
    onSuccess = { println("Success: $it") }
) { error ->
    println("Error: ${error.message}")
}
```


---


## 함수 Type

- **함수 type**은 함수의 signature를 type으로 표현합니다.
    - `(parameter types) -> return type` 형태입니다.
    - lambda나 함수 reference를 할당할 수 있습니다.

```kotlin
// 함수 type 선언
val operation: (Int, Int) -> Int

// lambda 할당
operation = { a, b -> a + b }

// 함수 reference 할당
fun multiply(a: Int, b: Int): Int = a * b
operation = ::multiply
```


### 함수 Type의 다양한 형태

```kotlin
// parameter 없음
val greet: () -> String = { "Hello" }

// Unit 반환
val printNumber: (Int) -> Unit = { println(it) }

// nullable 반환
val findNumber: (List<Int>) -> Int? = { it.firstOrNull() }

// nullable 함수 type
var callback: ((String) -> Unit)? = null

// 고차 함수 type
val transform: ((Int) -> Int) -> (Int) -> Int = { f ->
    { x -> f(f(x)) }
}
```


### Type Alias

- **`typealias`로 함수 type에 이름을 부여**할 수 있습니다.
    - 복잡한 함수 type을 읽기 쉽게 만듭니다.

```kotlin
typealias Operation = (Int, Int) -> Int
typealias Predicate<T> = (T) -> Boolean
typealias EventHandler = (Event) -> Unit

val add: Operation = { a, b -> a + b }
val isPositive: Predicate<Int> = { it > 0 }
```


---


## Closure

- **lambda는 외부 scope의 변수를 capture**합니다.
    - 이렇게 capture된 환경을 closure라고 합니다.
    - Java와 달리 `final`이 아닌 변수도 capture하고 수정할 수 있습니다.

```kotlin
fun counter(): () -> Int {
    var count = 0
    return {
        count++    // 외부 변수 capture 및 수정
        count
    }
}

val next = counter()
println(next())    // 1
println(next())    // 2
println(next())    // 3
```


### Java와의 차이

- **Java anonymous class는 effectively final 변수만 capture**합니다.
- **Kotlin lambda는 가변 변수도 capture하고 수정**할 수 있습니다.

```java
// Java : final 또는 effectively final만 가능
int count = 0;
Runnable r = () -> {
    // count++;    // compile error
    System.out.println(count);
};
```

```kotlin
// Kotlin : 가변 변수도 capture 및 수정 가능
var count = 0
val increment = {
    count++    // 가능
}
increment()
println(count)    // 1
```


---


## Anonymous Function

- **anonymous function**은 lambda와 유사하지만 문법이 다릅니다.
    - `fun` keyword를 사용합니다.
    - 반환 type을 명시할 수 있습니다.
    - `return`의 동작이 다릅니다.

```kotlin
// lambda
val sumLambda = { a: Int, b: Int -> a + b }

// anonymous function
val sumAnonymous = fun(a: Int, b: Int): Int {
    return a + b
}

// anonymous function : single expression
val sumAnonymous2 = fun(a: Int, b: Int) = a + b
```


### Return 동작의 차이

- **lambda의 `return`은 바깥 함수에서 반환**합니다.
- **anonymous function의 `return`은 자기 자신에서 반환**합니다.

```kotlin
fun processWithLambda() {
    listOf(1, 2, 3).forEach {
        if (it == 2) return    // processWithLambda에서 반환
        println(it)
    }
    println("Done")    // 실행되지 않음
}
// 출력 : 1

fun processWithAnonymous() {
    listOf(1, 2, 3).forEach(fun(value) {
        if (value == 2) return    // anonymous function에서 반환
        println(value)
    })
    println("Done")    // 실행됨
}
// 출력 : 1, 3, Done
```


### Label Return

- **lambda에서 자기 자신만 반환하려면 label을 사용**합니다.

```kotlin
fun processWithLabel() {
    listOf(1, 2, 3).forEach {
        if (it == 2) return@forEach    // lambda에서만 반환
        println(it)
    }
    println("Done")
}
// 출력 : 1, 3, Done

// 명시적 label
fun processWithExplicitLabel() {
    listOf(1, 2, 3).forEach loop@{
        if (it == 2) return@loop
        println(it)
    }
    println("Done")
}
```


---


## Inline Function

- **`inline` function은 호출 위치에 함수 body를 삽입**합니다.
    - lambda를 parameter로 받는 고차 함수의 overhead를 제거합니다.
    - lambda 객체 생성과 가상 호출 비용이 없어집니다.

```kotlin
inline fun measureTime(block: () -> Unit) {
    val start = System.currentTimeMillis()
    block()
    val end = System.currentTimeMillis()
    println("Execution time: ${end - start}ms")
}

// 호출 시 inline됨
measureTime {
    Thread.sleep(100)
}
```


### Non-local Return

- **inline lambda에서는 바깥 함수로 return이 가능**합니다.
    - lambda가 inline되어 같은 scope에 존재하기 때문입니다.

```kotlin
inline fun runIf(condition: Boolean, block: () -> Unit) {
    if (condition) block()
}

fun example() {
    runIf(true) {
        println("Before return")
        return    // example()에서 반환 (non-local return)
    }
    println("After runIf")    // 실행되지 않음
}
```


### noinline과 crossinline

- **`noinline`**은 특정 lambda parameter를 inline하지 않습니다.
    - 해당 lambda를 변수에 저장하거나 다른 함수에 전달할 때 필요합니다.

```kotlin
inline fun process(
    inline1: () -> Unit,
    noinline inline2: () -> Unit    // inline하지 않음
) {
    inline1()
    val stored = inline2    // 변수에 저장 가능
    stored()
}
```

- **`crossinline`**은 non-local return을 금지합니다.
    - lambda가 다른 context에서 실행될 때 필요합니다.

```kotlin
inline fun runAsync(crossinline block: () -> Unit) {
    Thread {
        block()    // 다른 thread에서 실행
        // block 안에서 return 불가
    }.start()
}
```


---


## 실전 활용 예제

- lambda는 logic(동작)을 data(정보)처럼 취급하여 전달하는 상황에서 유용하게 활용됩니다.


### Collection 연산

```kotlin
data class Person(val name: String, val age: Int, val city: String)

val people = listOf(
    Person("Kim", 25, "Seoul"),
    Person("Lee", 30, "Busan"),
    Person("Park", 25, "Seoul"),
    Person("Choi", 35, "Seoul")
)

// 서울에 사는 25세 이상의 사람 이름
val names = people
    .filter { it.city == "Seoul" && it.age >= 25 }
    .map { it.name }
// [Kim, Park, Choi]

// 도시별 평균 나이
val avgAgeByCity = people
    .groupBy { it.city }
    .mapValues { (_, persons) -> persons.map { it.age }.average() }
// {Seoul=28.33, Busan=30.0}
```


### Callback과 Event Handler

```kotlin
class Button {
    private var onClick: ((Button) -> Unit)? = null

    fun setOnClickListener(listener: (Button) -> Unit) {
        onClick = listener
    }

    fun click() {
        onClick?.invoke(this)
    }
}

val button = Button()
button.setOnClickListener { btn ->
    println("Button clicked!")
}
button.click()    // Button clicked!
```


### Builder Pattern

```kotlin
class HtmlBuilder {
    private val content = StringBuilder()

    fun tag(name: String, block: HtmlBuilder.() -> Unit) {
        content.append("<$name>")
        block()
        content.append("</$name>")
    }

    fun text(value: String) {
        content.append(value)
    }

    override fun toString() = content.toString()
}

fun html(block: HtmlBuilder.() -> Unit): String {
    val builder = HtmlBuilder()
    builder.block()
    return builder.toString()
}

val result = html {
    tag("div") {
        tag("p") {
            text("Hello, World!")
        }
    }
}
// <div><p>Hello, World!</p></div>
```


---


## Reference

- <https://kotlinlang.org/docs/lambdas.html>
- <https://kotlinlang.org/docs/inline-functions.html>

