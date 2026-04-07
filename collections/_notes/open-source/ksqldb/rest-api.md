---
layout: note
permalink: /464
title: ksqlDB REST API - HTTP를 통한 ksqlDB 접근
description: ksqlDB는 REST API를 통해 외부 application에서 KSQL 문을 실행하고, pull/push query로 data를 조회하며, server 상태를 monitoring할 수 있습니다.
date: 2026-04-07
---


## ksqlDB REST API : HTTP 기반 Interface

- ksqlDB server는 **HTTP endpoint를 통해 외부 application에서 접근할 수 있는 REST API**를 기본으로 탑재하고 있습니다.
    - 기본 endpoint는 `http://localhost:8088`이며, 설정으로 변경할 수 있습니다.
    - REST API를 통해 KSQL 문 실행, data 조회, server 상태 확인 등의 작업이 가능합니다.

- ksqlDB REST API는 `Content-Type: application/vnd.ksql.v1+json` media type을 사용합니다.


---


## 주요 Endpoint

- ksqlDB REST API는 용도에 따라 여러 endpoint로 나뉩니다.

| Endpoint | Method | 용도 |
| --- | --- | --- |
| `/ksql` | POST | DDL/DML 문 실행 (`CREATE`, `DROP`, `INSERT` 등) |
| `/query` | POST | Push query 실행 (HTTP/1.1 chunked response) |
| `/query-stream` | POST | Pull/Push query 실행 (HTTP/2 streaming) |
| `/info` | GET | Server 정보 조회 |
| `/status` | GET | Server 상태 및 실행 중인 query 확인 |
| `/healthcheck` | GET | Server health check |
| `/clusterStatus` | GET | Cluster 내 node 상태 확인 |


### `/ksql` : KSQL 문 실행

- `CREATE`, `DROP`, `SHOW`, `DESCRIBE`, `INSERT INTO` 등 **DDL/DML 문을 실행하는 endpoint**입니다.
    - `SELECT` 문은 이 endpoint에서 실행할 수 없으며, `/query` 또는 `/query-stream`을 사용해야 합니다.

```bash
curl -X POST http://localhost:8088/ksql \
  -H "Content-Type: application/vnd.ksql.v1+json" \
  -d '{
    "ksql": "SHOW STREAMS;",
    "streamsProperties": {}
  }'
```

- 응답은 실행한 문의 종류에 따라 다른 형태로 반환됩니다.

```json
[
  {
    "@type": "streams",
    "statementText": "SHOW STREAMS;",
    "streams": [
      {
        "name": "ORDER_STREAM",
        "topic": "orders",
        "keyFormat": "KAFKA",
        "valueFormat": "JSON"
      }
    ]
  }
]
```


### `/query-stream` : Pull/Push Query 실행

- **pull query와 push query 모두 실행할 수 있는 endpoint**이며, HTTP/2 기반의 streaming response를 지원합니다.
    - pull query는 현재 상태를 즉시 반환하고 연결이 종료됩니다.
    - push query는 `EMIT CHANGES`를 포함하며, 새로운 결과가 발생할 때마다 streaming으로 전달됩니다.

#### Pull Query 실행

```bash
curl -X POST http://localhost:8088/query-stream \
  -H "Content-Type: application/vnd.ksql.v1+json" \
  -d '{
    "sql": "SELECT * FROM user_table WHERE user_id = '\''user_001'\'';",
    "properties": {}
  }'
```

#### Push Query 실행

```bash
curl -X POST http://localhost:8088/query-stream \
  -H "Content-Type: application/vnd.ksql.v1+json" \
  -d '{
    "sql": "SELECT * FROM order_stream EMIT CHANGES;",
    "properties": {
      "ksql.streams.auto.offset.reset": "earliest"
    }
  }'
```

- push query의 응답은 줄 단위로 JSON record가 streaming됩니다.

```json
{"queryId":"transient_query_001","columnNames":["ORDER_ID","PRODUCT_NAME","AMOUNT"],"columnTypes":["STRING","STRING","DECIMAL"]}
["order_1","Laptop",1500000]
["order_2","Phone",800000]
```


### `/query` : Legacy Push Query 실행

- HTTP/1.1 기반의 **chunked transfer encoding으로 push query 결과를 streaming하는 endpoint**입니다.
    - `/query-stream`이 도입되기 전부터 있던 endpoint이며, 하위 호환성을 위해 유지되고 있습니다.

```bash
curl -X POST http://localhost:8088/query \
  -H "Content-Type: application/vnd.ksql.v1+json" \
  -d '{
    "ksql": "SELECT * FROM order_stream EMIT CHANGES;",
    "streamsProperties": {
      "ksql.streams.auto.offset.reset": "earliest"
    }
  }'
```


### `/info` : Server 정보 조회

- ksqlDB server의 **version, cluster ID 등 기본 정보를 반환**합니다.

```bash
curl http://localhost:8088/info
```

```json
{
  "KsqlServerInfo": {
    "version": "0.29.0",
    "kafkaClusterId": "abc123",
    "ksqlServiceId": "default_"
  }
}
```


---


## Materialized View와 Pull Query

- REST API로 table data를 조회하려면 해당 table이 **materialized view**로 생성되어 있어야 합니다.
    - Kafka topic 위에 직접 생성한 source table은 materialized 상태가 아니므로, pull query로 조회할 수 없습니다.
    - `CREATE TABLE AS SELECT` 문으로 생성한 derived table은 materialized view이며, pull query로 즉시 조회가 가능합니다.

```sql
-- materialized view 생성
CREATE TABLE user_order_count AS
    SELECT
        user_id,
        COUNT(*) AS order_count,
        SUM(amount) AS total_amount
    FROM order_stream
    GROUP BY user_id
    EMIT CHANGES;
```

```bash
-- pull query로 특정 사용자 조회
curl -X POST http://localhost:8088/query-stream \
  -H "Content-Type: application/vnd.ksql.v1+json" \
  -d '{
    "sql": "SELECT * FROM user_order_count WHERE user_id = '\''user_001'\'';",
    "properties": {}
  }'
```

- materialized view는 persistent query가 지속적으로 실행되면서 결과를 갱신하므로, pull query 시점에 항상 최신 상태를 반환합니다.


---


## Client Library

- REST API를 직접 호출하는 것 외에, 언어별 client library를 사용하여 ksqlDB에 접근할 수 있습니다.

| 언어 | Library |
| --- | --- |
| **Java** | ksqlDB Java Client (공식) |
| **Python** | ksqldb-python |
| **C#** | ksqlDB.RestApi.Client |
| **Go** | go-ksqldb |

- Java client는 Confluent에서 공식으로 관리하며, pull/push query 실행, DDL/DML 문 실행, streaming 결과 처리 등을 지원합니다.

```java
// Java client 사용 예시
ClientOptions options = ClientOptions.create()
    .setHost("localhost")
    .setPort(8088);

Client client = Client.create(options);

// pull query 실행
List<Row> rows = client
    .executeQuery("SELECT * FROM user_order_count WHERE user_id = 'user_001';")
    .get();
```


---


## Reference

- <https://docs.ksqldb.io/en/latest/developer-guide/ksqldb-rest-api/>
- <https://docs.ksqldb.io/en/latest/developer-guide/ksqldb-clients/>

