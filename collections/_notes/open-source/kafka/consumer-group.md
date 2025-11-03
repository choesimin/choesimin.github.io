---
layout: note
permalink: /248
title: Kafka Consumer Group - 병렬 처리와 Offset 관리
description: Kafka의 consumer group은 여러 consumer가 topic을 병렬로 소비하고, 각자의 offset을 관리하여 독립적인 message 처리를 가능하게 합니다.
date: 2025-11-03
published: false
---


## Kafka Consumer Group

- consumer group은 **하나의 topic을 공동으로 소비하는 consumer의 논리적 집합**입니다.
- consumer group을 통해 message 처리의 병렬성과 고가용성을 확보할 수 있습니다.
- 각 consumer group은 독립적으로 offset을 관리하여 동일한 topic을 서로 다른 목적으로 소비할 수 있습니다.


---


## Consumer Group의 특징

- consumer group은 `group.id`로 식별됩니다.
    - 동일한 `group.id`를 가진 consumer들이 하나의 group을 구성합니다.
    - 서로 다른 `group.id`를 가진 consumer들은 독립적으로 동작합니다.

- 각 consumer group은 topic의 모든 partition을 구독하지만, 각 partition은 group 내 하나의 consumer에만 할당됩니다.
    - partition 할당을 통해 message 중복 처리를 방지합니다.
    - 동일한 message를 여러 consumer가 동시에 처리하지 않습니다.

- consumer 수와 partition 수의 관계에 따라 처리 효율이 달라집니다.
    - **consumer 수 ≤ partition 수** : 모든 consumer가 활성화되어 병렬 처리합니다.
    - **consumer 수 > partition 수** : 초과하는 consumer는 유휴 상태가 되어 대기합니다.

- 서로 다른 consumer group은 동일한 topic을 독립적으로 소비할 수 있습니다.
    - 예를 들어, `analytics` group과 `billing` group이 같은 `order` topic을 각자의 목적으로 처리합니다.


---


## Partition 할당과 Rebalancing

- consumer group 내에서 partition을 consumer에게 할당하는 과정을 **partition assignment**라고 합니다.
    - partition assignment는 group coordinator가 관리합니다.
    - 기본 할당 전략은 `RangeAssignor`, `RoundRobinAssignor`, `StickyAssignor` 등이 있습니다.

- **rebalancing**은 consumer 추가/제거 시 partition을 재할당하는 과정입니다.
    - 새로운 consumer가 group에 join하면 rebalancing이 발생합니다.
    - 기존 consumer가 장애로 종료되거나 heartbeat를 보내지 못하면 rebalancing이 발생합니다.
    - topic의 partition 수가 변경되어도 rebalancing이 발생합니다.

- rebalancing 동안 모든 consumer는 일시적으로 message 소비를 중단합니다.
    - rebalancing은 가능한 한 최소화해야 합니다.
    - `session.timeout.ms`와 `heartbeat.interval.ms` 설정을 통해 불필요한 rebalancing을 방지할 수 있습니다.

- **cooperative rebalancing**(증분 재조정)을 사용하면 일부 consumer만 영향을 받습니다.
    - eager rebalancing과 달리, 모든 consumer가 중단되지 않습니다.
    - Kafka 2.4 이후부터 지원됩니다.


---


## Offset 관리

- **offset**은 partition 내 각 message의 고유 식별자입니다.
    - 0부터 시작하여 순차적으로 증가하는 정수값입니다.
    - consumer는 offset을 통해 자신이 읽은 위치를 추적합니다.

- consumer는 처리한 message의 offset을 **commit**하여 진행 상태를 기록합니다.
    - commit된 offset은 `__consumer_offsets` internal topic에 저장됩니다.
    - consumer 재시작 시 마지막으로 commit한 offset부터 다시 시작합니다.

- offset commit 방식은 **자동 commit**과 **수동 commit** 두 가지가 있습니다.
    - **자동 commit** : `enable.auto.commit=true` 설정으로 주기적으로 자동 commit합니다.
    - **수동 commit** : application code에서 명시적으로 `commitSync()` 또는 `commitAsync()`를 호출합니다.

- **자동 commit**은 편리하지만 message 중복이나 손실 위험이 있습니다.
    - `auto.commit.interval.ms` 주기마다 자동으로 commit됩니다.
    - 처리 중 장애 발생 시 일부 message가 재처리되거나 누락될 수 있습니다.

- **수동 commit**은 정확한 제어가 가능하지만 구현이 복잡합니다.
    - message 처리 완료 후 명시적으로 commit하여 정확성을 보장합니다.
    - `commitSync()`는 blocking 방식, `commitAsync()`는 non-blocking 방식입니다.


---


## Message 전달 보장 수준

- offset 관리 방식에 따라 다양한 message 전달 보장(delivery guarantee) 수준을 제공합니다.


### At Most Once

- message를 읽은 직후 offset을 commit하고, 이후에 처리합니다.
    - 처리 중 장애 발생 시 message가 손실될 수 있습니다.
    - message 손실은 허용하지만 중복 처리는 절대 발생하지 않습니다.

- 가장 빠른 처리 속도를 제공하지만, 신뢰성이 가장 낮습니다.


### At Least Once

- message를 처리한 후에 offset을 commit합니다.
    - 처리 완료 후 commit 전에 장애 발생 시 message가 재처리됩니다.
    - message 중복 처리가 발생할 수 있지만, 손실은 발생하지 않습니다.

- 가장 일반적으로 사용되는 방식입니다.
    - application에서 idempotent(멱등성) 처리를 구현하여 중복을 해결합니다.


### Exactly Once

- transaction을 사용하여 정확히 한 번 처리를 보장합니다.
    - Kafka transaction API와 idempotent producer를 함께 사용합니다.
    - message 처리와 offset commit을 하나의 atomic operation으로 묶습니다.

- 가장 높은 신뢰성을 제공하지만, 성능 overhead가 있습니다.
    - `isolation.level=read_committed` 설정이 필요합니다.


---


## Group Coordinator와 Heartbeat

- **group coordinator**는 consumer group을 관리하는 broker입니다.
    - 각 consumer group마다 하나의 broker가 coordinator 역할을 담당합니다.
    - partition assignment와 rebalancing을 조정합니다.

- consumer는 주기적으로 group coordinator에게 **heartbeat**를 보냅니다.
    - heartbeat를 통해 consumer가 정상 동작 중임을 알립니다.
    - `heartbeat.interval.ms` 주기마다 heartbeat를 전송합니다.

- `session.timeout.ms` 시간 동안 heartbeat를 받지 못하면 coordinator는 해당 consumer를 제거합니다.
    - 제거된 consumer의 partition은 rebalancing을 통해 다른 consumer에게 재할당됩니다.

- `max.poll.interval.ms`는 poll 호출 간 최대 시간 간격입니다.
    - 이 시간 내에 poll을 호출하지 않으면 consumer는 dead 상태로 간주됩니다.
    - 긴 처리 시간이 필요한 경우 이 값을 증가시켜야 합니다.


---


## Reference

- <https://www.popit.kr/kafka-consumer-group/>
- <https://kafka.apache.org/documentation/#consumerconfigs>

