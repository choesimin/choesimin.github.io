---
layout: skill
date: 2025-01-07
title: ksqlDB의 Query 유형 - Pull, Push, Persistent
---




## ksqlDB의 Query Type : Pull, Push, Persistent

- ksqlDB에는 세 가지 종류의 query 유형이 존재합니다.

| 특성 | Pull Query | Push Query | Persistent Query |
| --- | --- | --- | --- |
| **실행 방식** | 즉시 조회 후 종료 (일회성 요청-응답) | 실시간 구독 형태로 동작 (스트리밍) | 서버 프로세스로 독립 실행 (서버 상주) |
| **문법 키워드** | `SELECT` | `SELECT` + `EMIT CHANGES` | `CREATE TABLE/STREAM AS SELECT` |
| **데이터 소스** | 집계된 테이블만 | 스트림, 테이블 모두 | 스트림, 테이블 모두 |
| **결과 저장** | 미저장 | 미저장 | 새로운 스트림/테이블로 저장 |
| **WHERE 조건** | 키 기반 필수 | 선택적 | 선택적 |
| **종료 시점** | 즉시 | 연결 종료 시 | 삭제 전까지 영구 실행 |
| **사용 사례** | 현재 상태 조회 | 실시간 모니터링 | ETL, 실시간 데이터 변환 |
| **리소스 사용** | 낮음 | 중간 | 높음 |
| **장점** | 빠른 응답, 간단한 구현, 리소스 효율적 | 실시간 업데이트, 유연한 필터링, 이벤트 기반 처리 | 자동화된 처리, 데이터 영구 저장, 복잡한 변환 가능 |
| **단점** | 제한된 쿼리 범위, 키 기반 조회만 가능 | 연결 관리 필요, 클라이언트 부하 | 높은 리소스 사용, 관리 복잡성 |

```sql
-- 동작 중인 모든 Query 확인하기
SHOW QUERIES;
```




---




## Pull Query : 현재의 상태만을 조회하기

```sql
SELECT *
FROM table_name
WHERE condition;
```

- Pull Query는 **특정 시점의 상태를 조회**할 때 사용합니다.

- 일반적인 SQL의 `SELECT` 문처럼 요청 시점의 데이터를 한 번만 가져옵니다.
    - 전통적인 데이터베이스의 `SELECT` 문과 유사한 방식으로 동작합니다.

- materialized view나 테이블에서만 조회할 수 있으며, 키 기반 조회가 필수입니다.

- Push Query와 달리 지속적으로 결과를 스트리밍하지 않고, **일회성 조회만** 합니다.
    - 실시간 모니터링이나 대시보드에는 Push Query를 사용하는 것이 더 적합합니다.

```sql
-- 사용자 정보 확인
SELECT * FROM users_table 
WHERE user_id = '123';

-- 사용자 ID가 1인 사용자의 현재 주문 상태 조회
SELECT user_id, order_status
FROM orders_by_user
WHERE user_id = 1;
```

- Pull Query는 마이크로서비스 아키텍처에서 서비스 간 데이터 조회나 상태 확인 등에 유용하게 활용됩니다.


### Pull Query 특징

1. **요청-응답 모델** : 쿼리를 실행하면 즉시 결과를 반환하고 종료됩니다. 
2. **현재 상태 조회** : materialized view나 테이블의 현재 상태를 조회합니다.
    - 스트림 처리 결과가 집계된 최신 상태를 의미합니다.
3. **키 기반 조회** : 특정 키나 키 범위를 기준으로 데이터를 조회할 수 있습니다.


### Pull Query 제한 사항

- Pull Query는 materialized view나 테이블에서만 사용 가능합니다.
- WHERE 절에서 키 기반 조건이 필요합니다.
- GROUP BY나 HAVING 절은 사용할 수 없습니다.

#### Pull Query가 WHERE 조건과 Key 기반 조건을 필요로 하는 이유

- Pull Query에서의 제약 사항은, 분산 시스템에서의 성능과 안정성을 위한 중요한 설계 결정입니다.
    - Push Query는 스트리밍 방식으로 결과를 지속적으로 반환하므로 전체 스캔에 따른 부하를 분산시킬 수 있습니다.
    - 반면 Pull Query는 즉각적인 응답이 필요하므로, 조회 범위를 제한하지 않으면 시스템에 큰 부하를 줄 수 있습니다.

1. **데이터 조회의 효율성** : 분산 환경에서 효율적인 데이터 검색을 위한 필수 조건.
    - ksqlDB는 분산 시스템에서 작동하며, 모든 데이터를 스캔하는 것은 매우 비효율적입니다.
    - key 기반 조건을 통해 특정 파티션만 조회할 수 있어 조회 성능이 크게 향상됩니다.
    - where 절의 key 조건은 partition pruning을 가능하게 합니다.

