---
layout: note
permalink: /152
title: ksqlDB Data Model - Stream과 Table
description: ksqlDB의 Stream과 Table은 data를 처리하는 두 가지 주요 추상화 model입니다.
date: 2025-01-06
---


## Stream & Table : ksqlDB Data Model

- ksqlDB의 Stream과 Table은 **data를 처리하는 두 가지 주요 추상화 model**입니다.

| 특성 | Stream | Table |
| --- | --- | --- |
| **Data 성격** | event 기반 (event-based) | 상태 기반 (state-based) |
| **Data 처리 방식** | 순차적 event 처리 | 상태 update 및 조회 |
| **Data 저장** | 모든 event 기록 | 각 key의 최신 값만 유지 |
| **Data 변경 가능성** | 변경 불가능 (immutable) | 변경 가능 (Mutable) |
| **시간 관점** | 시간에 따른 모든 변경 이력 보존 | 현재 시점의 상태만 표현 |
| **지원 연산** | INSERT만 가능 | INSERT, UPDATE, DELETE 가능 |
| **사용 사례** | transaction log, sensor data, log data | 사용자 정보, 재고 현황, 계좌 잔액 |
| **다른 유형으로 변환** | Table로 변환 가능 | Stream으로 변환 불가 |


- **data의 전체 이력과 시간별 변화를 추적하고 분석할 때는 Stream**을 사용하고, **특정 시점의 최신 상태만 유지하고 관리할 때는 Table**을 사용합니다.
    - **append-only model인 Stream**은 **event의 전체 history를 보관**하기 때문에, **시간 기반 처리에 적합**합니다.
    - **update model인 Table**은 **최신 상태만 유지**하기 때문에, **상태 기반 처리에 적합**합니다.


---


## Stream : 무한히 지속되는 Event의 흐름

- Stream은 ksqlDB에서 **시간에 따라 연속적으로 발생하는 event들을 표현하는 data model**입니다.
    - 무한히 지속되는 event의 흐름을 나타내며, 한 번 저장된 data는 수정이나 삭제가 불가능한 **append-only** 형태로 관리됩니다.

- 각 record는 고유한 timestamp를 가지며, 이를 통해 시간 기반의 data 처리와 분석이 가능합니다.

- Stream은 실시간 data 처리와 event 기반 system 구축에 적합한 model입니다.
    - 신용카드 거래 내역 추적, IoT sensor data 수집 및 분석, application log 처리, 사용자 행동 분석, 실시간 monitoring system 등.


### Stream의 특징

- **불변성** (Immutability) : 한 번 저장된 record는 수정하거나 삭제할 수 없습니다.
    - INSERT 연산만 지원되며, UPDATE나 DELETE 연산은 불가능합니다.

- **시간 기반 처리** : 모든 record는 고유한 timestamp를 가집니다.
    - 시간을 기준으로 event를 처리하고 분석할 수 있습니다.
    - Stream 간의 Join 연산 시 timestamp를 기준으로 matching됩니다.

- **무한한 Data Sequence** : 시간에 따라 계속해서 새로운 data가 추가됩니다.
    - 또한 과거의 모든 event 기록이 보관됩니다.


### Stream 생성

```sql
-- Kafka topic으로부터 Stream 생성
CREATE STREAM stream_name (
    column1 TYPE,
    column2 TYPE,
    ...
) WITH (
    KAFKA_TOPIC='topic_name',
    VALUE_FORMAT='FORMAT_TYPE',
    PARTITIONS=1,
    REPLICAS=1
);

-- 기존 Stream으로부터 새로운 Stream 생성
CREATE STREAM new_stream WITH (
    KAFKA_TOPIC='new_topic_name'
) AS
    SELECT column1, column2
    FROM existing_stream
    WHERE condition;
```


### Stream 수정

- Stream의 data는 수정이 불가능하지만, Stream의 metadata는 수정할 수 있습니다.

```sql
-- Stream 속성 변경
ALTER STREAM stream_name WITH (KAFKA_TOPIC='new_topic_name');
```


### Stream 삭제

```sql
-- Stream 삭제
DROP STREAM stream_name;

-- Stream과 연관된 topic도 함께 삭제
DROP STREAM stream_name DELETE TOPIC;
```


### Stream Data 삽입

```sql
-- Stream에 data 삽입
INSERT INTO stream_name (column1, column2)
VALUES (value1, value2);
```


### Stream Query Example

```sql
-- Stream data 조회
SELECT column1, column2
FROM stream_name
EMIT CHANGES;

-- 시간 Window 기반 집계
SELECT column1, COUNT(*) AS count
FROM stream_name
WINDOW TUMBLING (SIZE 1 HOUR)
GROUP BY column1
EMIT CHANGES;
```


---


## Table : 특정 시점의 상태

- Table은 ksqlDB에서 **특정 시점의 상태를 나타내는 data model**입니다.
    - **각 key에 대한 최신 값을 유지**하며, 새로운 data가 들어올 때마다 해당 key의 기존 값이 update되는 변경 가능한(mutable) 특성을 가집니다.

