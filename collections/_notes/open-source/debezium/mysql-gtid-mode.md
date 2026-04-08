---
layout: note
permalink: /253
title: Debezium MySQL GTID Mode - Binlog 읽기 시작 지점 설정
description: Debezium은 MySQL GTID mode를 사용하면 binlog file과 position 대신 GTID로 읽기 위치를 추적하여, server failover 시에도 정확한 지점부터 변경 사항을 읽어들입니다.
date: 2026-04-07
---


## Debezium의 GTID Mode

- **GTID(Global Transaction Identifier)**는 MySQL replication 환경에서 transaction을 전역적으로 고유하게 식별하는 식별자입니다.
    - `server_uuid:transaction_id` 형식으로 구성됩니다.
    - server가 변경되어도 동일한 transaction은 동일한 GTID를 유지합니다.

- Debezium MySQL connector는 **GTID mode를 활성화하면 binlog file 이름과 position 대신 GTID로 읽기 위치를 추적**합니다.
    - binlog file 기반 추적에서는 server failover 시 새로운 primary의 binlog 위치를 특정하기 어렵습니다.
    - GTID 기반 추적은 server가 변경되어도 전역적으로 유일한 식별자로 정확한 위치를 찾습니다.

| 추적 방식 | 위치 표현 | Failover 시 동작 |
| --- | --- | --- |
| binlog file 기반 | `mysql-bin.000003:154` | 새 server의 binlog 위치를 수동으로 대응시켜야 함 |
| GTID 기반 | `05398e1d-...:1-42` | 자동으로 올바른 위치를 찾음 |


---


## GTID Mode 사용 조건

- Debezium에서 GTID mode를 사용하려면 **MySQL server에서 GTID가 활성화**되어 있어야 합니다.

```ini
# MySQL server 설정 (my.cnf)
gtid_mode=ON
enforce_gtid_consistency=ON
```

- `gtid_mode=ON`은 모든 transaction에 GTID를 할당합니다.
    - `OFF`에서 `ON`으로 변경하려면 순차적으로 `OFF_PERMISSIVE`, `ON_PERMISSIVE`, `ON` 단계를 거쳐야 합니다.
    - online 상태에서 단계적 변경이 가능하여 server 재시작이 필수는 아닙니다.

- `enforce_gtid_consistency=ON`은 GTID와 호환되지 않는 SQL 구문을 차단합니다.
    - `CREATE TABLE ... SELECT` 문이 차단됩니다.
    - transaction 내에서 transactional table과 non-transactional table을 함께 변경하는 구문이 차단됩니다.


---


## GTID Source Filtering

- Debezium은 `gtid.source.includes`와 `gtid.source.excludes` 설정으로 **특정 server의 GTID 범위만 선택적으로 읽도록 filtering** 가능합니다.
    - replication 환경에서 여러 source server의 transaction이 binlog에 혼재될 때, 특정 server의 변경 사항만 capture하고 싶은 경우에 사용합니다.

| 속성 | 동작 |
| --- | --- |
| `gtid.source.includes` | 지정된 pattern과 일치하는 source UUID의 GTID 범위만 사용 |
| `gtid.source.excludes` | 지정된 pattern과 일치하지 않는 source UUID의 GTID 범위만 사용 |

- 두 설정은 **상호 배타적**이며, 동시에 사용하면 connector가 오류를 발생시킵니다.
    - 둘 다 설정하지 않으면 MySQL server의 모든 GTID 범위를 사용합니다.

```json
{
    "gtid.source.includes": "05398e1d-efec-11ef-abed-0242ac120005,1a2b3c4d-..."
}
```

- pattern은 쉼표로 구분하며, 각 pattern은 source server의 UUID와 비교됩니다.


### Filtering 활용 사례

- **multi-source replication 환경**에서 특정 source server의 변경 사항만 capture하는 경우에 유용합니다.
    - 예를 들어, server A와 server B의 transaction이 하나의 replica에 통합되어 있을 때, server A의 변경 사항만 Debezium으로 capture하려면 `gtid.source.includes`에 server A의 UUID를 지정합니다.

- **system 운영 transaction 제외** 시에도 활용됩니다.
    - monitoring이나 health check용 transaction을 `gtid.source.excludes`로 제외하여 불필요한 event 생성을 방지합니다.


---


## GTID Mode와 Offset

- GTID mode가 활성화되면 Debezium의 offset에 GTID 정보가 포함됩니다.

```json
{
    "file": "mysql-bin.000003",
    "pos": 154,
    "gtids": "05398e1d-efec-11ef-abed-0242ac120005:1-42",
    "server_id": 1
}
```

- `gtids` field는 connector가 마지막으로 처리한 GTID 범위를 나타냅니다.
    - `1-42`는 해당 server에서 1번부터 42번까지의 transaction을 처리했음을 의미합니다.

- connector가 재시작되면 offset의 GTID 정보를 기반으로 **이미 처리한 transaction은 건너뛰고 다음 transaction부터 읽기를 시작**합니다.
    - binlog file이 삭제되었거나 server가 변경되어도 GTID를 기준으로 정확한 위치를 찾습니다.


---


## GTID Mode 사용 시 주의 사항

- GTID mode는 안정적인 위치 추적을 보장하지만, 운영 시 주의할 점이 있습니다.


### GTID Purged

- MySQL은 binlog retention 정책에 따라 오래된 binlog를 삭제하며, 삭제된 binlog에 포함된 GTID는 `gtid_purged` 변수에 기록됩니다.
    - connector가 오랫동안 중단된 후 재시작 시, 필요한 GTID가 이미 purge되었으면 해당 transaction을 읽지 못합니다.
    - 이 경우 snapshot을 다시 수행해야 합니다.

- binlog retention 기간을 connector의 최대 중단 시간보다 길게 설정해야 합니다.

```sql
-- binlog retention 기간 확인 (초 단위)
SHOW VARIABLES LIKE 'binlog_expire_logs_seconds';
```


### Non-GTID에서 GTID로 전환

- 기존에 GTID 없이 운영 중이던 connector를 GTID mode로 전환하려면 주의가 필요합니다.
    - MySQL server의 GTID를 활성화한 후, connector의 offset을 초기화하거나 snapshot을 다시 수행하는 것이 안전합니다.
    - 기존 offset의 binlog file 기반 위치와 GTID 기반 위치가 불일치하면 data 누락이나 중복이 발생합니다.


---


## Reference

- <https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-property-gtid-source-includes>
- <https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-property-gtid-source-excludes>
- <https://debezium.io/documentation/reference/stable/connectors/mysql.html#enable-mysql-gtids>

