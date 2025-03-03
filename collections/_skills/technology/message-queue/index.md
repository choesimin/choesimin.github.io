---
layout: skill
date: 2024-12-24
title: Message Queue - Data 전달 중개자
description: Message Queue는 System 간 비동기 통신을 위한 Message 중개 Middleware입니다.
---


## Message Queue

- Message Queue에서 Queue란 선입선출(FIFO, First-In-First-Out) 구조를 가진 자료 구조입니다.
    - Queue 는 2개의 끝을 가지며 각각은 입구와 출구입니다.
    - 새로운 data는 입구로 들어오고 나가는 data는 출구에서 나갑니다.

- 따라서 Message Queue란, Queue라는 자료 구조를 채택해서 message를 전달하는 system입니다.

- Message Queue에는 Message Queue 외에도 **Producer**와 **Consumer**가 있습니다.
    - Message Queue를 통해 message를 전달하려면, message를 전달하는 부분과 message를 받는 부분이 필요합니다.
    - **message를 발행하고 전달하는 부분을 Producer**라고 하고, **message를 받아서 소비하는 부분을 Consumer**라고 합니다.
    - Message Queue는 Producer와 Consumer 사이에서 message 전달 역할을 하는 매개체입니다.

```mermaid
flowchart LR

subgraph producer[Producer]
    service[Service]
end

subgraph consumer[Consumer]
    worker_1[Worker]
    worker_2[Worker]
    worker_3[Worker]
    worker_4[Worker]
end

queue>Message Queue]

service --> queue --> worker_1 & worker_2 & worker_3 & worker_4
```

- Message Queue는 **MSA(Microservice Architecture) System**의 전반적인 **안정성, 확장성, 유연성**을 높이는 데 핵심적인 역할을 합니다.
    1. **Service 간 느슨한 결합** (Loose Coupling) : service 간 의존성이 낮아집니다.
        - microservice들이 직접 통신하지 않고 Message Queue를 통해 비동기적으로 통신하기 때문입니다.
        - 한 service의 장애가 다른 service로 전파되는 것을 방지할 수 있습니다.
    2. **System 안정성과 신뢰성** (Reliability) : system의 안정성을 높여줍니다.
        - 일시적인 traffic 폭주 시에도 Message Queue가 buffer 역할을 수행하기 때문입니다.
        - message 손실 없이 reliable한 data 전달을 보장합니다.
    3. **확장성** (Scalability) : service들을 독립적으로 확장할 수 있습니다.
        - 처리량에 따라 consumer를 동적으로 늘리거나 줄일 수 있습니다.


### MOM에 속하는 Message Queue

- MOM(Message Oriented Middleware)이란 **응용 software 간의 비동기적 data 통신을 위한 software**입니다.
    - MOM은 **비동기적인(asynchronous) 방식**을 이용해서 process 간의 data를 주고 받는 기능을 위한 system입니다.

- message를 전달하는 과정에서 **message를 보관, routing, 변환**할 수 있다는 장점을 가집니다.
    - **보관** : message의 backup 기능을 유지함으로써 지속성을 제공하며, 이 덕분에 송수신 측은 동시에 network 연결을 유지할 필요가 없습니다.
    - **Routing** : middleware 계층 자신이 직접 message routing을 수행하기 때문에, 하나의 message를 여러 수신자에게 배포할 수 있습니다.
    - **변환** : 송수신 측의 요구에 따라 전달하는 message를 변환할 수 있습니다.

- Message Queue는 message 지향 Middleware(MOM)를 구현한 system입니다.


### Message Broker vs Event Broker : Data 운반 방식의 차이

- Message Queue가 message 혹은 event가 송신되고 수신되는 하나의 통신 통로라고 한다면, **broker는 Message Queue에 message 혹은 event를 넣어주고 중개하는 역할을 하는 주체**입니다.
    - Message Queue와 broker는 엄연히 다른 개념입니다.
        - 하지만 broker가 하는 일이 곧 Message Queue service가 하는 일이기 때문에, Message Queue 자체가 Message Broker 혹은 Event Broker라고 이해하여도 무방합니다.

#### Message Broker

- Message Broker는 **Producer가 생산한 message를 Message Queue에 저장**하고, **저장된 message를 Consumer가 가져갈 수 있도록** 합니다.
- Message Broker는 Consumer가 Message Queue에서 data를 가져가게 되면 **짧은 시간 내에 Message Queue에서 삭제**된다는 특징이 있습니다.
- RabbitMQ, ActiveMQ, AWS SQS, Redis 등이 Message Broker입니다.

