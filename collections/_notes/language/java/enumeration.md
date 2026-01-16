---
layout: note
permalink: /432
title: Java Enum
description: Java Enum은 고정된 상수 집합을 type-safe하게 표현하며, compile time에 값이 결정되고 singleton으로 관리되어 switch문과 함께 사용할 수 있습니다.
date: 2025-06-01
---


## Enum

- `enum`(enumeration type)은 **고정된 상수들의 집합**을 표현하는 Java의 특수한 type입니다.
    - 요일, 계절처럼 한정된 값만을 가지는 data를 정의합니다.
    - `class` 대신 `enum` keyword를 사용하여 선언합니다.
    - compile time에 type 안전성을 보장하고 IDE의 지원을 받습니다.


---


## Enum 이전의 상수 정의 방식

- `enum` 등장 이전에는 **상수를 정의하는 여러 방식**이 있었으나 각각 문제점이 있었습니다.
    - interface나 class에 `static final` field로 상수를 정의했습니다.
    - type 안전성 부재와 switch문 호환성 문제가 있었습니다.


### Interface 상수의 문제점

- interface에 상수를 정의하면 **다른 집합의 상수와 비교가 가능**해지는 문제가 발생합니다.

```java
interface UNIVERSITY {
    int SEOUL = 1;
    int YONSEI = 2;
}

interface MAJOR {
    int KOREAN = 1;
    int MATH = 2;
}

// compile error 없이 비교 가능 - 논리적 오류
if (UNIVERSITY.SEOUL == MAJOR.KOREAN) {
    System.out.println("같은 값");  // 실행됨
}
```

- 두 상수가 모두 `int` type이므로 compile 단계에서 오류를 감지할 수 없습니다.
- runtime에 예기치 못한 동작이 발생할 수 있습니다.


### Class 상수의 문제점

- class로 상수를 정의하면 **type 비교는 가능하지만 switch문을 사용할 수 없습니다.**

```java
class MAJOR {
    public static final MAJOR KOREAN = new MAJOR();
    public static final MAJOR MATH = new MAJOR();
}

MAJOR major = MAJOR.MATH;

// compile error : switch문에서 사용 불가
switch (major) {
    case MAJOR.KOREAN:  // incompatible types
        break;
}
```

- 상수 집합 간의 type 비교는 가능해졌으나 switch문 호환성 문제가 남았습니다.
- 이러한 문제들을 해결하기 위해 `enum`이 도입되었습니다.


---


## Enum의 특징

- `enum`은 **상수 집합을 안전하게 관리**하기 위한 여러 특징을 가집니다.
    - compile time에 모든 값이 결정됩니다.
    - singleton pattern으로 instance가 관리됩니다.
    - type 안전성과 switch문 호환성을 모두 제공합니다.


### Compile Time 값 결정

- `enum`은 **compile time에 모든 값이 확정**되어야 합니다.
    - runtime에 동적으로 새로운 상수를 추가할 수 없습니다.
    - 다른 package나 class에서 enum type에 접근해도 값을 변경할 수 없습니다.


### Singleton Instance

- 각 enum 상수는 **singleton으로 관리**됩니다.
    - class가 load될 때 상수 instance가 생성됩니다.
    - 동일한 상수는 항상 같은 instance를 반환합니다.

```java
Week today = Week.MONDAY;
Week tomorrow = Week.MONDAY;

System.out.println(today == tomorrow);  // true (같은 instance)
```


### Type 안전성

- `enum`은 **compile time에 type 검사**를 수행합니다.
    - 서로 다른 enum type 간의 비교는 compile error를 발생시킵니다.
    - private 생성자로 외부에서 instance 생성을 방지합니다.
    - `java.lang.Enum`을 상속받아 다른 class를 상속받을 수 없습니다.


---


## Enum 선언

- enum 상수는 **대문자로 선언**하고 단어 사이는 underscore(`_`)로 구분합니다.

```java
public enum Week {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}
```


### 특정 Class 내부 선언

- 특정 class에서만 사용하는 enum은 **class 내부에 선언**합니다.

```java
public class Shoes {
    public String name;
    public int size;

    public enum Type {
        WALKING, RUNNING, TRACKING, HIKING
    }
}
```


---


## Enum과 Memory

- enum 상수는 **`public static final` field로 관리**되어 JVM method 영역에 상주합니다.
    - class loader가 load 시점에 method 영역에 상수를 할당합니다.
    - program 종료 전까지 언제든지 접근 가능합니다.


### Memory 할당 과정

