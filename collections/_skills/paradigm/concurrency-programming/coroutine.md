---
layout: skill
permalink: /83
title: Couroutine - 상호 협력하는 Routine
description: Coroutine을 사용하여 비동기 작업을 더 간결하고 효율적으로 처리할 수 있습니다.
date: 2024-08-01
---


## Coroutine : Co + Routine

- Coroutine은 **상호 협력하는 routine**이라는 의미를 가지며, 동시성 programming(concurrency programming)을 지원하는 개념입니다.
    - Coroutine을 사용하여 **비동기 작업** 역시 더 간결하고 효율적인 방식으로 처리할 수 있습니다.

- Coroutine은 일반적인 함수나 routine과 유사하지만, **실행을 중단**하고 다른 작업을 수행할 수 있는 지점에서 **중단된 상태를 기억**할 수 있다는 점에서 다릅니다.
    - 일반 함수와 달리 호출 시 즉시 완료되지 않고, **필요한 시점에서 중단**할 수 있으며, 다시 호출되었을 때 **중단된 지점부터 실행을 재개**합니다.

- Coroutine은 비슷한 기능을 제공하는 Rx(ReactiveX)보다 가벼우며, 더 간결하고 배우기 쉽습니다.
    - RxJava가 점점 Kotlin의 Coroutine으로 대체되고 있는 가장 큰 이유는 RxJava의 학습 곡선(learning curve)이 가파르기 때문입니다.

- Coroutine을 사용하면 비동기 작업을 직관적이고 가독성 높게 작성할 수 있어, 복잡한 비동기 흐름을 쉽게 관리할 수 있습니다.
    - Coroutine code도 동기 code(전통적인 routine)처럼 **작업을 순차적인 순서로 작성**할 수 있기 때문에 일반적인 비동기 code보다 가독성이 좋습니다.

- UI를 개발할 때 비동기 처리는 필수적이며, 이때 Coroutine을 적용하면 비동기 logic을 쉽게 구현할 수 있습니다.
    - 예를 들어, Android에서는 UI rendering 작업과 data fetching 작업을 비동기적으로 동시에 수행하는 경우가 많습니다.


### Coroutine의 "Co-" : "함께", "공동으로", "동시에"

- Coroutine은 서로 **협력적(cooperative)**으로 실행됩니다.
    - Coroutine은 자신이 실행되는 동안 언제든지 다른 Coroutine에게 제어권을 넘길 수 있습니다.
    - 이는 Coroutine이 명시적으로 양보(yield)하는 방식으로 이루어집니다.
    - 즉, Coroutine은 자신의 실행 흐름을 중단하고 다른 Coroutine이 실행될 수 있도록 협력합니다.

- Coroutine은 **동시성(concurrency)**을 지원합니다.
    - Coroutine은 여러 작업이 병행하여 실행되는 것처럼 보이지만, 실제로는 하나의 thread에서 교대로 실행됩니다.
    - 전통적인 multithreading과 달리 thread 간의 context switching overhead가 없고, 더 가벼운 resource를 사용합니다.


### Coroutine의 "Routine" : "특정한 일을 실행하기 위한 일련의 명령"

- **routine**은 program의 일부분으로, 특정 작업을 수행하는 code block을 의미합니다.
    - routine은 일반적으로 함수나 method를 의미하며, 한 번 호출되면 끝날 때까지 계속 실행됩니다.
    - routine은 시작부터 끝까지 일련의 순차적인 작업을 수행하는 데 집중합니다.

- routine은 일반적으로 동기적으로 실행되지만, Coroutine은 비동기적으로 실행될 수 있습니다.
    - 일반적인 routine과 달리, Coroutine은 중단과 재개가 가능하여 비동기 작업을 처리하는 동안에도 다른 작업을 수행할 수 있습니다.
        - Coroutine은 중단 지점에서 다른 Coroutine에게 제어권을 넘길 수 있습니다.
  
- Coroutine은 routine의 일종(비동기적으로 실행될 수 있는 확장된 형태의 routine)으로, 비동기 작업을 순차적으로 수행할 수 있게 해줍니다.
    - routine의 논리적 단계를 유지하면서도, 비동기 작업을 효율적으로 처리할 수 있게 합니다.
    - 일련의 명령을 협력적이고 동시성 있게 실행할 수 있는 방식으로 확장합니다.


