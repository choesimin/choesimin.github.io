---
layout: note
permalink: /56
title: Stream Data Processing - 실시간으로 들어오는 정보 처리하기
description: Stream Data Processing은 끊임없이 발생하는 정보를 실시간으로 처리하는 방식입니다.
date: 2024-12-26
---


## Stream Data Processing : 끊임없이 발생하는 정보를 실시간으로 처리하기

- **실시간 stream data을 정제하는 작업**은 stream 처리 방식의 ETL(Extract, Transform, Load) 과정 중 **Transform(변환) 단계**와 관련이 깊습니다.

- Stream Data Processing은 기업의 운영 방식과 경쟁력에 근본적인 변화를 가져올 수 있습니다.
    - stream 처리를 통해 data가 생성되자마자 분석 system에 data를 공급할 수 있습니다.
        - 기업은 거의 실시간으로 핵심적인 통찰력(insight)을 얻을 수 있습니다.
    - 실시간 의사 결정, 즉각적인 고객 대응, 실시간 위험 감지 등의 이점을 얻을 수 있습니다.


### Stream Processing 도구 선택하기

- data 처리를 위해서 이미 수많은 도구들이 존재하며, 개발자는 목적에 맞는 도구를 잘 선택하는 것이 중요합니다.
- 개발자는 실시간으로 data를 공급하기 위해 업무의 요건과 난이도에 따라서 data pipeline을 설계합니다.
- data의 종류에 적합한 data 처리 방식을 채택하고, 빠른 처리를 위해 더 많은 resource를 할당하기도 합니다.
- data 처리를 위한 도구들은 각각의 특성과 장단점이 있으므로, project의 요구 사항과 운영 환경에 맞춰 적절한 도구를 선택해야 합니다.
    - 업무의 편의성과 복잡성의 수준에 따라 사용하기에 적합한 기술이 달라집니다.


### Stream Processing이 Batch Processing보다 기술적으로 더 어려운 이유

- **streaming 환경은 실시간으로 결과를 반영**해야 하기 때문에, **지연(latency)이 허용되지 않습니다.**
    - 전통적인 batch ETL 방식에서는 data가 일정 기간 동안 축적된 후 처리되며, 통상적으로 몇시간 이상의 data 지연(latency)이 존재합니다.

1. **Data Join의 복잡성** : 실시간으로 들어오는 data를 join하기 위해 **Stream Join이라는 새로운 paradigm이 필요**합니다.
    - 기존 data와 join해야 할 경우, 전통적인 database join 방식으로는 처리가 불가능합니다.
    - 새로운 Memory 관리 방식, 새로운 상태 저장 방식이 필요합니다.

2. **Resource 할당 방식** : streaming 환경에서는 지속적으로 높은 수준의 computing resource을 유지해야 하며, 이는 system architecture와 비용 구조에 큰 영향을 미칩니다.
    - batch 처리에서는 필요한 시점에 대량의 computing resource을 일시적으로 할당할 수 있었습니다.

3. **오류 처리의 중요성** : 실시간 streaming에서는 data 손실이나 처리 지연이 즉각적인 business 영향으로 이어질 수 있어, 훨씬 더 정교한 error 처리와 복구 mechanism이 필요합니다.
    - batch 처리에서는 error가 발생하면 전체 batch를 재실행할 수 있었습니다. 


---


## Stateless Processing vs Stateful Processing

- stream processing application을 만들 때, application의 무상태 또는 상태적인 특성이 설계에 아주 큰 영향을 미칩니다.

- **Stateless Processing** : 어떤 event record가 도착했을 때, 그 record만으로 처리가 완료되는 것.
    - record A를 record B로 변환하여 다른 topic이나 다른 data store로 전송하는 처리 등이 일반적입니다.

- **Stateful Processing** : 도착한 event record나 그것을 기초로 생성한 data를 일정 기간 보관 유지해 두고, 그것과 조합하여 결과를 생성하는 처리 방식.
    - 이전 event들을 기억해 두고, 기억해둔 event들을 의사결정에 활용합니다.
    - 일반적으로 event count를 집계하여 합계, 평균 및 histogram을 산출하거나, 처리 효율성을 위해 buffering하여 처리한다거나, 다른 stream과 data store의 data를 결합하여 data의 질을 높이는 상황 등이 stateful processing에 속합니다.
        - 예를 들어, 주식 가격이 이전 5분 동안 계속 상승했는지를 알고 싶다면, stream processing system은 실시간으로 이전 event들을 전부 기억하고 순서대로 처리해야 합니다.


### Stateful Application의 State Store

- stateful 처리를 하려면, application에서 각각의 event를 처리하고 그 결과를 저장할 상태 저장소(state store)가 필요합니다.
    - 내부 상태 저장소 (Internal State Store) : stream processing application이 직접 상태 저장소를 관리하는 것.
        - Local State Store라고도 합니다.
    - 외부 상태 저장소 (External State Store) : stream processing application이 별도의 상태 저장소(DB 등)를 이용하는 것.

