---
layout: skill
title: ksqlDB의 Join (스트림-스트림, 스트림-테이블, 테이블-테이블)
date: 2025-01-07
---




## Join : 실시간 데이터를 실시간으로 결합하기

- ksqlDB는 **스트림-스트림, 스트림-테이블, 테이블-테이블 간의 JOIN 기능**을 제공하고 있습니다.




```txt
(실시간 이벤트) + (문맥 정보) = 의미있는 비즈니스 데이터
```

ksqlDB의 JOIN은 실시간으로 흐르는 원시 이벤트 데이터(raw event data)에 문맥 정보(contextual data)를 결합하는 메커니즘입니다. 

스트리밍 시스템에서 흐르는 이벤트 데이터는 보통 최소한의 필수 정보만을 포함합니다. 이는 데이터의 경량화와 처리 효율성을 위해서입니다. 하지만 이러한 원시 데이터만으로는 실질적인 비즈니스 의사결정이나 분석에 필요한 충분한 정보를 갖지 못합니다.

이때 JOIN을 통해 이 원시 이벤트에 부가적인 문맥 정보를 실시간으로 보강할 수 있습니다. 여기서 "실시간"이 중요한데, 기존 배치 처리 방식과 달리 이벤트가 발생하는 즉시 필요한 정보가 결합됩니다.

ksqlDB JOIN의 핵심은 "상태 관리(state management)"입니다. 스트리밍 시스템에서는 지속적으로 데이터가 흐르기 때문에, JOIN에 필요한 데이터의 상태를 계속해서 추적하고 관리해야 합니다. ksqlDB는 이러한 상태 관리를 자동으로 처리하며, 이를 통해 개발자는 복잡한 상태 관리 로직을 직접 구현할 필요 없이 비즈니스 로직에 집중할 수 있습니다.

결과적으로 ksqlDB의 JOIN은 단순한 데이터 결합 이상의 의미를 가집니다. 이는 실시간 스트리밍 환경에서 원시 데이터를 의미있는 비즈니스 정보로 변환하는 실시간 데이터 보강(real-time data enrichment) 메커니즘이라고 할 수 있습니다.





| 비교 항목 | STREAM-STREAM | STREAM-TABLE | TABLE-TABLE |
| --- | --- | --- | --- |
| **지원되는 JOIN 유형** | INNER, LEFT OUTER | INNER, LEFT OUTER | INNER, LEFT OUTER, FULL OUTER |
| **결과물 타입** | STREAM | STREAM | TABLE |
| **업데이트 동작** | 윈도우 내 매칭되는 새 레코드마다 결과 생성 | 스트림의 새 레코드마다 테이블의 현재 상태와 매칭 | 양쪽 테이블이 변경될 때마다 결과 업데이트 |
| **이전 결과 영향** | 영향 없음, 새 레코드만 추가 | 영향 없음, 새 레코드만 추가 | 기존 결과도 함께 업데이트 |
| **레코드 삭제 처리** | 윈도우 내에서만 영향 | 테이블의 삭제된 레코드는 더 이상 매칭 안됨 | 양쪽 모두 삭제 이벤트 처리 |
| **데이터 정합성** | 시간 기반 정합성 | 키 기반 정합성 | 키 기반 정합성 |
| **JOIN 키 요구 사항** | 동일한 키로 파티션 필요 | 동일한 키로 파티션 필요 | 동일한 키로 파티션 필요 |
| **시간 윈도우 필요 여부** | 필수 (WITHIN 절) | 불필요 | 불필요 |
| **스케일링 특성** | 파티션 수에 따라 수평 확장 | 파티션 수에 따라 수평 확장 | 양쪽 테이블 파티션 고려 필요 |
| **리소스 요구 사항** | 중간 | 낮음 | 높음 |
| **메모리 사용** | 윈도우 크기에 비례 | 테이블 크기에 비례 | 양쪽 테이블 크기에 비례 |
| **지연 시간 특성** | 윈도우 크기에 영향을 받음 | 상대적으로 빠름 | 양쪽 테이블 크기에 영향을 받음 |
| **일반적 사용 사례** | 실시간 이벤트 상관 관계 분석, 패턴 감지 | 실시간 데이터 보강, 참조 데이터 결합 | 상태 기반 집계, 마스터 데이터 결합 |

