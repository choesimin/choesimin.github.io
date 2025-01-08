---
layout: skill
title: ksqlDB의 Join (스트림-스트림, 스트림-테이블, 테이블-테이블)
date: 2025-01-07
---




## Join : 실시간 데이터를 실시간으로 결합하기

- ksqlDB는 **스트림-스트림, 스트림-테이블, 테이블-테이블 간의 Join 기능**을 제공하고 있습니다.

```txt
ksqlDB의 Join = 실시간 이벤트 + 문맥 정보 = 의미있는 비즈니스 데이터
```

- ksqlDB의 Join은 **실시간으로 흐르는 원시 이벤트 데이터(raw event data)에 문맥 정보(contextual data)를 결합하는 메커니즘**입니다. 
    - 일반적으로 스트리밍 시스템에서 흐르는 이벤트 데이터는 경량화와 처리 효율성을 위해 최소한의 필수 정보만을 포함합니다.
    - 하지만 이러한 원시 데이터만으로는 실질적인 비즈니스 의사결정이나 분석에 필요한 충분한 정보를 갖지 못합니다.
    - 이때 Join을 통해 이 원시 이벤트에 **부가적인 문맥 정보를 실시간으로 보강**할 수 있습니다.
    - 기존 배치 처리 방식과 달리 **이벤트가 발생하는 즉시 필요한 정보가 결합**됩니다.

- ksqlDB Join의 핵심은 **상태 관리**(state management)입니다.
    - 스트리밍 시스템에서는 지속적으로 데이터가 흐르기 때문에, Join에 필요한 데이터의 상태를 계속해서 추적하고 관리해야 합니다.
    - ksqlDB는 이러한 상태 관리를 자동으로 처리하며, 이를 통해 개발자는 복잡한 상태 관리 로직을 직접 구현할 필요 없이 비즈니스 로직에 집중할 수 있습니다.

- 따라서 ksqlDB의 Join은 단순한 데이터 결합 이상의 의미를 가집니다.
    - 실시간 스트리밍 환경에서 원시 데이터를 의미있는 비즈니스 정보로 변환하는 **실시간 데이터 보강(real-time data enrichment) 메커니즘**이라고 할 수 있습니다.

- ksqlDB의 Join은 기능적으로는 RDBMS의 Join과 유사하지만, 서로 완전히 다른 개념입니다.
    - **ksqlDB의 Join은 데이터 스트리밍 환경에서 실시간 데이터 처리와 결합을 위해 설계된 개념**으로, 전통적인 RDBMS의 정적 데이터 결합과는 다른 패러다임을 가지고 있습니다.

| 비교 항목 | RDBMS | ksqlDB | 설명 |
| --- | --- | --- | --- |
| **Join의 목적** | 서로 다른 테이블의 데이터를 조합하여 원하는 결과셋 도출 | Upstream 데이터를 특정 기준으로 합쳐 새로운 Downstream 생성 | RDBMS는 저장된 데이터의 조회가, ksqlDB는 데이터 파이프라인 구성이 주 목적 |
| **데이터 구조** | Table | Stream, Table | ksqlDB는 실시간 이벤트 스트림을 처리하기 위해 두 가지 구조 제공 |
| **데이터 흐름** | 정적 데이터 간 결합 | Upstream -> Join -> Downstream의 단방향 흐름 | ksqlDB는 데이터의 흐름을 전제로 한 단방향 처리 |
| **데이터 특성** | 정적 데이터 | 동적 데이터(실시간 스트림) | ksqlDB는 시간에 따라 계속 변화하는 데이터 처리 |
| **Join 동작 시점** | 쿼리 실행 시점 | 데이터 유입 시점 | 실행 시점의 차이가 결과 생성 방식의 차이를 만듦 |
| **Join 지속성** | 일회성 실행 | 지속적 실행 | ksqlDB는 스트림 처리를 위해 지속적으로 실행 |
| **Join 결과** | 정적 결과셋 반환 | 지속적인 스트림 생성 | 결과물의 형태와 생성 방식이 다름 |
| **처리 방식** | PULL 방식 (요청 시 처리) | PUSH 방식 (이벤트 발생 시 처리) | 데이터 처리 트리거의 차이 |
| **메모리 사용** | 쿼리 실행 동안만 사용 | 상태 저장을 위해 지속적 사용 | ksqlDB는 스트림 처리를 위한 상태 관리 필요 |
| **데이터 액세스** | 저장된 전체 데이터 접근 가능 | 윈도우 기반 데이터 접근 | 처리 가능한 데이터의 범위가 다름 |