- 일반적으로, 상태 저장소는 낮은 latency를 갖는게 중요하기 때문에, stream processing에서는 기본적으로 각 처리 node의 local에 data store를 보관 유지하고 latency를 낮게 유지하는 방법을 채택합니다.

- Kafka Streams나 Apache Flink 등의 stream processing framework에서는 RocksDB가 사용되고 있는데, RocksDB는 application에 통합되는 KVS 유형으로 각 node의 local로 RocksDB를 이동시켜 낮은 대기 시간 상태를 유지합니다.
    - 각 node의 local로 이동한다는 것은, node에 장애가 발생하면 data가 손실될 위험이 있음을 의미합니다.
    - 이를 피하기 위해 node 독립적인 data 지속성 mechanism도 별도로 필요합니다.
        - 이 구조에서는 network 통신의 overhead가 불가피하기 때문에 어느 정도 buffering이 필요합니다.


---


## Stream Data Processing Solution 비교

|  | 특징 | 처리 방식 | 강점 | 단점 | 활용 사례 |
| --- | --- | --- | --- | --- | --- |
| **Confluent ksqlDB** | SQL 기반의 stream processing engine, Kafka와 완벽한 통합, database 기능 포함, 실시간 data 처리와 집계 지원 | 실시간 stream | SQL로 쉽게 streaw 처리 가능, 빠른 개발 속도, Kafka 생태계와 통합 용이, 직관적인 개발 경험, pull query 지원으로 상태 조회 용이 | community edition의 기능 제한, Confluent 종속성, 수평적 확장성의 한계, 복잡한 집계 연산 시 성능 제약, 고급 stream 처리 기능 제한 | 실시간 data 변환, 간단한 stream 분석, event 기반 application, 실시간 dashboard, 간단한 ETL |
| **Apache Kafka Streams** | Kafka 기반의 client library, 상태 저장 처리 지원, microservice 친화적, local 상태 저장소 활용 | 실시간 stream | 가벼운 구조, Kafka와 긴밀한 통합, 별도 cluster 불필요, Exactly-once 처리 보장, 빠른 local 상태 조회 | Java/Scala로 제한된 개발, 대규모 분산 처리에는 제한적, 복잡한 처리 logic 구현시 번거로움, 외부 system 연동 제한적 | microservice 기반 실시간 처리, ETL, event 기반 application, 실시간 data pipeline |
| **Apache Flink** | 순수 stream 처리에 최적화, 정확한 event 시간 처리, batch 처리도 강력 지원, Table API/SQL 지원 | 실시간 stream, batch | 매우 낮은 지연 시간, 정확한 event 처리, 강력한 상태 관리, checkpoint/savepoint 기능, SQL 지원 강화 | 높은 학습 곡선, 운영 복잡도가 높음, 초기 설정 복잡, resource 요구 사항 높음 | 실시간 이상 거래 감지, 복잡한 event 처리, 대규모 stream 분석, 정확한 시간 기반 분석 |
| **Apache Spark Structured Streaming** | Spark의 통합 stream 처리 모듈, ML과 통합 용이, Project Zen을 통한 성능 개선 | micro-batch, continuous processing | batch/stream 통합 처리, 풍부한 library, ML pipeline 통합, SQL 지원, 광범위한 community | 초기 지연 시간 높음, 순수 실시간 처리 시 성능 제약, resource 사용량 높음, Memory 관리 복잡 | 대규모 data 분석, ML pipeline, 복잡한 ETL, 실시간 AI 추론 |
| **Apache Storm** | 순수 stream 처리에 특화, 매우 낮은 지연 시간, 간단한 architecture, Trident API 지원 | 실시간 stream | 매우 낮은 지연 시간, 단순한 architecture, 높은 신뢰성, 쉬운 scaling, Exactly-once 지원 | 제한된 고급 기능, Flink 대비 기능 부족, 복잡한 상태 관리 제한, 개발 속도 둔화 | 실시간 알림, 간단한 stream 처리, IoT data 처리, 실시간 monitoring |
| **Apache Samza** | LinkedIn에서 개발, Kafka와 긴밀한 통합, YARN 기반 resource 관리, 분산 처리 최적화 | 실시간 stream | 강력한 상태 관리, Kafka와 좋은 통합, 확장성, 장애 복구 능력 우수, 처리량 중심 설계 | 제한된 community, 상대적으로 적은 사용 사례, 높은 운영 복잡도, 학습 resource 부족 | messaging system, 실시간 분석, 대규모 event 처리, log 처리 |
| **Apache NiFi** | 웹 기반 data 흐름 관리, 시각적 programming UI, 풍부한 processor library, Site-to-Site protocol | data 흐름 중심 | 직관적인 UI, 강력한 data 계보 추적, 다양한 protocol 지원, 확장 용이성, 강력한 보안 기능 | 순수 stream 처리에 부적합, 복잡한 변환에 제한적, 높은 Memory 사용량, 대규모 확장시 복잡 | data 수집/routing, IoT data 처리, system 간 data 이동, ETL, 보안 중심 data 처리 |
| **Apache Beam** | runtime 독립적 통합 모델, 다중 runtime 지원, pipeline template, cross platform 실행 | 통합 batch/stream | runtime 교체 가능, cloud 중립적, 높은 이식성, 다양한 실행 engine 지원, 재사용성 높음 | 추상화로 인한 overhead, debugging 어려움, runtime별 최적화 필요, 초기 설정 복잡 | multi cloud 환경, cloud 중립적 pipeline, hybrid cloud 처리, 범용 data 처리 |

