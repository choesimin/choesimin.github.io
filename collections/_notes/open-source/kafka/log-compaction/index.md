---
layout: note
permalink: /
title: 
description: 
date: 2024-12-31
published: false
---


## Kafka Log Compaction

- Kafka log compaction은 topic의 저장 공간을 효율적으로 관리하면서도 **최신 상태 정보를 영구 보존**하는 핵심 메커니즘입니다.
- 전통적인 시간 기반 retention과 달리, **key별 최신 메시지만 유지**하여 무한정 증가하는 log 크기 문제를 해결합니다.
- database의 Change Data Capture(CDC), configuration 관리, event sourcing 등 **상태 기반 시스템**에서 필수적으로 활용됩니다.


---


## Log Compaction의 핵심 개념

- log compaction은 **같은 key를 가진 메시지들 중 가장 최신 메시지만 보존**하는 Kafka의 저장소 관리 전략입니다.
- 시간이 지나도 각 key의 **최종 상태**는 항상 확인할 수 있어, 새로운 consumer가 전체 topic을 읽어도 완전한 상태 정보를 얻을 수 있습니다.
- Message의 **순서는 보장**되며, offset 기반 처리도 정상적으로 동작합니다.


### 기존 Time-based Retention과의 차이점

- **Time-based retention** : 설정된 시간이 지나면 메시지를 무조건 삭제합니다.
    - 오래된 메시지는 key와 관계없이 모두 사라집니다.
    - Storage 사용량은 예측 가능하지만, 과거 상태 정보는 복구할 수 없습니다.

- **Log compaction** : key별로 최신 메시지만 유지하고 오래된 메시지를 삭제합니다.
    - 각 key의 최종 상태는 영구 보존됩니다.
    - Storage 사용량은 unique key 개수에 비례합니다.


### Log Compaction이 필요한 상황

- **Database CDC** : table의 각 record에 대한 최신 상태만 관리하면 되는 경우입니다.
    - Primary key별로 최신 변경 사항만 유지하여 downstream system의 상태를 동기화합니다.

- **Configuration 관리** : application 설정값의 변경 이력보다는 **현재 설정값**이 중요한 경우입니다.
    - 설정 key별로 최신값만 보존하여 application 재시작 시 올바른 설정을 로드할 수 있습니다.

- **Event sourcing** : entity의 **현재 상태**를 빠르게 재구성해야 하는 경우입니다.
    - Entity ID별로 최신 snapshot만 유지하여 state rebuilding 성능을 최적화합니다.


---


## Log Compaction 동작 메커니즘

- log compaction은 **background process**로 동작하며, 즉시 실행되지 않고 특정 조건을 만족할 때 실행됩니다.
- compaction 과정에서 **기존 segment file들을 새로운 segment로 재작성**하여 중복된 key의 오래된 메시지들을 제거합니다.
- 전체 과정은 **non-blocking**이며, compaction 중에도 producer와 consumer는 정상적으로 동작합니다.


### Compaction 실행 조건

- **Segment 크기 조건** : active segment를 제외한 closed segment들이 대상이 됩니다.
    - `segment.ms` 또는 `segment.bytes` 설정에 따라 segment가 닫힙니다.
    - active segment는 compaction 대상에서 제외되어 **최신 메시지 손실을 방지**합니다.

- **Dirty ratio 조건** : compaction 대상 데이터의 비율이 임계값을 초과해야 합니다.
    - `min.cleanable.dirty.ratio` 설정값 (기본값 0.5)을 넘어야 compaction이 시작됩니다.
    - 너무 자주 compaction하면 I/O 부하가 증가하므로 적절한 임계값이 필요합니다.

- **최소 지연 시간** : `min.compaction.lag.ms` 설정만큼 대기 후 compaction을 실행합니다.
    - 같은 key에 대한 연속적인 update가 있을 때 **불필요한 compaction을 방지**합니다.


### Compaction 처리 과정

1. **Segment 분석** : compaction 대상 segment들을 스캔하여 key별 최신 offset을 파악합니다.
    - 각 key의 가장 높은 offset을 가진 메시지를 **보존 대상**으로 마킹합니다.
    - 이 과정에서 메모리에 key-offset mapping table을 구성합니다.

2. **새로운 Segment 생성** : 보존 대상 메시지들만 모아서 새로운 segment file을 생성합니다.
    - 메시지의 **순서와 offset은 그대로 유지**됩니다.
    - 압축률은 key 중복도에 따라 결정됩니다.

3. **Atomic 교체** : 기존 segment들을 새로운 segment로 원자적으로 교체합니다.
    - Consumer가 읽는 도중에도 **일관성이 보장**됩니다.
    - 교체 완료 후 기존 segment file들은 삭제됩니다.


---


## Tombstone을 통한 삭제 처리

