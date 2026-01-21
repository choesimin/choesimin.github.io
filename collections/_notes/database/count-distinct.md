---
layout: note
permalink: /402
title: COUNT DISTINCT - 중복을 제거한 고유 값 개수 세기
description: COUNT DISTINCT는 중복을 제거한 고유 값의 개수를 반환하는 SQL 집계 함수로, NULL을 제외하고 계산하며 대용량 data에서는 성능 최적화가 필요합니다.
date: 2026-01-21
---


## COUNT DISTINCT

- `COUNT(DISTINCT column)`은 **중복을 제거한 고유 값의 개수**를 반환합니다.
    - `COUNT(*)`는 모든 행을, `COUNT(column)`은 NULL이 아닌 값을 세지만, 중복은 포함합니다.
    - `COUNT DISTINCT`만 중복을 제거하고 고유한 값만 셉니다.

```sql
-- orders table: customer_id = [1, 1, 2, NULL, 3, 2]

SELECT COUNT(*) FROM orders;                    -- 6 (모든 행)
SELECT COUNT(customer_id) FROM orders;          -- 5 (NULL 제외)
SELECT COUNT(DISTINCT customer_id) FROM orders; -- 3 (중복과 NULL 제외)
```


### COUNT 함수 비교

- `COUNT(*)`와 `COUNT(column)`, `COUNT(DISTINCT column)`은 NULL과 중복 처리 방식이 다릅니다.

| 함수 | NULL 처리 | 중복 처리 | 용도 |
| --- | --- | --- | --- |
| `COUNT(*)` | 포함 | 포함 | 전체 행 수 |
| `COUNT(column)` | 제외 | 포함 | 값이 있는 행 수 |
| `COUNT(DISTINCT column)` | 제외 | 제외 | 고유 값 수 |


---


## 기본 문법

- `COUNT(DISTINCT column_name)` 형식으로 사용합니다.
    - 단일 column 또는 여러 column의 조합에 대해 고유 값 개수를 계산합니다.
    - NULL 값은 계산에서 자동으로 제외됩니다.


### 단일 Column

- 하나의 column에서 고유 값 개수를 셉니다.

```sql
SELECT COUNT(DISTINCT customer_id) FROM orders;
```


### 여러 Column 조합

- 여러 column의 조합을 하나의 고유 값으로 취급합니다.
    - MySQL에서는 `COUNT(DISTINCT col1, col2)` 형식을 지원합니다.
    - 다른 DBMS에서는 `CONCAT`이나 subquery를 사용해야 할 수 있습니다.

```sql
-- MySQL: 고객-상품 조합의 고유 개수
SELECT COUNT(DISTINCT customer_id, product_id) FROM orders;

-- 표준 SQL: subquery 사용
SELECT COUNT(*) FROM (
    SELECT DISTINCT customer_id, product_id FROM orders
) t;
```


---


## 사용 사례

- business logic에서 고유한 entity 개수를 파악할 때 사용합니다.


### 고객 분석

- 주문 건수가 아닌 실제 구매 고객 수를 파악합니다.

```sql
-- 지난 달 실제 구매한 고객 수
SELECT COUNT(DISTINCT customer_id)
FROM orders
WHERE order_date >= '2024-07-01'
  AND order_date < '2024-08-01';

-- 지역별 고유 고객 수
SELECT region, COUNT(DISTINCT customer_id) AS unique_customers
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY region;
```


### 접속 분석

- page view가 아닌 unique visitor 수를 계산합니다.

```sql
-- 일별 순 방문자 수
SELECT DATE(access_time) AS visit_date,
       COUNT(DISTINCT user_id) AS unique_visitors
FROM access_logs
GROUP BY DATE(access_time);
```


---


## NULL 값 처리

- `COUNT DISTINCT`는 NULL 값을 항상 제외합니다.
    - 단일 column에서 NULL은 count되지 않습니다.
    - 여러 column 조합에서 하나라도 NULL이면 해당 조합 전체가 제외됩니다.


### NULL 포함이 필요한 경우

- `COALESCE`로 NULL을 대체 값으로 변환합니다.

```sql
-- NULL을 0으로 대체하여 계산
SELECT COUNT(DISTINCT COALESCE(customer_id, 0)) FROM orders;

-- 여러 column에서 NULL 대체
SELECT COUNT(DISTINCT
    COALESCE(customer_id, 0),
    COALESCE(product_id, 0)
) FROM orders;
```


### GROUP BY와의 차이

- `GROUP BY`는 NULL을 하나의 group으로 처리하지만, `COUNT DISTINCT`는 NULL을 제외합니다.