#### Event Broker

- Event Broker가 관리하는 data는 message가 아니라 **event**라고 합니다.
- Event Broker는 **Message Broker보다 더 많은 용량의 data를 처리**할 수 있습니다.
- Event Broker 방식에서는 **Consumer가 소비한 data를 필요한 경우 다시 소비**할 수 있습니다.
    - Message Broker에서는 message를 Consumer가 가져가면, message를 짧은 시간 내에 삭제하기 때문에 재사용이 불가능합니다.
- Event Broker는 기본적으로 Message Broker의 역할을 할 수 있지만, 반대로 Message Broker는 Event Broker의 기능을 하지 못합니다.
- Kafka, Pulsar 등이 Event Broker입니다.


---


## Message Queue의 장점

- Message Queue는 message를 임시로 저장하고 중개하는 middleware로서의 특성 때문에, 도입 시 여러 이점을 얻을 수 있습니다.


### 비동기 처리 (Asynchronous Processing)

- Producer는 **Consumer의 처리 여부와 관계없이 message를 queue에 전송**할 수 있습니다.
    - Producer는 message를 queue에 전송한 후 즉시 다른 작업을 수행할 수 있어 resource 활용도가 높아집니다.
    - Consumer가 일시적으로 중단되거나 과부하 상태여도 message 전송에는 영향을 주지 않습니다.

- 동기 방식의 End-to-End 통신과 달리, **system 부하를 분산**시킬 수 있습니다.
    - 특히 비동기 처리 방식은 대용량 traffic 처리에 효과적입니다.
    - peak time의 급격한 traffic 증가도 queue를 통해 완충할 수 있습니다.
    - Consumer는 자신의 처리 능력에 맞춰 message를 소비할 수 있어 과부하를 방지합니다.


### 느슨한 결합 (Loose Coupling)

- **application 간의 직접적인 의존성을 제거**합니다.
    - Producer와 Consumer는 서로의 존재를 알 필요가 없으며, 오직 message 형식만 알면 됩니다.
    - 새로운 Consumer를 추가하거나 제거해도 Producer의 code 변경이 필요 없습니다.

- 각 service는 Message Queue를 통해서만 통신하므로 **독립적인 확장과 수정이 가능**합니다.
    - service 간 직접적인 API 호출이 없어 version 관리가 용이합니다.
    - 한 service의 변경이 다른 service에 영향을 주지 않습니다.

- **MSA(Microservices Architecture) 구현의 핵심 요소**입니다.
    - service 간 동기식 통신의 복잡성을 줄일 수 있습니다.
    - 각 microservice의 자율성과 독립성을 보장합니다.


### 탄력성 (Resilience)

- **system에 부하가 발생하거나 문제가 생겨도 안정적으로 작동**합니다.
    - message는 queue에 안전하게 보관되어 system 장애 시에도 손실되지 않습니다.
    - 부하 발생 시 자동으로 message 처리 속도를 조절할 수 있습니다.

- **장애 발생 시 자동으로 복구**하고 정상 상태로 돌아올 수 있습니다.
    - message 재전송 mechanism을 통해 실패한 처리를 자동으로 재시도합니다.
    - Dead Letter Queue를 통해 실패한 message를 별도로 관리하고 처리할 수 있습니다.

- 예기치 못한 상황에서도 **service의 연속성을 보장**합니다.
    - circuit breaker pattern과 결합하여 장애 전파를 방지합니다.
    - 부분적 장애가 전체 system 장애로 확대되는 것을 막습니다.


### 고가용성 (High Availability)

- **중복성** (Redundancy) : message를 여러 node에 복제하여 저장하고 장애 시 다른 node에서 처리가 가능합니다.
    - Active-Active 또는 Active-Standby 구성으로 무중단 service 운영이 가능합니다.
    - 지리적으로 분산된 data center 간에도 message 복제가 가능합니다.

- **내구성** (Durability) : message가 안전하게 저장되어 system 장애 시에도 손실되지 않고 재처리가 가능합니다.
    - Disk 저장을 통해 Memory 손실에도 message를 보존할 수 있습니다.
    - message 저장소의 backup과 복구 mechanism을 제공합니다.

- **장애 격리** (Fault Isolation) : system 일부에 문제가 생겨도 전체 system은 계속 작동할 수 있습니다.
    - 각 queue는 독립적으로 운영되어 한 queue의 장애가 다른 queue에 영향을 주지 않습니다.
    - 장애 발생 시 자동으로 다른 node로 전환되어 service가 중단되지 않습니다.


### 신뢰성 (Reliability)