- log compaction 환경에서는 특정 key를 **완전히 삭제**하기 위한 특별한 메커니즘이 필요합니다.

- **tombstone**은 `value=null`로 설정된 특별한 메시지로, 해당 key가 **논리적으로 삭제되었음**을 표시합니다.
    - **구조** : 일반 메시지와 동일한 key를 가지지만 `value=null`로 설정된 특별한 메시지입니다.
        - headers, timestamp 등 다른 metadata는 정상적으로 포함됩니다.
        - producer가 명시적으로 `ProducerRecord(key, null)`로 전송해야 합니다.
    - **의미** : Kafka에게 "이 key는 더 이상 존재하지 않는다"고 알리는 **표준 시그널**입니다.
        - 단순한 null 값이 아니라 **삭제 명령**으로 해석됩니다.
        - log compaction 과정에서 특별하게 처리됩니다.

- tombstone을 통해 compaction 후에도 삭제된 key가 **재생성되지 않음**을 보장할 수 있습니다.


### Tombstone 처리 과정

- **생성 시점** : application이 특정 key를 삭제하고 싶을 때 tombstone을 명시적으로 전송합니다.
    - database의 DELETE 연산을 CDC로 처리할 때 자주 사용됩니다.
    - configuration 삭제나 entity 제거 시에도 활용됩니다.

- **Compaction 중 처리** : tombstone은 해당 key의 **모든 이전 메시지들을 제거 대상**으로 마킹합니다.
    - 첫 번째 compaction에서는 tombstone만 남고 이전 메시지들이 삭제됩니다.
    - 이후 compaction에서는 tombstone 자체도 삭제 대상이 될 수 있습니다.

- **최종 삭제** : `delete.retention.ms` 설정에 따라 tombstone도 완전히 삭제됩니다.
    - 기본값은 24시간이며, 이 시간 동안은 tombstone이 유지됩니다.
    - 충분한 시간을 두어 모든 consumer가 삭제 정보를 인지할 수 있도록 합니다.


### Tombstone 활용 시 주의 사항

- **Consumer 처리** : consumer는 `value=null`인 메시지를 받았을 때 적절한 삭제 로직을 구현해야 합니다.
    - 단순히 null check만 하는 것이 아니라 **삭제 의미**로 해석해야 합니다.
    - local cache나 database에서 해당 key를 제거하는 작업이 필요합니다.

- **Producer 설계** : tombstone 전송 전에 일반 삭제 이벤트를 먼저 보내는 것이 좋습니다.
    - CDC 도구들이 이런 패턴을 사용하여 **삭제 정보와 삭제 마킹을 분리**합니다.
    - consumer가 삭제 이유나 삭제된 데이터를 확인할 수 있게 합니다.


---


## Log Compaction 설정 및 최적화

- log compaction을 효과적으로 활용하려면 **workload 특성에 맞는 설정**이 필요합니다.
- 잘못된 설정은 **storage 효율성 저하**나 **compaction 지연**을 초래할 수 있습니다.
- 각 설정값의 의미를 정확히 이해하고 **모니터링을 통해 지속적으로 조정**해야 합니다.


### 핵심 설정 매개변수

- **cleanup.policy=compact** : topic에서 log compaction을 활성화하는 필수 설정입니다.
    - `delete`와 함께 사용하여 `compact,delete`로 설정하면 **하이브리드 방식**으로 동작합니다.
    - 시간 기반 retention과 compaction을 동시에 적용할 수 있습니다.

- **min.cleanable.dirty.ratio** : compaction 실행 임계값을 조정하는 핵심 설정입니다.
    - 값이 작을수록 compaction이 자주 실행되어 **storage 효율성**은 높아지지만 **CPU 부하**가 증가합니다.
    - 값이 클수록 compaction 빈도는 줄어들지만 **중복 데이터**가 오래 남아있습니다.

- **segment.ms / segment.bytes** : compaction 대상이 되는 segment 생성 주기를 결정합니다.
    - 값이 작을수록 compaction이 빨리 시작되지만 **작은 segment들이 많이 생성**됩니다.
    - 값이 클수록 compaction 지연이 발생하지만 **I/O 효율성**은 높아집니다.


### 성능 최적화 전략

- **Memory 할당 최적화** : compaction 과정에서 key-offset mapping을 위한 **충분한 heap memory**가 필요합니다.
    - `log.cleaner.dedupe.buffer.size` 설정으로 compaction 전용 memory를 조정합니다.
    - unique key 개수가 많은 topic일수록 더 많은 memory가 필요합니다.

- **Parallel Processing** : `log.cleaner.threads` 설정으로 compaction **병렬 처리 수준**을 조정합니다.
    - thread 수를 늘리면 여러 topic의 compaction을 동시에 처리할 수 있습니다.
    - 과도한 병렬화는 **disk I/O 경합**을 유발할 수 있으므로 주의가 필요합니다.