- ksqlDB에서 Join은 실시간 데이터 처리를 위한 것이므로 **PULL Query(일회성 조회)로는 Join을 수행할 수 없습니다.**
    - Pull Query는 materialized된 결과를 조회하는 용도이므로, 새로운 데이터 스트림을 생성하는 ksqlDB의 Join 작업과는 개념적으로 충돌합니다.
    - 지속적으로 실행되며 결과를 스트리밍하는 Push Query에서만 Join이 가능합니다.


### Join의 종류와 각 Join에 대한 지원 범위

- **WINDOW** : 스트림-스트림 조인에서만 사용되는 개념입니다.
    - 시간 기반으로 데이터를 그룹화하는 방식으로, 스트림 데이터를 특정 시간 간격으로 분할하여 처리합니다.
    - 테이블 조인에서는 윈도우 개념이 적용되지 않습니다.

- **INNER JOIN** : 두 데이터 소스(스트림-스트림, 테이블-테이블, 스트림-테이블)에서 조인 키가 일치하는 레코드만을 결과로 생성합니다.
    - 모든 조인 유형에서 지원됩니다.

- **LEFT OUTER JOIN** : 왼쪽(FROM 절) 데이터 소스의 모든 레코드를 기준으로 결과를 생성합니다.
    - 테이블-테이블, 스트림-스트림 조인에서는 완전히 지원되며, 스트림-테이블 조인에서도 지원됩니다.
    - JOIN 절의 데이터와 매칭되는 레코드가 없는 경우 NULL 값으로 채워집니다.

- **RIGHT OUTER JOIN** : 오른쪽(JOIN 절) 데이터 소스의 모든 레코드를 기준으로 결과를 생성합니다.
    - 테이블-테이블과 스트림-스트림 조인에서는 지원되지만, 스트림-테이블 조인에서는 지원되지 않습니다.
    - 매칭되는 레코드가 없는 경우 NULL 값으로 채워집니다.

- **FULL OUTER JOIN** : 양쪽 데이터 소스의 모든 레코드를 결과에 포함시킵니다.
    - 테이블-테이블과 스트림-스트림 조인에서는 지원되지만, 스트림-테이블 조인에서는 지원되지 않습니다.
    - 매칭되지 않는 레코드의 경우 해당 필드들이 NULL 값으로 채워집니다.

| Type | WINDOW | INNER | LEFT OUTER | RIGHT OUTER | FULL OUTER |
| --- | --- | --- | --- | --- | --- |
| **Stream-Stream** | O | O | O | O | O |
| **Stream-Table** | X | O | O | X | X |
| **Table-Table** | X | O | O | O | O |

#### 데이터 무결성 보장을 위한 Outer Join 사용

- ksqlDB에서는 **데이터 무결성 보장을 위해 일반적으로 OUTER JOIN 사용을 권장**합니다.
    - 실시간 데이터 처리 환경에서는 예상치 못한 NULL 값이나 누락된 데이터가 발생할 수 있기 때문입니다.
    - INNER JOIN을 사용하면 조인 조건을 만족하지 않는 레코드가 모두 제외되어 중요한 비즈니스 데이터가 누락될 수 있습니다.
    - 반면 OUTER JOIN은 조인 조건을 만족하지 않는 레코드도 유지하면서 관련 필드만 NULL로 처리하므로, 데이터의 완전성을 보장하고 추후 분석이나 처리에 용이합니다.
    - 예를 들어, 주문 시스템에서 사용자 정보가 일시적으로 누락되더라도 주문 자체의 데이터는 보존할 수 있습니다.

#### Stream-Table Right Outer Join

- Stream과 Table의 Right Outer Join은 지원하지 않습니다.
    - Table의 Key를 기준으로 Join을 수행할 때, Stream에는 동일한 Key를 가진 여러 이벤트가 존재할 수 있기 때문입니다.
    - 동일한 Key의 여러 Stream 이벤트가 존재하는 상황에서, Table의 특정 Key에 대해 Stream의 어떤 이벤트를 매칭시켜야 하는지 명확하게 결정할 수 없습니다.

- Full Outer Join 역시 Right Outer Join의 동작을 포함하므로 불가능합니다.

- Left Outer Join은 가능합니다.




---




## ksqlDB Join 제약 조건

- ksqlDB에서는 구조적인 특성 때문에, 몇 가지 조건을 만족해야만 Join이 가능합니다.


### 1. Join Key의 Schema 일치 조건

- **Join을 위한 Key는 반드시 동일한 스키마**를 가져야 합니다.
    - 만약 스키마가 일치하지 않는 경우, `CAST` 함수를 사용하여 타입을 변환할 수 있습니다.

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

- **Join 대상이 되는 스트림/테이블은 반드시 동일한 수의 파티션을 가져야** 합니다.
    - 파티션 수가 다른 경우, repartition을 통해 해결할 수 있습니다.

