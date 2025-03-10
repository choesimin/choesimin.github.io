---
layout: skill
permalink: /299
title: Kafka Architecture - Cluster, Broker, Topic, Partition, Segment
description: Kafka는 cluster, broker, topic, partition, segment로 이루어져 있습니다.
date: 2025-03-10
---


## Kafka Architecture

- Kafka는 cluster, broker, topic, partition, segment로 이루어져 있습니다.
    - cluster는 broker로, broker는 topic으로, topic은 partition으로, partition은 segment로 이루어져 있습니다.

| 요소 | 설명 | 구성 |
| --- | --- | --- |
| **Cluster** | 전체 Kafka system | 여러 broker로 구성 |
| **Broker** | 각 server instance | Kafka 본체 |
| **Topic** | 논리적 data stream | 분할된 partition으로 구성 |
| **Partition** | 병렬 처리를 위한 topic의 분할 단위 | 여러 segment로 구성 |
| **Segment** | 실제 disk에 저장되는 data file | append-only file |

```txt
                +--------- Kafka Cluster ---------+
                |                                 |
+---------------+----------------+----------------+---------------+
|           Broker 1             |            Broker 2            |
|                                |                                |
|   +---------------------------------------------------------+   |
|   |                         Topic A                         |   |
|   |                            .                            |   |
|   |  +----------------------+  .  +----------------------+  |   |
|   |  |      Partition 0     |  .  |      Partition 1     |  |   |
|   |  |                      |  .  |                      |  |   |
|   |  | +------------------+ |  .  | +------------------+ |  |   |
|   |  | |     Segment 1    | |  .  | |     Segment 1    | |  |   |
|   |  | +------------------+ |  .  | +------------------+ |  |   |
|   |  | +------------------+ |  .  | +------------------+ |  |   |
|   |  | |     Segment 2    | |  .  | |     Segment 2    | |  |   |
|   |  | +------------------+ |  .  | +------------------+ |  |   |
|   |  +----------------------+  .  +----------------------+  |   |
|   +---------------------------------------------------------+   |
|                                |                                |
|                                |                                |
|   +---------------------------------------------------------+   |
|   |                         Topic B                         |   |
|   |                            .                            |   |
|   |  +----------------------+  .  +----------------------+  |   |
|   |  |      Partition 0     |  .  |      Partition 1     |  |   |
|   |  |                      |  .  |                      |  |   |
|   |  | +------------------+ |  .  | +------------------+ |  |   |
|   |  | |     Segment 1    | |  .  | |     Segment 1    | |  |   |
|   |  | +------------------+ |  .  | +------------------+ |  |   |
|   |  | +------------------+ |  .  | +------------------+ |  |   |
|   |  | |     Segment 2    | |  .  | |     Segment 2    | |  |   |
|   |  | +------------------+ |  .  | +------------------+ |  |   |
|   |  | +------------------+ |  .  |                      |  |   |
|   |  | |     Segment 3    | |  .  |                      |  |   |
|   |  | +------------------+ |  .  |                      |  |   |
|   |  +----------------------+  .  +----------------------+  |   |
|   +---------------------------------------------------------+   |
|                                |                                |
+--------------------------------+--------------------------------+
```

- topic은 실제로 물리적 개체가 아닌 논리적 개념이며, 여러 broker에 분산된 partition들의 모음입니다.
    - 사용자는 topic에 data를 저장하지만, 물리적인 저장 관점에서는 data는 실제로 partition에 저장됩니다.
        - 더 정확히는 partition 안의 segment file에 저장됩니다.
        - 각 partition은 disk의 directory와 file 집합으로 구현됩니다.
    - 예를 들어, "order" topic이 3개의 partition으로 구성되어 있다면, partition 0은 broker 1에, partition 1은 broker 2에, partition 2는 broker 3에 분산되어 저장할 수 있습니다.
        - 각 broker는 자신에게 할당된 partition들만 관리하고, Kafka client(producer)가 "order" topic으로 message를 보내면 특정 partition으로 routing됩니다.
    - data를 topic에 저장할 때, 실제로는 어떤 partition에 저장할지, routing 규칙을 정할 수 있습니다.

- broker(server)에는 물리적으로 partition만 존재하기 때문에, topic은 여러 broker에 걸쳐서 존재합니다.
    - topic은 broker에 직접 존재하지 않습니다.


---


## Cluster

- Kafka cluster는 **여러 개의 broker로 구성된 Kafka server 집합**입니다.

- cluster 내의 broker들은 서로 통신하며 data를 복제(replication)하고 장애에 대응합니다.

- cluster는 zookeeper 또는 KRaft(Kafka Raft)를 통해 broker 간에 필요한 조정 작업을 하고, 상태를 관리합니다.
    - zookeeper는 cluster 구성, broker 상태, topic 구성 등의 metadata를 관리합니다.
    - KRaft는 Apache Kafka 3.0부터 도입된 zookeeper 대체 기술입니다.

- cluster 구성을 통해 **고가용성과 확장성을 확보**할 수 있습니다.
    - broker 장애 시에도 service 중단 없이 운영이 가능합니다.
    - 부하 증가 시 broker를 추가하여 수평적 확장이 가능합니다.

- cluster 내에서는 **leader election**을 통해 각 partition의 leader broker를 선정합니다.
    - **leader broker**는 해당 partition에 대한 읽기와 쓰기를 담당합니다.
    - **follower broker**는 leader의 data를 복제하여 고가용성을 보장합니다.


---


## Broker

- broker는 **Kafka cluster를 구성하는 개별 server node**입니다.

