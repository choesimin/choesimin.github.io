# Debezium이 MySQL Binlog를 읽기 시작하는 지점 설정하기

- Debezium의 `gtid.source.excludes`, `gtid.source.includes` 옵션을 설정하여 MySQL Binlog를 읽기 시작하는 지점을 설정할 수 있습니다.
    - 두 옵션 모두 기본값이 없으며, 설정하지 않으면 MySQL 서버의 모든 GTID 범위를 사용합니다.
    - 이 옵션을 설정하면 Debezium은 지정된 GTID 범위만 사용합니다.

- GTID 옵션은 MySQL 서버의 binlog에서 어떤 데이터를 읽을지 결정하는 패턴 목록입니다.
    - 패턴들은 쉼표로 구분되며, 각각의 패턴은 소스 서버를 식별하는 ID와 매칭됩니다.
    - 지정된 표현식은 GTID의 도메인 식별자와 대조됩니다.
    - 예를 들어, "server1,server2"와 같이 설정하면 이름이 server1과 server2인 서버의 데이터만 읽게 됩니다.

- `gtid.source.excludes`와 `gtid.source.includes`는 서로 상호 배타적입니다.
    - 둘 중 하나만 설정할 수 있습니다.
    - 둘 다 설정하면 Debezium은 오류를 발생시킵니다.

| 속성 | 설명 |
| --- | --- |
| `gtid.source.excludes` | 지정된 제외 패턴과 일치하지 않는 Source UUID를 가진 GTID 범위만 사용 |
| `gtid.source.includes` | 지정된 포함 패턴 중 하나와 일치하는 Source UUID를 가진 GTID 범위만 사용 |


## Debezium에서 GTID Mode를 사용하기 위한 조건

- Debezium의 GTID 모드를 사용하려면 MySQL 서버가 GTID 모드로 설정되어 있어야 합니다.

- https://debezium.io/documentation/reference/stable/connectors/mysql.html#enable-mysql-gtids














---

## Reference

- <https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-property-gtid-source-includes>
- <https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-property-gtid-source-excludes>