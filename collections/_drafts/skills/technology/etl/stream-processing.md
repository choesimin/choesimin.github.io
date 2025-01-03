---
layout: skill
title: Stream Data Processing - 실시간으로 들어오는 정보 처리하기
date: 2024-12-26
---




## Stream Data Processing : 끊임없이 발생하는 정보를 실시간으로 처리하기

- **실시간 stream data을 정제하는 작업**은 stream 처리 방식의 ETL(Extract, Transform, Load) 과정 중 **Transform(변환) 단계**와 관련이 깊습니다.

- Stream Data Processing은 기업의 운영 방식과 경쟁력에 근본적인 변화를 가져올 수 있습니다.
    - 스트림 처리를 통해 데이터가 생성되자마자 분석 시스템에 데이터를 공급할 수 있습니다.
        - 기업은 거의 실시간으로 핵심적인 통찰력을 얻을 수 있습니다.
    - 실시간 의사 결정, 즉각적인 고객 대응, 실시간 위험 감지 등의 이점을 얻을 수 있습니다.


### Stream Processing 도구 선택하기

- 데이터 처리를 위해서 이미 수많은 도구들이 존재하며, 개발자는 목적에 맞는 도구를 잘 선택하는 것이 중요합니다.

- 개발자는 실시간으로 데이터를 공급하기 위해 업무의 요건과 난이도에 따라서 데이터 파이프라인을 설계합니다.
- 데이터의 종류에 적합한 데이터 처리 방식을 채택하고, 빠른 처리를 위해 더 많은 리소스를 할당하기도 합니다.
- 데이터 처리를 위한 도구들은 각각의 특성과 장단점이 있으므로, 프로젝트의 요구 사항과 운영 환경에 맞춰 적절한 도구를 선택해야 합니다.
    - 업무의 편의성과 복잡성의 수준에 따라 사용하기에 적합한 기술이 달라집니다.


### Stream Processing이 Batch Processing보다 기술적으로 더 어려운 이유

- **스트리밍 환경은 실시간으로 결과를 반영**해야 하기 때문에, **지연(latency)이 허용되지 않습니다.**
    - 전통적인 batch ETL 방식에서는 데이터가 일정 기간 동안 축적된 후 처리되며, 통상적으로 몇시간 이상의 데이터 지연(latency)이 존재합니다.

1. **데이터 조인의 복잡성** : 실시간으로 들어오는 데이터를 조인하기 위해 **스트림 조인이라는 새로운 패러다임이 필요**합니다.
    - 기존 데이터와 조인해야 할 경우, 전통적인 데이터베이스 조인 방식으로는 처리가 불가능합니다.
    - 새로운 메모리 관리 방식, 새로운 상태 저장 방식이 필요합니다.

2. **자원 할당의 변화** : 스트리밍 환경에서는 지속적으로 높은 수준의 컴퓨팅 자원을 유지해야 하며, 이는 시스템 아키텍처와 비용 구조에 큰 영향을 미칩니다.
    - 배치 처리에서는 필요한 시점에 대량의 컴퓨팅 자원을 일시적으로 할당할 수 있었습니다.

3. **에러 처리의 중요성** : 실시간 스트리밍에서는 데이터 손실이나 처리 지연이 즉각적인 비즈니스 영향으로 이어질 수 있어, 훨씬 더 정교한 에러 처리와 복구 메커니즘이 필요합니다.
    - 배치 처리에서는 에러가 발생하면 전체 배치를 재실행할 수 있었습니다. 




---




## Stateless Processing, Stateful Processing

- 스트림 프로세싱 애플리케이션을 만들 때, 애플리케이션의 무상태 또는 상태적인 특성이 설계에 아주 큰 영향을 미칩니다.

- **Stateless Processing** : 어떤 이벤트 레코드가 도착했을 때, 그 레코드만으로 처리가 완료되는 것.
    - Record A를 Record B로 변환하여 다른 토픽이나 다른 데이터 스토어로 전송하는 처리 등이 일반적입니다.

