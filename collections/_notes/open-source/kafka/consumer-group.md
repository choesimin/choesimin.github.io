---
layout: note
permalink: /248
title: Kafka Consumer Group - 여러 Consumer들을 체계적으로 관리하기
description: Kafka의 consumer group은 여러 consumer를 하나의 논리적 단위로 묶어 partition을 분배하고, 장애 발생 시 자동으로 재조정하여 안정적인 message 처리를 제공합니다.
date: 2025-11-03
published: false
---


## Consumer Group

- **consumer group**은 동일한 topic을 함께 소비하는 consumer들의 논리적 집합입니다.
    - 여러 consumer를 하나의 단위로 묶어 병렬 처리와 고가용성을 제공합니다.
    - 각 consumer group은 `group.id`로 식별됩니다.

- consumer group의 핵심 기능은 **partition 분배**와 **장애 대응**입니다.
    - group 내 consumer들에게 partition을 자동으로 분배합니다.
    - consumer 추가/제거 시 partition을 자동으로 재분배합니다.
    - 각 partition은 group 내 하나의 consumer에만 할당되어 중복 처리를 방지합니다.

- 서로 다른 consumer group은 동일한 topic을 독립적으로 소비할 수 있습니다.
    - 예를 들어, `analytics` group과 `billing` group이 같은 `order` topic을 각자의 목적으로 처리합니다.
    - 각 group은 독립적인 offset을 관리하여 서로 영향을 주지 않습니다.


---


## Consumer Group의 구성 요소

- consumer group은 consumer, group coordinator, partition assignment로 구성됩니다.


### Consumer

- group에 속한 개별 message 소비자입니다.
    - 각 consumer는 할당받은 partition에서 message를 읽어 처리합니다.
    - 동일한 `group.id`를 설정하여 group에 참여합니다.

- consumer 수와 partition 수의 관계에 따라 처리 효율이 달라집니다.
    - **consumer 수 ≤ partition 수** : 모든 consumer가 활성 상태로 병렬 처리합니다.
    - **consumer 수 > partition 수** : 초과하는 consumer는 유휴 상태로 대기합니다.


### Group Coordinator

- consumer group을 관리하는 Kafka broker입니다.
    - 각 consumer group마다 하나의 broker가 coordinator 역할을 담당합니다.
    - partition 할당과 rebalancing을 조정합니다.
    - consumer의 상태를 모니터링합니다.


### Partition Assignment

- group 내 consumer들에게 partition을 분배하는 방식입니다.
    - coordinator가 할당 전략(assignor)을 사용하여 partition을 분배합니다.
    - 각 partition은 group 내 하나의 consumer에만 할당됩니다.


---


## Consumer Group이 Consumer를 관리하는 방법

- consumer group은 **partition 할당**, **상태 모니터링**, **자동 재조정**을 통해 consumer를 관리합니다.


### Partition 할당

- consumer group은 할당 전략(assignor)을 사용하여 partition을 consumer에게 분배합니다.
    - consumer가 group에 join하면 coordinator가 할당 전략을 실행합니다.
    - 각 consumer는 할당받은 partition에서만 message를 읽습니다.

#### RangeAssignor

- topic별로 partition을 순차적으로 분배합니다.
    - topic의 partition을 순서대로 정렬한 후, consumer 수로 나누어 할당합니다.
    - 예: partition 0-2는 consumer 1에게, partition 3-5는 consumer 2에게 할당합니다.

- partition 수가 consumer 수로 나누어떨어지지 않으면 앞쪽 consumer에게 더 많이 할당됩니다.
- 여러 topic을 구독할 때 특정 consumer에게 partition이 집중될 수 있습니다.

#### RoundRobinAssignor

- 모든 topic의 partition을 순환 방식으로 분배합니다.
    - 모든 topic의 partition을 하나의 pool로 모아서 순서대로 할당합니다.
    - 예: consumer 1에게 topic A partition 0, topic B partition 0을 할당하고, consumer 2에게 topic A partition 1, topic B partition 1을 할당합니다.

- RangeAssignor보다 균등한 분배가 가능합니다.

#### StickyAssignor

- 기존 할당을 최대한 유지하면서 균등하게 분배합니다.
    - 첫 할당은 RoundRobinAssignor와 유사합니다.
    - 재할당 시 기존 consumer-partition mapping을 최대한 보존합니다.

- partition 이동을 최소화하여 중단 시간을 줄입니다.
- consumer의 local state를 보존할 수 있습니다.

#### CooperativeStickyAssignor

- StickyAssignor에 cooperative rebalancing을 적용한 전략입니다.
    - Kafka 2.4부터 도입되었습니다.
    - Kafka 3.0부터 기본 전략으로 사용됩니다.


### 상태 모니터링

