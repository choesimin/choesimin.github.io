---
layout: note
permalink: /312
title: Kafka Connect JDBC Connector
description: JDBC connector는 Kafka Connect framework의 일부로 database와 Kafka 간 data를 전송하는 connector입니다.
date: 2025-04-13
---


## Kafka Connect JDBC Connector

- Kafka Connect JDBC connector는 Kafka Connect framework의 일부로 database와 Kafka 간 data를 전송하는 connector입니다.
- 이 connector를 통해 database의 변경 사항을 Kafka topic으로 전송하거나, Kafka topic의 data를 database table에 저장할 수 있습니다.
- Confluent에서 개발하고 관리하며, source connector와 sink connector 두 가지 유형으로 제공됩니다.


### 주요 기능

- **Change Data Capture (CDC)** : database 변경 사항을 실시간으로 감지하고 Kafka로 전송합니다.
- **Schema 진화 관리** : database schema 변경 시 자동으로 대응합니다.
- **Batch 처리** : 대량의 data를 효율적으로 처리합니다.
- **Data 전환** : 필요 시 data type 변환을 지원합니다.
- **Exactly-once 전송** : 중복 없는 정확한 data 전송을 보장합니다.
- **장애 복구** : connector 재시작 시 중단된 지점부터 처리를 재개합니다.


### 장점

- code 작성 없이 database와 Kafka 간 data 통합이 가능합니다.
- 분산 처리 및 확장성이 우수합니다.
- 다양한 database(MySQL, PostgreSQL, Oracle, SQL Server 등)를 지원합니다.
- 복잡한 data 변환 없이 직관적인 설정만으로 사용할 수 있습니다.
- fault tolerance를 제공하여 장애 시에도 data 손실을 방지합니다.


### 단점

- 실시간 CDC 기능이 polling 방식이므로 약간의 지연이 발생할 수 있습니다.
    - 완전한 실시간 CDC를 위해서는 Debezium 같은 전용 CDC connector를 사용해야 합니다.
- 복잡한 data 변환은 별도의 transformation이 필요합니다.
- table 간 관계를 유지하기 어려울 수 있습니다.
- 대량의 record 처리 시 성능 최적화가 필요합니다.


### 사용 사례

- **실시간 data pipeline 구축** : database 변경을 실시간으로 감지하여 분석 platform에 전달합니다.
- **microservice 간 data 동기화** : 다양한 database에 분산된 data를 동기화합니다.
- **data warehouse/data lake 적재** : 운영 database의 data를 분석용 data store에 주기적으로 적재합니다.
- **cross-region data 복제** : 지역 간 database data를 복제하여 고가용성을 제공합니다.
- **legacy system 통합** : 기존 system의 data를 현대적인 event-driven architecture로 통합합니다.


---


## Source Connector vs Sink Connector

- JDBC connector는 source data를 Kafka topic으로 전송하는 **source connector**와, Kafka topic의 data를 database에 저장하는 **sink connector**로 나뉩니다.


### JDBC Source Connector : Database -> Kafka

- **database table의 data를 Kafka topic으로 전송**합니다.
    - table의 변경 사항을 감지하여 Kafka로 실시간 전송이 가능합니다.
    - 주기적인 polling 방식으로 database 변경 사항을 확인합니다.

1. 설정된 주기로 database table을 polling합니다.
2. 특정 column(timestamp 또는 ID)을 기준으로 변경된 record를 감지합니다.
3. 변경된 record를 Kafka topic에 발행합니다.
4. offset을 저장하여 다음 실행 시 이어서 처리합니다.

```json
{
    "name": "jdbc-source-connector",
    "config": {
        "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
        "connection.url": "jdbc:mysql://localhost:3306/mydb",
        "connection.user": "user",
        "connection.password": "password",
        "table.whitelist": "users,orders",
        "mode": "incrementing",
        "incrementing.column.name": "id",
        "topic.prefix": "mysql-",
        "poll.interval.ms": 5000
    }
}
```

- `connection.url` : database 연결 URL입니다.
- `table.whitelist/table.blacklist` : 처리할 table 목록을 지정합니다.
- `mode` : 실행 mode(bulk, incrementing, timestamp 등)를 설정합니다.
- `query` : 사용자 정의 query를 실행할 수 있습니다.
- `poll.interval.ms` : polling 주기를 설정합니다.


### JDBC Sink Connector : Kafka -> Database

- **Kafka topic의 data를 database table로 전송**합니다.
    - topic data를 구독하여 지정된 database table에 저장합니다.
    - upsert 기능을 통해 data 갱신도 가능합니다.

1. Kafka topic에서 data를 구독합니다.
2. 설정에 따라 database table에 삽입하거나 갱신합니다.
3. 처리 완료된 offset을 commit합니다.

```json
{
    "name": "jdbc-sink-connector",
    "config": {
        "connector.class": "io.confluent.connect.jdbc.JdbcSinkConnector",
        "connection.url": "jdbc:postgresql://localhost:5432/mydb",
        "connection.user": "user",
        "connection.password": "password",
        "topics": "orders",
        "table.name.format": "orders_sync",
        "auto.create": true,
        "insert.mode": "upsert",
        "pk.mode": "record_key",
        "pk.fields": "id",
        "batch.size": 100
    }
}
```

- `connection.url` : target database 연결 URL입니다.
- `auto.create` : table 자동 생성 여부를 설정합니다.
- `insert.mode` : 삽입 mode(insert, upsert 등)를 설정합니다.
- `pk.mode` : primary key 처리 방식을 지정합니다.
- `batch.size` : 일괄 처리할 record 수를 설정합니다.
