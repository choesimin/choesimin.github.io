---
layout: note
permalink: /262
title: Kotlin DSL
description: DSL은 lambda with receiver와 확장 함수를 활용하여 domain에 특화된 type-safe하고 가독성 높은 선언적 API를 구축합니다.
date: 2025-01-06
---


## DSL

- **DSL(Domain-Specific Language)**은 **특정 domain에 최적화된 언어**입니다.
    - 범용 언어(GPL)와 달리 특정 문제 영역에 집중합니다.
    - Kotlin의 언어 기능으로 **internal DSL**을 구축합니다.
    - type-safe하고 IDE 지원을 받을 수 있습니다.

```kotlin
// Gradle Kotlin DSL
plugins {
    kotlin("jvm") version "1.9.0"
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib")
    testImplementation("junit:junit:4.13.2")
}

// HTML DSL
val page = html {
    head {
        title("My Page")
    }
    body {
        h1("Welcome")
        p("This is Kotlin DSL")
    }
}
```


### Internal DSL vs External DSL

| 구분 | Internal DSL | External DSL |
| --- | --- | --- |
| Host 언어 | 기존 언어 내에서 구현 | 별도 parser 필요 |
| 문법 | Host 언어 문법 준수 | 자유로운 문법 설계 |
| 도구 지원 | IDE 지원 자동 제공 | 별도 개발 필요 |
| 예시 | Kotlin DSL, Gradle Kotlin | SQL, HTML, CSS |


---


## Lambda with Receiver

- **lambda with receiver**는 DSL의 핵심 building block입니다.
    - **receiver 객체의 context**에서 lambda가 실행됩니다.
    - `this`를 통해 receiver의 member에 직접 접근합니다.

```kotlin
// 일반 lambda
val sum: (Int, Int) -> Int = { a, b -> a + b }

// lambda with receiver
val isEven: Int.() -> Boolean = { this % 2 == 0 }

5.isEven()  // false
4.isEven()  // true
```


### Function Type with Receiver

- **`T.() -> R`** 형태로 receiver를 가진 함수 type을 선언합니다.
    - `T`가 receiver type입니다.
    - lambda 내부에서 `T`의 member에 `this.` 없이 접근합니다.

```kotlin
// StringBuilder를 receiver로 받는 lambda
fun buildString(action: StringBuilder.() -> Unit): String {
    val sb = StringBuilder()
    sb.action()  // lambda 실행
    return sb.toString()
}

val result = buildString {
    append("Hello, ")  // this.append() 와 동일
    append("World!")
}
println(result)  // Hello, World!
```


### apply vs with vs run

- Kotlin 표준 library의 scope 함수들은 lambda with receiver를 활용합니다.

| 함수 | Receiver | 반환값 | 용도 |
| --- | --- | --- | --- |
| apply | this | receiver | 객체 초기화 |
| with | this | lambda 결과 | 객체 조작 |
| run | this | lambda 결과 | 계산 후 결과 반환 |
| also | it | receiver | 부수 효과 |
| let | it | lambda 결과 | null check, 변환 |

```kotlin
// apply : 객체 초기화
val person = Person().apply {
    name = "Kim"
    age = 25
}

// with : 여러 연산 수행
val description = with(person) {
    "Name: $name, Age: $age"
}

// run : 초기화 + 결과 반환
val greeting = Person().run {
    name = "Lee"
    "Hello, $name!"
}
```


---


## Type-Safe Builder

- **type-safe builder**는 **계층적 구조를 선언적으로 구축**합니다.
    - HTML, XML, UI layout 등 tree 구조에 적합합니다.
    - compile 시점에 구조의 유효성을 검증합니다.

```kotlin
// HTML builder 결과
html {
    head {
        title("Page Title")
    }
    body {
        div {
            p("First paragraph")
            p("Second paragraph")
        }
    }
}
```


### Builder 구현

- HTML DSL의 기본 구조는 `Element`와 `Tag` class로 구성됩니다.

```kotlin
// HTML element 기본 class
@DslMarker
annotation class HtmlDsl

@HtmlDsl
abstract class Element {
    protected val children = mutableListOf<Element>()

    protected fun <T : Element> initElement(element: T, init: T.() -> Unit): T {
        element.init()
        children.add(element)
        return element
    }

    abstract fun render(builder: StringBuilder, indent: String)
}

abstract class Tag(private val name: String) : Element() {
    override fun render(builder: StringBuilder, indent: String) {
        builder.append("$indent<$name>\n")
        for (child in children) {
            child.render(builder, "$indent  ")
        }
        builder.append("$indent</$name>\n")
    }
}

class TextElement(private val text: String) : Element() {
    override fun render(builder: StringBuilder, indent: String) {
        builder.append("$indent$text\n")
    }
}
```


### Tag Class 정의

