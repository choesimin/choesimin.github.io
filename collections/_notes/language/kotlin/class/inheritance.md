---
layout: note
permalink: /394
title: Kotlin 상속과 Interface
description: Kotlin class는 기본적으로 final이며, open keyword로 상속을 허용하고, interface와 abstract class로 다형성을 구현합니다.
date: 2025-01-02
---


## Kotlin의 상속 : 기본적으로 Final

- **Kotlin class는 기본적으로 `final`**입니다.
    - 명시적으로 `open`을 붙이지 않으면 상속할 수 없습니다.
    - Java는 기본적으로 상속 가능하고, `final`을 붙여야 상속을 막습니다.
    - Kotlin은 반대로 설계되어 있습니다.

```kotlin
class FinalClass    // 상속 불가 (기본값)
open class OpenClass    // 상속 가능

// class Child : FinalClass()    // compile error
class Child : OpenClass()        // 가능
```


### 기본이 Final인 이유

- **"상속을 위한 설계를 하거나, 상속을 금지하라"**는 원칙을 따릅니다.
    - Effective Java의 Item 19에서 권장하는 내용입니다.
    - 상속은 강력하지만, 잘못 사용하면 취약한 설계가 됩니다.

- **의도하지 않은 상속을 방지**합니다.
    - superclass를 변경했을 때 subclass가 예상치 못하게 깨질 수 있습니다.
    - 상속을 허용하려면 명시적으로 `open`을 선언해야 하므로, 개발자가 상속 가능성을 인지하고 설계합니다.

- **합성(composition)을 상속보다 권장**합니다.
    - 상속은 강한 결합을 만들고, 합성은 유연한 구조를 만듭니다.
    - Kotlin은 `by` keyword로 위임(delegation)을 쉽게 구현할 수 있습니다.


---


## Open Class와 상속

- **`open` keyword**로 class와 member를 상속 가능하게 만듭니다.
    - class에 `open`을 붙여야 상속할 수 있습니다.
    - method와 property에도 `open`을 붙여야 override할 수 있습니다.

```kotlin
open class Animal(val name: String) {
    open fun speak() {
        println("...")
    }

    fun eat() {    // open이 없으면 override 불가
        println("$name is eating")
    }
}

class Dog(name: String) : Animal(name) {
    override fun speak() {
        println("Woof!")
    }

    // override fun eat() { }    // compile error : eat()은 open이 아님
}
```


### Superclass Constructor 호출

- **subclass는 superclass의 constructor를 호출**해야 합니다.
    - primary constructor에서 superclass를 초기화합니다.
    - superclass에 parameter가 있으면 전달해야 합니다.

```kotlin
open class Person(val name: String, val age: Int)

// primary constructor에서 superclass 초기화
class Student(name: String, age: Int, val school: String) : Person(name, age)

// secondary constructor에서 super 호출
class Employee : Person {
    val company: String

    constructor(name: String, age: Int, company: String) : super(name, age) {
        this.company = company
    }
}
```


### Method Override

- **`override` keyword**로 superclass의 method를 재정의합니다.
    - superclass method에 `open`이 있어야 override 가능합니다.
    - `override`한 method는 기본적으로 `open`입니다.
    - 더 이상 override를 막으려면 `final override`를 사용합니다.

```kotlin
open class Shape {
    open fun draw() = println("Drawing shape")
    open fun resize() = println("Resizing shape")
}

open class Circle : Shape() {
    override fun draw() = println("Drawing circle")
    final override fun resize() = println("Resizing circle")    // 더 이상 override 불가
}

class FilledCircle : Circle() {
    override fun draw() = println("Drawing filled circle")    // 가능
    // override fun resize() { }    // compile error : final
}
```


### Property Override

- **property도 override**할 수 있습니다.
    - `val`을 `var`로 override하면 getter에 setter가 추가됩니다.
    - `var`를 `val`로 override할 수는 없습니다.

```kotlin
open class Vehicle {
    open val wheels: Int = 4
    open val speed: Int = 0
}

class Motorcycle : Vehicle() {
    override val wheels: Int = 2
    override var speed: Int = 0    // val을 var로 override
}
```

- **primary constructor에서 override**할 수 있습니다.

```kotlin
open class Animal(open val name: String)

class Dog(override val name: String) : Animal(name)
```


### super Keyword

- **`super`로 superclass의 member에 접근**합니다.

