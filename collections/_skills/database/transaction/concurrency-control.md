---
layout: skill
permalink: /154
title: 병행 제어 (Concurrency Control)
description: 병행 제어는 여러 transaction이 동시에 database에 접근할 때 발생하는 문제를 해결하기 위한 기법으로, database의 일관성과 효율성을 유지합니다.
date: 2024-10-24
---


## 병행 제어 : 일관성과 효율성 모두 지키기

- **병행(concurrency)**은 매우 빠르게 여러 transaction 사이를 이동하면서 조금씩 처리를 수행하는 방식입니다.
    - 실제로는 한 번에 한 transaction만 수행하지만, 마치 동시에 여러 transaction을 수행하는 것처럼 보이도록 합니다.

- **병행 제어(concurrency control)**는 여러 transaction이 동시에 수행될 때 database의 일관성과 무결성을 유지하기 위한 기법입니다.
    - 병행 transaction들이 서로 영향을 미치지 않도록 제어하는 것이 목적입니다.
    - data를 일관성 있게 유지하면서 동시에 여러 사용자가 database를 최대한 공유할 수 있도록 합니다.

- 병행 제어는 database의 **일관성**(data 무결성 유지)과 **효율성**(system 성능 최적화)이라는 **서로 상충되는 목적을 동시에 추구**합니다.
    - **Database의 일관성 유지** : 여러 transaction이 동시에 실행되더라도 database의 무결성과 일관성을 보장하여, 모든 transaction이 완료된 후에도 database가 정확하고 일관된 상태를 유지하도록 합니다.
    - **Database의 최대 공유** : system의 자원을 효율적으로 활용하고 사용자 간의 data 공유를 최대화함으로써, 가능한 한 많은 사용자가 동시에 database에 접근할 수 있도록 합니다.
    - **System 활용도 극대화** : database system의 자원(CPU, Memory, Disk 등)을 최대한 효율적으로 사용하여 전체적인 system 성능을 향상시킵니다.
    - **사용자 응답 시간 최소화** : 각 transaction의 실행 시간을 최소화하고 사용자가 요청한 작업에 대한 응답을 빠르게 받을 수 있도록 하여, 사용자 경험을 개선하고 system의 효율성을 높입니다.
    - **단위 시간당 처리할 수 있는 Transaction 수 최대화** : 주어진 시간 내에 처리할 수 있는 transaction의 수를 늘려 system의 처리량(throughput)을 증가시킴으로써, 전체적인 system의 성능과 효율성을 높입니다.


