---
layout: note
permalink: /136
title: ksqlDB의 Join - Stream과 Table의 실시간 결합
description: ksqlDB는 Stream-Stream, Stream-Table, Table-Table 간의 Join을 지원하여 실시간 data를 실시간으로 결합할 수 있습니다.
date: 2025-01-07
---


## Join : 실시간 Data를 실시간으로 결합하기

- ksqlDB는 **Stream-Stream, Stream-Table, Table-Table 간의 Join 기능**을 제공하고 있습니다.

```txt
ksqlDB의 Join = raw event data + contextual data = Meaningful Business Data
```

- ksqlDB의 Join은 **실시간으로 흐르는 raw event data에 contextual data(문맥 정보)를 결합하는 mechanism**입니다. 
    - 일반적으로 streaming system에서 흐르는 event data는 경량화와 처리 효율성을 위해 최소한의 필수 정보만을 포함합니다.
    - 하지만 이러한 raw data만으로는 실질적인 business 의사결정이나 분석에 필요한 충분한 정보를 갖지 못합니다.
    - 이때 Join을 통해 이 raw event에 **부가적인 문맥 정보(contextual data)를 실시간으로 보강**할 수 있습니다.
    - 기존 batch 처리 방식과 달리 **event가 발생하는 즉시 필요한 정보가 결합**됩니다.

- ksqlDB Join의 핵심은 **상태 관리**(state management)입니다.
    - streaming system에서는 지속적으로 data가 흐르기 때문에, Join에 필요한 data의 상태를 계속해서 추적하고 관리해야 합니다.
    - ksqlDB는 이러한 상태 관리를 자동으로 처리하며, 이를 통해 개발자는 복잡한 상태 관리 logic을 직접 구현할 필요 없이 business logic에 집중할 수 있습니다.

- 따라서 ksqlDB의 Join은 단순한 data 결합 이상의 의미를 가집니다.
    - 실시간 streaming 환경에서 raw data를 의미있는 business data로 변환하는 **실시간 data 보강(real-time data enrichment) mechanism**이라고 할 수 있습니다.

- ksqlDB의 Join은 기능적으로는 RDBMS의 Join과 유사하지만, 서로 완전히 다른 개념입니다.
    - **ksqlDB의 Join은 data streaming 환경에서 실시간 data 처리와 결합을 위해 설계된 개념**으로, 전통적인 RDBMS의 정적 data 결합과는 다른 paradigm을 가지고 있습니다.

| 비교 항목 | RDBMS | ksqlDB | 설명 |
| --- | --- | --- | --- |
| **Join의 목적** | 서로 다른 Table의 data를 조합하여 원하는 result set 도출 | upstream data를 특정 기준으로 합쳐 새로운 downstream 생성 | RDBMS는 저장된 data의 조회가, ksqlDB는 data pipeline 구성이 주 목적 |
| **Data 구조** | Table | Stream, Table | ksqlDB는 실시간 event stream을 처리하기 위해 두 가지 구조 제공 |
| **Data 흐름** | 정적 data 간 결합 | upstream -> Join -> downstream의 단방향 흐름 | ksqlDB는 data의 흐름을 전제로 한 단방향 처리 |
| **Data 특성** | static data | dynamic data (실시간 Stream) | ksqlDB는 시간에 따라 계속 변화하는 data 처리 |
| **Join 동작 시점** | query 실행 시점 | data 유입 시점 | 실행 시점의 차이가 결과 생성 방식의 차이를 만듦 |
| **Join 지속성** | 일회성 실행 | 지속적 실행 | ksqlDB는 Stream 처리를 위해 지속적으로 실행 |
| **Join 결과** | 정적 result set 반환 | 지속적인 Stream 생성 | 결과물의 형태와 생성 방식이 다름 |
| **처리 방식** | Pull 방식 (요청 시 처리) | Push 방식 (event 발생 시 처리) | data 처리 trigger의 차이 |
| **Memory 사용** | query 실행 동안만 사용 | 상태 저장을 위해 지속적 사용 | ksqlDB는 Stream 처리를 위한 상태 관리 필요 |
| **Data access** | 저장된 전체 data 접근 가능 | Window 기반 data 접근 | 처리 가능한 data의 범위가 다름 |

