---
layout: skill
permalink: /112
title: Clean Architecture - Service Architecture에 대한 오해
description: SOA와 MicroService는 만능 solution이 아닙니다.
date: 2023-11-29
---


## Service 지향 Architecture와 MicroService Architecture

- **Service 지향 Architecture**와 **MicroService Architecture**가 큰 인기를 끌고 있습니다.
    - Service 지향 Architecture(SOA, Service Oriented Architecture)는 대규모 computer system을 구축할 때의 개념으로, 업무 상의 일 처리에 해당하는 software 기능을 service로 판단하여 그 service를 network 상에 연동하여 system 전체를 구축해 나가는 방법론입니다.
    - MicroService Architecture는 application을 느슨하게 결합된 service의 모임으로 구조화하는 service 지향 architecture(SOA) style의 일종인 software 개발 기법입니다.

- service를 사용하면, 상호 결합이 철저하게 분리되고 개발과 배포 독립성을 지원하는 것처럼 보이지만, 이는 일부만 맞는 말입니다.

- 단순히 application의 행위를 분리할 뿐인 service라면 값비싼 함수 호출에 불과하며, architecture 관점에서 꼭 중요하다고 볼 수 없습니다.
    - system architecture는 의존성 규칙을 준수하며 고수준의 정책을 저수준의 정책으로부터 분리하는 경계에 의해 정의됩니다.
        - service를 사용한다는 사실만으로는 본질적으로 architecture에 해당하지 않습니다.
    - architecture 관점에서 중요한 service도 있지만, 중요하지 않은 service도 존재하는데, architecture가 관심을 갖는 service는 architecture 관점에서 중요한 service입니다.


### 결합 분리의 오류

- system을 service들로 분리함으로써, **service 사이의 결합이 무조건적으로 분리되는 것은 아닙니다.**
    - 각 service는 각자 다른 process에서 실행되므로, service는 개별 변수 수준에서는 각각 결합이 분리됩니다.
    - 하지만 **network 상의 공유 자원** 때문에 결합될 가능성이 여전히 존재하며, **서로 공유하는 data에 의해 강력하게 결합**됩니다.


### 개발 및 배포 독립성의 오류

- service를 사용함으로써, **개발 및 배포 독립성을 무조건적으로 가질 수는 없습니다.**
    - 전담 팀이 service를 소유하고, 작성하고, 유지 보수하고, 운영하게 되기 때문에, 개발 및 배포 독립성이 유지된다고 생각할 수 있습니다.
    - 하지만 service가 **data나 행위에서 어느 정도 결합**되어 있다면, **결합된 정도에 맞게 개발, 배포, 운영을 조정**해야 합니다.
        - service가 나뉘어 있다고 해서 항상 독립적으로 개발, 배포 및 운영이 가능한 것이 아닙니다.
        - 예를 들어, `A` service의 기능 `a()`가 `B` service의 기능 `b()`를 호출하여 사용한다면, `B`를 배포할 때 `a()` 기능도 동작하지 않게 됩니다.

- service는 확장 가능한 system을 구축하는 유일한 선택지가 아닙니다.
    - monolithic이나 component 기반으로도 대규모 enterprise system을 구축할 수 있다는 사실은 역사적으로 증명되어 왔습니다.


