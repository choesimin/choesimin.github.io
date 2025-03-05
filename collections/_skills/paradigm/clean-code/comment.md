---
layout: skill
permalink: /163
title: Clean Code - 주석 사용하지 않기
description: 좋은 code는 그 자체로 표현력이 풍부한 code입니다.
date: 2023-04-18
---


## 주석은 필요악

- 좋은 code는 **표현력이 풍부하고 깔끔하며 주석이 거의 없는 code**입니다.
    - 복잡하고 어수선하며 주석이 많이 달린 code는 나쁜 code입니다.

- 주석은 code로 의도를 표현하지 못해서 사용하게 됩니다.
    - 현대 programming 언어들은 그 자체로 표현력이 풍부합니다.
    - programming 언어를 치밀하게 사용해 의도를 표현할 능력이 있다면, 주석은 필요하지 않습니다.

- 주석은 나쁜 code를 보완하지 않습니다.
    - code가 알아보기 어렵다면 주석을 달기보단, code를 깨끗하게 만드는 것이 낫습니다.

- 주석은 code의 변화를 따라가지 못합니다.
    - 주석은 오래될수록 code에서 멀어집니다.
    - 하나의 잘못된 주석으로 개발자의 신뢰를 잃으면, 다른 주석도 더는 믿을 수 없게 됩니다.

- 주석도 code입니다.
    - 잘못된 code는 debugging으로 바로잡을 수 있습니다.
    - 그러나 잘못된 주석은 개발자가 신경쓰지 않으면 바로잡을 수 없습니다.
        - IDE에 주석을 debugging하는 기능은 없습니다.
    - 따라서 불필요한 주석은 없애고, 꼭 필요한 주석은 code라고 생각하고 관리해야 합니다.

```java
/* 좋은 예 */
if (employee.isEligibleForFullBenefits()) { ... }

/* 안 좋은 예 */
// 직원에게 복지 혜택을 받을 자격이 있는지 검사한다.
if ((employee.flags & HOURLY_FLAG) && (employee.age > 65)) { ... }
```