- ksqlDB에서 Join은 실시간 data 처리를 위한 것이므로 **Pull Query(일회성 조회)로는 Join을 수행할 수 없습니다.**
    - Pull Query는 materialized된 결과를 조회하는 용도이므로, 새로운 data stream을 생성하는 ksqlDB의 Join 작업과는 개념적으로 충돌합니다.
    - 지속적으로 실행되며 결과를 streaming하는 Push Query에서만 Join이 가능합니다.


### ksqlDB Join의 실시간성

- 모든 Join 유형에서 **시간 동기화는 best-effort로 제공**됩니다.
    - ksqlDB는 최대한 정확한 시간 기준으로 Join을 수행하려 하지만, **약간의 시간 차이나 오차가 있을 수 있다는 의미**입니다.

- **분산 system의 특성상 완벽한 실시간 동기화는 보장할 수 없으며**, 이로 인해 Joind에서 일부 data가 누락되거나 지연되어 null 결과(leftRecord-NULL)가 나올 수 있습니다.
    - 서로 다른 node의 system 시간이 약간씩 다를 수 있습니다.
    - 네트워크 지연으로 인해 data 도착 시간이 달라질 수 있습니다.


### Join의 종류와 각 Join에 대한 지원 범위

- **Window** : Stream-Stream Join에서만 사용되는 개념입니다.
    - 시간 기반으로 data를 grouping하는 방식으로, stream data를 특정 시간 간격으로 분할하여 처리합니다.
    - Table Join에서는 Window 개념이 적용되지 않습니다.

- **Inner Join** : 두 data source(Stream-Stream, Table-Table, Stream-Table)에서 Join key가 일치하는 record만을 결과로 생성합니다.
    - 모든 Join 유형에서 지원됩니다.

- **Left Outer Join** : 왼쪽(FROM 절) data source의 모든 record를 기준으로 결과를 생성합니다.
    - Table-Table, Stream-Stream Join에서는 완전히 지원되며, Stream-Table Join에서도 지원됩니다.
    - JOIN 절의 data와 matching되는 record가 없는 경우 null 값으로 채워집니다.

- **Right Outer Join** : 오른쪽(JOIN 절) data source의 모든 record를 기준으로 결과를 생성합니다.
    - Table-Table과 Stream-Stream Join에서는 지원되지만, Stream-Table Join에서는 지원되지 않습니다.
    - matching되는 record가 없는 경우 null 값으로 채워집니다.

- **Full Outer Join** : 양쪽 data source의 모든 record를 결과에 포함시킵니다.
    - Table-Table과 Stream-Stream Join에서는 지원되지만, Stream-Table Join에서는 지원되지 않습니다.
        - Full Outer Join이 Right Outer Join의 동작을 포함하므로, 동일하게 Stream-Table Join을 지원하지 않습니다.
    - matching되지 않는 record의 경우 해당 field들이 null 값으로 채워집니다.

| Type | Window | Inner | Left Outer | Right Outer | Full Outer |
| --- | --- | --- | --- | --- | --- |
| **Stream-Stream** | O | O | O | O | O |
| **Stream-Table** | X | O | O | X | X |
| **Table-Table** | X | O | O | O | O |

#### Data 무결성 보장을 위한 Outer Join 사용

- ksqlDB에서는 **data 무결성 보장을 위해 일반적으로 Outer Join 사용을 권장**합니다.
    - 실시간 data 처리 환경에서는 예상치 못한 null 값이나 누락된 data가 발생할 수 있기 때문입니다.
    - Inner Join을 사용하면 Join 조건을 만족하지 않는 record가 모두 제외되어 중요한 business data가 누락될 수 있습니다.

