---
layout: skill
title: Debezium Snapshot - 모든 Data Capture
date: 2025-01-31
---




## Debezium Snapshot : Database의 초기 상태를 복사하기

- snapshot은 **source database의 전체 data를 특정 시점에 한꺼번에 capture하는 Debezium의 핵심 기능**입니다.
    - 최초 connection 시점의 source database 상태(전체 table과 schema)를 capture하여 target system으로 전송합니다.
    - database의 **현재 상태를 일관성 있게 유지하는 것이 snapshot의 최종 목적**입니다.

- snapshot은 Debezium connector 최초 실행 시 반드시 필요한 과정입니다.
    - connector가 database의 transaction log를 읽기 시작하는 시점 이전의 data를 확보하기 위함입니다.
        - binary log나 transaction log의 시작점도 함께 capture됩니다.
    - snapshot을 통해 data의 완전성을 보장할 수 있게 됩니다.


### Snapshot의 필요성

- snapshot은 **source database와 target system 간의 초기 data 동기화**를 수행합니다.
    - CDC(Change Data Capture) process가 시작되기 전의 기존 data를 복제해야 할 필요가 있습니다.
    - **CDC는 새로운 변경 사항만을 감지**하므로, **초기 상태를 복제하는 과정이 필수적**입니다.

- **database의 장애나 중단 상황 이후 data 일관성을 보장**합니다.
    - system 장애로 인한 data 불일치 문제를 해결할 수 있습니다.
    - **snapshot을 통해 source database의 현재 상태를 완전히 복제**할 수 있어, binary log나 transaction log가 유실된 경우에도 data 복구가 가능합니다.
        - 예를 들어, when_needed mode를 사용하면 log 유실 시 자동으로 snapshot을 수행하여 복구합니다.


### Snapshot의 주요 특징

- snapshot은 **transaction 단위로 수행**되며, data의 일관성을 보장하기 위해 **ACID 속성을 준수**합니다.
    - **Atomicity** : snapshot의 모든 작업이 완료되거나 모두 취소됩니다.
    - **Consistency** : database의 제약 조건과 규칙이 유지됩니다.
    - **Isolation** : 다른 transaction의 영향을 받지 않습니다.
    - **Durability** : 완료된 snapshot은 영구적으로 보존됩니다.

- snapshot은 **source database의 성능에 영향을 최소화**하도록 설계되었습니다.
    - **chunk 단위의 data 읽기**를 수행합니다.
    - **lock 시간을 최소화**하는 전략을 사용합니다.
    - **resource 사용을 조절**할 수 있는 설정을 제공합니다.

- snapshot은 **다양한 mode를 제공**하여 상황에 맞는 유연한 설정이 가능합니다.
    - **Initial mode** : 최초 한 번만 snapshot을 수행합니다.
    - **Schema only mode** : schema 정보만 capture합니다.
    - **Never mode** : snapshot을 수행하지 않습니다.
    - **When needed mode** : 필요한 경우에만 snapshot을 수행합니다.


### Snapshot의 다양한 Mode

| Mode | 주요 기능 | 사용 목적 | 특이 사항 |
| --- | --- | --- | --- |
| **initial** | 최초 실행 시 전체 snapshot, 이후 변경분 capture | 일반적인 CDC 구성, 운영 환경 | 기본 mode, 가장 안정적 |
| **initial_only** | 전체 snapshot 후 종료 | 일회성 data 이관, test 환경 구성 | 변경분 capture 미수행 |
| **never** | snapshot 미수행, 변경분만 capture | 기존 동기화 환경 재시작 | log position 정보 필요 |
| **schema_only** | schema만 snapshot | schema 관리, version 추적 | data 동기화 미수행 |
| **when_needed** | 필요 시에만 snapshot 수행 | 고가용성 환경, 자동 복구 | 장애 상황 대응 용이 |
| **custom** | 사용자 정의 snapshot 수행 | 복잡한 business 요구 사항 대응 | 개발 전문 지식 필요 |

- 상황에 맞추어 적절한 mode를 선택하여 사용합니다.
    - production 환경에서는 `initial` mode가 권장됩니다.
    - 일회성 data 이관이나 test 환경 구성 시에는 `initial_only` mode를 사용합니다.
    - disaster recovery 구성 시에는 `never` mode를 사용합니다.
    - schema 관리 목적으로는 `schema_only` mode를 사용합니다.
    - 고가용성이 요구되는 환경에서는 `when_needed` mode를 사용합니다.
    - `custom` mode는 개발 전문 지식이 필요하므로 주의가 필요합니다.

| Mode | Data 복제 | Schema 복제 | 변경분 Capture | 자동 복구 |
| --- | --- | --- | --- | --- |
| **initial** | O | O | O | X |
| **initial_only** | O | O | X | X |
| **never** | X | O | O | X |
| **schema_only** | X | O | X | X |
| **when_needed** | O | O | O | O |
| **custom** | 설정 가능 | 설정 가능 | 설정 가능 | 설정 가능 |


### Snapshot 수행 시 고려 사항

- snapshot은 **database의 부하를 발생시키는 작업**입니다.
    - 전체 data를 읽어야 하므로 resource 사용량이 증가합니다.
    - 따라서 운영 시간을 피해서 수행하는 것이 좋습니다.

