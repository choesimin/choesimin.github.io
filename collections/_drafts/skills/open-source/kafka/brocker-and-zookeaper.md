---
layout: skill
title: Kafka Broker와 ZooKeeper
date: 2025-03-02
---


## Kafka Broker : Kafka cluster 구성 단위

## Broker 역할과 구성

- broker는 Kafka cluster를 구성하는 server로, message 저장과 전달을 담당합니다.

- broker는 독립된 server로 작동하며, 여러 broker가 모여 하나의 Kafka cluster를 형성합니다.

- broker는 topic partition을 관리하고 저장합니다.
    - 각 broker는 특정 partition의 leader 또는 follower 역할을 수행합니다.
    - leader는 해당 partition에 대한 모든 읽기와 쓰기 요청을 처리합니다.
    - follower는 leader의 data를 복제하여 고가용성을 보장합니다.

- broker는 고유한 ID를 가지며, ID를 통해 Kafka cluster 내에서 식별됩니다.

- broker는 client의 연결 요청을 수락하고, 메시지의 생산과 소비를 관리합니다.

- broker는 message를 disk에 저장하므로 crash가 발생해도 data 손실을 방지합니다.

- broker는 load balancing을 통해 cluster 내 resource를 효율적으로 사용합니다.


---


## Brocker와 ZooKeeper의 관계

- ZooKeeper는 Kafka cluster의 metadata를 관리하는 분산 coordination service입니다.

- ZooKeeper는 broker의 상태를 관리하고 변화를 감지합니다.
    - broker가 추가되거나 제거될 때 이를 감지하고 cluster에 알립니다.
    - broker 장애 발생 시 자동으로 감지하여 leader election을 수행합니다.

- ZooKeeper는 topic 구성 정보를 저장합니다.
    - topic 생성, 삭제, 설정 변경 등의 정보를 유지합니다.

- ZooKeeper는 consumer group의 offset 정보를 관리합니다.
    - Kafka 0.9 버전 이전에는 consumer offset을 ZooKeeper에 저장했습니다.
    - 현재는 내부 topic인 `__consumer_offsets`에 저장하지만, ZooKeeper는 여전히 중요한 역할을 수행합니다.

- ZooKeeper는 quorum 방식으로 동작하며, 일반적으로 홀수 개의 server로 구성됩니다.

- Kafka 3.0 이상 버전부터는 ZooKeeper 없이 동작하는 KRaft(Kafka Raft) mode가 도입되었습니다.
    - KRaft는 ZooKeeper 대신 Raft consensus algorithm을 사용하여 metadata를 관리합니다.