- 반면 Outer Join은 Join 조건을 만족하지 않는 record도 유지하면서 관련 field만 null로 처리하므로, data의 완전성을 보장하고 추후 분석이나 처리에 용이합니다.
    - 예를 들어, 주문 system에서 사용자 정보가 일시적으로 누락되더라도 주문 자체의 data는 보존할 수 있습니다.


---


## ksqlDB Join 제약 조건

- ksqlDB에서는 구조적인 특성 때문에, 몇 가지 조건을 만족해야만 Join이 가능합니다.


### 1. Join Key의 Schema 일치 조건

- **Join을 위한 Key는 반드시 동일한 schema**를 가져야 합니다.
    - 만약 schema가 일치하지 않는 경우, `CAST` 함수를 사용하여 type을 변환할 수 있습니다.

```sql
-- Stream with INT userId
CREATE STREAM clicks (
    userId INT KEY,
    url STRING
) WITH (
    kafka_topic='clickstream',
    value_format='json'
);

-- Table with BIGINT id stored in the key
CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    fullName STRING
) WITH (
    kafka_topic='users',
    value_format='json'
);

-- Join utilising a CAST to convert the left sides join column to match the rights type.
SELECT
    clicks.url,
    users.fullName
FROM clicks
    JOIN users ON CAST(clicks.userId AS BIGINT) = users.id
EMIT CHANGES;
```


### 2. Partition 수 일치 조건

- **Join 대상이 되는 Stream/Table은 반드시 동일한 수의 partition을 가져야** 합니다.
    - partition 수가 다른 경우, repartition을 통해 해결할 수 있습니다.

- repartition을 할 때는 `PARTITION BY` 구문과 `COALESCE` 함수를 모두 사용하는 것이 가장 안전합니다.
    - `PARTITION BY` 절을 생략하면 기존 Stream/Table의 Key를 유지하여 repartition하게 됩니다.
    - `PARTITION BY`에 null이 입력되는 경우를 방지하기 위해 `COALESCE` 함수 사용을 권장합니다.
        - `COALESCE` 함수는 여러 입력값 중 null이 아닌 첫 번째 값을 반환하는 함수입니다.

#### Repartition 방법 1. 기존 Partition Key 유지

```sql
CREATE STREAM products_rekeyed 
    WITH (PARTITIONS=6) AS 
    SELECT * 
    FROM products;
```

- 기존 Stream/Table의 partition key를 그대로 사용하며, partition의 수만 6개로 변경합니다.
- `PARTITION BY` 절을 생략하여 구현합니다.

#### Repartition 방법 2. 새로운 Partition Key 지정 (기본)

```sql
CREATE STREAM products_rekeyed 
    WITH (PARTITIONS=6) AS 
    SELECT * 
    FROM products
    PARTITION BY product_id;
```

- `product_id`를 새로운 partition key로 사용하되, `product_id`가 null인 경우 임의의 partition에 할당되어 예측이 어려워집니다.

#### Repartition 방법 3. 새로운 Partition Key 지정 (권장)

```sql
CREATE STREAM products_rekeyed 
    WITH (PARTITIONS=6) AS 
    SELECT * 
    FROM products
    PARTITION BY COALESCE(product_id, 'unknown');
```

- `product_id`를 새로운 partition key로 사용하며, null 값이 들어올 경우 'unknown'으로 대체하여 일관된 partitioning을 보장합니다.


### 3. Partition 분배 전략 일치 조건

- **Join을 수행하는 partition들은 동일한 partition 분배 전략을 사용**해야 합니다.
- Join을 수행하는 partition이 서로 다른 partition 분배 전략을 사용하면, **동일한 partition 번호에 서로 다른 Key가 존재할 수 있어 Join이 불가능**합니다.
- Kafka Producer는 기본적으로 Hash algorithm을 통해 key를 partitioning하지만, Producer 구현 시 Hash algorithm 외에 다른 partition 분배 전략을 사용할 수도 있어, 서로 다른 전략을 사용하는 상황을 주의해야 합니다.