```kotlin
open class Parent {
    open fun greet() = println("Hello from Parent")
}

class Child : Parent() {
    override fun greet() {
        super.greet()    // superclass method 호출
        println("Hello from Child")
    }
}
```


---


## Abstract Class

- **`abstract` class**는 직접 instance를 생성할 수 없습니다.
    - abstract member는 구현이 없으며, subclass에서 반드시 구현해야 합니다.
    - abstract class는 암묵적으로 `open`입니다.
    - abstract member도 암묵적으로 `open`입니다.

```kotlin
abstract class Shape {
    abstract val area: Double    // abstract property
    abstract fun draw()          // abstract method

    fun describe() {             // 일반 method (구현 있음)
        println("Area: $area")
    }
}

class Circle(val radius: Double) : Shape() {
    override val area: Double
        get() = Math.PI * radius * radius

    override fun draw() = println("Drawing circle with radius $radius")
}

// val shape = Shape()    // compile error : abstract class는 instance 생성 불가
val circle = Circle(5.0)
circle.draw()
circle.describe()
```


### Abstract Class vs Open Class

- **abstract class**는 불완전한 구현을 가진 class입니다.
    - 반드시 상속해서 사용해야 합니다.
    - abstract member는 subclass에서 구현을 강제합니다.

| 특성 | abstract class | open class |
| --- | --- | --- |
| instance 생성 | 불가 | 가능 |
| abstract member | 가질 수 있음 | 가질 수 없음 |
| 상속 | 암묵적으로 open | open 명시 필요 |
| 용도 | 공통 기반 제공 | 확장 가능한 구현 |


---


## Interface

- **interface**는 구현 없이 행위(behavior)를 정의합니다.
    - class는 여러 interface를 구현할 수 있으며, 이를 다중 구현이라고 합니다.
    - interface의 member는 암묵적으로 `open`입니다.
    - `abstract` keyword 없이 abstract member를 가집니다.

```kotlin
interface Drawable {
    fun draw()
}

interface Clickable {
    fun onClick()
}

class Button : Drawable, Clickable {
    override fun draw() = println("Drawing button")
    override fun onClick() = println("Button clicked")
}
```


### Default Implementation

- **interface에 기본 구현**을 제공할 수 있습니다.
    - 구현하는 class에서 override하지 않으면 기본 구현이 사용됩니다.

```kotlin
interface Drawable {
    fun draw()    // abstract
    fun describe() = println("This is drawable")    // default implementation
}

class Circle : Drawable {
    override fun draw() = println("Drawing circle")
    // describe()는 override하지 않으면 기본 구현 사용
}

val circle = Circle()
circle.draw()        // Drawing circle
circle.describe()    // This is drawable
```


### Interface Property

- **interface에 property**를 선언할 수 있습니다.
    - interface의 property는 backing field를 가질 수 없습니다.
    - abstract property이거나, getter를 통해 값을 제공해야 합니다.

```kotlin
interface Named {
    val name: String    // abstract property
}

interface Identified {
    val id: String
        get() = "ID-${hashCode()}"    // default getter
}

class User(override val name: String) : Named, Identified
// id는 default getter 사용

val user = User("Kim")
println(user.name)    // Kim
println(user.id)      // ID-12345678 (hashCode에 따라 다름)
```


### 다중 Interface 구현

- **여러 interface를 구현**할 수 있습니다.
    - 같은 이름의 method가 있으면 충돌이 발생합니다.
    - 충돌 시 반드시 override하여 구현을 명시해야 합니다.

```kotlin
interface A {
    fun greet() = println("Hello from A")
}

interface B {
    fun greet() = println("Hello from B")
}

class C : A, B {
    // greet()가 A, B 모두에 있으므로 반드시 override
    override fun greet() {
        super<A>.greet()    // A의 구현 호출
        super<B>.greet()    // B의 구현 호출
        println("Hello from C")
    }
}
```


### Interface vs Abstract Class

- **interface와 abstract class**는 다른 용도로 사용합니다.

| 특성 | interface | abstract class |
| --- | --- | --- |
| 다중 상속/구현 | 가능 | 불가 |
| 상태 (field) | 불가 | 가능 |
| constructor | 없음 | 있음 |
| 접근 제어자 | public만 | 모두 가능 |
| 용도 | 행위(behavior) 정의 | 공통 구현과 상태 공유 |

