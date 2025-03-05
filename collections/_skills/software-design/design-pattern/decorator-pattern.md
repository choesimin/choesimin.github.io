---
layout: skill
permalink: /176
title: Decorator Pattern - 객체의 기능을 동적으로 확장하기
description: Decorator Pattern은 객체의 기능을 동적으로 확장할 때 사용되는 구조적 design pattern입니다.
date: 2024-01-17
---


## Decorator Pattern

- Decorator Pattern은 기본 객체에 추가적인 기능을 추가할 때 사용됩니다.
    - Decorator Pattern의 주요 목적은 **객체의 기능을 동적으로 확장**하는 것입니다.
    - 기능 확장을 위해 sub class를 만드는 것보다 Decorator Pattern을 적용하는 것이 훨씬 유연합니다.

- Decorator Pattern은 **객체**(component)를 **새로운 행동을 포함한 특수 wrapper 객체**(decorator) 안에 넣어서, **행동을 해당 객체들에 연결**시키는 구조적 design pattern입니다.
    - 객체를 여러 개의 decorator로 언제든지(실행 중) 감쌀 수 있어, **객체에 여러 요건을 동적으로 추가하고 삭제**할 수 있습니다.

- 여러 벌의 옷을 입어서 복합 효과를 얻는 것은 Decorator Pattern을 사용하는 예시가 될 수 있습니다.
    1. 사람(`component`)이 있습니다.
    2. 추울 때 sweater(`decorator1`)로 몸을 감쌉니다.
    3. sweater를 입어도 춥다면 위에 jacket(`decorator2`)을 입습니다.
    4. 비가 오면 그 위에 비옷(`decorator3`)을 입습니다.
    - 모든 옷은 기초 행동을 '확장'하지만, 사람의 일부가 아니기에 필요하지 않을 때마다 옷을 쉽게 벗을 수 있습니다.
    - 기초 행동을 확장할 수 있는 이유는 모든 옷이 사람의 모양에 맞춰서 만들어져 있기 때문입니다.


