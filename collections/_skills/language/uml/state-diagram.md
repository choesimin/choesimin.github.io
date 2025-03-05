---
layout: skill
permalink: /104
title: State Diagram - 객체의 상태 변화 시각화하기
description: State Diagram은 객체의 상태 변화를 시각화하는 UML의 한 종류로, 상태, 전이, 선택으로 구성됩니다.
date: 2023-06-19
---


## State Diagram의 구성 요소

- State Diagram은 상태(State), 전이(Transition), 선택(Choice), 시작 상태(Initial state), 종료 상태(Final state)로 구성됩니다.


### 시작 상태와 종료 상태

```mermaid
stateDiagram-v2
direction LR

[*] --> [*]
```

|  | 시작 상태 (Initial state) | 종료 상태 (Final state) |
| 