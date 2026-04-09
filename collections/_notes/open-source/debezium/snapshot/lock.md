---
layout: note
permalink: /254
title: Debezium Snapshot Lock - Data 일관성을 위한 Lock 전략
description: Debezium은 snapshot 수행 시 `snapshot.locking.mode` 설정으로 lock 범위와 지속 시간을 조절하며, `minimal` mode는 schema capture 단계에서만 짧게 lock을 획득하고 `extended` mode는 snapshot 전체 기간 동안 lock을 유지합니다.
date: 2026-04-07
---


## Snapshot 시 Lock이 필요한 이유

- Debezium snapshot은 **source database의 특정 시점 상태를 일관성 있게 복제**하는 작업입니다.
    - snapshot이 진행되는 동안 table schema가 변경되면 capture된 data와 schema가 불일치합니다.
    - 따라서 최소한 schema capture 단계에서는 DDL 변경을 차단해야 합니다.

- lock은 data 일관성을 보장하지만, **lock 유지 시간이 길어질수록 다른 session의 쓰기 작업이 차단**되어 service 가용성이 저하됩니다.
    - Debezium은 `snapshot.locking.mode` 설정으로 lock 전략을 선택하여 일관성과 가용성 사이의 균형을 조절합니다.


---


## `snapshot.locking.mode` 설정

- `snapshot.locking.mode`는 snapshot 수행 시 **database lock의 범위와 지속 시간**을 결정하는 설정입니다.

| Mode | Lock 범위 | 일관성 | 가용성 |
| --- | --- | --- | --- |
| **`minimal`** | schema capture 단계에서만 global lock | `REPEATABLE READ`로 보장 | 높음 |
| **`extended`** | snapshot 전체 기간 동안 global lock | 완벽하게 보장 | 낮음 |
| **`none`** | lock 없음 | schema 변경 시 불일치 가능 | 최고 |


### `minimal` Mode

- **schema capture 단계에서만 짧게 global read lock을 획득하고 즉시 해제**합니다.
    - lock 획득 후 binlog position과 table schema 정보를 수집합니다.
    - 수집이 완료되면 즉시 lock을 해제하고 `REPEATABLE READ` isolation level의 transaction을 시작합니다.

- 실제 data를 읽는 단계에서는 lock이 없지만, `REPEATABLE READ` transaction이 일관된 data를 보장합니다.
    - transaction 시작 시점의 data snapshot을 유지하므로 다른 session의 변경 사항이 반영되지 않습니다.
    - InnoDB engine에서 효과적으로 동작합니다.

- 대부분의 production 환경에서 **기본 권장 mode**입니다.

```mermaid
flowchart LR
    lock[Global Read Lock 획득]
    schema[Schema Capture]
    unlock[Lock 해제]
    tx[REPEATABLE READ Transaction 시작]
    data[Data 읽기]
    commit[Transaction Commit]

    lock --> schema
    schema --> unlock
    unlock --> tx
    tx --> data
    data --> commit
```


### `extended` Mode

- **snapshot의 전체 기간 동안 global read lock을 유지**합니다.
    - 모든 table의 쓰기 작업이 snapshot 완료까지 차단됩니다.
    - schema 변경과 data 변경이 모두 차단되어 완벽한 일관성을 보장합니다.

- `REPEATABLE READ` isolation level과 호환되지 않는 동시 작업이 발생하는 환경에서 사용합니다.
    - MyISAM engine table이 포함된 환경에서 필요합니다.
    - schema 변경이 빈번한 환경에서 안전합니다.

- 장시간 lock이 유지되므로 **대규모 database에서는 심각한 service 중단**이 발생합니다.


### `none` Mode

- **snapshot 중에 어떤 lock도 획득하지 않습니다**.
    - 최고의 가용성을 보장하지만, snapshot 중 schema 변경이 발생하면 data 불일치가 발생합니다.

- `none` mode에서도 engine 유형에 따라 동작이 다릅니다.
    - InnoDB table은 `REPEATABLE READ` transaction으로 data 일관성을 유지합니다.
    - MyISAM table은 MVCC를 지원하지 않으므로 `none` 설정과 관계없이 table lock이 필요합니다.

- schema 변경이 통제된 환경에서만 사용해야 합니다.
    - snapshot 기간 중 DDL이 실행되지 않는다는 보장이 있어야 합니다.


---


## Lock Timeout 설정

- `snapshot.lock.timeout.ms`는 **lock 획득을 시도하는 최대 대기 시간**을 설정합니다.
    - 기본값은 10000(10초)입니다.
    - 다른 transaction이 lock을 보유하고 있으면 이 시간만큼 대기한 후 timeout 시 snapshot이 실패합니다.

- lock 획득 실패로 snapshot이 중단되는 경우, timeout 값을 증가시키거나 database의 long-running transaction을 확인해야 합니다.

```json
{
    "snapshot.lock.timeout.ms": 30000
}
```


---


## Database별 Lock 동작 차이

- database engine에 따라 lock의 실제 동작과 영향이 다릅니다.

| Database | Lock 방식 | MVCC 지원 | `minimal` Mode 시 영향 |
| --- | --- | --- | --- |
| **MySQL (InnoDB)** | `FLUSH TABLES WITH READ LOCK` | O | lock 해제 후 `REPEATABLE READ`로 일관성 유지, 쓰기 차단 없음 |
| **MySQL (MyISAM)** | `FLUSH TABLES WITH READ LOCK` | X | 전체 snapshot 기간 동안 쓰기 차단 |
| **PostgreSQL** | Transaction Snapshot | O | lock 없이 MVCC로 일관성 보장 |
| **MongoDB** | Majority Read Concern | O | lock 없이 일관성 보장 |

- InnoDB 환경에서는 `minimal` mode가 가장 효율적입니다.
    - global read lock은 millisecond 단위로 짧게 유지되며, 이후 MVCC가 data 일관성을 보장합니다.

- MyISAM 환경에서는 MVCC를 지원하지 않아 `minimal` mode에서도 실질적으로 `extended`와 유사한 영향을 줍니다.
    - 가능하면 InnoDB로 table을 변환하는 것이 권장됩니다.


---


## Reference

- <https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-property-snapshot-locking-mode>
- <https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-property-snapshot-lock-timeout-ms>