- Table은 상태 기반의 data 관리와 현재 상태 조회가 필요한 system 구축에 적합한 model입니다.
    - 사용자 프로필 관리, 상품 재고 현황 추적, 계좌 잔액 관리, system 설정값 관리, 실시간 대시보드 상태 표시 등.


### Table의 특징

1. **변경 가능성** (Mutability) : record는 변경 가능하며 update될 수 있습니다.
   - INSERT, UPDATE, DELETE 연산이 모두 지원됩니다.
   - 동일한 key에 대한 새로운 값이 들어오면 기존 값이 update됩니다.

2. **상태 관리** : 각 key에 대한 최신 상태만을 유지합니다.
   - snapshot 형태로 현재 상태를 저장합니다.
   - Table 간의 Join 연산 시 현재 상태값을 기준으로 matching됩니다.

3. **Key 기반 처리** : 모든 record는 고유한 key를 가집니다.
   - key를 기준으로 data가 관리되고 update됩니다.


### Table 생성

```sql
-- Kafka topic으로부터 Table 생성
CREATE TABLE table_name (
    column1 TYPE,
    column2 TYPE,
    ...
    PRIMARY KEY (column1)
) WITH (
    KAFKA_TOPIC='topic_name',
    VALUE_FORMAT='FORMAT_TYPE',
    PARTITIONS=1,
    REPLICAS=1
);

-- 기존 Table이나 Stream으로부터 새로운 Table 생성
CREATE TABLE new_table WITH (
    KAFKA_TOPIC='new_topic_name'
) AS
    SELECT column1, column2
    FROM existing_table
    GROUP BY column1;
```


### Table 수정

```sql
-- Table 속성 변경
ALTER TABLE table_name WITH (KAFKA_TOPIC='new_topic_name');
```


### Table 삭제

```sql
-- Table 삭제
DROP TABLE table_name;

-- Table과 연관된 topic도 함께 삭제
DROP TABLE table_name DELETE TOPIC;
```


### Table Data 조작

- ksqlDB에서는 일반적인 UPDATE 구문을 사용하지 않고, **INSERT를 통해 update를 수행**합니다.
    - 같은 key 값을 가진 새로운 record가 들어오면 기존 값을 덮어쓰게 됩니다.
    - Table 생성 시 key column을 지정할 수 있습니다.

```sql
-- data 삽입
INSERT INTO table_name (column1, column2)
VALUES (value1, value2);

-- data update (column1 is primary key)
INSERT INTO table_name (column1, column2)
VALUES (value1, new_value2);

-- data 삭제
DELETE FROM table_name
WHERE column1 = value1;
```


### Table Query Example

```sql
-- Table data 조회
SELECT column1, column2
FROM table_name
EMIT CHANGES;

-- Table 집계
SELECT column1, COUNT(*) AS count
FROM table_name
GROUP BY column1
EMIT CHANGES;

-- Table과 Stream Join
SELECT t.column1, s.column2
FROM table_name t
    JOIN stream_name s ON t.id = s.id
EMIT CHANGES;
```


---


## Stream을 Table로 변환하기

- **CREATE 뒤에 Table 이름**을, **FROM 뒤에 Stream 이름**을 넣어, **Stream으로부터 Tatble을 생성**할 수 있습니다.
    - Stream의 모든 event는 Table에 반영되며, Table은 항상 각 key에 대한 최신 상태만을 유지합니다.
    - 동일한 key에 대한 새로운 data가 들어오면 Table의 해당 record가 update됩니다.

```sql
CREATE TABLE table_name AS
SELECT
    column1,
    column2,
    ...,
    columnN,
   aggregation_function(value_column) AS aggregated_value
FROM stream_name
GROUP BY column1, column2, ..., columnN
EMIT CHANGES;
```

- Stream을 Table로 전환할 때, **GROUP BY 절은 필수**입니다.
    - Table은 각 key에 대한 최신 상태를 유지해야 하므로, 어떤 column을 기준으로 그룹화할지 명시해야 합니다.
    - GROUP BY를 사용하기 때문에, **집계 함수(COUNT, SUM, MAX 등)도 함께 사용**하여, Stream의 event들을 어떻게 집계할지 정의해야 합니다.

- 반대로, **Table을 Stream으로 변환하는 것은 근본적인 특성 차이로 인해 불가능**합니다.
   - Table은 상태 기반으로 각 key의 최신 값만 유지하며, 이전 상태를 저장하지 않고 덮어씁니다.
   - Stream은 event 기반으로 모든 변경 event를 순서대로 기록하며, 전체 이력을 보존하고 있습니다.
   - 최종 값인 최신 정보(Table)만을 가지고, 모든 변경 event(Stream)를 추측해낼 수는 없습니다.
   - 또한 Stream으로부터 만들어진 Table을 다시 Stream으로 변환해야 할 이유도 없습니다.


### Stream to Table 변환 예시

