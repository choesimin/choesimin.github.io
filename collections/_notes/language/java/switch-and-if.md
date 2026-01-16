---
layout: note
permalink: /441
title: Java Switch와 If 비교
description: Java에서 switch문과 if-else문은 내부 동작 방식이 다르며, 상황에 따라 적절한 조건문을 선택해야 합니다.
date: 2025-06-03
---


## Switch와 If-Else 비교

- Java에서 조건 분기를 처리하는 **`switch`문과 `if-else`문**은 내부 동작 방식이 다릅니다.
    - `switch`문은 **jump statement** 기반으로, 입력값에 따라 특정 위치로 바로 이동합니다.
    - `if-else`문은 **branch statement** 기반으로, 각 조건을 순차적으로 확인합니다.
    - 조건 수가 많을수록 `switch`문이 성능상 유리합니다.

| 구분 | switch | if-else |
| --- | --- | --- |
| 동작 방식 | jump table 사용 | 순차적 조건 확인 |
| 시간 복잡도 | `O(1)` 또는 `O(log N)` | `O(N)` |
| 조건 유형 | 값 일치 비교 | 모든 boolean 표현식 |
| 조건이 많을 때 | 유리 | 불리 |


### 선택 기준

- 상황에 따라 **적절한 조건문**을 선택해야 합니다.

- **`switch`문이 적합한 경우**는 하나의 값으로 여러 경로를 분기할 때입니다.
    - 하나의 변수에 대해 여러 값을 비교할 때 사용합니다.
    - case 수가 많을 때 성능상 유리합니다.
    - `enum` 값을 분기할 때 가독성이 좋습니다.

- **`if-else`문이 적합한 경우**는 다양한 조건식으로 복잡한 분기를 처리할 때입니다.
    - 범위 비교(`x > 10`)가 필요할 때 사용합니다.
    - 복합 조건(`a && b || c`)이 필요할 때 사용합니다.
    - 조건 수가 적을 때는 overhead 없이 처리됩니다.


---


## If-Else문

- `if-else`문은 **boolean 조건을 순차적으로 확인**하여 control flow를 결정합니다.
    - 각 조건마다 진위 여부를 판단하는 instruction이 필요합니다.
    - 조건 수에 비례하여 `O(N)` 시간 복잡도를 가집니다.
    - 모든 종류의 boolean 표현식을 사용할 수 있어 유연합니다.

```java
if (condition1) {
    // condition1이 true일 때
} else if (condition2) {
    // condition2가 true일 때
} else {
    // 모든 조건이 false일 때
}
```

- `if-else`문의 **장단점**은 유연성과 성능의 trade-off입니다.
    - (장점) jump table을 만드는 overhead가 없습니다.
    - (장점) 범위 비교, 복합 조건 등 모든 boolean 표현식을 사용할 수 있습니다.
    - (단점) 조건마다 확인하는 instruction이 필요합니다.
    - (단점) 조건 수가 많아지면 성능이 저하됩니다.


---


## Switch문

- `switch`문은 **입력값을 기준으로 jump table에서 해당 위치로 바로 이동**합니다.
    - 시작 시 입력값을 확인하는 instruction만 필요합니다.
    - 조건 수와 관계없이 `O(1)` 또는 `O(log N)` 시간 복잡도를 가집니다.
    - 값 일치 비교만 가능하며, 범위 비교는 불가능합니다.

```java
switch (value) {
    case 1:
        // value가 1일 때
        break;
    case 2:
        // value가 2일 때
        break;
    default:
        // 일치하는 case가 없을 때
}
```

- `switch`문의 **장단점**은 성능과 제약의 trade-off입니다.
    - (장점) 조건 수가 많아도 추가 instruction이 필요하지 않습니다.
    - (장점) jump table을 통해 빠르게 해당 case로 이동합니다.
    - (단점) jump table을 생성하는 overhead가 있습니다.
    - (단점) 값 일치 비교만 가능하며, 범위나 복합 조건은 사용할 수 없습니다.


### Switch문에서 사용 가능한 Type

- `switch`문의 조건으로 **사용 가능한 type**은 제한되어 있습니다.
    - `byte`, `short`, `char`, `int` : primitive type 중 정수형만 가능합니다.
    - `Byte`, `Short`, `Character`, `Integer` : 해당 wrapper class도 가능합니다.
    - `String` : Java 7부터 지원됩니다.
    - `enum` : enumeration type도 사용 가능합니다.


---


## JVM의 Switch 최적화

- JVM은 case 값의 분포에 따라 **두 가지 bytecode**를 생성하여 최적화합니다.
    - case 값이 연속적이면 `tableswitch`를 사용합니다.
    - case 값이 분산되어 있으면 `lookupswitch`를 사용합니다.


### TableSwitch

- `tableswitch`는 case 값이 **연속적이거나 밀집**되어 있을 때 사용됩니다.
    - case 값 사이의 빈 값도 default로 채워서 table을 생성합니다.
    - 입력값을 index로 사용하여 `O(1)`으로 바로 jump합니다.
    - memory를 더 사용하지만 속도가 빠릅니다.

```
// case 0, 1, 3, 5, 7인 경우
tableswitch default: 73
    case 0: 48
    case 1: 53
    case 2: 73  // default로 채움
    case 3: 58
    case 4: 73  // default로 채움
    case 5: 63
    case 6: 73  // default로 채움
    case 7: 68
```


### LookupSwitch

- `lookupswitch`는 case 값이 **분산**되어 있을 때 사용됩니다.
    - key-label 쌍을 binary search tree 형태로 저장합니다.
    - 이진 탐색으로 `O(log N)`에 해당 case를 찾습니다.
    - memory 효율이 좋지만 tableswitch보다 느립니다.

```
// case 1, 6, 34인 경우
lookupswitch default: 51
    case 1: 36
    case 6: 41
    case 34: 46
```


---


## Java 14+ Switch Expression

- Java 14부터 **switch expression**이 정식 도입되어 간결한 문법을 지원합니다.
    - arrow(`->`) 문법으로 `break` 없이 값을 반환합니다.
    - `yield` keyword로 block 내에서 값을 반환합니다.
    - 모든 case를 처리해야 하므로 compile 시점에 누락을 방지합니다.

```java
// 기존 switch문
String result;
switch (day) {
    case MONDAY:
    case FRIDAY:
        result = "Working";
        break;
    case SATURDAY:
    case SUNDAY:
        result = "Weekend";
        break;
    default:
        result = "Unknown";
}

// switch expression
String result = switch (day) {
    case MONDAY, FRIDAY -> "Working";
    case SATURDAY, SUNDAY -> "Weekend";
    default -> "Unknown";
};
```

- block이 필요한 경우 **`yield`**를 사용하여 값을 반환합니다.

```java
String result = switch (day) {
    case MONDAY, FRIDAY -> {
        System.out.println("Weekday");
        yield "Working";
    }
    case SATURDAY, SUNDAY -> "Weekend";
    default -> "Unknown";
};
```


---


## Reference

- <https://docs.oracle.com/javase/specs/jvms/se17/html/jvms-3.html#jvms-3.10>
- <https://openjdk.org/jeps/361>