---


## Join 관계 유형 : Stream-Stream, Stream-Table, Table-Table

1. **Stream-Stream Join** : event sequence matching에 적합하며, 시간 Window 지정이 필수입니다.
    - Stream-Stream Join은 `WITHIN` 절로 지정된 시간 Window 내에서만 실시간으로 Join이 발생합니다.
    - 새로운 data가 들어올 때마다 Window 내의 다른 stream data와 matching되어 Join 결과가 생성됩니다.
    - 이미 생성된 Join 결과는 update되지 않으며, Window를 벗어난 data는 더 이상 Join에 참여하지 않습니다.

2. **Stream-Table Join** : 실시간 event 보강(enrichment)에 적합하며, Table의 최신 상태만 사용됩니다.
    - Stream-Table Join은 Stream에 새로운 data가 들어올 때만 Table을 조회하여 Join합니다.
    - Table의 data가 변경되더라도 이미 생성된 Join 결과는 update되지 않습니다.
    - 즉, Join 결과는 Stream data가 들어온 시점의 Table 상태를 반영합니다.

3. **Table-Table Join** : 상태 기반 data 조합에 적합하며, 양쪽 Table의 변경 사항이 실시간으로 반영됩니다.
    - Table-Table Join은 eventually consistent 방식으로 동작합니다.
    - 어느 한쪽 Table의 data가 변경되면 Join 결과도 자동으로 update됩니다.
    - 다만 이 update가 즉시 반영되지는 않으며, 약간의 시간 차를 두고 최종적으로 일관성이 보장됩니다.

| 비교 항목 | Stream-Stream | Stream-Table | Table-Table |
| --- | --- | --- | --- |
| **지원되는 Join 유형** | Inner, Left Outer, Right Outer, Full Outer | Inner, Left Outer | Inner, Left Outer, Full Outer |
| **결과물 Type** | Stream | Stream | Table |
| **Update 동작** | Window 내 matching되는 새로운 record마다 결과 생성 | Stream의 새로운 record마다 Table의 현재 상태와 matching | 양쪽 Table이 변경될 때마다 결과 update |
| **이전 결과 영향** | 영향 없음, 새로운 record만 추가 | 영향 없음, 새로운 record만 추가 | 기존 결과도 함께 update |
| **Record 삭제 처리** | Window 내에서만 영향 | Table의 삭제된 record는 더 이상 matching 안됨 | 양쪽 모두 삭제 event 처리 |
| **Data 정합성** | 시간 기반 정합성 | key 기반 정합성 | key 기반 정합성 |
| **Join key 요구 사항** | 동일한 key로 partition 필요 | 동일한 key로 partition 필요 | 동일한 key로 partition 필요 |
| **시간 Window 필요 여부** | 필수 (`WITHIN` 절) | 불필요 | 불필요 |
| **Scaling 특성** | partition 수에 따라 수평 확장 | partition 수에 따라 수평 확장 | 양쪽 Table partition 고려 필요 |
| **Resource 요구 사항** | 중간 | 낮음 | 높음 |
| **Memory 사용** | Window 크기에 비례 | Table 크기에 비례 | 양쪽 Table 크기에 비례 |
| **지연 시간 특성** | Window 크기에 영향을 받음 | 상대적으로 빠름 | 양쪽 Table 크기에 영향을 받음 |
| **일반적 사용 사례** | 실시간 event 상관 관계 분석, pattern 감지 | 실시간 data 보강, 참조 data 결합 | 상태 기반 집계, master data 결합 |


### Stream-Stream Join

```sql
CREATE STREAM joined_stream AS
SELECT *
FROM stream1 s1
    INNER JOIN stream2 s2
    WITHIN 1 HOURS
    ON s1.id = s2.id
EMIT CHANGES;
```

