---
layout: skill
permalink: /122
title: Debezium Snapshot - 전체 Data Capture
description: Debezium의 Snapshot 기능을 활용하여 Database의 초기 상태를 복사할 수 있습니다.
date: 2025-01-31
---


## Debezium Snapshot : Database의 초기 상태를 복사하기

- snapshot은 **source database의 전체 data를 특정 시점에 한꺼번에 capture하는 Debezium의 핵심 기능**입니다.
    - 최초 connection 시점의 source database 상태(전체 table과 schema)를 capture하여 target system으로 전송합니다.
    - database의 **현재 상태를 일관성 있게 유지하는 것이 snapshot의 최종 목적**입니다.

- snapshot은 Debezium connector 최초 실행 시 반드시 필요한 과정입니다.
    - connector가 database의 transaction log를 읽기 시작하는 시점 이전의 data를 확보하기 위함입니다.
        - binary log나 transaction log의 시작점도 함께 capture됩니다.
    - snapshot을 통해 data의 완전성을 보장할 수 있게 됩니다.


### Snapshot의 필요성

- snapshot은 **source database와 target system 간의 초기 data 동기화**를 수행합니다.
    - CDC(Change Data Capture) process가 시작되기 전의 기존 data를 복제해야 할 필요가 있습니다.
    - **CDC는 새로운 변경 사항만을 감지**하므로, **초기 상태를 복제하는 과정이 필수적**입니다.

- **database의 장애나 중단 상황 이후 data 일관성을 보장**합니다.
    - system 장애로 인한 data 불일치 문제를 해결할 수 있습니다.
    - **snapshot을 통해 source database의 현재 상태를 완전히 복제**할 수 있어, binary log나 transaction log가 유실된 경우에도 data 복구가 가능합니다.
        - 예를 들어, when_needed mode를 사용하면 log 유실 시 자동으로 snapshot을 수행하여 복구합니다.


### Snapshot의 주요 특징

- snapshot은 **transaction 단위로 수행**되며, data의 일관성을 보장하기 위해 **ACID 속성을 준수**합니다.
    - **Atomicity** : snapshot의 모든 작업이 완료되거나 모두 취소됩니다.
    - **Consistency** : database의 제약 조건과 규칙이 유지됩니다.
    - **Isolation** : 다른 transaction의 영향을 받지 않습니다.
    - **Durability** : 완료된 snapshot은 영구적으로 보존됩니다.

- snapshot은 **source database의 성능에 영향을 최소화**하도록 설계되었습니다.
    - **chunk 단위의 data 읽기**를 수행합니다.
    - **lock 시간을 최소화**하는 전략을 사용합니다.
    - **resource 사용을 조절**할 수 있는 설정을 제공합니다.

- snapshot은 **다양한 mode를 제공**하여 상황에 맞는 유연한 설정이 가능합니다.
    - `initial`, `initial_only`, `never`, `schema_only`, `when_needed`, `custom` 등의 mode를 선택할 수 있습니다.
    - 각 mode는 **특정 상황에 적합한 동작 방식**을 제공합니다.

| Snapshot Mode | 핵심 동작 | 적합한 상황 | 부적합한 상황 |
| 