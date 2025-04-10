---
layout: note
permalink: /308
title: Debezium Snapshot과 MySQL Table Lock (MyISAM와 InnoDB 비교)
description: Debezium이 MySQL table을 snapshot하는 과정에서, MyISAM table에는 lock이 걸리고, InnoDB table에는 lock이 걸리지 않습니다.
date: 2025-04-10
---


## Debezium이 MySQL Snapshot Data의 일관성을 보장하는 방법

- Debezium은 database의 변경 사항을 실시간으로 포착하여 다른 system으로 전달하는 CDC(Change Data Capture) tool입니다.

- 초기 data 동기화를 위해 Debezium은 연결된 database의 'snapshot'을 생성합니다.
    - `initial` mode로 설정된 경우, Debezium은 connector가 처음 시작할 때 snapshot을 수행합니다.
    - `initial_only` mode로 설정된 경우, snapshot만 수행하고 종료합니다.
    - `no_data` mode로 설정된 경우, schema만 snapshot하고 data는 snapshot하지 않습니다.

- Debezium은 snapshot 과정을 통해 일관된 database 상태를 포착하여 CDC 과정의 기준점으로 사용합니다.
    - 따라서 snapshot **작업 시점의 database 상태**를 정확히 반영해야 합니다.
    - snapshot이 진행되는 동안 다른 session에서 data를 변경했을 때, 변경된 해당 data를 snapshot에 포함시키면 snapshot data의 일관성이 깨질 수 있습니다.

- MySQL에서 Debezium이 snapshot data의 일관성을 보장하는 방법으로 **table 잠금 방식**과 **MVCC 방식**이 있으며, storage engine에 따라 사용하는 방식이 달라집니다.
    - **MyISAM engine table이 대상**인 경우, Debezium은 **table lock을 사용하여 snapshot을 생성**합니다.
        - MyISAM engine은 MVCC를 지원하지 않기 때문에, 일관된 snapshot을 위해 table 잠금이 필요합니다.
        - snapshot 과정 중 다른 session의 쓰기 작업이 차단되어, 대규모 table에서는 service 중단까지 될 수 있습니다.
    - **InnoDB engine table이 대상**인 경우, Debezium은 **InnoDB의 MVCC 기능을 활용하여 snapshot을 생성**합니다.
        - InnoDB engine은 MVCC를 지원하여, table lock 없이도 일관된 snapshot을 생성할 수 있습니다.
        - snapshot 중에도 다른 session의 쓰기 작업이 가능하여, production 환경에서 service 영향을 최소화할 수 있습니다.

| 구분 | MyISAM | InnoDB |
| --- | --- | --- |
| 일관성 보장 방식 | Table Lock (물리적 잠금) | `REPEATABLE READ` (논리적 일관성) |
| 작업 종류 | table에 직접 잠금 적용 | 읽기 일관성을 유지하는 transaction의 격리 수준 |
| 영향도 | 다른 session의 쓰기 작업을 물리적으로 차단 | 다른 session의 쓰기를 차단하지 않음 |

- table 잠금은 table에 적용되지만, 격리 수준은 transaction 내 읽기 일관성에 관련됩니다.
    - table 잠금은 database의 물리적 구조에 영향을 미칩니다.
    - 격리 수준은 database의 논리적 동작에 영향을 미칩니다.

- Debezium으로 snapshot을 진행할 때는, 일반적으로 MyISAM engine table보단 InnoDB engine table을 대상으로 하는 것이 더 좋습니다.
    - InnoDB engine은 MVCC를 지원하여 snapshot을 수행하는 동안 다른 session의 쓰기 작업이 가능합니다.
    - MyISAM engine은 MVCC를 지원하지 않아 snapshot 중 다른 session의 쓰기 작업이 차단됩니다.
    - 따라서 대규모 production 환경에서는 InnoDB engine을 사용하는 것이 더 안전합니다.


---


## MyISAM Snapshot : Table Lock

- MyISAM engine은 MVCC를 지원하지 않아 Debezium이 일관된 snapshot을 생성하기 위해서는 table에 잠금을 적용해야 합니다.

- Debezium은 MyISAM table에 대한 snapshot 과정에서 `FLUSH TABLES WITH READ LOCK` 명령을 사용합니다.
    - 이 명령은 모든 table의 cache를 disk에 기록하고 전체 database에 read lock을 설정합니다.
    - read lock이 설정되면 어떤 session도 table에 대한 쓰기 작업을 수행할 수 없습니다.