- **두 개의 Stream을 Join**하는 방식으로, 두 Stream의 event가 지정된 시간 Window 내에서 matching될 때 결과가 출력됩니다.
    - 한쪽에 새로운 record가 들어오면, Window 내의 다른 쪽 matching record들과 모두 Join됩니다.
        - 왼쪽 Stream의 각 record는 오른쪽 Stream의 모든 matching되는 record와 Join됩니다.
    - Stream 간 Join은 새로운 data가 Stream에 들어올 때만 동작하고, 이미 생성된 JOIN 결과는 update되지 않습니다.

- **Window 크기(`WITHIN` 절)를 반드시 지정**해야 하며, 이는 Join할 record들의 최대 시간 차이를 의미합니다.
    - Window를 벗어난 data는 더 이상 Join에 참여하지 않습니다.
    - Window 크기 설정이 memory 사용량에 영향을 미칩니다.

- repartitioning이 필요한 경우에만 Stream이 repartitioning됩니다.
    - repartitioning 후에도 같은 partition에 있는 message들만 상대적 순서가 보장됩니다.
    - 그 외의 경우 message 순서가 뒤섞일 수 있습니다.

- Inner, Left Outer, Right Outer, Full Outer Join을 모두 지원합니다.
    - **Inner Join** : **양쪽 data가 둘 다 있을 때만** JOIN 결과가 만들어집니다.
        - Window 안에서 양쪽 Stream의 data가 모두 있어야 결과가 나옵니다.
    - **Left Outer Join** : **왼쪽은 무조건 결과에 포함**됩니다.
        - 왼쪽 Stream data가 들어오면, Window 안에 오른쪽 data가 없어도 결과가 나옵니다.
            - 오른쪽에 matching되는 data가 없으면 그 자리는 null로 채워집니다.
    - **Right Outer Join** : **오른쪽은 무조건 결과에 포함**됩니다.
        - 오른쪽 Stream data가 들어오면, Window 안에 왼쪽 data가 없어도 결과가 나옵니다.
            - 왼쪽에 matching되는 data가 없으면 그 자리는 null로 채워집니다.
    - **Full Outer Join** : **양쪽 data를 모두 결과에 포함**합니다.
        - 어느 쪽 Stream data가 들어와도, Window 안에 상대편 data가 없으면 null로 채워서 결과가 나옵니다.
            - matching되는 data가 없는 쪽은 null로 채워집니다.

- out-of-order record도 지원합니다.
    - `WITHIN` 절로 설정한 Window 시간 안에 들어오기만 하면, record 순서가 뒤섞여 들어와도 제대로 Join이 이루어집니다.

#### 예시 : 주문 Stream과 배송 Stream을 Join하여 주문 상태 Monitoring

```sql
CREATE STREAM orders (
    order_id VARCHAR KEY,
    user_id VARCHAR,
    product_id VARCHAR,
    order_time TIMESTAMP
) WITH (
    kafka_topic='orders',
    value_format='json',
    partitions=1
);

CREATE STREAM shipments (
    shipment_id VARCHAR KEY,
    order_id VARCHAR,
    status VARCHAR,
    shipment_time TIMESTAMP
) WITH (
    kafka_topic='shipments',
    value_format='json',
    partitions=1
);

CREATE STREAM order_shipments AS
SELECT
    o.order_id,
    o.user_id,
    o.product_id,
    s.shipment_id,
    s.status,
    o.order_time,
    s.shipment_time
FROM orders o
    INNER JOIN shipments s
    WITHIN 24 HOURS
    ON o.order_id = s.order_id
EMIT CHANGES;
```


### Stream-Table Join

```sql
CREATE STREAM enriched_stream AS
SELECT *
FROM stream1 s
    JOIN table1 t
    ON s.id = t.id
EMIT CHANGES;
```

- **Stream의 각 record를 Table의 현재 상태와 Join**합니다.
    - Stream에 새로운 record가 도착할 때만 Table을 조회합니다.
        - 따라서 **Table update는 Join 결과에 반영되지 않습니다.**
    - Table의 가장 최신 값만 사용되며, Join 결과는 Stream으로 출력됩니다.
    - Window 없이 동작합니다.

