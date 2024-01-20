---
layout: note
title: MySQL Comment - Table과 Column의 주석 조회하기
date: 2023-07-30
---




- table과 column에 대해 작성한 주석(comment)은 `information_scheme` table에 저장됩니다.
    - 사용자가 `information_schema`의 table을 조회하는 데 필요한 권한이 있어야 합니다.
        - 일반적으로는 모든 사용자에게 읽기 권한이 부여되어 있습니다.

- table 및 column 주석이 설정되어 있지 않으면, 조회 결과 빈 값일 수 있습니다.




---




## Table Comment 조회하기

```sql
SELECT table_name, table_comment
FROM information_schema.tables
WHERE table_schema = 'db_name' AND table_name = 'table_name';
```


## Column Comment 조회하기

```sql
SELECT table_name, column_name, column_comment
FROM information_schema.columns
WHERE table_schema = 'db_name' AND table_name = 'table_name';
```




---




## Reference

- <https://extbrain.tistory.com/97>