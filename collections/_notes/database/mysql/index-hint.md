---
layout: note
permalink: /377
title: MySQL Index Hint - index 사용 최적화하기
description: MySQL Index Hint는 query optimizer가 잘못된 실행 계획을 수립할 때 개발자가 USE INDEX, FORCE INDEX, IGNORE INDEX 등을 사용하여 특정 index 사용을 제안하거나 강제할 수 있는 성능 최적화 기능입니다.
date: 2025-09-11
---


## MySQL Index Hint

- MySQL의 index hint는 query optimizer에게 특정 index 사용 방식을 지시하는 기능입니다.
- query optimizer가 최적이 아닌 실행 계획을 수립할 때, 개발자가 직접 index 사용을 제어할 수 있습니다.
- 성능 최적화가 필요한 상황에서 query 실행 계획을 세밀하게 조정하는 도구로 활용됩니다.


---


## Index Hint가 필요한 이유

- MySQL optimizer는 통계 정보를 기반으로 최적의 실행 계획을 수립하지만, 완벽하지 않은 상황들이 존재합니다.


### 부정확한 통계 정보

- table의 통계 정보가 오래되었거나 부정확한 경우, optimizer가 잘못된 판단을 내릴 수 있습니다.
- data 분포가 균등하지 않은 경우, cardinality 추정이 부정확해질 수 있습니다.
- 통계 정보 update가 지연되어 실제 data 상태와 차이가 발생하는 경우가 있습니다.


### 복잡한 Query 최적화의 한계

- 여러 table을 join하는 복잡한 query에서 optimizer가 최적이 아닌 join 순서를 선택할 수 있습니다.
- 복합 조건이 포함된 WHERE 절에서 가장 selective한 index를 찾지 못하는 경우가 있습니다.
- subquery나 derived table이 포함된 복잡한 구조에서 최적화에 실패할 수 있습니다.


### 특수한 Business Logic 고려

- application의 특정 business logic이나 data 접근 pattern을 optimizer가 알 수 없는 경우가 있습니다.
- 특정 시점에만 유효한 최적화가 필요한 경우, 일반적인 통계로는 판단하기 어렵습니다.
- 실시간 성능이 중요한 query에서 안정적인 실행 계획이 필요한 경우가 있습니다.


### Version별 Optimizer 차이

- MySQL version upgrade 시 optimizer 동작이 변경되어 기존 성능이 저하될 수 있습니다.
- 새로운 optimizer feature가 특정 환경에서 예상과 다르게 동작할 수 있습니다.
- legacy system에서 검증된 성능을 유지해야 하는 경우가 있습니다.


---


## Index Hint 기본 종류

- MySQL은 세 가지 주요 index hint type을 제공합니다.
- 각 hint는 optimizer에게 다른 수준의 지시를 전달합니다.


### USE INDEX

- 특정 index 사용을 optimizer에게 **제안**하는 hint입니다.
- optimizer는 해당 index를 우선적으로 고려하지만, 더 나은 선택지가 있다면 다른 방법을 선택할 수 있습니다.

```sql
SELECT * FROM users USE INDEX (idx_name) WHERE name = 'John';
```

- `idx_name` index 사용을 권장하되, optimizer 판단에 따라 다른 index도 사용 가능합니다.


### FORCE INDEX

- 특정 index 사용을 optimizer에게 **강제**하는 hint입니다.
- optimizer는 반드시 지정된 index를 사용해야 하며, 다른 선택지를 고려하지 않습니다.

```sql
SELECT * FROM users FORCE INDEX (idx_email) WHERE email = 'john@example.com';
```

- `idx_email` index를 반드시 사용하도록 강제합니다.
- full table scan보다 성능이 떨어지더라도 해당 index를 사용합니다.


### IGNORE INDEX

- 특정 index 사용을 optimizer에게 **금지**하는 hint입니다.
- 해당 index는 query 실행 시 고려 대상에서 완전히 제외됩니다.

```sql
SELECT * FROM users IGNORE INDEX (idx_age) WHERE age > 25;
```

- `idx_age` index를 사용하지 않고 다른 방법으로 query를 실행합니다.


---


## 적용 범위 지정

- Index hint는 query의 특정 부분에만 적용되도록 범위를 제한할 수 있습니다.
- `FOR` keyword를 사용하여 join, 정렬, grouping 등 특정 작업에만 hint를 적용합니다.


### FOR JOIN

- join 작업에서만 특정 index를 사용하도록 지시합니다.

```sql
SELECT * FROM users USE INDEX FOR JOIN (idx_dept_id) 
JOIN departments ON users.dept_id = departments.id;
```

