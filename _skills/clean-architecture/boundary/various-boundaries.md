---
layout: skill
title: Clean Architecture - 다양한 형태의 경계들
date: 2023-11-28
---




- system architecture는 software component와 그 component를 분리하는 경계에 의해 정의되며, 경계는 다양한 형태로 나타납니다.


### 1. 단일체 경계

- source code 수준 분리 mode에서는 나름의 규칙에 따라 분리되어 있을 뿐, 물리적으로 엄격하게 분리되지는 않은 형태입니다.
    - 함수와 data가 단일 processor에서 같은 주소 공간을 공유합니다.
    - 배포 관점에서 봤을 때, source code 수준 분리 module은 단일체(monolith)입니다.
        - monolith는 단일 실행 file을 의미합니다.

- 배포 시에는 이점이 없지만, 개발 시 이점이 있습니다.
    - 단일체는 component 수준으로 분리되지 않기 때문에, 배포 시엔 경계가 드러나지 않습니다.
        - 개별 component를 배포하는 대신 커다란 하나의 file을 배포하기 때문입니다.
    - 배포할 때 경계가 드러나지 않아도, 단일체에는 source code 수준 분리를 통해 경계를 가지도록 하는 것이 좋습니다.
        - 단일체 안에 포함된 다양한 component를 개발하고 binary로 만드는 과정을 독립적으로 수행할 수 있게 하기 때문입니다.

- 단일체를 배포하는 일은 일반적으로 compile과 정적 link 작업을 수반하므로, 대체로 component는 source code 형태로 전달됩니다.

- 단일체 경계를 가로지는 통신은 빈번합니다.
    - source 수준에서 결합이 분리된 단일체에서 component 간 통신은 빠르고 저렴하기 때문입니다.
    - 단일체 경계를 가로지는 통신은 전형적인 함수 호출을 의미합니다.


### 2. 배포형 Component 경계

- architecture의 경계가 물리적으로 드러난 형태입니다.
    - e.g., .NET DLL, Java Jar file, Ruby Gem, Unix 공유 library 등의 동적 link library가 이에 속합니다.
    - component를 이 형태로 배포하면 따로 compile하지 않고 바로 사용할 수 있습니다.

- 배포 수준 결합 분리 mode에서 component는 binary와 같이 배포 가능한 형태로 전달됩니다.

- 배포 과정에서만 차이가 날 뿐 단일체와 동일합니다.
    - 모든 함수가 동일한 processor와 주소 공간에 위치합니다.
    - component를 분리하거나 component 간 의존성을 관리하는 전략도 단일체와 동일합니다.
        - 그러나 정적 다형성을 사용할 수는 없습니다.
    - 함수 호출이 통신의 전부이기 때문에 값싸고 빈번합니다.
        - 동적 link와 runtime loading으로 최초의 함수 호출은 오래 걸릴 수 있습니다.


### 3. Thread 경계

- 단일체와 배포형 component는 모두 thread를 활용할 수 있습니다.
- thread는 architecture 경계나 배포 단위가 아닙니다.
- thread는 실행 계획과 순서를 체계화하는 방법에 가깝습니다.
- 모든 thread가 하나의 component에 포함될 수도 있고, 많은 component에 걸쳐 분산될 수도 있습니다.


### 4. Local Process 경계

- local process는 주로 command line이나 system 호출을 통해 생성되며, 정적으로 link된 단일체 또는 동적으로 link된 여러 component로 구성된 process를 의미합니다.
    - process 관점에서 local process는 일종의 최상위 component이며, component 간의 의존성을 동적 다형성(의존성 역전)을 통해 관리하는 저수준 component로 구성됩니다.
    - local process가 정적으로 link된 단일체일 때는 여러 monolitic process가 같은 component들을 가지고 있을 수 있습니다.
        - compile하고 정적 link하는 과정에서 각 component의 binary가 단일체에 물리적으로 복사되어 들어가기 때문입니다.
    - local process가 동적으로 link된 여러 개의 component로 구성되었을 때는 동적으로 link된 배포형 component들을 서로 공유할 수 있습니다.

- local process들은 동일한 processor 또는 하나의 multi-core system에 속한 여러 processor에서 실행되지만, 각각 독립된 주소 공간에서 실행됩니다.
    - 일반적으로 memory 보호를 통해 process들이 memory를 공유하지 못하게 합니다.
    - 종종 공유 memory partition을 사용하기도 합니다.

- local process 간 분리 전략은 단일체나 binary component의 경우와 동일합니다.
    - source code 의존성 방향은 저수준에서 고수준으로 향합니다.
    - 따라서 local process는 고수준 process의 source code가 저수준 process의 이름, 물리 주소, registry 조회 key를 포행해서는 안 됩니다.
        - architecture 관점의 목표는 저수준 process가 고수준 process의 plugin이 되도록 만드는 것이기 때문입니다.

- local process는 socket, mailbox, message queue 같은 운영 체제에서 제공하는 통신 기능을 이용하여 서로 통신합니다.
    - e.g., local process 경계를 지나는 통신에는 운영 체제 호출, data marshaling/unmarshaling, process 간 문맥 교환 등이 있습니다.
    - local process 경계를 지나는 통신은 비싼 작업에 속하므로 너무 빈번하게 이뤄지지 않도록 신중하게 제한해야 합니다.


### 5. Service 경계

- 물리적인 형태를 띠는 가장 강력한 경계입니다.
- service는 process이므로 일반적으로 command line 또는 그와 동등한 system 호출을 통해 구동됩니다.

- 통신을 제외하고, local process에 적용한 규칙이 그대로 적용됩니다.
    - 저수준 service는 반드시 고수준 service에 plugin되어야 합니다.
    - 고수준 service의 source code에는 저수준 service를 특정하는 물리적인 정보(e.g., URI)를 포함해서는 안 됩니다.

- service 경계를 지나는 통신은 함수 호출에 비해 매우 느립니다.
    - 자신의 물리적 위치에 구애받지 않고 모든 통신은 network를 통해 이루어집니다.
    - 가능하다면 빈번하게 통신하는 일은 피해야 합니다.
    - 지연(latency)에 따른 문제를 고수준에서 처리할 수 있어야 합니다.



---




## Reference

- Clean Architecture (도서) - Robert C. Martin