```kotlin
// interface : 행위만 정의
interface Flyable {
    fun fly()
}

// abstract class : 상태와 구현 공유
abstract class Bird(val name: String) {
    abstract fun sing()
    fun eat() = println("$name is eating")
}

class Sparrow(name: String) : Bird(name), Flyable {
    override fun sing() = println("Chirp!")
    override fun fly() = println("$name is flying")
}
```


---


## 상속 vs 합성

- **합성(composition)은 상속보다 유연한 설계**를 제공합니다.
    - 상속은 "is-a" 관계를 표현합니다.
        - 예 : Dog is an Animal.
    - 합성은 "has-a" 관계를 표현합니다.
        - 예 : Car has an Engine.
    - 상속은 compile time에 관계가 고정되지만, 합성은 runtime에 변경 가능합니다.

```kotlin
// 상속 : 강한 결합
open class Engine {
    fun start() = println("Engine started")
}

class Car : Engine()    // Car is an Engine? (어색함)

// 합성 : 유연한 결합
class Engine2 {
    fun start() = println("Engine started")
}

class Car2(private val engine: Engine2) {    // Car has an Engine (자연스러움)
    fun start() = engine.start()
}
```


### Delegation Pattern

- **Kotlin의 `by` keyword**로 위임을 쉽게 구현합니다.
    - interface 구현을 다른 객체에 위임합니다.
    - boilerplate 없이 합성을 활용할 수 있습니다.

```kotlin
interface Printer {
    fun print(message: String)
}

class ConsolePrinter : Printer {
    override fun print(message: String) = println(message)
}

// by keyword로 Printer 구현을 printer에 위임
class Document(private val printer: Printer) : Printer by printer {
    fun printTitle(title: String) {
        print("=== $title ===")    // printer.print() 호출
    }
}

val doc = Document(ConsolePrinter())
doc.print("Hello")           // ConsolePrinter로 위임됨
doc.printTitle("Document")   // === Document ===
```


---


## Visibility와 상속

- **visibility modifier**는 상속 시 member 접근을 제어합니다.

| modifier | subclass에서 접근 | override 가능 여부 |
| --- | --- | --- |
| public | 가능 | 가능 (open 시) |
| protected | 가능 | 가능 (open 시) |
| internal | 같은 module이면 가능 | 가능 (open 시) |
| private | 불가 | 불가 |

```kotlin
open class Parent {
    private val privateVal = 1        // subclass에서 접근 불가
    protected open val protectedVal = 2    // subclass에서만 접근 가능
    internal open val internalVal = 3      // 같은 module에서 접근 가능
    open val publicVal = 4                 // 어디서나 접근 가능
}

class Child : Parent() {
    // override val privateVal = 10    // 불가 : private은 override 불가
    override val protectedVal = 20
    override val internalVal = 30
    override val publicVal = 40

    fun accessParent() {
        // println(privateVal)    // compile error
        println(protectedVal)     // 가능
        println(internalVal)      // 가능
        println(publicVal)        // 가능
    }
}
```

- **override 시 visibility를 확장**할 수 있습니다.
    - `protected`를 `public`으로 확장 가능합니다.
    - visibility를 축소할 수는 없습니다.

```kotlin
open class Parent {
    protected open fun protectedMethod() {}
}

class Child : Parent() {
    public override fun protectedMethod() {}    // protected → public (가능)
}
```


---


## Java와의 비교

- **Kotlin 상속**은 Java보다 더 명시적이고 안전합니다.

| 특성 | Kotlin | Java |
| --- | --- | --- |
| class 기본 상속 가능 여부 | final (상속 불가) | open (상속 가능) |
| 상속 허용 keyword | open | 없음 (기본값) |
| 상속 금지 keyword | 없음 (기본값) | final |
| method override | override 필수 | @Override 선택 |
| interface default method | 지원 | Java 8+ 지원 |

```java
// Java : 기본적으로 상속 가능
public class Parent {
    public void greet() {
        System.out.println("Hello");
    }
}

public class Child extends Parent {
    @Override    // 선택사항
    public void greet() {
        System.out.println("Hi");
    }
}
```

```kotlin
// Kotlin : 명시적으로 open 필요
open class Parent {
    open fun greet() = println("Hello")
}

class Child : Parent() {
    override fun greet() = println("Hi")    // override 필수
}
```


---


## Reference

- <https://kotlinlang.org/docs/inheritance.html>
- <https://kotlinlang.org/docs/interfaces.html>
- <https://kotlinlang.org/docs/delegation.html>

