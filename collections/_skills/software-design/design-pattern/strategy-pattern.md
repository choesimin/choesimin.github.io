---
layout: skill
permalink: /98
title: Strategy Pattern - 상황에 맞추어 객체의 행동 바꾸기
description: Strategy Pattern은 객체의 행동을 정의하고, 각 행동을 캡슐화하여 교환할 수 있도록 만듭니다.
date: 2023-07-03
---


## Strategy Pattern

- Strategy Pattern을 이용하면 algorithm을 상황에 따라 변경해가며 사용할 수 있습니다.
    - 동일한 목적을 지닌 algorithm group을 정의하고 각각을 캡슐화(encapsulation)하여 group 내의 algorithm을 교환해서 사용할 수 있도록 합니다.
    - algorithm을 사용하는 client에서 algorithm을 분리하기 때문에 독립적으로 algorithm을 변경할 수 있습니다.

- 같은 목적을 가진 class들의 algorithm을 상황에 따라 교체해야 하는 경우, Strategy Pattern을 사용하면 좋습니다.
    - 평소에는 한 가지 algorithm을 사용하더라도 algorithm을 변경해야 할 때가 있습니다.
        - 예를 들어, 참조하는 class가 변경/제거될 때(compile time).
        - 예를 들어, 사용하는 시점에 따라서 적용할 algorithm이 다를 때(runtime).