- **I/O 최적화** : compaction 작업의 **disk I/O 부하를 분산**시키는 것이 중요합니다.
    - `log.cleaner.io.max.bytes.per.second` 설정으로 compaction I/O를 제한할 수 있습니다.
    - peak time을 피해 compaction이 실행되도록 `min.compaction.lag.ms`를 조정합니다.


### Monitoring 지표

- **Compaction Rate** : `kafka.log:type=LogCleanerManager,name=cleaner-recopy-percent` metric으로 compaction 효율성을 측정합니다.
    - 높은 recopy rate는 **중복 데이터가 많음**을 의미합니다.
    - 낮은 rate는 이미 **잘 압축된 상태**임을 나타냅니다.

- **Lag Monitoring** : compaction 대기 중인 **dirty data의 크기와 비율**을 지속적으로 확인합니다.
    - `kafka.log:type=Log,name=size,topic=*,partition=*` metric으로 전체 log 크기를 추적합니다.
    - dirty ratio가 지속적으로 높다면 compaction 설정을 조정해야 합니다.


---


## 실무 활용 사례와 고려 사항

- log compaction은 **특정 use case에 최적화된 기능**이므로, 모든 상황에 적합하지는 않습니다.
- 도입 전에 **data access pattern과 consistency 요구 사항**을 면밀히 분석해야 합니다.
- 기존 system과의 **호환성 문제**도 충분히 검토해야 합니다.


### 적합한 활용 사례

- **Database Change Data Capture** : 각 table row의 **최신 상태만 관리**하면 되는 CDC pipeline에서 효과적입니다.
    - primary key를 Kafka message key로 사용하여 row별 최신 변경사항만 유지합니다.
    - downstream system이 전체 dataset을 재구성할 때 **전체 scan 시간을 크게 단축**할 수 있습니다.

- **Configuration Store** : application 설정값의 **중앙집중식 관리**에 활용할 수 있습니다.
    - 설정 key별로 최신값만 보존하여 application 재시작 시 빠른 설정 로드가 가능합니다.
    - 설정 변경 이력보다는 **현재 유효한 설정값**이 중요한 환경에 적합합니다.

- **User State Management** : user profile이나 session 정보 같은 **user별 상태 데이터** 관리에 효과적입니다.
    - user ID를 key로 사용하여 각 user의 최신 상태만 유지합니다.
    - real-time personalization이나 recommendation system에서 **빠른 user state 조회**가 가능합니다.


### 부적합한 활용 사례

- **Event Logging** : 모든 event의 **완전한 기록**이 필요한 audit logging에는 적합하지 않습니다.
    - log compaction은 중간 event들을 삭제하므로 **완전한 audit trail을 보장할 수 없습니다**.
    - 규제 요구 사항이 있는 금융이나 의료 분야에서는 주의가 필요합니다.

- **Time Series Data** : 시간 순서대로 **모든 측정값을 보존**해야 하는 monitoring이나 analytics 용도에는 부적합합니다.
    - 같은 sensor ID라도 모든 시점의 측정값이 중요하기 때문입니다.
    - time-based retention이 더 적절한 선택입니다.

- **Message Queue** : **일회성 작업 요청**이나 command 전달 용도로는 적합하지 않습니다.
    - 같은 작업 ID로 여러 번 요청이 와도 **모든 요청을 처리**해야 하는 경우가 많습니다.
    - compaction으로 인해 중간 요청들이 사라지면 **business logic에 문제**가 발생할 수 있습니다.


### Migration 고려 사항

- **기존 Consumer 호환성** : 기존에 time-based retention을 사용하던 consumer들이 **compaction 동작을 올바르게 처리**할 수 있는지 확인해야 합니다.
    - tombstone 메시지 처리 로직이 구현되어 있는지 점검합니다.
    - consumer offset 관리 방식이 compaction과 충돌하지 않는지 검증합니다.

- **Storage 사용량 변화** : compaction 도입 후 **disk 사용 패턴이 크게 변경**될 수 있습니다.
    - key 중복도가 높은 topic은 storage 사용량이 크게 감소합니다.
    - 반대로 unique key가 많은 topic은 예상보다 공간 절약 효과가 적을 수 있습니다.

- **Performance 영향** : compaction **background 작업의 I/O 부하**가 기존 workload에 미치는 영향을 사전에 테스트해야 합니다.
    - peak time에 compaction이 실행되면 **producer/consumer 성능이 저하**될 수 있습니다.
    - compaction thread와 memory 할당을 적절히 조정하여 **resource contention을 최소화**해야 합니다.


---


## Reference

- <https://kafka.apache.org/documentation/#compaction>
- <https://cwiki.apache.org/confluence/display/KAFKA/Log+Compaction>
- <https://docs.confluent.io/platform/current/kafka/post-deployment.html#log-compaction>

