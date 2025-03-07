---
layout: skill
permalink: /
title: Kafka의 Data Model - Topic, Partition, Record
description: 
date: 2025-03-07
---


## Topic & Partition & Record

- Apache Kafka는 분산 이벤트 스트리밍 platform으로 고성능, 확장성, 내구성을 갖춘 message processing system입니다.

- topic, partition, record는 data 흐름과 저장을 구성하는 기본 요소이자 Kafka의 핵심 개념입니다.


### Topic : Data를 분류하는 논리적 단위

- topic은 Kafka에서 **data stream을 구분하는 논리적 단위**입니다.

- topic은 특정 category의 message를 저장하는 channel로 생각할 수 있습니다.
    - 예를 들어, 웹사이트 사용자 활동, 결제 transaction, 장치 sensor data 등의 category가 각각 별도의 topic이 될 수 있습니다.

- 각 topic은 고유한 이름을 가지며, producer는 특정 topic에 data를 발행하고 consumer는 원하는 topic에서 data를 구독합니다.

- topic은 내부적으로 여러 partition으로 분할되어 분산 storage 및 병렬 처리를 가능하게 합니다.


### Partition : Data를 저장하는 물리적 단위

- partition은 topic의 물리적 분할 단위로, 각 topic은 하나 이상의 partition으로 구성됩니다.

- partition은 순서가 있는 불변의 record 시퀀스로, 각 record는 partition 내에서 순차적인 ID(offset)를 할당받습니다.

- partition의 주요 목적은 확장성과 병렬 처리를 제공하는 것입니다.
    - 여러 server에 partition을 분산시켜 단일 server의 용량 제한을 극복하고 처리량을 높일 수 있습니다.
    - 각 partition은 Kafka cluster의 여러 broker에 분산되어 저장될 수 있습니다.

- partition의 수는 topic 생성 시 설정할 수 있으며, 나중에 증가시킬 수는 있지만 줄일 수는 없습니다.

- 각 partition은 Kafka cluster 내의 하나의 broker가 leader 역할을 하며, 다른 broker들은 follower로 data를 복제합니다.
    - 이러한 복제 메커니즘은 fault tolerance를 제공합니다.


### Record : Data의 기본 단위

- **record**(또는 **message**)는 **Kafka에서 처리되는 data의 기본 단위**입니다.

- record는 **key, value, timestamp로 구성**됩니다.
    - **key** : record를 특정 partition에 할당하는 데 사용됩니다.
        - 선택적으로 사용되며, key가 없는 경우 round-robin 방식으로 partition이 선택됩니다.
    - **value** : 실제 data 내용을 담고 있습니다.
    - **timestamp** : record가 생성된 시간을 나타냅니다.

- record는 생성되면 topic의 특정 partition에 추가되며, 한 번 기록된 record는 변경되지 않습니다(immutable).

- record는 partition 내에서 순차적으로 저장되며, 각 record는 해당 partition 내에서 고유한 offset을 가집니다.
    - offset은 0부터 시작하여 증가하는 정수값으로, consumer가 partition 내에서 자신의 위치를 추적하는 데 사용됩니다.


---


## 상관 관계

- topic과 partition의 관계 : 1:N
    - 하나의 topic은 여러 partition으로 구성됩니다.
    - partition 수는 topic의 병렬 처리 능력을 결정합니다.
- partition과 record의 관계 : 1:N
    - 하나의 partition은 여러 record를 순차적으로 저장합니다.
    - 각 partition 내에서 record는 순서가 보장되지만, partition 간에는 순서가 보장되지 않습니다.
- record와 key의 관계 : N:1
    - 동일한 key를 가진 record는 항상 같은 partition에 저장됩니다.
    - key가 null인 경우, round-robin 방식으로 partition에 분배됩니다.
- broker와 partition의 관계 : 1:N
    - 하나의 broker는 여러 partition을 관리할 수 있습니다.
    - 각 partition은 하나의 leader broker와 여러 follower broker가 관리합니다.


### Topic과 Partition의 개념적 차이




---


## Data 흐름

1. producer는 특정 topic에 record를 발행합니다.

2. record는 key 해시 값에 따라 특정 partition에 배정됩니다.
    - key가 같은 record는 항상 같은 partition에 기록되므로, 특정 key 기반의 순서 보장이 필요한 경우 유용합니다.

3. broker는 record를 해당 partition에 추가하고 offset을 할당합니다.

4. consumer는 topic의 특정 partition을 구독하여 record를 순차적으로 읽어갑니다.
    - consumer는 자신이 마지막으로 읽은 offset을 기억하여 연속적인 처리를 보장합니다.






---








## 실제 적용 예시

- 다양한 scenario에서 topic, partition, record의 개념을 활용하여 messaging system을 구성할 수 있습니다.


### 예시 1. 실시간 Log 처리 System

- 각 application component의 log는 별도 topic으로 구성됩니다.
- log volume에 따라 적절한 수의 partition으로 나누어 처리 capacity를 확보합니다.
- service ID를 key로 사용하여 같은 service의 log는 항상 같은 partition에서 순서대로 처리됩니다.


### 예시 2. E-Commerce Platform

- 주문, 재고, 배송 등 각 업무 영역별로 별도 topic을 구성합니다.
- 고객 ID를 key로 사용하여 같은 고객의 주문 이벤트가 순서대로 처리되도록 보장합니다.
- 처리량이 많은 주문 topic은 partition을 더 많이 할당하여 병렬 처리 capacity를 높입니다.




---


## Reference

- <https://velog.io/@jwpark06/Kafka-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%A1%B0-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0>
