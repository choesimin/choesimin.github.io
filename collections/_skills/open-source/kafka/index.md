---
layout: skill
date: 2024-12-31
title: Apache Kafka - Message Queue System
---




## Apache Kafka : 성능과 기능이 좋은 Message Queue

```mermaid
flowchart TD
    web[Web]
    custom_apps(Custom Apps)
    microservices{Microservices}
    monitoring[Monitoring]
    analytics[Analytics]

    subgraph kafka_platform[Apache Kafka Platform]
        kafka_core[[Apache Kafka]]
    end

    twitter(Twitter)
    app1[App]
    nosql[(NoSQL)]
    app2[App]
    oracle(Oracle)
    caches[(Caches)]
    hadoop(Hadoop)

    web & custom_apps & microservices & monitoring & analytics --> kafka_core
    kafka_core --> twitter & app1 & nosql & app2 & oracle & caches & hadoop
```

- Apache Kafka는 LinkedIn에서 개발하여 2011년 open source로 공개된 **분산 streaming platform**으로, **대용량 실시간 data 처리에 특화된 system**입니다.
    - 초당 수백만 건의 message를 안정적으로 처리할 수 있는 **고성능 구조**를 갖추고 있습니다.
    - 분산 system 구조를 채택하여 **높은 확장성과 안정성**을 제공합니다.

- **발행-구독(Publish-Subscribe) model을 기반으로 동작하는 messaging system**입니다.
    - **data 생산자(Producer)가 message를 발행**하면, **소비자(Consumer)가 필요한 message를 구독하여 처리**합니다.
    - 다수의 생산자와 소비자가 동시에 data를 주고받을 수 있는 구조입니다.

```mermaid
flowchart LR
    producer(Producer)
    broker[[Broker]]
    consumer(Consumer)

    producer --> broker
    broker --> consumer
```

- **Kafka는 Broker** 역할을 수행하며, 일종의 **Message Queue**입니다.
    - Producer application과 Conumer application 사이에 위치하여 Message를 전달합니다.




---




## Kafka의 기본 구성 요소

```mermaid
---
title: Kafka Server Architecture
---

flowchart TB
    subgraph kafka_cluster[Kafka Cluster]
        direction TB
        
        subgraph broker1[Broker1]
            direction TB
            topic1_part1[Topic1 Partition1]
            topic2_part1[Topic2 Partition1]
        end
        
        subgraph broker2[Broker2]
            direction TB
            topic1_part2[Topic1 Partition2]
            topic2_part2[Topic2 Partition2]
        end
        
        subgraph broker3[Broker3]
            direction TB
            topic1_part3[Topic1 Partition3]
            topic2_part3[Topic2 Partition3]
        end
    end
    
    producer(Producer)
    consumer(Consumer)
    zookeeper[Zookeeper]
    
    producer --> |produce message| kafka_cluster
    kafka_cluster --> |consume message| consumer
    zookeeper --> |manage cluster| kafka_cluster
    
    topic1_part1 -. "replicate" .- topic1_part2
    topic1_part2 -. "replicate" .- topic1_part3
    topic2_part1 -. "replicate" .- topic2_part2
    topic2_part2 -. "replicate" .- topic2_part3
```

- **Cluster** : 여러 대의 server가 하나의 system처럼 동작하는 **분산 환경을 구성**합니다.
    - 높은 가용성과 확장성을 제공하며, 대용량 data 처리가 가능한 구조를 만듭니다.
    - **각각의 server는 독립적으로 동작**하면서도 **전체적으로는 단일 system처럼 운영**됩니다.

- **Producer** : **data를 생성하고 Kafka system에 전달**하는 application입니다.
    - **message를 특정 topic으로 발행**하며, **partition에 data를 분배하는 역할**을 수행합니다.
    - **Kafka에서 제공하는 Producer API를 활용하여 구현**됩니다.

- **Consumer** : Producer가 발행한 **message를 Broker로부터 가져와 처리**하는 application입니다.
    - **하나 이상의 topic을 구독하여 message를 소비**할 수 있습니다.
    - Consumer group을 통해 병렬 처리가 가능한 구조를 제공합니다.

- **Broker** : **Producer와 Consumer 사이에서 message를 중계하는 Kafka server**입니다.
    - 각 Broker는 고유한 `broker.id`를 가지며, **cluster의 일부로 동작**합니다.
    - **message의 저장과 전달을 담당**하며, **Zookeeper와 연동하여 cluster 운영을 관리**합니다.

- **Topic** : **message를 논리적으로 구분하는 단위**입니다.
    - **특정 category나 event 종류별로 구분되어 관리**됩니다.
    - 하나의 topic은 **여러 개의 partition으로 분할**될 수 있습니다.

- **Partition** : **topic의 물리적 저장소 단위**입니다.
    - **수평적 확장이 가능한 구조**를 제공하여 높은 처리량을 달성합니다.
    - 각 partition은 leader와 follower로 구성되어 고가용성을 보장합니다.


