---
layout: skill
permalink: /137
title: Clean Code - Class 작게 만들기
description: 책임이 명확하고 응집도가 높은 class가 좋은 class입니다.
date: 2023-04-19
---


## Class 작게 만들기

```txt
class나 module을 변경할 이유는 하나여야 한다.
```

- 각 class가 맡는 책임이 적을수록 좋습니다.
    - 단일 책임 원칙(SRP, Single Responsibility Principle)

- class 이름은 해당 class의 책임을 기술합니다.
    - 작명은 class 크기에 영향을 줍니다.
    - 이름이 너무 길거나 모호하다면, 책임이 너무 많기 때문입니다.


---


## Class와 응집도(Cohesion)

- "응집도가 높다."는 "class에 속한 method와 변수가 서로 의존하며 논리적인 단위로 묶인다."는 말과 같습니다.

- 응집도가 높은 class엔 몇 가지 특징이 있습니다.
    1. instance 변수 갯수가 적습니다.
    2. class method에서 class instance 변수를 하나 이상 사용합니다.
        - method가 instance 변수를 더 많이 사용할수록, method와 class는 응집도가 더 높아집니다.

- 기능이 추가/수정되면서 class가 커지면 응집도가 낮아지기 쉽습니다.
- 따라서 응집도를 높게 유지하기 위해서는 class를 작게 쪼개야 합니다.
- 단계적으로 class를 나눌 수 있습니다.
    1. 큰 함수를 작은 함수 여럿으로 나눕니다.
    2. 비슷한 인수들을 사용하는 작은 함수들을 작은 class 여럿으로 묶어냅니다.
- class가 쪼개지면서, program에 점점 더 체계가 잡히고, 구조가 투명해지게 됩니다.


---


## Class 요소 정의 순서 ([Java 관례](https://www.oracle.com/java/technologies/javase/codeconventions-fileorganization.html#1852))

1. Class variables
    1. static public variable 1
    2. static protected variable 2
    3. static (default) variable 3
    4. static private variable 4

2. Instance variables : instance 변수
    1. public variable 1
    2. protected variable 2
    3. (default) variable 3
    4. private variable 4

3. Constructors

4. Methods
    1. public method 1
        1. private method 1-1
        2. private method 1-2
        2. private method 1-3
    2. public method 2
        1. private method 2-1
        2. private method 2-2


---


## Reference

- Clean Code (도서) - Robert C. Martin
- <https://www.oracle.com/java/technologies/javase/codeconventions-fileorganization.html#1852>

