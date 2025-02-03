---
layout: skill
title: Debezium Snapshot의 안정성 보장 전략
date: 2025-01-31
---




## Snapshot 작업을 안정적으로 수행하기

- **source database의 무결한 상태 복제는 전체 CDC system의 신뢰성을 결정**합니다.
    - data 불일치는 system 간 정합성 오류를 발생시킵니다.
    - data 누락이나 중복은 business logic 오류의 원인이 됩니다.
    - 잘못된 snapshot은 운영 중인 system의 장애로 이어질 수 있습니다.

- 따라서, **Debezium은 snapshot 처리 과정에서 안정성을 보장하기 위한 전략을 수립**합니다.
    - **Lock 관리 전략** : lock 관리는 data 일관성과 system 가용성 사이의 균형을 조절합니다.
    - **Data 일관성 보장** : data 일관성은 transaction isolation과 version 관리를 통해 보장됩니다.
    - **Memory 사용량 관리** : memory 사용량은 chunk 단위 처리와 batch 작업을 통해 효율적으로 관리됩니다.


### Lock 관리 전략

- Debezium은 snapshot 수행 시 data 일관성을 보장하기 위해 **최소한의 lock 전략을 사용**합니다.
    - **global read lock은 schema capture 단계에서만 획득하고 해제**합니다.
    - **table level lock은 필요한 경우에만 제한적으로 사용**합니다.

- `snapshot.locking.mode` 설정을 통해 상황에 맞는 lock 전략을 선택할 수 있습니다.
    - **`minimal` mode** : schema capture 단계에서만 lock을 획득하고 해제합니다.
    - **`extended` mode** : snapshot이 완료될 때까지 lock을 유지합니다.
    - **`none` mode** : lock을 전혀 사용하지 않습니다.
        - data 일관성이 보장되지 않을 수 있어 주의가 필요합니다.


### Data 일관성 보장

- **transaction isolation level을 `REPEATABLE READ`로 설정하여 data 일관성을 보장**합니다.
    - snapshot 수행 중 다른 transaction의 변경 사항이 반영되지 않습니다.
    - database 종류에 따라 isolation level이 다르게 적용될 수 있습니다.

- **version 관리를 통해 data의 변경 이력을 추적**합니다.
    - 각 record에 version 정보를 포함시켜 변경 사항을 관리합니다.
    - version 정보를 기반으로 conflict를 해결합니다.


### Memory 사용량 관리

- **table의 record를 chunk 단위로 나누어 처리**합니다.
    - 각 chunk는 독립적으로 처리되어 memory 부하를 분산시킵니다.
    - chunk 크기는 database의 성능과 가용 memory를 고려하여 설정합니다.

- **batch 처리를 통해 대용량 data의 효율적인 처리**가 가능합니다.
    - 한 번에 처리할 record의 수를 제한하여 memory 사용량을 조절합니다.
    - network 부하를 분산시켜 안정적인 data 전송이 가능합니다.




---




## Database 종류별 안정성 보장 방식 차이

- database 종류에 따라 snapshot 수행 시 data 일관성을 보장하는 방식이 다릅니다.
    - database의 특성에 따라 다양한 lock 전략과 isolation level을 적용하여 data 일관성을 유지합니다.

- Debezium은 각각의 database의 특성을 고려하여 안정성 보장 전략을 구현합니다.


### MySQL

- **MySQL**은 **global read lock과 REPEATABLE READ isolation level을 사용**합니다.

- **global read lock**은 모든 database의 read 작업을 block합니다.
    - schema 변경이나 DDL 작업을 차단하여 snapshot 중 구조 변경을 방지합니다.
    - 단기간만 유지되어 서비스 영향도를 최소화합니다.

- **REPEATABLE READ**는 MySQL의 기본 isolation level입니다.
    - transaction이 시작된 시점의 일관된 data를 보장합니다.
    - binlog position과 GTID의 신뢰성을 보장하여 정확한 복제가 가능합니다.


### PostgreSQL

- **PostgreSQL**은 **transaction snapshot과 REPEATABLE READ isolation level을 사용**합니다.

- **transaction snapshot**은 특정 시점의 database 상태를 보장합니다.
    - MVCC(Multi-Version Concurrency Control)를 통해 동시성을 보장합니다.
    - LSN(Log Sequence Number)을 기준으로 일관된 복제가 가능합니다.

- **별도의 lock 없이도 data 일관성 보장이 가능**합니다.
    - snapshot 수행 중에도 write 작업이 가능하여 서비스 영향도가 없습니다.
    - vacuum 작업을 통해 불필요한 version을 정리합니다.


### Oracle

- **Oracle**은 **flashback query와 READ COMMITTED isolation level을 사용**합니다.

- **flashback query**는 과거 시점의 data를 조회하는 기능입니다.
    - undo segment를 통해 과거 시점의 data를 정확하게 복원합니다.
    - CDC 수행 중 발생하는 변경을 누락 없이 포착합니다.

- **SCN(System Change Number)을 기준으로 일관된 data를 조회**합니다.
    - transaction의 commit 순서를 보장하여 일관성을 유지합니다.
    - redo log와 연계하여 변경 사항을 정확하게 추적합니다.


### MongoDB

- **MongoDB**는 **majority read concern과 local read preference를 사용**합니다.

- **majority read concern**은 과반수 node의 동의를 보장합니다.
    - replica set 환경에서 data의 정합성을 보장합니다.
    - network partition 상황에서도 안정적인 동작을 보장합니다.

- **local read preference**는 primary node에서만 read를 수행합니다.
    - replication lag으로 인한 data 불일치를 방지합니다.
    - oplog의 순서를 보장하여 정확한 복제가 가능합니다.


### SQL Server

- **SQL Server**는 **snapshot isolation과 READ COMMITTED isolation level을 사용**합니다.

- **snapshot isolation**은 특정 transaction의 변경 사항을 추적합니다.
    - tempdb를 통해 version 관리가 이루어집니다.
    - transaction log sequence number(LSN)를 기준으로 변경을 추적합니다.

- **READ COMMITTED**는 SQL Server의 기본 isolation level입니다.
    - transaction의 완료 시점에 일관성을 보장합니다.
    - 변경 data의 추적과 동시성을 모두 고려한 설정입니다.
