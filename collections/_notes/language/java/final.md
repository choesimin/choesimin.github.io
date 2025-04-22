---
layout: note
permalink: /
title: Java의 final keyword
description: 
date: 2025-04-22
published: false
---





# Java의 final keyword

- final keyword는 Java에서 다양한 context에서 사용할 수 있고, 각 상황에 따라 다른 역할을 수행합니다.
- final keyword는 변수, method, class에 적용 가능하며 변경 불가능성을 표현하는 데 사용됩니다.

## final의 기본 역할

- final class는 상속(extends)이 불가능합니다.
- final method는 하위 class에서 재정의(@Override)가 불가능합니다.
- final 변수는 초기화 이후 값 변경이 불가능합니다.
    - final field는 객체 생성 시 초기화된 후 재할당이 불가능합니다.
    - final method parameter는 method 내에서 재할당이 불가능합니다.
    - final local variable은 한 번 선언된 이후 재할당이 불가능합니다.


## final의 적절한 사용 상황

### final class와 method

- 상속이나 재정의를 통한 확장을 방지해야 할 명확한 이유가 있을 때 적절합니다.
    - 보안상 중요한 method의 동작을 보호해야 할 경우
    - 설계 상 명확히 상속을 금지해야 하는 class의 경우
    - 불변성(immutability)을 보장해야 하는 경우

### final field

- 불변 객체(immutable object)를 설계할 때 적절합니다.
- OpenJDK style guide에 따르면 "변경 가능한 field가 필요한 강력한 이유가 없는 한 모든 field는 final로 선언되어야 합니다."
- thread 안전성(thread safety)을 보장하기 위해 필요합니다.
    - 멀티 thread 환경에서 객체의 상태가 불변이면 동기화가 필요 없어집니다.
- 객체 생성 시 초기화를 강제하여 null 상태를 방지할 수 있습니다.

### final local variable

- 값이 변경되지 않는 상수를 나타낼 때 적절합니다.
- lambda 표현식이나 익명 class에서 외부 변수를 참조할 때 필요합니다.
- 변수의 값이 변경되지 않음을 명확히 표현하고자 할 때 사용합니다.
- 조건부 초기화가 필요한 경우 유용합니다.
    ```java
    final String result;
    if (condition == 200) {
        result = "success";
    } else {
        result = "fail";
    }
    ```

## final의 남용 상황

### final method parameter

- 대부분의 style guide에서는 method parameter에 final 사용을 권장하지 않습니다.
- OpenJDK style guide에 따르면 "가독성을 향상하거나 실제 설계 결정을 문서화하는 경우를 제외하고 method parameter는 final로 선언해서는 안 됩니다."
- parameter에 final을 과도하게 사용하면:
    - 코드 가독성이 저하됩니다.
    - 불필요한 코드 복잡성이 증가합니다.
    - parameter를 재할당할 경우 유연성이 저하됩니다.
    - 대부분의 개발자들은 parameter를 재할당하지 않는 것이 관행이므로 명시적 final은 불필요합니다.

### 모든 local variable에 final 사용

- 모든 local variable에 final을 적용하는 것은 과도한 사용으로 간주됩니다.
- 문서화나 설계 결정을 표현하는 경우를 제외하고는 불필요합니다.
- 코드의 복잡성만 증가시키고 가독성을 떨어뜨릴 수 있습니다.
- 참조 변수(reference type)의 경우 final은 참조만 변경할 수 없게 할 뿐, 객체의 내부 상태는 여전히 변경 가능합니다.

## effectively final

- Java 8부터 도입된 개념으로, 명시적으로 final로 선언되지 않았지만 초기화 이후 값이 변경되지 않는 변수를 의미합니다.
- lambda 표현식이나 익명 class에서 외부 변수 사용 시 effectively final 변수만 접근 가능합니다.
- 명시적 final과 달리 컴파일러의 정적 코드 최적화 대상이 되지 않습니다.

## final과 성능

- final keyword는 일부 상황에서 컴파일러 최적화를 가능하게 합니다.
    - final field와 local variable은 컴파일러의 정적 최적화를 도울 수 있습니다.
    - 특히 final static 변수(상수)는 컴파일 시점에 값이 결정되어 코드 최적화가 가능합니다.
- 그러나 성능 개선 효과는 대부분의 실제 애플리케이션에서 미미합니다.
- final class와 method는 성능 향상에 직접적인 영향을 주지 않습니다.

## 합리적인 final 사용 기준

- 불변성이 필요한 field에는 final을 적극 사용합니다.
- class와 method에는 상속/재정의 방지가 설계상 필요한 경우에만 final을 사용합니다.
- local variable에는 의도를 명확히 표현하거나 lambda에서 사용할 경우에만 final을 사용합니다.
- method parameter에는 특별한 이유가 없다면 final을 사용하지 않습니다.
- "의미 있는 사용(Meaningful Use)"을 원칙으로 삼아 과도한 사용이나 부족한 사용 모두 피합니다.