- Stream to Table 변환은 **실시간 집계**나 **현재 상태를 추적**해야 하는 경우에 유용합니다.
    1. 실시간 집계가 필요할 때.
    2. 최신 상태만 유지하면 될 때.
    3. 시간 Window 기반의 분석이 필요할 때.
    4. 상태 기반의 monitoring이 필요할 때.

- event data(Stream)를 집계하여 상태(Table)로 저장해야할 때, 변환이 필요합니다.

```mermaid
flowchart TD
    subgraph kafka_events[Kafka Events]
        user_purchase_event[User Purchase Event]
        settings_change_event[Settings Change Event]
        page_view_event[Page View Event]
        error_event[Error Event]
    end
    subgraph ksqldb_streams[ksqlDB Streams]
        purchase_stream[Purchase Stream]
        settings_stream[Settings Stream]
        page_view_stream[Page View Stream]
        error_stream[Error Stream]
    end
    subgraph ksqldb_tables[ksqlDB Tables]
        purchase_totals_table[Purchase Totals Table]
        user_preferences_table[User Preferences Table]
        traffic_stats_table[Traffic Stats Table]
        error_counts_table[Error Counts Table]
    end
    user_purchase_event --> purchase_stream
    settings_change_event --> settings_stream
    page_view_event --> page_view_stream
    error_event --> error_stream
    purchase_stream -->|GROUP BY user_id| purchase_totals_table
    settings_stream -->|LATEST_BY_OFFSET| user_preferences_table
    page_view_stream -->|WINDOW TUMBLING| traffic_stats_table
    error_stream -->|WINDOW HOPPING| error_counts_table
```

#### 실시간 집계가 필요한 경우

```sql
-- 구매 Event Stream 생성
CREATE STREAM purchase_stream (
    user_id VARCHAR,
    purchase_amount DECIMAL,
    timestamp TIMESTAMP
) WITH (
    kafka_topic = 'purchases',
    value_format = 'JSON',
    timestamp = 'timestamp'
);

-- 사용자별 총 구매액을 추적하는 Table 생성
CREATE TABLE user_purchase_totals AS
    SELECT user_id,
           SUM(purchase_amount) AS total_spent
    FROM purchase_stream
    GROUP BY user_id
    EMIT CHANGES;
```

- 사용자별 총 구매액을 실시간으로 추적합니다.
- 새로운 구매가 발생할 때마다 자동으로 합계가 update됩니다.

#### 최신 상태 관리가 필요한 경우

```sql
-- 사용자 설정 변경 Stream 생성
CREATE STREAM user_settings_stream (
    user_id VARCHAR,
    theme_color VARCHAR,
    language VARCHAR,
    update_time TIMESTAMP
) WITH (
    kafka_topic = 'user_settings',
    value_format = 'JSON',
    timestamp = 'update_time'
);

-- 사용자별 최신 설정을 유지하는 Table 생성
CREATE TABLE user_preferences AS
    SELECT user_id,
        LATEST_BY_OFFSET(theme_color) AS current_theme,
        LATEST_BY_OFFSET(language) AS current_language
    FROM user_settings_stream
    GROUP BY user_id
    EMIT CHANGES;
```

- 사용자의 최신 설정 정보만 유지합니다.
- 새로운 설정 변경이 있을 때 자동으로 최신 상태로 갱신합니다.

#### 기간별 통계를 보는 경우

```sql
-- Page View Event Stream 생성
CREATE STREAM pageview_stream (
    url_path VARCHAR,
    user_id VARCHAR,
    view_time TIMESTAMP
) WITH (
    kafka_topic = 'pageviews',
    value_format = 'JSON',
    timestamp = 'view_time'
);

-- 시간별 Traffic 집계 Table 생성
CREATE TABLE hourly_traffic AS
    SELECT url_path,
           COUNT(*) AS visit_count,
           WINDOWSTART AS window_start
    FROM pageview_stream 
    WINDOW TUMBLING (SIZE 1 HOUR)
    GROUP BY url_path
    EMIT CHANGES;
```

- website 각 page의 시간당 방문자 수를 집계합니다.
- 1시간 단위로 traffic 통계를 자동으로 update합니다.

#### 이상 탐지나 임계값 Monitoring

```sql
-- Error Event Stream 생성
CREATE STREAM error_stream (
    service_name VARCHAR,
    error_code VARCHAR,
    error_message VARCHAR,
    error_time TIMESTAMP
) WITH (
    kafka_topic = 'service_errors',
    value_format = 'JSON',
    timestamp = 'error_time'
);

-- 각 service에 대한 error count Table 생성
CREATE TABLE error_counts AS
    SELECT
        service_name,
        COUNT(*) AS error_count
    FROM error_stream
    WINDOW HOPPING (SIZE 5 MINUTES, ADVANCE BY 1 MINUTE)
    GROUP BY service_name
    EMIT CHANGES;
```

- 각 service의 error 발생 횟수를 실시간으로 monitoring합니다.
- 특정 임계값을 넘으면 경고를 발생시키는 용도로 활용합니다.
