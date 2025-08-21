---
published: false
---


# COUNT DISTINCT 완전 가이드

- `COUNT DISTINCT`는 중복을 제거한 고유 값의 개수를 계산하는 SQL 집계 함수입니다.
- database에서 중복 data를 제외하고 실제 distinct한 값이 몇 개인지 파악할 때 사용합니다.
- 일반적인 `COUNT(*)`나 `COUNT(column)`과는 다른 방식으로 동작하며, 성능과 결과에서 중요한 차이점이 있습니다.


---


## 기본 문법과 사용법

- `COUNT DISTINCT`의 기본 문법은 `COUNT(DISTINCT column_name)` 형태입니다.
- 단일 column 또는 여러 column의 조합에 대해 고유 값 개수를 계산할 수 있습니다.
- NULL 값은 계산에서 자동으로 제외되며, 이는 `COUNT DISTINCT`의 중요한 특징 중 하나입니다.

```sql
-- 단일 column의 고유 값 개수
SELECT COUNT(DISTINCT customer_id) FROM orders;

-- 여러 column 조합의 고유 값 개수
SELECT COUNT(DISTINCT customer_id, product_id) FROM orders;
```


---


## COUNT DISTINCT와 다른 COUNT 함수 비교

- 각 COUNT 함수는 서로 다른 목적과 결과를 가지며, 상황에 맞는 선택이 중요합니다.
- `COUNT DISTINCT`만이 중복을 제거하고 고유 값의 개수를 반환합니다.


### COUNT(*) vs COUNT(column) vs COUNT(DISTINCT column)

| 함수 | 설명 | NULL 처리 | 중복 처리 |
| --- | --- | --- | --- |
| COUNT(*) | 모든 row 개수 | 포함 | 포함 |
| COUNT(column) | 해당 column의 non-NULL 값 개수 | 제외 | 포함 |
| COUNT(DISTINCT column) | 해당 column의 고유한 non-NULL 값 개수 | 제외 | 제외 |

```sql
-- 예시 data로 비교
-- orders table: customer_id = [1, 1, 2, NULL, 3, 2]

SELECT COUNT(*) FROM orders;                    -- 결과: 6
SELECT COUNT(customer_id) FROM orders;          -- 결과: 5 (NULL 제외)
SELECT COUNT(DISTINCT customer_id) FROM orders; -- 결과: 3 (중복과 NULL 제외)
```


---


## 실제 사용 사례

- `COUNT DISTINCT`는 business logic에서 고유한 entity 개수를 파악할 때 필수적입니다.
- data 분석과 reporting에서 중복을 제거한 정확한 통계를 얻기 위해 사용됩니다.


### 고객 분석

- 특정 기간 동안 실제 구매한 고유 고객 수를 파악할 때 사용합니다.
- 주문 건수가 아닌 실제 고객 수를 알아야 할 때 필수적입니다.

```sql
-- 지난 달 실제 구매한 고객 수
SELECT COUNT(DISTINCT customer_id) 
FROM orders 
WHERE order_date >= '2024-07-01' AND order_date < '2024-08-01';

-- 지역별 고유 고객 수
SELECT region, COUNT(DISTINCT customer_id) as unique_customers
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY region;
```


### 상품 분석

- category별로 실제 판매된 상품 종류의 개수를 파악합니다.
- inventory 관리와 상품 전략 수립에 활용됩니다.

```sql
-- category별 판매된 상품 종류 수
SELECT category, COUNT(DISTINCT product_id) as product_variety
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY category;
```


### 접속 분석

- web service에서 실제 방문자 수를 계산할 때 사용합니다.
- page view 수가 아닌 unique visitor 수를 알 수 있습니다.

```sql
-- 일별 순 방문자 수
SELECT DATE(access_time) as visit_date, 
       COUNT(DISTINCT user_id) as unique_visitors
FROM access_logs
GROUP BY DATE(access_time);
```


---


## GROUP BY와 COUNT DISTINCT 조합 비교

- `GROUP BY`와 `COUNT DISTINCT`는 서로 다른 방식으로 중복을 처리합니다.
- 같은 결과를 얻을 수 있지만 성능과 NULL 처리에서 차이가 있습니다.


### 동일한 결과를 얻는 두 가지 방법

```sql
-- 방법 1: COUNT DISTINCT 사용
SELECT COUNT(DISTINCT customer_id, product_id) as unique_combinations
FROM orders;

-- 방법 2: GROUP BY 후 COUNT(*) 사용
SELECT COUNT(*) as unique_combinations
FROM (
    SELECT customer_id, product_id
    FROM orders
    GROUP BY customer_id, product_id
) grouped_data;
```


### NULL 값 처리의 차이점

- `COUNT DISTINCT`는 NULL 값이 포함된 조합을 완전히 제외합니다.
- `GROUP BY`는 NULL 값도 하나의 고유한 group으로 처리합니다.

```sql
-- test data: (customer_id, product_id) = [(1,100), (1,NULL), (NULL,100), (1,100)]

-- COUNT DISTINCT 결과: 2개 (NULL 포함 조합 제외)
SELECT COUNT(DISTINCT customer_id, product_id) FROM test_table;

-- GROUP BY 결과: 3개 (NULL 포함 조합도 계산)
SELECT COUNT(*) FROM (
    SELECT customer_id, product_id 
    FROM test_table 
    GROUP BY customer_id, product_id
) grouped;
```


---


## 성능 고려사항

- `COUNT DISTINCT`는 내부적으로 sorting이나 hashing을 수행하므로 성능에 영향을 줄 수 있습니다.
- 대용량 data에서는 성능 최적화 전략이 필요합니다.


