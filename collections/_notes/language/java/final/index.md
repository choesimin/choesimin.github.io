---
layout: note
permalink: /318
title: Java final keyword - 불변성 나타내기
description: Java에서 final keyword를 사용하여 불변성을 표현할 수 있습니다.
date: 2025-04-24
---


## Java의 final keyword

- final keyword는 Java programming에서 **변경 불가능성(immutability)을 표현**하는 중요한 개념입니다.
    - 다양한 context에서 변경 불가능성을 보장하며, code의 안정성, 가독성, 그리고 일부 경우에는 성능까지 향상시킬 수 있습니다.
    - final keywrod는 변수, method, class 등 다양한 요소에 적용 가능합니다.

- final keyword는 compiler에게 **최적화 hint를 제공**하여, application의 성능을 향상시킵니다.
    - 특히 상수(static final)의 경우 compile 시점에 값이 결정되어 inlining될 수 있습니다.
        - inlining : method 호출을 제거하고 method 본문을 호출 위치에 삽입하는 최적화 기법.
    - 일반 final 변수도 일부 상황에서 compiler 최적화의 대상이 됩니다.
    - 그러나 final keyword는 application 전반의 성능 향상에 직접적인 영향을 미치지는 않으므로, 성능 향상의 목적보다는 주로 code의 가독성과 안정성을 높이는 데 사용하는 것이 좋습니다.


### final class

- final로 선언된 class는 상속(`extends`)이 불가능합니다.
- 다른 class가 확장할 수 없어 class 계층 구조의 마지막 단계가 됩니다.

```java
final class FinalClass {
    // 이 class는 다른 class가 상속할 수 없음
}
```

- 대표적인 예로 Java standard library의 `String`, `Integer` 등의 class가 있습니다.


### final method

- **final로 선언된 method**는 **하위 class에서 재정의(`@Override`)가 불가능**합니다.
- 부모 class의 동작을 자식 class에서 변경할 수 없도록 보장합니다.

```java
class Parent {
    final void cannotOverride() {
        // 이 method는 하위 class에서 재정의할 수 없음
    }
}
```


### final field

- **final로 선언된 field**는 **초기화 후 값을 변경할 수 없습니다.**
- field 선언 시, 초기화 block에서, 또는 모든 생성자에서 반드시 한 번만 값을 할당해야 합니다.
- 참조형(reference type) field의 경우, 참조 자체는 변경할 수 없지만 참조된 객체의 내부 상태는 변경 가능합니다.

```java
class Student {
    final int id;    // 선언
    final String name;
    
    // 생성자에서 초기화
    public Student(int id, String name) {
        this.id = id;
        this.name = name;
    }
    
    // id와 name은 이후 변경 불가
}
```

- final field를 사용한 불변 객체는 **thread 안전성(thread safety)을 보장**합니다.
    - 여러 thread가 동시에 객체에 접근해도 **상태가 변경되지 않기 때문에 동기화가 필요 없습니다.**
    - 이로 인해 멀티 thread 환경에서 성능과 안정성이 향상됩니다.


### final method parameter

- **method의 parameter에 final을 적용**하면 **method 내에서 해당 parameter 값을 변경할 수 없습니다.**
- 이는 method 내에서 parameter 값의 의도치 않은 변경을 방지합니다.

```java
void process(final int value) {
    // value = 10;    // compile error 발생
}
```


### final local variable

- **method 내에서 선언된 지역 변수에 final을 적용**하면 **초기화 후 값을 변경할 수 없습니다.**
- 초기화는 선언 시 또는 이후 단 한 번만 가능합니다.

```java
void someMethod() {
    final int constant = 100;
    // constant = 200;    // compile error 발생
    
    final String result;
    if (condition) {
        result = "success";    // 조건부 초기화 가능
    } else {
        result = "failure";
    }
    // result = "changed";    // compile error 발생
}
```


---


## final로 불변 객체 만들기

- **final field**를 사용하여 **불변 객체(immutable object)를 만들 수 있습니다.**
    - 불변 객체는 생성 후 내부 상태가 변경되지 않는 객체입니다.

```java
final class ImmutablePerson {
    private final String name;
    private final int age;
    
    public ImmutablePerson(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    // setter가 없어 상태 변경 불가
}
```

- field가 final로 선언되어 있어, **객체 생성 후 `setter`나 다른 method를 통해서도 값을 변경할 수 없습니다.**


### record class로 불변 객체 더 쉽게 만들기

- Java 14부터 도입된 `record` class는 불변 객체를 쉽게 생성할 수 있는 방법입니다.
- `record` class는 자동으로 `final` field를 생성하며, getter method와 `toString()`, `equals()`, `hashCode()` method를 자동으로 구현합니다.
    - final field로 직접 만드는 불변 객체와 마찬가지로, 객체 생성 후에는 field 값을 변경할 수 없습니다.

```java
public record Person(String name, int age) {
    // 추가적인 method나 constructor를 정의할 수 있음
}

// 사용 예시
Person person = new Person("Alice", 30);
System.out.println(person.name());    // "Alice"
System.out.println(person.age());    // 30
System.out.println(person);    // Person[name=Alice, age=30]
```


---


## static final로 상수 정의하기

- **static final 조합**으로 선언된 field는 **Java에서 상수(constant)를 정의하는 표준 방식**입니다.
- static finel로 선언한 상수는 **compile 시 값이 결정**되어 최적화가 가능합니다.

```java
class Constants {
    public static final int MAX_USERS = 100;
    public static final String APP_NAME = "MyApp";
}
```

- 상수는 대문자와 underscore(`_`)로 구분하여 작성하는 것이 일반적입니다.


---


## 조건부 초기화

- **final 변수는 반드시 초기화되어야 하지만, 즉시 초기화할 필요는 없습니다.**

- 조건문을 통해 다른 값으로 초기화할 수 있으나, 모든 경로에서 정확히 한 번만 초기화되어야 합니다.
    - 한 번 초기화된 이후에는 재할당이 불가능합니다.

```java
final int value;
if (condition == 200) {
    value = 1;
} else {
    value = 2;
}

// value = 3;    // compile error 발생
```


### 만약 초기화를 하지 않으면?

- **final field가 초기화되지 않으면 compile error가 발생**합니다.
    - 선언 시점, 초기화 block, 또는 모든 생성자에서 반드시 초기화해야 합니다.

```java
class Example {
    final int value;    // 선언만 하고 초기화하지 않음
    
    // 생성자에서도 초기화하지 않음
    public Example() {
        // 초기화 누락
    }
}
// compile error : variable value might not have been initialized
```

- final local variable도 사용하기 전에 반드시 초기화해야 합니다.

```java
void method() {
    final int value;    // 선언만 함
    
    System.out.println(value);    // compile error : variable value might not have been initialized
}
```

- 모든 조건 분기에서 초기화가 보장되지 않으면 compiler가 오류를 발생시킵니다.

```java
void conditionalInit(boolean condition) {
    final int value;
    
    if (condition) {
        value = 10;
    }
    // else 분기에서 초기화하지 않음
    
    System.out.println(value);    // compile error : variable value might not have been initialized
}
```