2. **리소스 사용 제어** : 시스템 안정성을 위한 메모리 사용량 제한.
    - 제한 없는 pull query는 대량의 데이터를 반환할 수 있어 메모리 사용량이 급증할 수 있습니다.
    - 키 기반 조회를 강제함으로써 리소스 사용을 예측 가능한 수준으로 제한할 수 있습니다.

3. **실시간 조회 용도** : 특정 키의 현재 상태 조회에 최적화된 쿼리 방식.
    - pull query는 주로 특정 키에 대한 현재 상태를 조회하는 용도로 설계되었습니다.
    - 전체 데이터셋 스캔이 필요한 경우에는 Push Query를 사용하는 것이 더 적합합니다.


### Pull Query Process

```mermaid
flowchart TD
    client[Client]
    server[ksqlDB Server]
    type_check[Query Type = Pull]
    state_store[State Store]

    client -->|1. SQL Query| server
    server -->|2. Check| type_check
    type_check -->|3. Lookup| state_store
    state_store -->|4. Return Current State| server
    server -->|5. Response| client
```

1. 클라이언트가 SELECT 쿼리를 전송합니다.
2. 서버가 Pull Query임을 확인합니다.
3. 지정된 키로 State Store를 조회합니다.
4. 현재 상태값을 반환합니다. 
5. 클라이언트에 즉시 응답합니다.




---




## Push Query : 실시간 상태 변화를 구독하기

```sql
SELECT columns
FROM stream_or_table
[WHERE condition]
EMIT CHANGES;
```

- Push Query는 **실시간으로 데이터 변경 사항을 지속적으로 받아보고 싶을 때 사용**합니다.
    - 쿼리를 실행하면 초기 상태를 받은 후, 새로운 변경 사항이 발생할 때마다 업데이트를 받습니다.

- `EMIT CHANGES` 구문을 사용하여 작성하며, 스트림과 테이블 모두에서 사용 가능합니다.
    - Push Query 문법은 Pull Query에 `EMIT CHANGES` 구문만 추가한 형태입니다.
    - 집계(`GROUP BY`), 조인(`JOIN`), 윈도우(`WINDOW`) 연산 등 다양한 스트리밍 작업을 지원합니다.

- Push Query는 **실시간 데이터 처리가 필요한 경우에 적합**하며, 이벤트 기반 아키텍처에서 핵심적인 역할을 수행합니다.
    - 주로 실시간 대시보드, 모니터링 시스템, 실시간 알림 서비스, 지속적인 ETL 처리 등에 활용됩니다.

```sql
-- 주문 금액이 1000 이상인 주문을 실시간으로 모니터링
SELECT order_id, amount, status
FROM orders_stream
WHERE amount >= 1000
EMIT CHANGES;

-- 주문을 한 시간 단위로 집계하여 실시간으로 모니터링
SELECT product_id, COUNT(*) AS order_count 
FROM orders_stream 
    WINDOW TUMBLING (SIZE 1 HOUR) 
GROUP BY product_id 
EMIT CHANGES;
```


### Push Query 특징

1. **지속적인 스트리밍** : 쿼리가 실행되면 데이터의 변경 사항을 실시간으로 계속 전달받습니다.
    - 연결이 유지되는 동안 새로운 결과가 발생할 때마다 클라이언트에게 전송됩니다.

2. **초기 상태 + 업데이트** : 쿼리 실행 시점의 현재 상태를 먼저 반환하고, 이후 발생하는 변경 사항을 스트리밍합니다.


### Pull Query와의 주요 차이점

1. **연결 유지** : Push Query는 클라이언트와의 연결을 계속 유지합니다.
2. **실시간성** : 데이터 변경을 즉시 감지하고 전달합니다.
3. **리소스 사용** : 지속적인 연결과 처리로 인해 더 많은 리소스를 사용합니다.
4. **쿼리 제약** : Pull Query보다 더 자유로운 쿼리 작성이 가능합니다.


### Push Query Process

```mermaid
flowchart TD
    client[Client]

    subgraph continuous_processing[Continuous Processing]
        server[ksqlDB Server]
        type_check[Query Type = Push]
        streams[Kafka Streams]
        topics[Kafka Topics]
    end
    
    client -->|1. SQL Query + EMIT CHANGES| server
    server -->|2. Check| type_check
    type_check -->|3. Subscribe| streams
    streams -->|4. Process| topics
    topics -->|5. Stream Results| streams
    streams -->|6. Emit Changes| server
    server -->|7. Continuous Updates| client
```

1. 클라이언트가 `EMIT CHANGES`가 포함된 쿼리를 전송합니다.
2. 서버가 Push Query임을 확인합니다.
3. Kafka Streams에 구독을 설정합니다.
4. 토픽 데이터를 지속적으로 처리합니다.
5. 변경 사항이 발생할 때마다 스트리밍합니다.
6. 클라이언트에 실시간으로 전송합니다.