```sql
-- Stream-Stream Join
CREATE STREAM joined_stream AS
SELECT *
FROM stream1 s1
    INNER JOIN stream2 s2 
    WITHIN 1 HOURS 
    ON s1.id = s2.id;

-- Stream-Table Join
CREATE STREAM enriched_stream AS
SELECT *
FROM stream1 s
    LEFT JOIN table1 t 
    ON s.id = t.id;

-- Table-Table Join
CREATE TABLE joined_table AS
SELECT *
FROM table1 t1
    INNER JOIN table2 t2 
    ON t1.id = t2.id;

-- Multi Stream Join
CREATE STREAM multi_joined AS
SELECT *
FROM stream1 s1
    INNER JOIN stream2 s2 
    WITHIN 2 HOURS 
    ON s1.id = s2.id
    LEFT JOIN table1 t 
    ON s1.id = t.id;

-- Supported Join Types
-- INNER JOIN
-- LEFT JOIN
-- LEFT OUTER JOIN
-- FULL JOIN (Tables only)
```

- ksqlDB의 JOIN은 기능적으로는 RDBMS의 JOIN과 유사하지만, 서로 완전히 다른 개념입니다.
    - **ksqlDB의 JOIN은 데이터 스트리밍 환경에서 실시간 데이터 처리와 결합을 위해 설계된 개념**으로, 전통적인 RDBMS의 정적 데이터 결합과는 다른 패러다임을 가지고 있습니다.

| 비교 항목 | RDBMS | ksqlDB | 설명 |
| --- | --- | --- | --- |
| **JOIN의 목적** | 서로 다른 테이블의 데이터를 조합하여 원하는 결과셋 도출 | Upstream 데이터를 특정 기준으로 합쳐 새로운 Downstream 생성 | RDBMS는 저장된 데이터의 조회가, ksqlDB는 데이터 파이프라인 구성이 주 목적 |
| **데이터 구조** | Table | Stream, Table | ksqlDB는 실시간 이벤트 스트림을 처리하기 위해 두 가지 구조 제공 |
| **데이터 흐름** | 정적 데이터 간 결합 | Upstream -> JOIN -> Downstream의 단방향 흐름 | ksqlDB는 데이터의 흐름을 전제로 한 단방향 처리 |
| **데이터 특성** | 정적 데이터 | 동적 데이터(실시간 스트림) | ksqlDB는 시간에 따라 계속 변화하는 데이터 처리 |
| **JOIN 동작 시점** | 쿼리 실행 시점 | 데이터 유입 시점 | 실행 시점의 차이가 결과 생성 방식의 차이를 만듦 |
| **JOIN 지속성** | 일회성 실행 | 지속적 실행 | ksqlDB는 스트림 처리를 위해 지속적으로 실행 |
| **JOIN 결과** | 정적 결과셋 반환 | 지속적인 스트림 생성 | 결과물의 형태와 생성 방식이 다름 |
| **처리 방식** | PULL 방식 (요청 시 처리) | PUSH 방식 (이벤트 발생 시 처리) | 데이터 처리 트리거의 차이 |
| **메모리 사용** | 쿼리 실행 동안만 사용 | 상태 저장을 위해 지속적 사용 | ksqlDB는 스트림 처리를 위한 상태 관리 필요 |
| **데이터 액세스** | 저장된 전체 데이터 접근 가능 | 윈도우 기반 데이터 접근 | 처리 가능한 데이터의 범위가 다름 |

- ksqlDB에서 JOIN은 실시간 데이터 처리를 위한 것이므로 **PULL Query(일회성 조회)로는 JOIN을 수행할 수 없습니다.**
    - Pull Query는 materialized된 결과를 조회하는 용도이므로, 새로운 데이터 스트림을 생성하는 ksqlDB의 JOIN 작업과는 개념적으로 충돌합니다.
    - 지속적으로 실행되며 결과를 스트리밍하는 PUSH Query에서만 JOIN이 가능합니다.



### JOIN의 종류 : INNER JOIN, LEFT JOIN, FULL JOIN