- **message의 전달을 보장**합니다.
    - At-least-once, At-most-once, Exactly-once 등 다양한 전달 보장 수준을 제공합니다.
    - message 손실이나 중복 전송을 방지하는 mechanism을 제공합니다.

- **message 처리 상태를 추적**할 수 있습니다.
    - message의 생성, 전송, 수신, 처리 각 단계를 monitoring할 수 있습니다.
    - 문제 발생 시 원인 분석과 debugging이 용이합니다.

- 필요한 경우 **message 순서 보장도 가능**합니다.
    - FIFO(First-In-First-Out) Queue를 통해 message 순서를 유지할 수 있습니다.
    - message group별로 순서를 보장하는 기능을 제공합니다.


### 확장성 (Scalability)

- **Producer와 Consumer를 독립적으로 확장**할 수 있습니다.
    - 처리량에 따라 Producer나 Consumer의 instance를 개별적으로 증감할 수 있습니다.
    - load balancing을 통해 여러 Consumer 간에 작업을 분산할 수 있습니다.

- 처리량에 따라 **유연하게 system을 확장**할 수 있습니다.
    - queue의 partition 수를 조정하여 처리량을 증가시킬 수 있습니다.
    - auto scaling 설정으로 traffic 변화에 동적으로 대응할 수 있습니다.

- **수평적 확장(Horizontal Scaling)이 용이**합니다.
    - cluster에 node를 추가하여 전체 system 용량을 늘릴 수 있습니다.
    - sharding을 통해 대규모 data를 여러 node에 분산 저장할 수 있습니다.
    - cloud 환경에서 필요에 따라 resource를 동적으로 할당할 수 있습니다.


---


## Message Queue Solution 비교 : Redis, ActiveMQ, RabbitMQ, Kafka, Pulsar

- **Apache Kafka**는 **분산 streming platform**으로서, **대용량 실시간 data 처리**에 최적화되어 있습니다.
    - 특히 **높은 처리량과 확장성이 요구되는 big data 환경**에서 좋습니다.
    - **log 기반의 architecture**를 통해 **message의 영속성**을 보장하며, **수평적 확장이 용이**합니다.

- **Apache Pulsar**는 **차세대 messaging system**으로, **storage와 computing을 분리**한 현대적인 architecture를 제공합니다.
    - 다중 tenent 지원과 지리적 복제 기능이 기본으로 제공되어, **global 규모의 system에 적합**합니다.

- **RabbitMQ**는 **전통적인 Message Broker**로, **AMQP**(Advanced Message Queing Protocol)을 기반으로 다양한 messaging pattern을 지원합니다.
    - **microservice architecture에서 널리 사용**되며, **구축과 운영이 상대적으로 간단**합니다.

- **ActiveMQ**는 **JMS 표준을 완벽하게 구현한 Message Broker**입니다.
    - **Java 기반 enterprise 환경**에서 안정적인 messaging 기능을 제공하며, 다양한 protocol을 지원합니다.

- **Redis**는 **In-memory data store의 pub/sub 기능**을 통해 **경량화된 messaging 기능을 제공**합니다.
    - 간단한 messaging 요구 사항에 적합하며, **높은 성능**을 제공하지만 **message 영속성은 제한적**입니다.