---




## Persistent Query : 영속화되는 쿼리 결과

```sql
CREATE TABLE table_name AS
SELECT columns
FROM stream_or_table
[WHERE condition]
[GROUP BY columns]
EMIT CHANGES;
```

- Persistent Query는 **서버에 영구적으로 등록되어 실행되는 쿼리**입니다.

- `CREATE` 문으로 생성하며, 서버가 실행되는 동안 계속 동작합니다.
    - 서버가 재시작되더라도 자동으로 다시 시작되며, 상태를 저장소에 유지합니다.

- `SHOW QUERIES` 명령으로 실행 중인 Persistent Query 목록을 확인할 수 있습니다.

- Persistent Query는 **스트리밍 데이터의 지속적인 처리와 상태 관리가 필요한 경우**에 유용하게 사용됩니다.
    - 마이크로서비스 아키텍처에서 이벤트 기반 데이터 파이프라인을 구축하는데 핵심적인 역할을 합니다.
    - 주로 실시간 데이터 변환(ETL), 지속적인 데이터 집계, 실시간 materialized view 유지, 이벤트 기반 알림 시스템 등에서 활용됩니다.

```sql
-- 지역별 주문 금액 합계를 계산하여 새로운 테이블로 저장
CREATE TABLE regional_orders AS
SELECT region,
    COUNT(*) AS order_count,
    SUM(amount) AS total_amount
FROM orders_stream
GROUP BY region
EMIT CHANGES;

-- 고객별 최근 주문 상태를 추적하는 테이블 생성
CREATE TABLE customer_latest_order AS
SELECT customer_id,
    LATEST_BY_OFFSET(order_id) AS latest_order_id,
    LATEST_BY_OFFSET(status) AS latest_status
FROM orders_stream
GROUP BY customer_id
EMIT CHANGES;

-- 날짜별 상품 판매량을 집계하는 테이블 생성
CREATE TABLE daily_orders AS 
SELECT product_id,
    COUNT(*) as order_count,
    SUM(quantity) as total_quantity 
FROM orders_stream 
WINDOW TUMBLING (SIZE 24 HOURS) 
GROUP BY product_id 
EMIT CHANGES;
```


### Persistent Query 특징

1. **영구성과 생성 방식** : ksqlDB 서버가 실행되는 동안 계속 실행됩니다.
    - 서버가 재시작되더라도 자동으로 다시 시작됩니다.
    - `CREATE STREAM AS SELECT` 또는 `CREATE TABLE AS SELECT` 문을 통해 생성합니다.
        - 쿼리를 영구적으로 저장하기 때문에, `SELECT` 구문 앞에 `CREATE TABLE/STREAM`을 더 붙입니다.

2. **상태 관리와 복구** : 쿼리 결과를 지속적으로 상태 저장소(state store)에 유지합니다.
    - 서버 재시작 시 자동으로 재실행되며, 마지막 처리 지점부터 재개합니다.
    - 장애가 발생하더라도 복구가 가능합니다.

3. **모니터링 기능** : `SHOW QUERIES` 명령으로 실행 중인 Persistent Query 목록을 확인할 수 있습니다.
    - 개별 쿼리의 상태와 메트릭을 모니터링할 수 있습니다.


### Persistent Query 관리 명령어

```sql
-- 실행 중인 쿼리 목록 확인
SHOW QUERIES;

-- 특정 쿼리 종료
TERMINATE QUERY [query_id];

-- 특정 쿼리 설명
EXPLAIN [query_id];
```


### Persistent Query Process

```mermaid
flowchart TD
    subgraph query_creation[Query Creation]
        admin[Admin/Developer]
        server[ksqlDB Server]
        query[Persistent Query]
    end

    subgraph Continuous Processing
        streams[Kafka Streams]
        source_topics[Source Topics]
        state_store[State Store]
        target_topic[Target Topic]
    end

    monitoring

    admin -->|1. CREATE TABLE/STREAM AS SELECT| server
    server -->|2. Register| query

    query -->|3. Subscribe| streams
    streams -->|4. Process| source_topics
    source_topics -->|5. Stream Data| streams
    streams -->|6. Transform| state_store
    streams -->|7. Write| target_topic

    monitoring -.->|Query Status| query
```

1. 관리자가 `CREATE TABLE/STREAM AS SELECT` 쿼리를 등록합니다.
2. 서버에 Persistent Query로 등록합니다.
3. Kafka Streams 애플리케이션을 생성합니다.
4. 소스 토픽을 구독하고 처리합니다.
5. 데이터를 변환/가공합니다.
6. State Store를 업데이트합니다.
7. 결과를 새로운 토픽에 저장합니다.




---




## Referene

- <https://ojt90902.tistory.com/1112>