- consumer group은 heartbeat를 통해 consumer의 상태를 모니터링합니다.

#### Heartbeat

- consumer는 주기적으로 group coordinator에게 heartbeat를 보냅니다.
    - heartbeat를 통해 consumer가 정상 동작 중임을 알립니다.
    - `heartbeat.interval.ms` 주기마다 전송됩니다. (기본값: 3초)

- coordinator는 `session.timeout.ms` 시간 동안 heartbeat를 받지 못하면 해당 consumer를 제거합니다.
    - 기본값은 10초입니다.
    - 제거된 consumer의 partition은 다른 consumer에게 재할당됩니다.

#### Poll Timeout

- `max.poll.interval.ms`는 poll 호출 간 최대 시간 간격입니다.
    - 기본값은 5분입니다.
    - 이 시간 내에 poll을 호출하지 않으면 consumer는 dead 상태로 간주됩니다.

- message 처리 시간이 긴 경우 이 값을 증가시켜야 합니다.
- 적절한 값으로 설정하여 실제 hang과 느린 처리를 구분해야 합니다.


### Rebalancing

- **rebalancing**은 consumer group의 구성원이 변경될 때 partition을 재할당하는 과정입니다.
    - consumer의 추가/제거 시 자동으로 발생합니다.
    - partition을 재분배하여 모든 partition이 활성 consumer에게 할당되도록 보장합니다.

#### Rebalancing 발생 조건

- 새로운 consumer가 group에 join하면 rebalancing이 발생합니다.
- 기존 consumer가 장애로 종료되거나 heartbeat를 보내지 못하면 rebalancing이 발생합니다.
- consumer가 `max.poll.interval.ms` 내에 poll을 호출하지 않으면 rebalancing이 발생합니다.
- topic의 partition 수가 변경되어도 rebalancing이 발생합니다.
- consumer가 구독하는 topic list가 변경될 때도 rebalancing이 발생합니다.

#### Eager Rebalancing

- **eager rebalancing**(stop-the-world rebalancing)은 전통적인 방식입니다.
    - rebalancing 시작 시 모든 consumer가 partition 소유권을 포기합니다.
    - coordinator가 새로운 partition assignment를 계산합니다.
    - 모든 consumer에게 새로운 partition을 재할당합니다.

- rebalancing 동안 전체 consumer group의 message 처리가 중단됩니다.

#### Cooperative Rebalancing

- **cooperative rebalancing**(incremental rebalancing)은 점진적 재조정 방식입니다.
    - 영향받는 partition만 재할당하고, 나머지는 계속 동작합니다.
    - 여러 단계(phase)로 나누어 점진적으로 재조정합니다.

- 첫 번째 phase에서 재할당이 필요한 partition을 식별합니다.
- 두 번째 phase에서 해당 partition만 재할당합니다.
- 대부분의 consumer는 계속해서 message를 처리할 수 있습니다.

- eager rebalancing보다 중단 시간을 크게 줄입니다.
    - 전체 group이 아닌 일부 consumer만 영향을 받습니다.
    - Kafka 2.4 이후부터 지원되며, Kafka 3.0부터 기본값으로 사용됩니다.

#### Rebalancing 최적화

- rebalancing은 가능한 한 최소화해야 합니다.
    - rebalancing 중에는 해당 partition의 message 처리가 중단됩니다.
    - 빈번한 rebalancing은 전체 처리량을 감소시킵니다.

- `session.timeout.ms` 설정으로 불필요한 rebalancing을 방지할 수 있습니다.
    - 너무 짧으면 일시적 network 문제로 rebalancing이 발생합니다.
    - 너무 길면 실제 장애 consumer를 감지하는 시간이 길어집니다.

- `heartbeat.interval.ms` 설정으로 heartbeat 주기를 조정할 수 있습니다.
    - `session.timeout.ms`의 1/3 정도로 설정하는 것이 권장됩니다.
    - 짧게 설정하면 더 빠르게 consumer 상태를 감지할 수 있습니다.

- `max.poll.interval.ms` 설정으로 처리 시간 제한을 조정할 수 있습니다.
    - message 처리 시간이 긴 경우 이 값을 증가시켜야 합니다.
    - 적절한 값으로 설정하여 실제 hang과 느린 처리를 구분해야 합니다.

- **static membership**을 사용하면 재시작 시 rebalancing을 줄일 수 있습니다.
    - `group.instance.id`를 설정하여 consumer에게 고정된 identity를 부여합니다.
    - consumer 재시작 시 `session.timeout.ms` 이내에 복귀하면 rebalancing이 발생하지 않습니다.
    - 배포나 재시작 시 rebalancing overhead를 줄일 수 있습니다.


---


## Reference

- <https://www.popit.kr/kafka-consumer-group/>
- <https://kafka.apache.org/documentation/#consumerconfigs>

