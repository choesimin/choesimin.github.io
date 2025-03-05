---
layout: skill
permalink: /33
title: Architecture 관점에서 보는 SOLID 원칙
description: Architecture 설계에도 SOLID 원칙을 적용할 수 있습니다.
date: 2023-11-05
---


## Architecture 설계에도 적용되는 SOLID 원칙

- 좋은 software system은 clean code로부터 시작합니다.
    - 좋은 벽돌(code)을 사용하지 않으면 건물의 구조(architecture)가 좋고 나쁜 것은 큰 의미가 없는 것과 같습니다.
    - 그리고 SOLID 원칙은 clean code를 짜는 데에 도움이 됩니다.

- SOLID 원칙은 객체 지향 software에만 적용되는 것은 아닙니다.
    - SOLID 원칙은 함수와 data 구조를 class로 배치하는 방법과 class들을 서로 결합하는 방법을 설명합니다.
    - class는 단순히 함수와 data의 집합을 의미할 뿐이기 때문에, SOLID 원칙은 객체 지향 software가 아니더라도 적용될 수 있습니다.

- SOLID 원칙의 목적은 **중간 수준의 software 구조**를 **변경에 유연**하고, **이해하기 쉽게** 하고, 많은 software system에서 사용되는 **component의 기반이 되도록** 하는 데에 있습니다.
    - '중간 수준'이란 code보다 상위 수준인 module과 component의 내부를 의미합니다.
    - 'module'은 source code(하나의 class) 수준을, 'component'는 배포 가능한 가장 작은 단위를 의미합니다.