- **large table의 경우 snapshot에 많은 시간이 소요**될 수 있습니다.
    - table size에 비례하여 수행 시간이 증가합니다.
    - 필요한 경우 table 단위로 나누어 수행할 수 있습니다.

- **snapshot 도중 발생하는 변경 사항은 transaction log를 통해 capture**됩니다.
    - snapshot이 완료될 때까지 변경 사항은 buffer에 저장됩니다.
    - snapshot 완료 후 buffer의 변경 사항은 debezium이 자동으로 처리합니다.
        - connector의 내부적인 작동 방식으로, 별도의 설정이 필요하지 않습니다.
    - **buffer에 저장된 변경 사항들은 snapshot 완료 직후 순차적으로 처리**됩니다.




---




## Snapshot 활용하기

- snapshot은 다양한 상황에서 활용 가능합니다.
    - 신규 system 구축, disaster recovery, data warehouse 구축, 초기 data 이관, 변경 사항 추적, data 분석 등.


### 일반적인 활용 사례

- **신규 system 구축 시 초기 data 이관**에 활용됩니다.
    - legacy system의 전체 data를 새로운 system으로 안전하게 복제할 수 있습니다.
    - 이관 후 실시간 동기화까지 자연스럽게 연결됩니다.

- **disaster recovery 구성**에 활용됩니다.
    - backup system의 초기 구성에 사용됩니다.
    - 장애 발생 시 data 복구의 기준점으로 활용됩니다.

- **data warehouse 구축**에 활용됩니다.
    - 운영 database의 전체 data를 분석용 database로 복제할 수 있습니다.
    - 실시간성이 보장되는 data warehouse를 구성할 수 있습니다.


### 성능 최적화 방안

- **대용량 table의 경우 chunk 단위 처리 기능을 활용**합니다.
    - table을 적절한 크기의 chunk로 분할하여 처리합니다.
    - Memory 사용량을 안정적으로 유지할 수 있습니다.

- **index를 활용하여 scanning 성능을 향상**시킵니다.
    - primary key나 unique index를 기준으로 순차적 scanning을 수행합니다.
    - 불필요한 random access를 최소화합니다.

- **network 대역폭을 고려한 batch size를 설정**합니다.
    - `snapshot.fetch.size` 값을 network 환경에 맞게 조정합니다.
    - 너무 큰 값은 memory 부하를, 너무 작은 값은 성능 저하를 유발할 수 있습니다.


### 모니터링 방안

- **JMX**를 통해 snapshot 진행 상황을 모니터링합니다.
    - 진행률, 처리된 record 수, 소요 시간 등을 확인할 수 있습니다.
    - 성능 지표를 수집하여 추세를 분석할 수 있습니다.

- **log level을 조정**하여 상세한 진행 정보를 확인합니다.
    - INFO level에서는 주요 단계별 진행 상황이 출력됩니다.
    - DEBUG level에서는 세부적인 처리 내용까지 확인할 수 있습니다.

- **metric 수집 도구와 연동**하여 지속적인 monitoring을 수행합니다.
    - Prometheus, Grafana 등의 도구를 활용할 수 있습니다.
    - alert 설정을 통해 이상 상황에 신속하게 대응할 수 있습니다.




---




## Snapshot 시 발생 가능한 문제와 해결 방안

- snapshot 수행 시 다양한 문제가 발생할 수 있습니다.
    - 일반적으로 lock 관련 문제, memory 부족, network 지연 등이 주요 원인입니다.

- 각 문제에 따라 설정을 조정하여 문제를 해결할 수 있습니다.


### Lock 획득 실패 문제 : Lock 전략 조정

- **lock 획득 실패로 인한 snapshot 중단**이 발생할 수 있습니다.
    - database의 다른 transaction이 lock을 보유하고 있는 경우 발생합니다.
    - `snapshot.locking.timeout.ms` 값을 초과하면 Snapshot이 실패합니다.

- 이러한 lock 관련 문제는 **lock 전략을 조정하여 해결**합니다.
    - `snapshot.locking.mode`를 `minimal`로 설정하여 lock 시간을 최소화합니다.
    - `snapshot.locking.timeout.ms` 값을 증가시켜 대기 시간을 늘립니다.


### Memory 부족 문제 : Batch 처리 조정

- **memory 부족으로 인한 성능 저하**가 발생할 수 있습니다.
    - 너무 큰 fetch size 설정이 원인이 될 수 있습니다.
    - heap memory 부족으로 GC가 빈번하게 발생할 수 있습니다.

- memory 문제는 **batch 처리 설정을 조정하여 해결**합니다.
    - `snapshot.fetch.size` 값을 적절히 감소시킵니다.
    - 또는 **JVM heap size를 증가**시킵니다.


### Network 지연 문제 : Timeout 설정 조정

- **network timeout으로 인한 연결 끊김**이 발생할 수 있습니다.
    - 대용량 data 전송 시 network 지연이 발생할 수 있습니다.
    - connection timeout 설정이 너무 짧은 경우 발생할 수 있습니다.

- network 문제는 **timeout 설정을 조정하여 해결**합니다.
    - connection timeout 값을 증가시킵니다.
    - 또는 **network 대역폭을 고려하여 batch size를 조정**합니다.