- **Stateful Processing** : 도착한 이벤트 레코드나 그것을 기초로 생성한 데이터를 일정 기간 보관 유지해 두고, 그것과 조합하여 결과를 생성하는 처리 방식.
    - 이전 이벤트들을 기억해 두고 의사결정에 기억해둔 event들을 활용합니다.
    - 일반적으로 이벤트 수를 집계하여 합계, 평균 및 히스토그램을 산출하거나, 처리 효율성을 위해 버퍼링하여 처리한다거나, 다른 스트림과 데이터 스토어의 데이터를 결합하여 데이터의 질을 높이는 상황 등이 Stateful Processing에 속합니다.
        - 예를 들어, 주식 가격이 이전 5분 동안 계속 상승했는지를 알고 싶다면, 스트림 처리 시스템은 실시간으로 이전 이벤트들을 전부 기억하고 순서대로 처리해야 합니다.


### Stateful 애플리케이션의 State Store

- Stateful 처리를 하려면, 애플리케이션에서 각각의 이벤트를 처리하고 그 결과를 저장할 상태 저장소(state store)가 필요합니다.

- 스트림 처리 애플리케이션이 이 저장소를 관리하면 내부 상태 저장소라고 하고, 스트림 처리 애플리케이션이 DB와 같이 별도의 상태 저장소를 이용하는 것을 외부 상태 저장소라고 합니다.

- 일반적으로, 상태 저장소는 낮은 latency를 갖는게 중요하기 때문에, 스트림 프로세싱에서는 기본적으로 각 처리 노드의 로컬에 데이터 스토어를 보관 유지하고 latency를 낮게 유지하는 방법을 채택합니다.

- Kafka Streams나 Apache Flink 등의 스트림 프로세싱 프레임워크에서는 RocksDB가 사용되고 있는데, RockDB는 애플리케이션에 통합되는 KVS 유형으로 각 노드의 로컬로 RocksDB를 이동시켜 낮은 대기 시간 상태를 유지합니다.
    - 각 노드의 로컬로 이동한다는 것은, 노드에 장애가 발생하면 데이터가 손실될 위험이 있음을 의미합니다.
    - 이를 피하기 위해 노드 독립적인 데이터 지속성 메커니즘도 별도로 필요합니다.
        - 이 구조에서는 네트워크 통신의 오버헤드가 불가피하기 때문에 어느 정도 버퍼링이 필요합니다.




---




## Stream Data Processing Solution 비교

