---
layout: skill
permalink: /81
title: 동시성 Programming - 여러 작업을 동시에 수행하기
description: 동시성 Programming을 통해 자원을 더 효율적으로 활용하고, system 성능을 향상시킬 수 있습니다.
date: 2024-07-31
---


## 동시성 Programming - 한 번에 여러 작업 처리하기

- 동시성 programming(Concurrency Programming)은 **여러 작업(task)을 동시에 수행**하는 programming paradigm입니다.
    - 단일 program 내에서 여러 작업이 병렬로 수행될 수 있도록 하는 방법과 도구들을 포함합니다.

- 동시성 programming의 장점은 **성능 개선**과 **효율적인 자원 활용**에 있습니다.
    - 주로 응답성과 처리 속도를 개선하기 위해 사용되며, 특히 multi-core processor가 일반화되면서 중요성이 더욱 부각되고 있습니다.
    - 현대의 다양한 application, 특히 고성능 computing, server application, 실시간 system, data 처리 application 등에서 필수적인 기법으로 자리 잡고 있습니다.

- 동시성 programming에는 다양한 장점이 있는 반면에, **복잡성도 함께 증가**한다는 단점도 있습니다.
    - code가 더 복잡해지고 debugging이 어려워질 수 있으며, 동기화 문제로 인한 bug가 발생할 가능성도 높아집니다.
    - 따라서 동시성 programming을 사용할 때는 복잡성에 의한 문제들을 충분히 이해하고 적절한 기법을 사용하는 것이 중요합니다.


### 동시성 Programming의 주요 개념과 기술

- **Thread** : process 내에서 독립적으로 실행되는 가장 작은 단위입니다.
    - 여러 thread는 동일한 memory 공간을 공유하면서 동시에 실행될 수 있습니다.
    - 예를 들어, Java의 `Thread` class, Python의 `threading` module 등.

- **Process** : 운영 체제에서 독립적으로 실행되는 program의 instance입니다.
    - 각 process는 자신만의 memory 공간을 가지고 있으며, 다른 process와 독립적으로 실행됩니다.
    - 예를 들어, Python의 `multiprocessing` module 등.

- **비동기 Programming** : 작업이 비동기적으로 실행되어 다른 작업이 완료될 때까지 기다리지 않고 계속 실행될 수 있도록 하는 programming 방식입니다.
    - 예를 들어, JavaScript의 `async/await`, Python의 `asyncio` library 등.
    - 비동기 programming(Asynchronous Programming)은 동시성 programming(Concurrency Programming)과 비슷하지만 엄연히 다른 개념입니다.

- **Lock** : 여러 thread가 동시에 접근할 수 없는 자원에 대한 접근을 조정하기 위한 동기화 기법입니다.
    - 예를 들어, Java의 `synchronized` keyword, Python의 `threading.Lock` 등.

- **Deadlock** : 두 개 이상의 작업이 서로를 기다리면서 무한 대기 상태에 빠지는 상황입니다.
    - deadlock을 피하기 위해 timeout 설정, lock 순서 지정 등의 다양한 기법이 사용됩니다.

- **경쟁 상태** : 여러 thread가 공유 자원에 동시에 접근하면서 발생하는 문제로, data 일관성이 깨질 수 있습니다.
    - 경쟁 상태(race condition)를 피하기 위해 적절한 동기화가 필요합니다.

- **Middleware 및 Library** : 동시성 programming을 지원하는 다양한 middleware와 library가 존재합니다.
    - 예를 들어, Java의 `ExecutorService`, Python의 `concurrent.futures` 등.
    - 직접 구현할 필요 없이, 언어마다 구현된 기능을 적절히 활용하면 됩니다.


### 동시성 Programming의 장점

- **응답성 향상** : 동시성 programming을 사용하면 사용자 interface(UI)가 blocking되지 않아 응답성이 향상됩니다.
    - 예를 들어, 대화형 application에서 오래 걸리는 작업이 background에서 실행되는 동안 사용자 interface는 여전히 반응할 수 있습니다.

- **성능 향상** : multi-core processor를 최대한 활용하여 성능을 향상시킬 수 있습니다.
    - 여러 core에서 작업을 병렬로 처리함으로써 작업 완료 시간을 단축시킬 수 있습니다.

- **효율적인 자원 사용** : 동시성 programming은 CPU와 같은 system 자원을 더 효율적으로 사용할 수 있게 합니다.
    - 특히 I/O 작업이 많은 application에서, CPU가 I/O 작업의 완료를 기다리지 않고 다른 작업을 처리할 수 있습니다.

- **비동기 작업 처리** : 시간이 오래 걸리는 작업을 비동기적으로 처리하여 전체 system의 효율성을 높일 수 있습니다.
    - 일반적으로 network 요청, file 읽기/쓰기, database query 등이 처리가 오래 걸리는 작업에 속합니다.

- **병렬 처리** : data 병렬 처리를 통해 대규모 dataset을 빠르게 처리할 수 있습니다.
    - 예를 들어, 대용량 data의 병렬 처리를 통해 machine learning model의 학습 속도를 높일 수 있습니다.

- **Program의 구조 개선** : 동시성 programming을 통해 program의 논리적 구조를 개선할 수 있습니다.
    - 작업을 여러 개의 독립적인 단위로 나누어 관리하면 code의 가독성과 유지 보수성이 향상됩니다.

- **Server 성능 최적화** : server application에서 동시성 programming을 통해 다수의 client 요청을 효율적으로 처리할 수 있습니다.
    - 예를 들어, web server는 각 client 요청을 별도의 thread나 비동기 작업으로 처리하여 동시에 더 많은 동시 연결을 할 수 있습니다.

- **Dead Time 감소** : 동시성 programming은 작업의 Dead Time(Idle Time)을 줄여 system의 전체 처리 능력을 향상시킵니다.
    - 자원이 유휴 상태로 있는 시간을 최소화함으로써 system 효율성을 높입니다.