- **SQL로 간단한 실시간 처리**가 필요하다면 **ksqlDB**를 선택합니다.
    - SQL로 stream 처리를 쉽게 구현할 수 있습니다.
    - Kafka 생태계와 완벽하게 통합됩니다.
    - 개발 속도가 빠르고, 배포가 간편합니다.
    - event 기반 application의 prototyping에 적합합니다.
    - 단, 복잡한 처리나 대규모 확장성이 필요하다면 부적합합니다.
        - SQL의 표현력 한계로 복잡한 business logic 구현이 어렵습니다.
        - Kafka Streams 기반으로 인한 partition 확장성 제약이 있습니다.
        - SQL engine 특성상 대규모 처리 시 resource 사용이 비효율적입니다.

- **microservice 기반 실시간 처리**라면 **Kafka Streams**를 선택합니다.
    - microservice에 쉽게 통합할 수 있습니다.
    - 경량화된 library 방식으로 가벼운 처리 환경을 제공합니다.
    - Java/Scala 개발 환경에 적합합니다.
    - Kafka 기반 ETL pipeline 구축이 용이합니다.
    - Exactly-once 처리 보장를 보장합니다.
    - local 상태 저장소를 활용하여 높은 성능을 제공합니다.
    - 독립적인 event 처리 application 개발에 적합합니다.

- **복잡하고 정밀한 실시간 처리**가 필요하다면 **Flink**를 선택합니다.
    - millisecond 단위의 초저지연 처리가 가능합니다.
    - 정밀한 event 시간 기반 처리를 지원합니다.
    - 대규모 상태 관리 기능과 장애 복구 기능을 제공합니다.
    - 복잡한 event pattern 감지에 적합합니다.
    - 실시간 이상 거래 탐지 같은 중요 업무를 안정적으로 처리합니다.
    - batch와 stream 처리를 통합할 수 있습니다.
    - SQL로도 stream 처리를 할 수 있습니다.
        - 최근에 SQL 기반 처리 지원이 강화되고 있습니다.

- **ML/AI와 통합된 대규모 처리**가 필요하다면 **Spark Structured Streaming**을 선택합니다.
    - ML/AI pipeline과 쉽게 통합됩니다.
    - 대용량 data 분석에 적합합니다.
    - SQL로 복잡한 data 처리가 가능합니다.
    - batch와 stream 분석을 통합할 수 있습니다.
    - 다양한 분석 library를 활용할 수 있습니다.

- **단순하면서도 신뢰성 있는 실시간 처리**가 필요하다면 **Storm**을 선택합니다.
    - 초저지연 실시간 처리가 가능합니다.
    - 단순한 architecture로 실시간 system을 구축할 수 있습니다.
    - 실시간 알림과 monitoring에 적합합니다.
    - IoT data를 가볍게 처리할 수 있습니다.
    - system 확장이 용이합니다.
    - 안정성은 검증되어 있으나, 최신 trend 반영은 제한적입니다.

- **안정적인 대규모 messaging 처리**가 필요하다면 **Samza**를 선택합니다.
    - 안정적인 상태 관리 기능을 제공합니다.
    - Kafka 기반 messaging system 구축에 적합합니다.
    - 고가용성과 장애 복구가 뛰어납니다.
    - 분산 처리에 최적화되어 있습니다.
    - 대규모 messaging 처리에 적합합니다.
    - 대용량 log 처리에 효과적입니다.

- **시각적인 data pipeline 관리**가 필요하다면 **NiFi**를 선택합니다.
    - GUI 기반으로 data 흐름을 시각적으로 설계할 수 있습니다.
        - 비개발자도 쉽게 data pipeline을 관리할 수 있습니다.
    - 강력한 보안과 추적성을 지원합니다.
    - 다양한 protocol을 지원하여, system 간 data 연동이 쉽습니다.
    - data 이동 경로를 추적할 수 있습니다.
    - IoT data 수집에 적합합니다.

- **cloud 환경에 구애받지 않는 처리**가 필요하다면 **Beam**을 선택합니다.
    - cloud 중립적이어서, 여러 cloud 환경에서 실행할 수 있습니다.
        - 어느 cloud에 종속되지 않는 pipeline을 만들 수 있습니다.
    - 다양한 runtime option을 제공하여, 실행 환경을 유연하게 변경할 수 있습니다.
    - 이식성과 재사용성이 좋아, 다른 환경으로 쉽게 이전할 수 있습니다.
    - hybrid cloud 환경에 적합합니다.

