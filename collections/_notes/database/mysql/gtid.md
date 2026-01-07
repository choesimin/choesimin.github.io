---
published: false
---




# MySQL GTID : Global Transaction IDentifier

- **GTID**(Global Transaction IDentifier)는 MySQL 복제 환경에서 트랜잭션을 고유하게 식별하는 식별자입니다.
    - MySQL 5.6 버전부터 도입된 기능입니다.

- GTID는 **모든 트랜잭션에 대해 유일한 식별자를 생성**합니다.
    - Source 서버에서 실행된 트랜잭션은 Replica 서버에서도 동일한 GTID를 유지합니다.
    - 한번 생성된 GTID는 변경되지 않습니다.

- GTID는 **트랜잭션의 출처를 명확하게 추적**할 수 있습니다.
    - 트랜잭션이 어느 서버에서 시작되었는지 확인이 가능합니다.
    - 복제 토폴로지에서 트랜잭션의 실행 경로를 추적할 수 있습니다.

```sql
-- 현재 서버에서 실행된 모든 GTID 조회
SELECT @@GLOBAL.GTID_EXECUTED;
```

- GTID는 **MySQL 서버의 고유 식별자**(`server_uuid`)와 **트랜잭션의 순차적 번호**(`transaction_id`)로 구성됩니다.
    - 최종 형식 : `server_uuid:transaction_id`.
    - Server UUID는 MySQL 서버가 시작될 때 생성되며 변경되지 않습니다.
        - `SELECT @@SERVER_UUID;`로 조회할 수 있으며, `05398e1d-efec-11ef-abed-0242ac120005`와 같은 형식입니다.


## GTID 활용하기

- GTID를 통해 복제 구성을 단순화할 수 있습니다.
    - 기존 방식은 로그 파일명과 위치를 수동으로 지정해야 했습니다.
    - GTID는 자동으로 복제 위치를 동기화합니다.

- GTID를 사용하여 자동 페일오버를 구현할 수 있습니다.
    - Source 서버 장애 시 Replica 서버가 자동으로 승격됩니다.
    - 복제 위치를 자동으로 식별하여 데이터 정합성을 보장합니다.

- GTID를 통해 복제 일관성을 검증할 수 있습니다.
    - Source와 Replica 서버의 GTID를 비교하여 복제 상태를 확인합니다.
    - 누락된 트랜잭션을 식별하고 복구할 수 있습니다.


## GTID 제약 사항

- GTID 활성화 시 일부 SQL 문장에 제약이 발생합니다.
    - `CREATE TABLE ... SELECT` 문장을 사용할 수 없습니다.
    - 임시 테이블을 포함한 트랜잭션을 실행할 수 없습니다.

- GTID 모드 전환 시 주의사항이 있습니다.
    - 활성화나 비활성화를 위해서는 서버 재시작이 필요합니다.
    - 전환 전 모든 트랜잭션이 완료되어야 합니다.


---


# MySQL GTID 설정하기


```yaml
services:
  # MySQL
  mysql:
    image: mysql:8.4.4
    container_name: mysql
    restart: always
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
      LANG: C.UTF-8
      TZ: Asia/Seoul
    command:
      - --gtid_mode=ON
      - --enforce-gtid-consistency=ON
```





```sql
-- GTID 설정 확인
SHOW GLOBAL VARIABLES LIKE '%gtid%';
```

