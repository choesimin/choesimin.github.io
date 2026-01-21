---
layout: note
permalink: /405
title: MySQL LIMIT와 OFFSET
description: LIMIT와 OFFSET은 query 결과의 행 수를 제한하고 시작 위치를 지정하는 절로, paging 구현에 주로 사용됩니다.
date: 2026-01-21
---


## LIMIT와 OFFSET

- `LIMIT`는 **query 결과에서 반환할 행의 최대 개수를 지정**합니다.
- `OFFSET`은 **결과에서 건너뛸 행의 개수를 지정**합니다.
- 두 절을 함께 사용하여 pagination을 구현합니다.

```sql
SELECT * FROM users
ORDER BY id
LIMIT 10 OFFSET 20;
```

- 위 query는 21번째 행부터 10개의 행을 반환합니다.
    - `OFFSET 20`으로 처음 20개 행을 건너뜁니다.
    - `LIMIT 10`으로 그 다음 10개 행만 가져옵니다.


---


## 기본 문법

- `LIMIT`와 `OFFSET`은 `SELECT` 문의 마지막에 위치합니다.


### LIMIT만 사용

- 결과의 처음 N개 행만 반환합니다.

```sql
-- 상위 5개 행만 조회
SELECT * FROM products
ORDER BY price DESC
LIMIT 5;
```


### LIMIT와 OFFSET 함께 사용

- `OFFSET`으로 시작 위치를 지정하고 `LIMIT`로 개수를 제한합니다.

```sql
-- 11번째부터 10개 행 조회
SELECT * FROM products
ORDER BY created_at DESC
LIMIT 10 OFFSET 10;
```


### 축약 문법

- `LIMIT offset, count` 형식으로 축약할 수 있습니다.
    - 첫 번째 값이 offset, 두 번째 값이 limit입니다.
    - 순서가 `LIMIT ... OFFSET ...` 문법과 반대이므로 주의가 필요합니다.

```sql
-- LIMIT 10 OFFSET 20과 동일
SELECT * FROM users
LIMIT 20, 10;
```

| 문법 | offset | count |
| --- | --- | --- |
| `LIMIT 10 OFFSET 20` | 20 | 10 |
| `LIMIT 20, 10` | 20 | 10 |


---


## Paging 구현

- page 번호와 page 크기를 기반으로 `LIMIT`와 `OFFSET` 값을 계산합니다.

```
OFFSET = (page 번호 - 1) × page 크기
LIMIT = page 크기
```


### 계산 예시

- page 크기가 10일 때 각 page의 `OFFSET` 값입니다.

| Page | OFFSET | 조회 범위 |
| --- | --- | --- |
| 1 | 0 | 1~10번째 행 |
| 2 | 10 | 11~20번째 행 |
| 3 | 20 | 21~30번째 행 |
| 5 | 40 | 41~50번째 행 |


### Application Code 예시

- page 번호에서 1을 빼고 page 크기를 곱하여 `OFFSET` 값을 계산합니다.

```java
int pageNumber = 3;
int pageSize = 10;
int offset = (pageNumber - 1) * pageSize;  // (3 - 1) * 10 = 20

String sql = "SELECT * FROM users ORDER BY id LIMIT ? OFFSET ?";
// LIMIT 10 OFFSET 20 → 21~30번째 행
```


---


## 성능 문제

- `OFFSET` 값이 커지면 **성능이 급격히 저하**됩니다.
    - MySQL은 `OFFSET + LIMIT` 개의 행을 모두 읽은 후 앞의 `OFFSET` 개를 버립니다.
    - `OFFSET 100000`이면 100,000개 행을 읽고 버리는 작업이 발생합니다.


### 성능 저하 원인

```sql
-- page 10000 조회 (OFFSET 99990)
SELECT * FROM users
ORDER BY id
LIMIT 10 OFFSET 99990;
```