- enum 상수는 **class load 시점**에 모든 상수 객체가 heap 영역에 생성됩니다.

```java
Week today = Week.MONDAY;
```

- `Week` enum이 class loader에 의해 처음 load될 때 모든 상수(`MONDAY`~`SUNDAY`)가 heap 영역에 객체로 생성됩니다.
- method 영역의 static final field는 heap 영역의 객체를 참조합니다.
- `today` 변수는 stack 영역에서 method 영역의 `MONDAY` 주소를 복사하여 가집니다.


---


## Enum 활용

- `enum`은 **단순 상수 외에도 다양한 기능**을 제공합니다.
    - `java.lang.Enum` class를 상속받아 기본 method를 사용합니다.
    - 생성자, field, method를 추가하여 확장할 수 있습니다.


### 기본 Method

- `enum`은 `java.lang.Enum`에서 **상속받은 method**를 사용합니다.

| method | 설명 |
| --- | --- |
| `name()` | 상수 이름을 문자열로 반환 |
| `ordinal()` | 상수의 순서(0부터 시작)를 반환 |
| `compareTo()` | 순서를 기준으로 비교 |
| `valueOf(String)` | 문자열에 해당하는 상수 반환 |
| `values()` | 모든 상수를 배열로 반환 |


### 생성자와 Field 추가

- enum 상수에 **추가 속성을 부여**할 수 있습니다.
    - 생성자는 반드시 `private`으로 선언합니다.
        - compile time에 모든 값이 결정되어야 하기 때문입니다.

```java
public enum Color {
    RED("빨강", 100),
    GREEN("초록", 10),
    BLUE("파랑", 30);

    private final String koreanName;
    private final int price;

    private Color(String koreanName, int price) {
        this.koreanName = koreanName;
        this.price = price;
    }

    public String getKoreanName() {
        return koreanName;
    }

    public int getPrice() {
        return price;
    }
}

Color.BLUE.getKoreanName();  // "파랑"
Color.BLUE.getPrice();       // 30
```


### Abstract Method 재정의

- `abstract` method를 정의하면 **각 상수별로 다른 동작**을 구현할 수 있습니다.

```java
public enum Operation {
    PLUS {
        @Override
        public int apply(int a, int b) {
            return a + b;
        }
    },
    MINUS {
        @Override
        public int apply(int a, int b) {
            return a - b;
        }
    },
    MULTIPLY {
        @Override
        public int apply(int a, int b) {
            return a * b;
        }
    };

    public abstract int apply(int a, int b);
}

Operation.PLUS.apply(5, 3);      // 8
Operation.MULTIPLY.apply(5, 3);  // 15
```


### 중첩 Enum

- enum 상수끼리 **공유하는 logic**이 있다면 중첩 enum으로 분리합니다.

```java
public enum PaymentType {
    CREDIT_CARD(TaxRate.STANDARD),
    DEBIT_CARD(TaxRate.STANDARD),
    CASH(TaxRate.REDUCED);

    private final TaxRate taxRate;

    private PaymentType(TaxRate taxRate) {
        this.taxRate = taxRate;
    }

    public int calculateTax(int amount) {
        return taxRate.calculate(amount);
    }

    private enum TaxRate {
        STANDARD {
            @Override
            public int calculate(int amount) {
                return amount * 10 / 100;
            }
        },
        REDUCED {
            @Override
            public int calculate(int amount) {
                return amount * 5 / 100;
            }
        };

        public abstract int calculate(int amount);
    }
}
```


### 상태를 가지는 Enum (Anti-pattern)

- enum은 기술적으로는 **변경 가능한 상태(mutable state)**를 가질 수 있지만, 이는 **anti-pattern**입니다.
    - enum 상수는 singleton이므로 여러 thread에서 공유됩니다.
    - 상수 내부의 field가 변경 가능하면 동시성 문제와 예측 불가능한 동작이 발생할 수 있습니다.

```java
public enum Counter {
    INSTANCE;

    private int count = 0;  // 여러 thread에서 공유됨

    public void increment() {
        count++;  // thread-safe하지 않음 - 권장되지 않음
    }
}
```

- enum의 field는 **반드시 `final`로 선언**하여 불변성을 유지해야 합니다.
    - enum의 본래 목적은 불변 상수를 정의하는 것입니다.
    - 변경 가능한 상태가 필요하면 enum이 아닌 일반 class를 사용하는 것이 적절합니다.


---


## Reference

- <https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html>
- <https://docs.oracle.com/javase/8/docs/api/java/lang/Enum.html>