|  | 특징 | 처리 방식 | 강점 | 단점 | 활용 사례 |
| --- | --- | --- | --- | --- | --- |
| **Confluent ksqlDB** | SQL 기반의 스트림 처리 엔진, Kafka와 완벽한 통합, 데이터베이스 기능 포함, 실시간 데이터 처리와 집계 지원 | 실시간 스트림 | SQL로 쉽게 스트림 처리 가능, 빠른 개발 속도, Kafka 생태계와 통합 용이, 직관적인 개발 경험, Pull 쿼리 지원으로 상태 조회 용이 | Community Edition의 기능 제한, Confluent 종속성, 수평적 확장성의 한계, 복잡한 집계 연산시 성능 제약, 고급 스트림 처리 기능 제한 | 실시간 데이터 변환, 간단한 스트림 분석, 이벤트 기반 애플리케이션, 실시간 대시보드, 간단한 ETL |
| **Apache Kafka Streams** | Kafka 기반의 클라이언트 라이브러리, 상태 저장 처리 지원, 마이크로서비스 친화적, 로컬 상태 저장소 활용 | 실시간 스트림 | 가벼운 구조, Kafka와 긴밀한 통합, 별도 클러스터 불필요, Exactly-once 처리 보장, 빠른 로컬 상태 조회 | Java/Scala로 제한된 개발, 대규모 분산 처리에는 제한적, 복잡한 처리 로직 구현시 번거로움, 외부 시스템 연동 제한적 | 마이크로서비스 기반 실시간 처리, ETL, 이벤트 기반 애플리케이션, 실시간 데이터 파이프라인 |
| **Apache Flink** | 순수 스트림 처리에 최적화, 정확한 이벤트 시간 처리, 배치 처리도 강력 지원, Table API/SQL 지원 | 실시간 스트림, 배치 | 매우 낮은 지연 시간, 정확한 이벤트 처리, 강력한 상태 관리, Checkpoint/Savepoint 기능, SQL 지원 강화 | 높은 학습 곡선, 운영 복잡도가 높음, 초기 설정 복잡, 리소스 요구사항 높음 | 실시간 이상 거래 감지, 복잡한 이벤트 처리, 대규모 스트림 분석, 정확한 시간 기반 분석 |
| **Apache Spark Structured Streaming** | Spark의 통합 스트림 처리 모듈, ML과 통합 용이, 마이크로배치/연속 처리 지원, Project Zen 통한 성능 개선 | 마이크로 배치, 연속 처리 | 배치/스트림 통합 처리, 풍부한 라이브러리, ML 파이프라인 통합, SQL 지원, 광범위한 커뮤니티 | 초기 지연 시간 높음, 순수 실시간 처리시 성능 제약, 리소스 사용량 높음, 메모리 관리 복잡 | 대규모 데이터 분석, ML 파이프라인, 복잡한 ETL, 실시간 AI 추론 |
| **Apache Storm** | 순수 스트림 처리에 특화, 매우 낮은 지연 시간, 간단한 아키텍처, Trident API 지원 | 실시간 스트림 | 매우 낮은 지연 시간, 단순한 아키텍처, 높은 신뢰성, 쉬운 스케일링, Exactly-once 지원 | 제한된 고급 기능, Flink 대비 기능 부족, 복잡한 상태 관리 제한, 개발 속도 둔화 | 실시간 알림, 간단한 스트림 처리, IoT 데이터 처리, 실시간 모니터링 |
| **Apache Samza** | LinkedIn에서 개발, Kafka와 긴밀한 통합, YARN 기반 리소스 관리, 분산 처리 최적화 | 실시간 스트림 | 강력한 상태 관리, Kafka와 좋은 통합, 확장성, 장애 복구 능력 우수, 처리량 중심 설계 | 제한된 커뮤니티, 상대적으로 적은 사용 사례, 높은 운영 복잡도, 학습 리소스 부족 | 메시징 시스템, 실시간 분석, 대규모 이벤트 처리, 로그 처리 |
| **Apache NiFi** | 웹 기반 데이터 흐름 관리, 시각적 프로그래밍 UI, 풍부한 프로세서 라이브러리, Site-to-Site 프로토콜 | 데이터 흐름 중심 | 직관적인 UI, 강력한 데이터 계보 추적, 다양한 프로토콜 지원, 확장 용이성, 강력한 보안 기능 | 순수 스트림 처리에 부적합, 복잡한 변환에 제한적, 높은 메모리 사용량, 대규모 확장시 복잡 | 데이터 수집/라우팅, IoT 데이터 처리, 시스템 간 데이터 이동, ETL, 보안 중심 데이터 처리 |
| **Apache Beam** | 런타임 독립적 통합 모델, 다중 런타임 지원, 파이프라인 템플릿, 크로스 플랫폼 실행 | 통합 배치/스트림 | 런타임 교체 가능, 클라우드 중립적, 높은 이식성, 다양한 실행 엔진 지원, 재사용성 높음 | 추상화로 인한 오버헤드, 디버깅 어려움, 런타임별 최적화 필요, 초기 설정 복잡 | 멀티 클라우드 환경, 클라우드 중립적 파이프라인, 하이브리드 클라우드 처리, 범용 데이터

- **SQL로 간단한 실시간 처리**가 필요하다면 **ksqlDB**를 선택합니다.
    - SQL로 스트림 처리를 쉽게 구현할 수 있습니다.
    - Kafka 생태계와 완벽하게 통합됩니다.
    - 개발 속도가 빠르고, 배포가 간편합니다.
    - 이벤트 기반 애플리케이션의 프로토타이핑에 적합합니다.
    - 단, 복잡한 처리나 대규모 확장성이 필요하다면 부적합합니다.
        - SQL의 표현력 한계로 복잡한 비즈니스 로직 구현이 어렵습니다
        - Kafka Streams 기반으로 인한 파티션 확장성 제약이 있습니다
        - SQL 엔진 특성상 대규모 처리 시 리소스 사용이 비효율적입니다

