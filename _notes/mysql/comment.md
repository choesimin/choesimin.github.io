---
layout: note
title: MySQL Comment - Table과 Column의 주석 조회하기
date: 2023-07-30
---




- table과 column에 대해 작성한 주석(comment)은 `information_scheme` table에 저장됩니다.




---




## Table Comment 조회하기

```sql
SELECT table_name, table_comment
FROM information_schema.tables
WHERE table_schema = [db_name] AND table_name = [table_name];
```


## Column Comment 조회하기

```sql
SELECT table_name, column_name, column_comment
FROM information_schema.columns
WHERE table_schema = [db_name] AND table_name = [table_name];
```




---




## Reference

- <https://extbrain.tistory.com/97>