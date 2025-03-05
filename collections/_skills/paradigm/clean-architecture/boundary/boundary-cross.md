---
layout: skill
permalink: /70
title: Clean Architecture - 경계 횡단하기
description: Architecture에서 경계를 가로질러 통신하는 일은 필수적이기 때문에, 경계 횡단에 대한 부분도 잘 설계해야 합니다.
date: 2023-11-28
---


## Architecture 경계를 가로질러 통신하기

- 경계 횡단은 한 쪽에 있는 기능에서 반대편 기능을 호출하여 data를 전달하는 일입니다.
    - 이때, 적절한 위치에서 경계를 횡단하게 하려면 source code 의존성을 관리해야 합니다.
    - module 하나가 변경되면 이에 의존하는 다른 module도 변경하거나 다시 배포해야 할 수도 있기 때문입니다.


### 정방향 경계 횡단

- 가장 단순한 형태의 경계 횡단이며, 저수준 client가 고수준 service를 호출합니다.
    - runtime 의존성과 compile time 의존성은 모두 저수준에서 고수준으로 같은 방향을 향합니다.
    - 제어 흐름도 경계를 횡단할 때 저수준에서 고수준으로 흐릅니다.

```mermaid
classDiagram
Client --> Service : 