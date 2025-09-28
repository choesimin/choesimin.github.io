---
layout: note
permalink: /304
title: Java Record Class - 불변하는 정보를 저장하는 특별한 객체 만들기
description: Java record는 Java 16에서 정식 도입된 불변 data 객체로, 적은 code로 DTO나 VO를 효율적으로 표현할 수 있는 특별한 형태의 class입니다.
date: 2025-03-20
---


## Java의 Record : Immutable Data Object

- Java record는 Java 14에서 preview로 도입되고, Java 16에서 정식 기능으로 채택된 **특별한 형태의 class**입니다.

```java
public record RecordName(String field1, int field2, ...) {
    // field, constructor, method
}
```

- record는 **data를 보관하는 목적의 class를 간결하게 정의**할 수 있도록 설계되었습니다.
    - immutable data 객체를 생성하는 데 최적화된 선언적 방식을 제공합니다.
    - **DTO**(Data Transfer Object), **VO**(Value Object), 또는 불변 data의 container로 사용하기 적합합니다.

- record는 **field 값으로만 식별**되므로, **동일한 값을 가진 두 record는 동일한 객체로 취급**됩니다.
    - 불변 객체이므로, 동일한 값을 가진 객체는 동일한 참조 값을 가질 수 있습니다.
    - 값 기반 identity를 가지기 때문에, 객체의 동등성(equality) 비교가 간단해집니다.

| 기능 | Record | 일반 Class |
| --- | --- | --- |
| **불변성** | 기본적으로 불변 | 가변 또는 불변 모두 가능 |
| **Getter** | 자동 생성 (field 이름과 동일) | 수동 구현 필요 |
| **생성자** | Canonical Constructor 자동 생성 | 수동 구현 필요 |
| **equals/hashCode** | 자동 생성 | 수동 구현 필요 |
| **toString** | 자동 생성 | 수동 구현 필요 |
| **상속** | 불가능 | 가능 |
| **Mutable field** | 불가능 | 가능 |

- record는 **주로 불변 data를 표현하고 교환하는 상황에서 사용**하면 좋습니다.
    - API response data modeling에 적합합니다.
    - database query result를 담는 객체로 활용할 수 있습니다.
    - 복잡한 계산의 중간 결과를 저장하는 용도로 사용할 수 있습니다.
    - event-driven system의 message 객체로 활용할 수 있습니다.
    - configuration data를 담는 객체로 사용할 수 있습니다.

- 불변 객체를 생성하는 데 최적화되어 있기 때문에, **값이 변해야 하거나 기능 위주의 객체를 만들 때는 적합하지 않습니다.**
    - mutable 객체가 필요한 경우에는 적합하지 않습니다.
    - 상속을 통한 기능 확장이 불가능합니다.
    - 객체의 lifecycle 동안 field 값이 변경되어야 하는 경우에는 적합하지 않습니다.
    - lazy loading과 같은 최적화 기법을 적용하기 어렵습니다.


### Record 객체의 특징

- 기본적으로 **불변(immutable)** 객체를 생성합니다.
    - 모든 field는 자동으로 `final`로 선언됩니다.
    - 객체 생성 후에는 field 값을 변경할 수 없습니다.

- **`equals()`, `hashCode()`, `toString()` method가 자동으로 생성**됩니다.
    - 자동으로 생성된 method들은 record의 모든 component를 고려하여 생성됩니다.

- **각 field에 대한 getter method가 자동으로 생성**됩니다.
    - 일반적인 JavaBean 방식의 `getXxx()` 형태가 아닌 **field 이름과 동일한 method**가 생성됩니다.

- **모든 field를 초기화하는 canonical constructor가 자동으로 생성**됩니다.
    - canonical constructor : 모든 field를 parameter로 받는 생성자.
    - 모든 field에 값을 지정하기 위한 생성자를 따로 선언하지 않아도 됩니다.

- **상속이 불가능**합니다.
    - record는 **암시적으로 `final` class로 선언**됩니다.
    - 다른 class를 상속받을 수 없으며, 다른 class가 record를 상속받을 수도 없습니다.

- **interface 구현은 가능**합니다.
    - interface를 구현하는 record class는 interface의 method를 구현해야 합니다.


---


## Record Class의 기본 문법

- `record` keyword를 사용하여 record class를 선언합니다.

```java
public record Person(String name, int age) {
    // 추가 field, method, constructor 등을 선언할 수 있습니다.
}
```


### 기본 사용법

```java
// record 정의
public record Person(String name, int age) {}

// 사용 예시
Person person = new Person("Kim", 30);
String name = person.name();    // "Kim" - getter method 호출
int age = person.age();    // 30 - getter method 호출
System.out.println(person);    // Person[name=Kim, age=30] - toString() 자동 구현
```