- **Inner와 Left Outer Join만 지원**하고, **Right Outer Join은 명확한 의미 정의가 불가능하여 지원하지 않습니다.**
    - Table의 Key를 기준으로 Join을 수행할 때, Stream에는 동일한 Key를 가진 여러 event가 존재할 수 있습니다.
    - 동일한 Key의 여러 Stream event가 존재하는 상황에서, Table의 특정 Key에 대해 Stream의 어떤 event를 matching시켜야 하는지 명확하게 결정할 수 없습니다.
    - 따라서, Stream-Table Join에서는 Right Outer Join을 수행할 수 없고, Full Outer Join 역시 Right Outer Join의 동작을 포함하므로 불가능합니다.
    - Left Outer Join은 가능합니다.

- repartitioning이 필요한 경우에만 Stream이 repartitioning됩니다.

#### 예시 : 주문 Stream과 사용자 Table을 Join하여 주문 정보 강화

```sql
CREATE TABLE users (
    user_id VARCHAR PRIMARY KEY,
    name VARCHAR,
    email VARCHAR,
    address VARCHAR
) WITH (
    kafka_topic='users',
    value_format='json',
    partitions=1
);

CREATE STREAM enriched_orders AS
SELECT
    o.order_id,
    o.product_id,
    u.name AS user_name,
    u.email AS user_email,
    u.address AS shipping_address,
    o.order_time
FROM orders o
    LEFT JOIN users u
    ON o.user_id = u.user_id
EMIT CHANGES;
```


### Table-Table Join

```sql
CREATE TABLE joined_table AS
SELECT *
FROM table1 t1
    JOIN table2 t2
    ON t1.id = t2.id
EMIT CHANGES;
```

- **두 Table의 현재 상태를 Join하여 새로운 Table을 생성**합니다.
    - 양쪽 Table의 변경 사항이 있을 때마다 Join 결과가 update됩니다.
    - Window 없이 동작하며, 결과는 항상 Table 형태입니다.

- **Primary-key Join과 Forein-key Join을 지원**합니다.
    - **Primary-key(1:1) Join** : INNER, LEFT OUTER, FULL OUTER를 지원합니다.
        - foreign-key Join에서는 왼쪽 Table의 아무 column이나 오른쪽 Table의 primary-key와 Join할 수 있습니다.
    - **Foreign-key(1:N) Join** : INNER, LEFT OUTER를 지원합니다.
    - **Many-to-many(N:M) Join** : 지원하지 않습니다.

- Table-Table Join은 **eventually consistent 방식으로 동작**합니다.
    - 어느 한쪽 Table의 data가 변경되면 Join 결과도 자동으로 update됩니다.
    - 다만 이 update가 즉시 반영되지는 않으며, 약간의 시간 차를 두고 최종적으로 일관성이 보장됩니다.

#### 예시 : 제품 Table과 재고 Table을 Join하여 제품 정보 완성

```sql
CREATE TABLE products (
    product_id VARCHAR PRIMARY KEY,
    name VARCHAR,
    category VARCHAR,
    price DECIMAL(10,2)
) WITH (
    kafka_topic='products',
    value_format='json',
    partitions=1
);

CREATE TABLE inventory (
    product_id VARCHAR PRIMARY KEY,
    quantity INTEGER,
    warehouse_id VARCHAR
) WITH (
    kafka_topic='inventory',
    value_format='json',
    partitions=1
);

CREATE TABLE product_inventory AS
SELECT
    p.product_id,
    p.name,
    p.category,
    p.price,
    i.quantity,
    i.warehouse_id
FROM products p
    LEFT JOIN inventory i
    ON p.product_id = i.product_id
EMIT CHANGES;
```


---


## N-Way Join : 세 개 이상 Join하기

- N-Way Join은 **세 개 이상의 Stream이나 Table을 Join하는 것**입니다.

