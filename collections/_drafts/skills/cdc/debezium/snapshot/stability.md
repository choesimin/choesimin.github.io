---
layout: skill
title: Debezium Snapshot의 안정성 보장 전략
date: 2025-01-31
---



## Debezium Snapshot Stability : Snapshot의 안정성 보장하기

- [여기에 개요가 올 것임]


### Lock 관리 전략

- Debezium은 snapshot 수행 시 data 일관성을 보장하기 위해 최소한의 lock 전략을 사용합니다.
    - global read lock은 schema capture 단계에서만 획득하고 해제합니다.
    - table level lock은 필요한 경우에만 제한적으로 사용합니다.

- `snapshot.locking.mode` 설정을 통해 상황에 맞는 lock 전략을 선택할 수 있습니다.
    - **Minimal mode** : schema capture 단계에서만 lock을 획득하고 해제합니다.
    - **Extended mode** : snapshot이 완료될 때까지 lock을 유지합니다.
    - **None mode** : lock을 전혀 사용하지 않습니다.
        - data 일관성이 보장되지 않을 수 있어 주의가 필요합니다.


### Data 일관성 보장

- transaction isolation level을 `REPEATABLE READ`로 설정하여 data 일관성을 보장합니다.
    - snapshot 수행 중 다른 transaction의 변경 사항이 반영되지 않습니다.
    - database 종류에 따라 isolation level이 다르게 적용될 수 있습니다.
- version 관리를 통해 data의 변경 이력을 추적합니다.
    - 각 record에 version 정보를 포함시켜 변경 사항을 관리합니다.
    - version 정보를 기반으로 conflict를 해결합니다.


### Memory 사용량 관리

- Table의 record를 chunk 단위로 나누어 처리합니다.
    - 각 chunk는 독립적으로 처리되어 memory 부하를 분산시킵니다.
    - Chunk 크기는 database의 성능과 가용 memory를 고려하여 설정합니다.

- Batch 처리를 통해 대용량 data의 효율적인 처리가 가능합니다.
    - 한 번에 처리할 record의 수를 제한하여 memory 사용량을 조절합니다.
    - Network 부하를 분산시켜 안정적인 data 전송이 가능합니다.




















- Debezium을 통한 source database의 초기 snapshot 작업은 data의 정확성과 안정성이 매우 중요합니다.
    - 수백만 건의 record가 이동하는 과정에서 누락이나 중복 없이 정확한 복제가 이루어져야 합니다.
    - System 자원을 효율적으로 사용하면서도 운영 환경의 성능에 미치는 영향을 최소화해야 합니다.



---



## Lock 전략을 통한 Data 정합성 확보


### Global Lock 관리
- Debezium은 snapshot 시작 시점에 global read lock을 획득합니다.
    - Schema 구조를 capture하는 단계에서만 잠시 global lock이 필요합니다.
    - Schema capture가 완료되면 즉시 global lock을 해제하여 system 영향도를 최소화합니다.
- Schema 변경이 빈번한 환경에서는 global lock 시간을 최소화하는 것이 중요합니다.
    - Schema 변경이 lock 획득 시점과 겹치면 dead lock이 발생할 수 있습니다.
    - Dead lock 방지를 위해 schema 변경 작업은 snapshot이 없는 시간대에 진행하는 것이 좋습니다.

### Table Lock 관리
- Table 단위의 lock은 상황에 따라 선택적으로 적용됩니다.
    - Table의 크기와 변경 빈도에 따라 적절한 lock 전략을 선택해야 합니다.
    - 대용량 table의 경우 lock으로 인한 service 영향도를 고려해야 합니다.
- `snapshot.locking.mode` 설정을 통해 3가지 lock 전략을 제공합니다.
    - **Minimal mode**는 schema capture 단계에서만 짧게 lock을 획득합니다.
        - 일반적인 환경에서 가장 권장되는 mode입니다.
        - Schema capture 완료 후 즉시 lock이 해제되어 service 영향도가 적습니다.
    - **Extended mode**는 snapshot이 완료될 때까지 lock을 유지합니다.
        - Data 정합성이 매우 중요한 환경에서 사용됩니다.
        - Snapshot 동안 data 변경이 없어 완벽한 정합성을 보장합니다.
    - **None mode**는 lock을 전혀 사용하지 않습니다.
        - Service 영향도를 최소화해야 하는 환경에서 사용됩니다.
        - Data 정합성이 완벽하지 않을 수 있어 주의가 필요합니다.

---

## Data 정합성 보장 방안

### Transaction Isolation Level 관리
- Snapshot 수행 시 transaction isolation level을 `REPEATABLE READ`로 설정합니다.
    - 하나의 transaction 내에서 동일한 query를 실행하면 항상 같은 결과를 보장합니다.
    - Snapshot 도중 다른 transaction의 변경 사항이 조회되지 않아 일관된 data를 확보합니다.
- Database 종류별로 isolation level 지원 범위가 다릅니다.
    - MySQL은 `REPEATABLE READ`를 기본으로 제공합니다.
    - PostgreSQL은 `READ COMMITTED`가 기본이며 필요시 상향 조정이 가능합니다.
    - Oracle은 `READ COMMITTED`가 기본이며 `SERIALIZABLE`로 상향 조정이 가능합니다.

### Version 기반 Conflict 관리
- 각 record에 version 정보를 포함하여 변경 이력을 추적합니다.
    - Version 정보는 timestamp나 일련번호 형태로 관리됩니다.
    - Source와 target의 version을 비교하여 최신 상태를 유지합니다.
- Conflict 발생 시 version 정보를 기준으로 해결합니다.
    - 동일 record가 여러 번 변경된 경우 version이 높은 data를 우선합니다.
    - Version 충돌이 발생하면 log에 기록하고 관리자 확인이 필요합니다.

---

## Memory 사용량 최적화 전략

### Chunk 기반 Record 처리
- Table의 모든 record를 chunk 단위로 분할하여 처리합니다.
    - Primary key 값을 기준으로 일정 크기의 chunk로 나눕니다.
    - 각 chunk는 독립적인 transaction으로 처리되어 memory 부하를 분산시킵니다.
- Chunk 크기는 환경에 맞게 최적화가 필요합니다.
    - Memory 여유가 충분하면 chunk 크기를 늘려 처리 속도를 높입니다.
    - Memory가 제한적이면 chunk 크기를 줄여 안정성을 확보합니다.

### Batch 처리 최적화
- Record를 일정 단위의 batch로 묶어 처리합니다.
    - 한 번의 network 통신으로 여러 record를 전송하여 효율성을 높입니다.
    - Batch 크기는 memory와 network 상황을 고려하여 설정합니다.
- 실패한 batch는 retry 매커니즘을 통해 복구합니다.
    - Batch 단위로 실패를 감지하고 해당 batch만 재처리합니다.
    - Retry 횟수와 간격을 설정하여 안정적인 복구를 보장합니다.

### Memory Monitoring
- Memory 사용량을 실시간으로 monitoring합니다.
    - JVM heap 사용량을 주기적으로 확인합니다.
    - Memory leak이 의심되면 heap dump를 생성하여 분석합니다.
- Memory 임계치 도달 시 대응 방안을 마련합니다.
    - Memory 사용량이 임계치에 도달하면 alert을 발생시킵니다.
    - 자동 scaling이나 batch 크기 조정으로 대응합니다.