### Custom Constructor 추가

```java
public record Person(String name, int age) {
    // Compact constructor - Parameter 목록 없이 정의
    public Person {
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
    }
    
    // 추가 constructor
    public Person(String name) {
        this(name, 0);  // canonical constructor 호출
    }
}
```


### Static Member 추가

```java
public record Person(String name, int age) {
    // Static field
    public static final String UNKNOWN = "Unknown";
    
    // Static method
    public static Person createAnonymous() {
        return new Person(UNKNOWN, 0);
    }
}
```


### Method 추가

```java
public record Person(String name, int age) {
    // Instance method
    public boolean isAdult() {
        return age >= 18;
    }
    
    // toString() 재정의
    @Override
    public String toString() {
        return name + " (" + age + " years old)";
    }
}
```


---


## Record가 불변하기 때문에 얻는 많은 이점들

- 일반적으로 더 많은 data가 불변성을 가질수록, 더 좋은 code를 작성할 수 있습니다.
    - 생성된 후 상태가 변경되지 않으므로 예측 가능한 동작을 보장합니다.
    - side effect를 방지하여 code의 안정성을 높입니다.
    - 방어 logic을 위한 복사본을 만들 필요가 없어 code가 간결해집니다.

- record는 불변 객체이기 때문에, 성능상 여러 이점을 가집니다.
    - thread 안전성을 보장하여 동시성 문제를 방지합니다.
    - memory 효율성을 높여 JVM 최적화 기회를 늘립니다.
    - GC 성능을 향상시켜 memory 사용량을 줄입니다.

- 실제로, record를 사용하여 이점을 얻을 수 있는 다양한 상황이 있습니다.
    - big data processing application에서 record를 사용하여, memory 사용량과 GC pressure를 줄일 수 있습니다.
    - 분산 system의 message 객체로 record를 사용하여, thread 안전성을 보장하면서 성능을 향상시킬 수 있습니다.
    - micro-service architecture에서 service 간 data 전송 객체(DTO)로 record를 사용하여, serialization/deserialization 과정이 단순화할 수 있습니다.
    - 불변성을 중요히 여기는 functional programming pattern과 잘 어울려, side effect 없는 code 작성에 도움이 됩니다.


### Thread 안전성

- record는 불변 객체이므로 여러 thread에서 동시에 접근해도 안전합니다.
    - thread 간 동기화가 필요 없어 lock overhead가 발생하지 않습니다.
    - race condition이나 deadlock과 같은 동시성 문제를 방지할 수 있습니다.
    - 분산 system이나 동시성 높은 application에서 data 무결성을 보장합니다.


### 메모리 효율성

- record를 사용하는 경우, boilerplate code가 적어져 class file 크기가 작아집니다.
    - boilerplate code는 반복적으로 작성되는 code를 의미합니다.
    - 일반 class의 경우 getter, setter, equals, hashCode, toString 등 많은 method가 포함됩니다.
    - record는 이런 code를 compiler가 자동 생성하므로 byte code 크기가 줄어듭니다.

- JVM의 최적화 기회가 많아집니다.
    - 불변 객체는 JVM이 더 효율적으로 관리할 수 있습니다.
    - 동일한 값을 가진 record instance는 내부적으로 동일 참조로 최적화될 가능성이 있습니다.
        - JVM은 동일한 값을 가진 record instance를 caching하여 재사용할 수 있습니다.


### JVM 최적화와 Constant Pool

- 불변 객체는 JVM의 string constant pool과 유사한 방식으로 caching될 수 있습니다.
    - 동일한 값을 가진 record instance는 재사용될 가능성이 높아집니다.
    - JIT compiler가 더 효과적으로 최적화할 수 있게 됩니다.

- 단, JVM이 모든 record 객체를 constant pool에 저장하는 것은 아닙니다.
    - 특정 조건에서만 최적화가 이루어지며, 이는 JVM 구현체에 따라 다를 수 있습니다.
    - String.intern()과 같은 명시적 caching mechanism은 record에 기본 제공되지 않습니다.


### GC(Garbage Collection) 성능

- record 객체는 불변이므로 GC 관점에서 여러 이점이 있습니다.
    - 불변 객체는 수명이 짧은 경우가 많아 young generation에서 빠르게 수집됩니다.
    - 또한, 참조가 변경되지 않아 GC의 mark-and-sweep 단계가 효율적으로 수행됩니다.
    - 참조 graph 변경이 적어 GC pause time도 줄일 수 있습니다.

- 많은 양의 record 객체를 생성하더라도 GC overhead가 일반 객체보다 적습니다.
    - 불변 객체는 generational hypothesis에 잘 맞아 GC 효율이 높아집니다.
    - 값 기반 identity로 인해 참조 추적이 단순화됩니다.