```sql
CREATE STREAM output_stream AS
SELECT *
FROM stream1 s1
    JOIN stream2 s2 WITHIN 1 HOUR ON s1.id = s2.id
    JOIN table1 t1 ON s2.key = t1.key
    JOIN stream3 s3 WITHIN 30 MINUTES ON s1.id = s3.id
EMIT CHANGES;
```

- **Join은 왼쪽에서 오른쪽으로 순차적으로 처리**되며, **각 Join은 이전 Join의 결과를 기반으로 수행**됩니다.
    - Join 순서에 따라 성능이 크게 달라질 수 있습니다.
    - 하나의 Join이 실패하면 전체 pipeline에 영향을 미치게 됩니다.
        - 따라서 각 단계별 error 처리 logic이 필요하며 재시도 전략을 수립해야 합니다.

- **Join이 많아질수록 복잡도가 기하급수적으로 증가**하며, monitoring과 debugging이 어려워집니다.
    - 가능한 한 Join 수를 최소화하는 것이 좋습니다.

- 각 Join 단계별 처리 시간, memory 사용량, record 처리량, 지연 시간 등을 monitoring해야 합니다.
    - 단계별 Join 결과를 monitoring하고 병목 지점을 식별하여, 필요한 경우 Join을 재구성해야 합니다.
    - N-Way Join은 강력한 기능이지만 신중하게 설계하고 관리해야 하며, 특히 성능과 resource 사용에 주의를 기울여야 합니다.

- Stream-Stream Join의 경우 각각 독립적인 시간 Window 설정이 가능하며, 여러 Window가 존재할 경우 memory 사용량이 증가합니다.
    - 각 Window는 독립적으로 관리되며 만료됩니다.


### N-Way Join 구현 방법 1. 점진적 강화 Pattern

- 단계적으로 data 강화하는 구현 방식입니다.

```sql
CREATE STREAM enriched_stream1 AS
    SELECT * FROM stream1 JOIN stream2 WITHIN 1 HOUR ON stream1.id = stream2.id;

CREATE STREAM enriched_stream2 AS
    SELECT * FROM enriched_stream1 JOIN table1 ON enriched_stream1.key = table1.key;

CREATE STREAM final_stream AS
    SELECT * FROM enriched_stream2 JOIN stream3 WITHIN 30 MINUTES ON enriched_stream2.id = stream3.id;
```


### N-Way Join 구현 방법 2. 단일 Query Pattern

- 한 번에 모든 Join을 수행하는 구현 방식입니다.

```sql
CREATE STREAM output_stream AS
SELECT 
    s1.id,
    s2.data as stream2_data,
    t1.info as table1_info,
    s3.value as stream3_value
FROM stream1 s1
    JOIN stream2 s2 WITHIN 1 HOUR ON s1.id = s2.id
    JOIN table1 t1 ON s2.key = t1.key
    JOIN stream3 s3 WITHIN 30 MINUTES ON s1.id = s3.id
EMIT CHANGES;
```


### N-Way Join 성능 최적화

- 가장 선택적인(결과를 많이 필터링하는) Join을 먼저 수행하고, 큰 dataset은 가능한 늦게 Join하는 것이 좋습니다.
- Table Join은 Stream Join보다 먼저 수행하는 것이 유리합니다.

```sql
-- memory 관리를 위해 필요한 column만 선택하여 memory 사용량을 최소화하기
CREATE STREAM output_stream AS
SELECT 
    s1.id,
    s2.required_field1,
    t1.required_field2,
    s3.required_field3
FROM stream1 s1
    JOIN stream2 s2 WITHIN 1 HOUR ON s1.id = s2.id
    JOIN table1 t1 ON s2.key = t1.key
    JOIN stream3 s3 WITHIN 30 MINUTES ON s1.id = s3.id
EMIT CHANGES;
```


---


## Reference

- <https://docs.confluent.io/platform/current/ksqldb/developer-guide/joins/join-streams-and-tables.html>
- <https://ojt90902.tistory.com/1103>