### Cluster 운영 구조

- **Zookeeper 연동** : Zookeeper는 **cluster의 metadata 관리를 담당**합니다.
    - **Broker의 상태 관리와 leader 선출을 조율**합니다.
    - 설정 정보의 중앙화된 저장소 역할을 수행합니다.

- **Leader와 Follower 구조** : **각 partition은 하나의 leader와 여러 follower로 구성**됩니다.
    - **leader**는 **해당 partition의 읽기와 쓰기를 담당**합니다.
    - **follower**는 **leader의 data를 복제하여 가용성을 보장**합니다.

- **장애 대응 체계** : **Broker 장애 발생 시 controler가 새로운 leader를 선출**합니다.
    - **변경된 leader 정보는 Zookeeper에 기록**되어 cluster 전체에 공유됩니다.
    - **자동화된 복구 process**를 통해 system의 안정성을 유지합니다.




---




## Kafka 도입 Guide

- Kafka는 대규모 실시간 data를 안정적으로 처리할 수 있는 분산 streaming platform으로서, topic과 partition을 통한 효율적인 message 분산 처리와 disk 기반의 data 영속성을 제공하는 특징을 가지고 있습니다.
- Broker 간 data 복제와 Zookeeper를 통한 cluster 관리로 고가용성을 보장하며, Consumer group과 offset 관리를 통해 안정적인 message 처리를 지원함으로써 현대적인 data pipeline과 실시간 streaming 처리에 널리 활용되고 있습니다.


### Kafka의 장점

- **높은 처리량과 낮은 지연 시간** : Kafka는 초당 수백만 건의 message를 처리할 수 있는 분산 messaging system으로, 대규모 data stream을 실시간으로 처리하는 데 탁월한 성능을 보여줍니다.
    - partitioning을 통한 분산 처리 방식으로, 단일 cluster에서도 초당 수 Terabyte의 data를 안정적으로 처리할 수 있습니다.

- **Data 영속성과 안정성** : 모든 message는 disk에 저장되어 data 손실 위험을 최소화합니다.
    - replication factor 설정을 통해 여러 Broker에 data를 복제함으로써 고가용성을 보장합니다.
    - Broker 장애 발생 시에도 자동으로 복구되어 무중단 service가 가능합니다.

- **확장성과 유연성** : 수평적 확장이 용이하여 cluster에 Broker를 동적으로 추가할 수 있습니다.
    - Producer와 Consumer를 독립적으로 확장할 수 있어 system resource를 효율적으로 활용할 수 있습니다.


### Kafka 활용 사례

- **Log 수집 및 처리 System** : 대규모 web service의 application log, system metric, 사용자 활동 log 등을 실시간으로 수집하고 처리합니다.
    - ELK(Elasticsearch, Logstash, Kibana) stack과 연동하여 log 분석 및 monitoring system을 구축할 수 있습니다.

- **실시간 Streaming Data 처리** : SNS feed, 주식 시세, IoT sensor data와 같은 실시간 streaming data를 처리합니다.
    - Apache Spark, Apache Flink 등의 stream processing engine과 연동하여 복잡한 실시간 분석을 수행할 수 있습니다.

- **Event 기반 Microservice Architecture** : service 간 비동기 통신을 위한 event bus로 활용됩니다.
    - service 간 결합도를 낮추고 확장성을 높이는 데 기여합니다.
    - 장애 전파를 방지하고 system 복원력을 향상시킵니다.

- **실시간 고객 Data Pipeline** : 사용자 행동 data를 실시간으로 수집하고 분석하여 개인화된 service를 제공합니다.
    - A/B test, 실시간 추천 system 등에 활용됩니다.


### Kafka 도입 시 고려 사항

- **운영 복잡성** : Zookeeper 의존성 관리와 cluster 운영에 대한 전문성이 필요합니다.
    - 적절한 partition 수와 replication factor 설정이 중요합니다.

- **Resource 관리** : memory와 disk 사용량을 monitoring하고 적절히 관리해야 합니다.
    - data 보존 기간과 정책을 명확히 설정해야 합니다.

- **Message 순서 보장** : partition level에서만 순서가 보장되므로, 순서가 중요한 경우 partitioning 전략을 신중히 설계해야 합니다.
    - 전역적(global) 순서 보장이 필요한 경우 단일 partition을 사용해야 하며, 이는 처리량 제한으로 이어질 수 있습니다.




---




## Reference

- <https://medium.com/@0joon/10%EB%B6%84%EC%95%88%EC%97%90-%EC%95%8C%EC%95%84%EB%B3%B4%EB%8A%94-kafka-bed877e7a3bc>
- <https://velog.io/@holicme7/Apache-Kafka-Kafka-Streams-%EB%9E%80>