- MySQL은 `OFFSET + LIMIT` 개의 행을 모두 읽은 후 앞부분을 버리기 때문에 비효율적입니다.
    1. `ORDER BY id` 조건에 맞게 정렬합니다.
    2. 처음부터 100,000개 행을 순차적으로 읽습니다.
    3. 앞의 99,990개 행을 버립니다.
    4. 남은 10개 행만 반환합니다.

- `OFFSET`이 증가할수록 읽고 버리는 행의 수가 늘어나 응답 시간이 길어집니다.

| OFFSET | 읽는 행 수 | 버리는 행 수 | 반환 행 수 |
| --- | --- | --- | --- |
| 0 | 10 | 0 | 10 |
| 1,000 | 1,010 | 1,000 | 10 |
| 100,000 | 100,010 | 100,000 | 10 |
| 1,000,000 | 1,000,010 | 1,000,000 | 10 |


---


## 대안 : Cursor Based Paging

- **cursor based paging(keyset pagination)**은 `OFFSET` 대신 마지막으로 조회한 값을 기준으로 다음 page를 조회합니다.
    - `OFFSET`을 사용하지 않으므로 page 위치와 관계없이 일정한 성능을 유지합니다.
    - index를 활용하여 시작 위치를 빠르게 찾습니다.


### 동작 방식

- 이전 page의 마지막 행 값을 cursor로 사용합니다.

```sql
-- 첫 번째 page
SELECT * FROM users
ORDER BY id
LIMIT 10;

-- 다음 page (이전 page의 마지막 id가 10인 경우)
SELECT * FROM users
WHERE id > 10
ORDER BY id
LIMIT 10;

-- 그 다음 page (이전 page의 마지막 id가 20인 경우)
SELECT * FROM users
WHERE id > 20
ORDER BY id
LIMIT 10;
```


### OFFSET 방식과의 비교

| 항목 | OFFSET 방식 | Cursor 방식 |
| --- | --- | --- |
| Page 이동 | 모든 page로 직접 이동 가능 | 이전/다음 page만 이동 가능 |
| 성능 | page가 뒤로 갈수록 느려짐 | page 위치와 관계없이 일정 |
| Data 정합성 | 중간 data 추가/삭제 시 중복/누락 발생 | 중복/누락 없음 |
| 구현 복잡도 | 단순 | 상대적으로 복잡 |
| 적합한 용도 | 관리자 page, 소규모 data | 무한 scroll, 대규모 data |


### Data 정합성 문제

- `OFFSET` 방식은 page 조회 중 data가 추가되거나 삭제되면 **중복 조회나 누락**이 발생합니다.

```
[초기 상태]
page 1 : A, B, C, D, E (id 1~5)
page 2 : F, G, H, I, J (id 6~10)

[page 1 조회 후 X가 id 3으로 추가됨]
page 1 : A, B, X, C, D (id 1~5)
page 2 : E, F, G, H, I (id 6~10)  ← E가 page 2로 밀림

[결과]
- page 1에서 E를 봤는데, page 2에서 E를 다시 보게 됨 (중복)
```

- cursor 방식은 `WHERE id > 5`로 조회하므로 id 5 이후의 data만 가져와 중복이 발생하지 않습니다.


---


## 사용 시 고려 사항

- `ORDER BY` 없이 `LIMIT`를 사용하면 **결과 순서가 보장되지 않습니다.**
    - 동일한 query를 실행해도 다른 결과가 반환될 수 있습니다.
    - pagination에서는 항상 `ORDER BY`를 명시해야 합니다.

- `OFFSET` 값이 전체 행 수보다 크면 **빈 결과**가 반환됩니다.
    - error가 발생하지 않으므로 application에서 빈 결과를 처리해야 합니다.

- 정렬 기준 column에 **중복 값이 있으면** 결과가 일관되지 않을 수 있습니다.
    - `ORDER BY created_at`만 사용하면 같은 시간에 생성된 행의 순서가 바뀔 수 있습니다.
    - `ORDER BY created_at, id`처럼 고유한 column을 추가하면 순서가 보장됩니다.


---


## Reference

- <https://dev.mysql.com/doc/refman/8.0/en/select.html>
- <https://use-the-index-luke.com/no-offset>