- join 조건에서만 `idx_dept_id` index 사용을 권장합니다.
- WHERE 절이나 ORDER BY 절에서는 다른 index를 자유롭게 사용할 수 있습니다.


### FOR ORDER BY

- 정렬 작업에서만 특정 index를 사용하도록 지시합니다.

```sql
SELECT * FROM users USE INDEX FOR ORDER BY (idx_created_at) 
WHERE status = 'active' ORDER BY created_at;
```

- ORDER BY 절에서만 `idx_created_at` index 사용을 권장합니다.


### FOR GROUP BY

- group화 작업에서만 특정 index를 사용하도록 지시합니다.

```sql
SELECT * FROM users 
USE INDEX FOR GROUP BY (idx_department) 
GROUP BY department;
```

- GROUP BY 절에서만 `idx_department` index 사용을 권장합니다.


---


## 실제 사용 예시

- Index hint는 특정 성능 문제를 해결하기 위한 상황에서 활용됩니다.


### 복합 Index 활용 최적화

```sql
-- 복합 index (name, age, email)가 있을 때
SELECT * FROM users 
USE INDEX (idx_name_age_email) 
WHERE name = 'John' AND age > 25;
```

- optimizer가 단일 column index를 선택하는 것보다 복합 index 사용이 효율적인 경우에 활용합니다.


### 대용량 Table에서 Selective Index 강제 사용

```sql
-- email은 unique하지만 optimizer가 다른 index를 선택하는 경우
SELECT * FROM users 
FORCE INDEX (idx_email) 
WHERE email = 'john@example.com';
```

- 매우 selective한 조건임에도 optimizer가 잘못된 판단을 하는 경우 강제로 최적 index를 지정합니다.


### 불필요한 Index 사용 방지

```sql
-- 범위 검색에서 부적절한 index 사용을 방지
SELECT * FROM orders 
IGNORE INDEX (idx_status) 
WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';
```

- cardinality가 낮은 index보다 다른 조건의 index가 더 효율적인 경우에 활용합니다.


---


## 사용 시 주의 사항

- Index hint는 강력한 기능이지만 신중하게 사용해야 하는 도구입니다.


### Optimizer 신뢰성

- MySQL optimizer는 통계 정보를 바탕으로 일반적으로 최적의 실행 계획을 수립합니다.
- 대부분의 경우 optimizer의 판단이 수동 hint보다 우수한 성능을 보장합니다.
- 명확한 성능 문제가 확인된 경우에만 hint 사용을 고려해야 합니다.


### Data 변화에 따른 영향

- table의 data 분포나 크기가 변경되면 기존 hint가 오히려 성능을 저하시킬 수 있습니다.
- 정기적인 성능 검토를 통해 hint의 유효성을 재평가해야 합니다.
- 통계 정보 update 후에는 hint 없이도 optimizer가 올바른 선택을 할 수 있는지 확인이 필요합니다.


### Schema 변경 시 고려 사항

- index가 삭제되거나 변경되면 hint를 사용한 query에서 오류가 발생할 수 있습니다.
- 새로운 index가 추가되면 기존 hint가 최적이 아닐 수 있습니다.
- schema 변경 시 관련된 모든 hint를 재검토해야 합니다.


### 성능 측정의 중요성

```sql
-- hint 적용 전후 성능 비교 필수
EXPLAIN SELECT * FROM users WHERE name = 'John';
EXPLAIN SELECT * FROM users USE INDEX (idx_name) WHERE name = 'John';
```

- `EXPLAIN` 명령어로 실행 계획을 비교하여 hint의 효과를 검증합니다.
- 실제 실행 시간 측정을 통해 성능 개선 여부를 확인합니다.


---


## 대안적 접근 방법

- index hint 대신 고려할 수 있는 다른 최적화 방법들이 있습니다.


### 통계 정보 Update

```sql
ANALYZE TABLE users;
```

- table 통계 정보를 최신화하여 optimizer가 올바른 판단을 하도록 돕습니다.
- 정기적인 통계 update가 hint보다 근본적인 해결책이 될 수 있습니다.


### Index 구조 개선

- 적절한 복합 index 생성으로 optimizer가 자연스럽게 최적 경로를 선택하도록 유도합니다.
- covering index 활용으로 추가적인 lookup을 방지합니다.


### Query 구조 개선

- WHERE 절 조건 순서 조정이나 subquery 최적화를 통해 hint 없이도 성능을 개선할 수 있습니다.
- join 순서나 조건을 조정하여 optimizer가 올바른 선택을 하도록 유도합니다.


---


## Reference

- <https://dev.mysql.com/doc/refman/8.0/en/index-hints.html>

