---
layout: note
permalink: /450
title: Debezium MySQL GTID Mode
description: Debezium은 gtid.source.includes와 gtid.source.excludes option을 통해 MySQL binlog의 특정 GTID 범위만 선택적으로 읽으며, MySQL server가 GTID mode로 설정되어 있어야 합니다.
date: 2025-01-21
---




## Debezium이 MySQL Binlog를 읽기 시작하는 지점 설정하기

- Debezium의 `gtid.source.excludes`, `gtid.source.includes` option을 설정하여 MySQL binlog를 읽기 시작하는 지점을 설정합니다.
    - 두 option 모두 기본값이 없으며, 설정하지 않으면 MySQL server의 모든 GTID 범위를 사용합니다.
    - 이 option을 설정하면 Debezium은 지정된 GTID 범위만 사용합니다.

- GTID option은 MySQL server의 binlog에서 어떤 data를 읽을지 결정하는 pattern 목록입니다.
    - pattern들은 쉼표로 구분되며, 각각의 pattern은 source server를 식별하는 ID와 matching됩니다.
    - 지정된 표현식은 GTID의 domain 식별자와 대조됩니다.
    - `server1,server2`와 같이 설정하면 이름이 server1과 server2인 server의 data만 읽게 됩니다.

- `gtid.source.excludes`와 `gtid.source.includes`는 상호 배타적입니다.
    - 둘 중 하나만 설정합니다.
    - 둘 다 설정하면 Debezium은 오류를 발생시킵니다.

| 속성 | 설명 |
| --- | --- |
| `gtid.source.excludes` | 지정된 제외 pattern과 일치하지 않는 source UUID를 가진 GTID 범위만 사용 |
| `gtid.source.includes` | 지정된 포함 pattern 중 하나와 일치하는 source UUID를 가진 GTID 범위만 사용 |


---


## Debezium에서 GTID Mode를 사용하기 위한 조건

- Debezium의 GTID mode를 사용하려면 MySQL server가 GTID mode로 설정되어 있어야 합니다.

- MySQL server에서 GTID를 활성화하려면 `my.cnf` 또는 `my.ini` 파일에서 설정합니다.

```ini
gtid_mode = ON
enforce_gtid_consistency = ON
```

- GTID mode가 활성화되면 각 transaction에 고유한 식별자가 부여됩니다.
    - 이 식별자는 source server UUID와 transaction 번호로 구성됩니다.
    - 형식 : `source_uuid:transaction_id` (예 : `3E11FA47-71CA-11E1-9E33-C80AA9429562:23`)


---


## Reference

- <https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-property-gtid-source-includes>
- <https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-property-gtid-source-excludes>
- <https://debezium.io/documentation/reference/stable/connectors/mysql.html#enable-mysql-gtids>
