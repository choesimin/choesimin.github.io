---
layout: skill
title: MySQL Lock - DB Lock 조회 및 해제하기
date: 2023-09-06
---


- DB 또는 table lock이 걸렸을 때, 먼저 두 가지 경우를 확인해야 합니다.
    1. Slow Query
    2. Transactional Lock

- 먼저 process list를 학인하여 slow query가 있는지 확인하고, slow query가 없다면 table lock transaction을 확인합니다.


---


## Lock 정보 조회하기

```sql
-- Process 목록 확인
SHOW PROCESSLIST;

-- Lock 조회
SELECT * FROM information_schema.INNODB_LOCKS;
SELECT * FROM information_schema.INNODB_LOCK_WAITS;
SELECT * FROM information_schema.INNODB_TRX;

-- Lock 걸린 시간 확인
SELECT
    trx_mysql_thread_id,
    trx_started,
    UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(CONVERT_TZ(trx_started, 'UTC', 'Asia/Seoul')) AS diff
FROM information_schema.INNODB_TRX;

-- 현재 사용 중인(table이 잠금 상태에 있거나, 하나 이상의 clinet에 의해 쿼리 작업 중인) table 나열
SHOW OPEN TABLES WHERE in_use > 0;
```


---


## Lock 해제하기


### 1. Slow Query 확인하기

- 먼저 process list를 조회하여, 연결되어 있는 process들을 확인합니다.

```sql
SHOW PROCESSLIST;
```

| Id | User | Host | db | Command | Time | State | Info |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 228 | root | choesimin.com:41544 | my_db | Sleep | 1039 |  | null |
| 847 | root | choesimin.com:42226 | my_db | Sleep | 1039 |  | null |
| 888 | root | choesimin.com:51182 | my_db | Sleep | 1039 |  | null |
| 938 | root | choesimin.com:51182 | my_db | Query | 28031 | starting | UPDATE my_table SET my_column = 'my_value'; |

- `Command` column이 `Query`인 항목을 확인합니다.
    - `Query`는 SQL 명령문을 처리하는 process입니다.
    - DB가 잠기는 주된 원인은 slow query(특히 insert/update)이므로, `Query`이면서 `Time`이 비정상적으로 긴 항목이 있는지 확인합니다.

- 조회 결과의 `Command` column이 `Sleep`인 항목은 신경쓰지 않아도 됩니다.
    - `Sleep`은 일반적으로 connection pool을 설정한 server에서 만든 connection입니다.
    - lock이 아닌 `Too many connections` 오류의 경우에는 `Sleep` connection이 원인이 되기도 하지만, slow query와는 관련이 없기 때문에 확인하지 않습니다.


### 2. InnoDB Transaction 확인하기

- slow query가 원인이 아니라면 transaction을 확인해봅니다.

- program에 transaction option을 설정한 경우엔, 원자성을 보장하기 위해 table을 잠그기도 합니다.
    - 예를 들어, Java Spring Framework의 `@Transactional` annotation을 사용한 경우.
- program이 transaction을 생성하고 어떤 이유로 종료하지 않았다면, table에 계속 lock이 걸려있을 수 있습니다.
    - 예를 들어, transaction을 시작하고 종료하기 전에 program이 죽은 경우.

- 따라서 InnoDB의 transaction 목록을 확인하여, transaction이 걸려있는 process를 종료합니다.
    - `show processlist` 명령어 만으로는 transaction이 걸려있는 query를 확인하기 어렵습니다.

```sql
SELECT * FROM information_schema.INNODB_TRX;
```


### 3. Process 삭제하기

- `kill` 명령어에 이전 과정에서 확인한 process의 id를 입력하여 process를 강제로 죽입니다.
- process가 중간에 죽으면 원자성이 깨지는 문제가 생길 수 있기 때문에, `kill` 명령어는 상황에 맞춰 사용합니다.

```sql
-- client connection 종료
kill 938;    -- kill [process_id];

-- 실행하고 있는 query만 종료
kill query 938;    -- kill query [process_id];
```


---


## Reference

- <https://otrodevym.tistory.com/entry/Mysql-MySql-Lock-%EC%A1%B0%ED%9A%8C-%EB%B0%8F-%ED%95%B4%EC%A0%9C-%EB%B0%A9%EB%B2%95>
