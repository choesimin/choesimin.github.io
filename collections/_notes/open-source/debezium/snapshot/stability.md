---
layout: note
permalink: /416
title: Debezium Snapshot Stability - 안정성 보장 전략
description: Debezium snapshot의 안정성은 lock 전략으로 schema 일관성을, `REPEATABLE READ` isolation으로 data 일관성을, chunk/batch 처리로 memory 안정성을 각각 확보하며, database 종류별로 보장 방식이 다릅니다.
date: 2026-04-07
---


## Snapshot 안정성이 중요한 이유

- **source database의 무결한 상태 복제는 전체 CDC pipeline의 신뢰성을 결정**합니다.
    - snapshot data가 불일치하면 이후 streaming 단계에서 처리하는 모든 event의 기준이 잘못됩니다.
    - data 누락이나 중복은 target system의 business logic 오류로 이어집니다.
    - 잘못된 snapshot은 전체 CDC pipeline을 재구축해야 하는 상황을 초래합니다.

- Debezium은 snapshot 안정성을 **세 가지 축**으로 보장합니다.
    - **Lock 전략** : schema 일관성을 보장하면서 service 가용성과의 균형을 조절합니다.
    - **Transaction Isolation** : data 일관성을 `REPEATABLE READ` isolation level로 보장합니다.
    - **Memory 관리** : chunk/batch 처리로 대용량 data를 안정적으로 처리합니다.


---


## Lock 전략에 의한 Schema 일관성

- snapshot 수행 중 table schema가 변경되면 **capture된 data와 schema의 불일치**가 발생합니다.
    - column이 추가된 후 data를 읽으면, snapshot 시작 시점의 schema와 다른 구조의 data가 capture됩니다.
    - column type이 변경되면 이미 capture된 data의 type 정보가 실제 data와 맞지 않게 됩니다.

- Debezium은 **`snapshot.locking.mode` 설정으로 schema 일관성을 보장**합니다.
    - `minimal` : schema capture 단계에서만 global read lock을 획득하고 즉시 해제합니다.
    - `extended` : snapshot 전체 기간 동안 global read lock을 유지합니다.
    - `none` : lock을 사용하지 않으며, schema 변경이 통제된 환경에서만 안전합니다.

- 대부분의 InnoDB 환경에서는 `minimal` mode로 충분합니다.
    - lock은 millisecond 단위로 짧게 유지되어 service 영향이 거의 없습니다.
    - schema capture 이후에는 `REPEATABLE READ` transaction이 data 일관성을 보장합니다.


---


## Transaction Isolation에 의한 Data 일관성

- snapshot 중 다른 session의 DML(INSERT, UPDATE, DELETE)이 실행되면 읽고 있는 data의 일관성이 깨질 수 있습니다.
    - 같은 table을 읽는 도중 다른 session이 row를 변경하면 변경 전/후 data가 혼재됩니다.

- Debezium은 **`REPEATABLE READ` isolation level의 transaction을 시작하여 snapshot 시점의 data를 고정**합니다.
    - transaction 시작 시점 이후의 변경 사항은 snapshot에 반영되지 않습니다.
    - InnoDB의 MVCC(Multi-Version Concurrency Control)가 변경 전 version의 data를 유지합니다.

- `REPEATABLE READ`는 lock과 다르게 **다른 session의 쓰기 작업을 차단하지 않습니다**.
    - snapshot 중에도 application의 정상적인 읽기/쓰기 작업이 가능합니다.
    - InnoDB engine에서만 MVCC가 동작하며, MyISAM engine에서는 table lock이 필요합니다.


---


## Memory 관리에 의한 처리 안정성

- 대용량 table의 snapshot은 **모든 record를 한 번에 memory에 올리면 OutOfMemoryError**가 발생합니다.
    - 수백만 건 이상의 record를 가진 table은 batch 처리 없이는 snapshot이 불가능합니다.

- Debezium은 **두 가지 방법으로 memory 사용량을 조절**합니다.


### Batch 처리 : `snapshot.fetch.size`

- `snapshot.fetch.size`는 **database에서 한 번에 fetch하는 record 수**를 지정합니다.
    - 기본값은 2000입니다.
    - 값을 줄이면 memory 사용량이 감소하지만 database와의 round trip이 증가합니다.
    - 값을 늘리면 처리 속도가 빨라지지만 memory 사용량이 증가합니다.

```json
{
    "snapshot.fetch.size": 5000
}
```