- INNER JOIN: 양쪽 Record의 키가 같을 때 사용할 수 있는 JOIN
_ LEFT JOIN: LEFT Record를 기준으로 downStream을 형성한다. 즉 FROM 절의 record가 들어올 때 downStream record를 생성하며, join 할 대상이 없는 경우 null이 된다.
- FULL JOIN: 양쪽 모두의 Record Stream을 받아서 downStream을 형성한다. 또한 JOIN 할 대상이 없다면 null이 된다.



### 각 Join의 지원 범위

|  | Window | Inner | Left Outer | Right Outer | Full Outer |
| --- | --- | --- | --- | --- | --- |
| **Stream - Stream** | O | O | O | O | O |
| **Table - Table** | X | O | O | O | O |
| **Stream - Table** | X | O | O | X | X |

- Stream과 Table의 Right Outer Join은 지원하지 않습니다.
    - Table의 Key를 기준으로 Join을 수행할 때, Stream에는 동일한 Key를 가진 여러 이벤트가 존재할 수 있기 때문입니다.
    - 동일한 Key의 여러 Stream 이벤트가 존재하는 상황에서, Table의 특정 Key에 대해 Stream의 어떤 이벤트를 매칭시켜야 하는지 명확하게 결정할 수 없습니다.





---





## ksqlDB Join 제약 조건

- ksqlDB에서는 구조적인 특성 때문에, 몇 가지 조건을 만족해야 Join이 가능합니다.


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


### 2. 파티션 수 일치 조건

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


### 3. 파티션 분배 전략 일치 조건

- **Join을 수행하는 파티션들은 동일한 파티션 분배 전략을 사용**해야 합니다.

- Join을 수행하는 파티션이 서로 다른 파티션 분배 전략을 사용하면, **동일한 파티션 번호에 서로 다른 Key가 존재할 수 있어 Join이 불가능**합니다.
    - Kafka Producer는 기본적으로 Hash 알고리즘을 통해 Key를 파티셔닝하지만, Producer 구현 시 Hash 알고리즘 외에 다른 파티션 분배 전략을 사용할 수도 있습니다.




---




## Stream-Stream, Stream-Table, Table-Table



ksqlDB의 JOIN은 스트림과 테이블을 결합하는 강력한 기능을 제공합니다. 다음과 같은 주요 JOIN 유형들이 있습니다:
- OUTER JOIN의 경우 NULL 값 처리에 유의해야 함

1. 스트림-스트림 JOIN (Stream-Stream Join)
- 두 이벤트 스트림을 조인할 때 사용
- 조인 윈도우를 반드시 지정해야 함 (WITHIN 절 사용)
- 스트림-스트림 JOIN의 경우 메모리 사용량에 주의해야 함
- 예시:
```sql
CREATE STREAM orders_enriched AS
  SELECT o.orderid, c.customername, o.itemid
  FROM orders_stream o
  JOIN customers_stream c 
  WITHIN 1 HOURS 
  ON o.customerid = c.customerid;
```

2. 스트림-테이블 JOIN (Stream-Table Join)
- 스트림의 각 이벤트를 테이블의 현재 상태와 조인
- 윈도우 지정이 필요없음
- 예시:
```sql
CREATE STREAM orders_with_customer_info AS
  SELECT o.orderid, c.customer_name, o.itemid
  FROM orders_stream o
  JOIN customers_table c
  ON o.customerid = c.customerid;
```

3. 테이블-테이블 JOIN (Table-Table Join)
- 두 테이블의 현재 상태를 조인
- 양쪽 테이블의 변경사항이 결과에 반영됨
- 예시:
```sql
CREATE TABLE customer_orders AS
  SELECT c.customerid, c.name, count(*) AS order_count
  FROM customers_table c
  JOIN orders_table o
  ON c.customerid = o.customerid
  GROUP BY c.customerid, c.name;
```






### Stream-Stream



### Stream-Table



### Table-Table







---




## N-Way Joins

```sql
CREATE STREAM joined AS 
  SELECT * 
  FROM A
    JOIN B ON A.id = B.product_id
    JOIN C ON A.id = C.purchased_id;
```

- 최신 버전 ksqlDB는 여러 Stream / Table의 JOIN을 지원한다.
- 제약사항으로 JOIN 구성 중 STREAM, TABLE 모두 있다면 FULL JOIN은 지원하지 못한다.











---




## Reference

- <https://ojt90902.tistory.com/1103>














