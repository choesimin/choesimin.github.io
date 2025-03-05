---
layout: skill
permalink: /110
title: Clean Architecture - 부분적 경계
description: Architecture 경계를 부분적으로 구현하여, 경계 구축에 대한 비용을 줄이면서 필요한 만큼의 경계만 만들 수 있습니다.
date: 2023-11-28
---


## Partial Boundary : 경계를 부분적으로 구축하기

- architecture 경계를 완벽하게 만드는 데는 비용이 많이 들며, 유지하는 데에도 많은 노력이 필요합니다.
    - 쌍방향의 다형적 boundary interface, Input과 Output을 위한 데이터 구조를 만들어야 합니다.
    - 또한 두 영역을 독립적으로 compile하고 배포할 수 있는 component로 격리하는 데에 필요한 모든 의존성을 관리해야 합니다.

- 그럼에도 architecture의 선행적인 설계가 필요할지도 모르겠다는 생각이 든다면, 부분적 경계(partial boundary)를 구현해 볼 수 있습니다.
    - 무조건 원칙에 맞추어 양방향 interface를 만들어서 경계를 완벽하게 구분해야 하는 것은 아닙니다.
    - 상황에 맞추어 architecture 경계가 언제, 어디에 존재해야 할지, 그 경계를 완벽하게 혹은 부분적으로 구현할지를 결정해야 합니다.