- repartition을 할 때는 `PARTITION BY` 구문과 `COALESCE` 함수를 모두 사용하는 것이 가장 안전합니다.
    - `PARTITION BY` 절을 생략하면 기존 Stream/Table의 Key를 유지하여 Repartition하게 됩니다.
    - `PARTITION BY`에 Null이 입력되는 경우를 방지하기 위해 `COALESCE` 함수 사용을 권장합니다.
        - `COALESCE` 함수는 여러 입력값 중 NULL이 아닌 첫 번째 값을 반환하는 함수입니다.

#### Repartition 방법 1. 기존 파티션 키 유지

```sql
CREATE STREAM products_rekeyed 
    WITH (PARTITIONS=6) AS 
    SELECT * 
    FROM products;
```

- 기존 스트림/테이블의 파티션 키를 그대로 사용하며, 파티션의 수만 6개로 변경합니다.
- `PARTITION BY` 절을 생략하여 구현합니다.

#### Repartition 방법 2. 새로운 파티션 키 지정 (기본)

```sql
CREATE STREAM products_rekeyed 
    WITH (PARTITIONS=6) AS 
    SELECT * 
    FROM products
    PARTITION BY product_id;
```

- `product_id`를 새로운 파티션 키로 사용하되, `product_id`가 NULL인 경우 임의의 파티션에 할당되어 예측이 어려워집니다.

#### Repartition 방법 3. 새로운 파티션 키 지정 (권장)

```sql
CREATE STREAM products_rekeyed 
    WITH (PARTITIONS=6) AS 
    SELECT * 
    FROM products
    PARTITION BY COALESCE(product_id, 'unknown');
```

- `product_id`를 새로운 파티션 키로 사용하며, NULL 값이 들어올 경우 'unknown'으로 대체하여 일관된 파티셔닝을 보장합니다.


### 3. Partition 분배 전략 일치 조건

- **Join을 수행하는 파티션들은 동일한 파티션 분배 전략을 사용**해야 합니다.
- Join을 수행하는 파티션이 서로 다른 파티션 분배 전략을 사용하면, **동일한 파티션 번호에 서로 다른 Key가 존재할 수 있어 Join이 불가능**합니다.
- Kafka Producer는 기본적으로 Hash 알고리즘을 통해 Key를 파티셔닝하지만, Producer 구현 시 Hash 알고리즘 외에 다른 파티션 분배 전략을 사용할 수도 있어, 서로 다른 전략을 사용하는 상황을 주의해야 합니다.




---




## Join 관계 유형 : Stream-Stream, Stream-Table, Table-Table

1. **Stream-Stream Join** : 이벤트 시퀀스 매칭에 적합하며, 시간 윈도우 지정이 필수입니다.
2. **Stream-Table Join** : 실시간 이벤트 보강(enrichment)에 적합하며, 테이블의 최신 상태만 사용됩니다.
3. **Table-Table Join** : 상태 기반 데이터 조합에 적합하며, 양쪽 테이블의 변경사항이 실시간으로 반영됩니다.

| 비교 항목 | Stream-Stream | Stream-Table | Table-Table |
| --- | --- | --- | --- |
| **지원되는 Join 유형** | INNER, LEFT OUTER, RIGHT OUTER, FULL OUTER | INNER, LEFT OUTER | INNER, LEFT OUTER, RIGHT OUTER, FULL OUTER |
| **결과물 타입** | Stream | Stream | Table |
| **업데이트 동작** | 윈도우 내 매칭되는 새 레코드마다 결과 생성 | 스트림의 새 레코드마다 테이블의 현재 상태와 매칭 | 양쪽 테이블이 변경될 때마다 결과 업데이트 |
| **이전 결과 영향** | 영향 없음, 새 레코드만 추가 | 영향 없음, 새 레코드만 추가 | 기존 결과도 함께 업데이트 |
| **레코드 삭제 처리** | 윈도우 내에서만 영향 | 테이블의 삭제된 레코드는 더 이상 매칭 안됨 | 양쪽 모두 삭제 이벤트 처리 |
| **데이터 정합성** | 시간 기반 정합성 | 키 기반 정합성 | 키 기반 정합성 |
| **Join 키 요구 사항** | 동일한 키로 파티션 필요 | 동일한 키로 파티션 필요 | 동일한 키로 파티션 필요 |
| **시간 윈도우 필요 여부** | 필수 (WITHIN 절) | 불필요 | 불필요 |
| **스케일링 특성** | 파티션 수에 따라 수평 확장 | 파티션 수에 따라 수평 확장 | 양쪽 테이블 파티션 고려 필요 |
| **리소스 요구 사항** | 중간 | 낮음 | 높음 |
| **메모리 사용** | 윈도우 크기에 비례 | 테이블 크기에 비례 | 양쪽 테이블 크기에 비례 |
| **지연 시간 특성** | 윈도우 크기에 영향을 받음 | 상대적으로 빠름 | 양쪽 테이블 크기에 영향을 받음 |
| **일반적 사용 사례** | 실시간 이벤트 상관 관계 분석, 패턴 감지 | 실시간 데이터 보강, 참조 데이터 결합 | 상태 기반 집계, 마스터 데이터 결합 |


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

