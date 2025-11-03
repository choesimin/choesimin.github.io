---
layout: note
permalink: /249
title: Kafka Replication Factor - 고가용성과 Data 복제
description: Kafka의 replication factor는 partition을 여러 broker에 복제하여 장애 발생 시에도 data 손실 없이 service를 지속할 수 있게 합니다.
date: 2025-11-03
published: false
---


## Kafka Replication Factor

- replication factor는 각 partition을 몇 개의 broker에 복제할지 결정하는 설정입니다.
- partition 복제를 통해 broker 장애 시에도 data 손실 없이 service를 지속할 수 있습니다.
- replication factor는 고가용성(high availability)과 내결함성(fault tolerance)의 핵심 mechanism입니다.


---


## Replication Factor의 작동 원리

- replication factor가 N이면, 각 partition은 N개의 broker에 복제됩니다.
    - 하나의 broker가 **leader** 역할을 하고, 나머지 N-1개는 **follower** 역할을 합니다.
    - 각 partition마다 독립적으로 leader와 follower가 선정됩니다.

- **leader replica**는 모든 읽기와 쓰기 요청을 처리합니다.
    - producer가 message를 쓸 때 leader partition에 기록됩니다.
    - consumer가 message를 읽을 때도 기본적으로 leader partition에서 읽습니다.

- **follower replica**는 leader의 data를 지속적으로 복제합니다.
    - follower는 leader로부터 message를 fetch하여 자신의 log에 저장합니다.
    - follower는 직접적인 읽기/쓰기 요청을 처리하지 않고, 오직 복제만 수행합니다.

- leader broker가 실패하면 follower 중 하나가 새로운 leader로 자동 선출됩니다.
    - 이 과정을 **leader election**이라고 합니다.
    - cluster controller가 leader election을 관리합니다.


---


## In-Sync Replicas (ISR)

- **ISR**(In-Sync Replicas)는 leader와 동기화된 상태를 유지하는 replica 집합입니다.
    - leader는 항상 ISR에 포함됩니다.
    - follower가 leader와의 동기화를 유지하면 ISR에 포함됩니다.

- follower가 ISR에 포함되려면 다음 조건을 만족해야 합니다.
    - `replica.lag.time.max.ms` 시간 내에 leader로부터 message를 fetch해야 합니다.
    - follower가 leader의 최신 offset에 근접하게 따라가야 합니다.

- follower가 일정 시간 이상 lag를 보이면 ISR에서 제거됩니다.
    - network 문제나 follower broker의 성능 저하로 인해 발생할 수 있습니다.
    - ISR에서 제거된 follower는 다시 동기화되면 ISR에 재포함됩니다.

- leader는 ISR에 속한 모든 replica가 message를 복제한 후에만 commit 완료로 간주합니다.
    - 이 mechanism으로 data 일관성을 보장합니다.
    - ISR에 속하지 않는 follower는 leader election 시 leader 후보가 될 수 없습니다.


---


## `min.insync.replicas` 설정

- `min.insync.replicas`는 write 요청이 성공으로 간주되기 위해 필요한 최소 ISR 수를 지정합니다.

- 예를 들어, `min.insync.replicas=2`이고 `replication.factor=3`인 경우를 살펴봅니다.
    - 적어도 2개의 replica(leader 포함)가 message를 저장해야 write가 성공합니다.
    - 1개의 broker가 장애가 발생해도 여전히 2개의 ISR이 유지되어 write가 가능합니다.
    - 2개 이상의 broker가 장애 발생 시 ISR이 2개 미만이 되어 write가 실패합니다.

- `min.insync.replicas` 설정은 producer의 `acks` 설정과 함께 사용됩니다.
    - `acks=all` 또는 `acks=-1`로 설정해야 `min.insync.replicas`가 적용됩니다.
    - `acks=1`이면 leader만 확인하므로 `min.insync.replicas`가 무시됩니다.