- 각 HTML tag를 class로 정의하고 자식 element 추가 method를 제공합니다.

```kotlin
class HTML : Tag("html") {
    fun head(init: Head.() -> Unit) = initElement(Head(), init)
    fun body(init: Body.() -> Unit) = initElement(Body(), init)
}

class Head : Tag("head") {
    fun title(text: String) {
        children.add(Title(text))
    }
}

class Title(private val text: String) : Tag("title") {
    init { children.add(TextElement(text)) }
}

class Body : Tag("body") {
    fun div(init: Div.() -> Unit) = initElement(Div(), init)
    fun h1(text: String) = initElement(H1(text)) {}
    fun p(text: String) = initElement(P(text)) {}
}

class Div : Tag("div") {
    fun p(text: String) = initElement(P(text)) {}
}

class H1(text: String) : Tag("h1") {
    init { children.add(TextElement(text)) }
}

class P(text: String) : Tag("p") {
    init { children.add(TextElement(text)) }
}
```


### Builder 함수

- 최상위 builder 함수가 DSL의 진입점이 됩니다.

```kotlin
fun html(init: HTML.() -> Unit): HTML {
    val html = HTML()
    html.init()
    return html
}

// 사용
val document = html {
    head {
        title("My Page")
    }
    body {
        h1("Welcome")
        div {
            p("Hello, DSL!")
        }
    }
}

// 출력
val output = StringBuilder()
document.render(output, "")
println(output)
```


---


## DslMarker

- **`@DslMarker`**는 **implicit receiver의 scope를 제한**합니다.
    - 중첩된 lambda에서 외부 receiver에 실수로 접근하는 것을 방지합니다.
    - compile error로 잘못된 scope 접근을 알려줍니다.

```kotlin
@DslMarker
annotation class HtmlDsl

@HtmlDsl
class HTML { /* ... */ }

@HtmlDsl
class Body { /* ... */ }

// DslMarker 없이
html {
    body {
        // 외부 html receiver에 접근 가능 -> 의도치 않은 동작
        head { }  // 위험!
    }
}

// DslMarker 사용 시
html {
    body {
        // head { }  // compile error : head는 HTML의 member
        p("Safe!")   // Body의 member만 접근 가능
    }
}
```


### 외부 Receiver 명시적 접근

- 필요시 **`this@label`**로 외부 receiver에 명시적으로 접근합니다.

```kotlin
html {
    body {
        // 명시적으로 외부 receiver 접근 (드문 경우)
        this@html.head { }
    }
}
```


---


## 확장 함수 활용

- **확장 함수**로 DSL의 표현력을 높입니다.
    - 기존 class에 DSL 문법을 추가합니다.
    - infix 함수로 자연스러운 문법을 만듭니다.

```kotlin
// infix로 자연스러운 문법
infix fun Int.times(action: (Int) -> Unit) {
    for (i in 0 until this) {
        action(i)
    }
}

3 times { println("Hello $it") }
// Hello 0
// Hello 1
// Hello 2
```


### 연산자 Overloading

- **operator overloading**으로 자연스러운 DSL 문법을 만듭니다.

```kotlin
class Route(val path: String) {
    operator fun div(subPath: String) = Route("$path/$subPath")
}

val api = Route("/api")
val users = api / "users"        // /api/users
val user = users / "123"         // /api/users/123

println(user.path)  // /api/users/123
```


### Builder Pattern

- lambda with receiver를 활용하면 전통적인 builder pattern을 간결하게 구현합니다.

```kotlin
class Person private constructor(
    val name: String,
    val age: Int,
    val email: String?
) {
    class Builder {
        var name: String = ""
        var age: Int = 0
        var email: String? = null

        fun build() = Person(name, age, email)
    }

    companion object {
        fun build(init: Builder.() -> Unit): Person {
            val builder = Builder()
            builder.init()
            return builder.build()
        }
    }
}

val person = Person.build {
    name = "Kim"
    age = 25
    email = "kim@example.com"
}
```


---


## 실전 예제

- 실무에서 DSL은 **복잡한 구조를 선언적으로 표현**할 때 유용합니다.
    - 반복적인 builder pattern이나 설정 code를 간결하게 만듭니다.
    - compile 시점에 구조의 유효성을 검증하여 runtime error를 방지합니다.


### SQL DSL

- SQL query를 type-safe하게 작성하는 DSL입니다.

