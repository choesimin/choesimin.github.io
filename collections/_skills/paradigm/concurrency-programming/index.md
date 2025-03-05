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


---


## 동시성과 병렬성의 차이 : 논리적 동시 수행 vs 물리적 동시 수행

- 동시성(병행성)과 병렬성은 모두 여러 작업을 동시에 수행하기 위한 방법이지만, 실제 동작 방식에서 차이가 있습니다.
    - 작업을 동시에 처리할 때, **동시성은 논리적인 개념**을, **병렬성은 물리적인 개념**을 적용하여 구현합니다.

|  | 동시성 (Concurrency) | 병렬성 (Parallelism) |
| --- | --- | --- |
| **실행 방식** | **논리적인 관점**에서 여러 작업을 동시에 수행함.<br>실제로는 **하나의 CPU core**가 여러 작업을 전환하며 처리함. | **물리적인 관점**에서 여러 작업을 동시에 수행함.<br>실제로 **여러 CPU core** 또는 **여러 대의 computer**가 동시에 처리함. |
| **주요 사용 사례** | 주로 **I/O 작업이 많은 program**에 유리함. | **계산 집약적인 작업**에 적합함. |
| **구현 방식** | **thread**, **coroutine** 등을 사용하여 구현. | **multi-processing**, **GPU 연산** 등을 사용하여 구현. |
| **예시** | web server가 여러 client 요청을 처리하는 경우.<br>GUI program에서 사용자 입력을 처리하면서 동시에 background 작업 수행하는 경우. | 과학 계산에서의 대규모 data 처리.<br>video rendering 작업.<br>기계 학습 model의 병렬 학습. |


### 동시성 (Concurrency)

- **동시성(concurrency)**은 여러 작업을 **논리적인 관점**에서 동시에 수행하는 방법입니다.
    - 사용자에게 **여러 작업이 동시에 진행되는 것처럼 보이도록** 하지만, 실제로는 **하나의 CPU core**가 여러 작업을 순차적으로 빠르게 전환(switching)하면서 처리합니다.

- 동시성 programming은 **I/O 작업이 많은 program**에서 효율적으로 사용할 수 있습니다.
    - file 읽기/쓰기, network 송신 등의 **I/O 작업이 포함되어 있어서 program이 느려지는 경우는 CPU 성능의 문제가 아닙니다.**
        - I/O 작업은 CPU가 연산을 하느라 느려지는 것이 아니라 HDD/SSD와 같은 hardware의 작업을 기다리고 있거나 network 응답을 기다리고 있는 것입니다.
        - 즉, CPU가 연산을 하느라 느려지는 것이 아니라, 외부 장치의 응답을 기다리고 있는 것입니다.
    - CPU 성능의 문제가 아니기 때문에, **하나의 CPU에서 thread를 늘려주는 것**만으로 자원의 유휴 상태 시간(Idle Time)을 줄여 program 성능을 향상시킬 수 있습니다.

- 동시성은 **병행성**이라고도 부릅니다.


### 병렬성 (Parallelism)

- **병렬성(parallelism)**은 여러 작업을 **물리적인 관점**에서 동시에 수행하는 방법입니다.
    - **실제로 여러 작업을 동시에 처리**하며, 이를 위해 **다수의 CPU core** 또는 여러 대의 computer를 활용합니다.

- 병렬 programming을 적용하면 **계산 집약적인 작업**을 빠르게 완료할 수 있습니다.
    - 순수하게 **CPU 연산이 많아서 program이 느려지는 경우는 CPU 성능의 문제입니다.**
    - 따라서 계산 집약적인 작업에는 다수의 CPU core를 사용하고, 각 CPU에게 작은 단위로 쪼갠 계산 작업을 할당하여 program 성능을 향상시킬 수 있습니다.


---


## 비동기 vs 동시성 : 비슷하지만 다른 개념

- 비동기와 동시성은 모두 system의 효율성을 높이기 위한 방법이지만, 적용되는 상황과 목적이 다릅니다.
    - 비동기는 주로 단일 작업의 지연을 최소화하고 응답성을 높이는 데 사용되며, 동시성은 여러 작업을 병렬로 처리하여 전체적인 처리량을 증가시키는 데 초점을 맞춥니다.

- **비동기(asynchronous)**는 다른 작업의 완료를 기다리지 않고 다음 작업을 계속 진행할 수 있게 합니다.
    - **event나 작업을 독립적으로 처리**하여, **system의 응답성을 높이는 데 중점**을 둡니다.

- **동시성(concurrency)**은 여러 작업을 논리적으로 동시에 실행하는 개념입니다.
    - **여러 작업을 효율적으로 관리**하여, **system 자원의 활용도를 높이는 데 중점**을 둡니다.


### 여러 문장으로 비동기와 동시성의 의미를 비교하기

| 비동기 (Asynchronous) | 동시성 (Concurrency) |
| --- | --- |
| 작업 하나에 대한 처리 방법 | 여러 작업들에 대한 처리 방법 |
| program의 흐름과 event의 발생 및 처리를 독립적으로 수행하는 방법 | 여러 작업을 논리적인 관점에서 동시에 수행하는 방법 |
| 작업을 Dispatch Queue에 보낸 후에 바로 신경을 끄고 다음 일을 하는 것 | Queue에 있는 작업들을 여러 개의 thread에서 처리하는 것 |
| 특정 작업이 완료될 때까지 기다리지 않고 다른 작업을 수행하여 system의 응답성을 높이는 데 중점을 둠 | 여러 작업을 겹치게 하여 system의 효율성을 높이는 데 중점을 둠 |


---


## Reference

- <https://tech.devsisters.com/posts/programming-languages-5-concurrent-programming>
- <https://codingmon.tistory.com/34>