- 적절한 `min.insync.replicas` 설정을 통해 data 내구성과 가용성의 균형을 맞출 수 있습니다.
    - 너무 높게 설정하면 가용성이 떨어집니다 (장애 시 write 불가).
    - 너무 낮게 설정하면 data 손실 위험이 증가합니다.


---


## Leader Election

- leader broker가 실패하면 ISR에 속한 follower 중 하나가 새로운 leader로 선출됩니다.
    - cluster controller가 leader election을 조정합니다.
    - 가장 up-to-date 상태인 follower가 우선적으로 선택됩니다.

- **clean leader election**은 ISR에 속한 replica만 leader가 될 수 있는 방식입니다.
    - data 손실이 없음을 보장합니다.
    - 모든 ISR replica가 down되면 partition이 unavailable 상태가 됩니다.

- **unclean leader election**은 ISR에 속하지 않은 replica도 leader가 될 수 있는 방식입니다.
    - `unclean.leader.election.enable=true` 설정으로 활성화됩니다.
    - 가용성을 우선하지만, 일부 data 손실이 발생할 수 있습니다.
    - production 환경에서는 일반적으로 비활성화하는 것이 권장됩니다.

- leader election 과정은 일반적으로 수 초 내에 완료됩니다.
    - election 동안 해당 partition은 일시적으로 unavailable 상태가 됩니다.


---


## Replication Factor 설정 권장 사항

- **production 환경에서는 replication factor를 3으로 설정하는 것이 일반적**입니다.
    - production 환경에서 가장 일반적으로 사용되는 값입니다.
    - 1개의 broker 장애를 허용하면서도 과도한 storage overhead를 피할 수 있습니다.

- replication factor를 결정할 때는 여러 요소를 고려해야 합니다.
    - **장애 허용 수준**은 replication factor N일 때 최대 N-1개의 broker 장애를 허용합니다.
    - **storage 비용**은 replication factor가 높을수록 더 많은 disk 공간이 필요합니다.
    - **network overhead**는 replica 간 data 전송으로 network 대역폭을 사용합니다.
    - **write latency**는 더 많은 replica에 복제할수록 증가할 수 있습니다.

- replication factor를 1로 설정하는 것은 권장되지 않습니다.
    - data 손실 위험을 감수할 수 있는 경우에만 사용합니다.
    - 개발 환경이나 임시 data에 적합합니다.
    - broker 장애 시 data가 영구적으로 손실됩니다.

- replication factor를 2로 설정하는 것은 일반적으로 권장되지 않습니다.
    - 최소한의 복제를 제공하지만, `min.insync.replicas=2` 설정 시 1개 broker 장애로도 write 불가능해집니다.
    - 일반적으로 권장되지 않습니다.

- replication factor를 4 이상으로 설정하는 것은 매우 중요한 data에 적합합니다.
    - 매우 중요한 data나 높은 가용성이 필요한 경우 사용합니다.
    - storage와 network overhead가 크게 증가합니다.


---


## Replication Factor 변경

- replication factor는 topic 생성 시 설정하지만, 나중에 변경할 수도 있습니다.

- `kafka-reassign-partitions.sh` 도구를 사용하여 변경합니다.
    - partition의 replica를 추가하거나 제거합니다.
    - 변경 과정에서 data가 재배치되므로 시간이 걸릴 수 있습니다.

- replication factor를 **증가**시키는 경우 : 새로운 replica가 leader로부터 data를 복제합니다.
    - 복제가 완료될 때까지 추가 network와 disk I/O가 발생합니다.

- replication factor를 **감소**시키는 경우 : 일부 replica가 제거됩니다.
    - 신중하게 진행해야 하며, data 손실 위험을 고려해야 합니다.


---


## Reference

- <https://kafka.apache.org/documentation/#replication>
- <https://www.confluent.io/blog/hands-free-kafka-replication-a-lesson-in-operational-simplicity/>