```kotlin
@DslMarker
annotation class SqlDsl

@SqlDsl
class Query {
    private var table: String = ""
    private val columns = mutableListOf<String>()
    private val conditions = mutableListOf<String>()
    private var orderBy: String? = null
    private var limit: Int? = null

    fun from(table: String) {
        this.table = table
    }

    fun select(vararg cols: String) {
        columns.addAll(cols)
    }

    fun where(condition: String) {
        conditions.add(condition)
    }

    fun orderBy(column: String, direction: String = "ASC") {
        orderBy = "$column $direction"
    }

    fun limit(n: Int) {
        limit = n
    }

    fun build(): String {
        val cols = if (columns.isEmpty()) "*" else columns.joinToString(", ")
        val sql = StringBuilder("SELECT $cols FROM $table")

        if (conditions.isNotEmpty()) {
            sql.append(" WHERE ${conditions.joinToString(" AND ")}")
        }
        orderBy?.let { sql.append(" ORDER BY $it") }
        limit?.let { sql.append(" LIMIT $it") }

        return sql.toString()
    }
}

fun query(init: Query.() -> Unit): String {
    val query = Query()
    query.init()
    return query.build()
}

// 사용
val sql = query {
    select("id", "name", "email")
    from("users")
    where("age > 18")
    where("status = 'active'")
    orderBy("name")
    limit(10)
}
// SELECT id, name, email FROM users WHERE age > 18 AND status = 'active' ORDER BY name ASC LIMIT 10
```


### Test DSL

- BDD style의 test를 작성하는 DSL입니다.

```kotlin
@DslMarker
annotation class TestDsl

@TestDsl
class TestContext(val name: String) {
    private val tests = mutableListOf<TestCase>()

    fun test(name: String, block: () -> Unit) {
        tests.add(TestCase(name, block))
    }

    fun run() {
        println("Running: $name")
        tests.forEach { test ->
            try {
                test.block()
                println("  [PASS] ${test.name}")
            } catch (e: AssertionError) {
                println("  [FAIL] ${test.name}: ${e.message}")
            }
        }
    }

    data class TestCase(val name: String, val block: () -> Unit)
}

fun describe(name: String, init: TestContext.() -> Unit) {
    val context = TestContext(name)
    context.init()
    context.run()
}

infix fun <T> T.shouldBe(expected: T) {
    if (this != expected) {
        throw AssertionError("Expected $expected but was $this")
    }
}

// 사용
describe("Calculator") {
    test("addition") {
        (1 + 1) shouldBe 2
    }

    test("subtraction") {
        (5 - 3) shouldBe 2
    }
}
```


### Configuration DSL

- Server 설정을 선언적으로 작성하는 DSL입니다.

```kotlin
@DslMarker
annotation class ConfigDsl

@ConfigDsl
class ServerConfig {
    var host: String = "localhost"
    var port: Int = 8080

    private var _database: DatabaseConfig? = null
    val database: DatabaseConfig get() = _database!!

    private var _cache: CacheConfig? = null
    val cache: CacheConfig? get() = _cache

    fun database(init: DatabaseConfig.() -> Unit) {
        _database = DatabaseConfig().apply(init)
    }

    fun cache(init: CacheConfig.() -> Unit) {
        _cache = CacheConfig().apply(init)
    }
}

@ConfigDsl
class DatabaseConfig {
    var url: String = ""
    var username: String = ""
    var password: String = ""
    var poolSize: Int = 10
}

@ConfigDsl
class CacheConfig {
    var enabled: Boolean = true
    var ttlSeconds: Int = 3600
    var maxSize: Int = 1000
}

fun server(init: ServerConfig.() -> Unit): ServerConfig {
    return ServerConfig().apply(init)
}

// 사용
val config = server {
    host = "0.0.0.0"
    port = 8080

    database {
        url = "jdbc:postgresql://localhost/mydb"
        username = "admin"
        password = "secret"
        poolSize = 20
    }

    cache {
        enabled = true
        ttlSeconds = 1800
        maxSize = 5000
    }
}

println("Server: ${config.host}:${config.port}")
println("Database: ${config.database.url}")
println("Cache TTL: ${config.cache?.ttlSeconds}")
```


---


## DSL Design Guide

- **일관된 문법**을 유지합니다.
    - 비슷한 기능은 비슷한 형태로 표현합니다.
    - 사용자가 pattern을 예측할 수 있어야 합니다.

- **DslMarker**를 사용하여 scope를 제한합니다.
    - 실수로 잘못된 receiver에 접근하는 것을 방지합니다.

- **확장성**을 고려합니다.
    - 사용자가 DSL을 확장할 수 있게 설계합니다.
    - sealed class 대신 interface를 사용합니다.

- **error message**를 명확하게 합니다.
    - 잘못된 사용에 대해 이해하기 쉬운 error를 제공합니다.
    - require, check 등으로 검증합니다.

```kotlin
class Query {
    private var table: String? = null

    fun from(table: String) {
        this.table = table
    }

    fun build(): String {
        requireNotNull(table) { "Table must be specified using from()" }
        // ...
    }
}
```


---


## Reference

- <https://kotlinlang.org/docs/type-safe-builders.html>
- <https://kotlinlang.org/docs/lambdas.html#function-literals-with-receiver>

