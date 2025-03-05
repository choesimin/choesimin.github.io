---
layout: skill
permalink: /19
title: Clean Architecture - 정책
description: System의 본질적인 가치는 정책에 있습니다.
date: 2023-11-02
---


## 정책 : Software의 핵심 가치

- software system이란 정책(policy)을 기술한 것이며, **정책은 모든 업무 규칙(business logic)과 절차(process)를 구체화합니다.**
    - 하나의 정책은 이 정책을 서술하는 여러 개의 작은 정책들로 쪼갤 수 있습니다.
    - system의 본질적인 가치는 세부 사항이 아닌 정책에 있습니다.

- software architecture 개발에는 **정책을 신중하게 분리**하고, **정책이 변경되는 양상에 따라 정책을 재편성**하는 일도 포함됩니다.

- 단일 책임 원칙(SRP)과 공통 폐쇄 원칙(CCP)에 따르면, **동일한 이유로 동일한 시점에 변경되는 정책은 함께 묶여야 합니다.**
    - 동일한 이유로 동일한 시점에 변경되는 정책은 동일한 수준에 위치하며, 동일한 component에 속합니다.
    - 다른 이유 혹은 다른 시점에 변경되는 정책은 다른 수준에 위치하며, 다른 component로 분리합니다.