- 각 broker는 고유한 ID를 가지며 독립적인 process로 실행됩니다.

- broker는 **할당된 partition들을 disk에 저장하고 관리**합니다.
    - partition의 data를 저장하고 client의 읽기/쓰기 요청을 처리합니다.
    - partition에 대한 offset 관리와 consumer group의 offset 정보도 관리합니다.

- broker는 client의 요청을 처리하기 위한 network thread pool을 가집니다.

- **broker는 cluster controller와 통신**하여 상태를 보고하고 명령을 수신합니다.
    - **controller는 cluster 내의 한 broker가 담당**하며, broker 장애 감지, leader 재선출 등의 역할을 맡습니다.

- 각 broker는 cluster 내 모든 topic과 partition에 대한 metadata를 가지고 있습니다.
    - client가 어떤 broker에 연결하든 전체 cluster에 접근할 수 있습니다.

- broker는 data의 retention policy를 적용하여 **오래된 data를 자동으로 삭제**합니다.
    - retention period, size 등의 설정에 따라 segment 관리가 이루어집니다.


---


## Topic

- topic은 Kafka에서 **특정 유형의 message stream을 나타내는 논리적 단위**입니다.

- topic은 **실제 물리적 entity가 아니라 partition들의 논리적 집합**입니다.
    - **동일한 topic의 partition들이 여러 broker에 분산 저장**됩니다.

- topic은 이름으로 식별되며, producer와 consumer는 이 이름을 통해 data를 생산하거나 소비합니다.

- topic은 특정 business domain이나 데이터 유형에 맞게 생성됩니다.
    - `order_events`, `user_registrations`, `payment_transactions` 등.

- **topic 생성 시, partition 수나 replication factor 등의 설정값을 지정**할 수 있습니다.
    - **partition 수**는 **병렬 처리 수준**과 관련이 있습니다.
    - **replication factor**는 data 복제본 수로, **고가용성**과 관련이 있습니다.

- topic은 schema를 강제하지 않지만, schema registry를 통해 message 형식을 관리할 수 있습니다.
    - schema registry를 사용하면, producer와 consumer가 동일한 schema를 사용하도록 보장할 수 있습니다.

- topic은 **read/write가 모두 가능한 일반 topic**과 **compact topic**으로 구분됩니다.
    - **compact topic은 key 기반으로 동일한 key를 가진 최신 message만 유지하는 특수 topic**입니다.


---


## Partition

- partition은 **topic의 data를 병렬로 처리하기 위한 물리적 분할 단위**입니다.

- 각 partition은 순서가 보장된 message sequence이며, **불변의(imutable) append-only log로 구현**됩니다.
    - append-only log가 곧 segment file입니다.

- partition은 **disk의 directory로 표현**되며, 내부에 여러 segment file들이 존재합니다.

- partition 내 각 message는 offset이라는 고유한 sequence 번호를 가집니다.
    - offset은 0부터 시작하여 증가하는 정수값입니다.
    - consumer는 이 offset을 통해 partition 내에서 위치를 추적합니다.

- **partition은 broker 간에 분산되어 저장**됩니다.
    - topic의 전체 throughput은 partition 수에 비례하여 증가할 수 있습니다.

- 각 partition은 **하나의 leader와 여러 follower로 구성**됩니다.
    - **leader partition은 모든 읽기와 쓰기 작업을 처리**합니다.
    - **follower partition은 leader partition의 data를 복제**합니다.

- **partition 수는 topic 생성 시 결정**되며, **이후 증가만 가능**합니다.
    - partition 수를 줄이는 것은 data 손실 위험이 있어 직접적으로 지원되지 않습니다.

- message가 topic으로 전송될 때, partition key에 따라 혹은 round-robin 방식으로 특정 partition에 할당(routing)됩니다.
    - partition key를 지정하지 않으면, 자동으로 round-robin 방식으로 partition이 선택됩니다.


---


## Segment

- segment는 **partition data가 실제로 저장되는 물리적 file**입니다.

- partition은 여러 segment file로 구성되며, 각 segment는 **일정 크기나 시간에 따라 생성**됩니다.

- segment는 두 가지 주요 file로 구성됩니다.
    - **Log file**(`.log`) : 실제 message data가 저장되는 file입니다.
    - **Index file**(`.index`) : log file 내의 message offset에 빠르게 접근하기 위한 색인 file입니다.

- **segment 생성 조건**은 `log.segment.bytes`(기본값 1GB)나 `log.segment.ms` 설정에 따라 결정됩니다.
    - 현재 segment가 지정된 크기에 도달하거나 시간이 경과하면 새 segment를 생성합니다.

- segment file 이름은 base offset(segment 내 첫 message의 offset)을 사용합니다.
    - `00000000000000000000.log`, `00000000000045678912.log` 등.

- segment는 **활성 segment와 비활성 segment로 구분**됩니다.
    - **활성(active) segment**는 현재 쓰기가 발생하는 가장 최신의 segment입니다.
    - **비활성(inactive) segment**는 이전 segment로, 더 이상 쓰기가 발생하지 않습니다.

- segment는 **retention policy에 따라 자동 삭제**됩니다.
    - **시간 기반**(`log.retention.hours`)이나 **크기 기반**(`log.retention.bytes`) 설정이 가능합니다.

- **오래된 segment**는 **compaction이나 deletion 정책에 따라 처리**됩니다.
    - **deletion** : 단순히 오래된 segment를 삭제합니다.
    - **compaction** : 동일한 key를 가진 message 중 최신 값만 유지합니다.


---


## Reference

- <https://curiousjinan.tistory.com/entry/understanding-kafka-all-structure>
