---
layout: note
permalink: /319
title: Java final keyword "잘" 사용하는 법 - 적절하게 사용하고 남용하지 않기
description: final keyword는 적절하게 사용하면 code의 가독성과 안정성이 높아지지만, 남용하면 오히려 가독성이 떨어져 유지 보수가 어려워지기 때문에, 필요한 경우에만 잘 사용해야 합니다.
date: 2025-04-24
---


## Java의 final keyword "잘" 사용하기

- final keyword는 Java에서 다양한 context에서 사용할 수 있고, 각 상황에 따라 다른 역할을 수행합니다.
    - 변수, method, class의 불변성을 표현하는 데 사용됩니다.

- final class는 상속(extends)이 불가능합니다.
- final method는 하위 class에서 재정의(`@Override`)가 불가능합니다.
- final 변수는 초기화 이후 값 변경이 불가능합니다.
    - final field는 객체 생성 시 초기화된 후 재할당이 불가능합니다.
    - final method parameter는 method 내에서 재할당이 불가능합니다.
    - final local variable은 한 번 선언된 이후 재할당이 불가능합니다.

- final keyword는 불변성을 보장하여, code의 안정성과 가독성을 높이고, 어떤 경우에서는 성능을 향상시킬 수 있다는 장점이 있습니다.

- 하지만 **불변하는 모든 곳에 final을 사용하는 것은 바람직하지 않습니다.**
    - 오히려 code의 가독성을 떨어뜨리고 유지 보수를 어렵게 만들 수 있습니다.
    - 과도한 final 사용은 code를 더 복잡하게 만듭니다.

- 따라서, **final keyword는 합리적으로 사용해야 하는 경우에만 사용**하는 것이 좋습니다.
    - **불변성이 필요한 field**에는 final을 **적극 사용**합니다.
    - class와 method에는 **상속/재정의 방지가 설계상 필요한 경우**에만 final을 사용합니다.
    - local variable에는 **의도를 명확히 표현**하거나 **lambda에서 사용할 경우**에만 final을 사용합니다.
    - **method parameter에는 특별한 이유가 없다면 final을 사용하지 않습니다.**
    - "의미 있는 사용(Meaningful Use)"을 원칙으로 삼아 과도한 사용이나 부족한 사용 모두 피합니다.


---


## final을 적절하게 사용하는 상황

- final keyword를 적절하게 사용하면 code의 가독성과 안정성이 높아집니다.


### final class와 method

- **상속이나 재정의를 통한 확장을 방지해야 할 명확한 이유가 있을 때** 적절합니다.
    - 보안상 중요한 method의 동작을 보호해야 할 경우.
    - 설계 상 명확히 상속을 금지해야 하는 class의 경우.
    - 불변성(immutability)을 보장해야 하는 경우.


### final field

- **불변 객체(immutable object)를 설계할 때** 적절합니다.
    - OpenJDK style guide는 "변경 가능한 field가 필요한 강력한 이유가 없는 한 모든 field는 final로 선언되어야 한다."고 명시하고 있습니다.

- **thread 안전성(thread safety)을 보장**하기 위해 필요합니다.
    - multi thread 환경에서 객체의 상태가 불변이면 동기화가 필요 없어집니다.

- 객체 생성 시 초기화를 강제하여 **null 상태를 방지**할 수 있습니다.


### final local variable

- **값이 변경되지 않는 상수**를 나타낼 때 적절합니다.
- **lambda 표현식**이나 **익명 class에서 외부 변수를 참조**할 때 필요합니다.
- **변수의 값이 변경되지 않음을 명확히 표현**하고자 할 때 사용합니다.

- **조건부로 한 번만 초기화되는 경우**에도 final을 사용할 수 있습니다.
    - 이 경우, final 변수는 한 번만 초기화되며, 이후에는 재할당이 불가능합니다.

```java
final String result;
if (condition == 200) {
    result = "success";
} else {
    result = "fail";
}
```

- 조건부로 초기화된 final 변수는 가독성을 높이고, code의 의도를 명확히 표현하는 데 도움이 됩니다.
    - 단, 이 경우에는 변수가 반드시 한 번만 초기화되어야 하므로 주의가 필요합니다.
    - 예를 들어, if-else 문을 사용하여 final 변수를 초기화하는 경우, 모든 경로에서 변수가 반드시 한 번만 초기화되어야 합니다.


---


## final을 남용하는 상황

- final keyword를 남용하면 code의 가독성을 떨어뜨리고 유지 보수가 어려워집니다.


### final method parameter

- 대부분의 style guide에서는 **method parameter에 final 사용을 권장하지 않습니다.**
    - OpenJDK style guide는 "가독성을 향상하거나 실제 설계 결정을 문서화하는 경우를 제외하고 method parameter는 final로 선언해서는 안 된다."라 명시하고 있습니다.

- parameter에 final을 과도하게 사용하면 복잡성이 증가하고 유연성이 낮아집니다.
    - code 가독성이 저하됩니다.
    - 불필요한 code 복잡성이 증가합니다.
    - parameter를 재할당할 경우 유연성이 저하됩니다.
    - 대부분의 개발자들은 parameter를 재할당하지 않는 것이 관행이므로 명시적 final은 불필요합니다.


### 모든 local variable에 final 사용

- **모든 local variable에 final을 적용하는 것은 과도한 사용**으로 간주됩니다.
- **문서화나 설계 결정을 표현하는 경우를 제외하고는 불필요**합니다.
- code의 복잡성만 증가시키고 가독성을 떨어뜨릴 수 있습니다.
- 참조 변수(reference type)의 경우 final은 참조만 변경할 수 없게 할 뿐, 객체의 내부 상태는 여전히 변경 가능합니다.


---


## 성능 향상을 위한 final 사용?

- final keyword는 **일부 상황에서 compiler 최적화**를 가능하게 합니다.
    - final field와 local variable은 compiler의 정적 최적화를 도울 수 있습니다.
    - 특히 final static 변수(상수)는 compiler 시점에 값이 결정되어 code 최적화가 가능합니다.

- 문자열 연결이나 상수 값 참조와 같은 특정 pattern에서는 final 사용으로 인한 최적화 효과가 분명히 존재합니다.
- 그러나 대부분의 실제 application에서는 final로 인한 성능 향상은 제한적입니다.
    - 이러한 최적화가 필요한 code pattern의 비중이 작습니다.
    - 전체 application 성능에 미치는 영향이 미미합니다.
    - I/O, network, database 접근 등 다른 요소가 성능 병목의 주요 원인입니다.

- 따라서 **final을 오직 성능 향상만을 목적으로 과도하게 사용하는 것은 권장되지 않습니다.**

- final은 **성능보다는 code의 불변성과 안전성을 보장하는 설계 도구**로서 가치가 더 큽니다.

- 실제 application에서 final로 인한 성능 향상은 제한적이므로, **final은 주로 code 설계와 불변성 보장을 위해 사용**하는 것이 바람직합니다.