- 적절한 fetch size는 **record 크기, JVM heap size, network 대역폭**을 종합적으로 고려하여 결정합니다.
    - column 수가 많거나 BLOB/TEXT column이 포함된 table은 fetch size를 줄여야 합니다.


### Chunk 처리 : Incremental Snapshot

- **incremental snapshot**은 table을 primary key 기준으로 chunk 단위로 분할하여 처리합니다.
    - 전체 table을 한 번에 처리하지 않고, chunk 단위로 나누어 순차적으로 읽습니다.
    - 각 chunk는 독립적으로 처리되므로 memory 부하가 분산됩니다.

- `snapshot.max.threads` 설정으로 **snapshot의 병렬 처리 thread 수**를 조절 가능합니다.
    - 기본값은 1이며, 값을 늘리면 여러 table을 동시에 처리합니다.
    - thread 수를 늘리면 snapshot 완료 시간이 단축되지만 database 부하가 증가합니다.


---


## Database별 안정성 보장 방식

- database 종류에 따라 snapshot 안정성 보장 방식이 다릅니다.

| Database | Lock 방식 | Isolation | 특징 |
| --- | --- | --- | --- |
| MySQL (InnoDB) | Global Read Lock (짧게) | `REPEATABLE READ` | MVCC로 lock 해제 후에도 일관성 유지 |
| MySQL (MyISAM) | Global Read Lock (전체) | 없음 (MVCC 미지원) | 전체 snapshot 동안 쓰기 차단 |
| PostgreSQL | 없음 | `REPEATABLE READ` | MVCC로 lock 없이 일관성 보장 |
| Oracle | 없음 | Flashback Query | SCN 기반 과거 시점 data 조회 |
| MongoDB | 없음 | Majority Read Concern | replica set의 과반수 동의 기반 일관성 |
| SQL Server | 없음 | Snapshot Isolation | tempdb 기반 version 관리 |


### MySQL InnoDB

- **global read lock을 짧게 획득한 후 `REPEATABLE READ` transaction으로 전환**합니다.
    - lock은 binlog position과 schema 정보 획득에만 사용됩니다.
    - InnoDB의 MVCC가 transaction 시작 시점의 일관된 data를 보장합니다.

- production 환경에서 가장 균형 잡힌 안정성 보장 방식입니다.


### MySQL MyISAM

- **MyISAM은 MVCC를 지원하지 않아 전체 snapshot 기간 동안 lock이 필요**합니다.
    - 모든 쓰기 작업이 차단되어 대규모 table에서는 심각한 service 영향이 발생합니다.
    - 가능하면 InnoDB로 table engine을 변환하는 것이 권장됩니다.


### PostgreSQL

- **별도의 lock 없이 `REPEATABLE READ` transaction만으로 일관성을 보장**합니다.
    - PostgreSQL의 MVCC가 snapshot 시작 시점의 data version을 유지합니다.
    - snapshot 중에도 쓰기 작업이 가능하여 service 영향이 없습니다.

- replication slot이 WAL segment의 삭제를 방지하여 data 유실 없이 streaming으로 전환 가능합니다.


### MongoDB

- **Majority Read Concern으로 replica set의 과반수 node가 동의한 data만 읽습니다**.
    - network partition 상황에서도 일관된 data를 보장합니다.
    - resume token을 통해 snapshot 이후 변경 사항의 누락 없이 streaming으로 전환합니다.


---


## Snapshot 안정성 점검 항목

- snapshot을 수행하기 전에 안정성을 확보하기 위한 점검이 필요합니다.

| 점검 항목 | 확인 내용 | 설정 |
| --- | --- | --- |
| Lock 전략 | service 가용성 요구에 맞는 locking mode 선택 | `snapshot.locking.mode` |
| Lock Timeout | lock 획득 대기 시간이 충분한지 확인 | `snapshot.lock.timeout.ms` |
| Memory | JVM heap size와 fetch size의 적합성 | `snapshot.fetch.size`, `-Xmx` |
| Disk | transaction log retention 기간 확인 | `binlog_expire_logs_seconds` (MySQL) |
| Network | database connection timeout 설정 | `database.connectionTimeout` |


---


## Reference

- <https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-snapshots>
- <https://debezium.io/documentation/reference/stable/connectors/postgresql.html#postgresql-snapshots>
- <https://debezium.io/documentation/reference/stable/connectors/mongodb.html#mongodb-snapshots>