- Debezium의 MyISAM table snapshot 과정은 "lock -> binlog 위치 확인 -> schema와 data 읽기 -> unlock"의 순서로 진행됩니다.
    1. `FLUSH TABLES WITH READ LOCK` 명령을 실행하여 global read lock을 설정합니다.
    2. binlog 위치를 확인하여 snapshot 시점을 기록합니다.
    3. table schema와 data를 순차적으로 읽어옵니다.
    4. 모든 table에 대한 읽기가 완료된 후 lock을 해제합니다.

- MyISAM table의 snapshot은 가용성을 보장하지 않기 때문에, 대규모 production 환경에서는 사용에 주의해야 합니다.
    - snapshot 수행 시 다른 모든 쓰기 작업이 차단되어 application의 성능에 영향을 미칩니다.
    - table의 크기가 클수록 snapshot 시간이 증가하여 lock 시간도 길어집니다.
    - 긴 잠금 시간은 production 환경에서 심각한 service 중단을 초래할 수 있습니다.
    - 안정성과 일관성은 보장되지만 높은 가용성을 요구하는 환경에는 적합하지 않습니다.

- Debezium 사용 시 MyISAM table에 대한 snapshot을 안전하게 수행하기 위해서는 최대한 system 부하가 적은 시간대를 활용하는 것이 좋습니다.
    - 가능하면 snapshot을 system 부하가 적은 시간대에 수행합니다.
    - 중요 table은 InnoDB로 변환하여 MVCC 기능을 활용합니다.
    - snapshot 전략을 `schema_only`나 `never`로 설정하여 초기 snapshot을 생략하는 방법도 고려할 수 있습니다.
    - 대규모 database의 경우 별도의 replica에서 snapshot을 수행하여 production 영향을 최소화합니다.


---


## InnoDB Snapshot : MVCC

- InnoDB engine에서 Debezium은 MVCC(Multi-Version Concurrency Control) 기능을 활용하여 table lock 없이 일관된 snapshot을 생성합니다.
    - 더 정확히는 table lock을 아주 짧은 시간 동안만 사용합니다.

- Debezium의 InnoDB table snapshot 과정은 "lock -> binlog 위치 확인 -> 즉시 unlock -> transaction 시작 -> schema와 data 읽기 -> transaction commit"의 순서로 진행됩니다.
    1. 짧은 시간 동안 `FLUSH TABLES WITH READ LOCK` 명령을 실행하여 binlog 위치만 획득합니다.
       - 이 lock은 위치 확인 즉시 해제되므로 service 영향이 최소화됩니다.
    2. `START TRANSACTION WITH CONSISTENT SNAPSHOT` 명령으로 `REPEATABLE READ` 격리 수준의 transaction을 시작합니다.
       - 이 명령은 transaction 시작 시점의 database 상태에 대한 논리적 snapshot을 생성합니다.
    3. transaction 내에서 table schema와 data를 읽어옵니다.
       - 다른 session의 변경사항은 현재 transaction에 영향을 주지 않습니다.
    4. 모든 table의 읽기가 완료된 후 transaction을 commit합니다.

- InnoDB snapshot은 MVCC를 활용하여 일관된 snapshot을 생성하며, 대규모 production 환경에서 사용하기 적합합니다.
    - snapshot 과정 중에도 다른 session의 table 쓰기 작업이 가능합니다.
    - 전체 database service 가용성을 유지하면서 일관된 snapshot을 생성할 수 있습니다.
    - table의 크기와 관계없이 lock 시간이 매우 짧아(밀리초 단위) service 영향이 거의 없습니다.
    - 대규모 production 환경에서도 안전하게 사용할 수 있습니다.

- `REPEATABLE READ` 격리 수준은 InnoDB의 기본 transaction 격리 수준으로, transaction 내에서 일관된 읽기를 보장합니다.
    - transaction이 시작된 시점의 data 상태를 볼 수 있으며, 이후 다른 transaction이 변경한 내용은 보이지 않습니다.
    - `REPEATABLE READ` 격리 수준은 MyISAM의 물리적 table lock과 달리 **논리적인** 일관성을 제공합니다.

- connector와 snapshot 설정으로 Debezium의 InnoDB snapshot 과정을 최적화할 수 있습니다.
    - `snapshot.mode`를 상황에 맞게 설정하여 불필요한 snapshot을 방지합니다.
    - `snapshot.fetch.size` 설정으로 대량의 data를 처리할 때 메모리 사용량을 조절할 수 있습니다.
    - `snapshot.select.statement.overrides` 설정으로 특정 table의 snapshot query를 최적화할 수 있습니다.
    - 여러 connector를 병렬로 실행하여 대규모 database의 snapshot 시간을 단축할 수 있습니다.