### 성능 영향 요소

- **data 크기**가 클수록 계산 시간이 증가합니다.
- **distinct 값의 개수**가 많을수록 memory 사용량이 증가합니다.
- **여러 column 조합**을 사용할 때 성능 저하가 더 클 수 있습니다.
- **index 활용**이 제한적이므로 full table scan이 발생할 수 있습니다.


### 성능 최적화 방법

- **필요한 경우에만** `COUNT DISTINCT`를 사용합니다.
- **WHERE 절**로 data 범위를 먼저 제한합니다.
- **적절한 index**를 설정하여 data 접근 속도를 향상시킵니다.
- **대용량 data**에서는 sampling 기법을 고려합니다.

```sql
-- 최적화 예시: 조건을 먼저 적용하여 범위 제한
SELECT COUNT(DISTINCT customer_id)
FROM orders
WHERE order_date >= '2024-01-01'  -- 범위 제한
  AND status = 'completed';       -- 추가 조건
```


---


## 주의사항과 제한사항

- `COUNT DISTINCT`를 사용할 때 알아야 할 중요한 제약사항들이 있습니다.
- 특히 database system별로 지원하는 기능과 성능이 다를 수 있습니다.


### NULL 값 처리

- **단일 column**에서 NULL 값은 계산에서 제외됩니다.
- **여러 column 조합**에서 하나라도 NULL이면 전체 조합이 제외됩니다.
- NULL 값을 포함하여 계산하려면 `COALESCE` 함수를 사용합니다.

```sql
-- NULL을 특정 값으로 대체하여 계산
SELECT COUNT(DISTINCT COALESCE(customer_id, 0), COALESCE(product_id, 0))
FROM orders;
```


### Database별 제한사항

- **MySQL**에서는 여러 column의 `COUNT DISTINCT`를 지원하지 않는 version이 있습니다.
- **PostgreSQL**은 모든 `COUNT DISTINCT` 기능을 완전히 지원합니다.
- **Oracle**에서는 성능 최적화를 위한 hint를 활용할 수 있습니다.
- **SQL Server**는 기본적으로 모든 기능을 지원하지만 성능 tuning이 중요합니다.


### 메모리 사용량

- **높은 cardinality**를 가진 column에서는 memory 사용량이 급격히 증가할 수 있습니다.
- **system 자원**을 고려하여 적절한 batch 처리나 분할 query를 사용합니다.
- **monitoring**을 통해 query 실행 중 memory 사용량을 확인합니다.


---


## 대안과 고급 활용법

- `COUNT DISTINCT`의 제약사항을 해결하거나 성능을 개선하는 다양한 방법이 있습니다.
- 상황에 따라 더 효율적인 대안을 선택할 수 있습니다.


### Approximate COUNT DISTINCT

- **대용량 data**에서 정확도를 약간 포기하고 성능을 크게 향상시킬 수 있습니다.
- **HyperLogLog algorithm**을 사용하여 근사치를 계산합니다.

```sql
-- PostgreSQL의 approximate count distinct
SELECT APPROX_COUNT_DISTINCT(customer_id) FROM large_table;

-- SQL Server의 approximate count distinct
SELECT APPROX_COUNT_DISTINCT(customer_id) FROM large_table;
```


### Window Function 활용

- **복잡한 분석**에서 `COUNT DISTINCT`와 window function을 조합할 수 있습니다.
- **누적 고유 값 계산**이나 **이동 평균** 등에 활용됩니다.

```sql
-- 일별 누적 고유 고객 수
SELECT order_date,
       COUNT(DISTINCT customer_id) OVER (
           ORDER BY order_date 
           ROWS UNBOUNDED PRECEDING
       ) as cumulative_unique_customers
FROM orders;
```


### 사전 집계 table 활용

- **자주 사용되는 COUNT DISTINCT 결과**를 미리 계산하여 별도 table에 저장합니다.
- **실시간 성능**이 중요한 application에서 효과적입니다.

```sql
-- 일별 고유 고객 수를 사전 집계
CREATE TABLE daily_unique_customers AS
SELECT order_date, COUNT(DISTINCT customer_id) as unique_customers
FROM orders
GROUP BY order_date;

-- 빠른 조회 가능
SELECT * FROM daily_unique_customers WHERE order_date = '2024-08-01';
```


---


## 실무 Best Practice

- `COUNT DISTINCT`를 효과적으로 사용하기 위한 실무 지침을 제시합니다.
- 성능과 정확성을 모두 고려한 최적의 활용 방법을 설명합니다.


### Query 작성 시 고려사항

- **명확한 목적**을 가지고 `COUNT DISTINCT`를 사용합니다.
- **성능 test**를 통해 실행 계획과 소요 시간을 확인합니다.
- **data 특성**을 파악하여 적절한 최적화 방법을 선택합니다.
- **NULL 값 처리**를 명시적으로 결정합니다.


### 모니터링과 최적화

- **실행 계획 분석**을 통해 병목 지점을 파악합니다.
- **index 사용률**을 확인하고 필요시 추가 index를 생성합니다.
- **memory 사용량**과 **CPU 사용률**을 monitoring합니다.
- **query 실행 시간**의 변화를 주기적으로 추적합니다.


### 문서화와 유지보수

- **business logic**에서 요구하는 정확한 요구사항을 명시합니다.
- **NULL 값 처리 방식**을 명확히 문서화합니다.
- **성능 기준**과 **허용 가능한 실행 시간**을 정의합니다.
- **대안 방법**과 **fallback 전략**을 준비합니다.


---


## Reference

- <https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html>
- <https://www.postgresql.org/docs/current/functions-aggregate.html>
- <https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/COUNT.html>