- **두 개의 스트림을 조인**하는 방식으로, 두 스트림의 이벤트가 지정된 시간 윈도우 내에서 매칭될 때 결과가 출력됩니다.
- 윈도우 크기(WITHIN 절)를 반드시 지정해야 하며, 이는 조인할 레코드들의 최대 시간 차이를 의미합니다.
    - 윈도우 크기 설정이 메모리 사용량에 영향을 미칩니다.
- 왼쪽 스트림의 각 레코드는 오른쪽 스트림의 모든 매칭되는 레코드와 조인됩니다.

#### 예시 : 주문 스트림과 배송 스트림을 조인하여 주문 상태 모니터링

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

- **스트림의 각 레코드를 테이블의 현재 상태와 조인**합니다.
- 테이블의 가장 최신 값만 사용되며, 조인 결과는 스트림으로 출력됩니다.

#### 예시 : 주문 스트림과 사용자 테이블을 조인하여 주문 정보 강화

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

- **두 테이블의 현재 상태를 조인하여 새로운 테이블을 생성**합니다.
- 양쪽 테이블의 변경 사항이 있을 때마다 조인 결과가 업데이트됩니다.
- 결과는 항상 테이블 형태입니다.

#### 예시 : 제품 테이블과 재고 테이블을 조인하여 제품 정보 완성

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

- N-Way Join은 세 개 이상의 스트림이나 테이블을 조인하는 것입니다.

```sql
CREATE STREAM output_stream AS
SELECT *
FROM stream1 s1
    JOIN stream2 s2 WITHIN 1 HOUR ON s1.id = s2.id
    JOIN table1 t1 ON s2.key = t1.key
    JOIN stream3 s3 WITHIN 30 MINUTES ON s1.id = s3.id
EMIT CHANGES;
```

- **조인은 왼쪽에서 오른쪽으로 순차적으로 처리**되며, **각 조인은 이전 조인의 결과를 기반으로 수행**됩니다.
    - 조인 순서에 따라 성능이 크게 달라질 수 있습니다.
    - 하나의 조인이 실패하면 전체 파이프라인에 영향을 미치게 됩니다.
        - 따라서 각 단계별 에러 처리 로직이 필요하며 재시도 전략을 수립해야 합니다.

- **조인이 많아질수록 복잡도가 기하급수적으로 증가**하며, 모니터링과 디버깅이 어려워집니다.
    - 가능한 한 조인 수를 최소화하는 것이 좋습니다.

- 각 조인 단계별 처리 시간, 메모리 사용량, 레코드 처리량, 지연 시간 등을 모니터링해야 합니다.
    - 단계별 조인 결과를 모니터링하고 병목 지점을 식별하여, 필요한 경우 조인을 재구성해야 합니다.
    - N-Way Join은 강력한 기능이지만 신중하게 설계하고 관리해야 하며, 특히 성능과 리소스 사용에 주의를 기울여야 합니다.

- Stream-Stream Join의 경우 각각 독립적인 시간 윈도우 설정이 가능하며, 여러 윈도우가 존재할 경우 메모리 사용량이 증가합니다.
    - 각 윈도우는 독립적으로 관리되며 만료됩니다.


### N-Way Join 구현 방법 1. 점진적 강화 패턴

- 단계적으로 데이터 강화하는 구현 방식입니다.

```sql
CREATE STREAM enriched_stream1 AS
    SELECT * FROM stream1 JOIN stream2 WITHIN 1 HOUR ON stream1.id = stream2.id;

CREATE STREAM enriched_stream2 AS
    SELECT * FROM enriched_stream1 JOIN table1 ON enriched_stream1.key = table1.key;

CREATE STREAM final_stream AS
    SELECT * FROM enriched_stream2 JOIN stream3 WITHIN 30 MINUTES ON enriched_stream2.id = stream3.id;
```


### N-Way Join 구현 방법 2. 단일 쿼리 패턴

- 한 번에 모든 조인을 수행하는 구현 방식입니다.

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

- 가장 선택적인(결과를 많이 필터링하는) 조인을 먼저 수행하고, 큰 데이터셋은 가능한 늦게 조인하는 것이 좋습니다.
- 테이블 조인은 스트림 조인보다 먼저 수행하는 것이 유리합니다.

```sql
-- 메모리 관리를 위해 필요한 컬럼만 선택하여 메모리 사용량을 최소화하기
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