---


## Debezium `snapshot.locking.mode` 설정

- Debezium은 `snapshot.locking.mode` 설정을 통해 snapshot 수행 시의 database lock 범위와 지속 시간을 조절할 수 있습니다.
    - snapshto locking mode 설정은 snapshot 중 database의 일관성과 가용성 사이의 균형을 맞추는 데 중요한 역할을 합니다.

- `snapshot.locking.mode`에는 `minimal`, `extended`, `none`의 3가지 option이 있습니다.
    - 각 option은 snapshot 수행 시 table lock을 어떻게 처리할지를 정의합니다.

| 설정 Option | 적용 Lock 범위 | Data 일관성 | Service 가용성 | 권장 사용 환경 |
| --- | --- | --- | --- | --- |
| `minimal` | 초기 metadata 읽기 단계에서만 global lock | `REPEATABLE READ`로 보장 | 높음 (data 읽기 단계에서 다른 쓰기 작업 가능) | 대부분의 InnoDB 환경, 일반 production 환경 |
| `extended` | 전체 snapshot 기간 동안 global lock | 완벽하게 보장 | 낮음 (모든 쓰기 작업 차단) | 엄격한 일관성 필요, schema 변경이 빈번한 환경 |
| `none` | table lock 없음 (단, MyISAM은 예외) | snapshot 중 schema 변경 시 불일치 가능 | 최고 (거의 모든 작업 허용) | schema 변경이 통제된 환경, InnoDB 전용 환경 |

- `snapshot.locking.mode` 설정을 선택할 때는 database 규모, engine 유형, service 가용성 요구 사항, data 일관성 요구 사항을 종합적으로 고려해야 합니다.
    - 일반적으로 InnoDB를 사용하는 환경에서는 `minimal` 설정이 가장 균형 잡힌 선택입니다.
    - MyISAM을 사용하는 환경에서는 설정과 상관없이 table lock이 필요하므로, service 영향을 최소화하기 위한 별도의 전략이 필요합니다.



### `minimal` : 처음에만 잠깐 잠금

- connector는 snapshot의 초기 단계에서만 global read lock을 유지합니다.
    - 이 단계에서는 database schema와 기타 metadata를 읽어옵니다.
    - metadata 획득 후 즉시 lock을 해제합니다.

- 실제 table data를 읽는 단계에서는 lock을 해제한 상태로 작업합니다.
    - 이 때 `REPEATABLE READ` transaction 격리 수준을 사용하여 일관된 snapshot을 보장합니다.
    - 다른 MySQL client가 database를 update할 수 있지만, connector는 transaction 시작 시점의 동일한 data를 계속 읽습니다.

- 대부분의 경우에는 `minimal` mode가 service 영향을 최소화하면서 일관된 snapshot을 제공합니다.
    - 특히 InnoDB engine을 사용하는 환경에서 효과적입니다.


### `extended` : 모든 쓰기 작업 차단

- snapshot의 전체 기간 동안 모든 쓰기 작업을 차단합니다.
    - MySQL의 `REPEATABLE READ` 격리 수준과 호환되지 않는 동시 작업이 발생하는 환경에서 사용합니다.

- 장시간 lock이 유지되므로 production 환경에서는 사용에 주의가 필요합니다.
    - data 일관성은 완벽하게 보장되지만, service 가용성이 크게 저하될 수 있습니다.
    - 특히 대규모 database에서는 service가 중단될 수 있습니다.

- schema 변경이 자주 발생하거나 특별히 엄격한 일관성이 필요한 경우에 적합합니다.


### `none` : 잠금 없음

- snapshot 중에 connector가 어떤 table lock도 획득하지 않도록 합니다.
    - schema 변경이 없을 때만 안전하게 사용할 수 있습니다.

- `none` mode는 engine 유형에 따라 다르게 동작합니다.
    - MyISAM engine으로 정의된 table은 이 설정에 관계없이 항상 table lock을 획득합니다.
    - InnoDB engine으로 정의된 table은 row-level lock을 사용하므로 전체 table lock이 발생하지 않습니다.

- 최고의 service 가용성이 필요하지만 schema 변경이 통제된 환경에서 유용합니다.
    - schema 변경이 snapshot 중에 발생하면 data 불일치가 발생할 수 있습니다.


---


## Reference

- <https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-property-snapshot-locking-mode>
