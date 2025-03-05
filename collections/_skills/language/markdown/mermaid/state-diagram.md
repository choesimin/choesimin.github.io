---
layout: skill
permalink: /49
title: Mermaid.js - Markdown 문서에 State Diagram 그리기
description: Markdown 문서에 Mermaid.js를 사용하여 State Diagram을 그릴 수 있습니다.
date: 2023-07-02
---


## Mermaid.js State Diagram

- mermaid를 사용해 State Diagram을 그릴 수 있습니다.

```mermaid
stateDiagram-v2
direction LR

state "정지함" as still
state "움직이는 중" as moving
state "충돌함" as crash

[*] --> still
still --> [*]

still --> moving
moving --> still
moving --> crash
crash --> [*]
```


