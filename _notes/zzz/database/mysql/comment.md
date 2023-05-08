---
layout: note
---

# MySql Comment


## Table Comment 조회

```sql
SELECT table_name, table_comment
FROM information_schema.tables
WHERE table_schema = 'DB 이름' AND table_name = '테이블 이름';
```


## Column Comment 조회

```sql
SELECT table_name, column_name, column_comment
FROM information_schema.columns
WHERE table_schema = 'DB 이름' AND table_name = '테이블 이름';
```




---




# Reference

- https://extbrain.tistory.com/97