```sql
-- data: (customer_id, product_id) = [(1,100), (1,NULL), (NULL,100), (1,100)]

-- COUNT DISTINCT: 1개 (NULL 포함 조합 모두 제외, (1,100)만 count)
SELECT COUNT(DISTINCT customer_id, product_id) FROM test_table;

-- GROUP BY: 3개 (NULL 조합도 별도 group으로 count)
SELECT COUNT(*) FROM (
    SELECT customer_id, product_id
    FROM test_table
    GROUP BY customer_id, product_id
) t;
```


---


## 성능 고려 사항

- `COUNT DISTINCT`는 내부적으로 정렬이나 hashing을 수행하므로 대용량 data에서 성능 저하가 발생합니다.


### 성능 영향 요소

- **data 크기** : 전체 행 수가 많을수록 처리 시간이 증가합니다.
- **cardinality** : 고유 값의 개수가 많을수록 memory 사용량이 증가합니다.
- **column 수** : 여러 column 조합은 단일 column보다 부하가 큽니다.
- **index 활용** : `COUNT DISTINCT`는 index를 효율적으로 활용하기 어렵습니다.


### 최적화 방법

- `WHERE` 절로 data 범위를 먼저 제한합니다.

```sql
-- 조건을 먼저 적용하여 범위 제한
SELECT COUNT(DISTINCT customer_id)
FROM orders
WHERE order_date >= '2024-01-01'
  AND status = 'completed';
```

- covering index를 활용합니다.
    - `COUNT DISTINCT`에 사용되는 column만 포함하는 index를 생성합니다.

```sql
CREATE INDEX idx_orders_customer ON orders(customer_id);
```


---


## 대안

- 정확도를 약간 포기하거나 사전 계산을 통해 성능을 개선합니다.


### Approximate COUNT DISTINCT

- HyperLogLog algorithm을 사용하여 근사치를 빠르게 계산합니다.
    - 정확도는 약 97~99% 수준이지만 성능이 크게 향상됩니다.
    - PostgreSQL, SQL Server, BigQuery 등에서 지원합니다.

```sql
-- PostgreSQL 9.6+
SELECT APPROX_COUNT_DISTINCT(customer_id) FROM large_table;

-- BigQuery
SELECT APPROX_COUNT_DISTINCT(customer_id) FROM large_table;
```


### 사전 집계 Table

- 자주 조회하는 `COUNT DISTINCT` 결과를 미리 계산하여 저장합니다.

```sql
-- 일별 고유 고객 수를 사전 집계
CREATE TABLE daily_unique_customers AS
SELECT order_date, COUNT(DISTINCT customer_id) AS unique_customers
FROM orders
GROUP BY order_date;

-- 빠른 조회
SELECT unique_customers
FROM daily_unique_customers
WHERE order_date = '2024-08-01';
```


### Bitmap Index

- bitmap index는 각 고유 값에 대해 bit vector를 저장하여 `COUNT DISTINCT`를 빠르게 계산합니다.
    - 각 bit가 해당 행의 존재 여부를 나타내므로, bit 연산으로 고유 값 개수를 계산합니다.
    - B-tree index보다 저장 공간이 작고 집계 연산에 유리합니다.

- cardinality가 낮은 column(고유 값이 적은 column)에서 효과적입니다.
    - status(active, inactive, pending), category, gender 등 값의 종류가 제한적인 column에 적합합니다.
    - 고유 값이 많으면 bit vector 크기가 커져 오히려 비효율적입니다.

- Oracle, PostgreSQL 등에서 지원하며, MySQL은 bitmap index를 지원하지 않습니다.


---


## DBMS별 차이

- 각 DBMS는 `COUNT DISTINCT` 구현과 최적화 방식이 다릅니다.

| DBMS | 여러 column 지원 | Approximate 함수 | 비고 |
| --- | --- | --- | --- |
| MySQL | `COUNT(DISTINCT a, b)` | 미지원 | 8.0부터 성능 개선 |
| PostgreSQL | subquery 필요 | `APPROX_COUNT_DISTINCT` | 9.6+ |
| Oracle | subquery 필요 | `APPROX_COUNT_DISTINCT` | 12c+ |
| SQL Server | subquery 필요 | `APPROX_COUNT_DISTINCT` | 2019+ |
| BigQuery | `COUNT(DISTINCT a, b)` | `APPROX_COUNT_DISTINCT` | 기본 지원 |


---


## Reference

- <https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html>
- <https://www.postgresql.org/docs/current/functions-aggregate.html>
- <https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COUNT.html>