|  | Kafka | Pulsar | RabbitMQ | ActiveMQ | Redis |
| --- | --- | --- | --- | --- | --- |
| **Messaging 모델** | 분산 log stream (event를 시간 순서대로 저장하는 log 중심 구조) | 분산 Pub/Sub (segment 기반 storage로 유연한 topic 관리) | AMQP 기반 Broker (Exchange를 통한 유연한 routing 지원) | JMS 기반 Broker (Point-to-Point와 Pub/Sub 모두 지원) | Pub/Sub (단순하지만 빠른 message 배포) |
| **최대 Message 크기** | 무제한 (기본 1MB, 설정으로 조정 가능) | 무제한 (기본 5MB, 설정으로 조정 가능) | 제한적 (기본 128MB, 성능 고려 시 1MB 이하 권장) | 제한적 (기본 64MB, Memory 제약 고려 필요) | 제한적 (기본 512MB, Memory 상황에 따라 제한) |
| **순서 보장** | Partition 단위 (partition 내에서만 순서 보장, key 설정으로 제어) | Partition 단위 (partition 내 순서 보장, key 기반 routing) | FIFO Queue 단위 (queue 단위로 완벽한 순서 보장) | FIFO Queue 단위 (queue 단위 순서 보장, 우선순위 설정 가능) | 미보장 (Pub/Sub 특성상 순서 보장이 어려움) |
| **영속성** | Disk 기반 (log segment file로 저장, 보관 기간 설정) | Disk 기반 (BookKeeper를 통한 분산 저장, 계층화된 storage) | Disk 기반 (Memory와 Disk 혼합 사용, transaction 지원) | Disk 기반 (KahaDB 저장소 사용, transaction 지원) | Memory 기반 (RDB/AOF로 선택적 영속성 제공) |
| **최대 처리량** | ~100만 msg/s (batch 처리로 높은 처리량 달성) | ~100만 msg/s (segment 기반 처리로 높은 확장성) | ~10만 msg/s (단일 node 기준, cluster로 확장 가능) | ~10만 msg/s (JVM 기반으로 처리량 제한) | ~100만 msg/s (In-memory 처리로 높은 성능) |
| **지연 시간** | Millisecond 단위 (batch 처리로 인한 추가 지연 발생 가능) | Millisecond 단위 (storage 계층으로 인한 약간의 overhead) | Microsecond 단위 (단순한 Broker 구조로 빠른 전달) | Millisecond 단위 (JVM 환경으로 인한 기본 지연 존재) | Microsecond 단위 (In-memory 처리로 매우 빠른 응답) |
| **Message 재전송** | 지원 (Consumer group과 offset 관리로 제어) | 지원 (구독 위치 추적으로 유연한 재전송) | 지원 (message 확인 및 재전송 mechanism) | 지원 (JMS 명세에 따른 재전송 처리) | 미지원 (message 전달 후 복구 불가) |
| **장애 복구** | 자동 복구 (replication, ISR mechanism으로 안정성 확보) | 자동 복구 (BookKeeper의 자동 복구, 지리적 복제) | 수동/자동 (cluster 구성에 따른 복구 정책 설정) | 수동/자동 (Master-Slave 구조의 장애 복구) | 제한적 (Sentinel을 통한 감시 및 장애 조치 필요) |
| **Client 언어** | 다양한 언어 지원 (공식/커뮤니티 client 풍부) | 다양한 언어 지원 (공식 client 다수 제공) | 다양한 언어 지원 (AMQP 기반) | Java 중심 (JMS 기반, 타 언어는 제한적) | 다양한 언어 지원 (간단한 protocol) |
| **운영 복잡도** | 복잡 (cluster 관리, ZooKeeper 의존성, partition 관리 필요) | 매우 복잡 (BookKeeper cluster 추가 관리, 3계층 architecture 운영) | 보통 (단순한 Broker 구조, 관리 UI 제공) | 보통 (JMX 기반 monitoring, 설정 관리 필요) | 단순 (단일 instance 운영 가능, 최소한의 설정) |
| **Resource 사용량** | 높음 (대용량 Memory, Disk I/O 많음) | 높음 (BookKeeper로 인한 추가 resource 필요, Memory 사용량 많음) | 중간 (message 처리량에 따른 적절한 Memory 사용) | 중간 (JVM 기반 Memory 관리, Disk 사용 효율적) | 낮음 (In-memory 처리로 Disk 부하 적음) |
| **주요 활용 사례** | log 수집, stream 처리 (대규모 실시간 data 처리) | global messaging (지리적 분산 환경의 실시간 통신) | microservice 통신 (기업 내부 system 연동) | enterprise 통합 (legacy system 연동) | 실시간 알림 (간단한 messaging 요구 사항) |
| **필요 Infra 수준** | 높음 (대규모 cluster, 고성능 Disk, ZooKeeper infra 필요) | 매우 높음 (Broker/BookKeeper cluster, Zookeeper 등 복잡한 infra) | 중간 (기본적인 cluster 구성, load balancer 필요) | 중간 (이중화 구성, 공유 storage 권장) | 낮음 (단순한 Master-Slave 구성 가능) |

- **대규모 실시간 처리**가 필요한 경우 **Kafka**나 **Pulsar**를 추천합니다.
- **일반적인 기업 환경**에서는 **RabbitMQ**가 균형 잡힌 선택이 될 수 있습니다.
- **Java 기반 system**에서는 **ActiveMQ**를 사용할 수도 있습니다.
- **경량화된 messaging**이 필요한 경우에는 **Redis**가 적합합니다.


---


## Reference

- <https://velog.io/@choidongkuen/%EC%84%9C%EB%B2%84-%EB%A9%94%EC%84%B8%EC%A7%80-%ED%81%90Message-Queue-%EC%9D%84-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90>
- <https://expertinsights.com/insights/the-top-message-queue-mq-software>