- **마이크로서비스 기반 실시간 처리**라면 **Kafka Streams**를 선택합니다.
    - 마이크로서비스에 쉽게 통합할 수 있습니다.
    - 경량화된 라이브러리 방식으로 가벼운 처리 환경을 제공합니다.
    - Java/Scala 개발 환경에 적합합니다.
    - Kafka 기반 ETL 파이프라인 구축이 용이합니다.
    - Exactly-once 처리 보장를 보장합니다.
    - 로컬 상태 저장소를 활용하여 높은 성능을 제공합니다.
    - 독립적인 이벤트 처리 애플리케이션 개발에 적합합니다.

- **복잡하고 정밀한 실시간 처리**가 필요하다면 **Flink**를 선택합니다.
    - 밀리초 단위의 초저지연 처리가 가능합니다.
    - 정밀한 이벤트 시간 기반 처리를 지원합니다.
    - 대규모 상태 관리 기능과 장애 복구 기능을 제공합니다.
    - 복잡한 이벤트 패턴 감지에 적합합니다.
    - 실시간 이상 거래 탐지 같은 중요 업무를 안정적으로 처리합니다.
    - 배치와 스트림 처리를 통합할 수 있습니다.
    - SQL로도 스트림 처리를 할 수 있습니다.
        - 최근에 SQL 기반 처리 지원이 강화되고 있습니다.

- **ML/AI와 통합된 대규모 처리**가 필요하다면 **Spark Structured Streaming**을 선택합니다.
    - ML/AI 파이프라인과 쉽게 통합됩니다.
    - 대용량 데이터 분석에 적합합니다.
    - SQL로 복잡한 데이터 처리가 가능합니다.
    - 배치와 스트림 분석을 통합할 수 있습니다.
    - 다양한 분석 라이브러리를 활용할 수 있습니다.

- **단순하면서도 신뢰성 있는 실시간 처리**가 필요하다면 **Storm**을 선택합니다.
    - 초저지연 실시간 처리가 가능합니다.
    - 단순한 아키텍처로 실시간 시스템을 구축할 수 있습니다.
    - 실시간 알림과 모니터링에 적합합니다.
    - IoT 데이터를 가볍게 처리할 수 있습니다.
    - 시스템 확장이 용이합니다.
    - 안정성은 검증되어 있으나, 최신 트렌드 반영은 제한적입니다.

- **안정적인 대규모 메시징 처리**가 필요하다면 **Samza**를 선택합니다.
    - 안정적인 상태 관리 기능을 제공합니다.
    - Kafka 기반 메시징 시스템 구축에 적합합니다.
    - 고가용성과 장애 복구가 뛰어납니다.
    - 분산 처리에 최적화되어 있습니다.
    - 대규모 메시징 처리에 적합합니다.
    - 대용량 로그 처리에 효과적입니다.

- **시각적인 데이터 파이프라인 관리**가 필요하다면 **NiFi**를 선택합니다.
    - GUI 기반으로 데이터 흐름을 시각적으로 설계할 수 있습니다.
        - 비개발자도 쉽게 데이터 파이프라인을 관리할 수 있습니다.
    - 강력한 보안과 추적성을 지원합니다.
    - 다양한 프로토콜을 지원하여, 시스템 간 데이터 연동이 쉽습니다.
    - 데이터 이동 경로를 추적할 수 있습니다.
    - IoT 데이터 수집에 적합합니다.

- **클라우드 환경에 구애받지 않는 처리**가 필요하다면 **Beam**을 선택합니다.
    - 클라우드 중립적이어서, 여러 클라우드 환경에서 실행할 수 있습니다.
        - 어느 클라우드에 종속되지 않는 파이프라인을 만들 수 있습니다.
    - 다양한 런타임 옵션을 제공하여, 실행 환경을 유연하게 변경할 수 있습니다.
    - 이식성과 재사용성이 좋아, 다른 환경으로 쉽게 이전할 수 있습니다.
    - 하이브리드 클라우드 환경에 적합합니다.
